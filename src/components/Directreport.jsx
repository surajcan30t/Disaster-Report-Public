"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const sendVerificationCode = async () => {
    const res = await fetch("/api/sendVerificationCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await res.json();
    setMessage(`Code sent: ${data.status}`);
  };

  const verifyCode = async () => {
    const res = await fetch("/api/verifyCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, code }),
    });

    const data = await res.json();
    setMessage(`Verification status: ${data.status}`);
    if (data.status === "approved") {
      router.push("/uploadimg");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#23ffab] w-screen h-screen">
      <h1 className=" text-2xl font-bold text-center text-slate-800">
        Republic Of India Instant Disaster Report
      </h1>
      <div className="flex flex-col gap-3 p-5 bg-zinc-50 rounded-xl mt-10 shadow-gray-800 shadow-lg">
        <h1 className="capitalize font-semibold">verify your number to continue</h1>
        <input
          type="text"
          value={phoneNumber}
          className="p-3 border-black border rounded"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button className="bg-[#15b779] p-2 rounded-xl text-white font-semibold" onClick={sendVerificationCode}>
          Send Verification Code
        </button>
        <br />
        <input
          type="text"
          value={code}
          className="p-3 border-black border rounded"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
        />
        <button className="bg-[#15b779] p-2 rounded-xl text-white font-semibold" onClick={verifyCode}>
          Verify Code
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}
