import Base from "./Base";
import { Link } from 'react-router-dom'

const adminLeftSide = () => {
    return(
        <div className="card">
            <h4 className="card-header bg-dark text-white">
                Admin Navigation
            </h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/create/category">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/categories">Manage Categories</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/create/book">Add Book</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/books">Manage Books</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/orders">Manage Orders</Link>
                </li>
            </ul>
        </div>
    )
}


const adminRightSide = () => {
    return(
        
        <div className="card">
            <h4 className="card-header">Admin Information</h4>
            <ul className="list-group ">
                <li className="list-group-item ">
                    <h5><span className="badge  text-dark badge-primary mr-2">Name:</span></h5>
                </li>
                <li className="list-group-item">
                    <h5><span className="badge text-dark badge-primary mr-2">Email:</span></h5>
                </li>
                <li className="list-group-item">
                    <h5><span className="badge text-dark badge-primary mr-2">Admin </span></h5>
                </li>
            </ul>
        </div>
    )
}
const AdminDashboard = () => {
    return ( 
        <Base title="Admin Dashboard" className="container" description="Manage all your products from here">
      <div className="container">
        <div className="row row-cols-md-2 row-cols-md-8">
            <div className="col">
            {adminLeftSide()}
            </div>
            <div className="col">
            {adminRightSide()}
            </div>
        </div>
          </div>
        
        </Base>
     );
}
 
export default AdminDashboard;