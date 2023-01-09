const getAllTopic = 'topic/getAllTopic'

const actionGetAllTopic = (topics) => {
    return {
        type: getAllTopic,
        topics
    }
}


export const thunkGetAllTopic = () => async dispatch => {
    const response = await fetch("/api/topics/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllTopic(data))

    }
}

const initialState={}

const topicReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case getAllTopic:
            newState = {};
            action.topics.topics.forEach((topic) => {
                newState[topic.id] = topic;
            });
            return newState;
            default:
                return state;
        }
    }

export default topicReducer
