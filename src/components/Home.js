import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <>
        <div className="home">
            <h1>Organize it all with <span>Todo</span></h1>
            <p>Todo gives you focus, from work to play.</p>
            <Link to="/SignUp" className="home__getstarted">Get Started</Link>
        </div>
        </>
    )
}

export default Home
