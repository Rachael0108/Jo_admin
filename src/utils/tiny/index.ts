import fs from 'fs';
import {resolve} from 'path';
import { imageType } from './interface';
const cluster = require('cluster');

interface IdeepFindimg {
    (path: string): Array<imageType>
}
let deepFindImg: IdeepFindimg

deepFindImg = (path: string) => {
    const content = fs.readdirSync(path)
    let images: Array<imageType> = []
    content.forEach(folder => {
        const filePath = resolve(path, folder)
        const info = fs.statSync(filePath)
        //是否为目录
        if(info.isDirectory()) {
            images = [...images, ...deepFindImg(filePath)]
        }else {
            const fileNameReg = /\.(jpg?.|png|svga)$/
            const shouldFormat = fileNameReg.test(filePath)
            if(shouldFormat) {
                const imgData = fs.readFileSync(filePath)
                images.push({
                    path: filePath,
                    file: imgData
                })
            }
        }
    })
    return images
}

//遍历文件夹
interface IdeepFindFolder{
    (path: string, target: string): Array<string>
}

let deepFindFolder: IdeepFindFolder
deepFindFolder = (path: string,target: string) => {
    let targetFolders: Array<string> = []
    const ignorePath = ['node_modules', 'dist','.git']  //忽略文件
    fs.readdirSync(path).forEach((fold:string) => {
        const filePath = resolve(path, fold)
        const info = fs.statSync(filePath)
        if(info.isDirectory() && ignorePath.indexOf(fold) === -1) {
            if(fold === target) {
                targetFolders.push(filePath)
            }else {
                targetFolders.push(...targetFolders, ...deepFindFolder(filePath,target))
            }
        }
    })
    return targetFolders
}
