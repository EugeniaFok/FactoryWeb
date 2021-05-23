import "./Prints.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListPrints } from "../../store/reducer";
import { useEffect, useState } from "react";
import { getList, deleteItem, createItem } from "../../functions/functions";
import ModalConfirm from "../../components/Modal";
import CreatePrint from "../../components/CreatePrint";

function Prints(props) {
	const { listPrints } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Images/`;
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curName, setName] = useState(false);
	const [curId, setId] = useState(false);

	useEffect(() => {
		getList(url, list => dispatch(setListPrints(list)));
	}, [dispatch, url]);

	return (
		<div className="">
			<div className="caption-page">
				Принты
				<div className="">
					<img
						className="refresh icon"
						src={IconRefresh}
						alt="..."
						onClick={() =>
							getList(url, list => dispatch(setListPrints(list)))
						}
					/>
					<button
						className="factory-btn-create"
						onClick={() => {
							setIsOpenCreate(true);
						}}
					>
						Создать
					</button>
				</div>
				<CreatePrint
					isOpened={isOpenCreate}
					onSetOk={() => {
						setIsOpenCreate(false);
						createItem(url);
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				/>
			</div>
			<div className="tablo-area">
				<div>
					<input type="search" placeholder="Найти" />
					<button onClick />
				</div>
				{listPrints.map(({ id, name, state }) => (
					<OrderRowPrints
						Id={id}
						Name={name}
						State={state}
						onClick={() => {
							setIsOpen(true);
							setName(name);
							setId(id);
						}}
					/>
				))}
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить пользовтеля " + curName + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(url + curId);
				}}
				onSetCancel={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
}

function OrderRowPrints(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Id}</div>
				<div className="">{props.Name}</div>
				<div className="">{props.State}</div>
			</div>
			<div className="factory-btn-delete" onClick={props.onClick}>
				Удалить
			</div>
		</div>
	);
}
export default Prints;
