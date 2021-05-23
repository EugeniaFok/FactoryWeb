import "./ChooseModel.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModelId } from "../../store/reducer";

function ChooseModel(props) {
	const [models, setModels] = useState([]);

	const { modelId, colorId } = useSelector(state => state.order);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const response = await fetch(
				`http://${process.env.REACT_APP_HOST}/api/models`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const models = await response.json();

			setModels(models);
		})();
	}, []);
	return (
		<div>
			<div className="caption-tablo">Выберите модель изделия:</div>
			<div className="tablo-order-choose">
				<div className="model_list">
					{models
						.filter(model => model.color.id === colorId)
						.map(({ id, name }) => (
							<div
								className="model_wrapper"
								onClick={
									modelId !== id
										? () => {
												dispatch(setModelId(id));
										  }
										: null
								}
							>
								{modelId === id ? (
									<div className="model_icon" />
								) : null}
								<div className="model_wrapper__img" />
								<div className="model_wrapper__name">
									{name}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default ChooseModel;
