import React, { Component } from "react";
import NavBar from "./adminNavBar";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };
  
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    
    account[input.name] = input.value;
    this.setState({ account });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  render() {
    
    const { account } = this.state;
      return (
          <>
              <div>
                  <NavBar />
      <div id="loginForm">
        <h2>Login Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">UserName</label>
            <input
              id="username"
              value={account.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              className="form-control"
              value={account.password}
              onChange={this.handleChange}
              name="password"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
              </div>
          </div>
          </>
    );
  }
}

export default LoginForm;
