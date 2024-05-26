import "./styles.css";

function Dinput({ id, type, value, iRef, ...props }) {
  return (
    <div className="Dinput">
      <input id={id} type={type} value={value} ref={iRef} {...props} />
    </div>
  );
}

export default Dinput;
