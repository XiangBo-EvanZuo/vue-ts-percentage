import { commands, ExtensionContext, window, SnippetString, WebviewPanel } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";
import { getCurrentDayData } from './utilities/file';

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("hello-world.showHelloWorld", () => {
    HelloWorldPanel.render(context.extensionUri);
  });

  const fileCommand = commands.registerCommand('VueTsPercentage.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    window.showInformationMessage('Hello World from VueTsPercentage!');
    let editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    let snippet: SnippetString = new SnippetString('12');
    // 查找当前项目src/components下所有目标文件
    editor.insertSnippet(snippet);
  });

  const data = commands.registerCommand('catCoding.doRefactor', () => {
    const currentPanel = HelloWorldPanel.currentPanel;
    if (!currentPanel) {
      window.showInformationMessage('not has!');
      return;
    }
    window.showInformationMessage('has!');
    window.showInformationMessage('has2!');

    // Send a message to our webview.
    // You can send any JSON serializable data.
    currentPanel._panel.webview.postMessage({ command: 'refactor' });
    window.showInformationMessage('postMessage!');

  });
  const changeEchart = commands.registerCommand('changeEchart.changeEchart', () => {
    const currentPanel = HelloWorldPanel.currentPanel!;
    currentPanel._panel.webview.postMessage({ command: 'changeEchart' });
  });
  // Add command to the extension context
  context.subscriptions.push(fileCommand);
  context.subscriptions.push(showHelloWorldCommand);
  context.subscriptions.push(data);
  context.subscriptions.push(changeEchart);
}
