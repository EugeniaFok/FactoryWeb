import Tablo from "./pages/Tablo/Tablo";
import IconHome from "./images/tablo.svg";
import Auth from "./pages/Auth/Auth";
import IconUser from "./images/user.svg";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import IconOrder from "./images/home.svg";
import Confirmation from "./pages/Confirmation/Confirmation";
import IconConfirmation from "./images/confirm.svg";
import Users from "./pages/Users/Users";
import IconUsers from "./images/users.svg";
import Colors from "./pages/Colors/Colors";
import IconColors from "./images/color.svg";
import Prints from "./pages/Prints/Prints";
import IconPrints from "./images/print.svg";
import Models from "./pages/Models/Models";
import IconModels from "./images/model.svg";
import Sizes from "./pages/Sizes/Sizes";
import IconSizes from "./images/size.svg";
import GetTask from "./pages/Task/Task";
export const PAGES = [
	{
		title: "Табло",
		href: "/home",
		component: Tablo,
		icon: IconHome,
		role: ["Board", "Administrator"],
	},
	{
		title: "Создание заказа",
		href: "/сreateOrder",
		component: CreateOrder,
		icon: IconOrder,
		role: ["Client"],
	},
	{
		title: "Заказы",
		href: "/orders",
		component: Confirmation,
		icon: IconConfirmation,
		role: ["Reception", "Administrator", "Issuer"],
	},
	{
		title: "Пользователи",
		href: "/users",
		component: Users,
		icon: IconUsers,
		role: ["Administrator"],
	},
	{
		title: "Цвета",
		href: "/сolors",
		component: Colors,
		icon: IconColors,
		role: ["Administrator"],
	},
	{
		title: "Принты",
		href: "/prints",
		component: Prints,
		icon: IconPrints,
		role: ["Administrator"],
	},
	{
		title: "Модели",
		href: "/models",
		component: Models,
		icon: IconModels,
		role: ["Administrator"],
	},
	{
		title: "Размеры",
		href: "/sizes",
		component: Sizes,
		icon: IconSizes,
		role: ["Administrator"],
	},
	{
		title: "Задание",
		href: "/task",
		component: GetTask,
		icon: IconHome,
		role: ["Writer", "Printer"],
	},
];
export const INFO_AUTH = {
	title: "Авторизация",
	href: "/auth",
	component: Auth,
	icon: IconUser,
};
export const ROLES = [
	"Administrator",
	"Reception",
	"Writer",
	"Printer",
	"Issuer",
	"Board",
];
