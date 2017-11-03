import * as d3 from 'd3';

const protoChart = {
    'width': window.innerWidth,
    'height': window.innerHeight,
    'margin': {
        'left': 10,
        'right': 10,
        'top': 10,
        'bottom': 10,
    }
}

/**
 * the default chart object constuctor
 * @param {*} opts options
 * @param {*} proto prototype
 */
export default function chartFactory(opts, proto=protoChart) {
    const chart = Object.assign({}, proto, opts); // wtf

    chart.svg = d3.select('body')
        .append('svg')
        .attr('id', chart.id || 'chart')
        .attr('width', chart.width - chart.margin.right )
        .attr('height', chart.height - chart.margin.bottom);

    chart.container = chart.svg.append('g')
        .attr('id', 'container')
        .attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);

    return chart;
}

export const colorScale = d3.scaleOrdinal()
    .range(d3.schemeCategory20);

export const heightOrValueComparator =
    (a, b) => b.height - a.height || b.value - a.value;

export const valueComparator = (a, b) => b.value - a.value;


export function addRoot(data, itemKey, parentKey, joinValue) {
    data.forEach((d) => {
        d[parentKey] = d[parentKey] || joinValue;
    });
    data.push({
        [parentKey]: '',
        [itemKey]: joinValue,
    });
    return data;
}

/**
 * creates tooltips
 * @param {*} text text to display;
 * @param {*} chart the target chart;
 */
export function tooltip(text, chart) {
    return (selection) => {
     
      /**
      * Mouseover events handler
      * @param {*} d 
      */
      function mouseover(d) {
        const path = d3.select(this);
        path.classed('highlighted', true);

        const mouse = d3.mouse(chart.node());
        const tool = chart.append('g')
          .attr('id', 'tooltip')
          .attr('transform', `translate(${mouse[0] + 5},${mouse[1] + 10})`);

        const textNode = tool.append('text')
          .text(text(d))
          .attr('fill', 'black')
          .node();

        tool.append('rect')
          .attr('height', textNode.getBBox().height)
          .attr('width', textNode.getBBox().width)
          .attr('fill', 'rgba(255, 255, 255, 0.6)')
          .attr('transform', 'translate(0, -16)');
  
        tool.select('text')
          .remove();
  
        tool.append('text').text(text(d));
      }
  
      function mousemove() {
        const mouse = d3.mouse(chart.node());
        d3.select('#tooltip')
          .attr('transform', `translate(${mouse[0] + 15},${mouse[1] + 20})`);
      }
  
      function mouseout() {
        const path = d3.select(this);
        path.classed('highlighted', false);
        d3.select('#tooltip').remove();
      }
  
      selection.on('mouseover.tooltip', mouseover)
        .on('mousemove.tooltip', mousemove)
        .on('mouseout.tooltip', mouseout);
    };
}

export const descendantDarker = () => {};

export const uniques = (data, name) => data.reduce(
    (uniqueValues, d) => {
        uniqueValues.push(
            (uniqueValues.indexOf(name(d)) < 0 ? name(d) : undefined));
        return uniqueValues;
    }, [])
    .filter((i) => i); // Filter by identity

export function fixateColors(data, key) {
    colorScale.domain(uniques(data, (d) => d[key]));
};
    
export const getHouseName = (d) => {
    const ancestors = d.ancestors();
    let house;
    if (ancestors.length > 1) {
        ancestors.pop();
        house = ancestors.pop().id.split(' ').pop();
    } else {
        house = 'Westeros';
    }
    return house;
};

export const houseNames = (root) =>
root.ancestors().shift().children.map(getHouseName);

