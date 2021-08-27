import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Card extends Component {
    state = {  }
    render() { 
        return ( 
            <div> 
            <div className="row row-cols-1 row-cols-md-3 g-4">
           
          
             
        {this.props.books.map((book) => (
      <div className="col">
      <div className="card text-dark bg-light">
      <div className="card-header"><b>{book.title}</b></div>
     <div className="card-body">
     <h5 className="card-title"></h5>
  <p className="card-text">{book.description}</p>
 
  <h5 class="mb-3"><span className="text-danger mr-1">₹ {book.price}</span></h5>
  <Link  to={`/book/${book.bookId}/order`} className="btn btn-warning form-control">
     Buy Now
    </Link>  
  </div>
  <div className="card-footer">
 <p className="small text-muted text-uppercase mb-2">Category : {book.category.categoryName}</p> 
    </div>
     </div> </div>
                    ))}
                    
                </div>
         
        </div>
         );
    }
}
 
export default Card ;