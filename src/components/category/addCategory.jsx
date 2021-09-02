import React, { Component } from 'react';
import CategoryService from '../../services/CategoryService';
import Joi from "joi-browser";
import Hero from '../Hero';

class AddCategory extends Component {
    state = { 
        category:{
            categoryId: 0,
            categoryName: "",
        },
        errors: {},
        errMsg: "",
     };

     // schema to validate
     schema = {
       categoryId : Joi.number().required(),
       categoryName : Joi.string().required(),
     };
     //validation method
     validate = () => {
       const errors={};
       
       //validate details with the schema
       const result = Joi.validate(this.state.category, this.schema, {
        abortEarly: false,
      });
      console.log(result);

      // Initialize error object with errors, if validate method returns errors
      if (result.error !== null) {
        for (let err of result.error.details) {
          errors[err.path[0]] = err.message;
        }
      }
       // return null if no errors otherwise return errors
       return Object.keys(errors).length === 0 ? null : errors;

     };

     handleChange = (event) => {
        const category = {...this.state.category};
        category[event.target.name] = event.target.value;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({category : category});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validate(); // null or errors
        // Set state error object with errors or empty object 
        // based on errors return by the validate() method
        this.setState({ errors: errors || {} });
        
        // if errors exists in the form , return to the login page
        console.log(errors);

        if (errors) return;
        CategoryService.addCategory(this.state.category).then(
          (res) => {
            this.props.history.push("/admin/categories");
          }).catch((error) => this.setState({ errMsg: error.response.data.message }));
        
     
        // CategoryService.addCategory(this.state.category).then((res)=>{
        //     this.props.history.push("/categories");
        // });
    };

    handleReset = (event) => {
      event.preventDefault();
      CategoryService.getCategories(this.state.category).then((res) => {
        this.props.history.push("/admin");
      })
    };

    render() { 
        return ( 
          <Hero title="Add Category">
        
         <div className="col-md-6 combox">
           <div class="h-100  p-2 bg-light shadow p-3 mb-5  rounded">
           <div className="w-50 mx-auto mt-3">
          {this.state.errMsg && (
            <div className="alert alert-danger" role="alert">
              {this.state.errMsg}
            </div>
          )}
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
              <div className="mb-3 text-start">
                <label htmlFor="empId">Category Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryId"
                  name="categoryId"
                  value={this.state.category.categoryId}
                  onChange={this.handleChange}
                />
                {this.state.errors && (
                  <p className="alert-danger text-danger font-monospace text-start">
                    {this.state.errors.categoryId}
                  </p>
                )}
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="firstName">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  name="categoryName"
                  value={this.state.category.categoryName}
                  placeholder="Enter category name"
                  onChange={this.handleChange}
                />
                {this.state.errors && (
                  <p className="alert-danger text-danger font-monospace text-start">
                    {this.state.errors.categoryName}
                  </p>
                )}
              </div>
        
              <div >
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button type="reset" className="btn  btn-secondary ms-3">
                  Cancel
                </button>
              </div>
            </form>
          </div></div>
        </div>
        </Hero>
         );
    }
}
 
export default AddCategory;