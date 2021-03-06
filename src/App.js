import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";
import { PAGES } from "./RoutePages";
import Menu from "./components/Menu";
import { useEffect } from "react";
import Auth from "./pages/Auth/Auth";
import { RegisteredHandler } from "./functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { changeIsAuth, changeRole } from "./store/reducer";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route {...rest} render={props => <Component {...props} />} />
);

const AuthRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth ? <Redirect to="/" /> : <Component {...props} />
		}
	/>
);

function App() {
	const { isAuth } = useSelector(state => state);
	const { role } = useSelector(state => state);
	const dispatch = useDispatch();
	let pageHome = "/home";

	useEffect(() => {
		RegisteredHandler(role => {
			let isAuth = !!role;

			dispatch(changeIsAuth(isAuth));
			dispatch(changeRole(role ?? "Client"));
		});
	}, [dispatch]);

	pageHome =
		role === ("Writer" || "Printer")
			? "/task"
			: role === ("Reception" || "Administrator" || "Issuer")
			? "/orders"
			: role === ("Client" || "")
			? "/createOrder"
			: "/home";

	return (
		<div className="App">
			<Menu />
			<Switch>
				<AuthRoute path="/auth" component={Auth} auth={isAuth} />

				{PAGES.filter(page => page.role.includes(role)).map(
					({ title, href, component }) => (
						<PrivateRoute
							path={href}
							auth={isAuth}
							component={component}
						/>
					)
				)}
				<Redirect from="/" to={pageHome} />
			</Switch>
		</div>
	);
}

export default withRouter(App);
