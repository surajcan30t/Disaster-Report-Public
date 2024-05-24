'use client'
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [imgUri, setImgUri] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState("user"); // 'user' for front camera, 'environment' for back camera
  const camRef = useRef(null);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  const switchCamera = () => {
    const newFacingMode = cameraFacingMode === "user" ? "environment" : "user";
    setCameraFacingMode(newFacingMode);
  };

  const captureImage = async () => {
    try {
      const imageUrl = camRef.current.getScreenshot();
      setImgUri(imageUrl);
      setLoading(true);

      const res = await fetch("https://unix-fought-donor-clear.trycloudflare.com/api/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: imageUrl,
          lat: userLocation.lat,
          lng: userLocation.lng,
        }),
      });

      if (res.status === 200) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div style={{ backgroundColor: "#0096FF", marginBottom: "10px" }}>
        <div style={{ color: "white", fontSize: "42px" }}>
          <span style={{ color: "black" }}>Image Rescue</span>Request
        </div>
      </div>
      <div className="">
        <h3>
          Please upload a photo(
          <span style={{ color: "red" }}>supports .jpg, .png, .jpeg</span>)
        </h3>
        <div style={{ marginBottom: "10px" }}>
          <Webcam
            ref={camRef}
            videoConstraints={{
              facingMode: cameraFacingMode,
            }}
          />
        </div>
        <button
          disabled={loading}
          style={{
            padding: "5px",
            backgroundColor: "#0096FF",
            color: "white",
            borderRadius: "10%",
          }}
          onClick={captureImage}
        >
          {loading ? "Uploading Image..." : "Click and Upload Image"}
        </button>
        <button className="p-2 bg-blue-700 ml-3 text-white rounded-md" onClick={switchCamera}>
          Switch Camera ({cameraFacingMode === "user" ? "Back" : "Front"})
        </button>
        <h2>List of Images</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {imgUri && <Image src={imgUri} width={300} height={300} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
