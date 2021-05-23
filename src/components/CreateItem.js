// import "./CreateItem.css";

function CreateItem(props) {
	return props.isOpened ? (
		<div className="modal">
			<div className="modal-panel">
				{props.children}
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
export default CreateItem;
