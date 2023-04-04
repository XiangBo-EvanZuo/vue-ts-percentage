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

provide(THEME_KEY, "dark");

const option = ref({
    title: {
        text: '语言占比进度'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['JavaScript', 'TypeScript', 'Video Ads', 'Direct', 'Search Engine']
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
            // stack: 'Total',
            data: [0, 10, 15, 20, 25, 30, 60]
        },
        {
            name: 'JavaScript',
            type: 'line',
            // stack: 'Total',
            data: [100, 90, 85, 80, 75, 70, 40]
        },
        // {
        //     name: 'Video Ads',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [150, 232, 201, 154, 190, 330, 410]
        // },
        // {
        //     name: 'Direct',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [320, 332, 301, 334, 390, 330, 320]
        // },
        // {
        //     name: 'Search Engine',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [820, 932, 901, 934, 1290, 1330, 1320]
        // }
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