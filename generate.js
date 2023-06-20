import { readdir, stat } from "fs/promises";
import path from "path";
const filePath = path.resolve("./docs");
let res = {};
const reg = /\.md$/;
async function readDirs(filePath, data) {
    const files = await readdir(filePath);
    for (let file of files) {
        const fileDir = path.join(filePath, file);
        let statRes = await stat(fileDir);
        if (statRes.isFile() && reg.test(file)) {
            data[file] = {
                name: file,
                path: fileDir,
                type: "file",
            };
        } else if (statRes.isDirectory()) {
            let children = {};
            data[file] = {
                name: file,
                path: fileDir,
                children,
                type: "dir",
            };
            readDirs(fileDir, children);
        }
    }
}

function hasChildren(data) {
    if (data?.children === undefined) return true;
    let keys = Object.keys(data.children);
    if (keys.length === 0) return false;
    let has = false;
    for (let key of keys) {
        has = has || hasChildren(data.children[key]);
    }
    return has;
}
function deleteNoDataDir(data) {
    let keys = Object.keys(data);
    for (let key of keys) {
        if (!hasChildren(data[key])) {
            delete data[key];
        }
    }
}
let arr = [];
function generatePath(data, path) {
    let keys = Object.keys(data);
    for (let key of keys) {
        let item = data[key];
        path.push(item.name);
        if (item.type === "file") {
            arr.push(path.join("/"));
        } else {
            generatePath(item.children, path);
        }
        path.pop();
    }
}

async function run() {
    await readDirs(filePath, res);
    setTimeout(() => {
        deleteNoDataDir(res);
        generatePath(res, []);
        console.log(arr);
    });
}
run();
