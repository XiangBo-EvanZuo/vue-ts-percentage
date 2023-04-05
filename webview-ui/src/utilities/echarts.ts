import { ref
 } from "vue";
interface I {
    name: string;
    type: string;
    data: any[];
}
interface DataList {
    date: string;
    list: Array<{
        fileType: string;
        list: never[];
        number: number;
        length?: undefined;
    }>
}

export const formatEchartsData = (dataList: DataList[]) => {
    const legendList: string[] = []
    const seriesList = ref<I[]>([])
    dataList.forEach(item => {
        legendList.push(item.date);
        item.list.forEach(each => {
            const findRes = seriesList.value.find(item => {
                return item.name === each.fileType;
            });
            if (findRes) {
                findRes.data.push(each.number)
            } else {
                seriesList.value.push({
                    name: each.fileType,
                    type: 'line',
                    data: [each.number],
                });
            }

        })
    })
    return {
        legendList,
        seriesList: seriesList.value,
    }
}
