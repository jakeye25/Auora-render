
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { thunkGetAllQuestionAnswer } from '../store/answer';
import { thunkGetAllQuestion } from '../store/question';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import ProfileButton from './ProfileButton/ProfileButton';


import NavQuestionCreateFormModal from './Questions/QuestionCreateFormModal/index copy';
import Searchbar from './Search/Search';

const NavBar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user=useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answer)
    const questions = useSelector((state) => state.question)

    useEffect(() => {
      dispatch(thunkGetAllQuestion())
      dispatch(thunkGetAllQuestionAnswer())
  }, [dispatch, answers])

    if(!user) history.push('/')
  return (
    <nav id='navbar-container'>

          <NavLink to='/home' exact={true} >
            <img
            src='https://user-images.githubusercontent.com/77218939/199653992-2418c7c2-000d-4fcb-a662-a1055468dba6.png'
            alt='pic'
            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
            ></img>
          </NavLink>

          <NavLink to='/home' exact={true} >
            <i class="fa-solid fa-house fa-xl"></i>
          </NavLink>

          <NavLink to='/answers' exact={true} >
            <i class="fa-regular fa-pen-to-square fa-xl"></i>
          </NavLink>

          <div>
            <Searchbar />
          </div>
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}

          <div>
            <ProfileButton user={user}/>
          </div>

          <div>
            <NavQuestionCreateFormModal/>
          </div>
    </nav>
  );
}

export default NavBar;
