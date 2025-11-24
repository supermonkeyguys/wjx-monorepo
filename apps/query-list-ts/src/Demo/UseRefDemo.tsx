import { useRef, type FC } from "react";

const Demo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef("Cookie");
  function selectInput() {
    const inputElem = inputRef.current;
    if (inputElem) inputElem.select();
  }
  function changeName() {
    console.log("1");
    nameRef.current = "popguys";
  }

  return (
    <div>
      <input ref={inputRef} defaultValue="Hello World" />
      <button onClick={selectInput}>选中 input</button>
      <br />
      <p>name {nameRef.current}</p>
      <div>
        <button onClick={() => changeName()}>change Name</button>
      </div>
    </div>
  );
};

export default Demo;
