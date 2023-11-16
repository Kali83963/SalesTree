import './PieChartBox.css';
import { ResponsiveContainer, PieChart, Pie ,Cell, Tooltip } from "recharts";

const data = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
  ];

function PieChartBox() {
  return (
    <div className="pieChartBox">
      <h1>Lead By Source</h1>
      <ResponsiveContainer width="99%" height={400}>
        <PieChart>
            <Tooltip 
                contentStyle={{background:"#ffff",borderRadius:"5px"}}
            />
          <Pie
            data={data}
            innerRadius={"70%"}
            outerRadius={"80%"}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={entry.color}
              />
            ))}
          </Pie>
          
        </PieChart>
      </ResponsiveContainer>
      <div className="options">
        {data.map((item,index) => (
            <div className="option">
                <div className="title">
                    <div className="dot" style={{backgroundColor:item.color}}/>
                    <span>{item.name}</span>
                </div>
                <span>{item.value}</span>

            </div>
        ))}

      </div>
    </div>
  );
}

export default PieChartBox;
