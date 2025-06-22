import {React, useState } from "react";


// 동적으로 변하는 값을 state로 관리한다.
// useState를 이용한다.

const Counter =()=>{
    const [num, setNum] = useState(0);

    const increase = ()=>{
     setNum(num + 1);
    }
    const decrease = ()=>{
     setNum(num - 1);
    }

    return (
        <div>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
            <p>{num}</p>
        </div>
    )
}

export default Counter;