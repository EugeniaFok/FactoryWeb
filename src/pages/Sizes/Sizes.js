import "./Sizes.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListSizes } from "../../store/reducer";
import { useEffect, useState } from "react";
import {
	getList,
	deleteItem,
	deleteListItemId,
	createItem,
	addListItem,
	setFilterList,
} from "../../functions/functions";
import ModalConfirm from "../../components/Modal";
import CreateItem from "../../components/CreateItem";

function Sizes(props) {
	const { listSizes } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Sizes/";
	const [isOpen, setIsOpen] = useState(false);
	const [curValue, setValue] = useState(false);
	const [curId, setId] = useState(false);
	const [newName, setNewName] = useState("");
	const [newValue, setNewValue] = useState("");
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	let newSize = { name: newName, value: newValue, id: "" };

	useEffect(() => {
		getList(url, list => dispatch(setListSizes(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Список размеров
				<div className="">
					<img
						className="refresh icon"
						src={IconRefresh}
						alt="..."
						onClick={() =>
							getList(url, list => dispatch(setListSizes(list)))
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
						onSetOk={() => {
							setIsOpenCreate(false);
							createItem(url, newSize, id => {
								newSize.id = id;
								dispatch(
									setListSizes(
										addListItem(listSizes, newSize)
									)
								);
							});
						}}
						onSetCancel={() => {
							setIsOpenCreate(false);
						}}
					>
						<div className="row-input">
							<label for="name">Наименование</label>
							<input
								type="text"
								id="name"
								placeholder="Введите размер"
								onChange={event =>
									setNewName(event.target.value)
								}
							/>
						</div>
						<div className="row-input">
							<label for="value">Код цвета</label>
							<input
								type="text"
								id="value"
								placeholder="Введите код размера"
								onChange={event =>
									setNewValue(event.target.value)
								}
							/>
						</div>
					</CreateItem>
				</div>
			</div>
			<div className="tablo-area">
				<div>
					<input
						type="search"
						placeholder="Найти"
						onChange={event => {
							if (event.target.value !== null) {
								dispatch(
									setListSizes(
										setFilterList(
											listSizes,
											event.target.value
										)
									)
								);
							}
						}}
					/>
					<button onClick={() => {}} />
				</div>
				{listSizes.map(({ id, name, value }) => (
					<RowTableSizes
						Id={id}
						Name={name}
						Value={value}
						onClick={() => {
							setIsOpen(true);
							setValue(value);
							setId(id);
						}}
					/>
				))}
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить размер " + curValue + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(url + curId, () => {
						dispatch(
							setListSizes(deleteListItemId(listSizes, curId))
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

function RowTableSizes(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Name}</div>
				<div className="">{props.Value}</div>
			</div>
			<div className="factory-btn-delete" onClick={props.onClick}>
				Удалить
			</div>
		</div>
	);
}
export default Sizes;
