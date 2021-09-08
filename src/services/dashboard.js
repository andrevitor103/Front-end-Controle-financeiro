import { http } from "./config.js";
import storageService from "./storage.js";
export default {
  list: () => {
    return http.get(
      `despesas/dashboard/limite-despesas/${storageService.getStorage("value")}`
    );
  },
  filter: (filter, id = storageService.getStorage("value")) => {
    let camposData = [
      "data_vencimento",
      "data_vencimento_ate",
      "data_pagamento",
      "data_pagamento_ate",
    ];
    camposData.forEach((item) => {
      if (filter[item]) {
        let data = filter[item];
        if (data instanceof Date) {
          filter[item] = `${data.getFullYear()}-${data.getMonth() +
            1}-${data.getDate()}`;
        }
      }
    });
    return http.post(`dashboard/filter/${id}`, {
      fornecedor: [filter.fornecedor.toString()],
      forma_pagamento: [filter.forma_pagamento.toString()],
      categoria: [filter.categoria.toString()],
      data_vencimento: [filter.data_vencimento],
      data_vencimento_ate: [filter.data_vencimento_ate],
      data_pagamento: [filter.data_pagamento],
      data_pagamento_ate: [filter.data_pagamento_ate],
      status: [filter.status],
    });
  },
  filterLine: (filter, id = storageService.getStorage("value")) => {
    let camposData = [
      "data_vencimento",
      "data_vencimento_ate",
      "data_pagamento",
      "data_pagamento_ate",
    ];
    camposData.forEach((item) => {
      if (filter[item]) {
        let data = filter[item];
        if (data instanceof Date) {
          filter[
            item
          ] = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;
        }
      }
    });
    return http.post(`dashboard/filter-line/${id}`, {
      fornecedor: filter.fornecedor,
      forma_pagamento: filter.forma_pagamento,
      categoria: filter.categoria,
      data_vencimento: [filter.data_vencimento],
      data_vencimento_ate: [filter.data_vencimento_ate],
      data_pagamento: [filter.data_pagamento],
      data_pagamento_ate: [filter.data_pagamento_ate],
      status: [filter.status],
    });
  },
};
