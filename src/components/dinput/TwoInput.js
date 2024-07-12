import { useEffect } from "react";
import Dinput from ".";
import "./styles.css";

function TwoInput({
  input1Ref,
  input2Ref,
  label1,
  label2,
  error,
  id,
  length,
  classId,
}) {
  const handleUp = (evt) => {
    evt.preventDefault();
    const inputs = document.querySelectorAll(`.${classId}`);
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("item_active")) {
        inputs[i].blur();
        inputs[i].classList.remove("item_active");
        const prevIndex = i === 0 ? inputs.length - 1 : i - 1;
        inputs[prevIndex].classList.add("item_active");
        inputs[prevIndex].focus();
        break;
      }
    }
  };

  const handleDown = (evt) => {
    evt.preventDefault();
    const inputs = document.querySelectorAll(`.${classId}`);
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("item_active")) {
        inputs[i].blur();
        inputs[i].classList.remove("item_active");
        const nextIndex = i === inputs.length - 1 ? 0 : i + 1;
        inputs[nextIndex].classList.add("item_active");
        inputs[nextIndex].focus();
        break;
      }
    }
  };

  const handleKeyDown = (evt) => {
    switch (evt.key) {
      case "ArrowUp":
        return handleUp(evt);
      case "ArrowDown":
        handleDown(evt);
        break;
      default:
        return;
    }
  };

  const handleFunc = (e) => {
    console.log("rrr", e.target.value.length);
    if (e.target.value.length >= length) {
      if (e.target.id === "1") {
        input2Ref.current.focus();
        return;
      }
      if (e.target.id === "2" && input1Ref.current.value.length >= length) {
        input2Ref.current.blur();
      } else {
        input1Ref.current.focus();
      }
    }
  };

  useEffect(() => {
    if (input1Ref.current) input1Ref.current.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="twoInput">
      <label htmlFor="1" className="twoInput__label">
        {label1}
      </label>
      <Dinput
        id="1"
        iRef={input1Ref}
        error={error}
        className={`${classId} item_active`}
        onChange={handleFunc}
      />
      <label htmlFor="2" className="twoInput__label second-label">
        {label2}
      </label>
      <Dinput
        id="2"
        iRef={input2Ref}
        error={error}
        className={`${classId} `}
        onChange={handleFunc}
      />
    </div>
  );
}

export default TwoInput;
