import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import InitialSignUp from './pages/InitialSignUp/InitialSignUp'
import MainPageRender from './pages/MainPageRender/MainPageRender'
import MovementPage from './pages/MovementPage/MovementPage'
import UserPage from './pages/UserPage/UserPage'
import Analytics from './pages/Analytics/Analytics'
import Batch from './pages/Batch/Batch'
import Sector from './pages/Sector/Sector'
import Supplier from './pages/Supplier/Supplier'
import UserProfile from './pages/UserProfile/UserProfile'
import {
  ProtectedLogin,
  ProtectedRoute
} from './components/ProtectedRoutes'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/*
          * TODO: Usar o /products como nosso index (/)
          */}
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/cadastro" element={<InitialSignUp />} />
          <Route path="/login" element={<ProtectedLogin element={Login} />} />
          <Route path="/products" element={<ProtectedRoute element={MainPageRender} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/userpage" element={<ProtectedRoute element={UserPage} />} />
          <Route path="/movements" element={<ProtectedRoute element={MovementPage} />} />
          <Route path="/batches" element={<ProtectedRoute element={Batch} />} />
          <Route path="/sectors" element={<ProtectedRoute element={Sector} />} />
          <Route path="/suppliers" element={<ProtectedRoute element={Supplier} />} />
          <Route path="/profile" element={<ProtectedRoute element={UserProfile} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
