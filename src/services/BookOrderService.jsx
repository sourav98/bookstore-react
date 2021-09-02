import axios from "axios";

const BASE_URL="http://localhost:8081/BookOrder";

class BookOrderService {

    async getAllBookOrders() {
        return await axios.get(BASE_URL+"/all")
    }
    async getBookOrderByCustomer(id) {
        return await axios.get(BASE_URL+"/getBookOrderByCustomerId/"+id)
    }
    async addBookOrder(bookOrder) {
        return await axios.post(BASE_URL+"/",bookOrder)
    }

    
  async getBookOrderById(bookOrderId) {
      console.log(bookOrderId)
    return await axios.get(BASE_URL + "/" + bookOrderId);
  }

  async updateBookOrder(bookOrderId,bookOrder) {
    return await axios.put(BASE_URL + "/" +bookOrderId, bookOrder);
  }

  async deleteBookOrder(bookOrderId) {
    return await axios.delete(BASE_URL + "/" + bookOrderId);
    
  }

  async getBookOrderByCustomer(id) {
    return await axios.get(BASE_URL+"/getBookOrderByCustomerId/"+id)
}
}

export default new BookOrderService();