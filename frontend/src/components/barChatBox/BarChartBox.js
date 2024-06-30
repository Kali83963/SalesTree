import './BarChartBox.css'
import { BarChart, Bar, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function BarChartBox(props) {
    
  return (
    <div className='barChartBox text-center'>
        <h1 className='text-2xl font-bold m-6'>{props.title}</h1>
        <div className='chart'>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={props.chartData} margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={30}
                >
                    <XAxis dataKey={"name"} />
                    <YAxis />
                     <Bar dataKey={props.dataKey} fill={props.color} widths={10}/>
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