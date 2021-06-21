import "./ChooseModel.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModelId, setModels } from "../../store/reducer";

function ChooseModel(props) {
	const { modelId, colorId, models } = useSelector(state => {
		const { modelId, colorId } = state.order;
		const { models } = state;

		return { modelId, colorId, models };
	});

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const response = await fetch(
				`${process.env.REACT_APP_HOST}/api/models`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const models = await response.json();

			dispatch(setModels(models));
		})();
	}, [dispatch]);
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
