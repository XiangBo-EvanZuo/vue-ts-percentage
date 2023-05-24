<script setup lang="ts">
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
import { vscode } from "./utilities/vscode";
import { computed, onMounted, ref } from "vue";
import Echats from './Echats.vue';
import Login from './login.vue';
import type { IWorkSpaceOptions } from './type';

// In order to use the Webview UI Toolkit web components they
// must be registered with the browser (i.e. webview) using the
// syntax below.
provideVSCodeDesignSystem().register(vsCodeButton());

// To register more toolkit components, simply import the component
// registration function and call it from within the register
// function, like so:
//
// provideVSCodeDesignSystem().register(
//   vsCodeButton(),
//   vsCodeCheckbox()
// );
//
// Finally, if you would like to register all of the toolkit
// components at once, there's a handy convenience function:
//
// provideVSCodeDesignSystem().register(allComponents.register());

function handleHowdyClick() {
  vscode.postMessage({
    command: "hello",
    text: "Hey there partner! 🤠",
  });
}

const projectList = ref<IWorkSpaceOptions[]>([]);
const data = ref(0);
const currentProjectIndex = ref(0);
const currentProject = computed(() => projectList.value[currentProjectIndex.value]);
const changeProject = () => {
  vscode.postMessage({
    command: "GetProjectFileList",
    id: currentProject.value.id,
    token: localStorage.getItem("token"),
  });
}
const logined = ref(false);
const token = ref('');

onMounted(() => {
  data.value = 10;
  window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    data.value = 20;
    console.log({message})
    switch (message.command) {
      case 'refactor':
        data.value = 200;
      case 'Logined':
        localStorage.setItem('token', message.data.data.res.token);
        localStorage.setItem('refreshToken', message.data.data.res.refreshToken);
        token.value = message.data.data.res.token;
      case 'ProjectList':
          projectList.value = message.data;
    }
  });
})

</script>

<template>
  <main>
    <el-select v-if="logined" v-model="currentProjectIndex" @change="changeProject" class="m-2" placeholder="Select" size="small">
      <el-option
        v-for="(item, index) in projectList"
        :key="index"
        :label="item.projectName"
        :value="index"
      />
    </el-select>
    <Echats :token="token" v-if="logined"/>
    <Login v-show="!logined" v-model="logined"/>
    <vscode-button @click="handleHowdyClick">Howdy!</vscode-button>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

main > * {
  margin: 1rem 0;
}
</style>
