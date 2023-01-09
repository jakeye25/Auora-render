// TYPES

const createAnswer = '/answer/createAnswer'
const getAllQuestionAnswer = '/answer/getAllQuestionAnswer'
const getCurrentAnswer = '/answer/getCurrentAnswer'
const updateAnswer = '/answer/updateAnswer'
const deleteAnswer = '/answer/deleteAnswer'
const getProfileAnswers = '/answer/getProfileAnswers'
// ACTION CREATORS

const actionCreateAnswer = (answer) => {
    return {
        type: createAnswer,
        answer
    }
}

const actionGetAllQuestionAnswer = (answers) => {
    return {
        type: getAllQuestionAnswer,
        answers
    }
}

const actionGetCurrentAnswer = (answers) => {
    return {
        type: getCurrentAnswer,
        answers
    }
}

const actionUpdateAnswer = (answer) => {
    return {
        type: updateAnswer,
        answer
    }
}

const actionDeleteAnswer = (id) => {
    return {
        type: deleteAnswer,
        id
    }
}

const actionGetProfileAnswers = (answer) => {
    return {
        type: getProfileAnswers,
        answer
    }
}

// THUNKS


export const thunkCreateAnswer = (payload) => async dispatch => {
    const response = await fetch(`/api/answers/questions/${payload.questionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateAnswer(data))
        return data
    }
}


export const thunkGetAllQuestionAnswer = (id) => async dispatch => {
    const response = await fetch(`/api/answers/questions/${id}`, {
        method: "GET",
    });
    // console.log(id)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllQuestionAnswer(data))
    }
}


export const thunkGetCurrentAnswer = () => async dispatch => {
    const response = await fetch('/api/answers/')

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetCurrentAnswer(data))
    }
}


export const thunkUpdateAnswer = (payload) => async dispatch => {
    const response = await fetch(`/api/answers/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    // console.log(payload)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateAnswer(data))
        return data
    }
}


export const thunkDeleteAnswer = (id) => async dispatch => {
    const response = await fetch(`/api/answers/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionDeleteAnswer(id))
    }
}


export const thunkGetProfileAnswers = (id) => async dispatch => {
    const response = await fetch(`/api/profiles/${id}/answers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetProfileAnswers(data))
    }
}

const initialState = {}
const answerReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case createAnswer:
            newState[action.answer.id] = action.answer
            return newState
        case getAllQuestionAnswer:
            newState = {};
            action.answers.question_answers.forEach((answer) => {
                newState[answer.id] = answer;
            });
            return newState
        case getCurrentAnswer:
            newState = {};
            action.answers.answers.forEach((answer) => {
                newState[answer.id] = answer;
            });
            return newState
        case updateAnswer:
            newState[action.answer.id] = action.answer
            return newState
        case deleteAnswer:
            delete newState[action.id]
            return newState
        case getProfileAnswers:
            newState = {};
            action.answer.answers.forEach((answer) => {
                newState[answer.id] = answer;
            });
            return newState;
        default:
            return state
    }
}



export default answerReducer
