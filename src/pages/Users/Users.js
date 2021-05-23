import "./Users.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListUsers } from "../../store/reducer";
import { getList, deleteItem, createItem } from "../../functions/functions";
import { useEffect, useState } from "react";
import ModalConfirm from "../../components/Modal";
import CreateUser from "../../components/CreateUser";

function Users() {
	const { listUsers } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = "http://localhost:50000/api/Users";
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curRole, setRole] = useState();

	useEffect(() => {
		getList(url, list => dispatch(setListUsers(list)));
	}, [dispatch]);

	return (
		<div className="">
			<div className="caption-page">
				Список пользователей
				<div className="">
					<img
						className="refresh icon"
						src={IconRefresh}
						alt="..."
						onClick={() =>
							getList(url, list => dispatch(setListUsers(list)))
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
				<CreateUser
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
					<input type="text" placeholder="Найти" />
					<button onClick />
				</div>
				{listUsers.map(({ login, role }) => (
					<RowTableUsers
						Login={login}
						Role={role}
						onClick={() => {
							setIsOpen(true);
							setRole(role);
						}}
					/>
				))}
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить пользователя " + curRole + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem("http://localhost:50000/api/Account/" + curRole);
				}}
				onSetCancel={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
}

function RowTableUsers(props) {
	return (
		<div className="row_table">
			<div className="">
				<div className="">{props.Login}</div>
				<div className="">{props.Role}</div>
			</div>
			<div className="factory-btn-delete" onClick={props.onClick}>
				Удалить
			</div>
		</div>
	);
}
export default Users;
