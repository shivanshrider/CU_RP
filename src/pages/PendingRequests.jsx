import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const PendingRequest = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "Shivansh Tiwari", uid: "22BCS10784", contact: "7275994641", competition: "Hackathon 2024", status: "Pending" },
    { id: 2, name: "Rahul Sharma", uid: "21CS10023", contact: "9876543210", competition: "Code Battle", status: "Pending" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Load completed requests from localStorage
  useEffect(() => {
    const storedCompletedRequests = JSON.parse(localStorage.getItem("completedRequests")) || [];
    console.log("Loaded completed requests:", storedCompletedRequests);
  }, []);

  const handleOpen = (request) => {
    setSelectedRequest(request);
    setUpdatedStatus(request.status);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  const handleUpdate = () => {
    if (selectedRequest) {
      const updatedRequests = requests.filter((req) => req.id !== selectedRequest.id);
      
      if (updatedStatus === "Completed") {
        const completedRequests = JSON.parse(localStorage.getItem("completedRequests")) || [];
        completedRequests.push({ ...selectedRequest, status: "Completed" });
        localStorage.setItem("completedRequests", JSON.stringify(completedRequests));
      } else {
        updatedRequests.push({ ...selectedRequest, status: updatedStatus });
      }

      setRequests(updatedRequests);
      setIsOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pending Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border">
          <thead className="bg-red-600 text-white">
            <tr className="text-left">
              <th className="py-3 px-4">S.No.</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">UID</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Competition</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{req.name}</td>
                <td className="py-3 px-4">{req.uid}</td>
                <td className="py-3 px-4">{req.contact}</td>
                <td className="py-3 px-4">{req.competition}</td>
                <td className={`py-3 px-4 font-medium capitalize ${
                  req.status === "Pending"
                    ? "text-yellow-600"
                    : req.status === "Verified"
                    ? "text-blue-600"
                    : req.status === "In Process"
                    ? "text-orange-600"
                    : "text-green-600"
                }`}>
                  {req.status}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleOpen(req)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                  >
                    <FaEdit /> Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Request Details</h3>
              <button onClick={handleClose} className="text-gray-600 hover:text-red-600">
                <IoMdClose size={24} />
              </button>
            </div>
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>UID:</strong> {selectedRequest.uid}</p>
            <p><strong>Contact:</strong> {selectedRequest.contact}</p>
            <p><strong>Competition:</strong> {selectedRequest.competition}</p>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">Update Status:</label>
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="In Process">In Process</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleClose}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequest;
