import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset } from './DataSet';

const chartSetting = {
  yAxis: [
    {
      label: 'units',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-5px, 0)',
    },
  },
};

const valueFormatter = (value) => `${value}`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
       
        { dataKey: 'paris', label: 'Call-Outs', valueFormatter },
        { dataKey: 'newYork', label: 'Profile Views', valueFormatter },
        
      ]}
      {...chartSetting}
    />
  );
}