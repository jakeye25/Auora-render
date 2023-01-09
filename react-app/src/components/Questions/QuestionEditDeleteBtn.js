import React, { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from "react-router-dom";
import QuestionDelete from "./QuestionDeleteFormModal/QuestionDelete";

import QuestionUpdateFormModal from "./QuestionEditFormModal";
import QuestionUpdate from "./QuestionEditFormModal/QuestionUpdate";


function QuestionEditDeleteBtn ({user, question}) {
    const history=useHistory()
    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu =() => {
        setShowMenu(!showMenu)
    }

    if(!user) history.push('/')


    return(
        <>
            <div onClick={toggleMenu}>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            {user?  showMenu && (
                <div>
                    <div><QuestionUpdateFormModal question={question} /></div>
                    <div><QuestionDelete question={question} /></div>
                </div>
            )
        : <div></div>}
        </>
    )
}

export default QuestionEditDeleteBtn
