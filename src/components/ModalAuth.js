import "./Modal.css";

function ModalAuth(props) {
	return props.isOpened ? (
		<div className="modal">
			<div className="modal-panel">
				<button className="factory-btn" onClick={props.onSetChange}>
					Сменить пароль
				</button>
				<button className="factory-btn" onClick={props.onSetExit}>
					Выход
				</button>
			</div>
		</div>
	) : null;
}
export default ModalAuth;
