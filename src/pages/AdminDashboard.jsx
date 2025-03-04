import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const options = [
    { title: "New Request", icon: <FaClipboardList />, route: "/new-request", color: "bg-blue-600" },
    { title: "Pending Request", icon: <FaHourglassHalf />, route: "/pending-requests", color: "bg-yellow-600" },
    { title: "Completed Request", icon: <FaCheckCircle />, route: "/completed-request", color: "bg-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {options.map((option, index) => (
          <div
            key={index}
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate(option.route)}
            role="button"
            aria-label={`Navigate to ${option.title}`}
          >
            <div className={`p-6 flex flex-col items-center justify-center rounded-lg shadow-lg ${option.color} text-white`}>
              <div className="text-5xl mb-4">{option.icon}</div>
              <h2 className="text-xl font-semibold">{option.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
