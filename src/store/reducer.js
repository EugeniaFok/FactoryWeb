const initState = {
	role: "Client",
	isAuth: false,
	order: {
		id: "",
		colorId: "",
		modelId: "",
		sizeId: "",
		print: {
			id: "",
			width: 50,
			height: 50,
			base64: "",
			top: 0,
			left: 0,
		},
	},
	listOrders: [],
	listUsers: [],
	colors: [],
	models: [],
	prints: [],
	sizes: [],
};

// ACTIONS
export const changeRole = role => ({
	type: "CHANGE_ROLE",
	role,
});
export const changeIsAuth = isAuth => ({
	type: "SET_AUTH",
	isAuth,
});
export const setListOrders = listOrders => ({
	type: "SET_LIST_ORDERS",
	listOrders,
});
export const setListUsers = listUsers => ({
	type: "SET_LIST_USERS",
	listUsers,
});
export const setColors = colors => ({
	type: "SET_COLORS",
	colors,
});
export const setModels = models => ({
	type: "SET_MODELS",
	models,
});
export const setPrints = prints => ({
	type: "SET_PRINTS",
	prints,
});
export const setSizes = sizes => ({
	type: "SET_SIZES",
	sizes,
});
export const setColorId = colorId => ({
	type: "SET_COLOR_ID",
	colorId,
});
export const setModelId = modelId => ({
	type: "SET_MODEL_ID",
	modelId,
});
export const setSizeId = sizeId => ({
	type: "SET_SIZE_ID",
	sizeId,
});
export const setPrintSize = size => ({
	type: "SET_PRINT_SIZE",
	size,
});
export const setPrintContent = (id, base64, width, height) => ({
	type: "SET_PRINT_CONTENT",
	id,
	base64,
	width,
	height,
});

export const setOrder = order => ({
	type: "SET_ORDER",
	order,
});
// ACTIONS

export const reducer = (state = initState, action) => {
	switch (action.type) {
		case "CHANGE_ROLE":
			return { ...state, role: action.role };
		case "SET_AUTH":
			return { ...state, isAuth: action.isAuth };
		case "SET_LIST_ORDERS":
			return { ...state, listOrders: action.listOrders };
		case "SET_LIST_USERS":
			return { ...state, listUsers: action.listUsers };
		case "SET_COLORS":
			return { ...state, colors: action.colors };
		case "SET_MODELS":
			return { ...state, models: action.models };
		case "SET_PRINTS":
			return { ...state, prints: action.prints };
		case "SET_SIZES":
			return { ...state, sizes: action.sizes };
		case "SET_COLOR_ID":
			return {
				...state,
				order: {
					...state.order,
					colorId: action.colorId,
				},
			};
		case "SET_MODEL_ID":
			return {
				...state,
				order: {
					...state.order,
					modelId: action.modelId,
				},
			};
		case "SET_SIZE_ID":
			return {
				...state,
				order: {
					...state.order,
					sizeId: action.sizeId,
				},
			};
		case "SET_PRINT_CONTENT":
			return {
				...state,
				order: {
					...state.order,
					print: {
						...state.order.print,
						id: action.id,
						base64: action.base64,
						width: action.width,
						height: action.height,
					},
				},
			};
		case "SET_PRINT_SIZE":
			return {
				...state,
				order: {
					...state.order,
					print: {
						...state.order.print,
						top: action.size.top,
						left: action.size.left,
					},
				},
			};
		case "SET_ORDER":
			return { ...state, order: action.order };
		default:
			return state;
	}
};
