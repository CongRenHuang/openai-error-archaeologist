import { useEffect, useMemo, useState } from "react";

import type {
  AnalysisEnvelope,
  ApiErrorBody,
  EvidenceUpdate,
  Sample,
} from "./types";
import {
  phaseForAnalysis,
  phaseForUpdate,
  responseForCandidate,
  type Phase,
} from "./workflow";

async function errorMessage(response: Response): Promise<string> {
  const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
  const message = body.detail?.message ?? `Request failed (${response.status})`;
  const correlation = body.detail?.correlation_id;
  return correlation ? `${message} Reference: ${correlation}` : message;
}

export default function App() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [phase, setPhase] = useState<Phase>("selection");
  const [analysis, setAnalysis] = useState<AnalysisEnvelope | null>(null);
  const [update, setUpdate] = useState<EvidenceUpdate | null>(null);
  const [probeResponse, setProbeResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void fetch("/api/v1/samples")
      .then(async (response) => {
        if (!response.ok) throw new Error(await errorMessage(response));
        return response.json() as Promise<Sample[]>;
      })
      .then((items) => {
        setSamples(items);
        setSelectedId(items[0]?.id ?? "");
      })
      .catch((reason: Error) => {
        setError(reason.message);
        setPhase("error");
      });
  }, []);

  const selectedSample = useMemo(
    () => samples.find((sample) => sample.id === selectedId) ?? null,
    [samples, selectedId],
  );

  async function analyze() {
    if (!selectedId) return;
    setPhase("analyzing");
    setError("");
    setUpdate(null);
    try {
      const response = await fetch("/api/v1/analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sample_id: selectedId }),
      });
      if (!response.ok) throw new Error(await errorMessage(response));
      const nextAnalysis = (await response.json()) as AnalysisEnvelope;
      setAnalysis(nextAnalysis);
      setPhase(phaseForAnalysis(nextAnalysis.result.status));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Analysis failed.");
      setPhase("error");
    }
  }

  async function checkResponse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!analysis || !probeResponse.trim()) return;
    setError("");
    try {
      const response = await fetch("/api/v1/probe-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis_id: analysis.id,
          response: probeResponse,
        }),
      });
      if (!response.ok) throw new Error(await errorMessage(response));
      const nextUpdate = (await response.json()) as EvidenceUpdate;
      setUpdate(nextUpdate);
      setPhase(phaseForUpdate(nextUpdate.status));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Response check failed.");
      setPhase("error");
    }
  }

  function reset() {
    setAnalysis(null);
    setUpdate(null);
    setProbeResponse("");
    setError("");
    setPhase("selection");
  }

  const result = analysis?.result;
  const probe = result?.status === "diagnosed" ? result.probe : null;

  return (
    <main className="shell">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Error Archaeologist home">
          <img
            className="wordmark-mark"
            src="/error-archaeologist-logo.png"
            alt=""
            width="40"
            height="40"
          />
          <span>Error Archaeologist</span>
        </a>
        <p className="track">OpenAI Build Week · Education</p>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">One wrong line. More than one explanation.</p>
        <h1>Wrong answer.<br />Two possible stories.</h1>
        <p className="lede">
          Inspect evidence, test competing hypotheses, then let symbolic algebra
          check whether the follow-up question can distinguish them.
        </p>
        <div className="principle"><span>01</span> Hypothesis, not verdict</div>
      </section>

      <section className="workbench" aria-live="polite">
        <aside className="artifact-panel">
          <div className="section-label"><span>Artifact</span><b>Student work</b></div>
          {phase === "selection" && (
            <div className="sample-list" role="radiogroup" aria-label="Synthetic samples">
              {samples.map((sample, index) => (
                <button
                  className={`sample-choice ${sample.id === selectedId ? "selected" : ""}`}
                  key={sample.id}
                  onClick={() => setSelectedId(sample.id)}
                  role="radio"
                  aria-checked={sample.id === selectedId}
                >
                  <span className="sample-number">0{index + 1}</span>
                  <span><b>{sample.title}</b><small>{sample.description}</small></span>
                </button>
              ))}
            </div>
          )}
          {selectedSample && (
            <figure className="artifact-frame">
              <img src={selectedSample.image_url} alt={`Synthetic sample: ${selectedSample.title}`} />
              <figcaption>Synthetic artifact · {selectedSample.skill}</figcaption>
            </figure>
          )}
          {phase === "selection" && (
            <button className="primary-action" onClick={() => void analyze()} disabled={!selectedId}>
              Examine this mistake <span aria-hidden="true">→</span>
            </button>
          )}
          {phase === "analyzing" && (
            <div className="analyzing"><span className="scan-line" />Reading steps · testing probe math…</div>
          )}
        </aside>

        <section className="evidence-panel">
          <div className="section-label"><span>Field notes</span><b>Evidence record</b></div>

          {phase === "selection" && (
            <div className="empty-notes">
              <span className="large-index">?</span>
              <p>Select one artifact. Evidence appears here—never a personality label.</p>
            </div>
          )}

          {phase === "analyzing" && (
            <ol className="analysis-steps">
              <li className="active">Read handwritten transitions</li>
              <li>Locate first invalid step</li>
              <li>Verify distinct predictions</li>
            </ol>
          )}

          {phase === "abstention" && result && (
            <div className="abstention-card">
              <span className="status-stamp">System abstained</span>
              <h2>Evidence stops here.</h2>
              <p>{result.abstain_reason}</p>
              <p className="boundary-note">Unclear symbols can change the math, so no misconception label is produced.</p>
              <button className="text-action" onClick={reset}>Inspect another artifact →</button>
            </div>
          )}

          {result?.status === "diagnosed" && probe && (
            <>
              <div className={`model-source ${analysis?.source === "fixture" ? "fixture" : "live"}`}>
                {analysis?.source === "fixture"
                  ? "Fixture mode — deterministic test output"
                  : `Live analysis · ${analysis?.source}`}
              </div>
              <div className="observation">
                <p className="micro-label">Observed transition</p>
                <h2>{result.observed_error}</h2>
                <div className="evidence-strip">
                  <span>Evidence</span>
                  <code>{result.candidates[0]?.evidence_step}</code>
                </div>
              </div>

              <div className="candidate-grid">
                {result.candidates.map((candidate, index) => {
                  const supported = update?.supported_candidate_id === candidate.id;
                  return (
                    <article className={`candidate ${supported ? "supported" : ""}`} key={candidate.id}>
                      <div className="candidate-heading">
                        <span>Hypothesis {String.fromCharCode(65 + index)}</span>
                        {supported && <b>Gained support</b>}
                      </div>
                      <h3>{candidate.label}</h3>
                      <p>Would predict <code>{candidate.predicted_answer}</code></p>
                      {phase === "diagnosis" && (
                        <button
                          className="candidate-response"
                          type="button"
                          onClick={() => setProbeResponse(responseForCandidate(candidate))}
                          aria-label={`Use response predicted by hypothesis ${String.fromCharCode(65 + index)}`}
                        >
                          Use this response
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="probe-card">
                <div className="verified-badge"><span>✓</span> Verified with symbolic algebra</div>
                <p className="micro-label">Differentiating probe</p>
                <h2>{probe.question}</h2>
                {phase === "diagnosis" && (
                  <form onSubmit={(event) => void checkResponse(event)}>
                    <label htmlFor="probe-response">Student response</label>
                    <div className="response-row">
                      <input
                        id="probe-response"
                        value={probeResponse}
                        onChange={(event) => setProbeResponse(event.target.value)}
                        placeholder="e.g. -4b - 12"
                        autoComplete="off"
                      />
                      <button type="submit" disabled={!probeResponse.trim()}>Update evidence</button>
                    </div>
                  </form>
                )}
                {phase === "updated" && update && (
                  <div className={`update-result ${update.status}`}>
                    <span>{update.status === "candidate_supported" ? "Evidence changed" : "Result"}</span>
                    <p>{update.explanation}</p>
                    <button className="text-action" onClick={reset}>Inspect another artifact →</button>
                  </div>
                )}
              </div>
            </>
          )}

          {phase === "error" && (
            <div className="error-card">
              <span className="status-stamp">Analysis unavailable</span>
              <h2>Keep the artifact. Retry the connection.</h2>
              <p>{error}</p>
              <button className="text-action" onClick={reset}>Return to samples →</button>
            </div>
          )}
        </section>
      </section>

      <footer>
        <p>Synthetic samples only · No student identity · Disposable demo state</p>
        <p>Model proposes. Symbolic algebra verifies. Teacher judges.</p>
      </footer>
    </main>
  );
}
