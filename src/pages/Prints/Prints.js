import "./Prints.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPrints } from "../../store/reducer";
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

const types = ["jpg", "svg", "png"];

function Prints(props) {
	const { prints } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Images/`;
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curName, setName] = useState(false);
	const [curId, setId] = useState(false);
	const [newName, setNewName] = useState("");
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [type, setType] = useState(types[0]);
	const [contentsBase64, setImage] = useState("");

	let newPrint = {
		name: newName,
		width: width,
		height: height,
		type: type,
		contentsBase64: contentsBase64,
		id: "",
	};

	useEffect(() => {
		getList(url, list => dispatch(setPrints(list)));
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
							getList(url, list => dispatch(setPrints(list)))
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
						createItem(url, newPrint, id => {
							newPrint.id = id;
							dispatch(setPrints(addListItem(prints, newPrint)));
						});
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				>
					<CreateNewPrint
						onSetName={name => {
							setNewName(name);
						}}
						onSetWidth={width => {
							setWidth(width);
						}}
						onSetHeight={height => {
							setHeight(height);
						}}
						onSetType={type => {
							setType(type);
						}}
						onSetImage={contentsBase64 => {
							setImage(contentsBase64);
						}}
					/>
				</CreateItem>
			</div>

			<div className="tablo-area">
				<div>
					<input type="search" placeholder="Найти" />
					<button onClick />
				</div>
				<div className="prints_list">
					{prints.map(({ id, name, state }) => (
						<OrderRowPrints
							Id={id}
							Name={name}
							State={state}
							select={() => {
								alert(`You select print ${name}`);
							}}
							remove={() => {
								setIsOpen(true);
								setName(name);
								setId(id);
							}}
						/>
					))}
				</div>
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить принт " + curName + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(url + curId, () => {
						dispatch(setPrints(deleteListItemId(prints, curId)));
					});
				}}
				onSetCancel={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
}

function CreateNewPrint(props) {
	return (
		<div>
			<div className="row-input">
				<label for="name">Наименование</label>
				<input
					type="text"
					id="name"
					placeholder="Введите наименование"
					onChange={event => props.onSetName(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="width">Ширина</label>
				<input
					type="text"
					id="width"
					placeholder="Введите ширину"
					onChange={event => props.onSetWidth(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="height">Высота</label>
				<input
					type="text"
					id="height"
					placeholder="Введите высоту"
					onChange={event => props.onSetHeight(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="role">Тип расширения</label>
				<select
					list="listRole"
					id="role"
					placeholder="Выберите роль"
					style={{ width: "50px" }}
					onChange={event => props.onSetType(event.target.value)}
				>
					{types.map(element => (
						<option>{element}</option>
					))}
				</select>
			</div>
			<div className="row-input">
				<label for="image">Картинка</label>
				<input
					type="file"
					id="image"
					name="contentsBase64"
					accept={"image/*"}
					onChange={event =>
						// props.onSetImage(event.target.value.contentsBase64)
						props.onSetImage(
							"iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAYCElEQVR4nO2daZBcV3XH/+fet/U20xrtsoRkybJka7MW78ZGjnESBxsoYwVD4UoqThFMFVVQRShcmHIVqRShiMsJS+IEioALAgqIGAfFEFsbsvAy0mhBshZLljySxhqNNFtvb7snH8aStUx3v9f9XndLmt836d1335m+527nnnMuoUa2bOlOePapB4n9WwBMZIg8Ee/TLP7Vrbcuf6PWesdoLBT2hd9v2Pantque8jxvHise5X2C1OWgaerfy07QH1+wYIEThaBjxENgBXjllQNtdm7oJcd2VlQrqxs60m0pCCl2CcajN9w477X6xBwjLgIpwJYXtl5jC9XpuV57tbLJdBKJlHXuf7lgenjZjdf+olYhx4iPqgqwdu2BtoQ2cMxzvXS1slbSQiqTHO2RYhIfWb587vO1CDlGfIhqBZLGwJYgja8bOlKZRNnvEPMPOzsPvi+sgGPES0UF2PTito95jregWiVEQLoticoDCo8T7H0jrIBjxEtFBfCV9zRz9Up0Q4eQsnpBwkNdXXvmBhVujPjRyj14+eUdkwqDhauCVGIlyw79FyLYFx8H8DUA6Ow82A6oOVJ5FmvagWXL5p4MWtEY0VBWATxHPYYAvZ+IoBsBev+Z8qB7u15/43cg8RmG91EAOgsBKIVtnfu3EvHzQit9c8mSJfnAlY5RM+WnAKUWB6pAkwhjT2LgDiaxnoFVAPQLni5nxpO+m+jq7Nx/c+BKx6iZ8grAmBqkAkmhjYkB4LkC/HJn5747Yqh8jHOosAikqltEAOAg80RtSAH+8c6dO8fF9YExyijA79dvu0exP7vay0SAppddRkQAvc9zjCdj/MAVz3njd+f6zgkFn150HGdJte2faZlIpq1g27/6OLZ0+bUziCi2oeZK5qwCvPRS5xzyeYfveqlqLyVSFpLpUU2+saAglq9YMXdbwz54BSEAYPXq3YbweWuwxk80tPEBQLBaGEe9zEzMox1pXzloADClo/QL265+0iekQDId2OgTGSxYhX7nwCttrlmaJ4jnMdO1BL4WELMY3EZABkDG796YAUDekQ053veMSX6eWUvZJM0BFvpxJnM/zOwGfdL1a2n2J05E/5c1H9q2advE/rx7QilV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"
						)
					}
				/>
			</div>
		</div>
	);
}

function OrderRowPrints(props) {
	return (
		<div className="row_table">
			<div className="print_item" onClick={props.select}>
				<div>{props.Id}</div>
				<div>{props.Name}</div>
			</div>
			<div className="controls">
				<div className="btn delete" onClick={props.remove}>
					Удалить
				</div>
			</div>
		</div>
	);
}
export default Prints;
