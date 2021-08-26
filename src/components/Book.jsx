import React, { Component } from 'react';
import axios from 'axios';
import Base from './Base';
import Card from './Card';
import BookService from "../services/BookService"
class Book extends Component {
    state = { 
        books :[]
     }


     async componentDidMount()
     {
        BookService.listAllBooks().then((res) => 
        this.setState({books:res.data})
        )
     }
    render() { 
        return (
               <Base title="All Books" className="container-fluid p-5" description="Buy and start reading">
                <Card books={this.state.books}/>
        </Base>
            );
    }
}
 
export default Book;