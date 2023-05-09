import Ressource from "@/interfaces/ressourceInterface";
import axios from "axios";
import useAuthStore from "@/stores/authStore";

const ressourceService = {
  async getRessources(): Promise<Ressource[]> {
    try {
      const results = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/ressources?_sort=date&_order=desc`,
      );
      return results.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getRessourceById(id: string): Promise<Ressource | false> {
    try {
      const results = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/ressources/${id}`,
      );
      return results.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async deleteRessource(ressource: Ressource): Promise<boolean> {
    const authStore = useAuthStore();

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_API_PROTECTED}/ressources/${
          ressource.id
        }`,
        authStore.headers,
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async addRessource(ressource: Ressource): Promise<Ressource | false> {
    try {
      const results = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/ressources/`,
        ressource,
      );
      return results.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async updateRessource(ressource: Ressource): Promise<Ressource | false> {
    const authStore = useAuthStore();

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_SERVER_API_PROTECTED}/ressources/${
          ressource.id
        }`,
        ressource,
        authStore.headers,
      );
      return result.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default ressourceService;
