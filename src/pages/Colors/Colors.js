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
	deleteListItemId,
} from "../../functions/functions";
import ModalConfirm from "../../components/Modal";
import CreateItem from "../../components/CreateItem";

function Colors() {
	const { listColors } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Colors/`;
	const [isOpenModal, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curName, setName] = useState(false);
	const [curId, setId] = useState(false);
	const [newName, setNewName] = useState("");
	const [newValue, setNewValue] = useState("");
	let newColor = { name: newName, value: newValue, id: "" };

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
						createItem(url, newColor, id => {
							newColor.id = id;
							dispatch(
								setListColors(addListItem(listColors, newColor))
							);
						});
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				>
					<CreateNewColors
						onSetName={name => {
							setNewName(name);
						}}
						onSetValue={value => {
							setNewValue(value);
						}}
					/>
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
							setIsOpen(true);
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
					setIsOpen(false);
					deleteItem(url + curId, () => {
						dispatch(
							setListColors(deleteListItemId(listColors, curId))
						);
					});
				}}
				onSetCancel={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
}

function CreateNewColors(props) {
	return (
		<div>
			<div className="row-input">
				<label for="name">Наименование</label>
				<input
					type="text"
					id="name"
					placeholder="Введите цвет"
					onChange={event => props.onSetName(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="value">HEX код цвета</label>
				<input
					type="text"
					id="value"
					placeholder="Введите HEX"
					onChange={event => props.onSetValue(event.target.value)}
				/>
			</div>
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
