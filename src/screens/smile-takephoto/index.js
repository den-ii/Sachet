import { useEffect } from "react";
import "@smile_identity/smart-camera-web";

function SmileTakePhoto({ next, findScreen }) {
  useEffect(() => {
    const app = document.querySelector("smart-camera-web");
    const postContent = async (data) => {
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(data)
      // };
      // try {
      //   const response = await fetch("/", options)
      //   const json = await response.json();
      //   return json;
      // } catch (e) {
      //   throw e;
      // }
    };

    app.addEventListener("imagesComputed", async (e) => {
      try {
        const response = await postContent(e.detail);
        findScreen("verification-status");
        // next();
      } catch (e) {
        console.error(e);
      }
    });
  }, []);
  return (
    <div>
      <smart-camera-web></smart-camera-web>
    </div>
  );
}

export default SmileTakePhoto;
