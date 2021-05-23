import "./Models.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListModels } from "../../store/reducer";
import { useEffect, useState } from "react";
import { getList, deleteItem, createItem } from "../../functions/functions";
import ModalConfirm from "../../components/Modal";
import CreateItem from "../../components/CreateItem";

function Models() {
	const { listModels } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Models";
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curName, setName] = useState(false);
	const [curId, setId] = useState(false);

	const fieldsName = [
		{ field: "name", title: "Наименование" },
		{ field: "colorId", title: "Id цвета" },
	];

	useEffect(() => {
		getList(url, list => dispatch(setListModels(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Список моделей
				<img
					className="refresh icon"
					src={IconRefresh}
					alt="..."
					onClick={() =>
						getList(url, list => dispatch(setListModels(list)))
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
				<CreateItem
					isOpened={isOpenCreate}
					fields={fieldsName}
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
					<input type="text" placeholder="Найти" />
					<button onClick />
				</div>
				{listModels.map(({ Id, name }) => (
					<OrderRowModels
						Id={Id}
						Name={name}
						onClick={() => {
							setIsOpen(true);
							setName(name);
							setId(Id);
						}}
					/>
				))}
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить модель " + curName + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem("http://localhost:50000/api/Account/" + curId);
				}}
				onSetCancel={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
}

function OrderRowModels(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Id}</div>
				<div className="">{props.Name}</div>
			</div>
			<div className="factory-btn-delete" onClick={props.onClick}>
				Удалить
			</div>
		</div>
	);
}
export default Models;
