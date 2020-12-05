import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import MenuListGroup from "./menuListGroup";
import { getCategories } from "../services/categoryService";
import { getMenus, deleteMenu } from "../services/menuService";
import { toast } from "react-toastify";
//import { getCategories } from "../services/dataCategories";
//import { getMenus } from "../services/dataMenus";
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

  async componentDidMount() {
    //const categories = [{ _id: "", name: "All Menu" }, ...getCategories()];
    //this.setState({ menus: getMenus(), categories: categories });
    const { data } = await getCategories();
    //console.log("data", data);

    const { data: menus } = await getMenus();

    const categories = [{ _id: "", name: "All Menu" }, ...data];
    this.setState({ menus, categories });




  }

  handleDelete = async (menu) => {
    const originalMenus = this.state.menus;
    //remove menu from menus array
    const menus = originalMenus.filter((m) => m._id !== menu._id);
    //update the state after change in the list of menus

    this.setState({ menus });
    //invoke the delete fn to actually delete the particular menu

    //await deleteMenu(menu._id)

    //it is possible the menu has already been deleted
    //so we should wrap the code in try block
    try {
      await deleteMenu(menu._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This menu has already been deleted ");
      //if get this error, we should return to status quo by setting the
      //state to original value
      this.setState({ menus: originalMenus });
    }
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
              <p>{`Showing ${totalCount} menus in the data base `}</p>

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
