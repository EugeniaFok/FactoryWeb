import "./Tablo.css";
import OrderRow from "./OrderRow";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListOrders } from "../../store/reducer";
import { useEffect } from "react";
import { getList } from "../../functions/functions";

function Tablo() {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Orders";

	useEffect(() => {
		getList(url, list => dispatch(setListOrders(list)));
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
						getList(url, list => dispatch(setListOrders(list)))
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
