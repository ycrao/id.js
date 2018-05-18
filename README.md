# id.js


身份证校验及其属地查询类库， 是对PHP [douyasi/identity-card](https://github.com/douyasi/identity-card) 包的 `Typescript/Node/Javascript` 实现版本 。


### 安装与使用

```shell
git clone https://github.com/ycrao/id.js
cd id.js
npm install
npm link
# 命令行工具
id-parse
# 全部编译
npm run build
# 使用tsc编译
npm run build:ts
# 使用webpack编译压缩
npm run build:tsc
# 执行开发测试
npm run dev
npm run ts-dev
```

### 命令行工具

```shell
id-parse

  Usage: id-parse [options]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information
    {identity card number}  Get identity card number information

  Example:

    id-parse 42032319930606629x
```

### 数据回显

在终端运行 `id-parse 42032319930606629X` 命令，会回显以下数据：

```shell
identity card number is 42032319930606629X
{ is_pass: true,
  area:
   { status: true,
     result: '湖北省 十堰市竹山县',
     province: '湖北省',
     city: '十堰市',
     county: '竹山县',
     using: 1 },
  gender: 'm',
  birthday: '19930606',
  age: 24,
  constellation: '双子座' }
```

### 其他版本实现

- PHP实现版本 [douyasi/identity-card](https://github.com/douyasi/identity-card)
- RUST实现版本 [idrs](https://github.com/ycrao/idrs)

### 联系作者

>   Email: raoyc2009#gmail.com （请修改改`#` 为`@`）  
>   QQ群：260655062  
