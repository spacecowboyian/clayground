import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ordersReducer from './ordersSlice'
import inventoryReducer from './inventorySlice'
import settingsReducer from './settingsSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    inventory: inventoryReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/** Typed hook — use instead of plain `useDispatch` */
export const useAppDispatch: () => AppDispatch = useDispatch
/** Typed hook — use instead of plain `useSelector` */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
