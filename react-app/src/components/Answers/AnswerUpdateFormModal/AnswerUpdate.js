import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateAnswer } from "../../../store/answer";
import '../AnswerCreateFormModal/AnswerCreate.css'

function AnswerUpdate({answer, setShowModal}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const answerId = answer?.id
    console.log('answerupdate answereId', answerId)
    const user = useSelector((state) => state.session.user)


    const [answercontent, setAnswercontent] = useState(answer?.answercontent)
    const [answerimage, setAnswerimage] = useState(answer?.answerimage)
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
        event.preventDefault();
        const payload = {
            id: answerId,
            answercontent,
            answerimage

        }

        let updatedAnswer = await dispatch(thunkUpdateAnswer(payload))

        if (updatedAnswer) {
            history.push('/myanswers');
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
            <div className="createanswer-question">{answer?.question}</div>
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

export default AnswerUpdate
