import { http } from "./config";
import storageService from "./storage";
export default {
  buscarDadosTabela: () => {
    return http.get(
      `despesas/dashboard/limite-despesas/${storageService.getStorage("value")}`
    );
  },
};
