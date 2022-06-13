import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { Home, Login, Cart, Profile, Menu}  from './pages';
import './App.scss';
import Navbar from './organisms/navbar';

function App() {

const isLoggedIn = useSelector(state => state.auth.user.isLoggedIn);

  return (
      <div className='App'>
          <Navbar />
          <Routes>
                  <Route path = '/'  element={<Home />} />
                  <Route path = '/menu'  element={<Menu />} />
                    { isLoggedIn ? 
                      <Route path='/profile' element={<Profile />}/> : 
                      <Route path='/login' element={<Login />} />
                    }
                  <Route path='/cart' element={<Cart />} />
          </Routes>
      </div>
  );
}

export default App;
