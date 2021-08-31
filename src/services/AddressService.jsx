import axios from "axios";

const BASE_URL ="http://localhost:8081/address";

class AddressService{
    async getAddresses(){
        return await axios.get(BASE_URL+"/all");
    }

    async deleteAddress(addressId){
        return await axios.delete(BASE_URL+"/delete/"+addressId);
    }

    async createAddress(address){
        return await axios.post(BASE_URL, address);
    }

    async getAddressById(addressId) {
        return await axios.get(BASE_URL + "/id/" + addressId);
      }

    async updateAddress(address) {
        return await axios.put(BASE_URL, address);
      } 
}

export default new AddressService();