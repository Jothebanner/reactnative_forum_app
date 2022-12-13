const INITIAL_STATE = {
    postText: '',
};

const postTextReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_TEXT':
            const newPostText = action.payload;
            const newState = {postText: newPostText};
            return newState;

        default:
            return state;
    }
};

export default postTextReducer;
