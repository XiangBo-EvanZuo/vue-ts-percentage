import { ref } from "vue";
import type { ResultDataList } from "./echarts";

export const useGetFormatList = (result: ResultDataList[]) => {
    const showResult = JSON.parse(JSON.stringify(result)) as ResultDataList[]
    const allTypeList = ref<string[]>([]);
    const getFormatList = () => {
        showResult.forEach(item => {
            item.list.forEach(each => {
                if (!allTypeList.value.includes(each.fileType)) {
                    allTypeList.value.push(each.fileType);
                }
            })
        })
        showResult.forEach(item => {
            allTypeList.value.forEach(each => {
                const res = item.list.find(ele => ele.fileType === each);
                if (!res) {
                    item.list.push({
                        fileType: each,
                        number: 0,
                        list: [],
                    })
                }
            })
        })
        return showResult;
    }
    return {
        getFormatList,
    }
}