import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateQuestion } from "../../../store/question";
import { thunkGetAllTopic } from "../../../store/topic";
import '../QuestionCreateFormModal/QuestionCreate.css'


function QuestionUpdate({question, setShowModal}) {
    const history = useHistory();
    const dispatch = useDispatch();

    // let question = useSelector(state => Object.values(state.question))
    const questionId = question.id

    // let editQuestion= question.find(ele => ele.id == id)

    const topicsObj = useSelector((state) => state.topic)
    // console.log('questionlisttopic', topicsObj)
    let topicsObjArr = Object.values(topicsObj)

    useEffect(() => {
      dispatch(thunkGetAllTopic())
    },[dispatch])

    const [questioncontent, setQuestioncontent] = useState(question?.questioncontent)
    const [questionimage, setQuestionimage] = useState(question?.questionimage)
    const [topicId, settopicId] = useState(question?.topicId)
    const [validations, setValidations] = useState([])

    useEffect(() => {
        const errors =[]
        if(questioncontent.length<5 || questioncontent.length>1000) {
            errors.push('Please enter a valid Question')
        }
        if(!topicId) {
          errors.push('Please select a topic')
        }
        if(questionimage &&
            ((!questionimage.includes("jpg") &&
            !questionimage.includes("png") &&
            !questionimage.includes("jpeg") &&
            !questionimage.includes("svg")) ||
            (!questionimage.includes("https") && !questionimage.includes("http")))
            )
            errors.push("Please enter a valid url image");
        setValidations(errors)
    }, [questioncontent, questionimage, topicId])

    const onSubmit = async (event) => {
        event.preventDefault();
        // setSubmit(!submit);
        const payload = {
          id: questionId,
          questioncontent,
          questionimage,
          topicId,
        };

         let updatedQuestion =
        await dispatch(thunkUpdateQuestion(payload));

        // console.log(updatedProduct)

        //   await dispatch(thunkGetOneProduct(payload.id))

        if (updatedQuestion) {
        //   history.push(`/products/${updatedProduct.id}`);

          setShowModal(false)
        }
      };

      return(
        <div className="create_question_main">
        <div className="create-question-top">
          <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
          <div className="create-question-top-title">Add Question</div>
        </div>

          <form className="create_question_form" onSubmit={onSubmit}>

            <div className="create_question_input">

              <div>
                <input
                  type="text"
                  placeholder="Start your question with 'What', 'How', 'Why', etc."
                  name="questioncontent"
                  value={questioncontent}
                  className="create_question_input_inner"
                  onChange={(event) => setQuestioncontent(event.target.value)}
                  required
                ></input>
              </div>
            </div>

            <div className="create_question_input">

              <div>
                <select
                  required
                  name="TopicId"
                  value={topicId}
                  onChange={(event) => settopicId(event.target.value)}
                  className="create_question_input_inner"
                >
                  <option className="create_question_input_inner" value="" disabled>
                    Select a topic
                  </option>
                  {topicsObjArr?.map((topic) => (
                    <option className="create_question_input_inner" key={topic?.id} value={topic?.id}>
                      {topic?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="create_question_input">

              <div>
                <input
                  type="text"
                  placeholder="Add a url image(optional)"
                  name="questionimage"
                  value={questionimage}
                  className="create_question_input_inner"
                  onChange={(event) => setQuestionimage(event.target.value)}
                ></input>
              </div>
            </div>
            {validations.length > 0 ? (
              <div className="create_question_empty">
                <div className="create_question_error">
                  {validations.map((error, i) => (
                    <div key={i}>{error}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="create_question_empty"></div>
            )}
            <div className="create_question_footer">


                  <button
                    className="create_question_cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                <button
                  className="create_question_button"
                  type="submit"
                  disabled={validations.length > 0}
                >
                  Edit Question
                </button>

            </div>
          </form>

      </div>
    )


}


export default QuestionUpdate
