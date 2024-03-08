// store.ts
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';


const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig,rootReducer);
  
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  export { store, persistor };
