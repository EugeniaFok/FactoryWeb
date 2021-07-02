import "./OrderRow.css";
import { getStatus } from "../../functions/functions";

function OrderRow(props) {
	const { clientName, state, model, size } = props;

	return (
		<div className="row_table tablo_row">
			<div>{`Клиент: ${clientName}`}</div>
			<div>{`Статус: ${getStatus(state)}`}</div>
			{model != null ? <div>{`Модель: ${model.name}`}</div> : null}
			{size != null ? <div>{`Размер: ${size.value}`}</div> : null}
		</div>
	);
}

export default OrderRow;
