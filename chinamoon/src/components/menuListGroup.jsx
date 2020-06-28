import React from "react";

const MenuListGroup = (props) => {
  
  const { categoryLists, onSelectCategory, selectedCategory } = props;
   
  return (
    <ul class="list-group">
      {categoryLists.map((category) => (
        <li
          id="clickable"
          key={category._id}
          onClick={() => onSelectCategory(category)}
          className={
            category === selectedCategory
              ? "list-group-item active"
              : "list-group-item"
          }
          
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}
 
export default MenuListGroup;


/*
<ul class="list-group">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>



*/
