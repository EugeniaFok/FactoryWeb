const initState = {
	role: "",
	order: {
		colorId: "",
		modelId: "",
		print: {
			width: 50,
			height: 50,
			base64: "",
		},
	},
	listOrders: [],
	listUsers: [],
	listColors: [],
	listModels: [],
	listPrints: [],
	listSizes: [],
};

// ACTIONS
export const changeRole = role => ({
	type: "CHANGE_ROLE",
	role,
});
export const setListOrders = listOrders => ({
	type: "SET_LIST_ORDERS",
	listOrders,
});
export const setListUsers = listUsers => ({
	type: "SET_LIST_USERS",
	listUsers,
});
export const setListColors = listColors => ({
	type: "SET_LIST_COLORS",
	listColors,
});
export const setListModels = listModels => ({
	type: "SET_LIST_MODELS",
	listModels,
});
export const setListPrints = listPrints => ({
	type: "SET_LIST_PRINTS",
	listPrints,
});
export const setListSizes = listSizes => ({
	type: "SET_LIST_SIZES",
	listSizes,
});
export const setColorId = colorId => ({
	type: "SET_COLOR_ID",
	colorId,
});
export const setModelId = modelId => ({
	type: "SET_MODEL_ID",
	modelId,
});
export const setPrintSize = size => ({
	type: "SET_PRINT_SIZE",
	size,
});
export const setPrintContent = base64 => ({
	type: "SET_PRINT_CONTENT",
	base64,
});
// ACTIONS

export const reducer = (state = initState, action) => {
	switch (action.type) {
		case "CHANGE_ROLE":
			return { ...state, role: action.role };
		case "SET_LIST_ORDERS":
			return { ...state, listOrders: action.listOrders };
		case "SET_LIST_USERS":
			return { ...state, listUsers: action.listUsers };
		case "SET_LIST_COLORS":
			return { ...state, listColors: action.listColors };
		case "SET_LIST_MODELS":
			return { ...state, listModels: action.listModels };
		case "SET_LIST_PRINTS":
			return { ...state, listPrints: action.listPrints };
		case "SET_LIST_SIZES":
			return { ...state, listSizes: action.listSizes };
		case "SET_MODEL_ID":
			return {
				...state,
				order: {
					...state.order,
					modelId: action.modelId,
				},
			};
		case "SET_COLOR_ID":
			return {
				...state,
				order: {
					...state.order,
					colorId: action.colorId,
				},
			};
		case "SET_PRINT_CONTENT":
			return {
				...state,
				order: {
					...state.order,
					print: { ...state.order.print, base64: action.base64 },
				},
			};
		case "SET_PRINT_SIZE":
			return {
				...state,
				order: {
					...state.order,
					print: {
						...state.order.print,
						width: action.size.width,
						height: action.size.height,
					},
				},
			};
		default:
			return state;
	}
};
