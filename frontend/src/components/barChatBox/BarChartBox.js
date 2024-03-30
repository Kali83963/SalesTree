import './BarChartBox.css'
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';

function BarChartBox(props) {
    
  return (
    <div className='barChartBox'>
        <h1>{props.title}</h1>
        <div className='chart'>
            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={props.chartData}>
                     <Bar dataKey={props.dataKey} fill={props.color}/>
                     <Tooltip 
                        contentStyle={{background:"#00000", borderRadius:"5px"}}
                        labelStyle={{display:"none"}}
                        cursor={{fill:'none'}}
                     />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default BarChartBox