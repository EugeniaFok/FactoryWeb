import { INFO_AUTH } from "../../RoutePages";
import "./ChooseModel.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListModels } from "../../store/reducer";
import { getList } from "../../functions/functions";
function ChooseModel(props) {
	const { listModels } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://${process.env.REACT_APP_HOST}/api/Models";

	useEffect(() => {
		getList(url, list => dispatch(setListModels(list)));
	}, [dispatch]);
	// "name": "Белая рубашка",
	// "colorId": "fd058e3f-a5e0-47ef-bf15-3d83edc87a61"
	return (
		<div>
			<div className="caption-tablo">Выберите модель изделия:</div>
			<div className="tablo-order-choose">
				{listModels.map(({ name }) => (
					<div className="block-model">
						<img
							className="item-model"
							src={INFO_AUTH.icon}
							alt={name}
							tabIndex="0"
						/>
						<div className="name-model">{name}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ChooseModel;
