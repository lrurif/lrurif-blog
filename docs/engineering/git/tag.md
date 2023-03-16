# Git中Tag的使用

## 创建tag并提交
```
git add .
git commit -m "feat: 提交"
git tag <tag> HEAD // 给最近一次提交打tag，也可以替换成其他commit
git push && git push --tags
```