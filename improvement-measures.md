# 專業產品經理修正與建議報告

> Codex GPT-5.6-Sol Reviews proposal version 4
> 新增 [黑客松提案原則](hackathon-proposal-evluation-criteria.md)

## 結論

v4 大幅改善，但尚未完全符合準則。

- 準則覆蓋：10/10
- 實質滿足：7/10
- 目前可信度：7.5/10
- 實作交付證據：0/10，repo 仍只有文件

`git status`：

```text
 M docs/proposals/01-error-archaeologist.md
?? hackathon-proposal-evluation-criteria.md
```

`git diff --check` 通過。未發現格式錯誤。

## 阻斷問題

### 1. 計畫寫成完成狀態

[§8](/Users/dennis.huang/Project/open-ai-build-week/docs/proposals/01-error-archaeologist.md:126)寫「真實運作」，但 repo 沒有程式、樣本、eval。

改表格欄位：

- Current：未開始
- Demo target：預計真實運作
- Acceptance test：如何證明完成

否則違反準則 06「誠實範圍」。

### 2. 盲測設計數字矛盾

[§10](/Users/dennis.huang/Project/open-ai-build-week/docs/proposals/01-error-archaeologist.md:164)要求：

- 24–30 份
- 8–10 種錯因
- 每種都有典型、模糊、無錯、不可判定

8 種 × 4 類至少 32 份。且「無錯、不可判定」不是每種錯因子類。

改成：

- 16–20 個錯因案例
- 4 個正確案例
- 4 個資訊不足案例
- 4 個粗心／抄寫案例
- 合計 28–32

### 3. Schema 無法支援鑑別

[JSON schema](/Users/dennis.huang/Project/open-ai-build-week/docs/proposals/01-error-archaeologist.md:55)只有一個 `supporting_evidence` 和一個問題。無法知道：

- 證據支持哪個候選
- 每個候選預測什麼答案
- 學生回答後如何更新診斷

每個候選應包含：

```json
{
  "id": "NEG_DIST",
  "evidence_steps": ["step_2"],
  "predicted_response_pattern": "-2a-10"
}
```

鑑別題另含 `correct_answer`、每個候選的預測錯答、收斂規則。

### 4. High 定義自相矛盾

High 定義為「無競爭解釋」，範例卻同時給 Medium 候選與抄寫解釋。

刪除個別 confidence band。改輸出整體：

- `single_supported_hypothesis`
- `multiple_plausible_hypotheses`
- `insufficient_evidence`

### 5. 鑑別題範例未證明能區分

`展開 -2(a - 5)` 未必能區分「負號未分配」與「負負規則誤用」。兩種迷思可能產生相同錯答。

Demo 前必須為每對候選建立：

- 預測答案 A
- 預測答案 B
- 若答案不匹配則 abstain

「生成一題」不是核心創新；**生成帶可驗證預測的鑑別實驗**才是。

## 十項準則結果

1. Verifiability：部分通過
   NAEP、HDT 有來源；「頭號未解問題」「無人回答」仍無證據。刪除誇張句。

2. Reusability：通過
   假說→證據→鑑別→確認流程可由人工執行。

3. Universality：部分通過
   只有 roadmap。Taxonomy 換檔不等於換客戶。需定義 adapter/schema contract，承認改碼量尚未驗證。

4. Demand-driven：部分通過
   「傳統技術原理上做不到」「只能選擇題」「邊際成本趨近零」皆過度。改為「難以低成本處理開放式手寫推導」。

5. Commercial value：部分通過
   User/Payer/Incumbent 完整；採購動機仍是假說。教師訪談只能驗證 user，不足以驗證 payer。至少訪談一位 district/tutoring program buyer。

6. Feasibility：未通過目前狀態
   範圍合理，但目標被寫成已運作。

7. Risk：通過
   候選假說、abstain、教師確認、證據定位完整。

8. Data accessibility：通過
   合成資料路徑清楚。自動刪除仍須實作或刪除承諾。

9. Demo visibility：通過
   三分鐘故事清楚、視覺化強。

10. Moat：部分通過
    全是未來護城河。八天盲測集不是強 moat。改稱「defensibility strategy」，不要稱現有壁壘。

## 其他修正

- v4 引用 `improvement-measures.md`，repo 沒此檔。移除引用或新增文件。
- GPT-5.6 是競賽要求，不宜寫「若提供」。改成「取得官方 model ID 與 API access 為 Day-1 gate」。
- 兩位團隊成員自行標註，獨立性偏弱。至少一位外部數學老師盲標 holdout。
- `deterministic eval` 名稱不準。模型輸出未必 deterministic。應稱 `repeatable eval harness`，並記錄 model snapshot、prompt version、temperature/reasoning config。

最終判定：**概念達標，可開建；提案文件仍需一次精準修訂。最大工作已不是寫 proposal，而是交付可重複 eval 與端到端 Demo。**