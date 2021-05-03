import "./Auth.css";

// const style = {
//     column: {
//         width: "50%"
//     },
//     form: {
//         display: "flex"
//     },
//     caption: {
//         borderBottom: "2px solid black",
//         padding: "10px 0",
//         fontFamily: "Verdana"
//     }
// };

function Auth(){
    return (
        <div className="auth-panel">    
            <div className="row-input">
                <label>Логин</label>
                <input type="text" placeholder="Введите логин"/>
            </div>       
            <div className="row-input">
                <label>Пароль</label>
                <input type="password" placeholder="Введите пароль"/>
            </div>      
            <button className="singin">Войти</button>
      </div>
    );
}

export default Auth;