import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Layout from "./components/Layout";

// Shared Pages
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Add from "./pages/Add";
import BookList from "./pages/BookList";
import ProtectedRoute from "./components/ProtectedRoute";
import IssueBooks from "./pages/IssueBooks";
import Catalog from "./pages/Catalog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Catalog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="add" element={<Add />} />
          <Route path='list' element={<BookList />} /> 
          <Route path='issue' element={<IssueBooks />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;