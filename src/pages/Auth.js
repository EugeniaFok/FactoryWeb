import "./Auth.css";
import {useState} from 'react';
import signinHandler from '../funcTest';

function Auth(){
    let initialCheck = true;
    const [check, setCheckRemember] = useState(initialCheck);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="auth-panel">    
            <div className="row-input">
                <label for="login">Логин</label>
                <input type="text" id="login" placeholder="Введите логин" onChange={(event) => setLogin(event.target.value)}/>
            </div>       
            <div className="row-input">
                <label for="password">Пароль</label>
                <input type="password" id="password" placeholder="Введите пароль" onChange={(event) => setPassword(event.target.value)}/>
            </div>      
            <button className="signin" onClick={signinHandler(login, password, check)}>Войти</button>
            <div className="remember-check">
                <input type="checkbox" id="remeber" onClick={() => setCheckRemember(!check)} checked={check}/>
                <label for="remeber">Запомнить меня</label>
            </div>
        </div>
    );
}

export default Auth;