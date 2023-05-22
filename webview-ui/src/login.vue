<template lang="">
    <div>
        <el-form>
            <el-form-item label="username">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="password"></el-input>
            </el-form-item>
            <vscode-button @click="login">Login!</vscode-button>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { vscode } from "./utilities/vscode";
import { ElMessage } from 'element-plus';
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{
    modelValue: boolean;
}>()
const emits = defineEmits(['update:modelValue']);
const username = ref('');
const password = ref('');

const login = () => {
    // vscode.postMessage({
    //     command: "AxiosLogin",
    //     data: {
    //         demo: 1,
    //     }
    // });
    // Logined
    vscode.postMessage({
        command: "Logined",
        data: {
            username: username.value,
            password: password.value,
        }
    });
}
onMounted(() => {
    window.addEventListener('message', event => {
        const message = event.data; // The JSON data our extension sent
        switch (message.command) {
            case 'Logined':
                emits('update:modelValue', true);
                ElMessage({
                    type: 'success',
                    message: '登录成功',
                });
            case 'LoginedFailed':
                console.log(message)
                if (message.command === 'LoginedFailed') {
                        ElMessage({
                            type: 'error',
                            message: message.data.message,
                        });
                }
        }
    });
})
</script>
<style lang="less">
    
</style>