import axios from "axios";

const BASE_URL="http://localhost:8081/orderdetails";

class OrderService {

    async listAllOrders() {
        return await axios.get(BASE_URL+"/all")
    }

    async updateDeliveryStatus(orderId,deliveryStatus){
        return await axios.patch(BASE_URL+"/"+orderId,deliveryStatus)
    }

    async viewOrderById(orderId)
    {
        return await axios.get(BASE_URL+"/"+orderId)
    }

}

export default new OrderService();