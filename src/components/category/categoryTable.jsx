import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoryTable extends Component {
    
    render() { 
        return ( 
            <table className="table table-striped table-hover  table-light">
            <thead>
              <tr className="table-secondary">
                <th>Category Id</th>
                <th>Category Name</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {this.props.categories.map((cat) => (
                <tr>
                  <td>{cat.categoryId}</td>
                  <td>{cat.categoryName}</td>
                  <td>
                    <Link to={`/category/update/${cat.categoryId}`} p>
                      <input type="button"
                      className="btn btn-secondary mx-3"
                      value="Update"
                      />
                    </Link>
                                   
                      <input type="button"
                      className="btn btn-danger"
                      value="Delete"
                      onClick={() => this.props.handleDelete(cat.categoryId)}
                      />
                    
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
         );
    }
}
 
export default CategoryTable;