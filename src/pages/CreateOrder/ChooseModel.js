import { INFO_AUTH } from "../../RoutePages";
import "./ChooseModel.css";
function ChooseModel(props) {
	// "name": "Белая рубашка",
	// "colorId": "fd058e3f-a5e0-47ef-bf15-3d83edc87a61"
	return (
		<div className="tablo-order-choose">
			{/* {props.colors.map(({ name }) =>
                <div className="block-model">
                    <img className='item-model' src={INFO_AUTH.icon} alt={name}/>
                    <div className="name-model">  
                        {name}
                    </div> 
                </div> 
            )} */}
			<div className="block-model">
				<img
					className="item-model"
					src={INFO_AUTH.icon}
					alt="КЛАССИЧЕСКАЯ ФУТБОЛКА"
					tabIndex="0"
				/>
				<div className="name-model">КЛАССИЧЕСКАЯ ФУТБОЛКА</div>
			</div>
			<div className="block-model">
				<img
					className="item-model"
					src={INFO_AUTH.icon}
					alt="КЛАССИЧЕСКАЯ ФУТБОЛКА"
					tabIndex="0"
				/>
				<div className="name-model">КРУГЛЫЙ ВЫРЕЗ</div>
			</div>
			<div className="block-model">
				<img
					className="item-model"
					src={INFO_AUTH.icon}
					alt="КЛАССИЧЕСКАЯ ФУТБОЛКА"
					tabIndex="0"
				/>
				<div className="name-model">V-ОБРАЗНЫЙ ВЫРЕЗ</div>
			</div>
			<div className="block-model">
				<img
					className="item-model"
					src={INFO_AUTH.icon}
					alt="ХЕНЛИ"
					tabIndex="0"
				/>
				<div className="name-model">ХЕНЛИ</div>
			</div>
			<div className="block-model">
				<img
					className="item-model"
					src={INFO_AUTH.icon}
					alt="ПОЛО"
					tabIndex="0"
				/>
				<div className="name-model">ПОЛО</div>
			</div>
		</div>
	);
}

export default ChooseModel;
