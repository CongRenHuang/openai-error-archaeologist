# 提案 A(首推):錯誤考古學家(Error Archaeologist)— 錯因假說診斷引擎

> 一句話:**AI 不猜學生腦中想什麼;它提出候選錯因、指出證據在第幾步,再生成一個帶可驗證預測的鑑別實驗來收斂診斷。**
>
> 版本 5(2026-07-14):依第二輪 PM 審查修訂。修正:§8 改「現況/目標/驗收」三欄(未開始就寫未開始);盲測集數字重算(28–32 份);schema 升級為每候選帶 evidence_steps 與 predicted_response_pattern、鑑別實驗帶收斂規則;信心分級改為整體診斷狀態三值;刪除誇張句與過度技術主張;護城河改稱防禦策略;GPT-5.6 model ID 列為 Day-1 gate。

---

## 第一部:這個問題值不值得解

## 1. 問題

老師改作業只看對錯,看不出錯誤背後的原因。同一個錯誤答案背後可能藏著多種不同成因——例如 `-3(x - 2) = -3x - 6` 可能是分配律迷思、負號規則錯誤、粗心或抄寫疏忽,各需完全不同的處置。篩選層(誰落後)與補救層(開課/家教)都有規模化工具;錯因診斷層沒有同等規模化的工具(既有方案的限制見 §3 比較表)。

**誠實前提**:單份作業**無法唯一辨識**錯因——同一錯誤可來自迷思、粗心、抄寫、題意誤讀。因此本產品不做「AI 宣判」,做「AI 提出候選假說 + 每個假說的證據 + 一個帶預測的鑑別實驗」,由老師確認、由學生的下一個回答收斂。這不是退讓,是比「AI 讀心」更科學也更可信的產品定位。

## 2. 可驗證性:痛點的規模與強度(原則 01)

**規模**

- NAEP 2024(美國官方「Nation's Report Card」):八年級數學 **28% 達 Proficient、61% 達 Basic、39% 低於 Basic** [1]。注意:NAEP Proficient 是高標,**不等於年級達標**——本提案不使用「72% 未達精熟」這種易誤導的說法;低於 Basic 的近四成學生才是補救政策的目標人群。
- 疫情五年後**全國仍未恢復**:沒有任何一州的八年級成績回到 2019 疫情前水準 [2]。
- 經濟代價:Hanushek (2023) 估計未補救的成績下滑總體經濟損失達 **31 兆美元** [3](demo 少講此數字,見 §11——評審要的是具體可信,不是天文數字)。

**強度——政府已證明願意付費,但主力解法無法規模化**

- 聯邦投入 **$190B ESSER 紓困經費**,高劑量家教(HDT)為首要策略;全美 66% 公立學校開辦 [3][4]。
- HDT 成本 **$1,200–$2,000/學生/年**(MDRC 2025 實測)[4];有效的密集家教方案僅覆蓋 1–2% 合資格學生 [3]。
- 規模化後效果衰減至 0.06–0.09 SD,遠低於小規模研究的 0.18–0.40 SD [4][6]。

**教育學證據——誠實表述其邊界**

- Russell, O'Dwyer & Miranda (2009,905 學生/44 教師隨機叢集試驗):給教師「迷思診斷報告 + 對症教材」的完整介入顯著提升代數能力(+0.13 SD);只給總分的組別效果最差 [7]。
- **該研究支持的是**:特定診斷工具 + 特定教材的組合可能有效。**它不支持**:「LLM 從手寫推錯因再生成練習,同樣有效」。本提案引用它作為 **intervention hypothesis 的依據**——「診斷先於補救」這個方向有實證基礎——而非宣稱複製其效果。我們自己的有效性證據來自 §10 的盲測。

## 3. 需求驅動:LLM 之前的世界(原則 04)

| 世代      | 美國既有解法                                                | 限制                                                                                                              |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 人力      | 高劑量家教(1 對 1–2,診斷發生在家教腦中)                     | $1,200–2,000/生/年;有效方案僅覆蓋 1–2% 學生 [3][4][5]                                                              |
| 規則/題庫 | 適應性選擇題診斷:i-Ready Diagnostic、NWEA MAP、DAAS [7]     | 以預編選擇題為主,每概念需專家設計誘答選項;難以低成本處理學生開放式手寫推導;輸出「落後幾級」多於「錯誤規則是什麼」 |
| 傳統 ML   | 認知診斷模型(CDM/DINA)[8]、ITS(Cognitive Tutor/ASSISTments) | 依賴預先設計的 Q-matrix 與封閉題型;ITS 只在自家系統內診斷,學生日常紙本作業碰不到                                   |

**LLM 帶來的能力差異**:

1. **處理自由形式手寫推導**——既有方案難以低成本處理的輸入形態。
2. **不需預編誘答題庫**——新單元不需專家迴圈設計選項,邊際成本顯著低於題庫模式(具體成本比待產線驗證)。
3. **證據定位**——把候選錯因錨定到「學生自己寫的第幾步」,需要對推導過程的語意理解。
4. **即時生成鑑別實驗**——針對當下出現的候選錯因對,生成預測可區分的題目。題庫模式無法預知會出現哪對候選。

**Day-1 gate**:GPT-5.6 為競賽要求。開賽日第一件事:取得官方公布的實際 model ID 與 API access,寫入設定檔——不假設 `gpt-5.6` 字串存在。pipeline 對模型版本無耦合(§5)。

## 4. 解決方案:假說 → 證據 → 鑑別實驗 → 確認

1. 老師拍照上傳學生手寫作業(demo 主線用預驗證樣本 + live 上傳加分)。
2. 模型視覺理解手寫過程,輸出**固定 structured output**:

```json
{
  "observed_error": "將 -3(x-2) 展開為 -3x-6",
  "diagnosis_status": "multiple_plausible_hypotheses",
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
    "convergence_rule": "回答匹配某候選預測 → 該候選獲支持;匹配 correct_answer → 兩候選皆降權,傾向抄寫疏忽;不匹配任何預測 → abstain,交老師口頭確認"
  },
  "abstain_reason": null
}
```

3. **鑑別實驗**(本產品核心創新——不是「生成一題」,是**生成帶可驗證預測的實驗**):
   - 生成前先為每對候選推導預測答案;**兩候選預測相同 → 換題重生成;無法生成可區分題 → abstain**。
   - 學生回答後按 convergence_rule 更新診斷——這讓 AI 的推理可被下一筆資料否證。
4. 老師一鍵確認/否決 → 確認後才進班級熱力圖與後續處置。
5. 對症練習(P2):時間允許則由確認後的錯因觸發模板化練習;不承諾即時自由生成微課。

**診斷狀態三值**(取代 v4 的個別 confidence band——per-candidate 分級與「無競爭解釋」定義自相矛盾,且 LLM 自報信心未經校準):

- `single_supported_hypothesis`:僅一個候選有證據支持
- `multiple_plausible_hypotheses`:多個合理候選 → 觸發鑑別實驗
- `insufficient_evidence`:影像或推導不足 → abstain,說明缺什麼
- 不顯示任何數值信心;數值校準列 roadmap(需 calibration set)。

**GPT-5.6 運用深度(Build Week 評分①)**:多模態手寫理解(非 OCR,懂步驟間推導關係)× 溯因推理(從錯誤結果反推候選規則)× structured output(固定 schema 可聚合、可 eval)× **鑑別實驗生成**(含預測推導與自我檢核)× abstain 機制。「假說—證據—實驗—收斂」是完整推理迴圈,不是單發 prompt。

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

| 角色          | 是誰                                     | 說明                                                                                                                                                       |
| ------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User**      | 老師(每天用)、學生(收到鑑別題與練習)       | 使用者不付錢                                                                                                                                                 |
| **Payer**     | 學區/州政府(假說,待訪談驗證)              | 可能的採購脈絡:Title I-A $18.4B 補救性服務 [9]、田納西家教經費入州公式 [5]、德州無資金強制令 [5]。**預算存在 ≠ 可直接採購本工具**——採購路徑屬假說,以訪談補強 |
| **Incumbent** | 順風方:補教/家教機構、教材商(賣鏟子策略)。 擋路方:診斷測驗商(i-Ready/NWEA)——預期以信效度質疑反擊,正面應對即 §10 盲測 |                                                                                                                                                              |

**八天內不證明市場規模,證明真實需求**——四場結構化訪談(各 20 分鐘),user 與 payer 分開驗證:

- 驗證 **User**:2 位美國 Grade 7–9 數學老師(每週花多久分析錯題?如何分組?願意在流程哪一步確認?)+ 1 位 tutor coordinator(診斷報告是否改變家教資源分配?)。
- 驗證 **Payer**:1 位 district administrator 或 tutoring program buyer(採購決策流程?什麼證據能進入試點?)——教師訪談只能驗證 user,payer 必須另問。
- 產出:可引用的訪談紀要進 Devpost(取得公開引用許可);Demo 可寫 "Reviewed by one US middle-school math educator and one mathematics-education researcher",**不寫 "scientifically validated"**。

---

## 第二部:憑什麼是我們解它

## 8. 可行性邊界:現況 / 目標 / 驗收(原則 06)

> 誠實聲明:截至 2026-07-14,repo 僅有提案文件——**所有元件均未開始**。下表為交付合約,非現狀描述。

| 元件                                | Current | Demo target(7/21)                          | Acceptance test(如何證明完成)                                                        |
| ----------------------------------- | ------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| 照片 → 候選假說 + 證據 + abstain    | 未開始  | 真實運作:12 個代數樣本 + live 上傳加分       | repeatable eval harness 跑全樣本:schema 合法率 100%、證據步驟正確率達標、abstain 正確觸發 |
| 鑑別實驗(預測 + 收斂)               | 未開始  | 真實運作                                     | 每對候選預測答案相異(否則 abstain);10 組人工核驗預測邏輯                                |
| 教師確認/否決流程                   | 未開始  | 真實運作                                     | 端到端點擊流程,無 mock API;否決後結果不進熱力圖                                        |
| 班級熱力圖                          | 未開始  | 半真:合成班級分布,demo 中明示                | 圖表由真實診斷輸出 + 標記為合成的資料驅動                                               |
| 影像不持久化/自動刪除               | 未開始  | 真實運作                                     | 上傳影像處理後即刪,storage 檢查為空                                                     |
| 對症練習                            | 未開始  | P2:模板化,時間不足則捨棄                     | —                                                                                        |
| 帳號/LMS 整合/批次掃描/多科目       | 不做    | roadmap 明列                                 | —                                                                                        |

範圍:國中代數單一單元(一元一次方程 + 分配律),taxonomy 8–12 條。2 人 × 半職 × 8 天;demo 逐項口頭聲明真偽。

## 9. 失敗成本與風險設計(原則 07)

誤診後果:老師據錯誤診斷補救 → 浪費教學時間、學生被貼錯標籤。中風險場域,四道防線:

- **假說而非判決**:輸出永遠是 candidate_misconceptions[] + alternative_explanation,UI 文案不出現「該生的錯因是」斷言句。
- **Teacher-in-the-loop**:老師確認/否決後,結果才進熱力圖、練習才發給學生。AI 是幕僚,不是裁判。
- **Abstain 機制**:影像不清、推導不足、或鑑別實驗無法生成可區分預測 → 不硬出診斷,顯示缺什麼。
- **證據強制**:每個候選假說必附 evidence_steps,老師 10 秒可自行核驗——可否證的診斷才是負責任的診斷。
- 技術風險:手寫辨識不穩 → demo 主線用預驗證樣本集;「prompt 包裝」質疑 → 外置 taxonomy + 盲測數據公開(§10)。

## 10. 資料可取得性與有效性驗證(原則 08)

**資料來源**

| 需求         | 來源                                                     | 取得路徑                              |
| ------------ | -------------------------------------------------------- | -------------------------------------- |
| 題目         | NAEP 公開釋出題(public domain)+ 自編                     | 已公開,零成本 [1]                     |
| 手寫錯題樣本 | **團隊自製擬真樣本**(見下方盲測集設計)                    | 8 天內可完成;不需真實學生資料          |
| Taxonomy     | 已發表代數迷思文獻(DAAS 三概念 [7]、錯誤分析研究)         | 公開文獻,README 附引                  |
| 真實學生資料 | MVP 不使用                                               | 產線階段:學區協議 + 去識別化,roadmap  |

**合規聲明**:不寫「無 FERPA/COPPA 風險」。正確表述:**Demo 僅允許合成或去識別樣本;明文禁止上傳真實學生資料;影像不持久化,處理後自動刪除(§8 列為驗收項,實作不了就刪承諾)**。評審若上傳含姓名的真實作業,系統顯示去識別提醒。

**盲測集設計(28–32 份,組成加總一致)**:

| 類別                         | 份數  |
| ---------------------------- | ----- |
| 錯因案例(涵蓋 8–10 種迷思,含「相同答案、不同錯因」對) | 16–20 |
| 正確案例(無錯)               | 4     |
| 資訊不足案例(影像糊/步驟缺)   | 4     |
| 粗心/抄寫案例                | 4     |
| **合計**                     | **28–32** |

- 標註獨立性:兩位團隊成員先獨立標註、封存答案,之後才調 prompt;**holdout(≥8 份完全未調參)另請一位外部數學老師盲標**——團隊自標自測獨立性不足。
- **Repeatable eval harness**(不稱 deterministic——模型輸出未必 deterministic):記錄 model snapshot、prompt version、temperature/reasoning config,同版本重跑可比對;報告錯因分類 macro-F1、證據步驟正確率、abstain 正確率、教師確認耗時、失敗案例。
- 即使只有 75%,誠實展示錯誤與安全機制,可信度仍高於「內建樣本全過」。

## 11. Demo 可視性:怎麼演(原則 09)

產出是**可互動網站**(Vercel 公開 URL,評審可自己玩)。主線 3 分鐘:

1. **0:00** 鉤子:兩份**同答案、不同思路**的手寫作業並排——「答案一樣錯,原因完全不同」。
2. **0:20** 上傳作業照片。
3. **0:50** 模型提出**兩個候選錯因假說**,各自證據高亮在學生寫的第 2 步。
4. **1:20** 生成**鑑別實驗**:一題 + 兩個候選各自的預測答案並排顯示——「他若這樣答,是錯因一;那樣答,是錯因二」。
5. **1:50** 學生回答 → 匹配其中一個預測 → 該候選獲支持,另一個被排除。
6. **2:15** 老師一鍵確認 → 班級熱力圖更新:「全班 40% 同一迷思,下節課教這個」。
7. **2:40** 展示 **holdout 盲測結果與 abstain 案例**——包含模型答錯的案例,誠實呈現。

影響力敘事用「教師訪談 + 盲測數據 + 節省的分析時間」,少講 $31T。評審互動 2 分鐘:點按其餘樣本、自行上傳、看 abstain 欄與否決流程。

四項評分對應:技術實作(候選假說 + 證據定位 + structured output + 鑑別實驗 + abstain)、設計(完整教師決策流)、影響力(訪談 + 盲測 + 省時)、創意(AI 不宣判;提出可否證假說,再用帶預測的實驗收斂)。

## 12. 防禦策略(Defensibility Strategy)(原則 10)

誠實前提:**八天結束時我們沒有現成壁壘**——盲測集只有 28–32 份,不構成強 moat。以下是防禦**策略**(如何隨使用累積壁壘),非既有資產:

1. **確認資料飛輪(策略)**:每次老師確認/否決 = 一筆標註資料;盲測集是評測資產的種子,隨部署擴大成私有 calibration/eval set。
2. **領域 know-how 編碼(進行中)**:把迷思文獻轉成可執行 taxonomy + 鑑別實驗生成邏輯,是教育測量 × 工程的交叉能力,複製門檻高於 prompt。
3. **工作流卡位(策略)**:嵌在「篩選(i-Ready)→ **診斷** → 補救(家教/開班)」缺口層,兩端是資料上下游。
4. 模型不是護城河——模型層設定檔化可替換(§5),價值沉澱在框架、評測集與確認資料。

## 13. 八天里程碑(依 P0→P2 重排)

> 現況:repo 只有文件,已落後一天。**停寫文件,今日開建。**

| 優先 | 交付                                                                                              | 日期    |
| ---- | -------------------------------------------------------------------------------------------------- | ------- |
| —    | **Day-1 gate**:確認 GPT-5.6 官方 model ID + API access;Next.js 腳手架                              | 7/14    |
| P0   | 12 個代數樣本 + 固定 structured output(候選假說/evidence_steps/abstain)+ repeatable eval harness    | 7/14–15 |
| P0   | 完整教師流程:選樣本/上傳 → 看候選錯因 → 查證據 → 確認/否決 → 班級聚合                                | 7/16–17 |
| P1   | 鑑別實驗:預測推導 + 可區分檢核 + 回答後收斂                                                          | 7/17–18 |
| P1   | 盲測集 28–32 份(獨立標註封存 + 外部老師盲標 holdout)+ 4 場訪談(並行,PM 負責)                        | 7/14–19 |
| P2   | 模板化對症練習(時間允許才做)                                                                        | 7/19    |
| —    | 7/19 晚 feature freeze;7/20 demo 影片 + Devpost + README;7/21 12:00 PDT 提交                        | 7/20–21 |

資源配置:60% 產品與可靠 demo、20% 盲測與 eval、10% 訪談、10% 學者 review 與 Devpost 文案。學者聯絡 24 小時無回覆即停止追逐——不讓 credential hunt 延誤產品。

## 參考文獻(美國收斂)

1. NCES. _2024 NAEP Mathematics Assessment: Results at Grades 4 and 8_. nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=8(八年級 28% Proficient、61% Basic、39% 低於 Basic)
2. NAGB (2025). _The Nation's Report Card Shows Declines in Reading, Some Progress in 4th Grade Math_. nagb.gov(無一州八年級回到 2019 水準)
3. Carbonari, DeArmond, Dewey, Goldhaber, Kane, Staiger et al. _Impacts of Academic Recovery Interventions on Student Achievement in 2022-23_(CALDER/Harvard CEPR). ERIC ED662872(ESSER $190B;有效家教方案僅覆蓋 1–2% 學生;Hanushek $31T 估計之引用)
4. UChicago Education Lab / MDRC (2025). _Personalized Learning Initiative Interim Report_. mdrc.org/work/publications/personalized-learning-initiative-interim-report(66% 公立學校辦 HDT;HDT ~$2,000 / SHDT ~$1,200;規模化效果 0.06–0.09 SD)
5. Moon, T. (2026). _How Districts Can Fund High-Quality Tutoring Now That ESSER Money Is Gone_. The 74(田納西 $500/生入公式;德州無資金強制令)
6. Guryan, J., et al. _Not Too Late: Improving Academic Outcomes among Adolescents_. American Economic Review. DOI: 10.1257/aer.20210434(小規模 HDT 0.18–0.40 SD)
7. Russell, M., O'Dwyer, L. M., & Miranda, H. (2009). Diagnosing students' misconceptions in algebra. _Behavior Research Methods_, 41(2). DOI: 10.3758/brm.41.2.414;IES 專案頁 nces.ed.gov/use-work/awards/bridging-gap-applying-algebra-cognition-research-develop-and-validate-diagnostic-classroom-algebra(905 學生;引用為 intervention hypothesis 依據,非效果保證)
8. Kuo, B.-C., Chen, C., & de la Torre, J. (2017). A Cognitive Diagnosis Model for Identifying Coexisting Skills and Misconceptions. _Applied Psychological Measurement_. DOI: 10.1177/0146621617722791
9. Skinner, R. R., & Angert, J. _FY2025 State Grants Under Title I-A of the ESEA_. Congressional Research Service R48953(Title I-A $18.4B;採購路徑屬假說,待訪談驗證)
