import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Interest {
  id: string;
  name: string;
}
interface LoginState {
  context: string;
  setContext: (name: string) => void;
  interests: Interest[];
  setInterests: (interests: Interest[]) => void;
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
      interests: [],
      setInterests: (interests) =>
        set((state) => ({
          ...state,
          interests: interests,
        })),
    }),
    { name: "contextStore" },
  ),
);

export default useStore;
