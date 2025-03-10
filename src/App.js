import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './componen/Login';
import Dashboard from './componen/Dashboard';
import SignUp from './componen/SignUp';
import SideBar from './componen/SideBar';
import ListAdmins from './componen/ListAdmins';
import ListUsers from './componen/ListUsers';
import CreateUser from './componen/CreateUser';
import DiscoverGames from './componen/DiscoverGames';
import ManageGames from './componen/ManageGames';
import UserProfile from './componen/UserProfile';
import DetailGame from './componen/DetailGame';
import GameDetail from './componen/GameDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/signup' Component={SignUp}/>
        <Route path='/list-admins' Component={ListAdmins}/>
        <Route path='/list-users' Component={ListUsers}/>
        <Route path='/create-user' Component={CreateUser}/>
        <Route path='/discover-games' Component={DiscoverGames}/>
        <Route path='/games-detail/:slug' Component={DetailGame}/>
        <Route path='/manage-games' Component={ManageGames}/>
        <Route path='/profile/:username' Component={UserProfile}/>
        <Route path='/detail-game/:slug' Component={GameDetail}/>
      </Routes>
    </Router>
  );
}

export default App;
