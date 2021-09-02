import { NavLink } from "react-router-dom";


const Home = () => {
   
    return (
      <div>
      <div className="book"></div>
      <div className="container random bg-dark text-white" style={{height:"400px",width:"800px"}}>
        <div className="  px-4 pt-5 my-5 text-center  ">
        <h1 className="display-5 fw-bold ">Welcome to The Book Store.</h1>
        <div className="col-lg-8 mx-auto ">
          <p className="lead mb-4">“I declare after all there is no enjoyment like reading!”-<b> Jane Austen, Pride and Prejudice.</b></p>
    <p className="lead mb-4"><b>Dear readers,</b><br/>
               We offer huge collection of books in diverse categories. </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center  ">
            <NavLink to="/books"><button type="button" className="btn btn-success btn-lg px-4me-sm-3">View Books</button>
           </NavLink>
           
          </div>
        </div>
        
      </div>  
      </div>
      </div>
     );
}
 
export default Home;