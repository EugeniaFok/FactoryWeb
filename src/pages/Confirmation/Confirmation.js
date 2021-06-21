import "./Confirmation.css";
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
	deleteItem,
} from "../../functions/functions";

function Confirmation(props) {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const { role } = useSelector(state => state);
	const url = `${process.env.REACT_APP_HOST}/api/Orders/`;

	useEffect(() => {
		getList(url, list => dispatch(setListOrders(list)));
	}, [dispatch, url]);

	return (
		<div className="">
			<div className="caption-page">
				Подтверждение заказа
				<div className="btn-group">
					<button
						className="btn-refresh"
						onClick={() =>
							getList(url, list => dispatch(setListOrders(list)))
						}
					/>
					{role === "Administrator" ? (
						<button
							className="btn-delete"
							onClick={() =>
								getList(url, () => {
									deleteItem(
										`${process.env.REACT_APP_HOST}/api/Orders/deleteAll`,
										() => {
											dispatch(setListOrders([]));
										}
									);
								})
							}
						>
							Удалить все
						</button>
					) : null}
				</div>
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
							Model={element.model}
							Size={element.size}
							Role={role}
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
							onDelete={() => {
								deleteItem(url + element.id, () => {
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
							onSetChangeStatusOrder={status => {
								changeOrderStatus(element.id, status, () => {
									dispatch(
										setListOrders(
											setStateOrder(
												listOrders,
												element,
												Number(status)
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
			<div className="row_table tablo_row">
				<div>{`Клиент: ${props.FullName}`}</div>
				<div>{`Статус: ${getStatus(props.Status)}`}</div>
				<div>{`Модель: ${props.Model.name}`}</div>
				<div>{`Размер: ${props.Size.value}`}</div>
			</div>
			<div class="controls">
				{props.Role === "Administrator" ? (
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
				{props.Role === "Administrator" ? (
					<div className="btn delete" onClick={props.onDelete}>
						Удалить
					</div>
				) : null}
				{props.Role === "Reception" ? (
					<div
						className="btn confirm"
						onClick={props.onSetConfirmOrder}
					>
						Подтвердить
					</div>
				) : null}
				{props.Role === "Issue" ? (
					<div
						className="btn delete"
						onClick={props.onSetIssureOrder}
					>
						На выдачу
					</div>
				) : null}
				{props.Role === "Reception" ? (
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
