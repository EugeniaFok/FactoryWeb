import "./ChooseSize.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSizeId, setSizes } from "../../store/reducer";

function ChooseSize(props) {
	const { sizeId, sizes } = useSelector(state => {
		const { sizeId } = state.order;
		const { sizes } = state;

		return { sizeId, sizes };
	});

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const response = await fetch(
				`${process.env.REACT_APP_HOST}/api/sizes`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const sizes = await response.json();

			dispatch(setSizes(sizes));
		})();
	}, [dispatch]);

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
