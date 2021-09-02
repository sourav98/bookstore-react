import React, { Component } from "react";

import { connect } from "react-redux";
import ReviewService from "../../services/ReviewService";

import Hero from '../Hero';

const mapStateToProps = state => ({
    customer: state.customer
});

class UpdateReview extends Component {
  state = {
    reviews: {
        customerId:this.props.customer.customerId,
        bookId:this.props.match.params.bookId,
        reviewId: "",
        headLine: "",
        comment: "",
        rating: "",
    },
  };

  componentDidMount() {
    ReviewService.getSpecificReview(this.props.match.params.reviewId).then((res) =>
      this.setState({ reviews: res.data })
    );
  }
  handleChange = (event) => {
    const reviews = { ...this.state.reviews };
    reviews[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ reviews: reviews });
  };

  handleSubmit = (event) => {
    // Prevents default behaviour of submit button
    event.preventDefault();
    ReviewService.updateReview(this.state.reviews).then((res) => {
        this.props.history.goBack();
    });
  };
  render() {
    return (
                <Hero title="Review" description="">
               <div className="col-lg-5 combox">
             <div class="h-100  p-5 bg-light shadow p-3 mb-5 rounded">
    
                   
    
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
                            value={this.state.reviews.reviewId} 
                            onChange={this.handleChange}/>
                        
                         </div>
                        <div className="mb-3 mt-2 text-start">
                            <label for="headLine">Headline</label>
                            <input type="text"
                             className="form-control" 
                             id="headLine" 
                              name="headLine"
                             value={this.state.reviews.headLine}  
                              
                             placeholder="Enter Headline"
                             onChange={this.handleChange}/>
                          
                        </div>
                        <div className="mb-3 mt-2 text-start">
                            <label for="comment">comment</label>
                            <input type="text" 
                            className="form-control" 
                            id="comment" 
                            name="comment"
                            value={this.state.reviews.comment} 
                            placeholder="Enter comment"
                            onChange={this.handleChange}/>
                           
                        </div>
                        <div className="mb-3 mt-2 text-start">
                            <label for="country">Rating</label>
                            <input type="text" 
                            className="form-control" 
                            id="rating" 
                            name="rating"
                            value={this.state.reviews.rating} 
                            placeholder="Enter Rating"
                            onChange={this.handleChange}/>
                        
                        </div>
                  
                        
                       
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
               </div>)
               
               :(<div><h5 className="text-danger muted">Login to Add Review</h5></div>)}
                {this.state.errMsg && (
                <div className="alert alert-danger" role="alert">
                {this.state.errMsg}
                </div>
                )}  
               
                    </div>
    
                 
    
                </div>
                </div>
                </Hero>
              );
        }
    }
     
    export default connect(mapStateToProps) (UpdateReview);