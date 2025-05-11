import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.js";
import "./index.css"; 
import {SignIn} from "./pages/Signin/Signin.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import AddProperty from "./pages/Dashboard/AddProperty.js";
import UpdateEmailPage from "./pages/Profile/updateEmail.js";
import ProfilePage from "./pages/Profile/updateProfile.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/add-property" element={<AddProperty />} />
          <Route path="/dashboard/profile/update-password/update-email" element={<UpdateEmailPage />} />
          <Route path="/dashboard/profile/update-password" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
