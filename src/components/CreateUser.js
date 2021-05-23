// import "./CreateItem.css";
import { useState } from "react";

function CreateUser(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [role, setRole] = useState("");

	const roles = [
		"Administrator",
		"Reception",
		"Writer",
		"Printer",
		"Issuer",
		"Board",
	];
	// "login": "reception",
	// "password": "AAAaaa!2345",
	// "password2": "AAAaaa!2345",
	// "role": "Reception"
	return props.isOpened ? (
		<div className="modal">
			<div className="modal-panel">
				<div className="row-input">
					<label for="login">Логин</label>
					<input
						type="text"
						id="login"
						placeholder="Введите логин"
						onChange={event => setLogin(event.target.value)}
					/>
				</div>
				<div className="row-input">
					<label for="password">Пароль</label>
					<input
						type="password"
						id="password"
						placeholder="Введите пароль"
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<div className="row-input">
					<label for="password">Повторите пароль</label>
					<input
						type="password"
						id="password"
						placeholder="Введите пароль"
						onChange={event => setPassword2(event.target.value)}
					/>
				</div>
				<div className="row-input">
					<label for="role">Роль</label>
					<select
						list="listRole"
						id="role"
						placeholder="Выберите роль"
						style={{ width: "238px" }}
						onChange={event => setRole(event.target.value)}
					>
						{roles.map(element => (
							<option>{element}</option>
						))}
					</select>
				</div>
				<div className="control-choose">
					<button className="factory-btn" onClick={props.onSetOk}>
						Ок
					</button>
					<button className="factory-btn" onClick={props.onSetCancel}>
						Отмена
					</button>
				</div>
			</div>
		</div>
	) : null;
}
export default CreateUser;
