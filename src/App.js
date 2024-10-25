import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Register from './components/register';
import Edit from './components/edit';
import Details from './components/details';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
