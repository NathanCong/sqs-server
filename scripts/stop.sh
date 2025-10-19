#!/bin/bash

# 停止 Clash 服务（清理本地构建镜像）
sudo docker compose down --rmi local
