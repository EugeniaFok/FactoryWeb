import "./ChooseSize.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSizeId } from "../../store/reducer";

function ChooseSize(props) {
	const [sizes, setSizes] = useState([]);

	const sizeId = useSelector(state => state.order.sizeId);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const response = await fetch(
				`http://${process.env.REACT_APP_HOST}/api/sizes`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const sizes = await response.json();

			setSizes(sizes);
		})();
	}, []);

	return (
		<div>
			<div className="caption-tablo">Выберите размер:</div>
			<div className="tablo-order-choose">
				{sizes.map(({ id, name, value }) => (
					<div
						key={id}
						className={`block-size ${
							sizeId === id ? "selected" : ""
						}`}
						title={name}
						onClick={() => {
							dispatch(setSizeId(id));
						}}
					>
						{value}
					</div>
				))}
			</div>
		</div>
	);
}

export default ChooseSize;
