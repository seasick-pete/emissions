import emissionsChart from './emissionsChart';

(async (enabled) => {
  emissionsChart.init(
      'scatterByYearTypeSize',
      'data/output_csv_route_specific_dummy.csv'
  );

  const cycleYears = () => {
    emissionsChart.nextSequence();
    emissionsChart.update(
      emissionsChart.data.filter(
        (d) => d.year === emissionsChart.sequence[0]
      )
    );
  };
  setInterval(cycleYears, 1000);
})(false);
