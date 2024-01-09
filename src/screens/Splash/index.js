import "./styles.css"

function Splash({next}) {
  function handleOnLoad() {
    console.log("video loaded")
    // e.preventDefault()
    setTimeout(() => {
      next()
    }, 3000)
  }

  return (
    <div className="splash">
      <video width={240} autoPlay muted onCanPlayThrough={handleOnLoad}>
        <source src="/logo_anim.webm" type="video/webm" />
      </video>        
    </div>
  )
}

export default Splash
