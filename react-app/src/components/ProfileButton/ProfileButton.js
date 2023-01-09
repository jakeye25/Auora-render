import React, { useState, useEffect} from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './ProfileButton.css'

function ProfileButton({ user }) {
    console.log('user', user)
    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      return(
        <>
            {/* <div className="profile_button" onClick={openMenu}> */}
                <img className="profile_button" onClick={openMenu} src={user?.avatar}
                alt='pic'
                onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                ></img>
            {/* </div> */}
            {showMenu &&  (
            <div className="profile-dropdown">

              <NavLink className="menu-item1" to={`/profiles/${user.id}`}>
                <img className="profile-dropdown-pic"
                src={user?.avatar}
                alt='pic'
                onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                ></img>
                <div className="profile-dropdown-name">{user?.username} <i className="fa-solid fa-chevron-right"></i></div>
                {user?.bio && <div className="profile-dropdown-bio">{user?.bio}</div>}
              </NavLink>

              <Link  className="menu-item-link" to={`/myquestions`}><i className="fa-regular fa-rectangle-list fa-lg"></i> &nbsp;My Questions</Link>


              <Link className="menu-item-link" to={`/myanswers`}><i className="fa-regular fa-star fa-lg"></i> &nbsp;My Answers</Link>


              <LogoutButton/>


            </div>
        )
            }

        </>
      )

}



export default ProfileButton;
