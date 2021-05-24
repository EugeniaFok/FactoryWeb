import "./Colors.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../store/reducer";
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
	const { colors } = useSelector(state => state);
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
		getList(url, list => dispatch(setColors(list)));
	}, [dispatch, url]);

	return (
		<div className="">
			<div className="caption-page">
				Список всех цветов
				<div className="btn-group">
					<button
						className="btn-refresh"
						onClick={() =>
							getList(url, list => dispatch(setColors(list)))
						}
					/>
					<button
						className="btn-create"
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
							dispatch(setColors(addListItem(colors, newColor)));
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
				<div className="colors_list">
					{colors.map(({ id, name, value }) => (
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
			</div>
			<ModalConfirm
				isOpened={isOpenModal}
				answer={"Удалить " + curName + " цвет?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(url + curId, () => {
						dispatch(setColors(deleteListItemId(colors, curId)));
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
			<div className="color_item">
				<div>{props.Id}</div>
				<div>{props.Name}</div>
				<div>{props.Value}</div>
			</div>
			<div className="controls">
				<div className="btn delete" onClick={props.onClick}>
					Удалить
				</div>
			</div>
		</div>
	);
}
export default Colors;
