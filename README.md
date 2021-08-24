# tencent-component-types

This repo contains types used to validate `serverless.yml` and an SCF instance used to sync types to our redis database.

Folder structure
- [./types](./types): All types lives here
- [./scf](./scf): The SCF instance used to sync types to database

## 配置说明

### 支持的类型

| type     | 具体限制条件					|
| ---  | ---  |
| string   | required, min, max, regex, allow                                |
| number   | required, min, max, allow                                       |
| boolean  | required                                                  |
| object   | required                                                      |
| array    | required, min, max                                              |
| datetime | required                                                     |
| url      | required                                                     |


### TYPE YML 支持的字段列表

| field        | 必填 | 示例                                            | 备注                         |
| ------------ | ---- | ----------------------------------------------- | ---------------------------- |
| message      | 否   | string/number/boolean/object/array/datetime/url |                              |
| messageLevel | 否   |                                                 | 默认 warning                 |
| inputs       | 否   |                                                 | 默认 error， error会终止进程 |


#### inputs 中字段支持的字段

| type     | 必填 | 示例                                            | 备注        |
| -------- | ---- | ----------------------------------------------- | ----------- |
| type     | 是   | string/number/boolean/object/array/datetime/url |             |
| required | 否   |                                                 | 默认 false  |
| rules    | 否   | 用户填写多个规则                                                |             |
| items    | 否   |                                                 | 数组类型    |
| keys     | 否   |                                                 | Object 类型 |

> 只有一个规则，可以将规则直接写在inputs字段条件中，不需要嵌套在 rules

## How to use

To sync types to dev env: run [this workflow](https://github.com/serverlessinc/tencent-component-types/actions/workflows/dev.yml)
