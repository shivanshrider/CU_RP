import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./utils/supabaseClient.js";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/SignUp";
import NewRequest from "./pages/NewRequest";
import PendingRequests from "./pages/PendingRequests";
import Student from "./pages/Student";
import StudentStatus from "./pages/StudentStatus.jsx";
import CompleteRequest from "./pages/CompleteRequest";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (subscription) {
        subscription?.unsubscribe();
      }
    };
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
  <Route path="/" element={<AdminLogin />} />
  <Route path="/login" element={<AdminLogin />} />
  <Route path="/student-status" element={<Student />} />
  <Route path="/studentreimburse-status" element={<StudentStatus />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />

  <Route element={<ProtectedRoute user={user} />}>
    <Route path="/new-request" element={<NewRequest />} />
    <Route path="/pending-requests" element={<PendingRequests />} />
    <Route path="/completed-request" element={<CompleteRequest />} />
  </Route>
</Routes>
    </Router>
  );
}

export default App;