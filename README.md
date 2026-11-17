# NN6000 V2 固件云编译

连我 Link NN6000 V2 的两个固件，GitHub Actions 自动编译：

| 固件 | 源码 | 配置 | 触发方式 |
|---|---|---|---|
| LEDE | coolsnowwolf/lede (master) | `configs/lede.config` | Actions 页手动运行 `Build LEDE NN6000V2`，或修改 lede.config 后推送 |
| LibWrt | LiBwrt/LibWrt | `configs/libwrt.config` | Actions 页手动运行 `Build LibWrt NN6000V2`，或修改 libwrt.config 后推送 |

成品下载：编译完成后在本仓库 **Releases** 里下载（`lede-nn6000v2-*` / `libwrt-nn6000v2-*`），Actions 的 Artifacts 里也有一份。

刷机说明（两个固件通用）：

- 均为 **6MB 内核**版；当前 wzdddyy 固件是 12MB 内核版，chenxin U-Boot 支持 6M/12M 自动识别。
- 从 wzdddyy 跨版本刷入：走 U-Boot 网页刷 `factory.bin`，**不要保留配置**。
- 同系统内升级用 `sysupgrade.bin`。
- 默认带 LuCI 中文界面、ethtool、iperf3 等排障工具。
