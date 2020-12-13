import React from "react";
import Joi from "joi-browser";
import NavBar from "./adminNavBar";
import Form from "../common/form";
//import { getAdminUserTypes } from "../services/adminUserTypes";
import { getAdminUserTypes } from "../services/adminUserTypeService";
import { getAdminUser, saveAdminUser } from "../services/adminUserService";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", adminUserTypeId: "", password: "" },
    adminUserTypes: [],
    errors: {},
  };

  //Entire form Schema
  //note that this is different from each input field schema
  //see validateProperty fn at form.jsx
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    username: Joi.string()
      .required()
      .label("Username")
      .email({ minDomainAtoms: 2 }),
    adminUserTypeId: Joi.string().required().label("Admin User Type"),
    password: Joi.string().required().min(5).label("Password"),
  };

  // refactoring with function ie separation of responsibilities
  async fetchAdminUserTypes() {
    const { data: adminUserTypes } = await getAdminUserTypes();

    this.setState({ adminUserTypes });
  }

  async fetchAdminUser() {
    try {
      const adminUserId = this.props.match.params.id;
      //if menuId is new, it means is for new menu to be added to db so return immediately
      if (adminUserId === "register") return;

      //we use the menuId obtained from url to fetch the menu uing getMenu() fn
      //get data and rename it to menu
      const { data: adminUser } = await getAdminUser(adminUserId);
      //if our menu exists, we update the state
      //extract the exact data we need
      let extracted_data = this.extractDataFn(adminUser);
      //use extracted data to set the State
      this.setState({ data: extracted_data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  extractDataFn(adminUser) {
    return {
      _id: adminUser._id,
      name: adminUser.name,      
      username: adminUser.username,
      adminUserTypeId: adminUser.adminUserType._id,
      password: adminUser.password,
    };
  }

  async componentDidMount() {
    //invoke our fns
    await this.fetchAdminUserTypes();
    await this.fetchAdminUser();
  }

  doSubmit = async () => {
    console.log("Submitted Data :", this.state.data);
    await saveAdminUser(this.state.data);
    this.props.history.push("/menu");
  };
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

              {this.renderSelect(
                "adminUserTypeId",
                "Admin User Type",
                this.state.adminUserTypes
              )}
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
