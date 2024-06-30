import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function LineChartBox() {
  return (
    <div>
    
    <h1 className='font-bold mb-4 text-lg'>Sales Total</h1>
    
    
    <ChartContainer
      width={300}
      height={250}
      series={[{ type: 'line', data: pData }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          stroke: '#5A6DFC',
          strokeWidth: 6,
        },
        [`& .${markElementClasses.root}`]: {
          stroke: '#8884d8',
          scale: '1',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
      <p className='text-3xl font-bold text-center'>$344,989</p>
    </div>
  );
}
