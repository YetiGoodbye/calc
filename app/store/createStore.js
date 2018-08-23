import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'Reducers';

const configureStore = () => {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
  )(create);

  const store = createStoreWithMiddleware(rootReducer);

  return store;
}

export default configureStore;
