import { useEffect } from "react"
import "@smile_identity/smart-camera-web"

function SmileTakePhoto({next}) {
  useEffect(() => {
    const app = document.querySelector("smart-camera-web");
    const postContent = async (data) => {
      console.log(data);
      next()

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
  
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    });
  }, [])
  return (
    <div>
      <smart-camera-web></smart-camera-web>
    </div>
  )

}


export default SmileTakePhoto