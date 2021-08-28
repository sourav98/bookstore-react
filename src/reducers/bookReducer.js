const bookInitialState = {
    books:[],
    book:{}
}

const BookReducer = (state = bookInitialState, action) => 
{
    switch(action.type) {
        case "GET_ALL_BOOKS":
            return {...state,books:[...action.payload]}
        case "DELETE_BOOK":
            const books=state.books.filter((book) => book.id!==action.payload.id);
            return {...state,books:books}
        default:
            return state
        }
}

export default BookReducer