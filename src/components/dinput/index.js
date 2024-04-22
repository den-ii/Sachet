import "./styles.css";

function Dinput({ id, type, value, iRef }) {
  return (
    <div className="Dinput">
      <input id={id} type={type} value={value} ref={iRef} />
    </div>
  );
}

export default Dinput;
