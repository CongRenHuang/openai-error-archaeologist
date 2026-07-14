# 提案 A(首推):錯誤考古學家(Error Archaeologist)— 錯因假說診斷引擎

> 一句話:**AI 不猜學生腦中想什麼;它提出候選錯因、指出證據在第幾步,再生成一個帶可驗證預測的鑑別實驗來收斂診斷。**
>
> 版本 7(2026-07-14):依文獻複核報告(docs/res/codex/reference-revision-report.md)修訂。P0:66% → NCES 46%;ESSER/CALDER/Hanushek 拆為獨立來源;Russell +0.13 SD 精確化(控制 pretest、misconception outcome 不顯著);刪「無一州回到 2019」;「規模化衰減」改描述性比較;API 留存加 30 天 abuse-log 邊界。P1:具名競品斷言降級為品類概括;參考文獻改版為 13 筆可點連結;田納西/德州旁支降為政策附錄;新增 Evidence limits 分欄。v6 教育測量框架(slip vs mal-rule、error_disposition、Correct Answer Trap、評審四問)保留。

---

## 第一部:這個問題值不值得解

## 1. 問題

老師改作業只看對錯,看不出錯誤背後的原因。同一個錯誤答案背後可能藏著多種不同成因——例如 `-3(x - 2) = -3x - 6` 可能是分配律迷思、負號規則錯誤、粗心或抄寫疏忽,各需完全不同的處置。篩選層(誰落後)與補救層(開課/家教)都有規模化工具;錯因診斷層沒有同等規模化的工具(既有方案的限制見 §3 比較表)。

**誠實前提**:單份作業**無法唯一辨識**錯因——同一錯誤可來自迷思(mal-rule)、粗心(slip)、抄寫、題意誤讀,或輸入轉錄雜訊。因此本產品不做「AI 宣判」,做「AI 提出候選假說 + 每個假說的證據 + 一個帶預測的鑑別實驗」,由老師確認、由學生的下一個回答收斂。

**測量邊界(教育診斷基本功)**:

| 現象                       | 含義                | 產品該做什麼                      |
| -------------------------- | ------------------- | --------------------------------- |
| 可重現的錯誤規則(mal-rule) | 系統性迷思          | 候選假說 + 鑑別實驗               |
| 偶發漏寫/過載(slip)        | 非迷思              | 優先 `likely_slip`,勿觸發補救標籤 |
| 轉錄/影像歧義              | 測量誤差,非認知     | `insufficient_evidence`,abstain   |
| 終端答案正確但過程錯       | Correct Answer Trap | 步驟優先診斷;仍可出候選(見 §4)    |

這不是退讓,是比「AI 讀心」更科學也更可信的產品定位。

## 2. 可驗證性:痛點的規模與強度(原則 01)

**規模**

- NAEP 2024(美國官方「Nation's Report Card」):八年級數學 **28% 達到或超過 Proficient、61% 達到或超過 Basic,故 39% 低於 Basic** [1]。注意:NAEP Proficient 是高標,**不等於年級達標**——本提案**不使用**「72–73% 未達精熟」這種易誤導的說法;低於 Basic 的近四成學生才是補救政策的目標人群。
- 全國八年級數學平均分 2024 相較 2022 **無顯著變化,但仍低於 2019**;總平均持平掩蓋 **K 型分化**——高分位回升、低分位下降,高低差距擴大 [1][2]。產品服務的是「為何同一班有人卡住」的診斷層,不是全國平均分敘事。
- 經濟代價:Hanushek 與 Strauss 估算,疫情學習損失可能使美國在 21 世紀損失約 **$31T 的 GDP 現值**——此為依技能與長期成長關係推算的**模型估計,不是已發生支出** [11]。Demo 建議刪除此數字:巨大、離教師工作流遠,徒增被追問模型假設的成本(§11)。

**強度——政府已證明願意付費,但主力解法無法規模化**

- 美國國會三輪 ESSER 共投入 **$189.5B** 支援 K–12 疫情應變與復甦 [9]。
- NCES School Pulse Panel:**46%** 公立學校在 2023–24 學年曾提供高劑量家教(HDT)[10]。
- HDT 方案成本約 **$1,200–$2,000/學生/年**,MDRC 八站隨機研究估計 tutoring pooled effect **0.06–0.09 SD** [4];CALDER 八學區研究:部分效果較強的 tutoring 方案僅覆蓋約 **1–2%** 合資格年級學生 [3]。
- 上述 pooled effect **低於** Guryan 等兩項 Chicago 大型 RCT 的 0.18–0.40 SD [5]——不同場域、樣本、年份與設計,**僅為描述性比較**,不宣稱「規模化」是唯一因果原因。

**教育學證據——誠實表述其邊界**

- Russell, O'Dwyer & Miranda (2009):905 名學生、44 位教師的四組 cluster-randomized pilot。**控制 pretest 後**,完整介入組(診斷報告 + 對症教材)在 algebra ability 上較**僅有 ability report 的 control 組**高 **0.13 SD**(p<.05);**misconception outcome 的組間差異未達顯著**;作者將整體結果定位為 preliminary evidence [6][12]。
- **該研究支持的是**:「診斷資訊與教材整合可能改善學習」的初步證據。**它不支持**:LLM 手寫診斷有效;也**無法單獨識別**診斷報告本身的效果。本提案引用它作為 **intervention hypothesis 依據**,非宣稱複製其效果。我們自己的有效性證據來自 §10 的盲測。

**證據分欄(Evidence limits)**——外部研究驗證的是方向,不是本產品效果:

| 欄位                   | 內容                                                  | 來源                |
| ---------------------- | ----------------------------------------------------- | ------------------- |
| Problem evidence       | NAEP 低分位承壓;tutoring 成本與覆蓋率瓶頸             | [1][2][3][4][9][10] |
| Intervention precedent | 「診斷 + 對症教材」的初步正向證據                     | [5][6]              |
| Our eval               | 本產品診斷能力:§10 盲測 + holdout,demo 公開含失敗案例 | 自產                |

## 3. 需求驅動:LLM 之前的世界(原則 04)

| 世代      | 美國既有解法                                                                          | 限制                                                                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 人力      | 高劑量家教(1 對 1–2,診斷發生在家教腦中)                                               | $1,200–2,000/生/年;有效方案僅覆蓋約 1–2% 合資格學生 [3][4]                                                                                                                                                  |
| 規則/題庫 | 診斷測驗:DAAS(10–12 題選擇題 testlets)[6];商用 adaptive assessment(i-Ready、NWEA MAP) | DAAS 類依賴預編題目、misconception distractors 與重複作答模式;部分商用 adaptive assessment 主要提供技能/領域層級結果(具名產品的題型與輸出細節**未逐一查核官方技術文件**);皆難以低成本處理學生開放式手寫推導 |
| 傳統 ML   | 認知診斷模型(CDM/DINA)[7]、ITS(Cognitive Tutor/ASSISTments)                           | 依賴預先設計的 Q-matrix 與封閉題型;ITS 只在自家系統內診斷,學生日常紙本作業碰不到                                                                                                                            |

**LLM 帶來的能力差異**:

1. **處理自由形式手寫推導**——既有方案難以低成本處理的輸入形態。
2. **不需預編誘答題庫**——新單元不需專家迴圈設計選項,邊際成本顯著低於題庫模式(具體成本比待產線驗證)。
3. **證據定位**——把候選錯因錨定到「學生自己寫的第幾步」,需要對推導過程的語意理解。
4. **即時生成鑑別實驗**——針對當下出現的候選錯因對,生成預測可區分的題目。題庫模式無法預知會出現哪對候選。

**Day-1 gate**:GPT-5.6 為競賽要求。開賽日第一件事:取得官方公布的實際 model ID 與 API access,寫入設定檔——不假設 `gpt-5.6` 字串存在。pipeline 對模型版本無耦合(§5)。

**市場定位:不是另一個批改器**(原則 04 延伸)

| 陣營           | 代表(類型)                                                            | 優化目標                        | 與本提案差異                                                                        |
| -------------- | --------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| 評量/批改導向  | 手寫數學批改與 partial credit 工具(IntelGrader、Ed.ai、GradingPal 等) | 行政效率:分數、錯步標註、練習卷 | 我們**不給分**;輸出可否證假說 + 鑑別實驗,優化**教學決策品質**                       |
| 學生解題消費端 | 拍照解題 app                                                          | 給出步驟與答案                  | 面向老師決策;demo 不給「抄答案」主路徑                                              |
| 診斷/家教平台  | Eedi、Glimmer 等                                                      | 迷思 + 干預,部分有 RCT/知識圖譜 | 我們主打**日常紙本手寫開放推導** + **帶可驗證預測的鑑別實驗**;八天內不宣稱 RCT 有效 |

誠實:Eedi 等已有更長驗證史。表中具名產品僅為品類舉例,能力描述是**品類概括,個別產品能力未逐一查核官方技術文件**——Devpost 若保留具名比較,須先補各產品官方文件,否則改用匿名品類。八天交付 = 盲測 + HITL + 可演示閉環,文案**不寫 scientifically validated**。

## 4. 解決方案:假說 → 證據 → 鑑別實驗 → 確認

1. 老師拍照上傳學生手寫作業(demo 主線用預驗證樣本 + live 上傳加分)。
2. **推理管線(Correct Answer Trap 防禦)**:先對步驟間數學等價/邏輯連貫做診斷,再比對終端答案——**不**因最終答案正確而略過過程錯。答案對 + 過程錯仍可輸出候選 mal-rule(進 demo 與盲測)。
3. 模型視覺理解手寫過程,輸出**固定 structured output**:

```json
{
  "observed_error": "將 -3(x-2) 展開為 -3x-6",
  "final_answer_correct": false,
  "input_uncertainty": null,
  "diagnosis_status": "multiple_plausible_hypotheses",
  "error_disposition": "candidate_mal_rule",
  "candidate_misconceptions": [
    {
      "id": "NEG_DIST",
      "label": "負號未分配到第二項",
      "evidence_steps": ["step_2"],
      "predicted_response_pattern": "對 -4(b-3) 會答 -4b-12"
    },
    {
      "id": "DIST_FIRST_ONLY",
      "label": "只對括號內第一項做分配",
      "evidence_steps": ["step_2"],
      "predicted_response_pattern": "對 -4(b-3) 會答 -4b-3"
    }
  ],
  "alternative_explanation": "亦可能為抄寫疏忽(僅此一步出錯,其餘步驟正確)",
  "verification_experiment": {
    "question": "展開 -4(b - 3)",
    "correct_answer": "-4b + 12",
    "predictions": [
      { "candidate_id": "NEG_DIST", "predicted_answer": "-4b - 12" },
      { "candidate_id": "DIST_FIRST_ONLY", "predicted_answer": "-4b - 3" }
    ],
    "convergence_rule": "回答匹配某候選預測 → 該候選獲支持;匹配 correct_answer → 兩候選皆降權,傾向 slip;不匹配任何預測 → abstain,交老師口頭確認"
  },
  "abstain_reason": null
}
```

**`error_disposition` 啟發式**(寫明是 heuristic,非校準後閾值;八天可 eval):

| 值                   | 觸發條件(摘要)                                                    | 下游                                                  |
| -------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| `likely_slip`        | 僅 1 步錯且前後步驟自洽;或錯誤模式與任何 taxonomy mal-rule 都不符 | 不進熱力圖「迷思」桶;建議老師口頭確認,可出低成本重做  |
| `candidate_mal_rule` | 錯誤可映射 taxonomy;或同規則跨步驟可重現                          | 出候選 + 鑑別實驗                                     |
| `ambiguous`          | slip 與 mal-rule 皆合理                                           | 必須鑑別實驗;無法可區分 → abstain                     |
| `insufficient_input` | 影像糊、符號歧義會改數學義(2/z、×/x)、步驟缺到無法推理            | `diagnosis_status=insufficient_evidence`,強制 abstain |

**輸入不確定規則**:若模型無法在合理置信下解析會改變數學意義的符號,設 `input_uncertainty` 說明缺什麼,**禁止**硬出迷思標籤(避免幻覺診斷)。

4. **鑑別實驗**(本產品核心創新——不是「生成一題」,是**生成帶可驗證預測的實驗**):
   - 生成前先為每對候選推導預測答案;**兩候選預測相同 → 換題重生成;無法生成可區分題 → abstain**。
   - 學生回答後按 convergence_rule 更新診斷——這讓 AI 的推理可被下一筆資料否證。
5. 老師一鍵確認/否決 → 確認後才進班級熱力圖與後續處置。
6. **診斷後教師動作(零生成也可閉環)**:確認後 UI 給出可執行下一步——(a) 班級聚合「N% 同一迷思,下節 10 分鐘教 X」;(b) 把鑑別題當 formative check 重用;(c) 可選 P2 模板練習。**不**把自由生成微課當 demo 必要條件。
7. 對症練習(P2):時間允許則由確認後的錯因觸發**模板化**練習;不承諾即時自由生成題庫(生成題正確性與課綱對齊未在八天內證明)。

**診斷狀態三值**(取代 v4 的個別 confidence band——per-candidate 分級與「無競爭解釋」定義自相矛盾,且 LLM 自報信心未經校準):

- `single_supported_hypothesis`:僅一個候選有證據支持
- `multiple_plausible_hypotheses`:多個合理候選 → 觸發鑑別實驗
- `insufficient_evidence`:影像/推導不足或 `input_uncertainty` → abstain,說明缺什麼
- 不顯示任何數值信心;數值校準列 roadmap(需 calibration set)。

**GPT-5.6 運用深度(Build Week 評分①)**:多模態手寫理解(非 OCR 流水線,懂步驟間推導關係)× 溯因推理(從錯誤結果反推候選規則)× structured output(固定 schema 可聚合、可 eval)× **鑑別實驗生成**(含預測推導與自我檢核)× abstain 機制。「假說—證據—實驗—收斂」是完整推理迴圈,不是單發 prompt。

## 5. 可重用性:框架與 AI 解耦(原則 02)

```
┌───────────────────────────────────────────────────────┐
│  錯因考古 pipeline(領域無關核心)                          │
│  產出物 → 候選假說 → 證據定位 → 鑑別實驗 → 教師確認 → 聚合  │
└───────────────────────────────────────────────────────┘
        ↑ 可插拔               ↑ 可插拔          ↑ 可插拔
   AI 推理引擎層          Taxonomy 設定檔      輸入/輸出 adapter
  (model ID 設定檔化)    (JSON,按領域置換)   (MVP 僅拍照)
```

**把 LLM 抽掉,框架仍成立**:「收集產出物 → 歸因候選錯誤 → 鑑別驗證 → 聚合成教學決策」可由人工執行,正是特教與家教領域的錯誤分析 SOP——LLM 讓這套方法論第一次可規模化。

跨領域重用(程式 bug 迷思、語言學習母語遷移、醫學臨床推理)是**架構推論 + roadmap**,MVP 不演示、不宣稱已證明。

## 6. 通用性:部署適應彈性(原則 03)

- Taxonomy = JSON 設定檔:換州課綱(Common Core ↔ 德州 TEKS)= 換檔案——但**換 taxonomy ≠ 換客戶**;真實客戶遷移還涉及輸入格式、隱私協議、SIS 整合。
- 誠實現況:adapter 與 schema contract **尚未定義**,換客戶所需改碼量**未經任何真實客戶驗證**。MVP 交付的是「taxonomy 外置 + model ID 設定檔化」兩個解耦事實,其餘為 roadmap(LMS 匯出、LTI 1.3/OneRoster/Ed-Fi、Clever/ClassLink SSO)。
- 定位為既有評估系統(i-Ready、NWEA MAP)的**錯因層擴充**而非替代:它們篩「誰落後」,我們答「為什麼」——採購上是加購件,不是換系統。

## 7. 商業價值:價值鏈三角色(原則 05)

| 角色          | 是誰                                                                                                                 | 說明                                                                                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User**      | 老師(每天用)、學生(收到鑑別題與練習)                                                                                 | 使用者不付錢                                                                                                                                                                                                                                |
| **Payer**     | 學區/州政府(假說,待訪談驗證)                                                                                         | 預算背景:Title I-A 約 $18.4B [8]——**僅證明 payer 預算存在,不證明本產品合格、可採購或有購買意願**;採購路徑屬假說,以 buyer 訪談補強。州級家教專款案例(田納西/德州)屬二手政策整理、且田納西為四年級**讀寫**非數學——降級為政策附錄,不入核心論證 |
| **Incumbent** | 順風方:補教/家教機構、教材商(賣鏟子策略)。 擋路方:診斷測驗商(i-Ready/NWEA)——預期以信效度質疑反擊,正面應對即 §10 盲測 |                                                                                                                                                                                                                                             |

**八天內不證明市場規模,證明真實需求**——四場結構化訪談(各 20 分鐘),user 與 payer 分開驗證:

- 驗證 **User**:2 位美國 Grade 7–9 數學老師(每週花多久分析錯題?如何分組?願意在流程哪一步確認?)+ 1 位 tutor coordinator(診斷報告是否改變家教資源分配?)。
- 驗證 **Payer**:1 位 district administrator 或 tutoring program buyer(採購決策流程?什麼證據能進入試點?)——教師訪談只能驗證 user,payer 必須另問。
- 產出:可引用的訪談紀要進 Devpost(取得公開引用許可);Demo 可寫 "Reviewed by one US middle-school math educator and one mathematics-education researcher",**不寫 "scientifically validated"**。

---

## 第二部:憑什麼是我們解它

## 8. 可行性邊界:現況 / 目標 / 驗收(原則 06)

> 誠實聲明:截至 2026-07-14,repo 僅有提案文件——**所有元件均未開始**。下表為交付合約,非現狀描述。

| 元件                                           | Current | Demo target(7/21)                             | Acceptance test(如何證明完成)                                                                        |
| ---------------------------------------------- | ------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 照片 → 候選假說 + 證據 + disposition + abstain | 未開始  | 真實運作:12 個代數樣本(含 CAT)+ live 上傳加分 | repeatable eval harness:schema 合法率 100%、證據步驟正確率、disposition 一致率、abstain/CAT 正確觸發 |
| 鑑別實驗(預測 + 收斂)                          | 未開始  | 真實運作                                      | 每對候選預測答案相異(否則 abstain);10 組人工核驗預測邏輯                                             |
| 教師確認/否決流程                              | 未開始  | 真實運作                                      | 端到端點擊流程,無 mock API;否決後結果不進熱力圖                                                      |
| 班級熱力圖                                     | 未開始  | 半真:合成班級分布,demo 中明示                 | 圖表由真實診斷輸出 + 標記為合成的資料驅動                                                            |
| 影像不持久化/自動刪除                          | 未開始  | 真實運作                                      | 上傳影像處理後即刪,storage 檢查為空                                                                  |
| 對症練習                                       | 未開始  | P2:模板化,時間不足則捨棄                      | —                                                                                                    |
| 帳號/LMS 整合/批次掃描/多科目                  | 不做    | roadmap 明列                                  | —                                                                                                    |

範圍:國中代數單一單元(一元一次方程 + 分配律),taxonomy 8–12 條。2 人 × 半職 × 8 天;demo 逐項口頭聲明真偽。

## 9. 失敗成本與風險設計(原則 07)

誤診後果:老師據錯誤診斷補救 → 浪費教學時間、學生被貼錯標籤、**alert fatigue**(把 slip 當迷思)。中風險場域,防線:

- **假說而非判決**:輸出永遠是 candidate_misconceptions[] + alternative_explanation + error_disposition,UI 文案不出現「該生的錯因是」斷言句。
- **Teacher-in-the-loop / Educator Co-Pilot**:老師確認/否決後,結果才進熱力圖、練習才發給學生。AI 是幕僚,不是裁判;教師保留 veto。
- **Abstain 機制**:影像不清、符號歧義、推導不足、或鑑別實驗無法生成可區分預測 → 不硬出診斷,顯示缺什麼。
- **證據強制**:每個候選假說必附 evidence_steps,老師 10 秒可自行核驗——可否證的診斷才是負責任的診斷。
- **Correct Answer Trap**:步驟優先於終端答案;盲測含「答案對、過程錯」樣本(§10)。
- **Slip vs mal-rule**:`error_disposition` 啟發式 + 鑑別實驗;單次孤立錯誤預設不進迷思熱力圖,除非老師確認。
- 技術風險:手寫辨識不穩 → demo 主線用預驗證樣本集;「prompt 包裝」質疑 → 外置 taxonomy + 盲測數據公開(§10)。

## 10. 資料可取得性與有效性驗證(原則 08)

**資料來源**

| 需求         | 來源                                              | 取得路徑                             |
| ------------ | ------------------------------------------------- | ------------------------------------ |
| 題目         | NAEP 公開釋出題(public domain)+ 自編              | 已公開,零成本 [1]                    |
| 手寫錯題樣本 | **團隊自製擬真樣本**(見下方盲測集設計)            | 8 天內可完成;不需真實學生資料        |
| Taxonomy     | 已發表代數迷思文獻(DAAS 三概念 [6]、錯誤分析研究) | 公開文獻,README 附引                 |
| 真實學生資料 | MVP 不使用                                        | 產線階段:學區協議 + 去識別化,roadmap |

**合規聲明**:不寫「無 FERPA/COPPA 風險」。正確表述:**Demo 僅允許合成或去識別樣本;明文禁止上傳真實學生資料;應用層影像不持久化,處理後自動刪除(§8 列為驗收項,實作不了就刪承諾)**。評審若上傳含姓名的真實作業,系統顯示去識別提醒。

**平台層邊界** [13]:OpenAI API inputs/outputs 預設不用於模型訓練,但平台預設可能保留 abuse-monitoring logs **最多 30 天**;Zero Data Retention 僅適用獲核准組織與合格 endpoint。應用層「處理後刪除」≠ 端到端零留存——文案**不宣稱 zero retention**。

**盲測集設計(30–36 份,組成加總一致)**:

| 類別                                                  | 份數      |
| ----------------------------------------------------- | --------- |
| 錯因案例(涵蓋 8–10 種迷思,含「相同答案、不同錯因」對) | 16–20     |
| 正確案例(無錯)                                        | 4         |
| 資訊不足案例(影像糊/步驟缺/符號歧義)                  | 4         |
| 粗心/抄寫案例(slip)                                   | 4         |
| **Correct Answer Trap**(終端答案對、過程錯)           | 2–4       |
| **合計**                                              | **30–36** |

- 標註獨立性:兩位團隊成員先獨立標註、封存答案,之後才調 prompt;**holdout(≥8 份完全未調參)另請一位外部數學老師盲標**——團隊自標自測獨立性不足。
- **Repeatable eval harness**(不稱 deterministic——模型輸出未必 deterministic):記錄 model snapshot、prompt version、temperature/reasoning config,同版本重跑可比對;報告錯因分類 macro-F1、證據步驟正確率、abstain 正確率、`error_disposition` 與標註一致率、CAT 案例召回、教師確認耗時、失敗案例。
- 即使只有 75%,誠實展示錯誤與安全機制,可信度仍高於「內建樣本全過」。

## 11. Demo 可視性:怎麼演(原則 09)

產出是**可互動網站**(Vercel 公開 URL,評審可自己玩)。主線 3 分鐘:

1. **0:00** 鉤子:兩份**同答案、不同思路**的手寫作業並排——「答案一樣錯,原因完全不同」;可選第三張 **答案對、過程錯**(Correct Answer Trap)。
2. **0:20** 上傳作業照片。
3. **0:50** 模型提出**兩個候選錯因假說** + `error_disposition`,各自證據高亮在學生寫的第 2 步。
4. **1:20** 生成**鑑別實驗**:一題 + 兩個候選各自的預測答案並排顯示——「他若這樣答,是錯因一;那樣答,是錯因二」。
5. **1:50** 學生回答 → 匹配其中一個預測 → 該候選獲支持,另一個被排除。
6. **2:15** 老師一鍵確認 → 班級熱力圖 + **下節動作**:「全班 40% 同一迷思,下節 10 分鐘教這個」+ 鑑別題可重用。
7. **2:40** 展示 **holdout 盲測、abstain、CAT、slip** 案例——包含模型答錯的案例,誠實呈現。

影響力敘事用「教師訪談 + 盲測數據 + 節省的分析時間」,少講 $31T。評審互動 2 分鐘:點按其餘樣本、自行上傳、看 abstain 欄與否決流程。

四項評分對應:技術實作(候選假說 + 證據定位 + structured output + 鑑別實驗 + abstain)、設計(完整教師決策流)、影響力(訪談 + 盲測 + 省時)、創意(AI 不宣判;提出可否證假說,再用帶預測的實驗收斂)。

## 12. 防禦策略(Defensibility Strategy)(原則 10)

誠實前提:**八天結束時我們沒有現成壁壘**——盲測集只有 30–36 份,不構成強 moat。以下是防禦**策略**(如何隨使用累積壁壘),非既有資產:

1. **確認資料飛輪(策略)**:每次老師確認/否決 = 一筆標註資料;盲測集是評測資產的種子,隨部署擴大成私有 calibration/eval set。
2. **領域 know-how 編碼(進行中)**:把迷思文獻轉成**可執行 taxonomy**(8–12 節點;可選 `prerequisite_of` 先備邊)+ 鑑別實驗生成與可區分檢核——是教育測量 × 工程交叉能力,複製門檻高於 prompt。
3. **工作流卡位(策略)**:嵌在「篩選(i-Ready)→ **診斷** → 補救(家教/開班)」缺口層,兩端是資料上下游。
4. 模型不是護城河——模型層設定檔化可替換(§5),價值沉澱在框架、評測集與確認資料。

**八天不做、也不寫成現有 moat**:全科 Graph-RAG、多模型 ensemble、QLoRA 微調。若寫進文案,僅 roadmap 一句:「產線可把 taxonomy 先備邊擴成圖檢索;可加小分類模型交叉比對」——**不**佔 demo 主線算力與敘事。

## 13. 八天里程碑(依 P0→P2 重排)

> 現況:repo 只有文件,已落後一天。**v7 為文獻修訂,文件工作到此;停長文,今日開建。**

| 優先 | 交付                                                                                                    | 日期    |
| ---- | ------------------------------------------------------------------------------------------------------- | ------- |
| —    | **Day-1 gate**:確認 GPT-5.6 官方 model ID + API access;Next.js 腳手架                                   | 7/14    |
| P0   | 12 個代數樣本 + 固定 structured output(disposition/evidence_steps/abstain/CAT)+ repeatable eval harness | 7/14–15 |
| P0   | 完整教師流程:選樣本/上傳 → 看候選錯因 → 查證據 → 確認/否決 → 班級聚合 + 下節動作                        | 7/16–17 |
| P1   | 鑑別實驗:預測推導 + 可區分檢核 + 回答後收斂                                                             | 7/17–18 |
| P1   | 盲測集 30–36 份(含 CAT 2–4;獨立標註封存 + 外部老師盲標 holdout)+ 4 場訪談(並行,PM 負責)                 | 7/14–19 |
| P2   | 模板化對症練習(時間允許才做)                                                                            | 7/19    |
| —    | 7/19 晚 feature freeze;7/20 demo 影片 + Devpost + README;7/21 12:00 PDT 提交                            | 7/20–21 |

資源配置:60% 產品與可靠 demo、20% 盲測與 eval、10% 訪談、10% 學者 review 與 Devpost 文案。學者聯絡 24 小時無回覆即停止追逐——不讓 credential hunt 延誤產品。

## 14. 評審壓力問答(速答)

來自外部深度評估的四類尖銳問題;簡報與 Devpost FAQ 用同一套答案。

**Q1:手寫空間模糊 / 符號誤讀(2↔z、×↔x)如何避免幻覺診斷?**

A:多模態理解,非獨立 OCR 管線;會改變數學義的歧義 → `input_uncertainty` + `insufficient_evidence` abstain,說明哪格不清。Demo 主線用預驗證樣本;live 上傳展示 abstain 比硬猜加分。

**Q2:如何區分粗心(slip)與系統性迷思(mal-rule)?**

A:`error_disposition` 啟發式(孤立一步錯 → `likely_slip`;可映射 taxonomy / 可重現 → `candidate_mal_rule`)+ 鑑別實驗收斂。盲測含 4 份 slip。不宣稱已有完美閾值;教師確認為最終閘門,避免 alert fatigue。

**Q3:FERPA/COPPA 與「資料是否拿去訓練」?**

A:Demo **僅**合成或去識別樣本;明文禁上傳真實學生 PII;應用層影像處理後不持久化(§8 驗收)。OpenAI API inputs/outputs 預設不用於模型訓練,但平台預設可能保留 abuse-monitoring logs 最多 30 天;ZDR 僅限獲核准組織與合格 endpoint [13]——因此**不宣稱端到端零留存**。產線學區部署另走 DPA/協議——roadmap,不假裝八天已合規認證。

**Q4:診斷之後補救題品質與課綱對齊?**

A:MVP 閉環 = 教師決策(分組、下節教什麼、鑑別題重用),**不**依賴自由生成題庫。P2 僅模板化練習。自由生成題的正確性與 TEKS/CCSS 對齊屬產線品質問題,八天不承諾、不演示為主線。

---

## 參考文獻(美國收斂)

1. NCES. _2024 NAEP Mathematics Assessment: Grade 8 National Trends_. <https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=8>(28% at/above Proficient、61% at/above Basic、39% below Basic;全國仍低於 2019)
2. National Assessment Governing Board. _10 Takeaways from the 2024 NAEP Results_. <https://www.nagb.gov/powered-by-naep/the-2024-nations-report-card/10-takeaways-from-2024-naep-results.html>(全國未恢復;高低分位分化)
3. Carbonari, M. V., et al. _Impacts of Academic Recovery Interventions on Student Achievement in 2022–23_. CALDER Working Paper No. 303-0724. <https://caldercenter.org/publications/impacts-academic-recovery-interventions-student-achievement-2022-23>(部分有效 tutoring 方案僅覆蓋約 1–2% 合資格年級學生)
4. Bhatt, M. P., et al. (2025). _Personalized Learning Initiative Interim Report: Findings from 2023–24_. MDRC. <https://www.mdrc.org/work/publications/personalized-learning-initiative-interim-report>(pooled tutoring effect 0.06–0.09 SD;約 $1,200–$2,000/生)
5. Guryan, J., et al. (2023). "Not Too Late: Improving Academic Outcomes among Adolescents." _American Economic Review_, 113(3), 738–765. <https://doi.org/10.1257/aer.20210434>(兩項 Chicago 大型 RCT:0.18–0.40 SD)
6. Russell, M., O'Dwyer, L. M., & Miranda, H. (2009). "Diagnosing Students' Misconceptions in Algebra: Results From an Experimental Pilot Study." _Behavior Research Methods_, 41(2), 414–424. <https://doi.org/10.3758/BRM.41.2.414>(905 學生、44 教師;控制 pretest 後 full intervention vs ability-report-only control +0.13 SD;misconception outcome 不顯著;引用為 intervention hypothesis 依據,非效果保證)
7. Kuo, B.-C., Chen, C.-H., & de la Torre, J. (2018). "A Cognitive Diagnosis Model for Identifying Coexisting Skills and Misconceptions." _Applied Psychological Measurement_. <https://doi.org/10.1177/0146621617722791>(正式卷期 2018;2017 為 online-first/DOI 年份)
8. Skinner, R. R., & Angert, J. (2026). _FY2025 State Grants Under Title I-A of the Elementary and Secondary Education Act_. CRS R48953. <https://www.congress.gov/crs-product/R48953>(Title I-A 約 $18.4B;僅為 payer 預算背景,不證明可採購)
9. U.S. Department of Education. _Education Stabilization Fund: ESSER_. <https://covidreliefdata.ed.gov/>(三輪 ESSER 共 $189.5B)
10. NCES. _Forty-Six Percent of Public Schools Provided High-Dosage Tutoring During 2023–24_. School Pulse Panel. <https://nces.ed.gov/learn/press-release/about-one-quarter-public-schools-reported-lack-focus-or-inattention-students-had-severe-negative>(46% 公立學校 2023–24 提供 HDT)
11. Hanushek, E. A., & Strauss, B. (2024). "United States: The Size and Variation of the Pandemic Learning Losses." <https://link.springer.com/chapter/10.1007/978-3-031-69284-0_13>($31T 為 21 世紀 GDP 現值之模型估計)
12. IES. _Bridging the Gap: Applying Algebra Cognition Research to Develop and Validate Diagnostic Classroom Algebra Testlet_. <https://ies.ed.gov/use-work/awards/bridging-gap-applying-algebra-cognition-research-develop-and-validate-diagnostic-classroom-algebra>
13. OpenAI. _Data Controls in the OpenAI Platform_. <https://platform.openai.com/docs/models/default-usage-policies-by-endpoint>;_Business Data Privacy_. <https://openai.com/business-data/>(inputs/outputs 預設不用於訓練;abuse-monitoring logs 最多 30 天;ZDR 需核准)

政策背景附錄(不佔核心文獻):Moon, T. (2026). _How Districts Can Fund High-Quality Tutoring Now That ESSER Money Is Gone_. The 74——二手政策整理;田納西 $500/生為**四年級讀寫** tutoring,非數學。
