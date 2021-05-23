import "./ChooseSize.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListSizes } from "../../store/reducer";
import { getList } from "../../functions/functions";

function ChooseSize(props) {
	const { listSizes } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://${process.env.REACT_APP_HOST}/api/Sizes";

	useEffect(() => {
		getList(url, list => dispatch(setListSizes(list)));
	}, [dispatch]);

	return (
		<div>
			<div className="caption-tablo">Выберите размер:</div>
			<div className="tablo-order-choose">
				{listSizes.map(({ value }) => (
					<button className="block-size">{value}</button>
				))}
			</div>
		</div>
	);
}

export default ChooseSize;
