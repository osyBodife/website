import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
//import Like from "../common/like";

class AdminUserTable extends Component {
  
  columns = [
    {
      path: "name",
      label: "Name",
      content: (adminUser) => <Link to={`/admin/${adminUser._id}`}>{adminUser.name}</Link>,
    },
    { path: "adminUserType.name", label: "User Type" },

    { path: "username", label: "Username" },
    {
      key: "delete",
      content: (adminUser) => (
        <button
          onClick={() => this.props.onDelete(adminUser)}
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
    content: (adminUser) => (
      <button
        onClick={() => this.props.onDelete(adminUser)}
        className="tbn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  render() {
    const { adminUsers, onSort, sortColumn } = this.props;
    return (
      <Table
        data={adminUsers}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default AdminUserTable;
