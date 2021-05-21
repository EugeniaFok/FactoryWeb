import Tablo from './pages/Tablo/Tablo';
import IconHome from './images/tablo.svg';
import Auth from './pages/Auth/Auth';
import IconUser from './images/user.svg';
import CreateOrder from './pages/CreateOrder/CreateOrder';
import IconOrder from './images/home.svg';
import Confirmation from './pages/Confirmation/Confirmation';
import IconConfirmation from './images/confirm.svg';
import Users from './pages/Users/Users';
import IconUsers from './images/users.svg';
import Colors from './pages/Colors/Colors';
import IconColors from './images/color.svg';
import Prints from './pages/Prints/Prints';
import IconPrints from './images/print.svg';
import Models from './pages/Models/Models';
import IconModels from './images/model.svg';
import Sizes from './pages/Sizes/Sizes';
import IconSizes from './images/size.svg';
export const PAGES= [
    { title: 'Табло', href: '/home', component: Tablo, icon: IconHome},
    { title: 'Создание заказа', href: '/сreateOrder', component: CreateOrder, icon: IconOrder},
    { title: 'Подтверждение заказа', href: '/confirmation', component: Confirmation, icon: IconConfirmation},
    { title: 'Пользователи', href: '/users', component: Users, icon: IconUsers},
    { title: 'Цвета', href: '/сolors', component: Colors, icon: IconColors},
    { title: 'Принты', href: '/prints', component: Prints, icon: IconPrints},
    { title: 'Модели', href: '/models', component: Models, icon: IconModels},
    { title: 'Размеры', href: '/sizes', component: Sizes, icon: IconSizes},
];
export const INFO_AUTH = { title: 'Авторизация', href: '/auth', component: Auth, icon: IconUser}
;