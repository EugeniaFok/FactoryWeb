import "./Models.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setModels, setColors } from "../../store/reducer";
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

function Models() {
	const { listModels } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Models/`;
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curName, setName] = useState(false);
	const [curId, setId] = useState(false);

	const [newName, setNewName] = useState("");
	const [newColorId, setNewColorId] = useState("");
	let newModel = { name: newName, colorId: newColorId, id: "" };

	useEffect(() => {
		getList(url, list => dispatch(setModels(list)));
	}, [dispatch, url]);

	return (
		<div className="">
			<div className="caption-page">
				Список моделей
				<div>
					<img
						className="refresh icon"
						src={IconRefresh}
						alt="..."
						onClick={() =>
							getList(url, list => dispatch(setModels(list)))
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
						createItem(url, newModel, id => {
							newModel.id = id;
							dispatch(
								setModels(addListItem(listModels, newModel))
							);
						});
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				>
					<CreateNewModels
						onSetName={name => {
							setNewName(name);
						}}
						onSetColorId={colorId => {
							setNewColorId(colorId);
						}}
					/>
				</CreateItem>
			</div>
			<div className="tablo-area">
				<div>
					<input type="text" placeholder="Найти" />
					<button onClick />
				</div>
				{listModels.map(({ id, name, color }) => (
					<OrderRowModels
						Id={id}
						Name={name}
						// Color={color}
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
				answer={"Удалить модель " + curName + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(url + curId, () => {
						dispatch(
							setModels(deleteListItemId(listModels, curId))
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

function CreateNewModels(props) {
	const { listColors } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Colors/`;

	useEffect(() => {
		getList(url, list => dispatch(setColors(list)));
	}, [dispatch]);

	return (
		<div>
			<div className="row-input">
				<label for="name">Наименование модели</label>
				<input
					type="text"
					id="name"
					style={{ width: "230px" }}
					placeholder="Введите наименование модели"
					onChange={event => props.onSetName(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="color">Id код цвета</label>
				<select
					list="listColor"
					id="color"
					placeholder="Выберите Id цвета"
					style={{ width: "238px" }}
					onChange={event => props.onSetColorId(event.target.value)}
				>
					<option>Не выбрано</option>
					{listColors.map(element => (
						<option value={element.id}>{element.name}</option>
					))}
				</select>
			</div>
		</div>
	);
}

function OrderRowModels(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Name}</div>
				<div className="">{props.Color}</div>
			</div>
			<div className="factory-btn-delete" onClick={props.onClick}>
				Удалить
			</div>
		</div>
	);
}
export default Models;
