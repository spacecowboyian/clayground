import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  listOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  reorderOrders,
} from '../lib/storage'
import type { WorkOrder, WorkOrderInput } from '../types/WorkOrder'
import { extractMessage } from '../utils/errors'

// ── State ─────────────────────────────────────────────────────────────────────

interface OrdersState {
  items: WorkOrder[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
}

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchOrders = createAsyncThunk<WorkOrder[], void, { rejectValue: string }>(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await listOrders()
    } catch (err) {
      const msg = extractMessage(err, 'Failed to load orders')
      return rejectWithValue(msg)
    }
  }
)

export const addOrder = createAsyncThunk<WorkOrder, WorkOrderInput, { rejectValue: string }>(
  'orders/add',
  async (input, { rejectWithValue }) => {
    try {
      return await createOrder(input)
    } catch (err) {
      const msg = extractMessage(err, 'Failed to create order')
      return rejectWithValue(msg)
    }
  }
)

export const editOrder = createAsyncThunk<
  WorkOrder,
  { id: string; patch: Partial<WorkOrderInput> },
  { rejectValue: string }
>(
  'orders/edit',
  async ({ id, patch }, { rejectWithValue }) => {
    try {
      return await updateOrder(id, patch)
    } catch (err) {
      const msg = extractMessage(err, 'Failed to update order')
      return rejectWithValue(msg)
    }
  }
)

export const removeOrder = createAsyncThunk<string, string, { rejectValue: string }>(
  'orders/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteOrder(id)
      return id
    } catch (err) {
      const msg = extractMessage(err, 'Failed to delete order')
      return rejectWithValue(msg)
    }
  }
)

export const reorderOrdersThunk = createAsyncThunk<
  string[],
  string[],
  { rejectValue: string }
>(
  'orders/reorder',
  async (orderedIds, { rejectWithValue }) => {
    try {
      await reorderOrders(orderedIds)
      return orderedIds
    } catch (err) {
      const msg = extractMessage(err, 'Failed to reorder orders')
      return rejectWithValue(msg)
    }
  }
)

// ── Slice ─────────────────────────────────────────────────────────────────────

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersError: state => {
      state.error = null
    },
    /** Optimistic reorder for drag-and-drop */
    optimisticReorder: (state, action: PayloadAction<string[]>) => {
      const orderedIds = action.payload
      const orderMap = new Map(state.items.map(o => [o.id, o]))
      orderedIds.forEach((id, idx) => {
        const order = orderMap.get(id)
        if (order) order.sort_order = idx + 1
      })
    },
  },
  extraReducers: builder => {
    // fetchOrders
    builder.addCase(fetchOrders.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload ?? 'Failed to load orders'
    })

    // addOrder
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.items.push(action.payload)
    })
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to create order'
    })

    // editOrder
    builder.addCase(editOrder.fulfilled, (state, action) => {
      const idx = state.items.findIndex(o => o.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    })
    builder.addCase(editOrder.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to update order'
    })

    // removeOrder
    builder.addCase(removeOrder.fulfilled, (state, action) => {
      state.items = state.items.filter(o => o.id !== action.payload)
    })
    builder.addCase(removeOrder.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to delete order'
    })

    // reorderOrders — handled optimistically; no slice update needed on success
    builder.addCase(reorderOrdersThunk.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to reorder orders'
    })
  },
})

export const { clearOrdersError, optimisticReorder } = ordersSlice.actions
export default ordersSlice.reducer
