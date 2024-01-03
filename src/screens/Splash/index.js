import "./styles.css"

function Splash() {
  return (
    <div className="splash">
      <video width={240} autoPlay muted>
        <source src="/logo_anim.webm" type="video/webm" />
      </video>        
    </div>
  )
}

export default Splash
