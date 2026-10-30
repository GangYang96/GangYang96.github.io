// Project descriptions and links to independent source repositories.
window.SITE_DEMOS = [
  {
    "id": "loan-lab",
    "project": "db-gpt",
    "title": {
      "en": "DB-GPT Data Analysis Agent",
      "zh": "基于 DB-GPT 的数据分析智能体"
    },
    "summary": {
      "en": "A table-analysis workflow for natural-language queries, rule-based screening and aggregation.",
      "zh": "面向表格数据查询与风险信息筛选，将自然语言问题转换为分析条件，并调用数据工具完成统计。"
    },
    "work": [
      {
        "en": "Deployed DB-GPT, integrated the model API, and developed Python/pandas validation and calculation tools.",
        "zh": "完成 DB-GPT 本地部署、模型接入及 Python/pandas 数据校验、计算工具开发。"
      },
      {
        "en": "Connected parameter parsing, tool calls and result checking; retained source records for review.",
        "zh": "串联参数解析、工具调用和结果核对流程，保留计算条件与来源记录。"
      }
    ],
    "demoTitle": {
      "en": "Loan Table Analysis",
      "zh": "贷款表格分析"
    },
    "demoNote": {
      "en": "Base workflow recording · Demo v1.1: aging and reconciliation · synthetic data",
      "zh": "基础流程录屏 · Demo v1.1：账龄与对账 · 合成数据"
    },
    "duration": "0:22",
    "repository": "https://github.com/GangYang96/loan-data-analysis",
    "demoUrl": "https://gangyang96.github.io/loan-data-analysis/"
  },
  {
    "id": "message-lab",
    "project": "hiagent",
    "title": {
      "en": "HiAgent Message Parsing Agent",
      "zh": "基于 HiAgent 的外汇报文解析智能体"
    },
    "summary": {
      "en": "A workflow for classifying foreign-exchange messages, extracting required fields and supporting manual review.",
      "zh": "针对外汇报文格式不一、关键字段分散的问题，组织类型识别、字段抽取和结果校验。"
    },
    "work": [
      {
        "en": "Defined fields and structured prompts for different message types, with conditional workflow branches.",
        "zh": "设计不同报文类型的字段定义、结构化提示及工作流处理分支。"
      },
      {
        "en": "Linked extracted fields to the source text and marked missing or ambiguous information for review.",
        "zh": "关联字段与原文依据，标记缺失及歧义信息，辅助人工复核。"
      }
    ],
    "demoTitle": {
      "en": "Message Parsing and Review",
      "zh": "报文解析与人工复核"
    },
    "demoNote": {
      "en": "Base workflow recording · Demo v1.1: review queue and history · synthetic messages",
      "zh": "基础流程录屏 · Demo v1.1：复核待办与历史 · 合成报文"
    },
    "duration": "0:19",
    "repository": "https://github.com/GangYang96/message-review-workflow",
    "demoUrl": "https://gangyang96.github.io/message-review-workflow/"
  },
  {
    "id": "gallery-lab",
    "project": "xr",
    "title": {
      "en": "XR Exhibition Assistant",
      "zh": "XR 智能展馆助手"
    },
    "summary": {
      "en": "An exhibition project combining 3D model viewing with indoor wayfinding. I participated in the development.",
      "zh": "参与展馆三维模型展示与室内寻路开发，将展品浏览、目标选择和路线展示结合。"
    },
    "work": [
      {
        "en": "Implemented model-viewing interactions and contributed to the wayfinding workflow.",
        "zh": "完成模型展示与相关交互，参与室内寻路流程开发。"
      },
      {
        "en": "Studied genetic-algorithm route encoding and iteration, and prepared technical documentation.",
        "zh": "研究遗传算法路径编码与迭代过程，整理模块及算法说明文档。"
      }
    ],
    "demoTitle": {
      "en": "3D Gallery and Route Planning",
      "zh": "三维展品与路线规划"
    },
    "demoNote": {
      "en": "Base workflow recording · Demo v1.1: custom maps and solver comparison",
      "zh": "基础流程录屏 · Demo v1.1：自定义地图与算法对比"
    },
    "duration": "0:24",
    "repository": "https://github.com/GangYang96/gallery-route-planner",
    "demoUrl": "https://gangyang96.github.io/gallery-route-planner/"
  }
];
