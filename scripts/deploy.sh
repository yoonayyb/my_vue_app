#!/bin/bash
set -e  # 只要有一步出错，立刻停止脚本

# ===================== 配置项（只改这里）=====================
REMOTE_HOST="root@8.130.51.110"       # 服务器地址
REMOTE_PATH="/www/wwwroot/app"        # 宝塔里的目标目录
LOCAL_DIST="dist"                     # 本地打包后的目录（你确认是dist）
# ============================================================

# 1. 本地打包（确保打包成功）
echo -e "\033[32m🛠️  开始打包前端项目...\033[0m"
if ! npm run build; then
  echo -e "\033[31m❌ 打包失败！请检查代码后重试\033[0m"
  exit 1
fi

# 2. 检查本地 dist 目录是否存在
if [ ! -d "$LOCAL_DIST" ]; then
  echo -e "\033[31m❌ 本地打包目录 $LOCAL_DIST 不存在！\033[0m"
  exit 1
fi

# 3. 清空服务器目标目录（跳过 .user.ini，关键修复！）
echo -e "\033[32m📁 清空服务器旧文件（保留 .user.ini）...\033[0m"
ssh $REMOTE_HOST << EOF
  # 进入目标目录
  cd $REMOTE_PATH
  # 删除所有文件/文件夹，除了 .user.ini
  find . -mindepth 1 ! -name ".user.ini" -delete 
EOF

# 4. 上传新打包的文件到服务器
echo -e "\033[32m🚀 上传文件到服务器 $REMOTE_PATH ...\033[0m"
scp -r $LOCAL_DIST/* $REMOTE_HOST:$REMOTE_PATH/

# 5. 重载宝塔 Nginx（宝塔专用命令，不会错）
echo -e "\033[32m♻️  重载 Nginx 配置...\033[0m"
ssh $REMOTE_HOST "/etc/init.d/nginx reload"

# 6. 部署完成提示
echo -e "\033[32m✅ 部署成功！\033[0m"
echo -e "\033[33m👉 访问地址：http://8.130.51.110\033[0m"