# 專業產品經理修正與建議報告

> Review [Error Archaeologist](docs/proposals/01-error-archaeologist.md)
> 產品概念強、Demo 記憶點高、符合評分。研究有效性與交付可信度不足。現在像優秀 pitch，尚非已驗證產品。

評分：

- 問題重要性：8/10
- 創意與 GPT 深度：9/10
- 教育學效度：5/10
- 商業論證：5/10
- 八天可交付性：4/10
- Demo 勝率：7/10

## 已驗證

- NAEP 數據正確：2024 八年級數學 28% 達 Proficient、61% 達 Basic，故 39% 低於 Basic。但 NAEP Proficient 不等於年級達標，文件把 72% 描述成「未達精熟」容易誤導。NAEP 官方結果
  (https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=8)

- 大規模 tutoring 效果約 0.06–0.09 SD、成本約 $1,200–$2,000，基本正確。MDRC 2025 (https://www.mdrc.org/work/publications/personalized-learning-initiative-interim-report)
- Russell 研究、905 學生、診斷加對症教學方向存在。IES 專案頁
  (https://nces.ed.gov/use-work/awards/bridging-gap-applying-algebra-cognition-research-develop-and-validate-diagnostic-classroom-algebra)

- 現行公開 OpenAI API 主力模型為 GPT-5.5；GPT-5.5 支援 image input 與 structured outputs。競賽若提供 GPT-5.6 preview，必須鎖定官方實際 model ID，不能假設字串就是
  gpt-5.6。OpenAI Models (https://developers.openai.com/api/docs/models/gpt-image)

## 重大問題

### 1. 推論過度

docs/proposals/01-error-archaeologist.md:27把單一 2009 pilot 推成「RCT 驗證的正解」。

研究支持：

> 特定診斷工具＋特定教材可能有效。

研究不支持：

> LLM 從手寫內容推測錯因，再生成兩題微課，同樣有效。

改文案：「提供 intervention hypothesis」，不可寫「複製 RCT 有效介入」。

### 2. 錯因無法從單份作業唯一辨識

同一錯誤可來自迷思、粗心、抄寫、題意誤讀。模型只能產生候選假說，不能「重建學生腦中的規則」。

輸出改成：

- observed_error
- candidate_misconceptions[]
- supporting_evidence
- alternative_explanation
- verification_question
- abstain_reason

產品核心應從「AI 判定錯因」變成「AI 提出可驗證診斷假說」。

### 3. 信心值不可信

docs/proposals/01-error-archaeologist.md:112固定 0.7 無校準依據。LLM 自報 0.83 不代表 83% 正確。

MVP 不顯示假精準小數。改成：

- High：關鍵步驟直接支持，且無競爭解釋
- Medium：兩個合理錯因
- Abstain：影像或推導不足

正式版再用 calibration set 設門檻。

### 4. 十個自製樣本不是驗證集

docs/proposals/01-error-archaeologist.md:100「10 個全過」「準確率公開」會被評審攻破。樣本由 taxonomy 反向製作，產生 circular validation。

最低要求：

- 24–30 份樣本
- 8–10 種錯因
- 每種含典型、模糊、無錯、不可判定案例
- 標註答案先封存，再調 prompt
- 報告 macro-F1、evidence accuracy、abstention accuracy
- 保留至少 8 份完全未調參 holdout

### 5. 合規說法錯誤

docs/proposals/01-error-archaeologist.md:123「無 FERPA/COPPA 風險」過度承諾。Demo 若允許公開上傳，評審可能傳真實學生作業；姓名、字跡、班級資料仍可能構成敏感資料。

改成：

> Demo 僅允許合成或去識別樣本；禁止真實學生資料；不持久化影像；設定自動刪除。

### 6. 商業論證跳太快

Title I 預算存在，不等於可直接採購本工具。「無資金強制令 = 剛性需求」也非充分證據。

八天內不用證明市場規模。補三項訪談證據更有力：

- 2 位數學老師
- 1 位 tutor/program manager
- 問：每週花多久分析錯題、如何分組、是否相信 AI 診斷、願意在哪一步確認

### 7. 範圍太大

Python taxonomy、微課、熱力圖、live upload、證據高亮同時做，風險高。Python 彩蛋不能真正證明跨領域通用，反而分散產品故事。

## 交付改進

目前 workspace 只有文件，沒有 Next.js、測試或樣本。7/13「腳手架＋10 樣本」里程碑已落後。

新優先級：

1. P0：可重複診斷
   - 12 個代數樣本
   - 固定 structured output
   - evidence step
   - abstain
   - deterministic eval script

2. P0：完整教師流程
   - 選樣本／上傳
   - 看候選錯因
   - 查看證據
   - 確認／否決
   - 顯示班級聚合

3. P1：驗證問題
   - AI 生成一題區分兩個候選錯因
   - 學生回答後更新診斷
     這比直接生成「微課」更科學，也更有創意。

4. P2：微課
   - 時間不足便用模板
   - 不需要即時自由生成

5. 刪除
   - Python taxonomy
   - LMS adapter
   - 「0 行 code 換客戶」
   - 未校準信心分數

## 建議 Demo

- 0:00：同答案、不同思路。
- 0:20：上傳作業。
- 0:50：模型提出兩個錯因假說與證據。
- 1:20：生成一題鑑別問題。
- 1:50：回答後排除其中一個錯因。
- 2:15：老師確認，熱力圖更新。
- 2:40：展示 holdout eval 與 abstain 案例。

這條故事比「AI 看一次就知道學生腦中想什麼」可信，也更像嚴謹教育產品。

> 問：以參加 openai build week 為目的提案，短時間內找到一位美國大學的教職人員來驗證這份提案的內容是有必要性的嗎？
> 答：有幫助，但不是必要條件。短期找教授若只換一句 endorsement，ROI 低。評審看「可信、具體、已展示」，不是學術頭銜。

優先順序：

1. 可運作產品
2. 小型盲測結果
3. 真實教師回饋
4. 教育研究依據
5. 教授背書

## 最佳驗證人選

美國大學教授未必最佳。優先找：

- 美國 Grade 7–9 數學老師：驗證工作流與痛點
- Math education／learning science 教授：驗證迷思 taxonomy
- School tutor coordinator：驗證實際採用價值
- Assessment researcher：驗證診斷方法

**一位現役老師＋一位學者**，比單一名校教授更可信。

## 八天內有效做法

不要請對方「認可整份提案」。請做 20 分鐘結構化 review：

1. 老師是否真的難以判斷錯因？
2. taxonomy 是否涵蓋常見迷思？
3. AI 證據是否足以支持候選診斷？
4. 哪些案例必須 abstain？
5. 這個輸出是否改變下一堂課？

取得可公開引用許可。Demo 可寫：

> Reviewed by one US middle-school math educator and one mathematics-education researcher.

避免寫「scientifically validated」。

## 比背書更強：小型盲測

做 24–30 份作業：

- 典型錯因
- 相同答案、不同錯因
- 粗心／抄錯
- 正確答案
- 影像不清
- 無法判斷

兩位人工標註者先獨立標註。模型不能看答案。報告：

- 錯因分類正確率或 macro-F1
- 證據步驟正確率
- abstain 正確率
- 教師確認所需時間
- 失敗案例

即使結果只有 75%，誠實展示錯誤與安全機制，可信度仍高於「10 個內建樣本全過」。

## 評審青睞關鍵

依 [index.md](/Users/dennis.huang/Project/open-ai-build-week/index.md)，四項標準對應：

- Technological Implementation：候選假說、證據定位、structured output、鑑別問題、abstain。
- Design：完整教師決策流程，不只模型輸出頁。
- Potential Impact：教師訪談＋盲測＋節省時間，少講 $31T。
- Quality of Idea：AI 不直接宣判；提出可驗證假說，再用鑑別題縮小錯因。

最強一句話：

> AI 不猜學生腦中想什麼；它找出最可能錯因，指出證據，再生成一題能區分候選錯因的問題。

## 建議資源配置

- 60%：產品與可靠 Demo
- 20%：盲測與 eval
- 10%：教師訪談
- 10%：學者 review、引用、Devpost 文案

若教授聯絡 24 小時無回覆，停止追逐。不要讓 credential hunt 延誤產品。

## 審查結論：Error Archaeologist

> 依據：原提案與改善報告

### 獲獎潛力

極高。
評審含教育副總 Leah Belsky。教育題吃香。GPT-5.6 視覺解析手寫展現技術深度。

### 原提案致命傷

- **邏輯跳躍**：單題武斷定錯因，直出微課。
- **循環驗證**：自編自測 10 樣本。無效。
- **失焦**：Python 彩蛋干擾主軸。
- **高危**：Live 上傳手寫易翻車。

### 改善報告評估

精準。
「AI 提假說＋鑑別題」勝「AI 盲猜」。教師決策流展現產品設計力。

### 下一步 (P0)

1. 停寫文件。建 Next.js MVP。
2. 實作 12 代數樣本、證據定位、Abstain 機制。
3. 砍 Python、砍自動微課。
4. 建 30 題盲測集。找現役老師看 Demo。
