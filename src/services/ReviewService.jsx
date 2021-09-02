import axios from "axios";

const BASE_URL="http://localhost:8081/review";

class ReviewService{
    async addReview(reviews){
        return await axios.post(BASE_URL, reviews);
    }
    async getReview(){
        return await axios.get(BASE_URL + "/all");
    }
    async getSpecificReview(reviewId){
        return await axios.get(BASE_URL + "/" + reviewId);
    }
    async updateReview(reviews) {
        return await axios.put(BASE_URL, reviews);
      }
    async deleteReview(reviewId){
        return await axios.delete(BASE_URL +"/"+reviewId);
    }
    async getReviewByBookId(bookid){
        return await axios.get(BASE_URL +"/book/"+bookid);
    }
}
export default new ReviewService();