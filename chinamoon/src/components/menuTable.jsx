import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
//import Like from "../common/like";

class menusTable extends Component {
  
  columns = [
    {
      path: "title",
      label: "Menu",
      content: (menu) => <Link to={`/menu/${menu._id}`}>{menu.title}</Link>,
    },
    { path: "category.name", label: "Menu Type" },

    { path: "price", label: "Price" },
    {
      key: "delete",
      content: (menu) => (
        <button
          onClick={() => this.props.onDelete(menu)}
          className="tbn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  // extract delete code and create an object container
  deleteColumn = {
    key: "delete",
    content: (menu) => (
      <button
        onClick={() => this.props.onDelete(menu)}
        className="tbn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  render() {
    const { menus, onSort, sortColumn } = this.props;
    return (
      <Table
        data={menus}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default menusTable;
