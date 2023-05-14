import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export const getFileList = () => {
    const targetFilesMap: string[] = []; // 存放找到的目标文件所在路径
    const traversePath = (entryPath: string) => {
        const dirArr = fs.readdirSync(entryPath);
        // console.log({ dirArr });
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
        console.log({name: fod[0].name});
        path1 = fod[0].uri.fsPath;
    }
    // console.log({path1});
    traversePath(path.join(path1, '/src'));
    return targetFilesMap;
};

interface FileType {
    fileType?: string,
    list: string[];
    length?: number;
    number: number;
}

const fileTypeMap: Record<string, string> = {
    ts: 'TypeScript',
    js: 'JavaScript',
};

const getFileType = (type: string) => {
    return fileTypeMap[type] || type || 'none';
};

const whiteList = ['vue'];

export const getVueFileList = () => {
    const fileList = getFileList();
    const myList: FileType[] = [];
    fileList.forEach(cur => {
        const fileType = cur.split('.').pop() || '';
        const hasType = myList.find(item => item.fileType === getFileType(fileType));
        if (hasType) {
            if (whiteList.includes(hasType.fileType!)) {
                hasType.list.push(cur);
            } else {
                hasType.number += 1;
            }
        } else {
            myList.push(
                {
                    fileType: getFileType(fileType),
                    list: whiteList.includes(fileType) ? [cur] : [],
                    number: whiteList.includes(fileType) ? 0 : 1,
                }
            );            
        }
    });
    return myList;
};

export const getFileContent = () => {
    const list = getVueFileList();
    console.log({list});
    list.forEach(item => {
        if (whiteList.includes(item.fileType!)) {
            if (item.list.length) {
                item.list.forEach(each => {
                    const data = fs.readFileSync(each, 'utf8');
                    if (data.includes('lang="ts"') || data.includes("lang='ts")) {
                        if (!item.length) {
                            item.length = 0;
                        }
                        item.length += 1;
                    }
                });
            }
            item.number = item.list.length;
            item.list = [];
        }
    });
    return list;
};

export const getCurrentDayData = (date: string) => {
    return [{
        date,
        list: getFileContent(),
    }];
};