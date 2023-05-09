import User from "@/interfaces/userInterface";
import { defineStore } from "pinia";
import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

const useAuthStore = defineStore("AuthStore", {
  persist: true,
  state: () => ({ user: {} as User }),
  getters: {
    headers: (state) => {
      return {
        headers: {
          Authorization: `Bearer ${state.user.accessToken}`,
        },
      };
    },
  },
  actions: {
    async connect(credentials: Credentials): Promise<boolean> {
      try {
        const results = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/signin`,
          credentials,
        );

        this.user.email = results.data.user.email;
        this.user.accessToken = results.data.accessToken;

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export default useAuthStore;
