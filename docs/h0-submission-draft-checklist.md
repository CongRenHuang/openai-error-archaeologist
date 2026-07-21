# H0 Submission Draft Checklist

Deadline: **July 22, 2026, 08:00 GMT+8**. Create and save the Devpost draft before polishing copy or video.

## Human Access Gates — Do Now

- [ ] Join the OpenAI Build Week challenge while signed into the submitting Devpost account.
- [ ] Create a project draft named **Error Archaeologist**.
- [ ] Select the **Education** track and confirm team members.
- [ ] Confirm YouTube Studio can upload a **public** video with audio.
- [ ] Run `/feedback` in the Codex thread where most core functionality was built; save its Session ID in the draft.
- [x] Add an MIT repository license.
- [ ] Save the draft once. Keep the browser tab open while recording.

## Verified Project Evidence

- [x] Live demo: <https://error-archaeologist-hs2orfr2la-de.a.run.app>
- [x] Repository: <https://github.com/CongRenHuang/openai-error-archaeologist>
- [x] Runnable code began during the submission window; implementation commits start at `82e02e0` on July 22.
- [x] Production uses OpenAI Responses API, Structured Outputs, `gpt-5.6-luna`, and medium reasoning.
- [x] SymPy independently checks whether probe predictions are mathematically distinct.
- [x] Automated checks: 15 backend tests, 3 frontend workflow tests, and production frontend build.
- [x] Synthetic samples only; no student upload or PII path.

## Copy-Ready Devpost Fields

**Tagline**  
Evidence-linked hypotheses for math mistakes, tested by a symbolically verified follow-up question.

**What it does**  
Error Archaeologist examines one synthetic handwritten algebra mistake and returns two plausible, evidence-linked explanations instead of a verdict. It creates a differentiating follow-up question, uses symbolic algebra to verify that each hypothesis predicts a distinct response, and updates support after the response. Ambiguous evidence triggers abstention.

**Why it matters**  
NAEP 2024 reports 39% of US eighth graders below Basic in mathematics. This establishes problem scale, not product demand or efficacy. Error Archaeologist targets a narrower intervention problem: helping teachers and tutors decide what misconception to test next without pretending AI can read a student's mind.

**How it was built**  
Codex supported evidence auditing, scope reduction, architecture, test-first FastAPI implementation, React UI construction, SymPy safeguards, Docker packaging, and Cloud Run deployment. Human decisions defined the intervention user, rejected personality or certainty labels, kept mathematical verification independent from model output, and cut nonessential infrastructure. GPT-5.6 Luna performs multimodal structured analysis; FastAPI exposes three endpoints; SymPy verifies probe math; SQLite stores disposable demo state.

**New and existing work statement**  
The repository existed before the submission period as planning and research documents only. All runnable application code was created during the submission period with dated commits distinguishing planning from implementation.

**Testing instructions**

1. Open the live demo and choose **Negative distribution**.
2. Click **Examine this mistake**; allow about 20–45 seconds for live analysis.
3. Confirm the page shows `Live analysis · gpt-5.6-luna`, one observed transition, two hypotheses, and a verified probe.
4. Copy either displayed **Would predict** expression into **Student response**, then click **Update evidence**.
5. Confirm the matching hypothesis gains support. Select **Ambiguous handwriting** to see abstention instead of a forced label.

**Limitations**  
Current demo uses three synthetic samples and disposable SQLite state. It demonstrates product behavior, not classroom diagnostic accuracy, learning impact, educator demand, or scientific validation. Uploads, authentication, teacher review, durable storage, and field validation remain post-demo work.

## Video Handoff

- [ ] Keep total runtime below 3:00; target 2:40–2:55.
- [ ] Show live URL, synthetic-data label, model source, two hypotheses, verified probe, and changed evidence.
- [ ] Show abstention or state it clearly if live timing prevents a second model call.
- [ ] Say both **Codex** and **GPT-5.6** in audio; explain their different roles.
- [ ] Avoid claims of mind-reading, scientific validation, classroom efficacy, or proven demand.
- [ ] Upload as **Public**, copy YouTube URL into Devpost, then test it signed out.

## Final Submit Gate

- [ ] Add public YouTube URL, repository URL, live demo URL, screenshots, and `/feedback` Session ID.
- [ ] Confirm English project text and English narration or subtitles.
- [ ] Confirm repository visibility; MIT license is present.
- [ ] Open live demo and repository in signed-out windows.
- [ ] Submit before deadline; capture confirmation page and submission timestamp.
- [ ] Keep Cloud Run and repository accessible through August 5 judging end.
