import "./CreateOrder.css";
import ChooseColor from "./ChooseColor";
import ChooseModel from "./ChooseModel";
import ChooseSize from "./ChooseSize";
import ChoosePrint from "./ChoosePrint";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function CreateOrder() {
	const phases = ["color", "model", "size", "print", "creat"];
	const [phase, setPhase] = useState(phases[0]);

	return (
		<div>
			<div className="caption-page">Новый заказ</div>
			{phase === "color" ? (
				<ChooseColor />
			) : phase === "model" ? (
				<ChooseModel />
			) : phase === "size" ? (
				<ChooseSize />
			) : phase === "print" ? (
				<ChoosePrint />
			) : (
				<CreationPanel />
			)}
			<div className="control-choose">
				<button
					className="factory-btn"
					onClick={() => {
						let prevIndex = phases.indexOf(phase) - 1;
						let curPhase =
							prevIndex < 0 ? phase : phases[prevIndex];
						setPhase(curPhase);
					}}
				>
					⮜ Назад
				</button>
				<button
					className="factory-btn"
					onClick={() => {
						let nextIndex = phases.indexOf(phase) + 1;
						let curPhase =
							nextIndex > phases.length - 1
								? phase
								: phases[nextIndex];
						setPhase(curPhase);
					}}
				>
					Вперед ⮞
				</button>
			</div>
		</div>
	);
}

// {
// 	"modelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// 	"sizeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// 	"side": 0,
// 	"imageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// 	"top": 0,
// 	"left": 0,
// 	"clientName": "string",
// 	"clientPhone": "string"
// }
const createOrderHandler =
	(model, size, image, x, y, fullName, phone, callback) => () => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Accept", "*/*");
		const raw = JSON.stringify({
			modelId: model,
			sizeId: size,
			imageId: image,
			top: x,
			left: y,
			clientName: fullName,
			clientPhone: phone,
		});

		fetch(`http://${process.env.REACT_APP_HOST}/api/Orders`, {
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

function CreationPanel() {
	const history = useHistory();
	let top, left;
	const { modelId, sizeId, printId } = useSelector(state => {
		const {
			modelId,
			sizeId,
			print: { id: printId },
		} = state.order;

		return { modelId, sizeId, printId };
	});
	const [clientName, setClientName] = useState("");
	const [clientPhone, setClientPhone] = useState("");

	const redirectTablo = function () {
		window.location.reload();
		history.push("/");
	};

	return (
		<div>
			<div className="caption-tablo">Введите следущие данные:</div>
			<div className="tablo-order-choose">
				<div className="tablo-order-create">
					<div className="row-input">
						<label for="fullName">ФИО:</label>
						<input
							type="text"
							id="fullName"
							placeholder="Введите ФИО"
							onChange={event =>
								setClientName(event.target.value)
							}
						/>
					</div>
					<div className="row-input">
						<label for="number">Номер телефона:</label>
						<input
							type="text"
							id="number"
							placeholder="Введите номер телефона"
							onChange={event =>
								setClientPhone(event.target.value)
							}
						/>
					</div>
					<button
						className="createOrder"
						onClick={createOrderHandler(
							modelId,
							sizeId,
							printId,
							0,
							0,
							clientName,
							clientPhone,
							redirectTablo
						)}
					>
						Создать
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateOrder;
