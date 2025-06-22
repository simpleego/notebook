import { React, useState } from "react";

// 이벤트 바인딩
// 사용자 입력과 동시에 출력이 연결되어 화면에 표시됨
const Input2 = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    tel: "",
  });

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    // inputs[id] = value //직접변경하면 React가 값 변경을 인지하지 못함
    // 따라서 React가 값 변경을 알 수 있는 방법을 사용해야 한다 !!!
    setInputs({
      ...inputs, //  name:"",  email: "", tel: "",
      [id]: value,
    });
  };

  const { name, email, tel } = inputs;

  return (
    <div>
      <label>이름</label>
      <input type="text" id="name" value={name} onChange={onChange} />
      <br />
      <label>이메일</label>
      <input type="email" id="email" value={email} onChange={onChange} />
      <br />
      <label>전화번호</label>
      <input type="tel" id="tel" value={tel} onChange={onChange} />
      <br />
      <p>이름 : {name} </p>
      <p>이베일 : {email} </p>
      <p>전화 : {tel} </p>
    </div>
  );
};

export default Input2;