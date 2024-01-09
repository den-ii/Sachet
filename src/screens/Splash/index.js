import videoSrc from "../../assets/logo_anim.webm"
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
      <video width={240} autoPlay muted>
        <source src={videoSrc} type="video/webm" />
        Your browser does not support the video/webm codec.
      </video>        
    </div>
  )
}

export default Splash
