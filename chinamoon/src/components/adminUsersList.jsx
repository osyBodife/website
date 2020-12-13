import React, { Component } from "react";
import _ from "lodash";
//import { Link } from "react-router-dom";
import AdminUserTable from "./adminUsersTable";
import AdminUserListGroup from "./adminUserListGroup"
import { getAdminUserTypes } from "../services/adminUserTypeService";
//import { getadminUsers, deleteMenu } from "../services/adminUserservice";
import { getAdminUsers, deleteAdminUser } from "../services/adminUserService";
import { toast } from "react-toastify";
//import SlideShow from "../common/slideShow";
import SearchBox from "../common/searchBox";
import Footer from "../common/footer";
import NavBar from "./navBar";

import Pagination from "../common/pagination";
import { paginate } from "../utils/pagination";

class AdminUsers extends Component {
  state = {
    adminUsers: [],
    adminUserTypes: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    //const adminUserTypes = [{ _id: "", name: "All Menu" }, ...getadminUserTypes()];
    //this.setState({ adminUsers: getadminUsers(), adminUserTypes: adminUserTypes });
    const { data } = await getAdminUserTypes();
    //console.log("data", data);

    const {data:adminUsers} = await getAdminUsers();
    //console.log("our result....", adminUsers)

    const adminUserTypes = [{ _id: "", name: "All Admin Users" }, ...data];
    this.setState({ adminUsers, adminUserTypes });
  }

  handleDelete = async (adminUser) => {
    const originalAdminUsers = this.state.adminUsers;
    //remove menu from adminUsers array
    const adminUsers = originalAdminUsers.filter((m) => m._id !== adminUser._id);
    //update the state after change in the list of adminUsers

    this.setState({ adminUsers });
    //invoke the delete fn to actually delete the particular menu

    //await deleteMenu(menu._id)

    //it is possible the menu has already been deleted
    //so we should wrap the code in try block
    try {
      await deleteAdminUser(adminUser._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This AdminUser has already been deleted ");
      //if get this error, we should return to status quo by setting the
      //state to original value
      this.setState({ adminUsers: originalAdminUsers });
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

  handleCategorySelect = (adminUserType) => {
    this.setState({
      selectedCategory: adminUserType,
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
      adminUsers: allAdminUsers,
    } = this.state;

    let filtered = allAdminUsers;
    if (searchQuery) {
      filtered = allAdminUsers.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory._id) {
      filtered = allAdminUsers.filter(
        (m) => m.adminUserType._id === selectedCategory._id
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const adminUsers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: adminUsers };
  };

  render() {
    const {
      adminUserTypes,
      selectedCategory,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: adminUsers } = this.getPageData();

    return (
      <>
        <div>
          <NavBar />

          <div className="row">
            <div className="col-2">
              <AdminUserListGroup
                categoryLists={adminUserTypes}
                onSelectCategory={this.handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </div>

            <div className="col">
              <p>{`Showing ${totalCount} Admin Users in the data base `}</p>

              <SearchBox value={searchQuery} onQuery={this.handleSearch} />
              <AdminUserTable
                adminUsers={adminUsers}
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

export default AdminUsers;
