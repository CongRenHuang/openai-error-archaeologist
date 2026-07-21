# OpenAI Build Week 整體奪獎策略

> 撰寫日期:2026-07-13(開賽日) / 更新:2026-07-14(已依 openai.devpost.com 官方頁面 + Official Rules 校對 tracks/獎項/時程)
> 團隊設定:2 人、每日半職(~4–6 小時/人),總預算 ≈ 80–100 人時
> 主攻方向:教育/學習
> 本文件併入原 `index.md` 的賽事事實查核內容(2026-07-14 合併,單一檔案維護)
> **狀態更新(2026-07-22,依 git log 更正):** 本 repo 已有 demo app scaffold 與 diagnosis workflow(見 commit `82e02e0` scaffold demo application、`a0e7123` feat(api) diagnosis workflow、`e912ad3` feat(ui) diagnostic demo flow、`286824a` package submission demo),非僅研究與設計文件。但 deployment 是否上線、eval 是否完成仍待個別查核,不得僅憑此更新視為已完成——實際完成狀態仍以 repo、deployment、eval artifacts 現況為準。以下原始競賽時程保留作 audit record,不得視為完成紀錄。

## 〇、賽事官方事實(2026-07-14 依 [openai.devpost.com](https://openai.devpost.com/)、[Official Rules](https://openai.devpost.com/rules) 校對)

### 時程(取代先前推測值)

| 項目 | 時間(Pacific Time) |
|---|---|
| Registration Period | 7/9 10:00 am – 7/21 5:00 pm |
| **Submission Period** | 7/13 9:00 am – **7/21 5:00 pm** |
| **Judging Period** | 7/22 10:00 am – **8/5 5:00 pm**(❌ 更正:先前誤植 8/9) |
| **Winners Announced** | 約 8/12 2:00 pm |
| 免費 credits 申請截止 | 7/17 12:00 pm(表單:見下) |
| Codex/credits 使用截止 | 7/31 |

### Sponsor / Administrator

- Sponsor:OpenAI OpCo, LLC
- Administrator:Devpost, Inc.

### Tracks(已正式公布,共 4 類,取代先前「TBD」)

1. **Apps for Your Life** — 生活類消費 app(生產力、創意、居家、家庭、旅遊、健康、個人理財)
2. **Work and Productivity** — 讓團隊更快更有效的工具(流程自動化、客服、分析、業務、後勤)
3. **Developer Tools** — 開發者工具(測試、DevOps、agentic workflows、安全)
4. **Education** — 推動 AI 於教育的專案(學生/教師/教育機構皆可)✅ **教育 track 確實存在**

### 獎項(每 track 皆同,共 $100,000 對齊)

| 名次 | 現金 | 其他 |
|---|---|---|
| 1st(每 track) | $15,000 | 每隊最多 2 張 DevDay/Exchange 門票(價值 $650/張)、OpenAI Developers 曝光、與 Codex 團隊會面、Pro 帳號 1 年 |
| 2nd(每 track) | $10,000 | OpenAI Developers 曝光、Pro 帳號 1 年 |

**每個專案只能得一個獎(one Prize per Project)。**

### 評審(5 位,與先前查核一致,無變動)

- Thibault Sottiaux — Head of Product & Platform
- Kath Korevec — Member of Product Staff
- Tara Seshan — Member of Product Staff
- **Leah Belsky — VP of Education**(教育 track 送分題評審)
- Peter Steinberger — Member of Technical Staff("Clawfather")

### 評分標準(Stage 2,四項等權重;Stage 1 為 pass/fail 門檻:題目是否合理對應 + 是否合理使用 API/SDK)

1. **Technological Implementation** — 官方原文聚焦「how thoroughly and skillfully does the project use **Codex**」(⚠️ 措辭是 Codex,非 GPT-5.6;敘事應強調 agentic workflow / Codex 協作深度,而不只是模型呼叫)
2. **Design** — 完整、連貫的產品體驗,非 PoC
3. **Potential Impact** — 具體可信的真實問題 + 真實受眾論證
4. **Quality of the Idea** — 創意、非顯而易見、對問題領域有真正理解

### 提交要求(比先前版本更具體,新增項目以 **粗體** 標示)

- 選定上述 4 track 之一
- 專案文字描述
- Demo 影片:**≤3 分鐘**、需公開上傳 YouTube、**須有音訊說明如何使用 Codex 與 GPT-5.6**
- 程式碼 repo:公開(含授權)或私有並分享給 `testing@devpost.com` 與 `build-week-event@openai.com`
- **README 必須說明與 Codex 的協作過程**:哪裡加速了工作流、哪些是自己做的關鍵決策、GPT-5.6/Codex 如何影響最終成果(直接對應評分①④)
- **提供 `/feedback` 的 Codex Session ID**(核心功能主要建置那個 thread 的 session)
- 若為 plugin/dev tool:另需安裝說明、支援平台、免重建即可測試的方式(demo instance / sandbox / test account)
- 提交語言須為英文(非英文需附翻譯)
- **New & Existing 條款**:專案須為 Submission Period 內新建,或既有專案在期間內以 Codex/GPT-5.6 「meaningfully extended」——既有專案**只評期間內新增的工作**,且須提供區分舊作/新作的文件 + 期間內使用 Codex/GPT-5.6 的證據(timestamped Codex session logs、dated commit history)。✅ **更正(2026-07-22 依 git log 查核)**:先前誤植「本 repo 於 7/13 前已存在」——實際第一個 commit(`c42e49d` init: First commit.)時間為 **2026-07-14 09:44:19 GMT+8**(換算 PT 為 7/13 18:44),已在 Submission Period(7/14 00:00 GMT+8 起)之內。**全部 repo 內容皆於期間內建置,不適用 New & Existing 條款**,無需區分舊作/新作文件
- **測試存取須維持到 Judging Period 結束(8/5)**:專案須免費、無限制供 Sponsor/Administrator/評審測試至 8/5,非只到 7/21 截稿

### 資格限制(新增細節)

- 僅限「OpenAI API 支援之國家/地區」居民,見 [supported countries](https://platform.openai.com/docs/supported-countries);報名頁面 eligibility modal 已列出完整名單(約 160 國),**Taiwan 在列**
- 明確排除:Brazil, Quebec, Russia, Crimea, Cuba, Iran, North Korea, Syria 等 OFAC 制裁地區(不在報名頁 modal 名單內,以此為準)

### Devpost Plugin(選用,非必要)

- 可在 ChatGPT/Codex 內安裝,協助腦力激盪、規劃、準備提交,但**不是官方資訊來源**——衝突時一律以 Official Rules / Hackathon Website 為準
- 指令:`$find-hackathons`(找賽事)、`$start-hackathon`(報名+規則導覽)、`$resources`(最佳實踐 + 引導式 POC 建置)、`$prepare-submission`(提交前安全與資格審核)、`$submit`(完成提交表單)
- **找隊友**:提交流程中 plugin 會給一個 invite link,可分享給隊友加入——單人作業可跳過此步
- Plugin 內的 session 仍算 Codex session,但純聊天/`/checklist` 不算「實際建置」,評審看的是真的做出東西

### 官方支援管道(FAQ 補充,2026-07-15)

- 問題 FAQ 沒答到:加入 OpenAI Discord `#build-week-chat`(<https://discord.gg/openai>)或發 [Discussion Board](https://openai.devpost.com/forum_topics)
- **找隊友**(對應 participants 搜尋頁 `team_setting=1` 篩選「找隊友」者):Devpost 本身無 DM,主要靠上述 Discord 找人或 Devpost plugin 的 invite link;participants 頁面通常只能看到對方公開的外部聯絡方式(GitHub/LinkedIn 等)
- 提交後仍可編輯(FAQ 明確答「Yes」),但 Submission Period 結束(7/21 17:00 PT)後鎖死不可再改——两者不矛盾:是「截止前可改」vs「截止後不可改」

---

## 一、賽事事實(已查證,舊版本保留供對照,細節以上方「〇」為準)

- 獎池 **$100,000 現金** + credits + DevDay 門票 + spotlight。
- 已報名 **10,202 人**(2026-07-14 更新,原 2026-07-13 統計為 6,478 人,漲幅顯著),截稿 7/21 17:00 PDT,8/12 公布得獎。
- 評審 5 位皆為 OpenAI 內部人員,含 **Leah Belsky(教育副總裁)**。
- ~~Tracks 於 7/13 9:00 PDT submissions 開放時公布~~ → **已公布,見上方「〇」,4 track 含 Education**。
- 官方評分四項:①Codex 運用深度 ②完整產品體驗(非 PoC)③可信影響力論證 ④非顯而易見創意。

## 二、競爭態勢假設(非官方統計)

1. **Dev tools 可能較擁擠:**10,202 是 2026-07-14 參賽者頁面快照,不是各 track 提交量。開發者偏好不能推導實際競爭密度。
2. **Education 差異化假設:**「大量作品會是 AI tutor chatbot」尚無 submission data 支持。可主張本案不是一般 tutor,但不可稱 Education 為套利機會。**Education track 已確認存在。**
3. **內部評審啟發式**(不可包裝成官方因果模型):
   - Demo 品質與提交完整度重要,但「第一、第二預測因子」需原始研究方法才能對外聲稱。
   - GitLab 冠軍 LORE 可作完整度案例,不可由單一案例推導多 agent 或測試數量會造成得獎。
   - 拍照/多模態輸入有 demo 視覺性;「computer vision 勝率最高」若無可重現資料分析則不對外聲稱。

## 三、原始資源配置(歷史 audit record)

| 配置 | 人時 | 說明 |
|---|---|---|
| 核心 pipeline(Codex + GPT-5.6 integration) | 30 | 評分①的得分來源,寧深勿廣;注意官方措辭聚焦 Codex 協作深度 |
| 產品外殼(UI/UX 完整體驗) | 25 | 評分②:要像產品,不像 demo |
| Demo 影片 + Devpost 頁面 + README(Codex 協作說明) | 15 | 第一、二預測因子 + 評分①④的必要文件,絕不可壓縮 |
| 測試 + 文件 | 10 | LORE 模式:完整度信號 |
| 緩衝 | 10–20 | 手寫辨識等技術風險 |

**原紀律**:7/19 晚上 feature freeze,最後兩天只做 demo、文件、打磨。此日期已過,不代表實際完成。

## 四、四案總覽與推薦

| 提案 | 一句話 | ①技術 | ②完整度可行性 | ③影響力 | ④創意 | 綜合 |
|---|---|---|---|---|---|---|
| [A 錯誤考古學家](01-error-archaeologist.md) | AI 提出錯因假設並用後續題取得區辨證據 | ★★★★★ | ★★ | ★★★★ | ★★★★★ | **首推,但執行風險高** |
| [B 教學相長](02-protege-effect-tutor.md) | 學生教 AI,AI 裝不懂 | ★★★★ | ★★★★ | ★★★ | ★★★★★ | 備選 |
| [C 閱讀處方箋](03-reading-prescription.md) | 讀寫障礙的語言層級自適應閱讀 | ★★★ | ★★★ | ★★★★★ | ★★★ | — |
| [D 作業翻譯官](04-homework-bridge.md) | 讓移民家長能輔導孩子功課 | ★★ | ★★★★★ | ★★★★ | ★★★ | 保底 |

**推薦:A 案,但不再稱「四項無短板」。** 創意、問題敘事與視覺 demo 潛力強;目前短板是沒有 runnable evidence、真實使用者驗證、可靠成本與付款路徑。B 案不應在核心 pipeline、驗證與 demo 尚未完成前合併,避免擴 scope。

## 五、Tracks 已公布 —— 決策結果(原決策樹已解,保留紀錄供回溯)

```
Tracks 公布(2026-07-14 確認:Apps for Your Life / Work & Productivity / Developer Tools / Education)
└─ 有 Education track ✅
     → A 案直接投 Education track,敘事主打 Leah Belsky 關注的教學者賦能
```

行動:**已完成track確認**,無需再等待。A 案定案投 **Education** track。

## 六、產品成立閘門(取代日期驅動的完成宣稱)

| Gate | 必須交付 | 退出證據 |
|---|---|---|
| 0 真實性 | 狀態標記 RESEARCHED / DESIGNED / BUILT / VALIDATED | README 與 repo 證據一致 |
| 1 感知與數學 | 手寫 parse + 獨立代數驗證 | transcription、first-invalid-step 分開評估 |
| 2 假設與區辨題 | taxonomy candidates + 受限生成 + symbolic verifier | 預測相撞就 abstain,有自動測試 |
| 3 教師流程 | accept / revise / reject + reviewed aggregate | reject 不進 aggregate,保留 audit event |
| 4 驗證 | 外部 holdout + 多次模型 run + failure cases | 不用 30–36 個 synthetic case 宣稱科學效度 |
| 5 商業 | intervention/tutoring buyer pilot hypothesis | cost/analysis、review time、retention、paid conversion |
| 6 隱私 | synthetic/de-identified only + retention boundary | app storage check、API retention disclosure、DPA roadmap |

初始 ICP:Grade 7–9 intervention teacher / tutor coordinator;初始 buyer:tutoring 或 intervention-program operator。商業順序:provider platform fee + usage → embedded API → district license。State procurement 只放長期 roadmap。

非美國團隊敘事:公開政府資料可建立問題規模、市場結構、課程與 privacy constraints;不能建立 daily workflow 或 willingness to pay。完成 US educator remote interviews 後才可說:「在台灣以可追溯美國公開資料設計,再由美國教育者遠端驗證。」

## 七、原始共同執行時程(歷史 audit record)

| 日期 | 里程碑 |
|---|---|
| 7/13 | 看開幕直播抓評審口味;確認 tracks;定案題目;repo + Next.js 腳手架 |
| 7/14–15 | 核心 Codex + GPT-5.6 pipeline 打通(端到端一條路) |
| 7/16–17 | 產品外殼:完整 UX 流程、樣本資料集;**7/17 12:00 PT 前若需額外 credits 記得申請** |
| 7/18–19 | 第二支柱功能(各案不同)+ 測試;**7/19 晚 feature freeze** |
| 7/20 | Demo 影片(≤3 分鐘,需涵蓋 Codex + GPT-5.6 使用說明)、Devpost 頁面、README(含 Codex 協作說明) |
| 7/21 | 打磨 + 取得 `/feedback` Codex Session ID + 提前於 12:00 PDT 送出(留 5 小時緩衝於 5:00 pm 截止前) |

此表記錄原計畫,不代表里程碑已完成。實際完成狀態只看 repo、deployment、eval artifacts 與提交紀錄。

## 八、提交清單(完整度信號,已依官方 Submission Requirements 補齊)

- [ ] 已選定 track:**Education**
- [ ] Demo 影片 ≤3 分鐘,前 30 秒內出現 wow 時刻,音訊需說明如何使用 Codex 與 GPT-5.6
- [ ] 影片公開上傳 YouTube
- [ ] Devpost 頁面:問題敘事、架構圖、Codex/GPT-5.6 運用說明(對映評分①)
- [ ] 可公開訪問的 live deployment(Vercel)
- [ ] GitHub repo:公開或私有並分享給 `testing@devpost.com` + `build-week-event@openai.com`
- [ ] README:setup 說明、樣本資料、**與 Codex 的協作過程說明**(哪裡加速工作流、關鍵決策、GPT-5.6/Codex 貢獻)、測試(≥20 個,LORE 信號)
- [ ] 取得並填入 `/feedback` Codex Session ID(核心功能主要建置 thread)
- [ ] GTM 一頁(評分③的「credible, specific case」)
- [ ] 確認團隊/個人資格符合 OpenAI API supported countries 名單
- [ ] README(英文)聲明:全部 repo 內容(含首個 commit)皆建於 Submission Period 內,不適用 New & Existing 條款,附 dated commit history(首 commit `c42e49d` 2026-07-14 09:44 GMT+8)佐證
- [ ] 所有提交材料為英文(影片旁白、Devpost 頁面、README、測試說明)
- [ ] Vercel deployment 維持可用至 **8/5**(Judging Period 結束),非 7/21
