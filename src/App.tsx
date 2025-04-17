import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';
import UserType from './pages/auth/UserType';
import PatientGetin from './pages/auth/PatientGetin';
import OthersGetin from './pages/auth/OthersGetin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/user-type" element={<UserType />} />
        <Route path="/patient-getin" element={<PatientGetin />} />
        <Route path="/others-getin" element={<OthersGetin />} />
      </Routes>
    </Router>
  );
}

export default App;