const initState = {
	role: "",
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
export const getListOrders = listOrders => ({
	type: "GET_LIST_ORDERS",
	listOrders,
});
export const getListUsers = listUsers => ({
	type: "GET_LIST_USERS",
	listUsers,
});
export const getListColors = listColors => ({
	type: "GET_LIST_COLORS",
	listColors,
});
export const getListModels = listModels => ({
	type: "GET_LIST_MODELS",
	listModels,
});
export const getListPrints = listPrints => ({
	type: "GET_LIST_PRINTS",
	listPrints,
});
export const getListSizes = listSizes => ({
	type: "GET_LIST_SIZES",
	listSizes,
});

export const reducer = (state = initState, action) => {
	switch (action.type) {
		case "CHANGE_ROLE":
			return { ...state, role: action.role };
		case "GET_LIST_ORDERS":
			return { ...state, listOrders: action.listOrders };
		case "GET_LIST_USERS":
			return { ...state, listUsers: action.listUsers };
		case "GET_LIST_COLORS":
			return { ...state, listColors: action.listColors };
		case "GET_LIST_MODELS":
			return { ...state, listModels: action.listModels };
		case "GET_LIST_PRINTS":
			return { ...state, listPrints: action.listPrints };
		case "GET_LIST_SIZES":
			return { ...state, listSizes: action.listSizes };
		default:
			return state;
	}
};
