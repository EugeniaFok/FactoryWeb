import "./Confirmation.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListOrders } from "../../store/reducer";
import { useEffect } from "react";
import {
	getList,
	getListPost,
	setOrderStatus,
	changeOrderStatus,
	setStateOrder,
	getStatus,
	deleteListItemId,
} from "../../functions/functions";

function Confirmation(props) {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const { role } = useSelector(state => state);
	const url =
		role !== "Writer" && role !== "Printer"
			? `http://${process.env.REACT_APP_HOST}/api/Orders`
			: `http://${process.env.REACT_APP_HOST}/api/Orders/getTask`;

	useEffect(() => {
		role !== "Writer" && role !== "Printer"
			? getList(url, list => dispatch(setListOrders(list)))
			: getListPost(url, list => dispatch(setListOrders(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Подтверждение заказа
				<img
					className="refresh icon"
					src={IconRefresh}
					alt="..."
					onClick={() =>
						role !== "Writer" && role !== "Printer"
							? getList(url, list =>
									dispatch(setListOrders(list))
							  )
							: getListPost(url, list =>
									dispatch(setListOrders(list))
							  )
					}
				/>
			</div>

			<div className="tablo-area">
				<div>
					<input type="text" placeholder="Найти" />
					<button onClick />
				</div>
				<div className="orders_list">
					{listOrders.map(element => (
						<OrderRowConfirm
							Id={element.id}
							Number={element.number}
							FullName={element.clientName}
							Status={element.state}
							onSetConfirmOrder={() => {
								setOrderStatus(element.id, "confirm", () => {
									dispatch(
										setListOrders(
											deleteListItemId(
												listOrders,
												element.id
											)
										)
									);
								});
							}}
							onSetIssureOrder={() => {
								setOrderStatus(element.id, "issue", () => {
									dispatch(
										deleteListItemId(listOrders, element.id)
									);
								});
							}}
							onSetCancelOrder={() => {
								setOrderStatus(element.id, "cancel", () => {
									dispatch(
										setListOrders(
											deleteListItemId(
												listOrders,
												element.id
											)
										)
									);
								});
							}}
							onSetCompleteOrder={() => {
								setOrderStatus(
									element.id,
									"completeTask",
									() => {
										dispatch(
											setListOrders(
												deleteListItemId(
													listOrders,
													element.id
												)
											)
										);
									}
								);
							}}
							onSetChangeStatusOrder={status => {
								changeOrderStatus(element.id, status, () => {
									dispatch(
										setListOrders(
											setStateOrder(
												listOrders,
												element,
												status
											)
										)
									);
								});
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function OrderRowConfirm(props) {
	return (
		<div className="row_table">
			<div className="order_item">
				<div>{props.Number}</div>
				<div>{props.FullName}</div>
				<div>{getStatus(props.Status)}</div>
			</div>
			<div class="controls">
				{props.role === "Administrator" ? (
					<div className="row-input">
						<label for="role">Статус</label>
						<select
							list="listRole"
							id="role"
							placeholder="Выберите роль"
							style={{ width: "238px" }}
							onChange={event =>
								props.onSetChangeStatusOrder(event.target.value)
							}
						>
							<option>Не выбрано</option>
							<option value={0}>Confirming</option>
							<option value={1}>Writing</option>
							<option value={2}>Printing</option>
							<option value={3}>Issue</option>
							<option value={100}>Done</option>
							<option value={200}>Canceled</option>
						</select>
					</div>
				) : null}
				{props.role === "Reception" ? (
					<div
						className="btn confirm"
						onClick={props.onSetConfirmOrder}
					>
						Подтвердить
					</div>
				) : null}
				{props.role === "Writer" && props.role === "Printer" ? (
					<div
						className="btn confirm"
						onClick={props.onSetCompleteOrder}
					>
						Завершить
					</div>
				) : null}
				{props.role === "Issue" ? (
					<div
						className="btn delete"
						onClick={props.onSetIssureOrder}
					>
						На выдачу
					</div>
				) : null}
				{props.role === "Reception" ? (
					<div
						className="btn delete"
						onClick={props.onSetCancelOrder}
					>
						Отменить
					</div>
				) : null}
			</div>
		</div>
	);
}
export default Confirmation;
