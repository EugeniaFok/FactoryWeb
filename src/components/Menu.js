import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { PAGES, INFO_AUTH } from "../RoutePages";
import { useSelector } from "react-redux";
import { useState } from "react";
import ModalAuth from "../components/ModalAuth";
import { logout, changePassword } from "../functions/functions";
import { useHistory } from "react-router-dom";
import CreateItem from "../components/CreateItem";
import { changeIsAuth } from "../store/reducer";

function Menu() {
	const { isAuth } = useSelector(state => state);
	const [isOpenAuth, setIsOpenAuth] = useState(false);
	const history = useHistory();

	const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
	const [curPassword, setCurPassword] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	let newPassword = {
		currentPassword: curPassword,
		newPassword: password,
		newPassword2: password2,
	};
	const { role } = useSelector(state => state);

	return (
		<div>
			<div className="menu">
				<div className="page-title">Factory</div>
				<ul>
					{PAGES.filter(page => page.role.includes(role)).map(
						({ title, href, icon }) => (
							<Link
								className="SectionNavigation-Item Section"
								to={href}
							>
								<li className="item-menu">
									<img
										className="icon"
										src={icon}
										alt={title}
									/>
								</li>
							</Link>
						)
					)}
					{isAuth === false ? (
						<Link
							className="SectionNavigation-Item Section"
							to={INFO_AUTH.href}
						>
							<li className="item-menu">
								<img
									className="icon"
									src={INFO_AUTH.icon}
									alt={INFO_AUTH.title}
								/>
							</li>
						</Link>
					) : (
						<div>
							<li
								className="item-menu"
								onClick={() => {
									setIsOpenAuth(true);
								}}
							>
								<img
									className="icon"
									src={INFO_AUTH.icon}
									alt={INFO_AUTH.title}
								/>
							</li>
						</div>
					)}
				</ul>
			</div>
			<ModalAuth
				isOpened={isOpenAuth}
				onSetChange={isChange => {
					setIsOpenAuth(false);
					setIsOpenChangePassword(true);
				}}
				onSetExit={() => {
					setIsOpenAuth(false);
					logout(isOut => {
						if (isOut) {
							changeIsAuth(false);
							window.location.reload();
							history.push("/");
						}
					});
				}}
				onSetСancel={() => {
					setIsOpenAuth(false);
				}}
			/>
			<CreateItem
				isOpened={isOpenChangePassword}
				onSetOk={() => {
					setIsOpenChangePassword(false);
					changePassword(newPassword, () => {
						alert("Паспорт успешно изменен!");
					});
				}}
				onSetCancel={() => {
					setIsOpenChangePassword(false);
				}}
			>
				<ChangePassword
					onSetCurPassword={curPassword => {
						setCurPassword(curPassword);
					}}
					onSetPassword={password => {
						setPassword(password);
					}}
					onSetPassword2={password2 => {
						setPassword2(password2);
					}}
				/>
			</CreateItem>
		</div>
	);
}

function ChangePassword(props) {
	return (
		<div>
			<div className="row-input">
				<label for="password">Текущий пароль</label>
				<input
					type="password"
					id="password"
					placeholder="Текущий пароль"
					onChange={event =>
						props.onSetCurPassword(event.target.value)
					}
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
		</div>
	);
}

export default Menu;
