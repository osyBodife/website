import React from "react";
import Joi from "joi-browser";
import NavBar from "./adminNavBar";

import Form from "../common/form"

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  // using joi library for validation
  //create a schema

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
 

  doSubmit= ( )=>{
    console.log (" Form Submitted");
  }
  
  render() {
    
    return (
      <>
        <div>
          <NavBar />
          <div id="loginForm">
            <h2>Login Form</h2>
            <form onSubmit={this.handleSubmit}>
             {this.renderInput("username", "Username")}
             {this.renderInput("password", "Password", "password")}           

            {this.renderButton("Login")}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
