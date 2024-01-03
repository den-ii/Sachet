import Softkey from "../../components/softkey"
import "./styles.css"

function VerifyIdentity({next}) {
  return (
    <div>
      <div className="verifyIdentity">
        <div className="camera_img">
          <img src="/camera.svg" alt="" />
        </div>
        <div>
          <p className='h1'>Verify identity your identity with a selfie photo</p>
          <p>Rest assured, your photo will be used solely for verification purposes</p>
        </div>
        
      </div>
      <Softkey
        center='Take A Photo'
        onKeyCenter={next}
      />
    </div>
  )
}

export default VerifyIdentity
