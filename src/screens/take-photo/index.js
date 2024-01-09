/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import "./styles.css"
import Softkey from "../../components/softkey"

function TakePhoto({ next }) {
  const [capture, setCapture] = useState(false)


  function clearphoto() {
    if (capture){
      let canvas = document.getElementById("canvas")
      let photo = document.getElementById("photo")

      const context = canvas.getContext("2d")
      context.fillStyle = "#AAA"
      context.fillRect(0, 0, 320, 250)

      const data = canvas.toDataURL("image/png")
      photo.setAttribute("src", data)
    }
  }
  function takepicture() {
    setCapture(true)
    if (capture){
      let canvas = document.getElementById("canvas")
      let photo = document.getElementById("photo")
      let video = document.getElementById("video")
      let width = 320
      let height = 240

      const context = canvas.getContext("2d")
      if (width && height) {
        canvas.width = 320
        canvas.height = 250
        context.drawImage(video, 0, 0, 320, 250)

        const data = canvas.toDataURL("image/png")
        photo.setAttribute("src", data)
      } else {
        clearphoto()
      }
    }
  }

  useEffect(() => {   
    let video = document.getElementById("video")
    let startbutton = document.getElementById("startbutton")

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream
        video.play()
      }).catch((err) => {
        console.error(`An error occurred: ${err}`)
      })
      
    clearphoto()
  }, [])

  function handlePicture(ev){
    ev.preventDefault()
    takepicture()  
  }
    
  
  
  return (
    <div className="takephotoContainer">
      <div className="cameraContainer">
        <div className="camera">
          <video id="video">Not available.</video>
          <div className="caption"></div>
        </div>
        {/* <button id="startbutton"></button> */}
      </div>
      <canvas id="canvas"> </canvas>
      {/* <div className="output">
        <img id="photo" alt="The screen capture will appear in this box." />
      </div> */}
      <Softkey center="Take Photo" onKeyCenter={handlePicture} />
    </div>
  )
}

export default TakePhoto
