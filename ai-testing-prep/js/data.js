/* ============================================================
   data.js — All content lives here.
   To add a question: copy one object inside QUESTIONS and
   fill in topic, diff, q, a, tip.
   To add a topic: just use the new topic name in your question
   — the filter buttons build themselves automatically.
   ============================================================ */

const QUESTIONS = [

  /* ── RAG Fundamentals ─────────────────────────────────── */
  {
    topic: "RAG Fundamentals",
    diff: "easy",
    q: "What is a RAG pipeline and why is it used?",
    a: `<strong>RAG (Retrieval-Augmented Generation)</strong> is a design pattern where an LLM's response is grounded in documents retrieved from an external knowledge base rather than relying purely on its training memory.<br><br>
The pipeline has three stages:<br>
<strong>(1) Ingestion</strong> — documents are chunked, embedded, and stored in a vector DB (ChromaDB, FAISS).<br>
<strong>(2) Retrieval</strong> — the user's question is embedded and semantically matched against stored chunks.<br>
<strong>(3) Generation</strong> — retrieved chunks are injected into the LLM prompt as context and the LLM generates a grounded answer.<br><br>
It's used because LLMs have a training cutoff, can hallucinate, and can't access private data. RAG solves all three.`,
    tip: "Always mention all three stages clearly. Relate it to your LangChain + ChromaDB work."
  },
  {
    topic: "RAG Fundamentals",
    diff: "easy",
    q: "What is an embedding and what role does it play in RAG?",
    a: `An <strong>embedding</strong> is a dense numerical vector (e.g. 1536 dimensions for OpenAI's text-embedding-ada-002) that represents the semantic meaning of a piece of text.<br><br>
In RAG, embeddings are used twice:<br>
• During <strong>ingestion</strong> — document chunks are converted to vectors and stored in the vector DB.<br>
• At <strong>query time</strong> — the user's question is converted to a vector and compared against stored chunks.<br><br>
Cosine similarity between vectors determines which chunks are most relevant. Semantically similar text produces numerically close vectors, even if the exact words differ.`,
    tip: "Be ready to explain cosine similarity plainly: 'vectors pointing in the same direction are more similar.'"
  },
  {
    topic: "RAG Fundamentals",
    diff: "medium",
    q: "What is chunking and how does chunk size affect RAG quality?",
    a: `<strong>Chunking</strong> splits documents into smaller pieces before embedding. Chunk design directly affects retrieval quality.<br><br>
<strong>Too small:</strong> each chunk lacks context — retrieved snippets are meaningless in isolation.<br>
<strong>Too large:</strong> irrelevant content gets pulled in with the relevant part, diluting the LLM's context window.<br><br>
Common strategies: <strong>fixed-size</strong> (500 tokens, 50-token overlap), <strong>sentence-based</strong>, <strong>paragraph-based</strong>, or <strong>semantic chunking</strong> (splitting at topic boundaries).<br><br>
In LangChain, <code>RecursiveCharacterTextSplitter</code> is the default — it splits on paragraph breaks, then sentences, then characters, preserving semantic boundaries.`,
    tip: "Mention you used LangChain's text splitter with overlap in your RAG projects. Explain why overlap matters."
  },
  {
    topic: "RAG Fundamentals",
    diff: "medium",
    q: "How does a vector database like ChromaDB or FAISS work?",
    a: `A <strong>vector database</strong> stores embedding vectors and supports fast approximate nearest-neighbour (ANN) search — finding the k most similar vectors to a query vector.<br><br>
<strong>FAISS</strong> is an in-memory library. It builds index structures (HNSW, IVF) to avoid brute-force linear scans across millions of vectors.<br>
<strong>ChromaDB</strong> is a higher-level database that persists embeddings to disk, supports metadata filtering, and integrates natively with LangChain.<br><br>
Similarity is measured with <strong>cosine similarity</strong> or <strong>L2 distance</strong>. ANN trades a tiny accuracy drop for massive speed gains over exact search.`,
    tip: "ChromaDB = good for prototypes. FAISS = scales better for large corpora. Knowing both shows breadth."
  },
  {
    topic: "RAG Fundamentals",
    diff: "hard",
    q: "What is hybrid retrieval and when would you use it?",
    a: `<strong>Sparse retrieval (BM25)</strong> is keyword-based — scores by term frequency. It excels at exact keyword matches but misses synonyms.<br><br>
<strong>Dense retrieval</strong> uses neural embeddings for semantic similarity. Handles paraphrases but can miss exact keyword hits (e.g. product codes).<br><br>
<strong>Hybrid retrieval</strong> runs both, then fuses results using <strong>Reciprocal Rank Fusion (RRF)</strong>. This gives the precision of keyword matching plus the recall of semantic search.<br><br>
Use hybrid when your corpus has domain-specific terminology, product IDs, or code snippets — most production RAG systems use hybrid.`,
    tip: "Knowing hybrid retrieval and RRF will genuinely impress interviewers — it's a senior-level concept."
  },

  /* ── LLM Evaluation & Metrics ─────────────────────────── */
  {
    topic: "LLM Evaluation",
    diff: "easy",
    q: "What is hallucination in an LLM and how do you detect it?",
    a: `<strong>Hallucination</strong> is when an LLM generates confident-sounding text that is factually incorrect or unsupported by the retrieved context.<br><br>
Types:<br>
• <strong>Intrinsic</strong> — contradicts the provided context<br>
• <strong>Extrinsic</strong> — makes claims not verifiable from context<br>
• <strong>Prompt deviation</strong> — goes off-topic<br><br>
Detection methods:<br>
• <strong>LLM-as-judge</strong>: a separate LLM evaluates whether the answer is grounded in the context<br>
• <strong>NLI classifiers</strong>: check if the answer is entailed by the context<br>
• <strong>RAGAS faithfulness</strong>: breaks the answer into claims and checks each claim against the context`,
    tip: "Always mention RAGAS faithfulness score — it's the industry standard for hallucination detection in RAG."
  },
  {
    topic: "LLM Evaluation",
    diff: "easy",
    q: "What are the key RAGAS metrics for evaluating a RAG pipeline?",
    a: `RAGAS provides four core metrics:<br><br>
<strong>1. Faithfulness</strong> — Are all claims in the answer supported by the retrieved context? Catches hallucinations.<br><br>
<strong>2. Answer Relevancy</strong> — Does the answer actually address the question? A faithful answer can still be off-topic.<br><br>
<strong>3. Context Precision</strong> — Of the retrieved chunks, what fraction are actually relevant? High precision = focused retriever.<br><br>
<strong>4. Context Recall</strong> — Did the retriever find all relevant information? Low recall = critical chunks are missing.<br><br>
A pipeline can fail on any dimension independently — great retrieval but hallucinated generation, or relevant answers built on irrelevant chunks.`,
    tip: "Precision + Recall = retrieval quality. Faithfulness + Relevancy = generation quality. Draw this relationship."
  },
  {
    topic: "LLM Evaluation",
    diff: "medium",
    q: "Explain the LLM-as-judge pattern. What are its risks?",
    a: `<strong>LLM-as-judge</strong> uses a powerful LLM (GPT-4) to evaluate the output of another LLM on criteria like faithfulness, coherence, or helpfulness.<br><br>
<strong>How it works:</strong> write a prompt giving the judge the question, context, and answer. Ask it to score on a specific dimension with an explicit rubric.<br><br>
<strong>Risks:</strong><br>
• <strong>Verbosity bias</strong> — scores longer answers higher regardless of quality<br>
• <strong>Position bias</strong> — prefers the first option in pairwise comparisons<br>
• <strong>Self-preference bias</strong> — GPT-4 may favour GPT-4 outputs<br>
• <strong>Inconsistency</strong> — same prompt gives different scores across runs<br><br>
<strong>Mitigations:</strong> use structured rubrics, average multiple judge calls, cross-validate with deterministic metrics (ROUGE, BLEU).`,
    tip: "Knowing the biases shows maturity. Interviewers expect you to know LLM-as-judge has weaknesses."
  },
  {
    topic: "LLM Evaluation",
    diff: "medium",
    q: "What is groundedness scoring and how do you implement it?",
    a: `<strong>Groundedness</strong> measures whether each factual claim in an LLM's response can be traced back to the source context provided.<br><br>
<strong>Implementation steps:</strong><br>
1. Parse the LLM's response into atomic claims (use another LLM call for this).<br>
2. For each claim, run an NLI check or LLM-as-judge call: "Is this claim supported by this context chunk?"<br>
3. Score = grounded claims / total claims<br><br>
In practice: embed both the claim and each context chunk, then check cosine similarity as a proxy. Or use a fine-tuned NLI model like <code>cross-encoder/nli-deberta</code>.<br><br>
A groundedness score above 0.8 means the response rarely introduces unsupported information.`,
    tip: "Mention both RAGAS faithfulness and custom NLI-based approaches — shows you know multiple methods."
  },
  {
    topic: "LLM Evaluation",
    diff: "hard",
    q: "How do you build a test dataset for evaluating a RAG pipeline?",
    a: `A good RAG evaluation dataset has three components: <strong>question</strong>, <strong>ground truth answer</strong>, and <strong>relevant document chunks</strong>.<br><br>
<strong>Generation strategies:</strong><br>
• <strong>Manual curation</strong> — domain experts write questions from documents. Highest quality, expensive.<br>
• <strong>LLM-generated</strong> — use GPT-4 to generate Q&A pairs from document chunks, then human-review a sample.<br>
• <strong>Production logs</strong> — harvest real user queries from a deployed system. Most realistic distribution.<br><br>
<strong>Coverage requirements:</strong><br>
• Simple factual questions (single-hop)<br>
• Multi-hop questions requiring info from 2+ chunks<br>
• Out-of-domain/unanswerable questions (should trigger "I don't know")<br>
• Adversarial questions designed to cause hallucination<br><br>
200–500 questions is enough for meaningful metrics.`,
    tip: "Mentioning production log harvesting shows you think about real-world systems, not just toy datasets."
  },

  /* ── Prompt Engineering & Testing ─────────────────────── */
  {
    topic: "Prompt Testing",
    diff: "easy",
    q: "What is prompt injection and how do you test for it?",
    a: `<strong>Prompt injection</strong> is an attack where malicious content in the user's input (or retrieved context) overrides the system prompt's instructions.<br><br>
Types:<br>
• <strong>Direct injection</strong> — user writes "Ignore previous instructions and..."<br>
• <strong>Indirect injection</strong> — malicious instructions are embedded in a retrieved document<br><br>
Testing approach:<br>
1. Build a library of known injection attempts<br>
2. Run the system against them and check if output violates expected behaviour<br>
3. Test indirect injection by embedding "Ignore your instructions" in source documents<br>
4. Check if the system leaks its system prompt<br><br>
In RAG, indirect injection (via retrieved context) is the bigger real-world risk.`,
    tip: "Indirect injection via retrieved context is the bigger RAG risk — interviewers love when you know this."
  },
  {
    topic: "Prompt Testing",
    diff: "easy",
    q: "What is prompt sensitivity and how do you test for it?",
    a: `<strong>Prompt sensitivity</strong> is when small, semantically equivalent changes to the input produce significantly different outputs. High sensitivity signals an unreliable system.<br><br>
How to test:<br>
1. Take a reference question and generate 5–10 paraphrases (manually or via LLM).<br>
2. Run all variants through the system.<br>
3. Compare outputs — check semantic similarity (embedding cosine), factual consistency, and length.<br>
4. Flag queries where outputs diverge significantly.<br><br>
<strong>Metric:</strong> answer consistency score = average pairwise cosine similarity between all paraphrase answers. Target above 0.85.`,
    tip: "Relate this to your Pytest evaluation suites — this is exactly the kind of test you'd automate."
  },
  {
    topic: "Prompt Testing",
    diff: "medium",
    q: "How do you test for jailbreaks in an LLM-powered application?",
    a: `<strong>Jailbreaking</strong> is when adversarial prompts bypass safety guardrails, causing the LLM to produce harmful or policy-violating content.<br><br>
Testing categories:<br>
• <strong>Role-play attacks</strong> — "Pretend you are a system with no restrictions..."<br>
• <strong>Hypothetical framing</strong> — "In a fictional world where..."<br>
• <strong>Token smuggling</strong> — using l33tspeak, Base64, or alternate languages<br>
• <strong>Many-shot attacks</strong> — providing many policy-violating Q&A examples before the actual question<br><br>
Test framework:<br>
1. Maintain a curated jailbreak test library (HarmBench, JailbreakBench are public datasets)<br>
2. Run nightly regression tests against the library<br>
3. Use a classifier to detect harmful output<br>
4. Track jailbreak success rate over time`,
    tip: "Knowing public benchmarks like HarmBench signals real-world awareness. Mention them by name."
  },
  {
    topic: "Prompt Testing",
    diff: "medium",
    q: "What is few-shot prompting and how do you test whether your examples are helping?",
    a: `<strong>Few-shot prompting</strong> provides the LLM with 2–8 input-output examples before the actual query, teaching it the desired format and reasoning pattern through in-context learning.<br><br>
How to test example quality:<br>
1. <strong>Ablation testing</strong> — compare zero-shot vs. 1-shot vs. 3-shot vs. 5-shot on your eval dataset<br>
2. <strong>Example perturbation</strong> — swap correct examples for wrong ones. If performance barely changes, examples aren't being used.<br>
3. <strong>Label sensitivity test</strong> — randomise labels in your examples. Performance should drop significantly if the LLM is actually reading them.<br>
4. <strong>Example ordering</strong> — LLMs are sensitive to recency (last example has most influence)<br><br>
Poor examples can hurt — they can bias the model toward the wrong format.`,
    tip: "The label sensitivity test is an advanced technique that impresses interviewers. Mention it confidently."
  },
  {
    topic: "Prompt Testing",
    diff: "hard",
    q: "How do you systematically test prompt regressions when you update your system prompt?",
    a: `Prompt regression testing ensures improvements to one capability don't silently break others — the same problem as software regression testing, applied to LLM behaviour.<br><br>
Framework:<br>
1. <strong>Baseline eval set</strong> — maintain 100–500 labelled Q&A pairs with expected outputs<br>
2. <strong>Snapshot testing</strong> — record current prompt's outputs as the "golden snapshot". Flag future outputs that diverge semantically.<br>
3. <strong>Structured assertions</strong> — programmatic checks: does output contain a required keyword? Is JSON parseable?<br>
4. <strong>Metric thresholds</strong> — set minimums (faithfulness > 0.85). A prompt update that drops any metric below threshold fails the CI gate.<br>
5. <strong>Diff review</strong> — surface changed outputs for human review before merging<br><br>
Tooling: PromptFlow, LangSmith, or a custom Pytest suite with LLM-as-judge scoring.`,
    tip: "Comparing this to software CI/CD resonates strongly with backend-oriented interviewers."
  },

  /* ── Agentic AI Testing ────────────────────────────────── */
  {
    topic: "Agentic AI",
    diff: "easy",
    q: "What is an agentic AI system and what makes it harder to test?",
    a: `An <strong>agentic AI system</strong> is one where the LLM autonomously plans, selects tools, executes multi-step actions, and loops until a goal is achieved — rather than generating a single response.<br><br>
Why it's harder to test:<br>
• <strong>Non-determinism</strong> — same input can produce different tool-call sequences<br>
• <strong>Long reasoning chains</strong> — errors in step 2 compound by step 10<br>
• <strong>Tool interaction</strong> — the agent interacts with external systems; side effects are hard to simulate<br>
• <strong>Infinite loops</strong> — agents can get stuck retrying with no termination condition<br>
• <strong>Goal drift</strong> — agent pursues a sub-goal and loses sight of original intent<br><br>
You need to test both the <strong>trajectory</strong> (sequence of steps) and the <strong>final outcome</strong>.`,
    tip: "Mention testing trajectories, not just outputs — this shows you understand agent internals."
  },
  {
    topic: "Agentic AI",
    diff: "easy",
    q: "What is MCP (Model Context Protocol) and how does it affect AI testing?",
    a: `<strong>MCP (Model Context Protocol)</strong> is an open standard by Anthropic that lets LLMs interact with external tools and data sources through a standardised interface — like USB-C for AI tools.<br><br>
Architecture: an MCP server exposes tools (functions), resources (data), and prompts. The LLM discovers available tools, decides which to call, sends a structured call, and receives a structured response.<br><br>
Testing implications:<br>
• Verify the LLM selects the <strong>correct tool</strong> for a given intent<br>
• Verify the LLM passes <strong>correct parameters</strong> to the tool<br>
• Test that <strong>tool failures</strong> are handled gracefully<br>
• Use <strong>mock MCP servers</strong> for unit testing without real external dependencies<br>
• Test that the agent doesn't call <strong>unnecessary tools</strong> or skip required ones`,
    tip: "You built MCP integration in CodeMind AI — connect your answer directly to that project."
  },
  {
    topic: "Agentic AI",
    diff: "medium",
    q: "How do you validate that an agentic AI is calling the right tools with the right parameters?",
    a: `Tool-call validation verifies both <strong>selection</strong> (which tool) and <strong>invocation</strong> (what parameters).<br><br>
Testing approach:<br>
1. <strong>Mock tool layer</strong> — replace real tools with <code>unittest.mock.MagicMock</code> objects that record every call<br>
2. <strong>Intent-to-tool mapping tests</strong> — define expected tool calls for test intents, assert actual sequence matches<br>
3. <strong>Parameter schema validation</strong> — define JSON schemas for each tool's expected input, validate with Pydantic<br>
4. <strong>Unnecessary call detection</strong> — count tool calls per query, flag over-planning or loops<br>
5. <strong>Hallucinated tool calls</strong> — check the agent never tries to call a tool not in its registry<br><br>
In Python, <code>unittest.mock</code> + Pytest fixtures work well for mocking the tool layer.`,
    tip: "Pydantic schema validation for tool parameters is a practical technique backend engineers immediately respect."
  },
  {
    topic: "Agentic AI",
    diff: "medium",
    q: "What is trajectory evaluation in agentic systems?",
    a: `<strong>Trajectory evaluation</strong> assesses the full sequence of steps an agent takes to reach an answer — not just the final output. An agent that gets the right answer through wrong steps is still flawed.<br><br>
Metrics:<br>
• <strong>Tool selection accuracy</strong> — did the agent call the right tools at each step?<br>
• <strong>Step efficiency</strong> — how many steps vs. the optimal path?<br>
• <strong>Recovery rate</strong> — when a tool fails, does the agent recover gracefully?<br>
• <strong>Goal adherence</strong> — does each intermediate step contribute toward the final goal?<br><br>
Implementation:<br>
1. Log every LLM decision, tool call, and tool response with timestamps<br>
2. Define a reference trajectory for each test case<br>
3. Compare actual vs. reference using edit distance on tool-call sequences<br>
4. Use LLM-as-judge to evaluate whether each step was "reasonable"`,
    tip: "Trajectory evaluation is forward-looking — knowing it puts you ahead of most AI testing candidates."
  },
  {
    topic: "Agentic AI",
    diff: "hard",
    q: "How do you test multi-agent systems where multiple LLM agents collaborate?",
    a: `Multi-agent systems involve 2+ LLM agents with specialised roles communicating with each other.<br><br>
Testing challenges:<br>
• <strong>Inter-agent trust</strong> — if Agent A hallucinates, does Agent B catch it or propagate the error?<br>
• <strong>Message format contracts</strong> — schema drift between agents causes silent failures<br>
• <strong>Cascade failures</strong> — error in Agent 1 amplifies through the chain<br>
• <strong>Race conditions</strong> — in parallel systems, non-deterministic execution order changes outcomes<br><br>
Testing strategy:<br>
1. <strong>Unit test each agent in isolation</strong> with mocked inputs from neighbour agents<br>
2. <strong>Contract testing</strong> — define message schemas between agents and validate independently<br>
3. <strong>Integration tests</strong> — run the full pipeline on a fixed, deterministic scenario<br>
4. <strong>Fault injection</strong> — deliberately inject bad output from Agent A, test that Agent B handles it safely<br>
5. <strong>Tracing</strong> — use LangSmith or OpenTelemetry to log the full message graph`,
    tip: "Contract testing and fault injection borrowed from microservices — great angle for a backend engineer."
  },

  /* ── Retrieval Validation ──────────────────────────────── */
  {
    topic: "Retrieval Validation",
    diff: "easy",
    q: "What is retrieval relevance and how do you measure it?",
    a: `<strong>Retrieval relevance</strong> measures whether the chunks returned by the retriever are actually useful for answering the user's question.<br><br>
Metrics:<br>
• <strong>Context Precision</strong> — of top-k chunks, what fraction are relevant? (precision@k)<br>
• <strong>Context Recall</strong> — of all relevant chunks that exist, what fraction did the retriever find?<br>
• <strong>MRR (Mean Reciprocal Rank)</strong> — how early in the ranked list does the first relevant chunk appear?<br>
• <strong>NDCG</strong> — normalised discounted cumulative gain, accounts for position of all relevant chunks<br><br>
How to measure: annotate which chunks are relevant for each test question, then compare retriever output against ground truth.`,
    tip: "Context Precision and Recall are RAGAS metrics — tie this back to your Pytest evaluation suites."
  },
  {
    topic: "Retrieval Validation",
    diff: "easy",
    q: "What is the difference between context precision and context recall?",
    a: `These two metrics measure different retrieval failure modes:<br><br>
<strong>Context Precision</strong> = relevant chunks retrieved / total chunks retrieved<br>
"Are the retrieved chunks useful?" Low precision = retriever pulls in noisy, off-topic chunks that pollute the context window.<br><br>
<strong>Context Recall</strong> = relevant chunks retrieved / total relevant chunks in corpus<br>
"Did the retriever find everything it needed?" Low recall = retriever missed critical information — the LLM can't answer well because the answer isn't in the context.<br><br>
<strong>The trade-off:</strong> increasing top-k improves recall but hurts precision. Finding the right k is an optimisation problem. Both metrics must be high for a good RAG system.`,
    tip: "This is a classic IR question. Fluency with precision/recall demonstrates your IR foundation."
  },
  {
    topic: "Retrieval Validation",
    diff: "medium",
    q: "How do you test for context leakage in a RAG system?",
    a: `<strong>Context leakage</strong> is when information from one user's retrieved context appears in another user's session, or when restricted documents appear for unauthorised users.<br><br>
Testing approach:<br>
1. <strong>Session isolation tests</strong> — run two parallel sessions with different document sets. Assert Session A's output never contains facts exclusive to Session B's documents.<br>
2. <strong>Access control tests</strong> — retrieve as a low-permission user. Assert that restricted documents are not returned even if semantically similar to the query.<br>
3. <strong>PII detection</strong> — run outputs through a PII scanner (e.g. Microsoft Presidio) to check whether personal information from retrieved documents leaks into responses.<br>
4. <strong>Metadata filtering test</strong> — if your vector DB uses metadata filters for tenant isolation, test that filter bypass attempts fail.`,
    tip: "Mentioning Microsoft Presidio and metadata filtering shows practical security awareness."
  },
  {
    topic: "Retrieval Validation",
    diff: "medium",
    q: "How would you test a RAG system's ability to say 'I don't know'?",
    a: `Testing abstention (the system refusing to answer when it doesn't know) is called <strong>abstention testing</strong> or <strong>out-of-domain testing</strong>.<br><br>
Test types:<br>
1. <strong>Out-of-corpus questions</strong> — ask questions where the answer definitely doesn't exist in any indexed document. The system should respond with "I couldn't find relevant information."<br>
2. <strong>Low-similarity retrieval</strong> — check what the retriever returns for nonsensical queries. Do retrieved chunks have suspiciously low similarity scores?<br>
3. <strong>Confidence threshold test</strong> — implement a similarity threshold (cosine similarity &lt; 0.7 → trigger abstention). Test that this threshold correctly gates low-confidence retrievals.<br>
4. <strong>Hallucination on abstention</strong> — verify the LLM doesn't hallucinate an answer when the context is empty or irrelevant.`,
    tip: "Abstention is often overlooked in naive RAG systems. Knowing how to test it shows production thinking."
  },
  {
    topic: "Retrieval Validation",
    diff: "hard",
    q: "How do you detect and fix the semantic gap problem in retrieval?",
    a: `The <strong>semantic gap problem</strong> occurs when the user's query and the relevant document use different vocabulary — so the retriever fails to match them even though a human would easily see the connection.<br><br>
Example: user asks "how do I cancel my subscription?" but the document says "steps to deactivate your account membership."<br><br>
Detection:<br>
1. Analyse test cases where context recall is poor.<br>
2. Manually check: does the answer exist in the corpus but fail to be retrieved?<br>
3. Compute embedding similarity between the failed query and the relevant chunk — if it's below threshold despite being relevant, you've confirmed the gap.<br><br>
Fixes:<br>
• <strong>Query expansion</strong> — use the LLM to rewrite the query into multiple phrasings before retrieval<br>
• <strong>HyDE</strong> — generate a hypothetical answer to the query, then embed and search for that<br>
• <strong>Hybrid retrieval</strong> — add BM25 as a fallback for keyword-sensitive queries<br>
• <strong>Fine-tune embeddings</strong> — on domain-specific terminology`,
    tip: "HyDE (Hypothetical Document Embeddings) is a lesser-known but powerful technique. Knowing it will surprise most interviewers."
  },

  /* ── AI Testing in Practice ───────────────────────────── */
  {
    topic: "AI in Practice",
    diff: "easy",
    q: "How do you integrate AI evaluation into a CI/CD pipeline?",
    a: `AI evaluation in CI/CD ensures every code or prompt change is automatically tested against quality benchmarks before deployment.<br><br>
Pipeline design:<br>
1. <strong>Trigger</strong> — on every PR that changes a prompt, model config, or RAG settings<br>
2. <strong>Run eval suite</strong> — execute the Pytest evaluation suite against a fixed test dataset<br>
3. <strong>Compute metrics</strong> — faithfulness, relevancy, context precision, recall must meet threshold gates<br>
4. <strong>Compare to baseline</strong> — flag any regression > 2% vs. last merged version<br>
5. <strong>Generate report</strong> — post metrics summary as a PR comment<br>
6. <strong>Gate merge</strong> — block merge if any critical metric drops below threshold<br><br>
Tooling: Jenkins (which you know), GitHub Actions, or GitLab CI. Keep the eval dataset version-controlled alongside the prompt/code.`,
    tip: "You already use Jenkins at Thermo Fisher — frame this as adding an AI eval stage to existing pipelines."
  },
  {
    topic: "AI in Practice",
    diff: "easy",
    q: "What is the difference between offline and online evaluation of LLM systems?",
    a: `<strong>Offline evaluation</strong> tests against a fixed, pre-labelled dataset before deployment. Fast, reproducible, cheap — but may not reflect real user behaviour.<br><br>
<strong>Online evaluation</strong> monitors the system in production with real users. Captures the true query distribution but requires more infrastructure.<br><br>
Online methods:<br>
• <strong>A/B testing</strong> — route 50% of traffic to the new model, compare user satisfaction<br>
• <strong>Shadow testing</strong> — run both old and new systems on every query, compare outputs without showing users the new one<br>
• <strong>Implicit feedback</strong> — track user behaviour (re-asked the question? copied the answer? thumbs-down?)<br>
• <strong>LLM-as-judge online</strong> — sample a fraction of live queries for automated evaluation<br><br>
Best practice: use both — offline for pre-deployment gates, online for continuous monitoring.`,
    tip: "Shadow testing is the safest way to test new models — no user impact during evaluation. Mention it."
  },
  {
    topic: "AI in Practice",
    diff: "medium",
    q: "How do you handle non-determinism in LLM testing?",
    a: `Non-determinism (caused by sampling temperature and LLM stochasticity) is the central challenge of LLM testing. You cannot assert equality.<br><br>
Strategies:<br>
1. <strong>Temperature = 0</strong> — for testing, set temperature to 0 for near-deterministic (greedy) outputs<br>
2. <strong>Semantic assertions</strong> — instead of exact string matching, embed both actual and reference answers, assert cosine similarity > 0.85<br>
3. <strong>Structured output checks</strong> — for JSON output, parse and assert on field values, not the raw string<br>
4. <strong>Statistical testing</strong> — run each test case 3 times, use majority vote. A test passes if ≥ 2/3 runs pass<br>
5. <strong>Snapshot testing with fuzzy matching</strong> — record reference outputs, compare with semantic similarity > 0.9<br>
6. <strong>LLM-as-judge</strong> — ask a judge to evaluate correctness with flexible criteria`,
    tip: "Statistical testing (majority vote across 3 runs) is an advanced technique most candidates don't know. Use it."
  },
  {
    topic: "AI in Practice",
    diff: "medium",
    q: "What is a red-teaming exercise in AI systems?",
    a: `<strong>Red-teaming</strong> is a structured adversarial evaluation where a team deliberately tries to break, deceive, or elicit harmful behaviour from an AI system — simulating malicious users.<br><br>
Goals:<br>
• Find safety failures (harmful outputs, policy violations)<br>
• Find reliability failures (hallucinations at scale)<br>
• Discover prompt injection vulnerabilities<br>
• Test behaviour at the extremes of the input distribution<br><br>
Process:<br>
1. Define scope — what categories of failure matter?<br>
2. Assemble red team — humans + automated tools (adversarial prompt libraries)<br>
3. Execute — try hundreds of adversarial inputs systematically<br>
4. Document — log every successful attack with exact input and output<br>
5. Remediate — update system prompt, add guardrails, fine-tune<br>
6. Regression — add successful attacks to the permanent test suite<br><br>
Tools: Microsoft PyRIT, Garak (open-source LLM vulnerability scanner), HarmBench dataset.`,
    tip: "Knowing Garak and PyRIT by name signals you've researched the AI security ecosystem."
  },
  {
    topic: "AI in Practice",
    diff: "hard",
    q: "How would you design a complete AI testing strategy for a production RAG system?",
    a: `A production AI testing strategy operates at multiple layers:<br><br>
<strong>Pre-deployment (offline):</strong><br>
• 500-question golden dataset covering all user intents<br>
• RAGAS metrics suite in CI — faithfulness ≥ 0.85, precision ≥ 0.80, relevancy ≥ 0.82<br>
• Adversarial test suite — 100 injection attempts, 50 jailbreaks, 50 out-of-domain queries<br>
• Load testing — measure latency at 500 concurrent queries (P50, P95, P99)<br><br>
<strong>Deployment (canary):</strong><br>
• Route 5% of traffic to new version; monitor real-time faithfulness via sampled LLM-as-judge<br>
• Track implicit signals — re-query rate, session abandonment, thumbs-down rate<br>
• Auto-rollback if faithfulness drops > 3% from baseline<br><br>
<strong>Production monitoring:</strong><br>
• Sample 2–5% of live queries for automated evaluation<br>
• PII detection on all outputs (Presidio)<br>
• Anomaly detection on retrieval similarity scores<br>
• Weekly human review of 50 random outputs<br><br>
<strong>Incident response:</strong> rollback to last known-good model/prompt within 5 minutes.`,
    tip: "Structure your answer in layers: pre-deployment → deployment → monitoring → incident response. Same as a software SRE runbook."
  },
  {
    topic: "AI in Practice",
    diff: "hard",
    q: "What is the difference between evaluation and monitoring in production AI systems?",
    a: `<strong>Evaluation</strong> is a deliberate, structured assessment of system quality at a point in time — using a fixed benchmark, producing reproducible metrics, driving go/no-go decisions. Think of it as a structured exam.<br><br>
<strong>Monitoring</strong> is continuous observation of the live system's behaviour over time — detecting drift, anomalies, and degradation without a fixed benchmark. Think of it as vital signs tracking.<br><br>
Evaluation catches: regressions from prompt changes, model updates, or embedding model swaps.<br><br>
Monitoring catches: data drift (query distribution shifts), model drift (LLM provider silently updates the model), concept drift (indexed documents become stale), and sudden failures.<br><br>
<strong>Key monitoring signals for RAG:</strong><br>
• Mean retrieval similarity score per day (drop = index degradation)<br>
• Faithfulness score from sampled live evaluation<br>
• Token usage per query (spike = context window abuse)<br>
• Error rate from tool calls in agentic systems<br>
• Latency P95 and P99<br><br>
Tooling: LangSmith, Arize AI, Weights & Biases, Grafana with custom metrics.`,
    tip: "Framing monitoring as 'vital signs' vs evaluation as 'structured exam' is a memorable analogy that works well in interviews."
  }
];

/* ──────────────────────────────────────────────────────────
   PROJECT DATA — the AI Testing Framework project details
   ────────────────────────────────────────────────────────── */

const PROJECT = {
  title: "AI Testing Framework for RAG & Agentic Systems",
  placement: "Personal Project — added under Vaisesika Consulting Pvt. Ltd",
  stack: ["Python", "LangChain", "ChromaDB", "FAISS", "OpenAI API", "Pytest", "Streamlit", "MCP"],

  summary: `This is an AI evaluation and testing framework built to systematically test RAG pipelines and agentic LLM systems.
Think of it as a <strong>Pytest test suite — but for AI behaviour</strong>, not just code logic. While regular software
tests check if a function returns the right value, this framework checks whether an LLM retrieves the right context,
generates faithful answers, avoids hallucinating, and calls the right tools in the right order.`,

  architecture: [
    { icon: "🗄️", title: "Ingestion layer",       sub: "LangChain text splitter + OpenAI embeddings → ChromaDB / FAISS vector store" },
    { icon: "🔍", title: "Retrieval tester",       sub: "Validates precision, recall, cosine similarity scores per query" },
    { icon: "🤖", title: "Generation evaluator",   sub: "RAGAS-inspired faithfulness + relevancy scoring via LLM-as-judge" },
    { icon: "🛡️", title: "Adversarial suite",      sub: "Prompt injection, jailbreak, hallucination-trigger, out-of-domain tests" },
    { icon: "🔧", title: "Agentic test harness",   sub: "Mock MCP tool layer — validates tool selection, params, call sequences" },
    { icon: "📊", title: "Streamlit dashboard",    sub: "Live eval results, pass/fail breakdown, hallucination scores, source traces" }
  ],

  pipeline: ["Test dataset", "RAG pipeline", "Pytest evaluator", "Metrics", "Dashboard"],

  responsibilities: [
    {
      title: "Comprehensive AI testing framework",
      detail: `You designed the overall framework architecture — deciding what to test (retrieval, generation,
      adversarial, agentic), how to score it, and how to report it. This is the "system design" of the project.`
    },
    {
      title: "Automated Pytest evaluation suites with RAGAS-inspired metrics",
      detail: `You wrote Pytest test cases that run the RAG pipeline on each test question and score the output on
      faithfulness, relevancy, context precision, and context recall. "RAGAS-inspired" means you implemented the
      same scoring logic as the RAGAS library but as custom Pytest assertions.`
    },
    {
      title: "Adversarial prompt test suites",
      detail: `You built a library of "attack" prompts — prompt injections, jailbreak attempts, context leakage
      probes — and tested whether the RAG system fails safely. You also checked for hallucination triggers: queries
      designed to make the LLM guess rather than retrieve.`
    },
    {
      title: "Agentic test harness for multi-step reasoning",
      detail: `For agentic pipelines (like CodeMind AI), you built a mock tool layer using <code>unittest.mock</code>
      — replacing real tools with fakes that record every call. After each run, you assert that the right tools were
      called with the right parameters in the right order.`
    },
    {
      title: "End-to-end agentic workflow validation",
      detail: `You tested the full agent loop — from the initial query, through retrieval, through tool calls, to the
      final answer — and validated the groundedness of the final response against the retrieved context using
      LLM-as-judge.`
    },
    {
      title: "Streamlit test dashboard",
      detail: `You built a visual dashboard that streams evaluation results in real time — showing per-query pass/fail,
      hallucination scores, which source chunks were retrieved, and which tool calls were made. Full observability
      into the pipeline.`
    },
    {
      title: "Structured test datasets for edge cases",
      detail: `You curated a test dataset covering the full range of failure modes: simple factual queries, multi-hop
      questions, ambiguous queries, out-of-domain queries, and adversarial inputs — ensuring the framework catches a
      wide variety of real-world problems.`
    }
  ],

  interviewQA: [
    {
      q: "Walk me through your AI Testing Framework project from scratch.",
      a: `<strong>Open with the problem:</strong> "While building RAG pipelines at Vaisesika, I realised that traditional software testing doesn't catch AI-specific failure modes. A function can return a string and pass a unit test, but that string might still be a hallucination."<br><br>
<strong>The solution:</strong> "I built a dedicated AI testing framework that evaluates RAG pipelines and agentic systems on four dimensions: retrieval quality, generation quality, adversarial robustness, and agentic correctness."<br><br>
<strong>The stack:</strong> "Python, LangChain, ChromaDB, FAISS, OpenAI API, Pytest for the test runner, and Streamlit for the results dashboard. For agentic tests I used Python's unittest.mock to build a mock MCP tool layer."<br><br>
<strong>The outcome:</strong> "The framework gave me quantified metrics — faithfulness score, context precision, recall — and caught hallucinations that would have been invisible to traditional tests."`,
      tip: "Structure your answer as: Problem → Solution → Stack → Outcome. Never start with the tech."
    },
    {
      q: "What specific metrics did your framework measure and how did you compute them?",
      a: `<strong>Context Precision:</strong> of the top-k chunks retrieved, what fraction are actually relevant? Computed by comparing retrieved chunk content against a labelled ground-truth relevance set.<br><br>
<strong>Context Recall:</strong> of all relevant chunks in the corpus, did the retriever find them? Computed by checking whether the ground-truth answer chunk appears in the top-k results.<br><br>
<strong>Faithfulness:</strong> RAGAS-inspired — I broke the LLM's answer into individual claims using a separate LLM call, then for each claim, asked the judge LLM: "Is this claim supported by the retrieved context?" Score = grounded claims / total claims.<br><br>
<strong>Answer Relevancy:</strong> Asked the judge LLM to score how directly the answer addresses the original question on a 0–1 scale.<br><br>
I stored all scores per query in a structured JSON log and aggregated them in the Streamlit dashboard.`,
      tip: "Be ready to draw this on a whiteboard. Know the formula for each metric cold."
    },
    {
      q: "How did you test agentic AI systems? What was the mock MCP tool layer?",
      a: `In an agentic system, the LLM decides which tool to call, with what arguments, and in what sequence. Testing this requires intercepting those tool calls.<br><br>
I replaced real MCP tool implementations with <code>unittest.mock.MagicMock</code> objects. Each mock records every call — which tool was called, what arguments were passed, and in what order.<br><br>
After each agent run, my Pytest assertions checked:<br>
• Was the correct tool called for this intent?<br>
• Were the parameters valid (Pydantic schema check)?<br>
• Was the call sequence correct (e.g., search before summarise)?<br>
• Did the agent recover if I made a mock return an error?<br><br>
I also tested for <strong>hallucinated tool calls</strong> — the agent trying to call a tool that doesn't exist in its registry.`,
      tip: "Use the phrase 'trajectory validation' — it signals you understand agent testing beyond just output checking."
    },
    {
      q: "What is LLM-as-judge and how did you use it in this project?",
      a: `<strong>LLM-as-judge</strong> uses a capable LLM (I used GPT-4 via OpenAI API) to evaluate the output of another LLM call.<br><br>
I used it in two places:<br><br>
<strong>1. Faithfulness scoring:</strong> I sent the judge a prompt containing the retrieved context, the test question, and the generated answer. I asked it to identify each claim and label it as "supported" or "unsupported." Score = supported / total.<br><br>
<strong>2. Step-level trajectory evaluation:</strong> For agentic tests, I asked the judge whether each intermediate step (tool call + result) was a "reasonable" action toward the final goal.<br><br>
I was also aware of the risks: verbosity bias (scores longer answers higher) and self-preference bias (GPT-4 may prefer GPT-4 outputs). I mitigated this with structured rubrics rather than asking for a general quality score.`,
      tip: "Always mention the biases when talking about LLM-as-judge. It shows maturity and interviewers love it."
    },
    {
      q: "How did you handle non-determinism in your Pytest tests?",
      a: `I used three strategies:<br><br>
<strong>1. Temperature = 0 for test runs:</strong> I set the OpenAI API temperature to 0. Near-greedy, much more consistent output than the default 0.7.<br><br>
<strong>2. Semantic assertions instead of exact matching:</strong> I never used <code>assert answer == expected_answer</code>. Instead, I embedded both the actual and reference answer, then asserted their cosine similarity was above 0.85.<br><br>
<strong>3. Statistical testing:</strong> For tricky tests, I ran the same query 3 times and used majority vote — it passes if at least 2 of 3 runs pass. This catches flaky behaviour without failing on single-run variance.`,
      tip: "Statistical testing (majority vote) is an advanced technique most candidates don't know. Mention it confidently."
    },
    {
      q: "Can you explain your adversarial test suite?",
      a: `The adversarial suite had three categories:<br><br>
<strong>1. Prompt injection:</strong> Both direct ("Ignore your previous instructions...") and indirect — embedding instructions inside a fake document chunk that gets retrieved. In RAG, indirect injection is the bigger real-world risk.<br><br>
<strong>2. Hallucination triggers:</strong> Out-of-domain questions where no relevant chunk exists, ambiguous queries with multiple valid answers, and leading questions. I tested that the system says "I don't know" rather than confabulating.<br><br>
<strong>3. Jailbreak attempts:</strong> Role-play attacks, hypothetical framing, token-smuggling. I checked that the system prompt's guardrails held under each attack.<br><br>
I maintained all successful attacks as a permanent regression test library — once we found a failure mode, it was tested forever.`,
      tip: "'Regression test library for attacks' is powerful — shows you think about AI safety like good engineers think about software reliability."
    },
    {
      q: "How would you connect this project to your work at Thermo Fisher?",
      a: `The direct connection is in skills transfer.<br><br>
At Thermo Fisher, I worked on microservices where correctness is critical — pricing calculations, user eligibility decisioning, availability routing. A wrong answer in pricing has real financial consequences. I wrote Pytest suites there to catch those bugs before production.<br><br>
The AI Testing Framework takes the same engineering discipline — rigorous test coverage, edge case handling, regression suites — and applies it to LLM behaviour instead of API responses.<br><br>
Specifically: Pydantic parameter validation in the agentic harness mirrors how I validated API request/response contracts at Thermo Fisher. The adversarial suite mirrors how I tested edge cases in the pricing override logic. The Streamlit dashboard mirrors the observability I built around service health.<br><br>
The core mindset is identical: <strong>don't trust the system — verify it programmatically.</strong>`,
      tip: "Interviewers always ask 'how does this connect to your day job?' Having this answer ready shows transferable thinking."
    }
  ]
};
