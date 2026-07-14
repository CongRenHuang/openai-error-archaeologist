# 錯誤考古學家：延伸文獻搜尋計畫與可驗證清單

> 建立日期：2026-07-14
> 目標：驗證提案是否符合美國教育現場、教育測量原理、AI 技術能力、法規與採購現實；同時搜尋反證與 prior art。

## 一、先給結論

概念**符合教育測量現實，但技術可靠性與新穎性不能高估**。

強支持：

- National Academies 明確指出，學生知道什麼不能從單一觀察直接讀出；assessment 是帶不確定性的 evidence-based inference。這直接支持「候選假說 + 證據 + 下一題驗證」，反對「AI 讀心」。
- IES/REL 對美國 Georgia 數學診斷工具的研究顯示，教師認為能看到 solution strategies 的診斷比一般 screening 更能指導教學；但一對一診斷耗時，只有 57% 教師認為有足夠時間全面施測。這是本提案最直接的「需求 × 規模化」證據。
- U.S. Department of Education 明確主張 educational AI 應保留 humans in the loop，且需 inspectable、explainable、overridable。
- IES algebra practice guide 支持分析 solved、incomplete、incorrect worked examples，能為診斷後教師動作提供依據。

強警告：

- ACL 2025 FERMAT 顯示，多模態模型處理手寫、多步數學錯誤仍困難；手寫輸入比 printed/text 更差。提案必須保留 abstain、HITL、holdout eval。
- 2026 MalruleLib 顯示，模型從一個 worked mistake 推斷 mal-rule 並跨題型預測，整體只有約 40.5–46.5%；會解題不等於會模擬學生錯誤規則。
- 2026 Correct Answer Trap 研究已提出 reasoning-first、human judgment、diagnostic follow-up。另一篇同作者研究更提出 detect–verify–escalate 與 teacher dashboard。這些與提案高度接近。提案不可宣稱首創此框架；差異必須收斂至「日常紙本手寫輸入 + 每候選具體預測 + 班級教學決策流」。
- IES 2019 data-driven instruction RCT 沒有改善學生結果，可能因未改變教師實際行為。只有 dashboard 不構成 impact；必須證明輸出導致可執行教師動作。

## 二、研究問題清單

每個問題都對應提案中的一項主張。搜尋時不得只找支持證據；每題至少找一筆反證或限制。

| ID | 待驗證問題 | 對應提案 |
| --- | --- | --- |
| Q1 | 美國教師是否需要比總分更細的數學診斷？ | 問題、impact |
| Q2 | solution steps／error patterns 是否能提供有用認知證據？ | evidence localization |
| Q3 | 單份作業能否唯一判定 misconception？ | candidate hypothesis、abstain |
| Q4 | follow-up task 能否區分 competing hypotheses？ | verification experiment |
| Q5 | slip 與 systematic mal-rule 是否能可靠區分？ | `error_disposition` |
| Q6 | 分析錯誤、incorrect worked examples 是否改善學習？ | 教師下一步、補救 |
| Q7 | 美國教師目前如何使用 formative data？流程頻率與阻力為何？ | workflow fit |
| Q8 | 手寫數學辨識、錯誤定位、概念診斷目前能做到什麼？ | feasibility |
| Q9 | 模型在跨題型 misconception generalization 上多可靠？ | taxonomy/eval |
| Q10 | HITL、abstain、explanation 是否符合政府 AI guidance？ | risk |
| Q11 | FERPA/COPPA、第三方 API 留存、學校同意有哪些要求？ | privacy |
| Q12 | Title I/ESSA 是否支持購買？需要哪級 evidence？ | payer/GTM |
| Q13 | 已有產品、論文是否做過相同概念？ | novelty/prior art |
| Q14 | 班級 heatmap 是否真的改變教師行為或學生 outcome？ | product impact |

## 三、納入與排除標準

### 來源優先級

| 等級 | 來源 | 用途 |
| --- | --- | --- |
| A | U.S. federal sources：IES、NCES、ED、FTC、NIST；National Academies；peer-reviewed RCT/meta-analysis | 可支撐核心事實與風險決策 |
| B | Peer-reviewed observational study；ETS、RAND、AIR、Stanford 等權威研究機構 | 支撐機制、工作流與可行性 |
| C | ACL/ACM/AAAI/AIED conference paper；高品質 preprint；開放 benchmark | 支撐前沿能力與 prior art，必須標記審查狀態 |
| D | Vendor docs、媒體、專家文章 | 只支撐產品功能或搜尋線索，不支撐教育效果 |
| X | 無作者、無方法、無樣本、SEO 文章、只重述別人數字 | 排除 |

### 每筆來源最低欄位

- Full citation、DOI、永久 URL。
- 作者與機構。
- 研究對象、樣本數、州／學區／年級。
- 方法：RCT、QED、descriptive、review、benchmark、preprint。
- 直接支持哪個 claim；不得越級推論。
- Exact page/table/line 或短摘錄。
- 限制與反證。
- 可否用於 Demo、Devpost、README。

## 四、六輪搜尋流程

### Pass 1：教育測量理論

目的：驗證「假說—證據—鑑別—確認」是否有測量學基礎。

搜尋庫：National Academies、ETS、ERIC、IES。

核心字串：

```text
site:nationalacademies.org educational assessment reasoning from evidence uncertainty student cognition
site:ets.org evidence-centered design student model evidence model task model mathematics
site:ies.ed.gov diagnostic assessment mathematics solution strategies reliability consequential validity
"assessment triangle" cognition observation interpretation mathematics
```

### Pass 2：美國數學迷思與補救

目的：建立 algebra taxonomy，驗證錯因是否持續、是否值得教。

```text
site:ies.ed.gov algebra misconceptions diagnostic testlet variables equality graphing
site:eric.ed.gov middle school algebra misconceptions distributive property negative sign
"Persistent and Pernicious Errors in Algebraic Problem Solving"
site:ies.ed.gov incorrect worked examples algebra misconceptions practice guide
```

### Pass 3：教師工作流與需求

目的：驗證教師是否常用 formative data、現有診斷是否太耗時、何種輸出有用。

```text
site:ies.ed.gov teachers formative data tailor instruction group students report
site:ies.ed.gov diagnostic mathematics solution strategies teacher time
site:nces.ed.gov TALIS United States teachers grading stress
site:rand.org American Educator Panels math teachers data student work
```

### Pass 4：手寫、多模態與 misconception diagnosis

目的：驗證 GPT 類模型真實能力與失敗模式。

```text
"Can Vision-Language Models Evaluate Handwritten Math" FERMAT
"multimodal error detection" handwritten student math benchmark
"Using Large Language Models To Diagnose Math Problem-solving Skills At Scale"
"Malrule Reasoning Accuracy" student misconception
"Correct Answer Trap" student reasoning AI tutor
```

### Pass 5：反證、可靠性與風險

目的：主動搜尋會推翻 pitch 的證據。

```text
LLM student misconception diagnosis false positives cross-template generalization
AI automated scoring constructed response validity human oversight ETS
site:nist.gov AI RMF human oversight uncertainty explainability
site:ed.gov artificial intelligence education humans in the loop inspectable overridable
```

### Pass 6：隱私、採購與 evidence tier

目的：把 payer 敘事從「有錢」改成「能試點需要什麼證據」。

```text
site:studentprivacy.ed.gov FERPA online educational services vendor PII school official
site:ftc.gov COPPA schools education technology operator consent
site:ies.ed.gov WWC ESSA tiers evidence intervention sample setting
site:ed.gov Title I evidence-based intervention education technology allowable use
```

## 五、已找到的高價值來源清單

### A. 教育測量與概念核心

#### A1. National Research Council — *Knowing What Students Know*（2001）

- URL：https://doi.org/10.17226/10019
- 開放頁：https://www.nationalacademies.org/read/10019/chapter/4
- 等級：A
- 支持：assessment 是從 observation 推論 cognition；結果常 incomplete、inconclusive、amenable to more than one explanation。
- 對提案：最強理論依據。支持候選假說、alternative explanation、verification experiment、abstain。
- 限制：理論框架，不驗證 LLM。

#### A2. ETS — Evidence-Centered Design

- URL：https://www.ets.org/Media/Research/pdf/gorin_assessment_evidential_reasoning.pdf
- 等級：B
- 支持：Student Model、Evidence Model、Task Model 必須連動；task 用來取得能支持或反駁 claim 的 observation。
- 對提案：可把 verification experiment 正式映射為 task model；`predicted_response_pattern` 映射為 evidence rule。
- 搜尋後續：Mislevy、Steinberg、Almond 2003/2006 原始 ECD 文獻。

#### A3. IES/REL Southeast — GloSS/IKAN diagnostic assessment（2020）

- URL：https://ies.ed.gov/use-work/resource-library/report/descriptive-study/reliability-and-consequential-validity-two-teacher-administered-student-mathematics-diagnostic
- PDF：https://ies.ed.gov/sites/default/files/rel-southeast/document/2025/10/REL_2020039.pdf
- 等級：A
- 支持：solution strategies 對教師較有用；教師用結果決定 instruction、grouping、intervention。
- 關鍵需求：只有 57% 教師認為有足夠時間對所有學生施作一對一 GloSS；97% 仍認為值得。
- 對提案：最接近「人工晤談有效但不易規模化」的美國現場證據。
- 限制：K–8 number knowledge；工具源自 New Zealand；不是 LLM 或手寫代數。

#### A4. IES/WWC — *Using Student Achievement Data to Support Instructional Decision Making*（2009）

- URL：https://ies.ed.gov/ncee/wwc/practiceguide/12
- 等級：A
- 支持：資料須進入 ongoing cycle of instructional improvement。
- 對提案：heatmap 不能是終點；必須連到 next instructional action。
- 限制：部分建議 evidence level 為 minimal。

#### A5. IES 2019 — Data-Driven Instruction RCT

- URL：https://ies.ed.gov/use-work/resource-library/report/evaluation-report/evaluation-support-using-student-data-inform-teachers-instruction
- 等級：A，反證
- 發現：特定密集 DDI support 未改善學生 achievement，且可能未改變教師 data use 或 classroom practice。
- 對提案：dashboard + report 不足。Demo 必須展示教師決策改變，不能由「看見資料」直接跳到 impact。

### B. Algebra error、taxonomy 與診斷後教學

#### B1. Russell, O'Dwyer & Miranda — DAAS（2009）

- DOI：https://doi.org/10.3758/BRM.41.2.414
- IES：https://ies.ed.gov/use-work/awards/bridging-gap-applying-algebra-cognition-research-develop-and-validate-diagnostic-classroom-algebra
- 等級：A/B
- 支持：misconception reports + instructional materials 的 pilot precedent。
- 對提案：intervention hypothesis，不是產品有效性證明。

#### B2. Booth et al. — *Persistent and Pernicious Errors in Algebraic Problem Solving*（2014）

- URL：https://docs.lib.purdue.edu/jps/vol7/iss1/3/
- DOI：https://doi.org/10.7771/1932-6246.1161
- 等級：B
- 支持：部分 algebra errors 持續且能預測後續 achievement difficulty；錯誤重要性與時間點不同。
- 對提案：taxonomy 不應把所有錯誤等權；可加入 persistence/priority 欄位。

#### B3. Bush & Karp — *Prerequisite Algebra Skills and Associated Misconceptions*（2013 review）

- DOI：https://doi.org/10.1016/j.jmathb.2013.07.002
- 等級：B
- 支持：以 Common Core domains 整理 middle-grade prerequisite algebra misconceptions。
- 對提案：建立 8–12 節點 MVP taxonomy 的較好來源。

#### B4. IES/WWC — *Teaching Strategies for Improving Algebra Knowledge*（2015/2019）

- URL：https://ies.ed.gov/ncee/wwc/practiceguide/20
- PDF：https://ies.ed.gov/ncee/WWC/Docs/PracticeGuide/WWC_Algebra_PG_Revised_02022018.pdf
- 等級：A
- 支持：使用 solved、incomplete、incorrect problems 讓學生分析 reasoning；incorrect examples 可促進批判思考。
- 對提案：教師確認後的 P0 action 可用「展示對照錯解 + 自我解釋」，比自由生成微課更有證據。

#### B5. IES — MathByExample / AlgebraByExample

- URL：https://ies.ed.gov/learn/blog/using-mistakes-vehicle-learning-mathematics-research-practice-scale-education
- Research：https://www.serpinstitute.org/math-by-example/research
- 等級：A/B
- 支持：將錯誤例子、解釋提示嵌入既有課堂工作流；有多學區 randomized studies。
- 對提案：可用現成 evidence-based remediation format；避免自行生成未驗證微課。

### C. 美國教師工作流

#### C1. REL Central — Nebraska teacher data use（2021）

- URL：https://ies.ed.gov/use-work/resource-library/report/descriptive-study/how-nebraska-teachers-use-and-perceive-summative-interim-and-formative-data
- 等級：A
- 發現：353 所學校；使用者幾乎每週使用 formative data 來調整內容、分組、追加支援。
- 對提案：workflow frequency 與 action 都對得上。
- 限制：self-report；單州。

#### C2. NCES TALIS 2018 U.S.

- URL：https://nces.ed.gov/surveys/talis/talis2018/default.asp
- 等級：A
- 發現：美國 grade 7–9 教師工時與壓力高；「too much grading」是較常見壓力源之一。
- 對提案：可支撐 grading burden，但不能直接等同 misconception-analysis burden。

#### C3. NCES NTPS teacher hours

- URL：https://nces.ed.gov/surveys/ntps/estable/table/ntps/ntps_trend_6811_t12n
- 等級：A
- 發現：2020–21 public-school full-time teachers 每週約 52 小時工作，contract 約 38.4 小時。
- 對提案：只作背景，不宜拿來聲稱本工具節省特定分鐘。

### D. AI、手寫數學與 prior art

#### D1. FERMAT — *Can Vision-Language Models Evaluate Handwritten Math?*（ACL 2025）

- URL：https://aclanthology.org/2025.acl-long.720/
- PDF：https://aclanthology.org/2025.acl-long.720.pdf
- 等級：C，peer-reviewed conference
- 資料：2,244 份手寫錯誤解答；grades 7–12；error detection/localization/correction。
- 發現：多數模型仍困難；最佳模型在 error correction 約 77%；手寫 input 的 localization 弱於 printed/text。
- 對提案：強可行性先例 + 強風險證據；可借 benchmark taxonomy 與 eval design。
- 缺口：FERMAT 是人工注入錯誤，非真實學生 misconception diagnosis。

#### D2. MathWriting（Google Research, ICLR 2024）

- URL：https://arxiv.org/abs/2404.10690
- OpenReview：https://openreview.net/forum?id=3oQX0a8O5j
- Code/data：https://github.com/google-research/google-research/tree/master/mathwriting
- 等級：C
- 支持：公開的大型 handwritten mathematical expression recognition dataset；可驗證辨識層。
- 限制：expression transcription，不是多步認知診斷。

#### D3. ErrorRadar（ICLR 2025 submission）

- URL：https://openreview.net/forum?id=GeTBk67mK6
- 等級：C
- 支持：K–12 multimodal error detection benchmark，含 real-world student problem-solving data。
- 對提案：補充 error localization 評測。
- 限制：確認最終 acceptance 狀態與資料授權後再引用為正式 peer-reviewed evidence。

#### D4. MalruleLib（2026 preprint + open source）

- URL：https://arxiv.org/abs/2601.03217
- Code：https://github.com/luffycodes/malrulelib
- 等級：C，preprint
- 資料：101 mal-rules、498 templates、step traces、67 learning-science sources。
- 發現：跨題型 misconception prediction 約 40.5% answer-only、46.5% with steps；signed numbers 約 35%。
- 對提案：可作 taxonomy seed、adversarial eval、cross-template holdout；直接證明「解題能力 ≠ 學生模型能力」。
- 風險：若直接採用，需遵守 license、引用並查重 taxonomy provenance。

#### D5. *A Benchmark for Math Misconceptions*（2024 preprint）

- URL：https://arxiv.org/abs/2412.03765
- 等級：C
- 資料：55 algebra misconceptions、220 diagnostic examples、5 位 middle-school math educators 回饋。
- 發現：topic-constrained + educator feedback 下最高約 83.9%；4/5 教師有使用興趣。
- 對提案：比 8–12 條自製 taxonomy 更快取得文獻化 seed；仍需確認資料與 license。

#### D6. *Using Large Language Models to Diagnose Math Problem-solving Skills at Scale*（ACM L@S 2024）

- URL：https://yoonsu0816.github.io/assets/files/l%40s2024-wip.pdf
- 等級：C
- 支持：已有 LLM-at-scale 診斷 pipeline prior art。
- 對提案：novelty review 必查；比較其 input、taxonomy、accuracy、expert evaluation。

#### D7. *Catching the Correct Answer Trap*（AIED 2026）

- URL：https://arxiv.org/abs/2605.23925
- 狀態：作者註明將刊於 AIED 2026
- 等級：C
- 資料：真實 Eedi responses。
- 發現：frontier model detection 約 84% vs fine-tuned T5 57%；realistic prevalence 下 false alarms 很高；需 human judgment。
- 對提案：必引。CAT 不是本團隊發明；支持 reason-first 與 HITL。

#### D8. *The Correct Answer Trap: Pedagogically-Grounded Detection and Feedback*（PEAF 2026 workshop）

- URL：https://arxiv.org/abs/2606.23205
- 等級：C，workshop paper
- 發現：提出 detect–verify–escalate、diagnostic follow-up、teacher-dashboard/autonomous-tutor modes。
- 對提案：高度相似 prior art。品質評分時最大風險。
- 差異化方向：紙本手寫 multi-step evidence；每候選的可執行預測；班級教學聚合；可重跑 eval。不可再用框架本身宣稱新穎。

#### D9. Stanford SCALE — handwritten student work study（2025 preprint repository）

- URL：https://scale.stanford.edu/ai/repository/seeing-big-picture-evaluating-multimodal-llms-ability-interpret-and-grade-handwritten
- 等級：B/C
- 發現：在 288 份 Ghana middle-school arithmetic handwritten responses 上，部分模型接近 human accuracy，但仍出現教育者少犯的錯誤。
- 對提案：顯示 narrow domain 可行；也提醒不要從 arithmetic grading 外推 algebra misconception diagnosis。

### E. AI 治理、隱私、採購

#### E1. U.S. Department of Education — *AI and the Future of Teaching and Learning*（2023）

- PDF：https://www.govinfo.gov/content/pkg/GOVPUB-ED-PURL-gpo229415/pdf/GOVPUB-ED-PURL-gpo229415.pdf
- 等級：A
- 支持：humans in the loop；教師是 instructional decision maker；AI 應 inspectable、explainable、overridable。
- 對提案：Teacher-in-the-loop、evidence step、veto、abstain 都有政策對齊。

#### E2. NIST AI RMF 1.0

- URL：https://airc.nist.gov/airmf-resources/airmf/
- Core：https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- 等級：A
- 支持：定義 human-AI roles、human oversight、TEVV、context-specific risk、continuous monitoring。
- 對提案：eval harness、role boundary、third-party API risk、failure logging。

#### E3. U.S. Department of Education Student Privacy

- URL：https://studentprivacy.ed.gov/resources/protecting-student-privacy-while-using-online-educational-services-requirements-and-best
- FERPA FAQ：https://studentprivacy.ed.gov/faq/i-want-use-online-tool-or-application-part-my-course-however-i-am-worried-it-violation-ferpa
- 等級：A
- 支持：學校需 vet vendor；school-official exception 有 direct control、purpose limitation、no unauthorized redisclosure 等條件。
- 對提案：Demo 禁 PII 只是起點；產線需 district approval、契約、retention/deletion controls。

#### E4. FTC COPPA FAQ

- URL：https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions
- 等級：A
- 支持：學校僅能為教育用途代父母同意；vendor 必須完整披露 collection/use/disclosure；不可另作 commercial use。

#### E5. IES/WWC ESSA Evidence Tiers

- URL：https://ies.ed.gov/ncee/wwc/essa
- 等級：A
- 支持：Tier 1/2 需適當 design、positive significant effect、sample/site 規模及 setting overlap。
- 對提案：30–36 份 synthetic eval 不構成採購級 effectiveness evidence；只能叫 technical feasibility/eval seed。

## 六、Proposal Claim → Evidence Map

| Proposal claim | 最佳來源 | 現況判定 | 下一步 |
| --- | --- | --- | --- |
| 單份作業不能唯一讀出錯因 | A1 National Academies | 強支持 | 加入核心文獻 |
| 假說需用下一題驗證 | A1 + A2 ECD | 理論強支持 | schema 映射 claim/evidence/task |
| solution steps 比總分有用 | A3 REL GloSS/IKAN | 美國現場支持 | 加入 §1/§2 |
| 人工診斷難規模化 | A3 只有 57% 有足夠時間 | 直接支持 | 取代過遠的 `$31T` 敘事 |
| 錯誤分析可指導教學 | B2/B4/B5 | 支持 | 下一步用 incorrect worked example |
| 教師會用 formative data 分組 | C1 REL Nebraska | 支持 | 加入 workflow evidence |
| AI 可讀手寫多步數學 | D1/D9 | 窄域可行 | 不可寫成熟能力；先跑 12-sample gate |
| AI 能可靠推斷 mal-rule | D4/D5/D7 | 部分支持、風險高 | cross-template holdout + abstain |
| CAT 是創新 | D7/D8 | 不成立 | 引用 prior art，重新定義差異化 |
| HITL 符合責任設計 | E1/E2 | 強支持 | 保留并引用 |
| dashboard 會改善成績 | A5 | 未支持，有反證 | 改成待驗證；展示 action change |
| Title I 預算代表可採購 | E5 | 不成立 | buyer interview + pilot evidence plan |
| synthetic blind test 是有效性證據 | E5 | 不成立 | 稱 technical eval，不稱 effectiveness |

## 七、可驗證搜尋登錄表

後續每次搜尋追加一列；避免重複查找與來源漂移。

| Search ID | 日期 | Query | Database/domain | Top result | Include? | 理由 | Follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S001 | 2026-07-14 | `site:nationalacademies.org educational assessment reasoning from evidence uncertainty` | National Academies | *Knowing What Students Know* | Yes/A | 直接支持 inference uncertainty | 抽 chapter/page |
| S002 | 2026-07-14 | `site:ies.ed.gov diagnostic mathematics solution strategies teacher time` | IES | REL GloSS/IKAN | Yes/A | 直接支持價值與時間瓶頸 | 抽 57%/97% 表格 |
| S003 | 2026-07-14 | `site:ies.ed.gov teachers formative data group students` | IES | REL Nebraska | Yes/A | 美國教師 workflow | 查 state/generalizability |
| S004 | 2026-07-14 | `Can Vision-Language Models Evaluate Handwritten Math FERMAT` | ACL | FERMAT | Yes/C | 技術 benchmark | 下載 dataset/license |
| S005 | 2026-07-14 | `Malrule Reasoning Accuracy student misconception` | arXiv/GitHub | MalruleLib | Yes/C | cross-template failure | 查 affiliations/license |
| S006 | 2026-07-14 | `Correct Answer Trap student reasoning AI tutor` | AIED/arXiv | CAT papers | Yes/C | prior art + risk | novelty diff matrix |
| S007 | 2026-07-14 | `site:ed.gov AI education humans in loop` | ED/GovInfo | AI future report | Yes/A | HITL policy | 抽 exact page |
| S008 | 2026-07-14 | `site:studentprivacy.ed.gov FERPA online services vendor` | ED | FERPA guidance | Yes/A | production requirements | contract checklist |
| S009 | 2026-07-14 | `site:ies.ed.gov WWC ESSA tiers` | WWC | ESSA evidence tiers | Yes/A | GTM evidence boundary | 定義 MVP claim |

## 八、下一輪缺口搜尋

尚未充分解答：

1. **Verification-question validity**：找 computerized adaptive testing、active diagnosis、expected information gain 研究；不能只靠 ECD 理論。
2. **Slip vs mal-rule reliability**：找 VanLehn、Sleeman、Cognitive Tutor 原始研究；確認一次錯誤與跨題重現需要多少 observation。
3. **Teacher confirmation accuracy**：教師也可能誤診；找 diagnostic judgment、pedagogical content knowledge、inter-rater reliability。
4. **Bias/accessibility**：手寫辨識對 dysgraphia、ELL、低畫質、不同書寫風格是否差異化失敗。
5. **Current competitors**：只用 vendor official docs 建功能矩陣；另做實測，避免行銷頁推論。
6. **District procurement**：找 district AI procurement rubric、state student-data privacy addenda、approved vendor requirements。
7. **Economic case**：找每份作業 review 時間、teacher confirmation time、cost per diagnosis；目前不能估 ROI。

下一輪字串：

```text
diagnostic question selection expected information gain student misconception
teacher diagnostic judgment mathematics misconception accuracy pedagogical content knowledge
inter-rater reliability teacher diagnosis student mathematics strategies
handwriting recognition bias dysgraphia student math accessibility
school district generative AI procurement rubric student data privacy vendor
mathematics teacher time analyzing student work study
```

## 九、建議執行節奏

### 0–2 小時：高價值整合

- 把 A1、A3、A5、D1、D4、D7、D8、E1 加進 proposal evidence map。
- 將「CAT/verify/escalate 是創意」改成 prior-art-aware differentiation。
- 把 synthetic blind test 改稱 technical eval。

### 2–4 小時：下載可重用資料

- FERMAT：確認 dataset、license、挑選 algebra subset。
- MalruleLib：確認 license、抽 signed numbers/distributive-property templates。
- Math misconception benchmark：確認 55 misconception taxonomy 與 220 examples 的 provenance。

### 4–6 小時：反證式 eval 設計

- Same-template 與 cross-template 分開。
- Handwritten 與 transcribed text 分開，隔離 vision error / reasoning error。
- Real misconception、synthetic mal-rule、slip、insufficient input 分開。
- 報 false-positive burden，不只 accuracy。

### 6–8 小時：GTM 與風險

- 依 E1/E2 做 HITL/override/abstain checklist。
- 依 E3/E4/OpenAI retention 做 data-flow diagram。
- 依 E5 把 evidence roadmap 寫成 technical feasibility → pilot usability → classroom effectiveness。

## 十、停止條件

搜尋不是無限。每個 Q 達以下條件即可停：

- 至少一筆 A/B 級支持來源。
- 至少一筆限制、反證或 null result。
- 核心數字已回到原始表格／頁碼。
- 已記錄研究對象與提案 target 是否一致。
- 已能決定：保留 claim、縮小 claim、改成 hypothesis、或刪除。

若只有 C/D 級來源，正文必須標記「emerging evidence」或「prior art」，不能寫成 established fact。
