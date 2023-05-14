<script setup lang="ts">
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
import { vscode } from "./utilities/vscode";
import { onMounted, ref } from "vue";
import Echats from './Echats.vue';
import Login from './login.vue';

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
const workSpace = ref('');
const data = ref(0);
const showTsAnalyze = ref(false);
const dataList = ref([]);
onMounted(() => {
  data.value = 10;
  window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    data.value = 20;
    console.log({message})
    switch (message.command) {
      case 'refactor':
        data.value = 200;
      case 'TsAnalyze':
        showTsAnalyze.value = true;
        dataList.value = message.data;
        workSpace.value = message.workSpace;
    }
  });
})

</script>

<template>
  <main>
    <h1>{{ workSpace }}</h1>
    <div v-if="showTsAnalyze">showTsAnalyze</div>
    <Echats></Echats>
    <Login/>
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
