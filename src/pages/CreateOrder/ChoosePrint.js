import { INFO_AUTH } from "../../RoutePages";
import "./ChoosePrint.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListPrints } from "../../store/reducer";
import { getList } from "../../functions/functions";
import { Maker } from "./childs/Maker";
function ChoosePrint(props) {
	const { listPrints } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Images";

	useEffect(() => {
		getList(url, list => dispatch(setListPrints(list)));
	}, [dispatch]);
	// "id": "78a296ea-26af-4a67-929c-22e5b64a28bf",
	// "name": "Белый",
	// "value": "#FFFFFF"
	return (
		<div>
			<div className="caption-tablo">Выберите принт изделия:</div>
			<Maker />
			<div className="tablo-order-choose">
				{listPrints.map(
					({ id, name, width, height, type, contentsBase64 }) => (
						<img
							className="block-print"
							src={INFO_AUTH.icon}
							alt={name}
							tabIndex="0"
						/>
					)
				)}
			</div>
		</div>
	);
}

export default ChoosePrint;
