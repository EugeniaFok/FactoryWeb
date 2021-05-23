import "./Modal.css";

function ModalConfirm(props) {
	return props.isOpened ? (
		<div className="modal">
			<div className="modal-panel">
				<div className="caption-tablo">{props.answer}</div>
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
export default ModalConfirm;
