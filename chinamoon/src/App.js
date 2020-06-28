import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Menu from "./components/menu";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from './components/registerForm';



function App() {
  return (
    <main className="container">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/menu" component={Menu} />
        <Route path="/register" component={RegisterForm} />
        <Redirect from="/" exact to="menu" />
       
      </Switch>
    </main>
  );
}

export default App;
