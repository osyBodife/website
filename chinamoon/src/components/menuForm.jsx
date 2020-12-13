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

  // refactoring with function ie separation of responsibilities
  async populateCategories() {
    const { data: categories } = await getCategories();

    this.setState({ categories });
  }

  async populateMenu() {
    try {
      const menuId = this.props.match.params.id;
      //if menuId is new, it means is for new menu to be added to db so return immediately
      if (menuId === "new") return;
      //we use the menuId obtained from url to fetch the menu uing getMenu() fn
      //get data and rename it to menu
      const { data: menu } = await getMenu(menuId);
      //if our menu exists, we update the state
      //extract the exact data we need
      let extracted_data = this.mapToViewModel(menu);
      //use extracted data to set the State
      this.setState({ data: extracted_data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    /*
    old WAy
    //when the component mounts we get our data
    //first, fetch our categories using getCategories () fn
    //get the data and rename it to categories to reduce corrections
    const { data: categories } = await getCategories();
    //console.log(categories)
    //with fetched data we set the state
    this.setState({ categories });
    //we use match.params to get the menuId from url
    const menuId = this.props.match.params.id;
    //if menuId is new, it means is for new menu to be added to db so return immediately
    if (menuId === "new") return;
    //we use the menuId obtained from url to fetch the menu uing getMenu() fn
    //get data and rename it to menu
    //enclose the code in a try & catch block
    try {
      const { data: menu } = await getMenu(menuId);
      //if our menu exists, we update the state
      //extract the exact data we need
      let extracted_data = this.mapToViewModel(menu);
      //use extracted data to set the State
      this.setState({ data: extracted_data });
    } catch (ex) {
            if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }

    */

    //new way
    //refactoring with functions
    await this.populateCategories();
    await this.populateMenu();
  }
  //create a fn to extract our specific data as defined by state object
  //the fn takes menu as an argument and returns reqd data
  mapToViewModel(menu) {
    return {
      _id: menu._id,
      title: menu.title,
      categoryId: menu.category._id,
      price: menu.price,
    };
  }
  //define our fn, where it receives it arguments
  doSubmit = async () => {
    await saveMenu(this.state.data);
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
              {this.renderSelect(
                "categoryId",
                "Menu Type",
                this.state.categories
              )}
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
