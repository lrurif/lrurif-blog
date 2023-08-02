# 记录一次git瘦身
## Git 仓库瘦身
### 瘦身背景：有一个git项目，主要是用于打包后，拿来存放打包后的内容（非服务器打包），在过了一段时间后，此项目变得非常大，导致部署超时。
## 目的：清空此仓库
两种方法：
1. 通过删除git项目，然后重新建来实现。
2. 清空大文件的记录来实现
## 瘦身流程
1. 首先将此项目重新拉下来，切到一个最初始的分支，比如`master`分支。
2. 如果需要查看历史提交过的体积较大的前 5 个文件名与对应的 Object 文件的 ID 的话，可以执行下面的命令。
```zsh
git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -5 | awk '{print$1}')"
```
3. 接下来执行删除命令用来删除提交历史中路径含有./dist下的文件。（如果希望清除某个大文件的提交记录，也可以将`./dist`替换成一个文件名，)
```zsh
git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch ./dist' --prune-empty --tag-name-filter cat -- --all
```
4. 使用 reflog 和 gc 压缩（清理和回收大文件占用的 objects 空间）
```zsh
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```
5. 最后将本次修改推送到远程，此命令用于将一个仓库的所有内容推送到远端，如果远端没有本地的分支，则会删除此分支，相当于将本地仓库重新备份到远端。
```zsh
git push --mirror
```

## 参考
[Git 仓库瘦身与 LFS 大文件存储](https://shansan.top/2021/12/26/git-lfs-and-thin-repo/)