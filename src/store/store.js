import {configureStore, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers} from "redux";
import axios from "axios";

// 사용자 정보 초기 상태
const initialUserState = {
    name: "",
    email: "",
    token: null, // JWT 토큰 추가
};

// 사용자 정보 slice
const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            const {name, email, token} = action.payload;
            state.name = name;
            state.email = email;
            state.token = token; // 토큰 저장
        },
        clearUser() {
            return initialUserState; // 로그아웃 시 초기 상태로
        },
    },
});

// 로그인 상태 slice
const authSlice = createSlice({
    name: "auth",
    initialState: false,
    reducers: {
        login(state, action) {
            const token = action.payload;
            // 토큰이 유효한 경우 로그인 상태로 변경
            return !!token; // 토큰이 있을 경우 true로 변경
        },
        logout() {
            return false; // 로그아웃 시 false로 변경
        },
    },
});

// Redux persist 설정
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "auth"], // user와 auth 상태를 persist
};

// 모든 리듀서를 결합
const rootReducer = combineReducers({
    user: userSlice.reducer,
    auth: authSlice.reducer,
});

// 영속성 리듀서 설정
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 로그아웃 시 사용자 상태 초기화 미들웨어
const logoutMiddleware = (store) => (next) => (action) => {
    if (action.type === authSlice.actions.logout.type) {
        store.dispatch(userSlice.actions.clearUser());
        localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
    }
    return next(action);
};

// 스토어 설정
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // persist 관련 액션 무시
            },
        }).concat(logoutMiddleware),
});

// Persistor 생성
const persistor = persistStore(store);

// 액션과 스토어, persistor 내보내기
export const {login, logout} = authSlice.actions;
export const {setUser, clearUser} = userSlice.actions;
export {store, persistor};
