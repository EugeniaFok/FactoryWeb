import "./ChoosePrint.css";
import { useEffect, useState } from "react";
import { Maker } from "./childs/Maker";
import { useDispatch } from "react-redux";
import { setPrintContent } from "../../store/reducer";
import { Scrollbars } from "rc-scrollbars";

function ChoosePrint(props) {
	const [prints, setPrints] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const response = await fetch(
				`http://${process.env.REACT_APP_HOST}/api/images`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const prints = await response.json();

			setPrints(prints ? prints : []);
		})();
	}, []);

	return (
		<div>
			<div className="caption-tablo">Выберите принт изделия:</div>
			<div className="chooser-workspace">
				<div className="maker_container">
					<Maker />
				</div>
				<div className="prints_container">
					<Scrollbars>
						<div className="print-list">
							<div className="list-body">
								{prints.map(print => (
									<div
										className="list-item"
										onClick={() => {
											dispatch(
												setPrintContent(
													print.contentsBase64
												)
											);
										}}
									>
										<div
											className="print-img"
											style={{
												backgroundImage: `url(data:image/png;base64,${print.contentsBase64})`,
											}}
										/>
										<div className="print-title">
											{print.name}
										</div>
									</div>
								))}
							</div>
						</div>
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

export default ChoosePrint;
