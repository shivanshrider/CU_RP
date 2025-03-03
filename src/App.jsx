import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginBox from "./pages/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import Navbar from "./components/Navbar";
import NewRequest from "./pages/NewRequest";
import PendingRequest from "./pages/PendingRequests";
import Student from "./pages/Student";
import StudentStatus from "./pages/StudentStatus.jsx";
import CompleteRequest from "./pages/CompleteRequest.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginBox />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/pending-request" element={<PendingRequest />} />
        <Route path="/student-status" element={<Student />} />
        <Route path="/studentreimburse-status" element={<StudentStatus />} />
        <Route path="/completed-request" element={<CompleteRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
