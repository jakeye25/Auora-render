import React from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import './DemoUser.css'

export default function Demouser() {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = "david@aa.io";
        const password = "password";
        return dispatch(login( email, password ))

    }

    return (
        <form onSubmit={handleSubmit}>
          <button id="demobtn" className="login__demouser" type="submit"><i class="fa-regular fa-face-smile fa-lg"></i> &nbsp; Continue as Demo User</button>
        </form>
      );
}
