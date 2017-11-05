import bubbleChart from './bubbleChart';

(async (enabled) => {
  bubbleChart.init(
      'scatterByYearTypeSize',
      'data/output_csv_route_specific_dummy.csv'
  );

  const cycleYears = () => {
    bubbleChart.nextSequence();
    bubbleChart.update(
      bubbleChart.data.filter(
        (d) => d.year === bubbleChart.sequence[0]
      )
    );
  };
  setInterval(cycleYears, 1000);
})(false);
