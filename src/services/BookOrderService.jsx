import axios from "axios";

const BASE_URL="http://localhost:8081/bookorder";

class BookOrderService {

    async getAllBookOrders() {
        return await axios.get(BASE_URL+"/all")
    }

}

export default new BookOrderService();