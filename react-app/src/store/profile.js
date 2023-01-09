// TYPES

const getProfile = '/profile/getProfile'

const updateProfile = '/profile/updateProfile'

// ACTION CREATORS
const actionGetProfile = (profile) => {
    return {
        type: getProfile,
        profile
    }
}



const actionUpdateProfile = (profile) => {
    return {
        type: updateProfile,
        profile
    }
}


export const thunkGetProfile = (id) => async dispatch => {
    const response = await fetch(`/api/profiles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetProfile(data))
    }
}




export const thunkUpdateProfile = (payload) => async dispatch => {
    const response = await fetch(`/api/profiles/${payload.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateProfile(data))
        return data
    }
}

const initialState = {}

const profileReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case getProfile:
            newState = {};
            newState[action.profile.id] = action.profile
            return newState

        case updateProfile:
            newState[action.profile.id] = action.profile
            return newState
        default:
            return state;
    }
}

export default profileReducer;
