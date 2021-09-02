import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from "../../services/CategoryService";
import Hero from '../Hero';
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
          <Hero title="Categories">
            <div className="col-md-6 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
          <div className="row">
           
          <div className="col-9">
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
          <div className="col-3">
            <Link to="/category/add">
              <input
                type="button"
                className="btn btn-success mb-3 ms-3 form-control"
                value="Add"
              />
            </Link></div>
       
        <CategoryTable categories={this.state.categories}
                handleDelete={this.handleDelete}
                /></div></div>
      </div></Hero>
         );
    }
}
 
export default Category;