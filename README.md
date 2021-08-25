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
| messageLevel | 否   | 默认 warning，不中断部署                 |
| inputs       | 否   | 对 inputs 内容进行校验的规则 |


#### inputs 中支持的字段

| type     | 必填 | 示例                                            | 备注        |
| -------- | ---- | ----------------------------------------------- | ----------- |
| type     | 是   | string/number/boolean/object/array/datetime/url |             |
| required | 否   |                                                 | 默认 false  |
| rules    | 否   | 用户填写多个规则                 |    数组类型         |
| items    | 否   |                                                 | 数组类型    |
| keys     | 否   |                                                 | Object 类型 |

> 只有一个规则时，可以将规则直接写在inputs字段条件中，不需要嵌套在 rules

## Types 版本匹配规则

1. 如果用户没有指定组件版本，使用该组件最新版 types 进行校验
2. 如果用户指定了组件版本，使用的小于等于组件版本，并且是最新版的 types 进行校验

## How to use

To sync types to dev env: run [this workflow](https://github.com/serverless/tencent-types/actions/workflows/dev.yml)
