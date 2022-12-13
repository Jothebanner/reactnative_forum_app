const INITIAL_STATE = {
    deleteToggle: false,
};

const deleteToggleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_DELETE':
            const newDeleteToggle = !state.deleteToggle;
            const newState = {deleteToggle: newDeleteToggle};
            return newState;

        default:
            return state;
    }
};

export default deleteToggleReducer;
