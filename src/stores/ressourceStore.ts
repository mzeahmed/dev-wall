import { defineStore } from "pinia";
import Ressource from "@/interfaces/ressourceInterface";
import ressourceService from "@/services/ressourceService";

const useRessourceStore = defineStore("RessourceStore", {
  state: () => ({ ressources: [] as Ressource[] }),
  getters: {
    invalidRessources: (state) =>
      state.ressources.filter((ressource) => !ressource.isValid),
    validRessources: (state) =>
      state.ressources.filter((ressource) => ressource.isValid),
  },
  actions: {
    async loadRessources() {
      this.ressources = await ressourceService.getRessources();
    },

    async addRessource(ressource: Ressource): Promise<Ressource | false> {
      const newRessource = await ressourceService.addRessource(ressource);
      if (newRessource) {
        // la fonction push ajoute un élément à la fin du tableau
        // this.ressources.push(newRessource);

        // la fonction unshift ajoute un élément au début du tableau
        this.ressources.unshift(newRessource);
        return newRessource;
      } else {
        return false;
      }
    },

    async deleteRessource(ressourceToDelete: Ressource) {
      const result = await ressourceService.deleteRessource(ressourceToDelete);

      if (result) {
        this.ressources = this.ressources.filter(
          (ressource) => ressource.id !== ressourceToDelete.id,
        );
      }
    },

    async updateRessource(ressource: Ressource): Promise<Ressource | false> {
      const updatedRessource = await ressourceService.updateRessource(ressource);

      if (updatedRessource) {
        const index = this.ressources.findIndex(
          (item) => item.id === ressource.id,
        );

        if (index !== -1) {
          this.ressources[index] = updatedRessource;
        }

        return updatedRessource;
      } else {
        return false;
      }
    },
  },
});

export default useRessourceStore;
