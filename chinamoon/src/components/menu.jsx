import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import MenuListGroup from "./menuListGroup";
import { getCategories } from "../services/categoryService";
import { getMenus } from "../services/menuService";
import SlideShow from "../common/slideShow";
import SearchBox from "../common/searchBox";
import Footer from "../common/footer";
import NavBar from "./navBar";
import MenuTable from "./menuTable";
import Pagination from "../common/pagination";
import { paginate } from "../utils/pagination";

class Menu extends Component {
  state = {
    menus: [],
    categories: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const categories = [{ _id: "", name: "All Menu" }, ...getCategories()];
    this.setState({ menus: getMenus(), categories: categories });
  }

  handleDelete = (menu) => {
    const menus = this.state.menus.filter((m) => m._id !== menu._id);

    this.setState({ menus });
  };

  handleSearch = (query) => {    
    this.setState({
      searchQuery: query,
      selectedCategory: null,
      currentPage: 1,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = (category) => {
    this.setState({
      selectedCategory: category,
      searchQuery: "",
      currentPage: 1,
    });
  };
  handleSort = (sortColumn) => {
    //console.log(sortColumn);
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedCategory,
      searchQuery,
      menus: allMenus,
    } = this.state;

    let filtered = allMenus;
    if (searchQuery) {
      filtered = allMenus.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory._id) {
      filtered = allMenus.filter(
        (m) => m.category._id === selectedCategory._id
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const menus = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: menus };
  };

  render() {
    const { length: count } = this.state.menus;
    if (count === 0) return "There are no menus";

    const {
      categories,
      selectedCategory,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: menus } = this.getPageData();
    return (
      <>
        <div>
          <NavBar />
          <SlideShow />
          <div className="row">
            <div className="col-2">
              <MenuListGroup
                categoryLists={categories}
                onSelectCategory={this.handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </div>

            <div className="col">
              <Link to="/menu/new" className="btn btn-secondary">
                Add New Menu
              </Link>
              <p>Showing {totalCount} menus in the data base </p>
              <SearchBox value={searchQuery} onQuery={this.handleSearch} />
              <MenuTable
                menus={menus}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Menu;
