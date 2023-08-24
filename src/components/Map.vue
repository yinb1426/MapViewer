<template>
  <body>
    <div id="container" ref="container"></div>
  </body>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import mapBoxGl, { Map } from "mapbox-gl";
import { useGeoObjStore } from '../stores/geoObj'
import "mapbox-gl/dist/mapbox-gl.css";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default defineComponent({
  setup() {
    const container = ref<HTMLDivElement>();
    let map: Map;
    const geoObjStore = useGeoObjStore();
    const markerList: mapBoxGl.Marker[] = [];
    //初始化地图
    const initMap = () => {
      map = new mapBoxGl.Map({
        container: container.value!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [12.550343, 55.665957],
        zoom: 8,
        antialias: true,
        accessToken:
          "pk.eyJ1Ijoiam9obm55dCIsImEiOiJja2xxNXplNjYwNnhzMm5uYTJtdHVlbTByIn0.f1GfZbFLWjiEayI6hb_Qvg",
      });
      
      // marker.setLngLat([geoObjStore.geoObj[0].spatial.lng,geoObjStore.geoObj[0].spatial.lat]).addTo(map)
      map.on("mousemove", (e: any) => {
        for (let i = 0; i < markerList.length; i++) {
          markerList[i].remove();
        }
        markerList.splice(0);
        for (let i = 0; i < geoObjStore.geoObj.length; i++) {
          const marker = new mapBoxGl.Marker();
          markerList.push(marker.setLngLat([geoObjStore.geoObj[i].spatial.lng, geoObjStore.geoObj[i].spatial.lat]));
        }
        for (let i = 0; i < markerList.length; i++) {
          markerList[i].addTo(map);
        }
      })
    };
    onMounted(async () => {
      initMap();
    });
    return { container };
  },
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>