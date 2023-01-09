import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentAnswer } from "../../store/answer";
import './MyAnswerListing.css'
import AnswerDeleteFormModal from "./AnswerDeleteFormModal";
import AnswerUpdateFormModal from "./AnswerUpdateFormModal";



function MyAnswerListings() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const history=useHistory()
    const currentAnswer = useSelector(state => state.answer)

    const currentAnswerArr = Object.values(currentAnswer)

    const answerfilter = currentAnswerArr.filter(answer => answer?.userId === user?.id);
    console.log('myanswer', answerfilter)

    useEffect(() => {

        dispatch(thunkGetCurrentAnswer())
    }, [dispatch])

    if (!user) history.push('/')

    return (
        <div id="myanswer-container">
                {answerfilter.length === 0 ? (<h1 className="myanswerlisting-top">You have not answered a question so far</h1>) : (
                    <div>
                        <h1 className="myanswerlisting-top">You have {answerfilter?.length} answers</h1>
                        {answerfilter.map((answer, i) => (
                            <div key={i} className="my_answer_listing_innerbox">

                                    <div className="my_answer_listing_nav">
                                        <NavLink
                                        className='my_answer_listing_link'
                                        to={`/questions/${answer?.questionId}`}>

                                        {answer?.question}
                                        </NavLink>
                                    </div>
                                    <div className="myanswers-userbtn-container">
                                        <div className="my_answer_listing_profile">
                                            <img
                                            src={answer?.avatar}
                                            alt='pic'
                                            onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                                            ></img>
                                            <div className="my_answer_listing_profile-right">
                                                <div>{user?.username}</div>
                                                <div>{answer?.createdAt.slice(7, 16)}</div>
                                            </div>
                                        </div>
                                        <div className="myanswer-btn">
                                            <div><AnswerUpdateFormModal answer={answer}/></div>
                                            <div><AnswerDeleteFormModal answer={answer}/></div>
                                        </div>
                                    </div>
                                        <div className="myanswer-content">{answer?.answercontent}</div>
                                    {answer.answerimage ? <div><img
                                        className="myanswerimg"
                                        src={answer?.answerimage}
                                        alt="img"
                                        onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                                        ></img></div> : <div></div>}

                            </div>
                        ))}
                    </div>

                )}
        </div>
    )

}

export default MyAnswerListings
