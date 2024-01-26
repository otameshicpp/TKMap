import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Main from './main.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/music" element={<Main roomIndex={1} />} />
        <Route path="/physics" element={<Main roomIndex={2} />} />
        <Route path="/art" element={<Main roomIndex={3} />} />
        <Route path="/geography" element={<Main roomIndex={4} />} />
        <Route path="/geophysics" element={<Main roomIndex={5} />} />
        <Route path="/biology-s" element={<Main roomIndex={6} />} />
        <Route path="/biology-e" element={<Main roomIndex={7} />} />
        <Route path="/CS" element={<Main roomIndex={8} />} />
        <Route path="/2-A" element={<Main roomIndex={9} />} />
        <Route path="/2-B" element={<Main roomIndex={10} />} />
        <Route path="/2-C" element={<Main roomIndex={11} />} />
        <Route path="/2-1" element={<Main roomIndex={12} />} />
        <Route path="/2-2" element={<Main roomIndex={13} />} />
        <Route path="/2-3" element={<Main roomIndex={14} />} />
        <Route path="/2-4" element={<Main roomIndex={15} />} />
      </Routes>
    </div>
  );
}

export default App;
