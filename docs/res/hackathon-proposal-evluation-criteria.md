# Hackathon Proposal Evaluation Criteria

> Hackathon Proposal Evaluation Criteria — Ten Core Principles
> v1.0

---

## Part 1: Is the Problem Worth Solving?

### Is the Problem Worth Solving?

---

### 01. Verifiability — Evidence-based Problem Definition

The pain points, needs, and user scenarios claimed in the proposal must be supported by traceable external evidence—including government open data, academic papers, industry research reports, or official statistics. Assertions based on "I feel" or "there should be many people" are strictly prohibited as the foundation of the problem.

> **Criterion:** Can the **scale** (how many people are affected) and **intensity** (the degree of impact) of the problem be quantified?

---

### 02. Reusability — Framework Decoupling

The core framework of the proposal must be decoupled from its AI implementation layer. A methodology validated in an educational scenario should be translatable to other fields such as healthcare, legal, or manufacturing, simply by swapping the outer tools and knowledge sources.

> **Criterion:** If the LLM is removed, does the remaining process design still function as an effective problem-solving framework?

---

### 03. Universality — Deployment Adaptability

The deployment solution must possess the flexibility to adapt to heterogeneous environments—such as different school administration systems or existing government infrastructure across various agencies. The design should be predicated on standard interfaces and configurable parameters, rather than bespoke implementations tied to a single client.

> **Criterion:** How much code needs to be rewritten when switching to a different client?

---

### 04. Demand-Driven — Pre-LLM Baseline

It must answer: How was this pain point handled before the advent of LLMs? Where do existing solutions (manual labor, rule engines, traditional ML, SOPs) fail? Does the LLM provide a **qualitative change** (impossible before) or a **quantitative change** (too expensive before)?

> **Criterion:** If the existing solution is simply "slower," then the LLM is a nice-to-have rather than a necessity—proposals of this nature are inherently less persuasive.

---

### 05. Commercial Value — Value Chain Mapping

Clearly identify three key roles in the value chain:

- **User:** Who is using it?
- **Payer:** Who is paying for it?—often not the user themselves.
- **Incumbent:** Who is profiting under the current system, and does this proposal move their cheese?

> **Criterion:** If the user and the payer are separate (e.g., students use it, but the school purchases it), the payer's purchasing motivation must be clearly articulated.

---

## Part 2: Why Are You the One to Solve It?

### Why Are You the One to Solve It?

---

### 06. Feasibility Boundaries — Scope Realism

Bounded by the hackathon timebox (prior to Demo Day), clearly separate "what can be completed this time" from the "future roadmap." The proposal should honestly indicate which parts are mock-ups and which are fully functional.

> **Criterion:** An artificially inflated sense of completeness is easily exposed during the live Demo.

---

### 07. Cost of Failure and Risk — Failure Tolerance

When the LLM generates an error, who bears the consequences? Providing a wrong answer in an educational setting versus a wrong recommendation in a medical setting involves vastly different levels of fault tolerance. High-risk domains must incorporate Human-in-the-Loop designs or confidence score thresholds.

> **Criterion:** Proposals lacking risk mitigation designs are viewed as irresponsible by the judges.

---

### 08. Data Accessibility — Data Sourcing Feasibility

Can the data required for the proposal actually be obtained under realistic conditions? Is it public, does it require authorization, or does it simply not exist? This is the most common cause of death for proposals—a great concept, but the data source is either illegal or non-existent.

> **Criterion:** The data sources and acquisition paths should be explicitly stated during the proposal phase.

---

### 09. Demo Visibility — Demonstrability

Judges make their decisions within a limited timeframe. No matter how deep the analysis is, if the final output is just a report, it will lose to an interactive, visual interface.

> **Criterion:** The proposal design should be reverse-engineered—**how can this be demonstrated within 5 minutes?**

---

### 10. Moat — Defensibility

If the project is merely "wrapping a UI around GPT," anyone can replicate it within a week. Where does the proposal's indispensability come from—exclusive data, accumulated domain know-how, process reengineering, or network effects?

> **Criterion:** Without this element, any arguments regarding commercial value will ring hollow.

---

## The Bottom Line

The first five principles ask, "**Is the problem worth solving?**" The latter five ask, "**Why are you the one to solve it?**"

Missing either one, the proposal is nothing more than a clever technical showcase.
