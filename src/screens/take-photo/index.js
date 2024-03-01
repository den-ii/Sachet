/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Header from "../../components/header";
import Softkey from "../../components/softkey";
import { sha256, sha224 } from "js-sha256";
import { encrypt, decrypt } from "../../encryption";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import PopUpLoader from "../../components/popup-loader";

function TakePhoto({ next, findScreen }) {
  const [image64, setImage64] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem("confirm-picture");
    if (
      confirmed === "not-logged-failed" ||
      confirmed === "not-logged-success"
    ) {
      findScreen("verification-status");
    }
    return () => {
      localStorage.setItem(
        "phoneNumber",
        encrypt(JSON.stringify({ phoneNumber: "0123456789" }))
      );
    };
  }, []);

  function clearphoto() {
    let canvas = document.getElementById("canvas");
    // let photo = document.getElementById("photo")
    let width = screen.width > 600 ? 350 : 225;
    let height = screen.width > 600 ? 350 : 225;

    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, width, height);

    const data = canvas.toDataURL("image/png");
    // photo.setAttribute("src", data)
  }

  function takepicture() {
    document.getElementById("cameraContainer").classList.add("hidden");
    document.getElementById("previewPhotoContainer").classList.remove("hidden");
    let canvas = document.getElementById("canvas");
    let photo = document.getElementById("photo");
    let video = document.getElementById("video");
    let width = screen.width > 600 ? 350 : 225;
    let height = screen.width > 600 ? 350 : 225;

    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(
        video,
        video.videoWidth / 2 -
          Math.min(video.videoWidth / 2, video.videoHeight / 2),
        0,
        Math.min(video.videoWidth, video.videoHeight),
        Math.min(video.videoWidth, video.videoHeight),
        0,
        0,
        width,
        height
      );

      const data = canvas.toDataURL("image/png");

      setImage64(data);
      // photo.setAttribute("src", data)
    } else {
      clearphoto();
    }
  }

  function handleVerify() {
    setLoading(true);
    const nin = localStorage.getItem("nin")
      ? decrypt(localStorage.getItem("nin")).nin
      : "00000000001";
    console.log(nin);
    Backend.sachet()
      .verifyCustomer({ nin, photo: image64 })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const result = decrypt(JSON.stringify(data.data));
        console.log(result);
        if (!result.status) {
          localStorage.setItem("confirm-picture", "rejected");
          next();
        } else {
          localStorage.setItem("confirm-picture", "pending");
          next();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        localStorage.setItem("confirm-picture", "rejected");
        next();
      });
  }

  useEffect(() => {
    let video = document.getElementById("video");
    let startbutton = document.getElementById("startbutton");

    let mediaStream = null;
    let videoTracks = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        mediaStream = stream;
        videoTracks = stream.getVideoTracks();

        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    clearphoto();
    return () => {
      // Stop the video tracks
      if (videoTracks) {
        videoTracks.forEach((track) => track.stop());
      }

      // Stop the media stream
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function handlePicture(ev) {
    ev.preventDefault();
    takepicture();
  }

  function retakePhoto() {
    document.getElementById("previewPhotoContainer").classList.add("hidden");
    document.getElementById("cameraContainer").classList.remove("hidden");
  }

  return (
    <div className="takephotoContainer">
      <div id="cameraContainer" className="cameraContainer">
        <div className="camera">
          <div className="mask">
            <div className="circularPortion"></div>
          </div>
          <video id="video">Not available.</video>
          <div className="advice">
            Please position your face within the frame.
          </div>
        </div>
        {/* <button id="startbutton"></button> */}
        <Softkey center="Take Photo" onKeyCenter={handlePicture} />
      </div>
      <div id="previewPhotoContainer" className="previewPhotoContainer hidden">
        {loading && (
          <div className="popUpLoading">
            <PopUpLoader text="Verification in process" />
          </div>
        )}

        <Header title="Confirm Picture" />
        <canvas id="canvas" className="photo"></canvas>
        <div className="advice">
          Make sure your face is not blur or out of frame before continuing
        </div>
        {/* <div className="output">
          <img id="photo"className="photo" alt="The screen capture will appear in this box."/>
        </div> */}
        {!loading && (
          <Softkey
            left="Retake Photo"
            onKeyLeft={retakePhoto}
            right="Verify"
            onKeyRight={handleVerify}
          />
        )}
      </div>
    </div>
  );
}

export default TakePhoto;
