import * as categoriesAPI from "./categoryService";

const menus = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Breakfast I",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Breakfast II",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 6.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Dinner I",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
    price: 7.56,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Lunch I",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    price: 8.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Lunch II",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Lunch III",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Dinner II",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Dinner III",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Breakfast III",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 5.99,
  },
];

export function getMenus() {
  return menus;
}

export function getMenu(id) {
  return menus.find((m) => m._id === id);
}

export function saveMenu(menu) {
  //first check if the menu already exists in the list of menus
  // if it does, we assign it to a variable 
  // this is necessary to be able to access elements in the object , 
  // then be able to edit them otherwise we cannot access it
  let menuInDb = menus.find((m) => m._id === menu._id) || {};  
  //add elements to menuInDb object
  menuInDb.title = menu.title;
  //find the category menu object belongs to
  // and assign it to menuInDb
  menuInDb.category = categoriesAPI.categories.find(
    (g) => g._id === menu.categoryId
  );
// add or edit price
  menuInDb.price = menu.price;
//add menu id if no id exists
//this applies to new menu
  if (!menuInDb._id) {
    menuInDb._id = Date.now().toString();
    menus.push(menuInDb);
  }
  //console.log(menuInDb);
  //terminate fn with a return statement
  return menuInDb;
  
}

export function deletemenu(id) {
  let menuInDb = menus.find((m) => m._id === id);
  menus.splice(menus.indexOf(menuInDb), 1);
  return menuInDb;
}
