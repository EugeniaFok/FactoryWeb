const signinHandler = (login, password, rememberMe) => () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept', '*/*');
    const raw = JSON.stringify({
      Login: login,
      Password: password, // AAAaaa!2345
      RememberMe: rememberMe,
    });

    fetch("http://localhost:50000/api/account/login", {
      method: "POST",
      headers,
      body: raw,
      redirect: "follow",
      mode: 'no-cors'
    })
      .then(response => response.text())
      .then(result => console.log(result));
};

export default signinHandler;