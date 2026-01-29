import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';  // 'system' = segue o tema do dispositivo

interface ThemeState {
  mode: ThemeMode;
  // Opcional: se quiser persistir preferência do usuário separada do system
  userPreference: 'light' | 'dark' | null;  
}

const initialState: ThemeState = {
  mode: 'system',             // Começa seguindo o sistema (mais natural)
  userPreference: null,       // null = usa system até o usuário escolher
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Alterna entre light ↔ dark (ignora 'system')
    toggleTheme: (state) => {
      if (state.mode === 'system') {
        state.mode = 'light';
        state.userPreference = 'light';
      } else {
        const nextMode = state.mode === 'light' ? 'dark' : 'light';
        state.mode = nextMode;
        state.userPreference = nextMode;
      }
    },

    // Define explicitamente (útil para settings ou carregar do storage)
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.userPreference = action.payload === 'system' ? null : action.payload;
    },

    // Carrega preferência salva (ex: do AsyncStorage)
    loadSavedPreference: (state, action: PayloadAction<'light' | 'dark' | null>) => {
      if (action.payload) {
        state.userPreference = action.payload;
        state.mode = action.payload;
      } else {
        state.mode = 'system';
        state.userPreference = null;
      }
    },
  },
});

export const { toggleTheme, setThemeMode, loadSavedPreference } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;