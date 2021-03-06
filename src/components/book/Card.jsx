import React from 'react';

import { Link } from 'react-router-dom';
const Card = (props) => {
      console.log(props);
    return ( 
   
            <div className="col mb-3">
            <div className="card text-dark bg-light text-center rounded">
            <img className="card-img-top" style={{width:"438px",height:"270px"}} src={props.book.imgUrl} alt="Card image cap"/>
            <div className="card-header"><h4><b>{props.book.title}</b></h4></div>
            <div className="card-header"><h6><em>By : </em>{props.book.author}</h6></div>
            <div className="card-body">
            <h5 className="card-title"></h5>
            <p className="card-text">{props.book.description}</p>

            <h5 className="mb-3"><span className="text-danger mr-1">₹ {props.book.price}</span></h5>
            <div className="row">
            
            <div className="col-8">
            <Link  to={`/book/${props.book.bookId}/order`} className="btn btn-warning form-control">
            Buy Now
            </Link>
            </div>

            <div className="col-4">
            <Link  to={`/review/book/${props.book.bookId}`} className="btn btn-outline-dark form-control">
            View More
            </Link></div>
             </div>
            </div>
            <div className="card-footer">
      <div className="row">
      <div className="col">
      <p className="small text-muted text-uppercase mb-2">Category : {props.book.category.categoryName}</p>  

      </div>
      <div className="col">
      <p className="small text-muted text-uppercase mb-2">{(props.book.stock > 0) ? "In Stock" : "Sold Out"}</p> 


      </div>
      </div>
            </div>
            </div> </div>
        
     

     );
}
 
export default Card;

