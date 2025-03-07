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
import UpdateUser from './componen/UpdateUser';

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
        <Route path='/update-user/:id' Component={UpdateUser}/>
      </Routes>
    </Router>
  );
}

export default App;
