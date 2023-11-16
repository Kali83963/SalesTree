
import BarChartBox from '../../components/barChatBox/BarChartBox';
import AreaChartBox from '../../components/bigChartBox/AreaChartBox';
import ChartBox from '../../components/chartbox/ChartBox';
import PieChartBox from '../../components/pieChartBox/PieChartBox';
import TopBox from '../../components/tobox/TopBox';
import { topDealUsers , chartBoxUser , chartBoxProduct , chartBoxRevenue , chartBoxConversion , barChartBoxRevenue , barChartBoxVisit} from '../../global/data';

import './dashboard.css';
const DashBoard = ()=> {

    return(
        <div className="dashboard">
            
            <div className="box box1">
                <TopBox topDealUsers = {topDealUsers} />
            </div>
            <div className="box box2"><ChartBox props = {chartBoxUser}/></div>
            <div className="box box3"><ChartBox props = {chartBoxProduct}/></div>
            <div className="box box4"><PieChartBox /></div>
            <div className="box box5"><ChartBox props={chartBoxRevenue}/></div>
            <div className="box box6"><ChartBox props={chartBoxConversion} /></div>
            <div className="box box7">
                <AreaChartBox />
            </div>
            <div className="box box8"><BarChartBox {...barChartBoxRevenue}/></div>
            <div className="box box9">
            
            <BarChartBox {...barChartBoxVisit}/>
            </div>
            
        </div>
    )
};

export default DashBoard;