import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading';


function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
       <Route path = '/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
       <Route path = '/login' element = {<Login/>} />
       <Route path = '/signup' element = {<Signup/>} />
       <Route path = '/page-loading' element = {<PageLoading/>} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
