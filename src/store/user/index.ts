import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type User = {
    name: string | null | undefined
    uid: string | null | undefined
    // age: number | null
    // email: string | null
    // token: string | null
    history: string[]
    tasks: any[]
}
export type UserState = {
    user: User
}
export type UpdateUserPayload = User
export type AddHistoryPayload = string
const initialState: UserState = {
    user: {

        name: null,
        uid: null,
        // age: null,
        // email: null,
        // token: null,
        history: [],
        tasks: [],
    },
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        updateUser(state, action: PayloadAction<UpdateUserPayload>) {
            state.user = action.payload
        },
        addHistory(state, action: PayloadAction<AddHistoryPayload>) {
            state.user.history.push(action.payload)
        },
        reset(): UserState {
            return initialState
        },
    },
})




