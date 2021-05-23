import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListColors } from "../../store/reducer";
import "./ChooseColor.css";
import { getList } from "../../functions/functions";

function ChooseColor(props) {
	const { listColors } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://${process.env.REACT_APP_HOST}/api/Colors";

	useEffect(() => {
		getList(url, list => dispatch(setListColors(list)));
	}, [dispatch]);

	// "id": "78a296ea-26af-4a67-929c-22e5b64a28bf",
	// "name": "Белый",
	// "value": "#FFFFFF"
	return (
		<div>
			<div className="caption-tablo">Выберите цвет изделия:</div>
			<div className="tablo-order-choose">
				{listColors.map(({ id, name, value }) => (
					<div className="block-color">
						<button
							className="item-color"
							style={{ backgroundColor: { value } }}
						/>
						<div className="name-color">{name}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ChooseColor;
