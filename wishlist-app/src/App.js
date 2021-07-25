import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Lists from './Components/Lists/Lists';
import List from './Components/List/List';
import LoginForm from './Components/LoginForm/LoginForm';

export default function App() {
  const [username, setUser] = useState({username: '', accessLevel: 0});
  const [error, setError] = useState("");

  const Login = details => {
    fetch("/auth/login", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        username: details.username,
        password: details.password
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response.data) {
            localStorage.setItem("accessLevel", response.data.access || 0);
            setUser({
              username: response.data.username,
              accessLevel: response.data.accessLevel
            });
        } else {
          setError('Incorrect login details');
        }
    })
    .catch(err => {
        setError('Unable to login');
    });
  }
  const Logout = () => {
    if (username) {
      setUser({username: ''});
    }
    setError('');
    localStorage.clear();
  }

  return (
    <div className="wrapper"> 
      {(localStorage.getItem("accessLevel")) ? (
        <div>
          <a href="/" className="h1"><h1>Wishlist</h1></a>
          <button className="logout" onClick={Logout}>Logout</button>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Lists />
              </Route>
              <Route path="/list/:id">
                <List />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      ): (
        <div class="login-page">
          <a href="/" className="h1"><h1>Wishlist</h1></a>
          <LoginForm Login={Login} error={error} />
        </div>
      )}
    </div>
  );
}
