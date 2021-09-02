import React, { useEffect } from 'react';
import { listAllBooks } from '../../actions/bookAction';
import Base from '../Base';
import { useSelector, useDispatch } from "react-redux";
import Card from './Card';
import Hero from '../Hero';


const Books = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listAllBooks())
    },[])

    const books = useSelector((state) => state.store.books);
  
    return (

          <Hero title="All Books"  description="Buy and start reading">
              
              <div className="row mt-3 p-4">
              {books.map((book,index)=>{
                  return(
                      <div key={index} className="col-md-4">
                          
                        <Card book={book}/>
                      </div>
                  )
              })}
               
           </div>
              
        </Hero>
      );
}
 
export default Books;

