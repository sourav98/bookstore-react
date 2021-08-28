import axios from "axios";

const BASE_URL="http://localhost:8081/books";

export const listAllBooks = () => async(dispatch) => 
{
    const result = await axios.get(BASE_URL+"/all")
    dispatch({
        type:"GET_ALL_BOOKS",
        payload:result.data
    })
}

export const deleteBook = (bookId) => async(dispatch) => 
{
    const result = await axios.delete(BASE_URL+"/"+bookId)
    dispatch({
        type:"DELETE_BOOK",
        payload:result.data
    })
}
