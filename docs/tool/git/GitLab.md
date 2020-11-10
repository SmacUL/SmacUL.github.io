# GitLab

GitLab 主要提供了项目持续集成 CI , 持续分发 CD , 持续部署 CD 的服务. 

## GitLab 添加阿里云 OSS 作为 LFS 存储盘

首先, 配置文件在 `/etc/gitlab/gitlab.rb` , 当然要结合自身的实际情况确定配置文件. 

这种方式是让阿里云 OSS 挂到 GitLab 自身的 Git LFS 子系统上, 需要
``` sh
gitlab_rails['lfs_enabled'] = true
gitlab_rails['lfs_storage_path'] = "/var/opt/gitlab/gitlab-rails/shared/lfs-objects"
gitlab_rails['lfs_object_store_enabled'] = true
gitlab_rails['lfs_object_store_direct_upload'] = true 
gitlab_rails['lfs_object_store_background_upload'] = false 
# 添加 bucket 存储桶的位置
gitlab_rails['lfs_object_store_proxy_download'] = true gitlab_rails['lfs_object_store_remote_directory'] = "****"
gitlab_rails['lfs_object_store_connection'] = {
  'provider' => 'AWS',
  # region host endpoint 在阿里云 OSS 的官方文档上都有, 此处以杭州为例
  # id 和 key 填什么心里要有 B 数
  'region' => 'oss-cn-hangzhou', 
  'aws_access_key_id' => '****', 
  'aws_secret_access_key' => '****', 
  'host' => 'oss-cn-hangzhou.aliyuncs.com', 
  'aws_signature_version' => 4, 
  'endpoint' => 'https://oss-cn-hangzhou.aliyuncs.com', 
  # path_style 为 false 表示
  'path_style' => false
}
```
[好好看看这个 -- OSS 访问域名使用规则](https://help.aliyun.com/document_detail/31834.html?spm=a2c4g.11186623.6.620.2de37c57foH1S0)