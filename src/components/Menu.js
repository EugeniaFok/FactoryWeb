import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { PAGES, INFO_AUTH } from "../RoutePages";

function Menu() {
	return (
		<header className="menu">
			<div className="page-title">Factory</div>
			<ul>
				{PAGES.map(({ title, href, icon }) => (
					<Link className="SectionNavigation-Item Section" to={href}>
						<li className="item-menu">
							<img className="icon" src={icon} alt={title} />
						</li>
					</Link>
				))}
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
			</ul>
		</header>
	);
}
export default Menu;
