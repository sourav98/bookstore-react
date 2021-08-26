import axios from "axios";

const BASE_URL="http://localhost:8081/books";

class BookService {

    async listAllBooks() {
        return await axios.get(BASE_URL+"/all")
    }

    async createBook(book) {
        return await axios.post(BASE_URL,book)
    }

    async deleteBook(bookId)
    {
        return await axios.delete(BASE_URL+"/"+bookId);
    }
}

export default new BookService();