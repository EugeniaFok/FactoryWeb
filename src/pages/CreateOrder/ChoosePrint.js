import { INFO_AUTH } from "../../RoutePages";
import "./ChoosePrint.css";
function ChoosePrint(props) {
	// "id": "78a296ea-26af-4a67-929c-22e5b64a28bf",
	// "name": "Белый",
	// "value": "#FFFFFF"
	return (
		<div>
			<div className="caption-tablo">Выберите принт:</div>{" "}
			<div className="tablo-order-choose">
				{/* {props.colors.map(({ id, name, value }) =>
                <div className="row-input">
                    <div className="block-color" style={{backgroundColor: "#000000"}}>  
                    </div> 
                    <div>  
                        Черный цвет
                    </div> 
                </div> 
            )} */}
				<img
					className="block-print"
					src={INFO_AUTH.icon}
					alt=""
					tabIndex="0"
				/>
				<img
					className="block-print"
					src={INFO_AUTH.icon}
					alt=""
					tabIndex="0"
				/>
				<img
					className="block-print"
					src={INFO_AUTH.icon}
					alt=""
					tabIndex="0"
				/>
				<img
					className="block-print"
					src={INFO_AUTH.icon}
					alt=""
					tabIndex="0"
				/>
				<img
					className="block-print"
					src={INFO_AUTH.icon}
					alt=""
					tabIndex="0"
				/>
			</div>
		</div>
	);
}

export default ChoosePrint;
