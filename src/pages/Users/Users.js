import "./Users.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { getListUsers } from "../../store/reducer";
import { getList } from "../../functions/getList";
import { useEffect } from "react";

function Users() {
	const { listUsers } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Users";

	useEffect(() => {
		getList(url, list => dispatch(getListUsers(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Список пользователей
				<img
					className="refresh icon"
					src={IconRefresh}
					alt="..."
					onClick={() =>
						getList(url, list => dispatch(getListUsers(list)))
					}
				/>
			</div>
			<div className="tablo-area">
				<div>
					<input type="text" placeholder="Найти" />
					<button onClick />
				</div>
				{listUsers.map(({ login, role }) => (
					<OrderRowConfirm Login={login} Role={role} />
				))}
			</div>
		</div>
	);
}

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

function OrderRowConfirm(props) {
	return (
		<div className="row_complete">
			<div className="">{props.Login}</div>
			<div className="">{props.Role}</div>
			<div className="confirm" onClick={setConfirmOrder}>
				Подтвердить
			</div>
			<div className="delete" onClick={setCancelOrder}>
				Отменить
			</div>
		</div>
	);
}
export default Users;
