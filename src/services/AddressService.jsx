import axios from "axios";

const BASE_URL="http://localhost:8081/address";

class AddressService {

    async getAllAddress() {
        return await axios.get(BASE_URL+"/all")
    }

}

export default new AddressService();