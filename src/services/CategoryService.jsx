import axios from "axios";

const BASE_URL="http://localhost:8081/category";

class CategoryService {

    async viewAllCategories() {
        return await axios.get(BASE_URL+"/all")
    }

}

export default new CategoryService();