/* Bilingual public content. Sources and editorial decisions: output/homepage-content-audit.md.
   Keep private CV files, source PDFs and internal enterprise materials outside this website. */
(() => {
  const t = (en, zh) => ({ en, zh });
  window.SITE_CONTENT = {
    profile: {
      intro: t(
        "I received my master's degree in Software Engineering from Nanjing University of Information Science and Technology in 2023, advised by Yadang Chen. My research covers prompt learning, knowledge-enhanced NLP and multimodal fake news detection. I am the second author of three journal papers. I now work in financial technology at a bank, developing data-analysis and message-processing workflows with DB-GPT and HiAgent. I am seeking PhD opportunities related to knowledge enhancement and tool-using agents.",
        "我于 2023 年毕业于南京信息工程大学软件工程专业，获硕士学位，导师为陈亚当老师。研究内容包括提示学习、知识增强自然语言处理和多模态虚假新闻检测，以第二作者发表三篇期刊论文。目前在银行从事金融科技工作，开展基于 DB-GPT 和 HiAgent 的数据分析与报文处理实践，计划继续攻读相关方向博士。"
      ),
      interests: [
        t("Prompt learning", "提示学习"),
        t("Knowledge-enhanced NLP", "知识增强自然语言处理"),
        t("Multimodal information fusion", "多模态信息融合"),
        t("Agent tool use and result verification", "智能体工具调用与结果核验")
      ],
      bridge: t(
        "My research examines how prompts and external knowledge help models use information. My current agent practice extends these questions to tool execution: translating requests into operations, retaining evidence, and checking results. Agent systems are a current area of practice and a future research interest.",
        "已有研究关注提示与外部知识如何帮助模型理解信息；当前智能体实践进一步关注如何将需求转化为工具操作、保留依据并核验结果。智能体是我正在开展的技术实践与后续研究兴趣。"
      )
    },
    publications: [
      {
        id: "continuous-prompts", kind: "journal", year: "2024",
        title: "Eliciting knowledge from language models with automatically generated continuous prompts",
        authors: ["Yadang Chen", "Gang Yang", "Duolin Wang", "Dichao Li"],
        venue: t("Expert Systems with Applications · 239, 122327", "Expert Systems with Applications · 239，122327"),
        authorship: t("Advisor: first author · Student: second author", "导师一作 · 学生二作"),
        question: t("How can continuous prompts be initialized without relying on manually designed templates?", "如何减少连续提示初始化对人工模板的依赖，为不同任务提供有效的优化起点？"),
        summary: t(
          "APT searches for task-relevant discrete prompts, uses their embeddings to initialize continuous prompts, and optimizes them for downstream tasks. The study evaluates knowledge probing and language understanding on LAMA and SuperGLUE.",
          "APT 自动搜索任务相关的离散提示，以词嵌入初始化连续提示，再进行训练优化，在 LAMA 与 SuperGLUE 上研究知识探测和自然语言理解。"
        ),
        contribution: t(
          "I proposed using automatically searched prompts to improve continuous-prompt initialization, and implemented and optimized the prompt-search and model-training workflow.",
          "我提出通过自动搜索提示词改进连续提示初始化的方法，负责提示词搜索与模型训练流程的实现和优化。"
        ),
        details: [
          { title: t("Method", "方法"), text: t("Gradient-guided search identifies discrete trigger tokens related to the target task. Their embeddings supply the initial continuous representation, which is then refined by prompt tuning. This connects automatic prompt construction with trainable task adaptation.", "梯度引导搜索识别与目标任务相关的离散触发词，将其词嵌入映射为连续提示的初始表示，再通过提示训练细化，将自动提示构建与可训练的任务适配衔接。") },
          { title: t("Evaluation and publication", "评估与发表"), text: t("The paper studies both few-shot and fully supervised settings on LAMA and SuperGLUE. The journal volume is dated 2024; the article was first available online in November 2023.", "论文在 LAMA 和 SuperGLUE 上研究小样本与全监督设置。正式卷年为 2024，文章于 2023 年 11 月首次在线发表。") }
        ],
        tags: ["APT", "LAMA", "SuperGLUE"],
        links: [{ label: t("Paper / DOI", "论文 / DOI"), url: "https://doi.org/10.1016/j.eswa.2023.122327" }, { label: t("Code · reconstruction", "代码 · 重建实现"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/docs/method-mapping.md#apt" }, { label: t("Data & setup", "数据与运行"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/data/README.md" }],
        figures: [{ src: "eswa-apt-framework.png", caption: t("Original paper figure · Fig. 2, The structure of APT. Chen et al., ESWA, 2024, p. 3.", "论文原图 · 图 2：APT 结构。Chen 等，ESWA，2024，第 3 页。"), alt: t("APT: automatic discrete-prompt search, embedding-based initialization, and continuous prompt optimization.", "APT 框架：自动搜索离散提示、词嵌入初始化以及连续提示优化。") }]
      },
      {
        id: "keap", kind: "journal", year: "2024",
        title: "Detecting fake information with knowledge-enhanced AutoPrompt",
        authors: ["Xun Che", "Gang Yang", "Yadang Chen", "Qianmu Li"],
        venue: t("Neural Computing and Applications · 36, 7725–7742", "Neural Computing and Applications · 36，7725–7742"),
        authorship: t("Industry advisor: first author · Student: second author", "企业导师一作 · 学生二作"),
        question: t("Can automatically generated prompts and entity knowledge support fake news detection with limited labeled examples?", "在标注样本有限时，如何利用自动提示与实体背景知识改善虚假新闻检测？"),
        summary: t("KEAP uses T5-generated templates to reformulate detection as masked-token prediction. External entity knowledge adds context to the news text; experiments use GossipCop and PolitiFact.", "KEAP 利用 T5 自动生成提示模板，将检测转化为掩码预测，并通过外部实体知识补充新闻语义，在 GossipCop 与 PolitiFact 上开展实验。"),
        contribution: t("I proposed enhancing automatically generated prompts with external entity knowledge, and implemented and optimized the integration of prompt templates and entity information.", "我提出利用外部实体知识增强自动生成提示的方法，实现和优化提示模板与实体知识的融合。"),
        details: [
          { title: t("Method", "方法"), text: t("The workflow combines news text, task-specific prompts and external entity knowledge. Predicting label words at the masked position supports real/fake classification, reducing reliance on manually designed prompts.", "流程结合新闻文本、任务相关提示和外部实体知识，通过预测掩码位置的标签词完成真假分类，减少对人工提示设计的依赖。") },
          { title: t("Connection to my thesis", "与硕士论文的联系"), text: t("This publication corresponds to the knowledge-enhanced prompt-learning approach in Chapter 3 of my master's thesis. It is distinct from the multimodal feature-association method in Chapter 4.", "该成果对应硕士论文第 3 章的知识增强提示学习方法。第 4 章另行研究多模态关联特征增强方法。") }
        ],
        tags: ["KEAP", "T5", "Wikidata"],
        links: [{ label: t("Paper / DOI", "论文 / DOI"), url: "https://doi.org/10.1007/s00521-024-09491-7" }, { label: t("Code · reconstruction", "代码 · 重建实现"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/docs/method-mapping.md#keap" }, { label: t("Data & setup", "数据与运行"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/data/README.md" }],
        figures: [{ src: "keap-framework.png", caption: t("Original paper figure · Fig. 3, The structure of KEAP. Che et al., Neural Computing and Applications, 2024, p. 7729.", "论文原图 · 图 3：KEAP 结构。Che 等，Neural Computing and Applications，2024，第 7729 页。"), alt: t("KEAP combines news text, T5-generated prompts, language-model encoding and entity knowledge for real/fake classification.", "KEAP 将新闻文本、T5 生成的提示、语言模型编码与实体知识结合，完成真假分类。") }]
      },
      {
        id: "bert-cn", kind: "journal", year: "2024",
        title: "基于提示学习增强BERT的理解能力",
        authors: ["陈亚当", "杨刚", "王铎霖", "余文斌"],
        venue: t("信息技术 (Information Technology) · Issue 6, 2024", "信息技术 · 2024 年第 6 期"),
        authorship: t("Advisor: first author · Student: second author", "导师一作 · 学生二作"),
        question: t("How can prompts be constructed and optimized automatically to adapt BERT to different language-understanding tasks?", "如何自动构建并优化提示，减少对人工模板的依赖，适配不同的 BERT 下游任务？"),
        summary: t("The method searches for discrete prompts and uses their embeddings to initialize continuous prompts. A prompt encoder and masked-token objective optimize the representations for BERT task adaptation.", "通过梯度引导搜索离散提示，以其词嵌入初始化连续提示，结合提示编码器与掩码预测目标优化表示，实现 BERT 的下游任务适配。"),
        contribution: t("I explored the combination of automatic prompts and BERT task adaptation, using multi-task experiments and prompt-length analysis to inform continuous-prompt configuration.", "我探索自动生成提示与 BERT 任务适配的结合，通过多任务实验和提示长度分析，为连续提示的配置与使用提供实验依据。"),
        details: [
          { title: t("Method and evaluation", "方法与评估"), text: t("The study connects downstream tasks to BERT's masked-language-model objective. It evaluates seven SuperGLUE task datasets and examines how prompt length affects performance.", "研究将下游任务与 BERT 的掩码语言模型目标衔接，在 SuperGLUE 的七个任务数据集上开展评估，并分析提示长度对模型表现的影响。") }
        ],
        tags: ["BERT", "SuperGLUE"], links: [{ label: t("Code · reconstruction", "代码 · 重建实现"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/docs/method-mapping.md#apt" }, { label: t("Data & setup", "数据与运行"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/data/README.md" }], figures: []
      },
      {
        id: "thesis", kind: "thesis", year: "2023",
        title: "基于提示学习与关联特征增强的虚假新闻检测方法",
        authors: ["杨刚"],
        venue: t("Master's thesis · Nanjing University of Information Science and Technology · Advisor: Yadang Chen", "硕士学位论文 · 南京信息工程大学 · 导师：陈亚当"),
        question: t("How can fake news detection benefit from limited-label learning and complementary textual and visual evidence?", "如何改善小样本条件下的新闻语义学习，并充分利用文本与图像的互补信息？"),
        summary: t("My thesis studies two methods: knowledge-enhanced prompt learning in Chapter 3 and attention-based multimodal feature association in Chapter 4. The methods address different sources of difficulty in fake news detection.", "硕士论文包含两个方法：第 3 章研究知识增强提示学习，第 4 章研究基于注意力的多模态关联特征增强，分别回应小样本学习和图文信息融合中的问题。"),
        contribution: t("I investigated the use of automatically generated prompts and entity knowledge for text-based detection, alongside attention mechanisms that strengthen associations between text and image features.", "我研究自动生成提示与实体知识在文本检测中的应用，并探索利用注意力机制增强文本与图像特征关联，实现多模态信息融合。"),
        details: [
          { title: t("Chapter 3 · Knowledge-enhanced prompt learning", "第 3 章 · 知识增强提示学习"), text: t("T5-generated templates and external entity knowledge support masked-token prediction for fake news detection. Experiments use GossipCop and PolitiFact. This method corresponds to the KEAP publication.", "T5 自动生成模板，并结合外部实体知识，将虚假新闻检测转化为掩码预测。在 GossipCop 与 PolitiFact 上评估，与 KEAP 期刊论文的方法相对应。") },
          { title: t("Chapter 4 · Multimodal feature association", "第 4 章 · 多模态关联特征增强"), text: t("BERT and Text-CNN extract text features, while a ResNet branch extracts visual features. Attention strengthens cross-modal associations, and the fused representation supports real/fake classification. Evaluation uses Weibo and Twitter.", "BERT 与 Text-CNN 提取文本特征，ResNet 分支提取图像特征；注意力机制增强跨模态关联，融合表示用于真假新闻分类，在 Weibo 与 Twitter 上评估。") }
        ],
        tags: ["BERT", "Text-CNN", "ResNet"], links: [{ label: t("Code · reconstruction", "代码 · 重建实现"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/docs/method-mapping.md#multimodal" }, { label: t("Data & setup", "数据与运行"), url: "https://github.com/GangYang96/paper-reproductions/blob/main/data/README.md" }],
        figures: [
          { src: "assets/thesis-prompt-framework.svg", caption: t("Original thesis figure · Fig. 3-1. Knowledge-enhanced prompt learning, Chapter 3, printed p. 21. Original Chinese labels retained.", "学位论文原图 · 图 3-1：知识增强提示学习框架，第 3 章，印刷页码 21。保留原始中文标签。"), alt: t("Chapter 3 framework combining news text, automatically generated prompts and entity knowledge for fake news detection.", "第 3 章框架：结合新闻文本、自动生成提示与实体知识进行虚假新闻检测。") },
          { src: "thesis-multimodal-framework.png", caption: t("Original thesis figure · Fig. 4-1. Multimodal feature association, Chapter 4, printed p. 41. Original Chinese labels retained.", "学位论文原图 · 图 4-1：多模态关联特征增强框架，第 4 章，印刷页码 41。保留原始中文标签。"), alt: t("Chapter 4 framework: BERT and Text-CNN text features, ResNet image features, attention-based association and news classification.", "第 4 章框架：BERT 与 Text-CNN 文本特征、ResNet 图像特征、注意力关联融合及新闻分类。") }
        ]
      },
      {
        id: "android-address-book", kind: "software", year: null,
        title: t("Android-based Shared Mobile Address Book System V1.0", "基于Android的共享手机通讯录系统V1.0"),
        authors: ["杨刚"],
        venue: t("Software copyright registration · 2022SR0273010", "软件著作权登记 · 2022SR0273010"),
        question: t("How can mobile contacts be managed centrally and shared more conveniently?", "如何集中管理手机联系人，并改善通讯录共享、查询与维护？"),
        summary: t("An Android address-book system supporting centralized contact management and sharing.", "基于 Android 的共享通讯录系统，支持联系人信息的集中管理与共享。"),
        contribution: t("I designed and developed the system to support contact lookup, maintenance and sharing.", "我设计开发该系统，实现联系人查询、维护与共享功能。"),
        details: [{ title: t("Functions", "功能"), text: t("The system addresses fragmented contact information through shared management of address-book entries. Registration number: 2022SR0273010.", "系统面向联系人信息分散、共享不便的问题，通过通讯录条目的集中管理支持查询和维护。登记号：2022SR0273010。") }],
        tags: ["Android"], links: [], figures: []
      }
    ],
    projects: [
      {
        id: "db-gpt", kind: "agent", title: t("Data Analysis and Risk-Information Agent with DB-GPT", "基于 DB-GPT 的数据分析与风险信息识别智能体"),
        role: t("Internal enterprise project · Implementation and workflow development", "企业内部项目 · 工具开发与流程实现"), period: null,
        summary: t("Turns natural-language questions about tables into analysis parameters and Python tool calls. I deployed DB-GPT, connected the model API, and developed validation, rule-calculation and aggregation tools. The workflow returns flagged records and analysis with conditions and source references for review.", "面向表格数据的自然语言查询与风险分析，将问题解析为统计日期、筛选条件和汇总维度，调用 Python 工具完成校验、规则计算、筛选与汇总。我完成本地部署、模型接入和工具开发，串联查询到结果说明的流程，并保留计算条件与来源记录。"),
        io: t("Tables + natural-language questions → flagged records, summaries and analysis supported by source data.", "表格与自然语言问题 → 风险名单、汇总结果及附数据依据的分析说明。"),
        contribution: t("Local deployment, model API integration, structured parameter parsing, Python/pandas tool development, workflow orchestration and result-consistency checks.", "完成本地部署与模型接口接入，设计结构化参数解析、Python/pandas 工具和调用流程，并通过典型与异常案例校验结果一致性。"),
        details: [
          { title: t("Tool workflow", "工具流程"), text: t("The agent extracts analysis conditions and calls separate tools for filtering, calculation and aggregation. Deterministic tools perform the data operations; the language model uses their results to compose the explanation.", "智能体提取分析条件，调用分别负责筛选、计算与汇总的工具。数据操作通过确定性工具执行，语言模型依据工具结果组织分析说明。") },
          { title: t("Verification", "结果核验"), text: t("Typical and exceptional cases check result consistency. Calculation conditions and source records are retained so conclusions can be traced back to the input data.", "使用典型与异常案例核对结果一致性，保留计算条件与来源记录，使结论能够回溯至输入数据。") }
        ],
        tags: ["DB-GPT", "Python / pandas", t("Tool calling", "工具调用"), t("Structured parameters", "结构化参数"), t("Result verification", "结果核验")], diagram: "db-gpt",
        figureCaption: t("Workflow schematic · Parse the question, run data tools, retain conditions and source records.", "技术流程示意 · 解析问题、调用数据工具，并保留计算条件与来源记录。")
      },
      {
        id: "hiagent", kind: "agent", title: t("Foreign-Exchange Message Parsing Agent with HiAgent", "基于 HiAgent 的复杂外汇报文信息解析智能体"),
        role: t("Internal enterprise project · Schema, prompt and workflow design", "企业内部项目 · 字段、提示与工作流设计"), period: null,
        summary: t("Classifies varied messages and applies type-specific extraction requirements. I designed field definitions, structured prompts and conditional workflows, then added checks for format and completeness. Extracted fields link to their source evidence, while missing or ambiguous information is marked for human review.", "针对外汇报文格式不一、关键字段分散的问题，构建类型识别、字段抽取与结果校验流程。我为不同报文设计字段定义和结构化提示，通过工作流分支组织处理，标记缺失或歧义信息，将字段与原文依据关联输出，辅助人工复核。"),
        io: t("Unstructured messages → type-specific structured fields, validation flags and source evidence.", "非结构化报文 → 按类型定义的结构化字段、校验标记与原文依据。"),
        contribution: t("Defined extraction schemas and prompts for different message types, organized classification and validation branches, and linked output fields with the source text.", "设计不同报文类型的字段定义与抽取提示，组织分类、解析和校验分支，明确缺失及歧义处理方式，并关联输出字段与原文。"),
        details: [
          { title: t("Type-specific extraction", "分类抽取"), text: t("Different message categories have different field requirements. Conditional branches select the appropriate schema and prompt before extraction, followed by output-format and field-completeness checks.", "不同报文类别采用不同字段要求。条件分支选择相应字段定义和提示，再执行抽取，并校验输出格式与字段完整性。") },
          { title: t("Human verification", "人工复核"), text: t("The workflow retains source evidence and marks information requiring clarification, providing a structured input for subsequent human review and business processing.", "流程保留原文依据，并标记需要核实的信息，为后续人工复核与业务处理提供结构化输入。") }
        ],
        tags: ["HiAgent", t("Structured prompts", "结构化提示"), t("Field extraction", "字段提取"), t("Conditional workflows", "条件工作流"), t("Field validation", "字段校验")], diagram: "hiagent",
        figureCaption: t("Workflow schematic · Route by message type, extract the required fields, and link source evidence.", "技术流程示意 · 按报文类型分流，提取对应字段并关联原文依据。")
      },
      {
        id: "xr", kind: "engineering", title: t("XR Exhibition Assistant", "XR 智能展馆助手系统的设计与开发"),
        role: t("Commissioned project · Development participant", "企事业委托项目 · 参与开发"), period: null,
        summary: t("Connects interactive 3D exhibit viewing with indoor guidance. I contributed to model display and wayfinding, implemented related interactions, and studied genetic-algorithm path encoding, fitness and iterative operations. I also prepared functional and technical documentation to support route-design decisions.", "围绕展品浏览与室内导览，参与三维模型展示和室内寻路开发，将目标位置选择与路线展示结合。我完成模型展示及相关交互流程，研究遗传算法的路径编码、适应度与迭代操作，并整理功能和技术文档，为导航方案设计提供依据。"),
        io: t("Exhibit models + indoor space + selected destination → interactive model views and visualized routes.", "展品模型、室内空间与目标位置 → 交互模型展示与可视化路线。"),
        contribution: t("Implemented model-viewing interactions, contributed to indoor wayfinding, studied genetic algorithms for route planning and documented module relationships and operation flows.", "完成模型展示交互，参与室内寻路开发，研究遗传算法路径规划，并编写模块关系、算法流程和操作方式等技术文档。"),
        details: [
          { title: t("Route-planning study", "路径规划研究"), text: t("I examined candidate-route encoding, fitness evaluation, selection, crossover and mutation, including the roles of path length and passage constraints in route optimization.", "研究候选路径编码、适应度评价、选择、交叉与变异，分析路径长度和通行约束在路线优化中的作用。") },
          { title: t("Interface and guidance", "展示与导览"), text: t("Model viewing, destination selection and route display are connected so visitors can inspect an exhibit and locate it within the exhibition space.", "将模型浏览、目标位置选择与路线展示结合，帮助使用者查看展品并在展馆空间中寻找目标位置。") }
        ],
        tags: [t("3D interaction", "三维交互"), t("Indoor wayfinding", "室内寻路"), t("Genetic algorithms", "遗传算法"), t("Route visualization", "路径可视化")], diagram: "xr",
        figureCaption: t("Functional schematic · An imagined gallery connects model viewing with indoor guidance and route-planning study.", "功能示意 · 自绘展馆空间展示三维模型浏览、室内导览与路径规划研究的关系。")
      },
      {
        id: "nsfc-video", kind: "research", title: t("Video Object Segmentation through Supervision Selection and Multi-Level Visual Feature Fusion", "基于监督选择与多层视觉特征融合的视频目标分割技术研究"),
        role: t("NSFC 61802197 · Participant", "国家自然科学基金 61802197 · 参与"), period: null,
        summary: t("The project investigates feature fusion under appearance changes and background interference. As a participant, I worked on visual feature extraction and fusion, examining complementary shallow details and deep semantics and organizing the processing workflow for complex visual scenes.", "课题关注复杂场景中的目标外观变化、背景干扰和单层特征表达不足，研究不同层次视觉信息的互补融合。我参与特征提取与融合相关工作，结合浅层细节与深层语义，梳理特征处理、融合及模块间的数据传递流程，支持复杂场景中的视觉信息表达。"),
        io: t("Visual features at different levels → complementary fused representations for video-segmentation research.", "不同层次的视觉特征 → 用于视频分割研究的互补融合表示。"),
        contribution: t("Participated in multi-level feature extraction and fusion, examining the relationship between shallow details and deep semantics and organizing the feature-processing workflow.", "参与多层视觉特征提取与融合，结合浅层细节和深层语义的表达特点，梳理特征处理及融合流程。"),
        details: [{ title: t("Scope of participation", "参与范围"), text: t("My work concerned the representation and fusion of visual features. It considered differences in spatial resolution, detail and semantic information across feature levels to support the broader segmentation study.", "个人工作聚焦视觉特征的表达与融合，考虑不同层次在空间分辨率、细节保留和语义表达上的差异，为整体分割研究提供支持。") }],
        tags: [t("Visual feature extraction", "视觉特征提取"), t("Multi-level fusion", "多层特征融合"), t("Shallow and deep features", "浅层与深层特征"), t("Video segmentation", "视频分割")], diagram: "video-segmentation",
        figureCaption: t("Research schematic · Shallow detail and deep semantics support feature fusion. Frames and masks are drawn examples.", "研究内容示意 · 融合浅层细节与深层语义；视频帧与掩码均为自绘示例。")
      },
      {
        id: "nsfc-network", kind: "research", title: t("Effects of Redundant and False Information on Complex Networks and Information Filtering", "冗余和虚假信息对复杂网络及信息过滤的影响的研究"),
        role: t("NSFC 61703212 · Participant", "国家自然科学基金 61703212 · 参与"), period: null,
        summary: t("The project studies how redundant and false information affects information quality and filtering. As a participant, I worked on fake-information detection, organized text-feature and classification workflows, and prepared technical descriptions and research summaries for project documentation.", "课题关注冗余和虚假信息对网络信息质量及过滤结果的影响。我参与虚假信息检测相关研究，围绕文本表达与分类判别梳理特征提取、检测模型及处理流程，并编写研究文档、整理技术材料，形成方法与模块说明及研究总结，支持成果材料编制。"),
        io: t("Textual information → feature and detection workflows, technical descriptions and research summaries.", "文本信息 → 特征表达与检测流程分析、技术说明及研究总结。"),
        contribution: t("Organized text-representation and detection-model workflows, explained method principles and module functions, and prepared research and technical documentation.", "梳理文本特征表达和检测模型流程，归纳方法原理、模块功能与实现过程，承担研究文档和技术材料整理。"),
        details: [{ title: t("Scope of participation", "参与范围"), text: t("I examined feature representation and classification for fake-information detection, including how repeated or irrelevant content complicates content discrimination. My contribution also included documentation supporting the project's research outputs.", "围绕虚假信息检测研究特征表达与分类流程，关注重复或无关内容对判别的干扰，并通过文档与技术材料整理支持课题成果输出。") }],
        tags: [t("Text representation", "文本特征表示"), t("Fake-information detection", "虚假信息检测"), t("Information filtering", "信息过滤"), t("Classification workflows", "分类处理流程")], diagram: "information-filtering",
        figureCaption: t("Research schematic · Information context, text-feature and classification analysis, and research documentation.", "研究内容示意 · 信息环境、文本特征与分类流程分析，以及研究文档整理。")
      }
    ],
    timeline: [
      { period: t("Jun 2023–present", "2023.06–至今"), title: t("Assistant Technology Manager", "助理科技经理"), organization: t("Bank", "银行"), description: t("Financial-technology work with ongoing LLM-agent practice: domain knowledge, tool integration, workflow design and result verification.", "从事金融科技相关工作，持续开展大模型智能体实践，围绕领域知识、工具集成、工作流设计与结果核验构建任务流程。") },
      { period: t("Sep 2020–Jun 2023", "2020.09–2023.06"), title: t("Master's degree · Software Engineering", "硕士 · 软件工程"), organization: t("Nanjing University of Information Science and Technology", "南京信息工程大学"), description: t("Advisor: Yadang Chen. Research in prompt learning, knowledge-enhanced language understanding and multimodal fake news detection.", "导师：陈亚当。研究提示学习、知识增强语言理解与多模态虚假新闻检测。") },
      { period: t("Sep 2016–Jun 2020", "2016.09–2020.06"), title: t("Bachelor's degree · Electronic Information Engineering", "本科 · 电子信息工程"), organization: t("Nanjing University of Information Science and Technology", "南京信息工程大学"), description: t("Undergraduate education in electronic information engineering, with a foundation in mathematics and engineering.", "电子信息工程本科教育，建立数学与工程基础。") }
    ],
    honors: [
      t("Information Technology Role Model, Bank — four consecutive quarters, Sep 2025–Sep 2026", "银行信息科技岗位建功先锋 · 2025.09–2026.09 连续四个季度"),
      t("Outstanding New Employee, Bank", "银行优秀新员工"),
      t("Outstanding Graduate, Outstanding Student and Outstanding Student Leader, NUIST", "南京信息工程大学优秀毕业生、优秀学生、优秀干部"),
      t("Graduate scholarships — second prize once; third prize twice", "研究生二等奖学金一次、三等奖学金两次")
    ],
    skills: [
      { title: t("Data and computation", "数据与计算"), items: ["Python", "pandas"] },
      { title: t("Prompt learning and knowledge enhancement", "提示学习与知识增强"), items: ["BERT", "T5", "APT", "KEAP"] },
      { title: t("Agent tools and workflows", "智能体工具与工作流"), items: ["DB-GPT", "HiAgent", t("Tool calling", "工具调用"), t("Workflow design", "工作流设计"), t("Result verification", "结果核验")] },
      { title: t("Multimodal features and visualization", "多模态特征与可视化"), items: ["Text-CNN", "ResNet", "XR", "3D"] }
    ]
  };
})();
