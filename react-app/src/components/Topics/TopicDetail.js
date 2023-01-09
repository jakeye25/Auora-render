import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetAllTopic } from "../../store/topic";
import './TopicDetail.css'
import TopicList from "./TopicList";


function TopicDetail() {
    const topics = useSelector((state) => state.topic)
    const dispatch = useDispatch()
    const {topicName} = useParams()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkGetAllTopic())
    },[dispatch])

    let alltopics = Object.values(topics)
    // console.log("topics ", alltopics)

    let topicArr = alltopics.filter(element => element.name==topicName)
    // console.log('topicarr', topicArr)

    let indTopic = topicArr[0]
    let indTopicques = topicArr[0]?.questions

    if(!user) history.push('/')

    if(!indTopicques){
        return(
            <h1>No such questions</h1>
        )
    }


    return(
        <div className="eachtopic-container">
            <div className="indtopic-topiclist-container">
                <TopicList/>
            </div>
            <div className="indtopic-middle-container">
                <div className="indtopic-middle-container-top">
                    <img
                    src={indTopic?.topicimage}
                    alt='pic'></img>
                    <div className="indtopic-topname">Welcome to the {indTopic?.name} world!</div>
                </div>
                {indTopicques &&
                    indTopicques?.map((topic) => (
                    <div key = {topic.id} className='indtopicquestion-container'>
                        <NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                            <div className="indtopicquestioncontent">
                                {topic?.questioncontent}
                            </div>
                        </NavLink>
                        <NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                            <div className="indtopicanswercount">
                                {topic?.answers.length} answers
                            </div>
                        </NavLink>
                        {topic?.questionimage &&(<NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                            <img className="indtopicimage"
                            src={topic?.questionimage}
                            alt='pic'></img>


                        </NavLink>)}
                        </div>
                ))}
            </div>
        </div>
    )


}

export default TopicDetail
