import React, { useEffect } from 'react';
import { listAllBooks } from '../../actions/bookAction';
import Base from '../Base';
import { useSelector, useDispatch } from "react-redux";
import Card from './Card';


const Books = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listAllBooks())
    },[])

    const books = useSelector((state) => state.store.books);
  
    return (

          <Base title="All Books" className="container-fluid p-5" description="Buy and start reading">
              
              <div className="row row-cols-1 row-cols-md-3 g-4">
              {books.map((book,index)=>{
                  return(
                      <div key={index} className="col-4 mb-4">
                        <Card book={book}/>
                      </div>
                  )
              })}
               
           </div>
              
        </Base>
      );
}
 
export default Books;
