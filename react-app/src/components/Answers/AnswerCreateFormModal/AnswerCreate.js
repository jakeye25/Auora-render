import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkCreateAnswer } from "../../../store/answer";

function AnswerCreate({ question, setShowModal }) {
    const dispatch = useDispatch()
    const questionId = question?.id
    const history = useHistory()
    // console.log('questionid', questionId)
    const user = useSelector((state) => state.session.user)
    console.log('user', user)
    const [answercontent, setAnswercontent] = useState('')
    const [answerimage, setAnswerimage] = useState('')
    const [validations, setValidations] = useState([])

    useEffect(() => {
        const errors = []
        if (answercontent.length < 5 || answercontent.length > 1000) {
            errors.push('Please enter a valid Answer')
        }
        if (answerimage &&
            ((!answerimage.includes("jpg") &&
                !answerimage.includes("png") &&
                !answerimage.includes("jpeg") &&
                !answerimage.includes("svg")) ||
                (!answerimage.includes("https") && !answerimage.includes("http")))
        )
            errors.push("Please enter a valid url image");
        setValidations(errors)
    }, [answercontent, answerimage])

    const onSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            questionId: questionId,
            answercontent,
            answerimage

        }

        let createdAnswer = await dispatch(thunkCreateAnswer(payload))

        if (createdAnswer) {

            setShowModal(false)

        }
        // onClick=()=> setShowModal(false)
    }

    return (
        <div className="createanswer-container">
            <div className='createanswer-cross' onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
            <div className="createanswer-profile">
                <img
                src={user?.avatar}
                alt='pic'
                onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                ></img>
                <div>{user?.username}</div>
            </div>
            <div className="createanswer-question">{question?.questioncontent}</div>
            <form className="create_answer_form" onSubmit={onSubmit}>

                <div className="create_answer_input">

                    <div>
                        <input
                            type="text"
                            placeholder="Write your answer"
                            name="answercontent"
                            value={answercontent}
                            className="create_answer_input_inner"
                            onChange={(event) => setAnswercontent(event.target.value)}
                            required
                        ></input>
                    </div>
                </div>

                <div className="create_answer_input">

                    <div>
                        <input
                            type="text"
                            placeholder="Add a url image(optional)"
                            name="answerimage"
                            value={answerimage}
                            className="create_answer_input_inner"
                            onChange={(event) => setAnswerimage(event.target.value)}
                        ></input>
                    </div>
                </div>
                {validations.length > 0 ? (
                    <div className="create_answer_empty">
                        <div className="create_answer_error">
                            {validations.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="create_answer_empty"></div>
                )}
                <div className="create_answer_footer">


                            <button
                                className="create_answer_cancel"
                                onClick={(event) => history.push("/home")}
                            >
                                Cancel
                            </button>



                        <button
                            className="create_answer_button"
                            type="submit"
                            disabled={validations.length > 0}
                        >
                            Post
                        </button>

                </div>
            </form>

        </div>
    )
}

export default AnswerCreate
