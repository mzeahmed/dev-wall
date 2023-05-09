import useRessourceStore from "@/stores/ressourceStore";
import Ressource from "@/interfaces/ressourceInterface";

const useAdmin = () => {
  const ressourceStore = useRessourceStore();

  const deleteRessourceAction = (ressource: Ressource) => {
    ressourceStore.deleteRessource(ressource);
  };

  const validateRessourceAction = (ressource: Ressource) => {
    const validRessource = ressource;
    validRessource.isValid = true;
    ressourceStore.updateRessource(validRessource);
  };

  return { ressourceStore, deleteRessourceAction, validateRessourceAction };
};

export default useAdmin;
