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
        <div v-html="ssrContent"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { vscode } from "./utilities/vscode";
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{
    modelValue: boolean;
}>()
const emits = defineEmits(['update:modelValue']);
const username = ref('');
const password = ref('');

const ssrContent = ref('');
const login = () => {
    vscode.postMessage({
        command: "AxiosLogin",
        data: {
            demo: 1,
        }
    });
    window.addEventListener('message', event => {
        const message = event.data; // The JSON data our extension sent
        switch (message.command) {
            case 'AxiosLogin':
                console.log({message})
                ssrContent.value = message.data.data;
        }
    });
    emits('update:modelValue', true);
    // Logined
    vscode.postMessage({
        command: "Logined",
        data: {
            username: 'demo',
        }
    });
}
</script>
<style lang="less">
    
</style>