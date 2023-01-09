import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllTopic } from "../../store/topic";
import './TopicList.css'

function TopicList() {
    const topics = useSelector((state) => state.topic)
    const dispatch = useDispatch()

    let alltopics = Object.values(topics)
    console.log("topics ", alltopics)

    useEffect(() => {
        dispatch(thunkGetAllTopic())
    },[dispatch])

    return(
        <div id="topic-container">
            {alltopics &&
                    alltopics.map((topic) => (
                    <div key = {topic.id} className='indtopic-container'>
                        <NavLink className='topiclink'
                        to = {`/topics/${topic?.name}`}
                        >
                        {topic?.topicimage? <div><img
                        className="topicimg"
                        src={topic?.topicimage}
                        alt="img"></img></div> :<div></div>}
                            <br></br>

                            <div className="topicname">
                                &nbsp; {topic?.name}
                            </div>
                        </NavLink>
                        </div>
                ))}
        </div>
    )
}


export default TopicList
