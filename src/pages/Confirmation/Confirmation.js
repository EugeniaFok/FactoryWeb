import "./Confirmation.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListOrders } from "../../store/reducer";
import { useEffect } from "react";
import { getList } from "../../functions/functions";

const setConfirmOrder = callback => {
	const url = "http://localhost:50000/api/Orders/{id}/confirm";
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(url, {
		method: "POST",
		headers,
		redirect: "follow",
		credentials: "include",
	})
		.then(response => {
			if (response.status === 200) {
				return response.json();
			}
		})
		.then(data => {
			callback(data);
		});
};

const setCancelOrder = callback => {
	const url = "http://localhost:50000/api/Orders/{id}/cancel";
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(url, {
		method: "POST",
		headers,
		redirect: "follow",
		credentials: "include",
	})
		.then(response => {
			if (response.status === 200) {
				return response.json();
			}
		})
		.then(data => {
			callback(data);
		});
};
function Confirmation(props) {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Orders";

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
				{listOrders.map(({ Id, clientName, state }) => (
					<OrderRowConfirm
						Id={Id}
						FullName={clientName}
						Status={state}
					/>
				))}
			</div>
		</div>
	);
}

function OrderRowConfirm(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Id}</div>
				<div className="">{props.FullName}</div>
				<div className="">{props.Status}</div>
			</div>
			<div className="confirm" onClick={setConfirmOrder}>
				Подтвердить
			</div>
			<div className="delete" onClick={setCancelOrder}>
				Отменить
			</div>
		</div>
	);
}
export default Confirmation;
