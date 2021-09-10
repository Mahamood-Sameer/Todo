import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Firebase'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function SignUp() {

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const history = useHistory()
    const [anyError, setError] = useState(false)
    const [ErrorMess, setErrMess] = useState()

    const Submit = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, pass).then((userCreditials) => {

            history.push(`/${email}`)

        }).catch((err) => {
            setError(true)
            setErrMess(err.message)
        })
    }



    return (
        <>
            {
                anyError &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{ErrorMess}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            <div className="Forms__container">
                <form onSubmit={(e) => { Submit(e) }} className="Form__signup" autoComplete="on">
                    <AccountCircleIcon className="account__logo" />
                    <h4>Sign Up</h4>
                    <input type="email" required value={email} onChange={(e) => { setemail(e.target.value) }} className="input__Fields" placeholder="Email"></input>
                    <input type="password" required value={pass} onChange={(e) => { setpass(e.target.value) }} className="input__Fields" placeholder="Password"></input>
                    <button type="submit" className="SignUp__Submit__btn" id="liveToastBtn">Sign Up</button>
                    <Link to="/SignIn" className="link__signIn">Already SignedUp ?</Link>
                </form>
            </div>
        </>
    )


}

export default SignUp
