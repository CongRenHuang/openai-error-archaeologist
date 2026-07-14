# 錯誤考古學家 v6：文獻複核與修訂報告

> 複核日期：2026-07-14
> 對象：`docs/proposals/01-error-archaeologist.md` v6
> 輸入：`docs/res/grok/vaildate-references-result.md` + 原始/官方來源獨立複核

## 總判

九筆文獻均真實存在，但提案目前有四個必修問題：

1. `[3]` 被錯用來承載 ESSER `$190B` 與 Hanushek `$31T`；兩項都須拆成獨立來源。
2. 「66% 公立學校開辦 HDT」不受 `[3][4]` 支持；NCES 2023–24 全年數字是 **46%**。
3. `[2]` 標題與連結不精確；其內容支持全國未恢復及高低分位分化，但不直接支持「沒有任何一州的八年級成績回到 2019」。
4. `[7]` 的 IES 網址錯誤；應為 `ies.ed.gov`。`+0.13 SD` 並非 Grok 所稱「幾乎肯定誤讀」，但必須精確寫成**控制 pretest 後，full intervention 相對 ability-report-only control 的組間差**。

完成下列 P0 修訂後，核心問題敘事可達「來源可追溯、數字與推論邊界一致」。

## Grok 查證結果需要更正之處

### Russell 2009：`+0.13 SD` 可保留，但原文需加限定

Grok 報告把 `+0.13 SD` 判為嚴重可疑，並以未調整 posttest 差距約 `0.81 SD` 取代。此判定不完整。

原論文同時報告：

- 未調整描述性差距：full intervention（Group 4）比 control（Group 1）高約 `0.81 SD`。
- 階層模型控制 pretest 後：Group 1 比 Group 4 低 `0.13 SD`，`p < .05`。
- Group 2 與 Group 4 的 `0.09 SD` 差異不顯著。
- misconception outcome 的組間差異未達顯著；作者仍將整體結果稱為 preliminary evidence。

來源：[Russell, O'Dwyer & Miranda 2009 原文 PDF](https://link.springer.com/content/pdf/10.3758/BRM.41.2.414.pdf)

因此不可寫成泛化的「介入效果量就是 +0.13 SD」，也不可用未調整 `0.81 SD` 當因果效果。建議正文：

> Russell, O'Dwyer & Miranda（2009）以 905 名學生、44 位教師進行四組 cluster-randomized pilot。控制 pretest 後，完整介入組在 algebra ability 上較僅有 ability report 的 control 高 0.13 SD（p<.05）；misconception outcome 的組間差異未達顯著。結果提供「診斷資訊與教材整合可能改善學習」的初步證據，但未證明 LLM 手寫診斷有效，也未能單獨識別診斷報告的效果。

## 逐筆複核

| 編號 | 判定 | 可保留內容 | 必要修訂 |
| --- | --- | --- | --- |
| `[1]` NAEP 2024 | 通過 | G8 math：28% at/above Proficient、61% at/above Basic、39% below Basic；全國仍低於 2019 | `61% Basic` 改成 `61% at or above Basic`，避免誤解為 Basic 單一層級 |
| `[2]` NAGB | 部分通過 | 全國所有受測年級/科目仍低於 2019；G8 math 2024 全國持平，高分位上升、低分位下降 | 改用真實頁名與 URL；刪除「無一州八年級回到 2019」，或另以 NAEP state table 逐州計算 |
| `[3]` Carbonari et al. | 部分通過 | 八學區中若干有效 tutoring 方案只服務約 1–2% 合資格年級學生 | 移除 ESSER `$190B`、Hanushek `$31T`；兩項不是此研究的原始結果 |
| `[4]` MDRC PLI | 通過 | pooled tutoring effect `0.06–0.09 SD`；約 `$1,200` 與 `$2,000`/生 | 刪除 `66%`；此報告不是全國學校普查 |
| `[5]` Moon / The 74 | 次要來源 | Tennessee 約 `$500`/四年級生、Texas mandate 缺 dedicated full funding | Tennessee 是四年級 literacy tutoring，不是數學；核心 pitch 建議刪除此旁支，或明寫「讀寫」及「二手政策整理」 |
| `[6]` Guryan et al. | 通過 | Chicago secondary math HDT RCT：`0.18–0.40 SD` | 將「小規模研究」改成「兩項 Chicago 大型 RCT」，避免錯誤描述研究規模 |
| `[7]` Russell et al. | 有條件通過 | 905 學生、44 教師、四組 cluster-randomized pilot；full intervention 有正向能力結果 | 使用上節精確表述；修正 IES URL；不可宣稱 misconception outcome 顯著 |
| `[8]` Kuo et al. | 通過 | CDM 可同時建模 skills 與 misconceptions | 正式卷期年份為 **2018**；2017 是 online-first/DOI 年份 |
| `[9]` CRS R48953 | 通過 | FY2025 Title I-A 約 `$18.4B` | 只能證明 payer 預算背景，不能證明本產品合格、可採購或有購買意願 |

## 正文 P0 修訂

### 1. 重寫「規模」段

建議替換：

> NAEP 2024 顯示，八年級數學 28% 學生達到或超過 Proficient、61% 達到或超過 Basic，故 39% 低於 Basic。NAEP Proficient 不等同州級「年級達標」。全國八年級數學平均分在 2024 相較 2022 無顯著變化，但仍低於 2019；總平均持平同時掩蓋高分位回升與低分位下降。

來源：[NAEP Grade 8 national trends](https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=8)、[NAGB 10 Takeaways](https://www.nagb.gov/powered-by-naep/the-2024-nations-report-card/10-takeaways-from-2024-naep-results.html)

刪除：

> 沒有任何一州的八年級成績回到 2019 疫情前水準。

原因：現有 `[2]` 頁面未直接提供此逐州結論。「全國尚未恢復」已足以支撐 pitch。

### 2. 重寫「強度」段

建議替換：

> 美國國會三輪 ESSER 共投入 `$189.5B` 支援 K–12 疫情應變與復甦。NCES School Pulse Panel 顯示，46% 公立學校在 2023–24 學年曾提供 high-dosage tutoring。MDRC 的八站隨機研究估計 tutoring pooled effect 為 `0.06–0.09 SD`，方案成本約 `$1,200–$2,000`/生；另一項八學區研究發現，部分效果較強的 tutoring 方案只覆蓋約 1–2% 合資格年級學生。

來源：[U.S. Department of Education ESSER `$189.5B`](https://covidreliefdata.ed.gov/)、[NCES 2023–24 HDT 46%](https://nces.ed.gov/learn/press-release/about-one-quarter-public-schools-reported-lack-focus-or-inattention-students-had-severe-negative)、[MDRC PLI](https://www.mdrc.org/work/publications/personalized-learning-initiative-interim-report)、[CALDER working paper](https://caldercenter.org/publications/impacts-academic-recovery-interventions-student-achievement-2022-23)

刪除或降級：

- 「HDT 為首要策略」：目前沒有對應來源。
- 「66% 公立學校開辦」：數字錯誤。
- 「規模化後效果衰減」：`0.06–0.09` 與 `0.18–0.40` 來自不同場域、樣本、年份與設計；可寫「低於過往 Chicago RCT」，不可直接宣稱 scale 是唯一因果原因。

### 3. 修正 `$31T`

若保留，正文改成：

> Hanushek 與 Strauss 估算，疫情學習損失可能使美國在 21 世紀損失約 `$31T` 的 GDP 現值；此為依技能與長期成長關係推算的模型估計，不是已發生支出。

來源：[Hanushek & Strauss, United States: The Size and Variation of the Pandemic Learning Losses](https://link.springer.com/chapter/10.1007/978-3-031-69284-0_13)

Demo 建議刪除。數字巨大、離教師工作流遠，增加被追問模型假設的成本。

### 4. 修正 pre-LLM 比較

`[7]` 能證明 DAAS 使用 10–12 題 multiple-choice testlets 與預編 misconception response，但不能代表 i-Ready、NWEA 現行產品所有題型或輸出。

建議改寫：

> DAAS 等診斷工具依賴預先設計的題目、misconception distractors 與重複作答模式；部分商用 adaptive assessment 主要提供技能或領域層級結果。它們與本提案的差異，是本提案直接處理日常紙本的開放式推導，並把候選假說綁定到學生寫出的證據步驟。

Devpost 若保留 i-Ready/NWEA 具名比較，必須補各產品官方技術文件；未補前刪除「只能出選擇題」「只輸出落後幾級」。

### 5. 修正 API 資料聲明

OpenAI API inputs/outputs 預設不用於訓練，但預設 abuse-monitoring logs 可能保留最多 30 天；應用層「處理後刪除圖片」不等於端到端 zero retention。

建議 FAQ：

> Demo 應用不持久化上傳影像；OpenAI API inputs/outputs 預設不用於模型訓練。平台仍可能依資料控制政策保留 abuse-monitoring logs 最多 30 天；Zero Data Retention 只適用於獲核准組織與合格 endpoint。因此 Demo 明文禁止真實學生 PII，不能宣稱端到端零留存。

來源：[OpenAI API data controls](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)、[OpenAI business data privacy](https://openai.com/business-data/)

## 建議修正版參考文獻

1. NCES. *2024 NAEP Mathematics Assessment: Grade 8 National Trends*. https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=8
2. National Assessment Governing Board. *10 Takeaways from the 2024 NAEP Results*. https://www.nagb.gov/powered-by-naep/the-2024-nations-report-card/10-takeaways-from-2024-naep-results.html
3. Carbonari, M. V., et al. *Impacts of Academic Recovery Interventions on Student Achievement in 2022–23*. CALDER Working Paper No. 303-0724. https://caldercenter.org/publications/impacts-academic-recovery-interventions-student-achievement-2022-23
4. Bhatt, M. P., et al. (2025). *Personalized Learning Initiative Interim Report: Findings from 2023–24*. MDRC. https://www.mdrc.org/work/publications/personalized-learning-initiative-interim-report
5. Guryan, J., et al. (2023). “Not Too Late: Improving Academic Outcomes among Adolescents.” *American Economic Review*, 113(3), 738–765. https://doi.org/10.1257/aer.20210434
6. Russell, M., O'Dwyer, L. M., & Miranda, H. (2009). “Diagnosing Students' Misconceptions in Algebra: Results From an Experimental Pilot Study.” *Behavior Research Methods*, 41(2), 414–424. https://doi.org/10.3758/BRM.41.2.414
7. Kuo, B.-C., Chen, C.-H., & de la Torre, J. (2018). “A Cognitive Diagnosis Model for Identifying Coexisting Skills and Misconceptions.” *Applied Psychological Measurement*. https://doi.org/10.1177/0146621617722791
8. Skinner, R. R., & Angert, J. (2026). *FY2025 State Grants Under Title I-A of the Elementary and Secondary Education Act*. CRS R48953. https://www.congress.gov/crs-product/R48953
9. U.S. Department of Education. *Education Stabilization Fund: ESSER*. https://covidreliefdata.ed.gov/
10. NCES. *Forty-Six Percent of Public Schools Provided High-Dosage Tutoring During 2023–24*. https://nces.ed.gov/learn/press-release/about-one-quarter-public-schools-reported-lack-focus-or-inattention-students-had-severe-negative
11. Hanushek, E. A., & Strauss, B. (2024). “United States: The Size and Variation of the Pandemic Learning Losses.” https://link.springer.com/chapter/10.1007/978-3-031-69284-0_13
12. IES. *Bridging the Gap: Applying Algebra Cognition Research to Develop and Validate Diagnostic Classroom Algebra Testlet*. https://ies.ed.gov/use-work/awards/bridging-gap-applying-algebra-cognition-research-develop-and-validate-diagnostic-classroom-algebra
13. OpenAI. *Data Controls in the OpenAI Platform*. https://platform.openai.com/docs/models/default-usage-policies-by-endpoint

`Moon / The 74` 可留在政策背景附錄，不建議占核心九筆文獻位置。

## 尚未被現有文獻支持的提案主張

以下不是必然錯，但不能標成已驗證事實：

- i-Ready、NWEA「主要只輸出落後幾級」及「只能選擇題」。
- IntelGrader、Ed.ai、GradingPal、Eedi、Glimmer 的精確產品能力差異。
- 換 taxonomy 即能適配 Common Core 與 TEKS。
- 自動鑑別實驗能可靠區分 slip 與 mal-rule。
- 工具能節省教師多少時間、提高 tutoring 資源命中率。
- Title I-A 可直接支付本產品。

處理方式：產品官方文件支持競品能力；盲測支持診斷能力；教師訪談支持工作流；buyer 訪談支持採購。完成前統一使用「假說」「待驗證」「roadmap」。

## 修訂優先順序

### P0：提交前必改

1. 刪 `66%`，改 NCES `46%` 並新增來源。
2. 拆分 ESSER、CALDER、Hanushek 三個來源。
3. 精確改寫 Russell `+0.13 SD` 與 outcome 邊界。
4. 修正 `[2]` 標題/URL、`[7]` IES URL、`[8]` 年份。
5. 把「規模化導致效果衰減」改成描述性比較。
6. API FAQ 加入最長 30 天 abuse-log 留存限制。

### P1：提高評審可信度

1. 移除無官方技術文件支持的具名競品斷言。
2. 文獻表使用完整可點連結、年份、卷期、DOI。
3. Devpost 另設「Evidence limits」小節，明示外部研究驗證的是方向，不是本產品效果。
4. 把本產品證據與外部證據分欄：`Problem evidence`、`Intervention precedent`、`Our eval`。

## 驗收標準

修訂後應能回答：

- 每個數字能否點到直接支持該數字的來源？
- 來源研究對象、介入、outcome 是否與正文用詞一致？
- 描述性跨研究比較是否被誤寫成因果？
- 外部文獻是否被誤寫成本產品驗證？
- 政府預算是否被誤寫成產品採購意願？

五項皆為「否」於誤用、「是」於可追溯，才可在 Demo/Devpost 使用。
