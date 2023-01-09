// TYPES

const userFollow = '/follow/userFollow'
const userUnfollow = '/follow/userUnfollow'

// ACTION CREATORS
const actionUserFollow = (id) => {
    return {
        type: userFollow,
        id
    }
}

const actionUserUnfollow = (id) => {
    return {
        type: userUnfollow,
        id
    }
}

export const thunkUserFollow= (id) => async dispatch => {
    const response = await fetch(`/api/follows/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUserFollow(id))
        return data
    }
}

export const thunkUserUnfollow= (id) => async dispatch => {
    const response = await fetch(`/api/follows/unfollow/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUserUnfollow(id))
        return data
    }
}

const initialState = {}

const followReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case userFollow:
            newState= {...state}
            return newState;
        case userUnfollow:
            newState= {...state}
            return newState;
        default:
            return state;
    }
}

export default followReducer;
