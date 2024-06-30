
import LineChartBox from '../../components/LineChartBox/LineChartBox';
import BarChartBox from '../../components/barChatBox/BarChartBox';
import AreaChartBox from '../../components/bigChartBox/AreaChartBox';
import ChartBox from '../../components/chartbox/ChartBox';
import PieChartBox from '../../components/pieChartBox/PieChartBox';
import RadicalChartBox from '../../components/radicalChartBox/radicalChartBox';
import TopBox from '../../components/tobox/TopBox';
import { topDealUsers , chartBoxUser , chartBoxProduct , chartBoxRevenue , chartBoxConversion , barChartBoxRevenue , barChartBoxVisit} from '../../global/data';

import './dashboard.css';
const DashBoard = ()=> {

    return(
        <div className="flex flex-col gap-3 h-screen ">
            <div className='flex-1 grid grid-cols-3 gap-3 pt-4 px-4 auto-rows-fr'>
                <div className="p-5  col-span-1	bg-white rounded-lg shadow-md row-span-2 flex items-center justify-center"><LineChartBox /></div>
                <div className="p-5 col-span-1	bg-white rounded-lg shadow-md row-span-2 flex items-center justify-center"><RadicalChartBox text={'Monthly Goal'} value={60}/></div>
                <div className="p-5 col-span-1	bg-white rounded-lg shadow-md row-span-2 flex items-center justify-center"><RadicalChartBox text={'Yearly Goal'} value={40}/></div>
            </div>
            <div className='flex-1 p-2 mx-4  bg-white rounded-lg shadow-md'>

                <BarChartBox {...barChartBoxVisit}/>
            </div>
        </div>
    )
};

export default DashBoard;