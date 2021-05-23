import "./Confirmation.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListOrders } from "../../store/reducer";
import { useEffect, useState } from "react";
import {
	getList,
	setOrderStatus,
	changeOrderStatus,
	setStateOrder,
} from "../../functions/functions";

function Confirmation(props) {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Orders`;
	const [curId, setId] = useState(false);

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
							FullName={element.clientName}
							Status={element.state}
							onSetConfirmOrder={() => {
								setId(element.id);
								setOrderStatus(curId, "confirm", () => {
									dispatch(setStateOrder(element, 1));
								});
							}}
							onSetIssureOrder={() => {
								setId(element.id);
								setOrderStatus(curId, "issue", () => {
									dispatch(setStateOrder(element, 3));
								});
							}}
							onSetCancelOrder={() => {
								setId(element.id);
								setOrderStatus(curId, "cancel", () => {
									dispatch(setStateOrder(element, 200));
								});
							}}
							onSetCompleteOrder={() => {
								setId(element.id);
								setOrderStatus(curId, "completeTask", () => {
									dispatch(setStateOrder(element, 100));
								});
							}}
							onSetChangeStatusOrder={status => {
								setId(element.id);
								changeOrderStatus(curId, status, () => {
									dispatch(setStateOrder(element, status));
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
				<div>{props.FullName}</div>
			</div>
			<div class="controls">
				<div className="row-input">
					<label for="role">Роль</label>
					<select
						list="listRole"
						id="role"
						placeholder="Выберите роль"
						style={{ width: "238px" }}
						onChange={event => props.onSetRole(event.target.value)}
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
				<div className="btn confirm" onClick={props.onSetConfirmOrder}>
					Подтвердить
				</div>
				<div className="btn confirm" onClick={props.onSetCompleteOrder}>
					Завершить
				</div>
				<div className="btn delete" onClick={props.onSetIssureOrder}>
					На выдачу
				</div>
				<div className="btn delete" onClick={props.onSetCancelOrder}>
					Отменить
				</div>
			</div>
		</div>
	);
}
export default Confirmation;
