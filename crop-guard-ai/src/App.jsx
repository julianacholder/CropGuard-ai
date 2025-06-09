import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout"; // Updated path to be relative

import Dashboard from "@/pages/dashboard";
import Detection from "@/pages/detection";
import PestLibrary from "../src/entities/PestLibrary";
// Import other pages as you create them
// import History from "@/pages/history";
// import Resources from "@/pages/resources";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Default route - redirects to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Main app routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detection" element={<Detection />} />
          <Route path="/pestlibrary" element={<PestLibrary />} />
          
          {/* Add these routes when you create the components */}
          {/* <Route path="/history" element={<History />} /> */}
          {/* <Route path="/resources" element={<Resources />} /> */}
          
          {/* Catch-all route for 404s */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;