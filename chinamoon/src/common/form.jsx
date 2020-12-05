import React,{ Component } from "react";
import Input from "./input"
import Select from "./select"
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    //we call the Joi method
    let options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //console.log(result);
    if (!error) {
      return null;
    }
    const errors = {}; // creates the error object
    for (let item of error.details) {
      errors[item.path[0]] = item.message; // adds an element into errors object
      return errors;
    }
  };

  validateProperty = ({ name, value }) => {
    // to validate each field individually,
    // we need a new object that defines the input field and its value
    // to do so dynamically, we would use computed propertiess [xxy]
    const eachFieldObj = { [name]: value };
    // to validate the above oject, we need a new schema for it
    // while the property is dynamically obtained, its value is
    // obtained from the Form schema or this.schema
    const eachFieldSchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(eachFieldObj, eachFieldSchema);
    //details[0] bcos ONLY one array element at a time
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target.value);
    const errors = this.validate();
    //console.log(errors);
    if (errors != null) {
      this.setState({ errors });
      return;
    }

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    /*
    Note
    1. Each input field has onChange fn
    2. the fn gets the input, validates it
    3. rtn error or correct data
    4. updates the state for this input field
    In otherwords for each change the state is updated
    5.When the ENTIRE FORM  is submitted, onSubmit() kicks in
    6. onSubmit() is a reference the actual fn handleSubmit() which
    7. It the handleSubmit() decides what happens to the submitted data

    */
    //note the difference btw cloning and destructuring
    //clone errors , to able to access it here
    //cloning makes ANOTHER copy
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      //add to errors object
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
// destructuring brings down the SAME data here
    //const { data } = { ...this.state };
    //clone also works
    const data ={...this.state.data};
    //add items to the data object
    data[input.name] = input.value;
    //with our data and error object
    //we set the state
    this.setState({ data, errors });
    //console.log("data now", this.state.data)
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-dark">
        {label}
      </button>
    );
  };
  renderInput=(name,label,type="text")=>{
      // to able to access data and  errors objects within this fn
      // we clone them
    const { data, errors } = this.state;
      return (
        <Input
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />

      );
  };


  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  };
//   renderInput(name, label){
//       // to able to access data and  errors objects within this fn
//       // we clone them
//       const { data, errors } = this.state;
//     return (
//         <Input
//         name={name}
//         value={data[name]}
//         onChange={this.handleChange}
//         label={label}
//         error={errors[name]}
//       />

//       );

//   }

}

export default Form;
