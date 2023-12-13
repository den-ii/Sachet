import "./styles.css";

function Header({ title }){
  return (
    <header className="header">
      <p className="title">{title}</p>
    </header>
  );
};

export default Header;
