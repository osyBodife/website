import React from "react";

const AdminUserListGroup = (props) => {
  const {
    categoryLists,
    onSelectCategory,
    selectedCategory,
    textProperty,
    valueProperty,
  } = props;

  return (
    <ul className="list-group">
      {categoryLists.map((category) => (
        <li
          id="clickable"
          key={category[valueProperty]}
          onClick={() => onSelectCategory(category)}
          className={
            category === selectedCategory
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {category[textProperty]}
        </li>
      ))}
    </ul>
  );
};

AdminUserListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default AdminUserListGroup;

/*
<ul className="list-group">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Morbi leo risus</li>
  <li className="list-group-item">Porta ac consectetur ac</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>



*/
