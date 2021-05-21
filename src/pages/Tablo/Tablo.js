import "./Tablo.css";
import OrderRow from "./OrderRow";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { getListOrders } from "../../store/reducer";
import { useEffect } from "react";

function Tablo() {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		getOrders(list => dispatch(getListOrders(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Табло заказов
				<img
					className="refresh icon"
					src={IconRefresh}
					alt="..."
					onClick={() =>
						getOrders(list => dispatch(getListOrders(list)))
					}
				/>
			</div>
			<div style={{ display: "flex" }}>
				<TabloPanel
					title="Заказы в обработке"
					listOrders={listOrders.filter(order => order.state === 0)}
				/>
				<TabloPanel
					title="Заказы, готовые к выдаче"
					listOrders={listOrders.filter(order => order.state === 1)}
				/>
			</div>
		</div>
	);
}

const getOrders = callback => {
	const url = "http://localhost:50000/api/Orders"; //"http://localhost:50000/api/Orders/forBoard"
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

function TabloPanel(props) {
	const { listOrders } = props;

	return (
		<div className="column">
			<div className="caption-tablo">{props.title}</div>
			<div className="tablo-area">
				{listOrders.map(({ Id, clientName, state }) => (
					<OrderRow Id={Id} FullName={clientName} Status={state} />
				))}
			</div>
		</div>
	);
}

export default Tablo;
