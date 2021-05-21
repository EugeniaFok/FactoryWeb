import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListColors } from "../../store/reducer";
import "./ChooseColor.css";
import { getList } from "../../functions/getList";

function ChooseColor(props) {
	const { listColors } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Colors";

	useEffect(() => {
		getList(url, list => dispatch(getListColors(list)));
	}, [dispatch]);

	// "id": "78a296ea-26af-4a67-929c-22e5b64a28bf",
	// "name": "Белый",
	// "value": "#FFFFFF"
	return (
		<div>
			<div className="caption-tablo">Выберите цвет:</div>
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
