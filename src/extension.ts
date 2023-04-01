// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');

const getFileList = () => {
	const targetFilesMap:string[] = []; // 存放找到的目标文件所在路径
	const traversePath = (entryPath: string) => {
		const dirArr = fs.readdirSync(entryPath);
		console.log({dirArr});
		dirArr.forEach((item: string) => {
			const itemPath = path.join(entryPath, item);
			const fileStat = fs.statSync(itemPath);
	
			if (fileStat.isDirectory()) { // 当前项是文件夹
				traversePath(itemPath); // 以当前文件夹作为入口目录继续遍历
			}
			if (fileStat.isFile()) { // 当前项是目标类型文件
				targetFilesMap.push(itemPath);
			}
		});
	};
	let path1;
	const fod = vscode.workspace.workspaceFolders;
	if (fod?.length) {
		path1 = fod[0].uri.fsPath;
	}
	traversePath(path.join(path1, '/src'));
	return targetFilesMap;
};

const isTsxFile = (filePath: string) => {
	return ['.tsx'].includes(path.extname(filePath));
};

const cats = {
	'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vuetspercentage" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vuetspercentage2.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from VueTsPercentage2222!');
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		let snippet: vscode.SnippetString = new vscode.SnippetString(getFileList().join('\n'));
		// 查找当前项目src/components下所有目标文件
		editor.insertSnippet(snippet);
	});

	const demo2 = vscode.commands.registerCommand('catCoding.start', () => {
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		);

		let iteration = 0;
		const updateWebview = () => {
			const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
			panel.title = cat;
			panel.webview.html = getWebviewContent(cat);
		};

		// Set initial content
		updateWebview();

		// And schedule updates to the content every second
		setInterval(updateWebview, 1000);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(demo2);
}

function getWebviewContent(cat: keyof typeof cats) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="${cats[cat]}" width="300" />
</body>
</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
