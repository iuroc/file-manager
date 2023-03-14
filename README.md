# File-Manager

> 基于 Node.js 和 SQLite 的文件系统

## 项目信息

- 项目地址：https://github.com/oyps/file-manager
- 开发日期：2023 年 3 月 12 日
- 作者：欧阳鹏
- 主页：https://apee.top

## 启动

```bash
npm run start
```

## Docker 部署

```bash
git clone https://github.com/oyps/file-manager.git
project_name=file-manager
docker build -t $project_name $project_name
docker run --name $project_name -p 8000:8000 $project_name
```