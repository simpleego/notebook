import { React, useState } from "react";

// 이벤트 바인딩
// 사용자 입력과 동시에 출력이 연결되어 화면에 표시됨
const Input = () => {
  const [txtValue, setTextValue] = useState("");
  const onChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={txtValue} onChange={onChange} />
      <br />
      <p>{txtValue}</p>
    </div>
  );
};

export default Input;
