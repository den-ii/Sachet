import "./styles.css"

function Header({ title }){
  return (
    <header className="headerContainer">
      <p className="title">{title}</p>
    </header>
  )
};

export default Header
