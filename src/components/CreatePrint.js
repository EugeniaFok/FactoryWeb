// import "./CreateItem.css";
import { useState } from "react";

function CreatePrint(props) {
	const types = ["jpg", "svg"];
	const [name, setName] = useState("");
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [type, setType] = useState(types[0]);
	const [contentsBase64, setImage] = useState("");

	// "name": "Груша",
	// "width": 640,
	// "height": 480,
	// "type": "jpg",
	// "contentsBase64": "MjM0d2VvZmljajRydnVgPWMyM2lyeC1pYC0zNT1j"
	return props.isOpened ? (
		<div className="modal">
			<div className="modal-panel">
				<div className="row-input">
					<label for="name">Наименование</label>
					<input
						type="text"
						id="name"
						placeholder="Введите наименование"
						onChange={event => setName(event.target.value)}
					/>
				</div>
				<div className="row-input">
					<label for="width">Ширина</label>
					<input
						type="password"
						id="width"
						placeholder="Введите ширину"
						onChange={event => setWidth(event.target.value)}
					/>
				</div>
				<div className="row-input">
					<label for="height">Высота</label>
					<input
						type="password"
						id="height"
						placeholder="Введите высоту"
						onChange={event => setHeight(event.target.value)}
					/>
				</div>
				<div className="row-input">
					<label for="role">Тип расширения</label>
					<select
						list="listRole"
						id="role"
						placeholder="Выберите роль"
						style={{ width: "50px" }}
						onChange={event => setType(event.target.value)}
					>
						{types.map(element => (
							<option>{element}</option>
						))}
					</select>
				</div>
				<div className="row-input">
					<label for="image">Картинка</label>
					<input
						type="file"
						id="image"
						name="contentsBase64"
						accept={"image/*, image/" + type}
						OnChange={event =>
							setImage(event.target.value.contentsBase64)
						}
					/>
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
export default CreatePrint;
