import "./Confirmation.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListOrders } from "../../store/reducer";
import { useEffect } from "react";
import {
	getList,
	setOrderStatus,
	changeOrderStatus,
	setStateOrder,
	getStatus,
	deleteListItemId,
} from "../../functions/functions";

function Confirmation(props) {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Orders`;

	useEffect(() => {
		getList(url, list => dispatch(setListOrders(list)));
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
						getList(url, list => dispatch(setListOrders(list)))
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
	const { role } = useSelector(state => state);
	return (
		<div className="row_table">
			<div className="order_item">
				<div>{props.Number}</div>
				<div>{props.FullName}</div>
				<div>{getStatus(props.Status)}</div>
			</div>
			<div class="controls">
				{role === "Administrator" ? (
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
				{role === "Reception" ? (
					<div
						className="btn confirm"
						onClick={props.onSetConfirmOrder}
					>
						Подтвердить
					</div>
				) : null}
				{role === "Writer" && role === "Printer" ? (
					<div
						className="btn confirm"
						onClick={props.onSetCompleteOrder}
					>
						Завершить
					</div>
				) : null}
				{role === "Issue" ? (
					<div
						className="btn delete"
						onClick={props.onSetIssureOrder}
					>
						На выдачу
					</div>
				) : null}
				{role === "Reception" ? (
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
