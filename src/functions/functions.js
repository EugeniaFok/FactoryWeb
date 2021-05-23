export const RegisteredHandler = callback => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(`http://${process.env.REACT_APP_HOST}/api/account/registered`, {
		method: "POST",
		headers,
		redirect: "follow",
		credentials: "include",
	}).then(response => {
		if (response.status === 200) {
			callback(true);
		} else {
			callback(false);
		}
	});
};
export const getList = (url, callback) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(url, {
		method: "GET",
		headers,
		redirect: "follow",
		credentials: "include",
	})
		.then(response => {
			if (response.status === 200) {
				return response.json();
			}
		})
		.then(data => {
			callback(data);
		});
};
export const deleteItem = (url, callback) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(url, {
		method: "DELETE",
		headers,
		redirect: "follow",
		credentials: "include",
	}).then(response => {
		if (response.status === 204) {
			callback();
		}
	});
};
export function deleteListItemId(listItem, id) {
	return listItem.filter(item => item.id !== id);
}

export const createItem = (url, body, callback) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	try {
		fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
			redirect: "follow",
			credentials: "include",
		})
			.then(async response => {
				if (response.status === 200) {
					return [true, await response.json()];
				} else {
					return [false, await response.json()];
				}
			})
			.then(([success, data]) => {
				if (success) {
					callback(data);
				} else {
					alert("Ошибка:" + data.title);
				}
			});
	} catch (error) {
		alert("Ошибка:", error.message);
	}
};

export const createUser = (url, body, callback) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
		redirect: "follow",
		credentials: "include",
	}).then(response => {
		if (response.status === 204) {
			callback();
		}
	});
};

export const logout = callback => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(`http://${process.env.REACT_APP_HOST}/api/Account/logout`, {
		method: "POST",
		headers,
		redirect: "follow",
		credentials: "include",
	}).then(response => {
		if (response.status === 204) {
			callback(true);
		}
	});
};

export const changePassword = (body, callback) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "*/*");

	fetch(`http://${process.env.REACT_APP_HOST}/api/Account/changePassword`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
		redirect: "follow",
		credentials: "include",
	}).then(response => {
		if (response.status === 204) {
			callback(true);
		}
	});
};
export function addListItem(listItem, newItem) {
	listItem.push(newItem);
	return listItem;
}

export function setFilterList(listItems, strSearch) {
	let result, strList;
	strSearch = "/" + strSearch + "/g";

	for (var i = 0; i < listItems.length; i++) {
		//все значения полей в строку
		let obj = listItems[i];
		for (var key in obj) {
			strList = strList + obj[key];
		}
		if (strList.match(strSearch)) {
			result.push(obj);
		}
	}
	return result;
}
