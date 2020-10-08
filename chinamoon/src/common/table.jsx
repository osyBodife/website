import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
//using argument destructuring
//we remove (props)
//replace with ({columns, sortColumn, onSort, data})
//with that we no longer need props anywhere
const Table = ({ columns, sortColumn, onSort, data }) => {
  //const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />

      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
