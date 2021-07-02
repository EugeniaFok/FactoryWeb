import "./Tablo.css";
import OrderRow from "./OrderRow";
import { useDispatch, useSelector } from "react-redux";
import { setListOrders } from "../../store/reducer";
import { useEffect } from "react";
import { getList } from "../../functions/functions";

function Tablo() {
	const { listOrders } = useSelector(state => state);
	const dispatch = useDispatch();
	const { role } = useSelector(state => state);
	const url =
		`${process.env.REACT_APP_HOST}/api/Orders/` +
		(role === "Board" ? "forBoard" : "");

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
					role={role}
				/>
				<TabloPanel
					title="Заказы, готовые к выдаче"
					listOrders={listOrders.filter(order => order.state === 100)}
					role={role}
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
				{props.role !== "Board"
					? listOrders.map(order => <OrderRow {...order} />)
					: listOrders.map(({ id, state, number }) => (
							<OrderRow clientName={number} state={state} />
					  ))}
			</div>
		</div>
	);
}

export default Tablo;
