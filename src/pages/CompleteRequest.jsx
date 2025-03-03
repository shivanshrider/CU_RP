import { useState, useEffect } from "react";

const CompleteRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("completedRequests")) || [];
    setRequests(storedRequests);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Completed Requests
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-gray-700 text-sm md:text-base">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="p-3 border">S.No.</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">UID</th>
                <th className="p-3 border">Contact</th>
                <th className="p-3 border">Competition</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req, index) => (
                  <tr
                    key={req.id}
                    className="bg-gray-50 hover:bg-gray-100 transition text-center"
                  >
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{req.name}</td>
                    <td className="p-3 border">{req.uid}</td>
                    <td className="p-3 border">{req.contact}</td>
                    <td className="p-3 border">{req.competition}</td>
                    <td className="p-3 border text-green-600 font-semibold">
                      {req.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No Completed Requests Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompleteRequest;
