import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [value, setValue] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const createshortUrl = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          original_url: value,
        }),
      });
      const data = await response.json();
      console.log(data);

      setShorturl(`http://localhost:4000/${data.data.short_code}`);
      setQrcode(data.data.qr_code);
      const showTable = document.getElementById("show");
      showTable.classList.remove("hidden");
      showTable.classList.add("block");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrcode;
    link.download = "qr-code.png";
    link.click();
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shorturl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className=" h-screen w-4/5 mx-auto">
      <div className="">
        <h1 className="custom-font1 font-mono text-black/70 pt-10 text-5xl flex flex-col text-center">
          Transform your long links into
          <span className="text-yellow-300"> powerful URLs</span>
        </h1>
        <p className="font-semibold text-center pt-5 text-lg">
          Shorten, customize and track your links with advanced analytics. The
          complete solution to manage your digital campaigns.
        </p>
      </div>
      <div className="flex justify-center gap-5 mt-10">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste your URL here (eg : https://www.youtube.com/)"
          className="w-2/5 h-15 border border-gray-500 rounded px-3 outline-amber-200 bg-gray-200/30"
        />
        <button
          onClick={createshortUrl}
          className="bg-yellow-300 px-8 rounded-lg cursor-pointer font-semibold "
        >
          Shorten Link
        </button>
      </div>
      {/* table creation */}
      <div id="show" className="hidden">
        <div className="border flex flex-col mt-10">
          <div className="flex justify-center flex-col">
            <h1 className="custom-font font-bold underline text-3xl  uppercase border-b text-center p-2 ">
              QR Code
            </h1>
            <img src={qrcode} alt="qr code" className="w-36 h-36 mx-auto m-5" />
            <div className="flex justify-center pb-5">
              <button
                onClick={downloadQR}
                className="bg-blue-600 rounded px-10 font-bold cursor-pointer py-2 text-white"
              >
                Download
              </button>
            </div>
          </div>
          <div className="border-t ">
            {/* <h1 className="custom-font font-bold underline text-3xl  uppercase border-b text-center p-2">Shorten Link</h1> */}
            <div className="flex flex-row">
              <p className="w-full bg-yellow-300/90  md:text-2xl text-center px-5 py-2 underline poppins">
                {shorturl}
              </p>
              <button
                onClick={copyToClipboard}
                className={`px-2 md:px-10 font-bold cursor-pointer py-2 text-white transition-all duration-300 ${
                  copied ? "bg-green-600" : "bg-black/70"
                }`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
