import React, { Component } from 'react';
import BookService from '../services/BookService';

import Base from './Base';
import { Link } from 'react-router-dom';
import Hero from './Hero';
class ManageBooks extends Component {
    state = { 
        books:[]
     }
    async componentDidMount()
    {
       BookService.listAllBooks().then((res) => 
       this.setState({books:res.data})
       )
    }

    handleDelete = (id) => {
        BookService.deleteBook(id).then((res) => {
          const books = this.state.books.filter((book) => book.bookId != id);
          this.setState({ books });
        });
      };
    
    render() { 
        return ( 
        
            <Hero title="Manage Books"  className="container p-4"  description="Update and delete your books here">
            <div className="col-lg-10 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
           <Link to="/admin" className="rounded btn btn-md btn-info">Admin Home</Link>
      
<table className="table table-bordered table-secondary mt-4">
  <thead>
    <tr>
    <th scope="col">Book Id</th>
      <th scope="col">Book Name</th>
      <th scope="col">Update Book</th>
      <th scope="col">Delete Book</th>
    </tr>
    </thead>
    <tbody>
{this.state.books.map((book) => (

        <tr>
           <td>{book.bookId}</td>
           <td>{book.title}</td>
           <td> <Link
              className="rounded btn btn-success">
              <span className="">Update</span>
            </Link></td>
    <td> <button  onClick ={() => this.handleDelete(book.bookId)}className=" rounded btn btn-danger">
              Delete
            </button></td>
        </tr>

))}
   </tbody>
</table>

</div></div>
       </Hero>
         );
    }
}
 
export default ManageBooks;