import "./Auth.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const signinHandler = (login, password, rememberMe, callback) => () => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");
	const raw = JSON.stringify({
		Login: login,
		Password: password, // AAAaaa!2345
		RememberMe: rememberMe,
	});

	fetch(`http://${process.env.REACT_APP_HOST}/api/account/login`, {
		method: "POST",
		headers,
		body: raw,
		redirect: "follow",
		credentials: "include",
	}).then(response => {
		if (response.status) {
			callback();
		}
	});
};

function Auth() {
	const history = useHistory();
	const [check, setCheckRemember] = useState(true);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [, setRegistered] = useState(false);

	const redirectHome = function () {
		setRegistered(true);
		window.location.reload();
		history.push("/");
	};

	return (
		<div className="auth-panel">
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
			<button
				className="signin"
				onClick={signinHandler(login, password, check, redirectHome)}
			>
				Войти
			</button>
			<div className="remember-check">
				<input
					type="checkbox"
					id="remeber"
					onClick={() => setCheckRemember(!check)}
					defaultChecked={check}
				/>
				<label for="remeber">Запомнить меня</label>
			</div>
		</div>
	);
}

export default Auth;
