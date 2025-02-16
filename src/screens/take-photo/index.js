/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Header from "../../components/header";
// import image64 from "../../base64Image";
import { decrypt } from "../../encryption";
import "./styles.css";
import { Backend } from "../../BackendConfig";
import PopUpLoader from "../../components/popup-loader";
import { userDetails } from "../../constants";

function TakePhoto({ next, findScreen }) {
  const [image64, setImage64] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(false);
  const [option, setOption] = useState("back");
  const [preview, setPreview] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleUp = (evt) => {
    evt.preventDefault();
    const options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
      if (options[i].classList.contains("active")) {
        options[i].classList.remove("active");
        const prevIndex = i === 0 ? options.length - 1 : i - 1;
        options[prevIndex].classList.add("active");
        setHoverIndex(prevIndex);
        break;
      }
    }
  };

  const handleDown = (evt) => {
    evt.preventDefault();
    const options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
      if (options[i].classList.contains("active")) {
        options[i].classList.remove("active");
        const nextIndex = i === options.length - 1 ? 0 : i + 1;
        options[nextIndex].classList.add("active");
        setHoverIndex(nextIndex);
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleLeft = () => {
    if (preview) {
      return retakePhoto();
    }
    findScreen("verify-identity");
  };

  const handleRight = () => {
    if (preview) {
      return handleVerify();
    }
    setOptions(true);
  };

  const handleKeyDown = (evt) => {
    switch (evt.key) {
      case "ArrowUp":
        return handleUp(evt);
      case "ArrowDown":
        handleDown(evt);
        break;
      case "SoftRight":
        handleRight();
        break;
      case "SoftLeft":
        handleLeft();
        break;
      case "Enter":
        handleSelect();
      default:
        return;
    }
  };

  function handleSelect() {
    if (!options) {
      return takepicture();
    }
    if (hoverIndex === 0) setOption("back");
    else setOption("front");
    setTimeout(() => setOptions(false), 500);
  }

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
    // document.getElementById("cameraContainer").classList.add("hidden");
    setPreview(true);
    // document.getElementById("previewPhotoContainer").classList.remove("hidden");
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
    const nin = userDetails.nin;

    Backend.sachet()
      .verifyCustomer({ nin, photo: image64 })
      .then((res) => {
        if (res.status === 504) {
          return findScreen("server-error");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        const result = decrypt(JSON.stringify(data.data));
        const { kycStatus, message } = result.data;
        if (!result.status) throw new Error(data);
        else {
          localStorage.setItem("kycStatus", "pending");
          findScreen("verification-status");
        }
      })
      .catch((err) => {
        localStorage.setItem("kycStatus", "rejected");
        setLoading(false);
        console.log("err", err);
        findScreen("verification-status");
      });
  }

  useEffect(() => {
    let video = document.getElementById("video");
    let startbutton = document.getElementById("startbutton");

    let mediaStream = null;
    let videoTracks = null;

    const media = {
      front: {
        audio: false,
        video: { facingMode: "user" },
      },
      back: {
        audio: false,
        video: { facingMode: { exact: "environment" } },
      },
    };
    navigator.mediaDevices
      .getUserMedia(media[option])
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
  }, [option]);

  function handlePicture(ev) {
    ev.preventDefault();
    takepicture();
  }

  function retakePhoto() {
    setPreview(false);
    // document.getElementById("previewPhotoContainer").classList.add("hidden");
    // document.getElementById("cameraContainer").classList.remove("hidden");
  }

  return (
    <div className="takephotoContainer">
      <div
        id="cameraContainer"
        className={`cameraContainer ${preview ? "hidden" : ""}`}
      >
        <div className="camera">
          <div className="mask">
            <div className="circularPortion"></div>
          </div>
          <video id="video">Not available.</video>
          <div className="advice">
            Please position your face within the frame.
          </div>
          {options && (
            <div className="options">
              <div
                id="rear"
                className={`option ${hoverIndex === 0 ? "active" : ""}`}
              >
                <div>Back Camera</div>
                <div className={`circle ${option === "back" ? "active" : ""}`}>
                  <div className="inner_circle"></div>
                </div>
              </div>

              <div
                id="front"
                className={`option ${hoverIndex === 1 ? "active" : ""}`}
              >
                <div>Front Camera</div>
                <div className={`circle ${option === "front" ? "active" : ""}`}>
                  <div className="inner_circle"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        {!options && (
          <div className="take-photo__softkey">
            <div className="take-photo__softkey--left" onClick={handleLeft}>
              Back
            </div>
            <div
              className="take-photo__softkey--center"
              onClick={takepicture}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/shutter.svg" alt="snap" width={20} height={20} />
            </div>
            <div className="take-photo__softkey--right" onClick={handleRight}>
              Options
            </div>
          </div>
        )}
        {options && (
          <div className="take-photo__softkey">
            <div className="take-photo__softkey--center" onClick={handleSelect}>
              Select
            </div>
          </div>
        )}
      </div>
      <div
        id="previewPhotoContainer"
        className={`previewPhotoContainer ${preview ? "" : "hidden"}`}
      >
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
        {!loading && (
          <div className="take-photo__softkey">
            <div className="take-photo__softkey--left" onClick={retakePhoto}>
              Retake Photo
            </div>
            <div className="take-photo__softkey--right" onClick={handleVerify}>
              Verify
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakePhoto;
