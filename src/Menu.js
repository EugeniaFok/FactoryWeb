import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';
import PAGES from './RoutePages';

function Menu(){
    return (
        <header className="menu" > 
            <div className="page-title">Factory</div>          
            <ul>
                {PAGES.map(({ title, href, icon }) => (
                    <li>
                        <Link className='SectionNavigation-Item Section' to={href}>           
                            <img className='icon' src={icon} alt={title} />
                        </Link>
                    </li>
                ))}               
            </ul>           
        </header>
    );
}
export default Menu;