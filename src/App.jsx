import Form from "./form"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from "./table";



function App() {


  return (
    <Router>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
