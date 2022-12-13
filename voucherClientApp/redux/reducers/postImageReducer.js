import postTextReducer from "./postTextReducer";

const INITIAL_STATE = {
    postImage: '',
};

const postImageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_IMAGE':
            const newPostImage = action.payload;
            const newState = {postImage: newPostImage};
            return newState;
        default:
            return state;
    }
};

export default postImageReducer;
