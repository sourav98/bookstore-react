import axios from "axios";


export const registerCustomer = (customer) => async(dispatch) => 
{
    const result = await axios.post("http://localhost:8081/customer",customer)
    dispatch({
        type:"REGISTER_CUSTOMER",
        payload:result.data
    })
}


export const signIn = (customer) =>  (dispatch) => 
{
   axios.post("http://localhost:8081/signin",customer)
    .then((result) => 
    dispatch({
        type:"SIGN_IN",
        payload:result.data
    }) 
    )
    .catch((error) => {
        dispatch({
            type: "ERR_RES",
            payload: error.response.data.message,
          });
    })
   
}

export const signOut = (email) => async  (dispatch) => 
{
    const result = await  axios.put(`http://localhost:8081/signout/${email}`)
 dispatch({
        type:"SIGN_OUT",
        payload:result.data
    })
  
}

export const listAllCustomers = () => async  (dispatch) => 
{
    const result = await  axios.get("http://localhost:8081/customer/all")
 
 dispatch({
        type:"GET_ALL_CUSTOMERS",
        payload:result.data
    })
  
}


