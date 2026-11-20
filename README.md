# NN6000 V2 固件云编译

连我 Link NN6000 V2 的 LibWrt 固件，GitHub Actions 云端编译。仓库只保留一个工作流（无缓存版），历史上 Releases 与运行记录已于 2026-11-20 清空，从零开始。

| 固件 | 源码 | 工作流 | 配置 |
|---|---|---|---|
| LibWrt | LiBwrt/LibWrt | `Build LibWrt NN6000V2`（`.github/workflows/build-libwrt.yml`） | 见下 |

触发方式：**仅手动触发**。在 Actions 页选 `Build LibWrt NN6000V2` → Run workflow，`config_file` 选配置：

- `libwrt.config`（默认）：标准版，413 个包，带 WiFi
- `libwrt-nowifi.config`：无 WiFi 版，379 个包，关掉 ath11k 全家等 WiFi 驱动与配置（仅剩 LuCI 依赖的 iwinfo 查询库）

成品下载：编译完成后在本仓库 **Releases** 里下载，标签形如 `libwrt-nn6000v2-<日期>-run<序号>`（无 WiFi 版带 `-nowifi-`），Actions 的 Artifacts 里也有一份。每次编译约 90 分钟，全量下载 + 全量编译，没有缓存加速。

固件口径：

- 6MB 内核、系统分区 2GB
- 全量包：Lucky、PassWall（xray-core + sing-box）、Argon 主题、MosDNS、WireGuard、ttyd、vlmcsd、wol、nlbwmon 等；**不含 Docker**（会影响网络，已去掉）
- `dl/` 里预置了一颗 erofs-utils 源码包种子，工作流会在下载前拷入源码树，跳过从 kernel.org 拉取这一步

刷机说明：

- 当前 wzdddyy 固件是 12MB 内核版，本固件是 6MB 内核版，chenxin U-Boot 支持 6M/12M 自动识别。
- 从 wzdddyy 跨版本刷入：走 U-Boot 网页刷 `factory.bin`，**不要保留配置**。
- 同系统内升级用 `sysupgrade.bin`。
- 默认带 LuCI 中文界面、ethtool、iperf3 等排障工具。

默认登录（LibWrt）：

- 管理地址：`192.168.1.1`
- 用户名：`root`
- 密码：**无密码**（LibWrt 源码默认，首次打开后台直接登录；网上第三方编译版常见的默认密码 `password` 不适用于本仓库编译的固件）
- 登录后请第一时间在「系统 → 管理权」里设置密码；未设置密码前，SSH 无法用密码登录。
