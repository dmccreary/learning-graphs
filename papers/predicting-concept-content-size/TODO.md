# TODO: Finish, Publish, and Promote

This is the outreach and dissemination plan for "Predicting Concept Content
Size." **Part 1 must be done before Part 2** — the paper is currently a
pilot-stage draft (2 chapters, N=2, LLM-judge only; see `STATUS.md`), and
reaching out to real researchers and organizations with an unfinished draft
would burn credibility we'll want later. Everything in Part 2 is sourced
from live research (August 2026) rather than assumed from memory — verify
anything time-sensitive (deadlines, staff, conference dates) again close to
when you actually act on it, since roles and dates change.

---

## Part 1 — Finish the paper (prerequisite)

Pulled from `STATUS.md`'s "Not Yet Done," reordered by what actually blocks
credible outreach:

- [ ] **Get at least one independent human rating** on the Chapter 12 and/or
      Chapter 1 pilot content. This is the single biggest weakness right
      now — every result so far rests on same-model-family LLM judges
      (Claude judging Claude-generated content), and Chapter 1's split judge
      rankings make this more urgent, not less.
- [ ] **Extend to more chapters** toward the full 6-10 chapter sample the
      Evaluation section's Design subsection calls for. Two chapters show a
      consistent CIS Condorcet-winner result but an unstable B-vs-A
      relationship — more data is needed to know if that instability is
      signal or noise.
- [ ] **Write the proof for Proposition 1** (Section 4) — currently a proof
      sketch in comments only.
- [ ] **Draft full prose** for all 9 sections — most are still bulleted
      outlines with `% TODO` markers, not submittable text.
- [ ] **Create the figures** in `figures/suggested-figures.md`: the toy-DAG
      in-degree-vs-CIS divergence example, and the real Algebra I divergence
      chart (data already sitting in `data/algebra1-concept-impact.csv`).
- [ ] **Verify every `[snippet]`-flagged reference** in `references.bib`
      against the primary source — several were only confirmed via search
      snippets, not full text, during initial research.
- [ ] **Decide on the cross-model claim** (Claude vs. Gemini/Antigravity):
      either re-run it under controlled conditions with output preserved
      this time, or drop it to "future work" and say so explicitly. Don't
      leave it as an unsupported anecdote in the final draft.
- [ ] **Tighten the abstract** to under 250 words once Sections 4-7 are
      final (arXiv convention; currently a working draft, longer).
- [ ] **Pick and lock the author list.** Currently just Dan McCreary
      (`main.tex`) with a `% TODO: add co-authors` marker — decide before
      submission, since arXiv author lists are awkward to change after the
      fact and this affects how outreach in Part 2 should be framed (single
      author vs. team).

---

## Part 2 — Publish

### 2.1 arXiv submission

- [ ] **Category.** Following the same author's prior arXiv paper
      (MicroSims) convention: primary **cs.CY** (Computers and Society),
      secondary **cs.AI**. Consider also cross-listing **cs.SI** (Social and
      Information Networks) given the graph-centrality (PageRank-style CIS)
      contribution, or **cs.CL** if the LLM-prompting angle is emphasized in
      the final draft.
- [ ] **License.** CC BY 4.0 is the OER-community norm and matches the
      spirit of the paper's subject matter (open, AI-generated textbooks) —
      more reusable for the audience in 2.3 than a more restrictive arXiv
      default.
- [ ] **Submission checklist**: compile cleanly with `./build.sh` one more
      time, verify no undefined references/citations, proofread, then
      submit via arxiv.org (needs an arXiv account with endorsement in
      cs.CY, or use an existing endorsed author).

### 2.2 Target journals (peer-reviewed, ranked by topical fit)

1. **[Open Praxis](https://openpraxis.org)** (journal of the [International
   Council for Open and Distance Education](https://icde.org/open-praxis/),
   ICDE) — **best fit found**. Quarterly, peer-reviewed, open access, no
   fees. Already publishes directly on this intersection — see ["Generative
   AI, Synthetic Contents, Open Educational Resources (OER), and Open
   Educational Practices (OEP): A New Front in the Openness
   Landscape"](https://openpraxis.org/articles/10.55982/openpraxis.15.3.579),
   which is close enough to our topic to cite in Related Work regardless.
   Uses APA 7; see [submission guidelines](https://openpraxis.org/about/submissions).
2. **[IRRODL](https://www.irrodl.org)** (International Review of Research
   in Open and Distributed Learning) — free, open access, no fees, 4,000–7,000
   word research articles, double-blind review. Scope is "open and
   distributed learning" specifically — frame the submission around content
   generation *for open textbooks*, not general AI/education, to fit.
3. **EDUCAUSE Review** — not peer-reviewed (a magazine, not a journal), but
   very high reach in higher-ed IT/edtech leadership. Good for a
   plain-language companion piece pointing back to the arXiv paper, not a
   replacement for peer-reviewed publication. **Note their explicit policy**
   (verified from their [contributor guidelines](https://er.educause.edu/about/contributor-guidelines)):
   AI cannot be listed as author, cannot generate the majority of the
   content, and any AI use must be disclosed. Any EDUCAUSE Review piece
   needs to be substantially human-written/edited by Dan, with AI
   involvement disclosed per their policy — plan for that, don't just adapt
   the arXiv text.
4. Stretch/secondary: **IEEE Transactions on Learning Technologies** or
   **Computers & Education** if reviewer feedback suggests broadening
   beyond the OER-specific framing — these are stronger for the CIS
   methodology and evaluation design on their own merits, weaker fit for
   the "OER influencer" audience specifically requested here.

### 2.3 Target conferences

- **[OEGlobal 2026](https://conference.oeglobal.org/2026/)** — Oct 7–9,
  2026, MIT (hybrid), co-hosted with MIT Open Learning. Given today's date
  this is roughly 6 weeks out — **too late for a full paper**, but check
  their site for a late-breaking/poster/lightning-talk track before writing
  it off entirely.
- **OEGlobal 2027** — realistic target once Part 1 is done. Watch
  `oeglobal.org` for the CFP (typically opens several months ahead).
- **Open Education Conference (OpenEd)** — the other major OER conference
  (historically organized by David Wiley through 2019; reorganized under a
  community-elected board since 2022). Verify current organizing body and
  2027 CFP timing before targeting — this needs a fresh check closer to the
  date, the search results available now were inconclusive on 2027 details.
- **AIED workshops** (not the AIED main track) — the [AIED
  conference](https://aied-conference.org) main track is a high-bar,
  competitive, fully-empirical venue (Springer LNAI proceedings); this
  paper's current pilot-stage evidence doesn't clear that bar yet. AIED
  workshops (many editions run an early/exploratory-work track) are a much
  better fit and a good secondary venue for the CIS methodology
  specifically, distinct from the OER-outreach angle. Check the current
  year's AIED workshop list once Part 1 is closer to done.
- **Skip for now**: conferences discovered during research whose legitimacy
  wasn't verified (e.g. newer "1st International Conference on AI in
  Education"-style events advertised via generic conference-alert
  aggregators) — vet organizer reputation and past-year proceedings quality
  before considering any conference not already well-known to the OER/AIED
  community.

---

## Part 3 — Promote

**Important framing note:** this is Dan's own outreach to do personally,
not a mailing list to blast. Everyone below is a real person or
organization doing genuinely relevant work — the point is a short, specific,
personal note ("I built X, here's why it might interest you, happy to hear
your take") once the paper is actually finished, not a form letter to a
list. A couple of names below have moved roles recently (noted where
found) — reverify current role/contact before reaching out.

### 3.1 People (verified current roles as of this research, Aug 2026)

- **David Wiley** — Chief Academic Officer, Lumen Learning; coined "open
  content" and the 5R framework; founded the original Open Education
  Conference. His current stated work is explicitly "at the intersection of
  generative AI, open education, ... and student success" —
  [davidwiley.org](https://davidwiley.org), blog at
  [blog.lumenlearning.com/author/david-wiley](https://blog.lumenlearning.com/author/david-wiley).
  **Best individual fit found** — this paper is almost exactly his current
  stated interest area.
- **Nicole Allen** — Director of Open Education, SPARC
  ([sparcopen.org](https://sparcopen.org)). SPARC is the leading US policy/
  advocacy org for open education; worth a note plus considering SPARC's
  newsletter/blog as an amplification channel.
- **Cable Green** — departed as Creative Commons' Director of Open
  Education around October 2025, moved to the CC Advisory Council. **Verify
  who currently holds that CC role** before addressing outreach to
  "Creative Commons Director of Open Education" — the name has changed
  since most existing write-ups about this role were published.
- **Rajiv Jhangiani** — OER researcher and open pedagogy advocate
  (co-author, *Open: The Philosophy and Practices That Are Revolutionizing
  Education and Science*). Not independently re-verified in this research
  pass — confirm current affiliation before reaching out.
- **Open Praxis editorial team** — via the journal's own submission/contact
  process (2.2 above); a submission there is itself a form of outreach to
  the people most likely to actually read and cite this work.

### 3.2 Organizations / channels

- **[SPARC](https://sparcopen.org)** — advocacy org; newsletter and blog
  are real amplification channels once there's a finished paper to point to.
- **[Open Education Global](https://www.oeglobal.org)** — runs OEGlobal
  (2.3); also publishes member news/blog content that surfaces member work.
- **[Open Textbook Library / Open Education Network](https://open.umn.edu/opentextbooks)**
  (Sarah Faye Cohen, Managing Director) — more relevant to the *underlying
  Algebra I intelligent textbook* than to the research paper itself; worth
  a separate outreach once that book is far enough along to submit for
  their peer-review project.
- **[OER Commons / ISKME](https://oercommons.org)** — repository and
  curated collections; has an active "AI Resources for Educators"
  collection, a plausible fit for surfacing this work to practitioners.
- **[Clover Park Technical College's AI+OER
  Institute](https://cptc.libguides.com/TLC/AIOER2026)** — a live, current
  (2026) initiative specifically on the AI+OER intersection; worth checking
  whether they take community submissions or have a mailing list.
- **EDUCAUSE Review** — see 2.2; both a publication target and, once
  published, a promotion channel via their existing readership.

### 3.3 Social / community

- OER community is active on Mastodon and Bluesky under
  `#OpenEd`/`#OER`/`#OpenEducation` hashtags — check current activity
  levels before assuming a specific platform, this shifts over time.
- LinkedIn: David Wiley, Nicole Allen, and most people in 3.1 are active
  there; a short post tagging relevant people (once the paper is finished)
  reaches further than cold email alone.
- Consider a short companion blog post (Dan's own site, if he has one, or
  as a guest post) summarizing the paper's practical finding — "why we size
  textbook chapter content by a PageRank-style importance score, not word
  count" — as a lower-friction entry point than the full arXiv PDF for
  non-researcher practitioners.

---

## Open questions to resolve before starting Part 2

1. Author list (Part 1, last item) — affects how every outreach note in
   Part 3 should read.
2. Target journal priority — Open Praxis vs. IRRODL vs. both sequentially
   (most journals don't allow simultaneous submission).
3. Whether the underlying Algebra I intelligent textbook itself should also
   go through the Open Textbook Library's review process, separately from
   the research paper about the method used to build it.
