import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Todo from './components/Todo';
import './components/Styles.css'
import {auth} from './Firebase'
import React,{useState , useEffect} from 'react';


function App() {

  const [user,setUser] = useState(null)

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUser(user)
      }
      else{
        setUser(null)
      }
    })
  },[])

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path='/SignUp'>
            <Navbar user={user}/>
            <SignUp />
          </Route>
          <Route path='/' exact>
            <Navbar user={user}/>
            <Home />
          </Route>
          <Route path='/SignIn'>
            <Navbar user={user}/>
            <SignIn />
          </Route>
          <Route path='/:id'>
            <Navbar user={user}/>
            <Todo user={user} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
