import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";
import TopicList from "../Topics/TopicList";
import QuestionCreateFormModal from "./QuestionCreateFormModal";
import './QuestionList.css'

import { thunkGetAllQuestionAnswer } from "../../store/answer";
import QuestionCreateBarFormModal from "./QuestionCreateFormModal/QuestionCreateBar";
import FollowUser from "../Follow/FollowUser";
import FollowUserMainPage from "../Follow/FollowUserMainPage";



function QuestionList() {

    const questions = useSelector((state) => state.question)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answer)
    const history = useHistory()

    if (!user) {
        history.push('/')
    }

    let allquestions = Object.values(questions)
    console.log("check question format", allquestions)
    useEffect(() => {
        dispatch(thunkGetAllQuestion())
        dispatch(thunkGetAllQuestionAnswer())
    }, [dispatch, answers, user])

    return (
        <>

            <div id="questionlist-container">
                <div id="qlist-topic-container">
                    <TopicList />
                </div>
                <div id="qlist-middle-container">
                    <div id="qlist-middle-container-top">
                        <div className="qlist-middle-container-top-up">
                            <img
                            className="qlist-avatar"
                            src={user?.avatar}
                            alt='pic'
                            onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                            ></img>
                            <QuestionCreateBarFormModal/>
                        </div>
                        {/* <div className="qlist-middle-container-topitem"> */}
                        <div className="qlist-middle-container-top-down">
                            <QuestionCreateFormModal />
                        {/* </div> */}
                            <span>|</span>
                        {/* <div className="qlist-middle-container-topitem" > */}
                            <NavLink id="qlist-middle-container-toplink" to={`/answers`}>
                                <i class="fa-regular fa-pen-to-square fa-lg"></i> &nbsp;Answer
                            </NavLink>
                        {/* </div> */}
                        </div>
                    </div>
                    <div id='qlist-middle-container-middle'>
                        {allquestions &&
                            allquestions.map((question) => (
                                <div key={question?.id} className='qlist-indquestion'>
                                    <div className="qlist-indquestion-top">
                                        <NavLink className="qlist-indquestion-link" to={`/profiles/${question?.userId}`}>
                                            <img
                                                className="qlist-indquestion-top-avatar"
                                                src={question?.avatar}
                                                alt='pic'
                                                onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                                            ></img>
                                        </NavLink>
                                        <NavLink className="qlist-indquestion-link" to={`/profiles/${question?.userId}`}>
                                            <div className="qlist-indquestion-top-username">{question?.username}</div>
                                        </NavLink>
                                        {user?.id === question?.userId ? <div></div> : <FollowUserMainPage question={question}/>}
                                    </div>
                                    <NavLink
                                        to={`/questions/${question?.id}`}
                                    >
                                        <div className="qlist-questioncontent">
                                            {question?.questioncontent}
                                        </div>
                                    </NavLink>
                                    <NavLink className="qlist-indquestion-2ndcontainer"
                                     to={`/questions/${question?.id}`}>
                                        {question?.answers?.length ? question?.answers?.length : 'No'}&nbsp;answers</NavLink>
                                    {/* {question?.userId === user?.id &&
                                    <div className="qlist-indquestion-3rdcontainer">
                                        <div><AnswerCreateFormModal question={question}/></div> */}
                                        {/* <div><QuestionEditDeleteBtn user={user} question={question}/></div> */}
                                    {/* </div>} */}
                                    {question.questionimage ? <img
                                        className="qlist-questionimg"
                                        src={question?.questionimage}
                                        alt="img"
                                        onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                                        ></img> : <div></div>}
                                    {/* <div><QuestionUpdate question={question} /></div>
                                    <div><QuestionDelete question={question} /></div> */}
                                </div>

                            ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default QuestionList
