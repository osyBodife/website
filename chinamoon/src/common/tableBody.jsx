import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  // this component job's is to extract movies object and display it
  // it uses lodash -.get() method to do so
  // sytnax _.get(objectWeWantItsContent, propertyNameWeNeedItsValue)
  // the propertyName is provided by column.path;
  // the way columns object is structured not every element has column.path
  // so _.get() would not work for very element

  //to simplify the code, we create a function that takes
  // item which is a movie object and column as arguments
  //if column.content exist we use return to call the function
  //which executes the function and return its contents
  // recall that content: movie =>(...) means content is a function that takes movie as an argumnet
  // recall that item and column are products of map() iteration below
  renderCell = (item, column) => {
    //in the columns object, if column.content exist
    //execute the fumction and return the jsx expression attached to it
    //if (column.content) return column.content(item);
    if (column.content) {
      return column.content(item);
    }
  
    //return _.get(item, column.path);
    if (column.path) {
      return _.get(item, column.path);
    }
    // recall that _.get needs an object and its property to access it value
    //ie _.get(object, propertyName)// will give us the value of that property
    //so to access the value of item which is a movie object we need the propertyName
    //-.get(item , column.path) only works where column.path exist, that is why we using if(column.content).....
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
