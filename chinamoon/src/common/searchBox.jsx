import React from "react";

const SearchBox = ({ value, onQuery }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search...."
      value={value}
      onChange={(e) => onQuery(e.currentTarget.value)}
    />
  );
};

export default SearchBox;

/*
my-3   ie 
m is for margin
y- is for axix ie top and bottom

More notes
1. onQuery is just a fn reference, which means it is a POINTer to the real fn
2, we use fn pointers to pass real fns from one component to the other
3. onChange uses an event object to return a fn reference
4. the fn reference or pointer passes its argument to the real fn
Example
 onClick={() => onSelectCategory(category)}
 the above means that onClick fn uses anonymous fn to return a fn reference
 In the real fn, category is received as an argument




*/
