import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";

import { thunkGetAllQuestionAnswer } from "../../store/answer";

import './MyQuestionListing.css'


function NotMyQuestionListings() {
    const dispatch = useDispatch()
    const history = useHistory()

    const questions = useSelector((state) => state.question)

    // console.log('questions',questions)
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answer)
    // console.log('answer', answers)
    let ansArr = Object.values(answers)
    let useranswered = ansArr.filter((ele) => ele?.userId === user?.id)

    if (!user) {
        history.push('/')
    }

    let allquestions = Object.values(questions)
    // console.log("allquesstionarr", allquestions)

    const questionfilter = allquestions.filter(question => question?.userId != user?.id);
    // console.log('filter', questionfilter)

    useEffect(() => {
        // dispatch(thunkGetAllProduct())
        dispatch(thunkGetAllQuestion())
        dispatch(thunkGetAllQuestionAnswer())
    }, [dispatch, answers])

    if (!user) history.push('/')


    return (
        <>
            <div id='myquestionlist-container'>
                 {questionfilter.length != 0 ?  (
                    <div>
                        <h1 className="myquestionlisting-top">Questions for you</h1>
                        {questionfilter.map((question, i) => (
                            <div key={i} className="my_question_listing_innerbox">

                                    <div className="my_question_listing_nav">
                                        <NavLink className='my_question_listing_link' to={`/questions/${question?.id}`}>
                                            {question?.questioncontent}
                                        </NavLink>
                                        <div className="my_question_listing_len" >{question?.answers?.length} answers</div>
                                        {question?.questionimage && (
                                            <NavLink to={`/questions/${question?.id}`}
                                            ><img className="notmyquestionimg" src={question?.questionimage}
                                               alt='pic'
                                               onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                                               ></img>
                                            </NavLink>
                                        )}
                                    </div>
                                    {/* <div id="my_question_listing_btn_container">
                                        <QuestionUpdateFormModal question={question} />
                                        <QuestionDelete question={question} />
                                    </div> */}
                                    {/* <div className="my_question_listing_btn_container">
                                    {useranswered?.length == 0 && <div className="my_question_listing_ansbtn">
                                            <AnswerCreateFormModal question={question} />
                                        </div>}
                                    </div> */}
                                    <NavLink className='tryanswerlink' to={`/questions/${question?.id}`} >Try answer this question</NavLink>

                            </div>
                        ))}
                    </div>

                ) : (<h1 className="myquestionlisting-top">No questions to answer so far</h1>)
            }
            </div>


        </>
    )
}

export default NotMyQuestionListings
