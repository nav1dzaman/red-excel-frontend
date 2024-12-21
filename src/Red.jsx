import React, { useState } from "react";
import axios from "axios";

const Red = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // Clear any previous errors
  };

  const handleUpload = async () => {
    if (!file) return;

    // Validate file type
    if (
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(file.type)
    ) {
      setError("Invalid file type. Please upload an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://red-excel.onrender.com/process-excel",
        formData,
        {
          responseType: "blob", // Expecting binary data in response
        }
      );

      if (response.status === 200 && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "processed_file.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setError("Failed to process the file. Please try again.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Something went wrong! Please upload the file again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0F172A]">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
          Red - Excel 
        </h2>

        <input
          type="file"
          accept=".xlsx, .xls"
          disabled={loading}
          className={`mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm ${
            loading
              ? "file:bg-gray-300 file:text-gray-500"
              : "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          }`}
          onChange={handleFileChange}
        />

        {file && (
          <div className="text-sm text-gray-700 mb-2">
            Selected File: <span className="font-medium">{file.name}</span>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          className={`w-full py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <span className="p-2 text-white font-semibold">
          Please select properly formatted excel file to upload
        </span>
        <span className="bg-yellow-500 text-yellow-900 inline-block text-center px-1 rounded text-md font-semibold">
          <a
            href="https://docs.google.com/spreadsheets/d/1_Zy9haBRNDDQd1Z8GnZKGY6WO2U244Bn/edit?usp=sharing&ouid=110628810609980045334&rtpof=true&sd=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Sample
          </a>
        </span>


        <div>
        <span className="bg-yellow-300 text-yellow-900 inline-block text-center px-1 rounded text-lg font-semibold mt-28">
          Developed By #Navid_Zaman 😎  SWE @ Red dot digital Ltd. ✉️ navidzaman.xyz@gmail.com
        </span>

        <div className="mt-10 flex justify-center ">
        <a
          href="https://www.linkedin.com/in/nav1dzaman01"
          target="_blank"
        >
          <img src="in.png" alt="LinkedIn" className="h-12 " />
        </a>
      </div>

        </div>
      </div>

    </div>
  );
};

export default Red;