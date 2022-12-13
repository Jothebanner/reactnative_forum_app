const INITIAL_STATE = {
    postImageName: '',
};

const postImageNameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_IMAGE_NAME':
            const newPostImageName = action.payload;
            const newState = {postImageName: newPostImageName};
            return newState;

        default:
            return state;
    }
};

export default postImageNameReducer;
