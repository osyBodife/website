import React from "react";
import Joi from "joi-browser";
import NavBar from "./adminNavBar";
import Form from "../common/form"

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    errors:{}
  };

  schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string()
      .required()
      .label("Username")
      .email({ minDomainAtoms: 2 }),
    password: Joi.string().required().min(5).label("Password"),
    
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
            <h2>Register User Form</h2>
            <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}

            {this.renderInput("username", "Username")}
             {this.renderInput("password", "Password", "password")}           

            {this.renderButton("Register")}
              

            
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterForm;
