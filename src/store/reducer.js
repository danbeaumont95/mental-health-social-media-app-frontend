import * as Types from './types';

const initialState = {
  accessToken: '',
  loggedInUser: '',
  uesrDetails: {},
  friendButtonClicked: '',
  updatePosts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_ACCESSTOKEN:
      return { ...state, accessToken: action.payload.accessToken };
    case Types.UPDATE_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload.loggedInUser };
    case Types.UPDATE_USER_DETAILS:
      return { ...state, userDetails: action.payload.userDetails };
    case Types.UPDATE_FRIEND_BUTTON_CLICKED:
      return { ...state, friendButtonClicked: action.payload.friendButtonClicked };
    case Types.UPDATE_POSTS:
      return { ...state, updatePosts: action.payload.updatePosts };
    default: return state;
  }
};

export { reducer };