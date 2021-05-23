import "./Colors.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListColors } from "../../store/reducer";
import { useEffect, useState } from "react";
import {
	getList,
	deleteItem,
	createItem,
	addListItem,
} from "../../functions/functions";
import ModalConfirm from "../../components/Modal";
import CreateItem from "../../components/CreateItem";

function Colors() {
	const { listColors } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Colors/";
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curName, setName] = useState(false);
	const [curId, setId] = useState(false);
	const [newName, setNewName] = useState("");
	const [newValue, setNewValue] = useState("");

	useEffect(() => {
		getList(url, list => dispatch(setListColors(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Список всех цветов
				<div className="">
					<img
						className="refresh icon"
						src={IconRefresh}
						alt="..."
						onClick={() =>
							getList(url, list => dispatch(setListColors(list)))
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
				<CreateItem
					isOpened={isOpenCreate}
					onSetOk={() => {
						setIsOpenCreate(false);
						createItem(
							url,
							{ name: newName, value: newValue },
							addListItem()
						);
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				>
					<div className="row-input">
						<label for="name">"Наименование"</label>
						<input
							type="text"
							id="name"
							placeholder="Введите цвет"
							onChange={event => setNewName(event.target.value)}
						/>
					</div>
					<div className="row-input">
						<label for="value">"Код цвета"</label>
						<input
							type="text"
							id="value"
							placeholder="Введите код цвета"
							onChange={event => setNewValue(event.target.value)}
						/>
					</div>
				</CreateItem>
			</div>
			<div className="tablo-area">
				<div>
					<input type="search" placeholder="Найти" />
					<button onClick />
				</div>
				{listColors.map(({ id, name, value }) => (
					<OrderRowColors
						Id={id}
						Name={name}
						Value={value}
						onClick={() => {
							setIsOpenModal(true);
							setName(name);
							setId(id);
						}}
					/>
				))}
			</div>
			<ModalConfirm
				isOpened={isOpenModal}
				answer={"Удалить " + curName + " цвет?"}
				onSetOk={() => {
					setIsOpenModal(false);
					deleteItem(url + curId);
				}}
				onSetCancel={() => {
					setIsOpenModal(false);
				}}
			/>
		</div>
	);
}

function OrderRowColors(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Id}</div>
				<div className="">{props.Name}</div>
				<div className="">{props.Value}</div>
			</div>
			<div className="factory-btn-delete" onClick={props.onClick}>
				Удалить
			</div>
		</div>
	);
}
export default Colors;
