# GZHU&GDUT Blogroll

广州大学&&广东工业大学 收集的同学们的 Blog

## 聚合页面

[聚合页面](https://blogroll.junce.net/) 自动聚合这个 `README.md` 文件的表格中的所有 RSS 源，并以用户友好的方式显示出来。

欢迎在线浏览：https://blogroll.junce.net/

聚合页面使用 Vue 框架编写，每天定时 0 点和 12 点，会通过 GitHub Action 自动集成和部署到 Cloudflare 上

聚合页面由 [@Zhongye](https://github.com/Zhongye1) 维护，如发现页面上有任何 Bug，欢迎在本 Repo 中提出 Issue

## 聚合 RSS 订阅

我们也制作了一个聚合 RSS，欢迎来订阅：

https://github.com/Zhongye1/GZHU-GDUT_blogroll/blob/main/web/public/rss.xml

> - RSS 是一种提供联合和聚合 Web 内容的开放方法的协议。
> - RSS 是发布基于 Web 的内容定期更新的标准。
> - RSS 是一种基于 Internet 服务器上的一种 XML 文件类型的联合标准。
> - RSS 是一种 XML 应用程序，符合 W3C 的 RDF 规范，可通过 XML 进行扩展。
> - 您还可以从其他网站下载 RSS 源以在您的网站上显示更新的新闻项目，或者使用桌面或在线阅读器访问您最喜欢的 RSS 源。

## FAQ

> 萌新也可以加 blog 列表么？

能。

> 有些 blog 太久没更新或失效了，怎么办？

请提 pull request 删掉

【其余待补充】

## 添加/编辑方式

在**最下面一行**添加（相当于按时间顺序，为以后的增量提醒做准备）

推荐在 commit log 或者 pull request 里面简单介绍一下自己，比如常用的 ID 等

如果无 RSS 源，可以使用 `---` 代替，聚合页面将不会抓取，仅展示 HTML 链接

## Lists

| Name           | RSS                                               | HTML                                                       |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| Zhongye's      | https://zhongye1.github.io/Arknight-notes/rss.xml | https://zhongye1.github.io/Arknight-notes/                 |
| miomoe         | ---                                               | https://blog.miomoe.cn                                     |
| Carry          | ---                                               | https://blog.carry.fit/                                    |
| doraemon       | ---                                               | https://doraemonblogs.github.io/                           |
| 宇宇           | ---                                               | https://pic.yuyu.red/                                      |
| XingJi の Blog | https://love.xingji.fun/atom.xml                  | https://love.xingji.fun/                                   |
| GZHU-193       | ---                                               | https://guangzhou-university-site-193.github.io/GZHU-SITE/ |
| chonqin's Blog | ---                                               | https://chonqin.github.io/                                 |
| Zero One       |                                                   | https://sdfcwfe.github.io/syy.github.io/                   |

## OPML

`opml.xml` 地址：https://github.com/Zhongye1/GZHU-GDUT_blogroll/blob/main/web/public/opml.xml

你可以使用 `opml.xml` 文件在 Inoreader 里持续订阅，或在 Feedly 下载之后导入。

> OPML（英语：Outline Processor Markup Language）意为"大纲处理标记语言"，是一种基于 XML 上的文件保存格式。目前流行的应用方式为收集博客或播客的 RSS 来源，整理成单一可交换的 OPML 格式的订阅列表，让用户便于转移自己的订阅项目。
>
> -- Wikipedia

## See Also

- https://github.com/tuna/blogroll
- https://github.com/NUAA-Open-Source/BlogRoll
- https://github.com/timqian/chinese-independent-blogs
