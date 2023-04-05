<template>
    <v-chart class="chart" :option="option" />
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
GridComponent,
ToolboxComponent,
DataZoomComponent,
DataZoomInsideComponent,
DataZoomSliderComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted } from "vue";
import { formatEchartsData } from "./utilities/echarts";

use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    LineChart,
    GridComponent,
    ToolboxComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent
]);

onMounted(() => {
    window.addEventListener('message', event => {
        const message = event.data; // The JSON data our extension sent

        switch (message.command) {
            case 'TsAnalyze':
                const { seriesList, legendList } = formatEchartsData(message.data)
                option.value.xAxis.data = legendList;
                option.value.series = seriesList;
        }
    });
})

provide(THEME_KEY, "dark");

const option = ref({
    title: {
        text: '语言占比进度'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['JavaScript', 'TypeScript']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2022-03-16', '2022-04-16', '2022-05-16', '2022-06-16', '2022-07-16', '2022-08-16', '2022-09-16']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'TypeScript',
            type: 'line',
            data: [0, 10, 15, 20, 25, 30, 60],
        },
        {
            name: 'JavaScript',
            type: 'line',
            data: [100, 90, 85, 80, 75, 70, 40]
        },
    ],
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            start: 0,
            end: 100
        }
    ],
});

onMounted(() => {
    window.addEventListener('message', event => {
        const message = event.data; // The JSON data our extension sent
        switch (message.command) {
            case 'changeEchart':
                option.value.series[0].data = [12, 132, 101, 134, 90, 230, 2100];
        }
    });
})
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>