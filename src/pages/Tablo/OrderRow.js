import "./OrderRow.css";

function OrderRow(props) {
	return (
		<div className="row_table tablo_row">
			<div>{props.FullName}</div>
		</div>
	);
}

export default OrderRow;
