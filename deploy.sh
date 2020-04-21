#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist
cp ../../../googleedb328f4c24ec87b.html ./

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add *
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:SmacUL/SmacUL.github.io.git master
# git push -f git@gitee.com:smacul/SmacUL.git master

cd ../../../
git add *
git commit -m 'code'
git push -f origin code

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:SmacUL/SmacUL.github.io.git master:gh-pages

cd -