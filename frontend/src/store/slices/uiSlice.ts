'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/lib/i18n/translations';

interface UIState {
  isSidebarOpen: boolean;
  language: Locale;
}

const initialState: UIState = {
  isSidebarOpen: true,
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Locale>) => {
      state.language = action.payload;
    }
  },
});

export const { toggleSidebar, setSidebarOpen, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
