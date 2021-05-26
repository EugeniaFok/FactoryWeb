import "./Maker.css";
import { Rnd } from "react-rnd";
import { useDispatch, useSelector } from "react-redux";
import { setPrintSize } from "../../store/reducer";

export const Maker = props => {
	const {
		color,
		model,
		size,
		print: { width, height, base64 },
	} = useSelector(state => {
		const { colorId, modelId, sizeId, print, top, left } = state.order;
		const { colors, models, sizes } = state;

		return {
			color: colors.find(color => color.id === colorId),
			model: models.find(model => model.id === modelId),
			size: sizes.find(size => size.id === sizeId),
			top,
			left,
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
								onDrag={(e, position) => {
									dispatch(
										setPrintSize({
											top: position.x,
											left: position.y,
											width,
											height,
										})
									);
								}}
								onResize={(
									e,
									direction,
									ref,
									delta,
									position
								) => {
									dispatch(
										setPrintSize({
											width: ref.style.width,
											height: ref.style.height,
											top: position.x,
											left: position.y,
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
