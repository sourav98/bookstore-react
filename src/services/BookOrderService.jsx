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

}

export default new BookOrderService();