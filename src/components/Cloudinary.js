// import React, { useState, useEffect } from "react";

  const handleUpload = async (image) => {
     
    try {
      console.log("handleUpload called")
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "quinkpost")
      data.append("cloud_name", "Quink-Post")
      console.log("before cloud post")
  
      fetch("https://api.cloudinary.com/v1_1/quink-post/image/upload", {
        method: "post",
        body: data,
      }).then(res => res.json()).then(data => {
        console.log(data.secure_url, "this is data from cloudinakdfj");
      
    }).catch (e=> console.log(e, "error from the n catch"))

    } catch (e) { console.log(e, "error while sending in cloudinary"); }
  }
  