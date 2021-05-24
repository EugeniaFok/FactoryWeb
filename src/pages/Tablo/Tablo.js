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
	const url = `http://${process.env.REACT_APP_HOST}/api/Orders`;

	useEffect(() => {
		getList(url, list => dispatch(setListOrders(list)));
	}, [dispatch, url]);

	return (
		<div className="">
			<div className="caption-page">
				Табло заказов
				<div className="btn-group">
					<button
						className="btn-refresh"
						onClick={() =>
							getList(url, list => dispatch(setListOrders(list)))
						}
					/>
				</div>
			</div>
			<div style={{ display: "flex" }}>
				<TabloPanel
					title="Заказы в обработке"
					listOrders={listOrders.filter(
						order => order.state !== 100 && order.state !== 200
					)}
				/>
				<TabloPanel
					title="Заказы, готовые к выдаче"
					listOrders={listOrders.filter(order => order.state === 100)}
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
				{listOrders.map(order => (
					<OrderRow {...order} />
				))}
			</div>
		</div>
	);
}

export default Tablo;
