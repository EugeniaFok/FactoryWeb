import "./Maker.css";
import { Rnd } from "react-rnd";
import { useDispatch, useSelector } from "react-redux";
import { setPrintSize } from "../../store/reducer";

export const Maker = props => {
	const {
		color,
		model,
		size,
		print: { width, height, base64, top, left },
	} = useSelector(state => {
		const { colorId, modelId, sizeId, print } = state.order;
		const { colors, models, sizes } = state;

		return {
			color: colors.find(color => color.id === colorId),
			model: models.find(model => model.id === modelId),
			size: sizes.find(size => size.id === sizeId),
			print,
		};
	});
	// const { width, height, base64 } = useSelector();

	const dispatch = useDispatch();

	return (
		<div className="container">
			<div className="maker_wrapper">
				<div className="maker_wrapper__model">
					{base64 ? (
						<div className="workspace">
							<Rnd
								bounds="parent"
								lockAspectRatio
								onDragStop={(e, position) => {
									dispatch(
										setPrintSize({
											width,
											height,
											top: position.x,
											left: position.y,
										})
									);
									alert(size.top);
								}}
								onResize={ref => {
									dispatch(
										setPrintSize({
											width: ref.style.width,
											height: ref.style.height,
											top,
											left,
										})
									);
								}}
							>
								<div
									className="print"
									style={{
										maxWidth: 127,
										width,
										height,
										backgroundImage: `url(data:image/png;base64,${base64})`,
									}}
								></div>
							</Rnd>
						</div>
					) : null}
				</div>
				<div className="maker_wrapper__description">
					{`Цвет: ${color?.name}, Модель: ${model?.name}, Размер: ${size?.value}`}
				</div>
			</div>
		</div>
	);
};
