const updateText = (postText,) => {
    return {
        type: 'UPDATE_TEXT',
        payload: postText,
    }
};

const updateImageName = (postImageName) => {
    return {
        type: 'UPDATE_IMAGE_NAME',
        payload: postImageName,
    }
};

const updateImage = (postImage) => {
    return {
        type: 'UPDATE_IMAGE',
        payload: postImage,
    }
};

const toggleDelete = () => {
    return {
        type: 'TOGGLE_DELETE'
    }
};

export default {
    updateText,
    updateImageName,
    updateImage,
    toggleDelete,
}