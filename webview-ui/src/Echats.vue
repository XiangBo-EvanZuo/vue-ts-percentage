<template>
    <div>
        <el-date-picker
            v-model="picker"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="Pick a day"
            :size="size"
        />
        <vscode-button @click="pickerChange">showTsAnalyze!</vscode-button>
        <div style="display: flex; width: 100vw;">
            <v-chart class="chart" :option="pieOption" />
            <v-chart @highlight="lineClick" class="chart" :option="option" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart } from "echarts/charts";
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
import { formatEchartsData, type DataList, type ResultDataList, type I } from "./utilities/echarts";
import { dayjs } from "element-plus";
import { vscode } from "./utilities/vscode";

import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeButton());

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
    DataZoomSliderComponent,
    PieChart,
]);

const size = ref<'default' | 'large' | 'small'>('default')
const picker = ref(dayjs().format('YYYY-MM-DD'));

interface TEvent {
    batch: Array<{
        dataIndex: number
    }>
}
const lineClick = (e: TEvent) => {
    const index = e.batch[0].dataIndex
    const data = resultData.value[index].list
    getPieOptionData(data)
}

const pickerChange = () => {
    vscode.postMessage({
        command: "TsAnalyze",
        text: "Hey there partner! 🤠",
        date: picker.value,
    });
}

// pickerChange();


const getPieOptionData = (dataList: DataList) => {
    const vueOptions = dataList.find(item => item.fileType === 'vue')!;
    if (vueOptions) {
        const data =  [
            {
                name: 'js-vue',
                value: Math.round(((vueOptions.number - vueOptions.length!) / vueOptions.number) * 100),
            },
            {
                name: 'ts-vue',
                value: Math.round((vueOptions.length! / vueOptions.number) * 100),
            },
        ];
        pieOption.value.series[0].data = data as {value: number, name: string}[];
    }
}
const resultData = ref<ResultDataList[]>([]);
// const formatSeriesList = (seriesList: I[]) => {
//     seriesList.forEach(item => {
//         const summary = item.data.reduce((acc, cur) => cur + acc, 0);
//         console.log({summary})
//         item.data = item.data.map(each => ((each / summary) * 100))
//     })
// }

provide(THEME_KEY, "dark");

const pieOption = ref({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ]
        }
    ]
})
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
const setLineData = (currentData: ResultDataList[], setLocalStorage: boolean = true) => {
    let result;
    // 从localstorage获取历史
    const list: ResultDataList[] = JSON.parse(localStorage.getItem('list') || '[]');
    const hasCurrentDayDataIndex = list.findIndex(item => item.date === currentData[0]?.date)
    if (hasCurrentDayDataIndex !== -1) {
        list.splice(hasCurrentDayDataIndex, 1, currentData[0])
        result = list;
    } else {
        result = list.concat(currentData) 
    }
    result = result.sort((before, aftter) => before.date > aftter.date ? 1 : -1)
    // 合成list
    // show list
    // 保存localstorage
    const showResult: ResultDataList[]  = JSON.parse(JSON.stringify(result));
    showResult.forEach(item => {
        const summary = item.list.reduce((acc, cur) => acc + cur.number, 0);
        item.list.forEach(each => {
            each.number = Math.round((each.number / summary) * 100)
        })
    })
    const { seriesList, legendList } = formatEchartsData(showResult)
    option.value.xAxis.data = legendList;
    option.value.series = seriesList;
    option.value.legend.data = seriesList.map(item => item.name)
    const data = result[0].list
    getPieOptionData(data)
    resultData.value = result
    if (setLocalStorage) {
        localStorage.setItem('list', JSON.stringify(result))
    }
}
onMounted(() => {
    // window.addEventListener('message', event => {
    //     const message = event.data; // The JSON data our extension sent
    //     switch (message.command) {
    //         case 'changeEchart':
    //             option.value.series[0].data = [12, 132, 101, 134, 90, 230, 2100];
    //     }
    // });

    window.addEventListener('message', event => {
        const message = event.data; // The JSON data our extension sent
        switch (message.command) {
            case 'TsAnalyze':
                const currentData: ResultDataList[] = message.data;
                setLineData(currentData);
        }
    });
    setLineData([], false);
})
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>