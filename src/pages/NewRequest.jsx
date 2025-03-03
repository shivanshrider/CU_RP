import { useState, useEffect } from "react";

const generateRequestId = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0"); // DD
  const month = String(date.getMonth() + 1).padStart(2, "0"); // MM
  const randomNum = Math.floor(100 + Math.random() * 900); // XXX (3-digit random number)
  return `CU${day}${month}${randomNum}`;
};

const NewRequest = () => {
  const [requestId, setRequestId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    contact: "",
    email: "",
    competitionName: "",
    startDate: "",
    endDate: "",
    prizeMoney: "",
    status: "Pending",
    tickets: null,
    invitationLetter: null,
    certificates: null,
    otherDocuments: null,
  });

  useEffect(() => {
    setRequestId(generateRequestId());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setUploadedFiles((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generated Request ID:", requestId);
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-red-600 text-center mb-6">New Reimbursement Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Hidden Request ID */}
          <p className="text-sm text-gray-500 text-center">Request ID: <span className="font-bold">{requestId}</span></p>

          {/* Student Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">UID</label>
              <input
                type="text"
                name="uid"
                value={formData.uid}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                required
              />
            </div>
          </div>

          {/* Competition Details */}
          <div>
            <label className="block font-medium text-gray-700">Competition Name</label>
            <input
              type="text"
              name="competitionName"
              value={formData.competitionName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Prize Money (₹)</label>
              <input
                type="number"
                name="prizeMoney"
                value={formData.prizeMoney}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
          </div>

          {/* Uploaded Documents */}
          <div>
      <label className="block font-medium text-gray-700">Uploaded Documents</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {["tickets", "invitationLetter", "certificates", "otherDocuments"].map((doc, index) => (
          <div key={index} className="relative">
            <label className="text-sm text-gray-600 capitalize">
              {doc.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="file"
              name={doc}
              onChange={handleFileChange}
              className="hidden"
              id={doc}
            />
            <label
              htmlFor={doc}
              className="cursor-pointer mt-1 block bg-red-600 text-white text-center py-2 rounded-lg transition duration-300 hover:bg-red-700"
            >
              Upload {doc.replace(/([A-Z])/g, " $1")}
            </label>
            {uploadedFiles[doc] && (
              <p className="text-sm text-gray-700 mt-1">
                Uploaded: <span className="font-medium">{uploadedFiles[doc]}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;
