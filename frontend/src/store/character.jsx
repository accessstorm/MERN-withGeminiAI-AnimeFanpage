import { create } from "zustand";

export const useCharacterStore = create((set) => ({
    character: [],
    setCharacter: (character) => set({ character }),
    // In character.jsx
    createCharacter: async (newCharacter) => {
        if (!newCharacter.name || !newCharacter.power || !newCharacter.image) {
            return { success: false, message: "Please fill in all fields" };
        }
        const res = await fetch("/api/aot", {  // CORRECT ENDPOINT IS HERE
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCharacter),
        })
        const data = await res.json();
        set((state) => ({ character: [...state.character, data.data] }));
        return { success: true, message: "Character created successfully" };
    },
    fetchCharacters: async () => {
        const res = await fetch("/api/aot");
        const data = await res.json();
        set({ character: data.data });
    },
    deleteCharacter: async (pid) => {
        const res = await fetch(`/api/aot/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }
        set((state) => ({ character: state.character.filter((character) => character.pid !== pid) }));
        return { success: true, message: data.message };
    },
    updateCharacter: async (pid, updatedCharacter) => {

        const res = await fetch(`/api/aot/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCharacter),
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }
        set((state) => ({ character: state.character.map((character) => (character.pid === pid ? data.data : character)) }));
        return { success: true, message: data.message };
    },
}));
