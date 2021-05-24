import "./OrderRow.css";
import { getStatus } from "../../functions/functions";

function OrderRow(props) {
	const { clientName, state, model, size } = props;

	return (
		<div className="row_table tablo_row">
			<div>{`Клиент: ${clientName}`}</div>
			<div>{`Статус: ${getStatus(state)}`}</div>
			<div>{`Модель: ${model.name}`}</div>
			<div>{`Размер: ${size.value}`}</div>
		</div>
	);
}

export default OrderRow;
