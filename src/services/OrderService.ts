import { APIResponse, PaginatedResponse } from '@/types/api';
import { OrderData, OrderUpdateParam } from '@/types/orders'
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class OrderService extends Service<OrderData, OrderUpdateParam>{
  url = "/admin/orders";
  constructor(url?: string) {
      super(url);
  }

  async search(findOptions = "") {
    return API.get(`/orders/filter?${findOptions}`)
      .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<OrderData>>>) => {
          return data.data;
      }).catch((error) => {
          console.log(error.message, error)
      })
  }
}