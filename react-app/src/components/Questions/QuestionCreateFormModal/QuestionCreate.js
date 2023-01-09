import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateQuestion } from "../../../store/question";
import { thunkGetAllTopic } from "../../../store/topic";
import './QuestionCreate.css'

function QuestionCreate({ setShowModal }) {
  const history = useHistory()
  const dispatch = useDispatch()


  const [questioncontent, setQuestioncontent] = useState('')
  const [questionimage, setQuestionimage] = useState('')
  const [topicId, settopicId] = useState('')
  const [validations, setValidations] = useState([])

  const topicsObj = useSelector((state) => state.topic)
  // console.log('questionlisttopic', topicsObj)
  let topicsObjArr = Object.values(topicsObj)
  // console.log('questionlisttopicarr', topicsObjArr)

  useEffect(() => {
    dispatch(thunkGetAllTopic())
  }, [dispatch])

  const currentuser = useSelector((state) => state.session.user)

  useEffect(() => {
    const errors = []
    if (questioncontent.length < 5 || questioncontent.length > 1000) {
      errors.push('Please enter a valid Question')
    }
    if (!topicId) {
      errors.push('Please select a topic')
    }
    if (questionimage &&
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
    event.preventDefault()
    const payload = {
      questioncontent,
      questionimage,
      topicId
    }
    // const formData = new FormData()

    //     formData.append('questioncontent', questioncontent)
    //     formData.append('topicId', topicId)
    // console.log("***************", questionimage)
    // if (image) formData.append("image", image)
    // if (questionimage) formData.append('questionimage', questionimage)

    let createdQuestion = await dispatch(thunkCreateQuestion(payload))
    // console.log("onsubmit", formData)
    // let createdQuestion = await dispatch(thunkCreateQuestion(formData))

    if (createdQuestion) {

      setShowModal(false)

    }
    // onClick=()=> setShowModal(false)
  }

  // const addImage = (e) => {
  //   const file = e.target.files[0]
  //   setQuestionimage(file)
  // }


  return (
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
              placeholder="Add an image url (optional)"
              name="questionimage"
              value={questionimage}
              className="create_question_input_inner"
              onChange={(event) => setQuestionimage(event.target.value)}
            // type="file"
            // accept="image/*"
            // name="questionimage"
            // id="image-upload"
            // className="create_product_input_inner"
            // onChange={addImage}
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

          {/* <div className="image-upload-container"> */}
          {/* <label htmlFor="image-upload" className="custom-file-upload"><i class="fa-regular fa-image fa-xl"></i></label> */}
          {/* <input
                type="text"
                placeholder="Add an image url (optional)"
                name="questionimage"
                value={questionimage}
                className="create_question_input_inner"
                onChange={(event) => setQuestionimage(event.target.value)} */}
          {/* // type="file"
                // accept="image/*"
                // name="questionimage"
                // id="image-upload"
                // className="create_product_input_inner"
                // onChange={addImage} */}
          {/* ></input> */}

          {/* </div> */}
          <div>

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
              Add Question
            </button>
          </div>

        </div>
      </form>

    </div>
  )



}

export default QuestionCreate;
