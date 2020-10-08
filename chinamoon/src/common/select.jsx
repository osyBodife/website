import React from 'react';
const Select = ({ name, label,options, error, ...rest }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} {...rest} className="custom-select">
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>{option.name}</option>
          ))}
        </select>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
}
 
export default Select;


/*
<select class="custom-select">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>


*/