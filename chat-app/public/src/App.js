
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
      <div>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/avatarSelection' element={<SetAvatar/>}/>
        </Routes>
      </div>
  );
}

export default App;
