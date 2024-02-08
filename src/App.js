import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Main from './main.jsx';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/:roomName" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
