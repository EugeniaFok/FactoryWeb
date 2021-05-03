import Home from './pages/Home';
import IconHome from './home.svg';
import Auth from './pages/Auth';
import IconUser from './user.svg';

const PAGES = [
    { title: 'Главная', href: '/home', component: Home, icon: IconHome},
    { title: 'Авторизация', href: '/auth', component: Auth, icon: IconUser}
];

export default PAGES;