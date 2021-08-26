// Functional Component 
import { NavLink } from "react-router-dom";

const Home = () => {
    let imgs =[
        'https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg'
    ]
    return (
        <div className="px-4 pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold">Welcome to The Book Store.</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <NavLink to="/books"><button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">View Books</button> </NavLink>
            <NavLink to="/categories"><button type="button" className="btn btn-outline-secondary btn-lg px-4">View Cateogies</button></NavLink>
          </div>
        </div>
        <div >
            <img src={imgs[0]} className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy"/>

        </div>
      </div>  
     );
}
 
export default Home;