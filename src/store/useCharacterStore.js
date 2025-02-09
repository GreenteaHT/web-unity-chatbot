import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { initialCharactersData } from "./initialCharactersData";

export const useCharacterStore = create(
  persist(
    (set) => ({
      characters: initialCharactersData,

      addCharacter: (key, newCharacter) =>
        set((state) => {
          if (state.characters[key]) {
            console.warn(`Character with key "${key}" already exists!`);
            return state;
          }
          return {
            characters: {
              ...state.characters,
              [key]: newCharacter,
            },
          };
        }),

      updateCharacter: (key, updatedFields) =>
        set((state) => {
          if (!state.characters[key]) {
            console.warn(`Character with key "${key}" not found!`);
            return state;
          }
          return {
            characters: {
              ...state.characters,
              [key]: {
                ...state.characters[key],
                ...updatedFields,
              },
            },
          };
        }),

      removeCharacter: (key) =>
        set((state) => {
          if (!state.characters[key]) {
            console.warn(`Character with key "${key}" not found!`);
            return state;
          }
          const newCharacters = { ...state.characters };
          delete newCharacters[key];
          return { characters: newCharacters };
        }),

      resetCharacters: () => set(() => ({ characters: initialCharactersData })),
    }),
    {
      name: "my-characters",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCharacterStore;
