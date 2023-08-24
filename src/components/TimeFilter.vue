<template>
    <div id="timeFilter">
        <h3>日期：
            <select v-model="yearFilter">
                <option v-for="item in yearList">{{ item }}</option>
            </select>
            年
            <select v-model="monthFilter">
                <option v-for="item in monthList">{{ item }}</option>
            </select>
            月
            <button @click="ObjectFliteredByTime">筛选</button>
        </h3>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useGeoObjStore } from '../stores/geoObj'
// import axios from 'axios';

//获取时间过滤条件
const yearList: number[] = Array.from({ length: 14 }, (item, idx) => idx + 2010);
const monthList: number[] = Array.from({ length: 12 }, (item, idx) => idx + 1);
const yearFilter = ref();
const monthFilter = ref();

// const geoObj = await axios.get("./GeoObjects.json").then((res: any) => {
//     return res.data;
// });

const geoObjStr: str = `{
    "geo_objects":[
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":3,"10":8,"11":9,"12":13,"13":12,"14":13},"spatial":{"geohash":"u3bwhu","lng":12.166389726264953,"lat":55.92250049601648},"property":{"12324":"1234","4134234":"2432424"}},
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":3,"10":8,"11":19,"12":8,"13":14,"14":59},"spatial":{"geohash":"u3bt7y","lng":12.123697850467465,"lat":55.800960302128885},"property":{"3241":"45432","12324":"1234","12412":"12421","34213":"324313","4134234":"2432424"}},
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":3,"10":8,"11":27,"12":9,"13":0,"14":0},"spatial":{"geohash":"u3b7xt","lng":11.931499063848037,"lat":55.48796950964285},"property":{"1324":"235","3241":"45432","4235":"235","12324":"1234","12412":"12421","34213":"324313","4134234":"2432424","23525525":"5235235"}},
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":3,"10":7,"11":14,"12":0,"13":0,"14":0},"spatial":{"geohash":"u3cmn6","lng":13.285127661040434,"lat":55.7345430150136},"property":{"564":"64554","1324":"235","3241":"45432","3252":"32525","4235":"235","12324":"1234","12412":"12421","34213":"324313","543534":"654","4134234":"2432424","23525525":"5235235"}},
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":3,"10":2,"11":11,"12":12,"13":11,"14":7},"spatial":{"geohash":"u3cpq3","lng":12.939169845125235,"lat":56.12829189963543},"property":{"12324":"1234","12412":"12421"}},
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":2,"10":6,"11":18,"12":8,"13":0,"14":0},"spatial":{"geohash":"u3betq","lng":12.189594577308469,"lat":55.49419163809543},"property":{"23432":"234324","123213":"123213","234324":"23432","243242":"324324","23432434":"234324"}},
        {"time":{"0":9,"1":0,"2":0,"3":0,"4":0,"5":0,"6":2,"7":0,"8":2,"9":3,"10":1,"11":19,"12":8,"13":0,"14":0},"spatial":{"geohash":"u3burs","lng":12.644456581287557,"lat":55.61290389841153},"property":{"2213":"12312"}}
        
    ]
}`;

const geoObj: object = JSON.parse(geoObjStr);

const geoObjects: object[] = geoObj.geo_objects;
const timeList: Date[] = [];
const geoObjectsFilteredList: object[] = [];

function AbsoluteChronology2AD(timeObj: any): Date {
    let sum: number = 0;
    for (let i = 0; i < 10; i++) {
        let t = timeObj[i]
        sum = sum * 10 + t;
    }
    let year: number = sum - 9000000000;
    return new Date(year, timeObj[10] - 1, timeObj[11], timeObj[12], timeObj[13], timeObj[14], 0)
}

for (let i = 0; i < geoObjects.length; i++) {
    timeList.push(AbsoluteChronology2AD(geoObjects[i].time));
}

// function GeoHash2LngLat(geohash:string):number[]{
//     let list:number[] = [];
//     return list;
// }


function ObjectFliteredByTime() {
    geoObjectsFilteredList.splice(0);
    for (let i = 0; i < timeList.length; i++) {
        if (timeList[i].getFullYear() == yearFilter.value && timeList[i].getMonth() + 1 == monthFilter.value) {
            geoObjectsFilteredList.push(geoObjects[i])
        }
    }
    const geoObjStore = useGeoObjStore();
    geoObjStore.setGeoObj(geoObjectsFilteredList);
    // console.log(geoObjStore.geoObj[0].spatial)
}

</script>
<style>
#timeFilter {
    background-color: whitesmoke;
    border: 2px solid whitesmoke;
    padding: 0 20px;
    text-align: center;
    top: 35px;
    position: fixed;
    z-index: 100;
}
</style>