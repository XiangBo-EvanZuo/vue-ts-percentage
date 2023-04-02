import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export const getFileList = () => {
    const targetFilesMap: string[] = []; // 存放找到的目标文件所在路径
    const traversePath = (entryPath: string) => {
        const dirArr = fs.readdirSync(entryPath);
        console.log({ dirArr });
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
    let path1 = '';
    const fod = vscode.workspace.workspaceFolders;
    if (fod?.length) {
        path1 = fod[0].uri.fsPath;
    }
    traversePath(path.join(path1, '/src'));
    return targetFilesMap;
};