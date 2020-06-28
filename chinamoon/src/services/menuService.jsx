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

export function getMMenu(id) {
  return menus.find((m) => m._id === id);
}

export function saveMenu(menu) {
  let menuInDb = menus.find((m) => m._id === menu._id) || {};
  menuInDb.title = menu.title;
  menuInDb.category = categoriesAPI.categories.find(
    (g) => g._id === menu.categoryId
  );
  

  if (!menuInDb._id) {
    menuInDb._id = Date.now().toString();
    menus.push(menuInDb);
  }

  return menuInDb;
}

export function deletemenu(id) {
  let menuInDb = menus.find((m) => m._id === id);
  menus.splice(menus.indexOf(menuInDb), 1);
  return menuInDb;
}
