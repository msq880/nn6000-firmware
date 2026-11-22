# NN6000 V2 固件云编译

连我 Link NN6000 V2 的 LibWrt 固件，GitHub Actions 云端编译。仓库只保留一个工作流（无缓存版），历史上 Releases 与运行记录已于 2026-11-20 清空，从零开始。

| 固件 | 源码 | 工作流 | 配置 |
|---|---|---|---|
| LibWrt | LiBwrt/LibWrt | `Build LibWrt NN6000V2`（`.github/workflows/build-libwrt.yml`） | 见下 |

触发方式：**仅手动触发**。在 Actions 页选 `Build LibWrt NN6000V2` → Run workflow，一次运行在同一棵源码树上**连编三个版本**：

- 先编标准版（`configs/libwrt.config`）：带 WiFi、不带 Docker
- 再编无 WiFi 版（`configs/libwrt-nowifi.config`）：关掉 ath11k 全家等 WiFi 驱动与配置（仅剩 LuCI 依赖的 iwinfo 查询库）、不带 Docker
- 最后编无 WiFi + Docker 版（`configs/libwrt-nowifi-docker.config`）：与无 WiFi 版相同，但带 Docker 全套（dockerd、docker、docker-compose、luci-app-dockerman 及中文语言包）

注：`CONFIG_ALL_KMODS`（全部 kmod 一次编入）曾于 2026-11-20 短暂启用，因连续两轮把编不过的冷门模块拉进来（kmod-ath10k-sdio 与内核 6.12.116 不兼容、kmod-oaf 编译报错）已撤销，现行口径为标准版 416 包、无 WiFi 版 382 包，具体以每次编译的 manifest 为准。

后续版本复用前面的源码树：`dl/` 源码包不重下、工具链和 host 工具不重编、不受配置影响的软件包不重编，只重编内核/模块等受影响部分（实测第二个版本仅约 6 分钟），所以三个版本的总耗时明显小于分开跑三次（仓库不使用 GitHub Actions 缓存，跨运行不留缓存；换配置前工作流会清掉 rootfs 暂存区，防止上一版的文件残留进下一版镜像）。

成品下载：编译完成后在本仓库 **Releases** 里下载，一次运行只发一个 Release，标签形如 `libwrt-nn6000v2-<日期>-run<序号>`，三个版本的固件都在里面，靠文件名区分：带 `-wifi-` 的是标准版，带 `-nowifi-` 的是无 WiFi 版，带 `-nowifi-docker-` 的是无 WiFi + Docker 版；Actions 的 Artifacts 里也有一份。

固件口径：

- 6MB 内核、系统分区 2GB
- 全量包：Lucky、PassWall（xray-core + sing-box）、Argon 主题、MosDNS、WireGuard、ttyd、vlmcsd、wol、nlbwmon 等；标准版与无 WiFi 版**不含 Docker**（2026-11-18 按用户要求去掉，用户反馈 Docker 影响网络），仅无 WiFi + Docker 版带 Docker 全套（2026-11-23 用户单独要求增加的第三版）
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
