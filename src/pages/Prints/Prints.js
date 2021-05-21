import "./Prints.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { getListPrints } from "../../store/reducer";
import { useEffect } from "react";
import { getList } from "../../functions/getList";

const setConfirmOrder = callback => {
	const url = "http://localhost:50000/api/Orders/{id}/confirm";
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(url, {
		method: "GET",
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
		method: "GET",
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
function Prints(props) {
	const { listPrints } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Images";

	useEffect(() => {
		getList(url, list => dispatch(getListPrints(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Принты
				<img
					className="refresh icon"
					src={IconRefresh}
					alt="..."
					onClick={() =>
						getList(url, list => dispatch(getListPrints(list)))
					}
				/>
			</div>

			<div className="tablo-area">
				<div>
					<input type="text" placeholder="Найти" />
					<button onClick />
				</div>
				{listPrints.map(({ Id, name, state }) => (
					<OrderRowConfirm Id={Id} FullName={name} Status={state} />
				))}
			</div>
		</div>
	);
}

function OrderRowConfirm(props) {
	return (
		<div className="row_complete">
			<div className="">{props.Id}</div>
			<div className="">{props.FullName}</div>
			<div className="">{props.Status}</div>
			<div className="confirm" onClick={setConfirmOrder}>
				Подтвердить
			</div>
			<div className="delete" onClick={setCancelOrder}>
				Отменить
			</div>
		</div>
	);
}
export default Prints;
