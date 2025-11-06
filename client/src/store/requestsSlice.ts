import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RequestStatus = 'NEW' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface DamageRequest {
  id: string;
  serialNumber: string;
  facility: string;
  site: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
}

interface RequestsState {
  items: DamageRequest[];
}

const initialState: RequestsState = {
  items: []
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests(state: RequestsState, action: PayloadAction<DamageRequest[]>) {
      state.items = action.payload;
    }
  }
});

export const { setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
