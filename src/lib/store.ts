import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  context: string;
  setContext: (name: string) => void;
}

const useStore = create<LoginState>()(
  persist(
    (set) => ({
      context: "",
      setContext: (name) =>
        set((state) => ({
          ...state,
          name,
        })),
    }),
    { name: "contextStore" },
  ),
);

export default useStore;
