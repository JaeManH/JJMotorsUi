import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// 사용자 정보 초기 상태
const initialUserState = {
  name: "",
  email: "",
};

// 사용자 정보 slice
let user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialUserState;
    },
  },
});

// 로그인 상태 slice
let isAthenticate = createSlice({
  name: "isAthenticate",
  initialState: false,
  reducers: {
    login() {
      return true;
    },
    logout(state, action) {
      return false;
    },
  },
});

// Redux persist 설정
const persistConfig = {
  key: "root",
  storage,
  // serializableCheck 설정을 추가하여 비직렬화 가능 경고를 무시할 수 있습니다.
  // 비활성화하거나 특정 액션에 대해 무시할 수 있습니다.
  // 아래에서 serializableCheck를 비활성화하거나 특정 액션만 무시하도록 설정합니다.
};

// 모든 리듀서를 결합
const rootReducer = combineReducers({
  user: user.reducer,
  isAthenticate: isAthenticate.reducer,
});

// 영속성 리듀서 설정
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 로그아웃 시 사용자 상태 초기화 미들웨어
const logoutMiddleware = (store) => (next) => (action) => {
  if (action.type === isAthenticate.actions.logout.type) {
    store.dispatch(user.actions.clearUser());
  }
  return next(action);
};

// 스토어 설정
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 특정 액션 타입을 무시
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(logoutMiddleware),
});

const persistor = persistStore(store);

export let { login, logout } = isAthenticate.actions;
export let { changeName, setUser, clearUser } = user.actions;
export { store, persistor };
