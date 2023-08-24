import { defineStore } from 'pinia'

let geoObj: object[] = [];

export const useGeoObjStore = defineStore('GEOOBJ', {
  state: () => {
    return { geoObj: geoObj };
  },
  getters: {

  },
  actions: {
    setGeoObj(geoObj0: object[]) {
      this.geoObj = geoObj0;
    }
  }
})
