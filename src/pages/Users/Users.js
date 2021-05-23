import "./Users.css";
import IconRefresh from "../../images/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setListUsers } from "../../store/reducer";
import {
	getList,
	deleteItem,
	createUser,
	addListItem,
	deleteListItemId,
} from "../../functions/functions";
import { useEffect, useState } from "react";
import ModalConfirm from "../../components/Modal";
import CreateItem from "../../components/CreateItem";
import { ROLES } from "../../RoutePages";

function Users() {
	const { listUsers } = useSelector(state => state);
	const dispatch = useDispatch();
	const url = `http://${process.env.REACT_APP_HOST}/api/Users/`;
	const urlDelAdd = `http://${process.env.REACT_APP_HOST}/api/Account/`;
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [curLogin, setUser] = useState();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [role, setNewRole] = useState("");
	let newUser = {
		login: login,
		password: password,
		password2: password2,
		role: role,
	};

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
				<CreateItem
					isOpened={isOpenCreate}
					onSetOk={() => {
						setIsOpenCreate(false);
						createUser(urlDelAdd + "register", newUser, i => {
							dispatch(
								setListUsers(addListItem(listUsers, newUser))
							);
						});
					}}
					onSetCancel={() => {
						setIsOpenCreate(false);
					}}
				>
					<CreateNewUser
						onSetLogin={login => {
							setLogin(login);
						}}
						onSetPassword={value => {
							setPassword(value);
						}}
						onSetPassword2={login => {
							setPassword2(login);
						}}
						onSetRole={value => {
							setNewRole(value);
						}}
					/>
				</CreateItem>
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
							setUser(login);
						}}
					/>
				))}
			</div>
			<ModalConfirm
				isOpened={isOpen}
				answer={"Удалить пользователя " + curLogin + "?"}
				onSetOk={() => {
					setIsOpen(false);
					deleteItem(urlDelAdd + curLogin, () => {
						dispatch(
							setListUsers(deleteListItemId(listUsers, curLogin))
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

function CreateNewUser(props) {
	return (
		<div>
			<div className="row-input">
				<label for="login">Логин</label>
				<input
					type="text"
					id="login"
					placeholder="Введите логин"
					onChange={event => props.onSetLogin(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="password">Пароль</label>
				<input
					type="password"
					id="password"
					placeholder="пароль не менее 6 символов"
					onChange={event => props.onSetPassword(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="password">Повторите пароль</label>
				<input
					type="password"
					id="password"
					placeholder="пароль не менее 6 символов"
					onChange={event => props.onSetPassword2(event.target.value)}
				/>
			</div>
			<div className="row-input">
				<label for="role">Роль</label>
				<select
					list="listRole"
					id="role"
					placeholder="Выберите роль"
					style={{ width: "238px" }}
					onChange={event => props.onSetRole(event.target.value)}
				>
					<option>Не выбрано</option>
					{ROLES.map(element => (
						<option>{element}</option>
					))}
				</select>
			</div>
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
