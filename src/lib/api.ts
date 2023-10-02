import axios, { type AxiosResponse } from "axios";

import type { Checkin, CheckinForm, Checkins } from "@/types/checkin";

const axi = axios.create({ baseURL: "/api" });

export const api = {
  checkins: {
    list(): Promise<AxiosResponse<Checkins>> {
      return axi.get("/checkins");
    },
    create(body: CheckinForm): Promise<AxiosResponse<Checkin>> {
      return axi.post("/checkins", body);
    },
    update(id: string, body: CheckinForm): Promise<AxiosResponse<Checkin>> {
      return axi.put(`/checkins/${id}`, body);
    },
    delete(id: string) {
      return axi.delete(`/checkins/${id}`);
    },
  },
};
