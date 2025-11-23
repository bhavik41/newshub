
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>

        {/* <nav className="flex gap-4">
          <Link to="/" className="text-blue-500">Home</Link>

        </nav> */}
<Navbar/>


      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
// ...existing code...
