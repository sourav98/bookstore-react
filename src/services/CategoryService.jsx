import axios from "axios";

const BASE_URL="http://localhost:8081/category";

class CategoryService {

    async viewAllCategories() {
        return await axios.get(BASE_URL+"/all")
    }
    async getCategories(){
        return await axios.get(BASE_URL + "/all");
    }
    async addCategory(category){
        return await axios.post(BASE_URL, category);
    }

    async getById(categoryId){
        return await axios.get(BASE_URL + "/id/" + categoryId);
    }

    async getCategoryByName(categoryName){
        return await axios.get(BASE_URL +"/"+ categoryName);
    }

    async removeCategory(categoryId){
        return await axios.delete(BASE_URL +"/delete/"+ categoryId);
    }

    async editCategory(category){
        return await axios.put(BASE_URL , category);
    }

}

export default new CategoryService();