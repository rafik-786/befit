import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Profile from "./pages/Profile";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import DoctorForm from "./pages/DoctorForm";
import Admin from "./pages/Admin";
import PublicRoute from "./Utils/PublicRoute";
import BookAppointment from "./pages/BookAppointment";
import { useEffect } from "react";

const App = () => {
  const { loading } = useSelector((store) => store.loader);

  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/applyDoctor" element={<DoctorForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
