import React from 'react'
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
const data = [
  {
    name: '18-24',
    uv: 31.47,
    
    fill: '#8884d8',
  },
];



function RadicalChartBox({text , value}) {
  return (
    <div className=''>
    <h1 className='font-bold mb-4 text-lg'>{text}</h1>
    <Gauge 
      width={250} 
      height={250} value={value} 
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: 'translate(0px, 0px)',
        },
      }}
      text={
         ({ value, valueMax }) => `${value} %`
      }
      />
    </div>
  )
}

export default RadicalChartBox