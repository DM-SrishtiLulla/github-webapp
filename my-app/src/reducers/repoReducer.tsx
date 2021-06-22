//import uuid from 'uuid/v4';

export const repoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REPO':
      return [...state, {
        repoName: action.repo.repoName, 
        owner: action.repo.owner,
        version: action.repo.version,
        releaseDate: action.repo.releaseDate,
        unread: action.repo.unread,
        id: action.repo.id
        ,}
        //id: uuid()}
      ]
    case 'DELETE_REPO':
      return state.filter(repo => repo.id !== action.id);
    case 'UPDATE_REPO':
        return state;
        // figure out how to mark as read
    default:
      return state;
  }
} 