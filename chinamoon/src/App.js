import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Menu from "./components/menu";
import NotFound from "./components/notFound"
import LoginForm from "./components/loginForm";
import RegisterForm from './components/registerForm';
import MenuForm from './components/menuForm';
import "./App.css";




function App() {
  return (
    <main className="container">
      <Switch>
    
        <Route path="/menu/:id" component={MenuForm} />        
        <Route path="/login" component={LoginForm} />
        <Route path="/menu" component={Menu} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="menu" />
        <Redirect to="/not-found" /> 
      
      </Switch>
    </main>
  );
}

export default App;
