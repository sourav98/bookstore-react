import React, { Component } from "react";
import CategoryService from "../../services/CategoryService.jsx";

import { Link } from "react-router-dom";
import BookService from "../../services/BookService";
import Joi from "joi-browser";
import Hero from "../Hero" ;

class AddBook extends Component {
  state = {
    book: {
      title: "",
      author: "",
      description: "",
      isbn: "",
      price: "",
      publishDate: "",
      lastUpdatedOn: "",
      stock:"",
      category: "",
      categories: [],
      imgUrl: "",
    },
    errors: {},
    errMsg: "",
  };

  schema = {
    title: Joi.string().required(),
    author:Joi.string().required(),
    isbn:Joi.string().required(),
    price:Joi.string().required(),
    publishDate:Joi.string().required(),
    stock:Joi.number().required(),
    category:Joi.string().required(),
    description:Joi.string(),
    lastUpdatedOn: Joi.string(),
    imgUrl: Joi.string(),
    categories:Joi.array().items(Joi.string()),

  };

  validate = () => {
    const errors = {};
    // Validate account details with schema
    const result = Joi.validate(this.state.book, this.schema, {
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

  async componentDidMount() {
    CategoryService.viewAllCategories().then((res) =>
      this.setState({ categories: res.data })
    );
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
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(errors);
    if (errors) return;
    BookService.createBook(this.state.book)
      .then((res) => {
        this.props.history.push("/books");
      })
      .catch((error) => this.setState({ errMsg: error.response.data.message }));
  };

  render() {
    return (
      <Hero
        className="container-fluid p-5"
        title="Add Book"
        description="Add your books here"
      >
         <div className="col-lg-9 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
       
          {this.state.errMsg && (
            <div className="alert alert-danger" role="alert">
              {this.state.errMsg}
            </div>
          )}
          <Link to="/admin" className="rounded btn btn-md btn-info">
            Admin Home
          </Link>

          <form className="container-fluid" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the Book Title
              </label>
              <input
                onChange={this.handleChange}
                name="title"
                className="form-control"
                placeholder="Title"
                value={this.state.book.title}
              />
              {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.title}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the Book Author
              </label>
              <input
                onChange={this.handleChange}
                name="author"
                className="form-control"
                placeholder="Author"
                value={this.state.book.author}
              />
               {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.author}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Choose the Category
              </label>
              <select
                onChange={this.handleChange}
                className="form-control"
                placeholder="Category"
                name="category"
              >
                <option>Select</option>
                {this.state.categories &&
                  this.state.categories.map((cat, index) => (
                    <option
                      key={index}
                      className="text-capitalize"
                      value={cat.categoryId}
                    >
                      {cat.categoryName}
                    </option>
                  ))}
              </select>
              {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.category}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the description
              </label>
              <textarea
                onChange={this.handleChange}
                name="description"
                className="form-control"
                placeholder="Description"
                value={this.state.book.description}
              />
            </div>

            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the Image Url
              </label>
              <input
                onChange={this.handleChange}
                name="imgUrl"
                className="form-control"
                placeholder="Image Url"
                value={this.state.book.imgUrl}
              />
            </div>

            <div className="form-group">
              <label className="col-form-label-md mt-4">Enter the ISBN</label>
              <input
                onChange={this.handleChange}
                name="isbn"
                className="form-control"
                placeholder="Isbn"
                value={this.state.book.isbn}
              />
              {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.isbn}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the Book Price
              </label>
              <input
                onChange={this.handleChange}
                name="price"
                className="form-control"
                placeholder="Price"
                value={this.state.book.price}
              />
               {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.price}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the stock available
              </label>
              <input
                onChange={this.handleChange}
                type="number"
                className="form-control"
                placeholder="Stock"
                name="stock"
                value={this.state.book.stock}
              />
               {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.stock}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter the publish Date
              </label>
              <input
                onChange={this.handleChange}
                name="publishDate"
                className="form-control"
                placeholder="yyyy-mm-dd"
                value={this.state.book.publishDate}
              />
               {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.publishDate}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label-md mt-4">
                Enter Last Updation Date
              </label>
              <input
                onChange={this.handleChange}
                name="lastUpdatedOn"
                className="form-control"
                placeholder="yyyy-mm-dd"
                value={this.state.book.lastUpdatedOn}
              />
               
            </div>
            
            <button
              type="submit"
              className="rounded mt-2 btn btn-success form-control"
            >
              Add Book
            </button>
            
          </form>
        </div>
        </div>
      </Hero>
    );
  }
}


export default AddBook;

