import React from "react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    fetchUrls();
  }, []);
  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/api/dashboard",
        {
          headers: {
            Authorization : `Bearer ${token}`
          },
        },
      );

      const data = await response.json();
      console.log(data);
      
      setUrls(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">URL Dashboard</h1>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-300">
              <tr>
                <th className="p-4 text-left">S.No</th>
                <th className="p-4 text-left">Original URL</th>
                <th className="p-4 text-left">Short URL</th>
                <th className="p-4 text-left">Created At</th>
                <th className="p-4 text-left">QR Code</th>
                <th className="p-4 text-left">Clicks</th>
              </tr>
            </thead>

            <tbody>
              {urls.map((url, index) => (
                <tr key={url.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 max-w-xs truncate">{url.original_url}</td>

                  <td className="p-4 text-blue-600">{`http://localhost:4000/${url.short_code}`}</td>

                  <td className="p-4">{url.created_at}</td>

                  <td className="p-4">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=test"
                      alt="qr"
                      className="w-14 h-14"
                    />
                  </td>

                  <td className="p-4 font-semibold">{url.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {urls.map((url, index) => (
            <div key={url.id} className="bg-white rounded-xl shadow p-4">
              <p>
                <span className="font-semibold">S.No:</span> {index + 1}
              </p>

              <p className="mt-2 break-all">
                <span className="font-semibold">Original URL:</span>
                <br />
                {url.originalUrl}
              </p>

              <p className="mt-2 text-blue-600 break-all">
                <span className="font-semibold text-black">Short URL:</span>
                <br />
                {url.shortUrl}
              </p>

              <p className="mt-2">
                <span className="font-semibold">Created At:</span>{" "}
                {url.createdAt}
              </p>

              <div className="mt-3">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=test"
                  alt="qr"
                  className="w-20 h-20"
                />
              </div>

              <p className="mt-3">
                <span className="font-semibold">Clicks:</span> {url.clicks}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
