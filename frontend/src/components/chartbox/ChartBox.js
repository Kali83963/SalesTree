import './ChartBox.css';
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

function ChartBox({props}) {
  return (
    <div className ="chartBox">
        <div className="boxInfo">
            <div className="title">
                <img src={props.icon} alt={props.id} />
                <span>{props.title}</span>
            </div>  
            <h1>{props.number}</h1>
            <Link to="/">View all</Link>
        </div>
        <div className='chartInfo'>
            <div className='chart'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={props.chartData}>
                    <Line type="monotone" dataKey={props.dataKey} stroke={props.color} strokeWidth={2} dot={false}/>
                    <Tooltip 
                        contentStyle={{background:"transparent",border:"none"}}
                        labelStyle={{display:"none"}}
                        position={{x:10,y:70}}
                        
                    />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='texts'>
                <span className='percentage' style={{color:props.percentage > 0 ? "green" : "red"}}>{props.percentage}%</span>
                <span className='duration'>this month</span>
            </div>

        </div>
    </div>
  )
}

export default ChartBox