import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  bears: number;
  increasePopulation: () => void;
  decreasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const storeApi: StateCreator<State> = (set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
});

const useBearStore = create<State>()(
  persist(storeApi, { name: "bear-store", skipHydration: true })
);

export default useBearStore;
