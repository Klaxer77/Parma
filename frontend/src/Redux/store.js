import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
  persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Menu  from './Menu/Menu.slice';
import Login from './Login/Login.slice';
import ProfileInfo from './Profile/ProfileInfo.slice';


const rootReducer = combineReducers({
  Menu, 
  Login,
  ProfileInfo
}) 

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], // что не хотим сохранять
};

const persistedReducer = persistReducer(persistConfig, rootReducer)
 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);