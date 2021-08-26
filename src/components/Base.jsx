const Base = ({
    title="My Title",
    description="My description",
    className="",
    children
}) => {
    return(
        <div className="container-fluid mt-4">
                
        <div className="jumbotron text-center">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
        </div>

         <div className={className}>{children}</div>
    
    </div>
    )
}
export default Base;