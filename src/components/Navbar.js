import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { auth } from '../Firebase'
function Navbar({ user }) {
    const { id } = useParams()
    const history = useHistory()
    return (
        <nav className="navbar navbar-expand-lg  navbar navbar-dark bg-dark" style={{"padding":10+"px","fontSize":20+"px","opacity":0.85}}>
            <div className="container-fluid">
                {
                    !(user) &&  <Link className="navbar-brand" to="/" style={{"color":"#db4c3f"}}>Todo</Link>
                }
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        !(user) ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/SignIn">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/SignUp">Sign Up</Link>
                                </li>
                            </ul>
                        :
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                    <h3 style={{"color":"#db4c3f"}}>To do</h3>
                            </li>
                        </ul>
                    }

                    {
                        user ? <form className="d-flex">
                            <Avatar alt={id} src="/static/images/avatar/1.jpg" className="Avatar__logo " />
                            <button className="btn btn-success" type="submit" onClick={() => {
                                auth.signOut()
                                history.push('/')
                            }}>Log out</button>
                        </form> : null
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
