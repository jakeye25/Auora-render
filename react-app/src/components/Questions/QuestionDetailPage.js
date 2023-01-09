import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from "../../store/question";
import { thunkGetAllQuestionAnswer } from "../../store/answer";
import './QuestionDetailPage.css'
import AnswerCreateFormModal from "../Answers/AnswerCreateFormModal";



function QuestionDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const[exist, setExist] =useState(false)
    const user = useSelector((state) => state.session.user)
    const question = useSelector((state) => state.question[id])
    const answer = useSelector((state) => state.answer)
    let answerArr =  question?.answers
    // console.log('question', question)
    // console.log('user', user)
    // console.log('answer', answer)
    let ansArr = Object.values(answer)
    // console.log('ansArr', ansArr)
    let useranswered = ansArr.filter((ele) => ele?.userId === user?.id)
    // console.log('userans', useranswered)




    if(!user) history.push('/')

    useEffect(() => {
        dispatch(thunkGetOneQuestion(id));
        dispatch(thunkGetAllQuestionAnswer(id))
    }, [dispatch, id])

    return (
        <div id="qdetail-container">
            <div id="qdetail-indcontainer">
                <div className="qdetail-title">{question?.questioncontent}</div>
                <div className="qdetail-anscount">{ansArr?.length}&nbsp;answers</div>
                {question?.questionimage && <img className="qdetail-image"
                src={question?.questionimage}
                alt='pic'
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                ></img>}
                {question?.userId != user?.id && useranswered?.length == 0 &&
                <div className="qdetail-anscontainer">
                    <img
                    src={user?.avatar}
                    alt='pic'
                    onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                    ></img>
                    <div>{user?.username}, can you answer this question?</div>
                    <div>People are searching for a better answer to this question.</div>
                    <div className="qdetail-createans"><AnswerCreateFormModal question={question}/></div>
                </div>
                }
            </div>
                {ansArr &&
                ansArr.map((ele) => (
                    <div className="qdetail-indanswer" key={ele.id}>
                        <div className="qdetail-indanswer-user" >
                            <img
                            src={ele?.avatar}
                            alt="pic"
                            onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                            ></img>
                            <div>&nbsp;&nbsp;{ele?.username}</div>
                        </div>
                        <div className="qdetail-indanswer-content">{ele?.answercontent}</div>
                        {ele?.answerimage &&(<img className="qdetail-indanswer-image"
                        src={ele?.answerimage}
                        alt='pic'
                        onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                        ></img>)}
                    </div>
                ))}



        </div>
    )


}

export default QuestionDetailPage
