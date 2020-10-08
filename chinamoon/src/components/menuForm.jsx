import React from "react";
import Form from "../common/form";
import NavBar from "./adminNavBar";
import Joi from "joi-browser";
import { getCategories } from "../services/categoryService";
import { getMenu, saveMenu } from "../services/menuService";

class MenuForm extends Form {
  state = {
    data: { title: "", categoryId: "", price: "" },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Menu"),
   
    categoryId: Joi.string().required().label("Menu Type"),
    
    price: Joi.number().required().min(0).max(100).label("Price"),
  };
  componentDidMount() {
    //when the component mounts we get our data
    //first, fetch our categories using getCategories () fn
    const categories = getCategories();
    //with fetched data we set the state
    this.setState({ categories });
    //we use match.params to get the menuId from url
    const menuId = this.props.match.params.id;
    //if menuId is new, it means is for new menu to be added to db so return immediately
    if (menuId === "new") return;
    //we use the menuId obtained from url to fetch the menu uing getMenu() fn
    const menu = getMenu(menuId);
    if (!menu) return this.props.history.replace("/not-found");
  //extract the exact data we need
    let extracted_data=this.mapToViewModel(menu);
      //use extracted data to set the State
    this.setState({ data: extracted_data });
  }
  //create a fn to extract our specific data as defined by state object
  //the fn takes menu as an argument and returns reqd data
  mapToViewModel(menu) {
    return {
      _id: menu._id,
      title: menu.title,
      categoryId: menu.category._id,
      price: menu.price
    };
  }
  doSubmit = () => {
      saveMenu(this.state.data)
   this.props.history.push("/menu");
  };

  render() {
    return (
      <>
        <div>
          <NavBar />
          <div id="loginForm">
            <h2>Menu Form</h2>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Menu")}              
              {this.renderSelect("categoryId","Menu Type", this.state.categories)}
              {this.renderInput("price", "Price")}

              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default MenuForm;
