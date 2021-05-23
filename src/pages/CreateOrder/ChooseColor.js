import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColorId, setColors } from "../../store/reducer";
import "./ChooseColor.css";

function ChooseColor(props) {
	const { colorId, colors } = useSelector(state => {
		const { colorId } = state.order;
		const { colors } = state;

		return { colors, colorId };
	});

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const response = await fetch(
				`http://${process.env.REACT_APP_HOST}/api/colors`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const colors = await response.json();

			dispatch(setColors(colors));
		})();
	}, [dispatch]);

	return (
		<div>
			<div className="caption-tablo">Выберите цвет изделия:</div>
			<div className="tablo-order-choose">
				{colors.map(({ id, name, value }) => (
					<div
						key={id}
						className={`block-color ${
							colorId === id ? "selected" : ""
						}`}
						style={{ backgroundColor: value }}
						title={name}
						onClick={() => {
							dispatch(setColorId(id));
						}}
					></div>
				))}
			</div>
		</div>
	);
}

export default ChooseColor;
