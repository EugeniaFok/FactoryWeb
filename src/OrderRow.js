import "./OrderRow.css";

function OrderRow(props){
    return(
        <tr className="row_complete">
            <th className="" >
                {props.Id}
            </th>
            <th className="">
                {props.FullName}
            </th>
            <th className="">
                {props.Status}
            </th>
        </tr>
    );
}

export default OrderRow;