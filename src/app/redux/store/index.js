// import { applyMiddleware, compose, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { createBrowserHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router';
// import reducers from '../reducers';

// const history = createBrowserHistory();
// const routeMiddleware = routerMiddleware(history);
// const bindMiddleware = middleware => {
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//     return composeEnhancers(applyMiddleware(...middleware));
// };

// function configureStore(initialState = {}) {
//     const store = createStore(reducers(history), initialState, bindMiddleware([routeMiddleware, thunk]));

//     if (module.hot) {
//         // Enable Webpack hot module replacement for reducers
//         module.hot.accept('../reducers/index', () => {
//             const exportReducers = require('../reducers');
//             store.replaceReducer(exportReducers);
//         });
//     }
//     return store;
// }
// export default configureStore;
// export { history };
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or any other storage engine
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const bindMiddleware = middleware => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(...middleware));
};

function configureStore(initialState = {}) {
  const persistedReducer = persistReducer(persistConfig, reducers(history));

  const store = createStore(persistedReducer, initialState, bindMiddleware([routeMiddleware, thunk]));
  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const exportReducers = require('../reducers');
      store.replaceReducer(persistReducer(persistConfig, exportReducers(history)));
    });
  }

  return { store, persistor };
}

export default configureStore;
export { history };

