import "./Sizes.css";
import { useDispatch, useSelector } from "react-redux";
import { setSizes } from "../../store/reducer";
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
	const { sizes } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `${process.env.REACT_APP_HOST}/api/Sizes/`;
	const [isOpen, setIsOpen] = useState(false);
	const [curValue, setValue] = useState(false);
	const [curId, setId] = useState(false);
	const [newName, setNewName] = useState("");
	const [newValue, setNewValue] = useState("");
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	let newSize = { name: newName, value: newValue, id: "" };

	useEffect(() => {
		getList(url, list => dispatch(setSizes(list)));
	}, [dispatch, url]);

	return (
		<div className="">
			<div className="caption-page">
				Список размеров
				<div className="btn-group">
					<button
						className="btn-refresh"
						onClick={() =>
							getList(url, list => dispatch(setSizes(list)))
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
						createItem(url, newSize, id => {
							newSize.id = id;
							dispatch(setSizes(addListItem(sizes, newSize)));
						});
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				>
					<CreateNewSize
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
					<input
						type="search"
						placeholder="Найти"
						onChange={event => {
							if (event.target.value !== null) {
								dispatch(
									setSizes(
										setFilterList(sizes, event.target.value)
									)
								);
							}
						}}
					/>
					<button onClick={() => {}} />
				</div>
				<div className="sizes_list">
					{sizes.map(({ id, name, value }) => (
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
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить размер " + curValue + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(url + curId, () => {
						dispatch(setSizes(deleteListItemId(sizes, curId)));
					});
				}}
				onSetCancel={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
}
function CreateNewSize(props) {
	return (
		<div>
			<div className="row-input">
				<label for="name">Наименование</label>
				<input
					type="text"
					id="name"
					placeholder="Введите размер"
					onChange={event => props.onSetName(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="value">Краткий код размера</label>
				<input
					type="text"
					id="value"
					placeholder="Введите код размера"
					onChange={event => props.onSetValue(event.target.value)}
				/>
			</div>
		</div>
	);
}

function RowTableSizes(props) {
	return (
		<div className="row_table">
			<div className="size_item">
				<div>{`Наименование: ${props.Name}`}</div>
				<div>{`Размер: ${props.Value}`}</div>
			</div>
			<div className="controls">
				<div className="btn delete" onClick={props.onClick}>
					Удалить
				</div>
			</div>
		</div>
	);
}
export default Sizes;
