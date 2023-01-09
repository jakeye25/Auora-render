import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteQuestion } from "../../../store/question"
import './QuestionDelete.css'


function QuestionDelete({question, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()

    // let question = useSelector((state) => state.question)

    const onClick = async (event) => {
        await dispatch(thunkDeleteQuestion(question.id))
        
    }

    return (
        <div className="del-modal-container">
            <div className="del-modal-container-top">Are you sure you want to continue your action?</div>
            <div className="del-modal-container-bot">
                <div className="delete-modal-item" onClick={() => setShowModal(false)}>Cancel</div>
                <div className="delete-modal-item" onClick={onClick}>Delete</div>
            </div>
        </div>
    )



}

export default QuestionDelete
