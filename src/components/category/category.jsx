import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from "../../services/CategoryService";
import CategoryTable from './categoryTable';


class Category extends Component {
    state = { 
        categories: [],
        filtCategories:[],
        search: "",
     };
     componentDidMount(){
        CategoryService.getCategories().then(
            (res) => this.setState({ categories: res.data}));

            CategoryService.getCategories().then(
              (res) => this.setState({ filtCategories: res.data}));   
     }

     handleDelete = (id) => {
       //axios.delete("http://localhost:8082/category/delete/id").then();
         CategoryService.removeCategory(id).then(
             (res) => {
                 const categories = this.state.categories.filter((cat) => cat.categoryId !== id);
                this.setState({categories});
             });
     };

     handleSearch = (event) => {

         console.log("handleSearch");
         this.setState({search: event.target.value});

         if(event.target.value === ""){
           const filtCategories = this.state.filtCategories;
           this.setState({categories : filtCategories});
         }

         else{
           const filtCategories = this.state.categories.filter((cat) => 
            cat.categoryName.toLowerCase().includes(event.target.value.toLowerCase())
         );
         this.setState( {categories : filtCategories });
        }
     };

    //  handleSearch = (event) => {
    //   console.log("handleSearch");
    //   //this.setState({search: event.target.value});

    //   const filteredCat = this.state.categories.filter((cat) => 
    //      cat.categoryId , (event.target.value)
    //   );
    //   this.setState( {categories : filteredCat });
     // };


    render() { 
        return ( 
            <div className="mt-3 w-75 mx-auto">
        <div className="d-flex justify-content-end">
          <div>
            <form>
              <input
                type="search"
                className="form-control"
                placeholder="Search by name"
                value={this.state.search}
                onChange={this.handleSearch}
              />
            </form>
          </div>
          <div>
            <Link to="/category/add">
              <input
                type="button"
                className="btn btn-success mb-3 ms-3"
                value="Add"
              />
            </Link>
          </div>
        </div>
        <CategoryTable categories={this.state.categories}
                handleDelete={this.handleDelete}
                />
      </div>
         );
    }
}
 
export default Category;