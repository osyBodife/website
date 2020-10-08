import React from "react";


const MenuTable = (props) => {
  const { menus, onDelete,  onSort } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Menu
          </th>
          <th onClick={() => onSort("category.name")} scope="col">
           Menu Type
          </th>
          
          <th onClick={() => onSort("price")} scope="col">
            Price
          </th>
          <th />
         
        </tr>
      </thead>
      <tbody>
        {menus.map((menu) => (
          <tr key={menu._id}>
            <td>{menu.title}</td>
            <td>{menu.category.name}</td>
            <td>{menu.price}</td>
           
            <td>
              <button
                onClick={() => onDelete(menu)}
                className="tbn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;
