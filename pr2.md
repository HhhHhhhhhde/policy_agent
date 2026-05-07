Prompt:
请开发核心交互页面 ChatView.vue。

界面布局：

左侧 40% 为对话流，支持 Markdown 格式。

右侧 60% 为“文本优化对比面板”。

核心逻辑与数据：

初始模拟数据：

原文：“The Committee expects that with appropriate policy firming, inflation will return to its 2 percent objective, though uncertainty remains regarding the terminal rate.”（标记为高模糊度，易引发分歧）。

优化后：“The Committee maintains a strict 2% inflation target. We will adjust the federal funds rate based on the next two CPI reports to ensure price stability.”（标记为高透明度）。

高亮功能：

在原文中使用红色背景高亮“appropriate policy firming”和“uncertainty remains”，点击高亮处弹出 Tooltip 解释：“LLM 交易员对该词汇的解释标准差（SD）为 0.025，属于严重歧义。”

仿真触发器：

底部放置一个大按钮“启动 30 名 LLM 交易员进行多主体仿真”，点击后出现加载动画，模拟神经网络计算过程。