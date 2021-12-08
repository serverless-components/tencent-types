# tencent-component-types

This repo contains types used to validate `serverless.yml` and an SCF instance used to sync types to our redis database.
Design doc: https://hackmd.io/4q5NJy6pRse5xfM9E0Tkrw

## 配置说明

配置示例: [./scf@0.0.4.yml](./scf@0.0.4.yml)

### 支持的类型

| type     | 可选的限制条件					|
| ---  | ---  |
| string   | required, min, max, regex, allow                                |
| number   | required, min, max, allow                                       |
| boolean  | required                                                  |
| object   | required                                                      |
| array    | required, min, max                                              |
| datetime | required                                                     |
| url      | required                                                     |


### TYPE YML 支持的字段列表

| field        | 必填 | 备注                         |
| ------------ | ---- | ---------------------------- |
| message      | 否   | 全局消息，每一次部署都展示给用户   |
| messageLevel | 否   | 默认 `warning`(不中断部署)，可设置为 `error`                |
| inputs       | 否   | 对 inputs 内容进行校验的规则 |


#### inputs 中支持的字段

| type     | 必填 | 示例                                            | 备注        |
| -------- | ---- | ----------------------------------------------- | ----------- |
| type     | 是   | string/number/boolean/object/array/datetime/url |             |
| required | 否   |                                                 | 默认 false  |
| rules    | 否   | 用户填写多个规则                 |    数组类型         |
| items    | 否   |                                                 | 数组类型    |
| keys     | 否   |                                                 | Object 类型 |

#### 关于 message 和 level

字段可以配置自定义的错误消息 `message`，和错误等级 `level`。`level` 默认为 `error` 等级，用户某字段的配置不符合规定时会中断用户部署。如果设为 `warning` 则只会提示用户，不会中断部署

> 只有一个规则时，可以将规则直接写在inputs字段条件中，不需要嵌套在 rules

## Types 版本匹配规则

1. 如果用户没有指定组件版本，使用该组件最新版 types 进行校验
2. 如果用户指定了组件版本，使用的小于等于组件版本，并且是最新版的 types 进行校验

## 关于用于同步 types 的 SCF instance

除了配置必要的环境变量，在 invoke 之前需要在腾讯云控制台将 SCF 加入 redis 所在的私有网络(VPC)

## How to use

- To sync types to dev env: run [this workflow](https://github.com/serverless-components/tencent-types/actions/workflows/dev.yml)
- To sync types to prod env: run [this workflow](https://github.com/serverless-components/tencent-types/actions/workflows/prod.yml)
