import { Route, Routes } from 'react-router';
import { Home, Login, Cart}  from './pages';
import './App.scss';

function App() {
  return (
      <div className='App'>
          <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/cart' element={<Cart />} />
          </Routes>
      </div>
  );
}

export default App;
