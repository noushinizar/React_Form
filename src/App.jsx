import Form from "./form"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from "./table";
import EditPage from "./editpage";
import ViewPage from "./viewpage";



function App() {


  return (
    <Router>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
