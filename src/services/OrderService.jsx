import axios from "axios";

const BASE_URL="http://localhost:8081/orderdetails";

class OrderService {

    async addOrder(order) {
        return await axios.post(BASE_URL,order)
    }

    async listAllOrders() {
        return await axios.get(BASE_URL+"/all")
    }

    async updateDeliveryStatus(orderId,deliveryStatus){
        return await axios.patch(BASE_URL+"/"+orderId,deliveryStatus)
        
    }
    async updateOrder(orderId,orderDetailsUpdateDto){
        return await axios.put(BASE_URL+"/"+orderId,orderDetailsUpdateDto)
        
    }

    async listOrderByCustomer(customerId){
        return await axios.get(BASE_URL+"/customer/"+customerId)
        
    }

    async cancelOrder(orderId){
        return await axios.delete(BASE_URL+"/"+orderId)
        
    }

    async viewOrderById(orderId)
    {
        return await axios.get(BASE_URL+"/"+orderId)
    }

}

export default new OrderService();