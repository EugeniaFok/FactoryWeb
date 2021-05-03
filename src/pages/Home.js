import "./Home.css";
import OrderRow from '../OrderRow';
import IconRefresh from '../refresh.svg';

function Home(){
    return (
        <div className="">
            <div className="caption-page">
                Табло заказов
            </div>
            <div style={{display: "flex"}}>
              <Tablo title="Заказы в обработке"/>  
              <Tablo title="Заказы, готовые к выдаче"/>  
            </div>         
        </div>
    );
}

function Tablo(props){
    return (
        <div className="column">
            <div className="caption-tablo">
                {props.title}
                <img className='refresh icon' src={IconRefresh} alt="Обновить"/>
            </div>
            <table class="tablo-rows">
                {/* {props.Data.map(({ Id, FullName, Status }) => (
                    <OrderRow Id={Id} FullName={FullName} Status={Status}/>
                ))} */}
                <OrderRow Id="1" FullName="{FullName}" Status="{Status}"/>
                <OrderRow Id="2" FullName="Иванов Иван Иванович" Status="ГОТОВО"/>
            </table>
        </div>
    );
}

export default Home;