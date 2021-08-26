import React, { Component } from 'react';
import CategoryService from '../services/CategoryService';
import Base from './Base';
import axios from 'axios';
import BookService from '../services/BookService';
import { Link } from 'react-router-dom';

class AddBook extends Component {
    state = {
       book:{
        title:"",
        author:"",
        description:"",
        isbn:"",
        price:"",
        stock:"",
        category:"",
        categories:[]
       } 
      }
    
    async componentDidMount()
    {
      CategoryService.viewAllCategories().then((res) => 
      this.setState({categories:res.data}),
       )
    }

    handleChange = (event) => {
      const book = { ...this.state.book };
      book[event.target.name] = event.target.value;
      console.log(event.target.name);
      console.log(event.target.value);
      this.setState({ book: book });
    };

    handleSubmit = (event) => {
      // Prevents default behaviour of submit button
      event.preventDefault();
      BookService.createBook(this.state.book)
        .then((res) => {
          this.props.history.push("/books");
        })
    };
     


    render() { 
        return (<Base className="container-fluid p-5" title="Add Book" description="Add your books here">
      <Link to="/admin" className="rounded btn btn-md btn-info">Admin Home</Link>
     
      <form className="container-fluid" onSubmit={this.handleSubmit} >
      <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Book Title</label>
      <input
            onChange={this.handleChange}
            name="title"
            className="form-control"
            placeholder="Title"
            value={this.state.book.title}
          />
      </div>
      <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Book Author</label>
      <input
            onChange={this.handleChange}
            name="author"
            className="form-control"
            placeholder="Author"
            value={this.state.book.author}
          />
      </div>
      <div className="form-group">
        <label className="col-form-label-md mt-4" >Choose the Category</label>
          <select
            onChange={this.handleChange}
            className="form-control"
            placeholder="Category"
            name="category"
          >
            <option>Select</option>
            {this.state.categories && 
            this.state.categories.map((cat,index)=> (
             
                  <option key={index} className="text-capitalize" value={cat.categoryId}>{cat.categoryName}</option>
                 
            ))}
          </select>
        
        </div>
      <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the description</label>
          <textarea
            onChange={this.handleChange}
            name="description"
            className="form-control"
            placeholder="Description"
            value={this.state.book.description}
          />
        </div>
     

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the ISBN</label>
      <input
            onChange={this.handleChange}
            name="isbn"
            className="form-control"
            placeholder="Isbn"
            value={this.state.book.isbn}
          />
      </div>

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Book Price</label>
      <input
            onChange={this.handleChange}
            name="price"
            className="form-control"
            placeholder="Price"
            value={this.state.book.price}
          />
      </div>
        <div className="form-group">
        <label className="col-form-label-md mt-4" >Enter the stock available</label>
          <input
            onChange={this.handleChange}
            type="number"
            className="form-control"
            placeholder="Stock"
            name="stock"
            value={this.state.book.stock}
          />
        </div>
        <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Add Book
        </button>
      </form>
     
        </Base>  );
    }
}
 
export default AddBook;
