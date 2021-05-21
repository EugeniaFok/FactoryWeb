import "./OrderRow.css";

function OrderRow(props) {
	return (
		<div className="row_complete">
			<div className="">{props.Id}</div>
			<div className="">{props.FullName}</div>
			<div className="">{props.Status}</div>
		</div>
	);
}

export default OrderRow;
