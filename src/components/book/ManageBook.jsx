import React, { useEffect } from 'react';
import Base from '../Base';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { listAllBooks,deleteBook } from '../../actions/bookAction';
import Hero from '../Hero';
const ManageBook = () => {

   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listAllBooks())
    },[])


    const books = useSelector((state) => state.store.books);

   const handleDelete = (id) => {
       
        dispatch( deleteBook(id)).then((res) => {
            dispatch(listAllBooks())
        })
      };
 
    return (  
     
        <Hero title="Manage Books"  className="container p-4"  description="Update and delete your books here">
         <div className="col-lg-10 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
        <Link to="/admin" className="rounded btn btn-md btn-primary">Admin Home</Link>
        <div className=" mt-4 card text-dark bg-light">
           
            <div className="card-header">
              Book List
              </div>
            <div className="card-body">
        
            <table className="table  table-hover table-bordered table-striped  mt-4">
<thead>
 <tr>
 <th scope="col">Book Id</th>
   <th scope="col">Book Name</th>
   <th scope="col">Stock</th>
   <th scope="col">Update Book</th>
   <th scope="col">Delete Book</th>
 </tr>
 </thead>
 <tbody>
{books.map((book) => (

     <tr>
        <td>{book.bookId}</td>
        <td>{book.title}</td>
        <td>{book.stock}</td>
        <td> <Link
           className="rounded btn btn-success">
           <span className="">Update</span>
         </Link></td>
 <td> <button  onClick ={() => handleDelete(book.bookId)}  className=" rounded btn btn-danger">
           Delete
         </button></td>
     </tr>

))}
</tbody>
</table>


        
            </div>
        
            </div>

            </div></div>
    </Hero>
    );
}
 
export default ManageBook;