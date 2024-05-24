"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [imgUri, setImgUri] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState("user");

  const camRef = useRef(null);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    getUserLocation();
  }, []);

  const getWindowsSize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = height / width;
    console.log("Width: ", width, "Height: ", height);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  // const switchCamera = () => {
  //   const newFacingMode = cameraFacingMode === "user" ? "environment" : "user";
  //   setCameraFacingMode(newFacingMode);
  // };

  const captureImage = async () => {
    try {
      const imageUrl = [
        camRef.current.getScreenshot(),
      ];

      setImgUri(imageUrl);
      setLoading(true);

      const res = await fetch("/api/uploadImage", {
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
      <div className="bg-violet-600 text-white m-0 p-1">
        <h1 className="text-3xl font-bold">Quick Disaster Report</h1>
        {/* <p className="text-center">Lat: {userLocation.lat}</p>
          <p className="text-center">Long: {userLocation.lng}</p> */}
      </div>
      <div className="flex justify-center items-center">
        <div className="">
          <h3 className="text-center font-bold text-lg">
            Please upload the picture
          </h3>
          <div className="flex flex-col ">
            <Webcam
              width={500}
              height={400}
              className="h-full"
              ref={camRef}
              videoConstraints={{
                facingMode: "environment",
                aspectRatio: getWindowsSize.aspectRatio,
              }}
            />
            
          </div>
          <div className="flex justify-center">
            <button
              disabled={loading}
              className="bg-violet-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={captureImage}
            >
              {loading ? "Uploading..." : "Click and Upload Image"}
            </button>
          </div>
          <div className="mt-2">
            <h2 className="text-center font-semibold">Uploaded Image</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {imgUri && (
                <div className="flex flex-row gap-10 p-3 mb-2 justify-center items-center">
                  <Image src={imgUri} width={200} height={200} alt="img"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
