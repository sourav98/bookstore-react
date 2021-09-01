import React from 'react';
import { Link } from 'react-router-dom';
const Card = (props) => {
      console.log(props);
    return ( 
   
            <div className="card mb-4 box-shadow text-dark bg-light">
            <img className="card-img-top" style={{width:"417px",height:"270px"}} src={props.book.imgUrl} alt="Card image cap"/>
            <div className="card-header"><b>{props.book.title}</b></div>
            <div className="card-body ">
            <h5 className="card-title"></h5>
            <p className="card-text">{props.book.description}</p>

            <h5 className="mb-3"><span className="text-danger mr-1">₹ {props.book.price}</span></h5>
            <Link  to={`/book/${props.book.bookId}/order`} className="btn btn-warning form-control">
            Buy Now
            </Link>  
            </div>
            <div className="card-footer">
         <p className="small text-muted text-uppercase mb-2">Category : {props.book.category.categoryName}</p>  
            </div>
            </div> 
        
     

     );
}
 
export default Card;