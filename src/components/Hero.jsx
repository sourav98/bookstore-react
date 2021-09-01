const Hero = ({
    title="Hi Sourav",
    description="Access all your details here",
    className="",
    children
}) => {
    return ( 
        <div className="container-fluid ">
                <div className="row">
        <div className="py-4 bg-dark text-secondary  text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">{title}</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">{description}</p>
      

          </div>
        </div>
      </div>
      </div>

      <div className="row  d-flex justify-content-center" >
   
     
 {children}
   
   

   

      </div>
      </div>
     );
}
 
export default Hero;