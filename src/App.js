import { Route, Routes } from 'react-router';
import { Home, Login, Cart}  from './pages';
import './App.scss';
import Navbar from './organisms/navbar';

function App() {
  return (
      <div className='App'>
          <Navbar />
          <Routes>
                  <Route path = '/'  element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/cart' element={<Cart />} />

          </Routes>
      </div>
  );
}

export default App;
