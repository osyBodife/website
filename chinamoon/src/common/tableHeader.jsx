import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path; // this adds new path to the object
      sortColumn.order = "asc"; // adds new order to the object
    }

    this.props.onSort(sortColumn);
  };


  renderSortIcon = column => {
    // if (column.path !== this.props.sortColumn.path) return null;
    
    //with object desturing we can clean up the code
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
   
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    // again works with else statement
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th className='clickhead'
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
