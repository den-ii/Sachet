/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import camera from "camera"
import "./styles.css"

function TakePhoto({ next }) {
  useEffect(() => {
    camera("video")
  })
  // useEffect(()=> {
  //   let pick = new MozActivity({
  //     name: "record",
  //     data: {
  //       type: ["image/png", "image/jpg", "image/jpeg"]
  //     }
  //   })
  //   pick.onsuccess = function () {
  //     let img = document.getElementById("img")
  //     img.src = window.URL.createObjectURL(this.result.blob)
  //   }
  
  //   pick.onerror = function () {
  //     // If an error occurred or the user canceled the activity
  //     alert("Can't view the image!")
  //   }
  // }, [])
  
  return (
    <div>
      TakePhoto
      <div>
        <video id="video" width={240} height={320} autoPlay muted></video>
      </div>
    </div>
  )
}

export default TakePhoto