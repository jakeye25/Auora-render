// TYPES

const createQuestion = '/question/createQuestion'
const getAllQuestion = '/question/getAllQuestion'
const getCurrentQuestion = '/question/getCurrentQuestion'
const getOneQuestion = '/question/getOneQuestion'
const updateQuestion = '/question/updateQuestion'
const deleteQuestion = '/question/deleteQuestion'
const getProfileQuestions = '/question/getProfileQuestions'
// ACTION CREATORS

const actionCreateQustion = (question) => {
    return {
        type: createQuestion,
        question
    }
}

const actionGetAllQuestion = (questions) => {
    return {
        type: getAllQuestion,
        questions
    }
}

const actionGetCurrentQuestion = (questions) => {
    return {
        type: getCurrentQuestion,
        questions
    }
}

const actionGetOneQuestion = (question) => {
    return {
        type: getOneQuestion,
        question
    }
}

const actionUpdateQuestion = (question) => {
    return {
        type: updateQuestion,
        question
    }
}



const actionDeleteQuestion = (id) => {
    return {
        type: deleteQuestion,
        id
    }
}

const actionGetProfileQuestions = (question) => {
    return {
        type: getProfileQuestions,
        question
    }
}


export const thunkGetAllQuestion = () => async dispatch => {
    const response = await fetch("/api/questions/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllQuestion(data))

    }
}

export const thunkGetOneQuestion = (id) => async dispatch => {
    const response = await fetch(`/api/questions/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetOneQuestion(data))
    }
}

export const thunkGetCurrentQuestion = () => async dispatch => {
    const response = await fetch('/api/questions/current', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetCurrentQuestion(data))
    }
}

export const thunkCreateQuestion = (payload) => async dispatch => {
    const response = await fetch('/api/questions/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateQustion(data))
        return data
    }
}

// export const thunkCreateQuestion = (formData) => async dispatch => {
//     console.log("createquestion", formData)
//     const response = await fetch('/api/questions/new', {
//         method: 'POST',
//         // headers: { 'Content-Type': 'application/json' },
//         body: formData
//     })
//     if (response.ok) {
//         const data = await response.json()
//         dispatch(actionCreateQustion(data))
//         return data
//     }
// }

export const thunkUpdateQuestion = (payload) => async dispatch => {
    const response = await fetch(`/api/questions/${payload.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateQuestion(data))
        return data
    }
}

export const thunkDeleteQuestion = (id) => async dispatch => {
    const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteQuestion(id))
    }
}

export const thunkGetProfileQuestions = (id) => async dispatch => {

    const response = await fetch(`/api/profiles/${id}/questions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        // console.log("check profile question res", data)
        dispatch(actionGetProfileQuestions(data))
    }
}


const initialState = {}

const questionReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case getAllQuestion:
            newState = {};
            action.questions.questions.forEach((question) => {
                newState[question.id] = question;
            });
            return newState;
        case getOneQuestion:
            newState = {};
            newState[action.question.id] = action.question
            return newState
        case getCurrentQuestion:
            newState = {};
            action.questions.questions.forEach((question) => {
                newState[question.id] = question;
            });
            return newState;
        case createQuestion:

            newState[action.question.id] = action.question;
            return newState;
        case updateQuestion:
            newState[action.question.id] = action.question
            return newState
        case deleteQuestion:
            delete newState[action.id]
            return newState
        case getProfileQuestions:
            newState = {};
            action.question.questions.forEach((question) => {
                newState[question.id] = question;
            });
            return newState;
        default:
            return state;
    }
}


export default questionReducer;
