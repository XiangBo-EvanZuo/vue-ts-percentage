import { commands, ExtensionContext, window, SnippetString } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";
import { getFileList } from './utilities/file';

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("hello-world.showHelloWorld", () => {
    HelloWorldPanel.render(context.extensionUri);
  });

  const fileCommand = commands.registerCommand('vuetspercentage2.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    window.showInformationMessage('Hello World from VueTsPercentage2222!');
    let editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    let snippet: SnippetString = new SnippetString(getFileList().join('\n'));
    // 查找当前项目src/components下所有目标文件
    editor.insertSnippet(snippet);
  });

  // Add command to the extension context
  context.subscriptions.push(fileCommand);
  context.subscriptions.push(showHelloWorldCommand);
}
