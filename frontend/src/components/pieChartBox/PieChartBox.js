import './PieChartBox.css';
import { ResponsiveContainer, PieChart, Pie ,Cell, Tooltip } from "recharts";

const data = [
    { name: "Sales", value: 100 , color: '#5A6DFC'},
    
  ];

function PieChartBox() {
  return (
    <>
      <h1>Total Sales</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            fill="#5A6DFC"
           
          />
          {/* <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </>
    
  );
}

export default PieChartBox;
