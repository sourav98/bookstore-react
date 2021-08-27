import React, { useState } from 'react';

const Counter = () => {

    const [count,setCount] = useState(0);

    const handleIncrement = () => 
    {
        setCount(count+1)
    }

    const handleDecrement = () => 
    {
        setCount(count-1)
    }
    return ( 
       <div><button onClick={handleIncrement}>
           Increment +
           </button>
           <p>Counter : {count}</p>
           <button onClick={handleDecrement} >
           Decrement +
           </button>
           </div>

     );
}
 
export default Counter;