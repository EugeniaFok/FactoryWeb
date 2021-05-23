import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";
import { PAGES } from "./RoutePages";
import Menu from "./components/Menu";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth/Auth";
import { RegisteredHandler } from "./functions/functions";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!auth ? <Redirect to="/auth" /> : <Component {...props} />
		}
	/>
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
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		RegisteredHandler(setAuth);
	}, []);

	return (
		<div className="App">
			<Menu />
			<Switch>
				<AuthRoute path="/auth" component={Auth} auth={auth} />

				{PAGES.map(({ title, href, component }) => (
					<PrivateRoute
						path={href}
						auth={auth}
						component={component}
					/>
				))}
				<Redirect from="/" to="/home" />
			</Switch>
		</div>
	);
}

export default withRouter(App);
