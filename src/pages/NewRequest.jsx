import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

const generateRequestId = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const randomNum = Math.floor(100 + Math.random() * 900);
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
  });
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setRequestId(generateRequestId());
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const uploadFile = async (file, fileName) => {
    try {
      const { data, error } = await supabase.storage.from("documents").upload(`requests/${fileName}`, file);
      if (error) throw error;
      return data.path;
    } catch (error) {
      setErrorMessage(`File upload failed: ${error.message}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    let uploadedPaths = {};
    for (const key in files) {
      const filePath = await uploadFile(files[key], `${requestId}_${key}`);
      if (filePath) uploadedPaths[key] = filePath;
    }

    try {
      const { error } = await supabase.from("requests").insert([{ requestId, ...formData, ...uploadedPaths }]);
      if (error) throw error;
      setSuccess(true);
      setFormData({ name: "", uid: "", contact: "", email: "", competitionName: "", startDate: "", endDate: "", prizeMoney: "", status: "Pending" });
      setFiles({});
    } catch (error) {
      setErrorMessage(`Submission failed: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">New Reimbursement Request</h2>
        <p className="text-center text-gray-600 text-lg">Request ID: <span className="font-semibold text-black">{requestId}</span></p>
        {success && <p className="text-green-600 text-center font-semibold mt-4">✅ Request Submitted Successfully!</p>}
        {errorMessage && <p className="text-red-600 text-center font-semibold mt-4">❌ {errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "uid", "contact", "email"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1")}</label>
                <input type={field === "email" ? "email" : "text"} name={field} value={formData[field]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-red-500" required />
              </div>
            ))}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Competition Name</label>
            <input type="text" name="competitionName" value={formData.competitionName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-red-500" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["startDate", "endDate", "prizeMoney"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1")}</label>
                <input type={field === "prizeMoney" ? "number" : "date"} name={field} value={formData[field]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-red-500" required={field !== "prizeMoney"} />
              </div>
            ))}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Upload Documents</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {["tickets", "invitationLetter", "certificates", "otherDocuments"].map((doc) => (
                <div key={doc}>
                  <label className="text-sm text-gray-600 capitalize">{doc.replace(/([A-Z])/g, " $1")}</label>
                  <input type="file" name={doc} onChange={handleFileChange} className="hidden" id={doc} />
                  <label htmlFor={doc} className="cursor-pointer mt-1 block bg-red-600 text-white text-center py-2 rounded-lg transition duration-300 hover:bg-red-700">Upload {doc.replace(/([A-Z])/g, " $1")}</label>
                  {files[doc] && <p className="text-sm text-gray-700 mt-1">Uploaded: <span className="font-medium">{files[doc].name}</span></p>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`} disabled={loading}>{loading ? "Submitting..." : "Submit Request"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;
