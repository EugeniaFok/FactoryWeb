import "./Task.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setColors, setModels, setSizes } from "../../store/reducer";
import { Maker } from "../../components/childs/Maker";
import { getListPost, setOrderStatus } from "../../functions/functions";

function GetTask(props) {
	const url = `http://${process.env.REACT_APP_HOST}/api/Orders/getTask`;
	const [isOpenOrder, setIsOpenOrder] = useState(false);
	const [isOpenButton, setIsOpenButton] = useState(true);
	const { role } = useSelector(state => state);
	const { order } = useSelector(state => state);
	const dispatch = useDispatch();

	return (
		<div>
			<div className="btn-group">
				<ButtonGetTask
					isOpened={isOpenButton}
					onGetTask={() => {
						getListPost(url, order => {
							dispatch(
								setOrder({
									id: order.id,
									colorId: order.model.color.id,
									modelId: order.model.id,
									sizeId: order.size.id,
									print: {
										id: order.image.id,
										width: order.image.width,
										height: order.image.width,
										base64: order.image.contentsBase64,
									},
								})
							);
							dispatch(
								setColors([
									{
										id: order.model.color.id,
										name: order.model.color.name,
									},
								])
							);
							dispatch(
								setModels([
									{
										id: order.model.id,
										name: order.model.name,
									},
								])
							);
							dispatch(
								setSizes([
									{
										id: order.size.id,
										value: order.size.value,
									},
								])
							);
							setIsOpenOrder(true);
							setIsOpenButton(false);
						});
					}}
				/>
			</div>
			<ViewPrint
				isOpened={isOpenOrder}
				Role={role}
				onSetCompleteOrder={() => {
					setOrderStatus(order.id, "completeTask", () => {
						setIsOpenOrder(false);
						setIsOpenButton(true);
					});
				}}
			/>
		</div>
	);
}
function ButtonGetTask(props) {
	return props.isOpened ? (
		<button className="btn-create" onClick={props.onGetTask}>
			Получить задание
		</button>
	) : null;
}
function ViewPrint(props) {
	return (props.Role === "Writer" || "Printer") && props.isOpened ? (
		<div style={{ width: "min-content", margin: "0 auto" }}>
			<div className="maker_container">
				<Maker />
			</div>
			<button className="btn-create" onClick={props.onSetCompleteOrder}>
				Готово
			</button>
		</div>
	) : null;
}
export default GetTask;
