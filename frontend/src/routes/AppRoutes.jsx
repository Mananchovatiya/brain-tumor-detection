import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import Terms from "../pages/public/Terms";
import NotFound from "../pages/public/NotFound";
import BrainTumors from "../pages/public/BrainTumors";
import PageTitle from "../components/PageTitle";
import ScrollToTop from "../components/ScrollToTop";

import PatientDashboard from "../pages/patient/Dashboard";
import PatientUpload from "../pages/patient/Upload";
import PatientAnalysis from "../pages/patient/Analysis";
import PatientHistory from "../pages/patient/History";
import PatientReports from "../pages/patient/Reports";
import PatientProfile from "../pages/patient/Profile";

import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorPatients from "../pages/doctor/Patients";
import DoctorPatientDetail from "../pages/doctor/PatientDetail";
import DoctorScanReview from "../pages/doctor/ScanReview";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminDoctors from "../pages/admin/Doctors";
import AdminPatients from "../pages/admin/Patients";

function AppRoutes() {
  return (
    <>
      <PageTitle />
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/brain-tumors" element={<BrainTumors />} />
          <Route path="*" element={<NotFound />} />
        </Route>
  
        {/* Patient routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["patient"]}>
                <PatientLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/upload" element={<PatientUpload />} />
          <Route path="/patient/analysis/:scanId" element={<PatientAnalysis />} />
          <Route path="/patient/history" element={<PatientHistory />} />
          <Route path="/patient/reports" element={<PatientReports />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
        </Route>
  
        {/* Doctor routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["doctor"]}>
                <DoctorLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/patients/:patientId" element={<DoctorPatientDetail />} />
          <Route path="/doctor/scans/:scanId" element={<DoctorScanReview />} />
        </Route>
  
        {/* Admin routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/patients" element={<AdminPatients />} />
        </Route>
    </Routes>
    </>
  );
}

export default AppRoutes;

