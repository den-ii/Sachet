import "./styles.css";

function Dinput({ id, type, value, iRef, onChange, error }) {
  let className = "";
  if (error) className = "error";
  return (
    <div className="Dinput">
      <input
        id={id}
        type={type}
        value={value}
        ref={iRef}
        onChange={onChange}
        className={className}
      />
    </div>
  );
}

export default Dinput;
