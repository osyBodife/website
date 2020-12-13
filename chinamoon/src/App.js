import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Menu from "./components/menu";
import NotFound from "./components/notFound"
import LoginForm from "./components/loginForm";
import RegisterForm from './components/registerForm';
import MenuForm from './components/menuForm';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Blocked from './components/blocked';
import AdminUsers from './components/adminUsersList'



class App extends Component {
render () {
  return (
    <>
    <ToastContainer />
    <main className="container">
      <Switch>    
        <Route path="/menu/:id" component={MenuForm} />   
        <Route path="/admin/:id" component={RegisterForm} />     
        <Route path="/login" component={LoginForm} />
        <Route path="/menu" component={Menu} />
        <Route path="/admin" component= {AdminUsers} />
       
        <Route path="/not-found" component={NotFound} />
        <Route path="/blocked" component={Blocked} />
        <Redirect from="/" exact to="menu" />
        <Redirect to="/not-found" /> 
        <Redirect to="/blocked" /> 
      
      </Switch>
    </main>
    </>
  );
}
}
export default App;
