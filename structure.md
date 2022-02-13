# canyon服务结构

## 基本流程

1.上传覆盖率信息，里面会有5个字段，分别是codeHouse、repoId、commitSha、reporter，所有流程走通返回200。
错误的话分几个种类：1.codeHouse、repoId没找到项目 2.覆盖率数据结构错误。
2.上传完覆盖率后，后端会自动新增project，之后用户会在平台上看到新的项目覆盖率信息
3.用户点击查看详情的时候，canyon-report模块依赖单个项目的覆盖率数据，后端返回。还需要一个文件详情，通过对应的信息亦可返回

## 重要的service

reportService

## 表
project
coverage
codeHouse


整个项目的覆盖率概览，需要聚合所有覆盖率

单文件覆盖率信息，{}

