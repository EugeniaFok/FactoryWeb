import "./ChooseSize.css";
import { useEffect } from "react";

function ChooseSize(props) {
	useEffect(() => {
		sizesList(alert);
	}, []);

	const sizesList = callback => () => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Accept", "*/*");

		fetch("http://localhost:50000/api/Sizes", {
			method: "GET",
			headers,
			redirect: "follow",
			credentials: "include",
		}).then(response => {
			if (response.status) {
				callback(response.text);
			}
		});
	};
	return (
		<div className="tablo-order-choose">
			{/* {props.colors.map(({ name, value }) =>
                <button className="block-size">  
                    {value}
                </button> 
            )} */}
			<button className="block-size">XSS</button>
			<button className="block-size">XS</button>
			<button className="block-size">S</button>
		</div>
	);
}

export default ChooseSize;
