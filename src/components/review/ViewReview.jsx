import React, { Component } from 'react';
import ReviewService from '../../services/ReviewService';
import Hero from '../Hero';
import Joi from "joi-browser";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';

const BASE_URL="http://localhost:8081/review";

const mapStateToProps = state => ({
    customer: state.customer
});

class ViewReview extends Component {
    
    state = { 
        reviews:[],
        reviewInput : {
            customerId:this.props.customer.customerId,
            bookId:this.props.match.params.bookId,
            reviewId: "",
            headLine: "",
            comment: "",
            rating: "",
       
        },
        errors: {},
        errMsg: "",
     }

     schema = {
        customerId:Joi.required(),
        bookId:Joi.required(),

        headLine:Joi.required(),
        reviewId: Joi.number().min(1).required(),
        comment: Joi.string().min(3).max(150).required(),
        rating: Joi.number().min(1).max(5).required(),
      };
      validate = () => {
        const errors = {};
        // Validate account details with schema
        const result = Joi.validate(this.state.reviewInput, this.schema, {
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

    
      deleteReview = (reviewId) => {
        return axios.delete(BASE_URL +"/"+reviewId);
    }
    
      handleDelete = (reviewId) => {
        console.log(this.state.reviews)
           this.deleteReview(reviewId).then((res) => {
              console.log(res, "RES")
            });
              const reviews = this.state.reviews && this.state.reviews.filter(
            (add) => add.reviewId !== reviewId
          );
          this.setState({ reviews });
      };

      handleChange = (event) => {
        const review = {...this.state.reviewInput};
        review[event.target.name] = event.target.value;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({reviewInput: review});        
    };

    handleSubmit = (event) => {
       event.preventDefault();
       const errors = this.validate();
       this.setState({ errors: errors || {} });
       console.log(errors);
       if (errors) return;
       ReviewService.addReview(this.state.reviewInput).then((res) =>{
        ReviewService.getReviewByBookId(this.props.match.params.bookId).then((res) => {
            this.setState({ reviews: res.data })
        })
      console.log(res)
       }).catch((error) => this.setState({ errMsg: error.response.data.message }));
    };

    componentDidMount() {

        ReviewService.getReviewByBookId(this.props.match.params.bookId).then((res) => {
            this.setState({ reviews: res.data })
        })
       
      }
    render() { 
        return (
            <Hero title="Review" description="">
           <div className="col-lg-9 combox">
         <div class="h-100  p-5 bg-light shadow p-3 mb-5 rounded">

                   <div className="row">
                   <div className="col-5">

<div className="mx-auto border p-3"> 
           {this.props.customer.loggedIn ? (<div>


            <p class="fw-lighter">Add Review</p>      
            <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 mt-2 text-start">
                        <label for="reviewId">Review ID</label>
                        <input type="text" 
                        className="form-control" 
                        id="reviewId" 
                        name="reviewId"
                        value={this.state.reviewInput.reviewId} 
                        onChange={this.handleChange}/>
                          {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.reviewId}
                        </p>
                        )}
                     </div>
                    <div className="mb-3 mt-2 text-start">
                        <label for="headLine">Headline</label>
                        <input type="text"
                         className="form-control" 
                         id="headLine" 
                         name="headLine"
                         value={this.state.reviewInput.headLine} 
                          
                         placeholder="Enter Headline"
                         onChange={this.handleChange}/>
                         {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.headline}
                        </p>)}
                    </div>
                    <div className="mb-3 mt-2 text-start">
                        <label for="comment">comment</label>
                        <input type="text" 
                        className="form-control" 
                        id="comment" 
                        name="comment"
                        value={this.state.reviewInput.comment} 
                        placeholder="Enter comment"
                        onChange={this.handleChange}/>
                        {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.comment}
                        </p>)}
                    </div>
                    <div className="mb-3 mt-2 text-start">
                        <label for="country">Rating</label>
                        <input type="text" 
                        className="form-control" 
                        id="rating" 
                        name="rating" 
                        value={this.state.reviewInput.rating} 
                        placeholder="Enter Rating"
                        onChange={this.handleChange}/>
                        {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.rating}
                        </p>)}
                    </div>
              
                    
                   
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
           </div>)
           
           :(<div><h5 className="text-danger muted">Login to Add Review</h5></div>)}
            {this.state.errMsg && (
            <div className="alert alert-danger" role="alert">
            {this.state.errMsg}
            </div>
            )}  
           
                </div></div>
                <div className="col-7">
                <div className="row">
                  <h4>All Reviews </h4>
                {this.state.reviews && this.state.reviews.map((review) => (
                <div className="col-6">
                     
                     <div className="card text-dark bg-light rounded  mt-5 mb-3">
                         <div className="card-header">{review.headLine}</div>
                         <div className="card-header">Rating: {review.rating}/5</div>
                         {/* <div className="card-header">By :{review.customer.fullName}</div> */}
                        <div className="card-body">Comment: {review.comment}</div>
                        <div className="card-header">Posted On :{review.reviewOn}</div>

                        {this.props.customer.loggedIn ? (<div>
                          <Link to={`/review/update/${review.reviewId}`} style={{textDecoration:"none"}}>  <input type="button"
                        className="btn btn-secondary mt-2 mb-2 ms-1"
                        value="Update"
                        />    </Link>
                          <input type="button"
                        className="btn btn-secondary mt-2 mb-2 ms-1"
                        value="Delete"
                        onClick={() => this.handleDelete(review.reviewId)}
                        />
                            </div>) : (<div></div>)
                        }
                         </div></div>
                       ))}
   </div>
   </div></div>

             

            </div>
            </div>
            </Hero>
          );
    }
}
 
export default connect(mapStateToProps) (ViewReview);