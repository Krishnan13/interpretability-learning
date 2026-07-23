const ROADMAP = [
  {
    id: 0,
    title: "Setup & Baseline",
    shortTitle: "Setup",
    weeks: [1, 1],
    colour: "#78e4c5",
    outcome: "Build a reproducible workspace and an honest starting-point record.",
    gate: [
      "Run a notebook and a Python script successfully.",
      "Commit and push a small change to a repository.",
      "Explain where code, data, model weights, outputs and experiment notes will be stored."
    ],
    evidence: "A repository containing README.md, progress.md and one working notebook.",
    resources: [
      ["Python tutorial", "https://docs.python.org/3/tutorial/"],
      ["GitHub Docs", "https://docs.github.com/en/get-started"]
    ],
    weekData: [
      {
        week: 1,
        title: "Workspace and diagnostic",
        depth: ["Implement"],
        focus: [
          "Open Python and Jupyter; understand notebooks versus scripts.",
          "Create notes/, exercises/, projects/, progress/ and experiments/.",
          "Use a virtual environment or managed notebook environment.",
          "Learn the Git cycle: status, add, commit, push and pull.",
          "Record your current ability in Python, tensors, neural networks and transformers."
        ],
        challenge: "Create progress.md with a dated baseline of what you can explain, code and debug without help."
      }
    ]
  },
  {
    id: 1,
    title: "Python, NumPy & Git",
    shortTitle: "Python",
    weeks: [2, 6],
    colour: "#72a7ff",
    outcome: "Write and debug scientific Python without depending on generated code.",
    gate: [
      "Solve short Python exercises without AI-generated solutions.",
      "Explain broadcasting with three shape examples, including one invalid case.",
      "Implement linear regression using only NumPy and verify that loss decreases.",
      "Debug a deliberately broken array program involving shapes or dtypes."
    ],
    evidence: "A NumPy linear-regression project with README, tests, learning curve and annotated array shapes.",
    resources: [
      ["Python tutorial", "https://docs.python.org/3/tutorial/"],
      ["NumPy basics", "https://numpy.org/doc/stable/user/absolute_beginners.html"],
      ["NumPy quickstart", "https://numpy.org/doc/stable/user/quickstart.html"],
      ["NumPy broadcasting", "https://numpy.org/doc/stable/user/basics.broadcasting.html"]
    ],
    weekData: [
      { week: 2, title: "Core Python", depth: ["Implement"], focus: ["Variables, numeric and string types.", "Conditions, loops and functions.", "Scope and exceptions.", "Small functions with tests."], challenge: "Write several small functions and tests without copying a complete solution." },
      { week: 3, title: "Data structures and modules", depth: ["Implement"], focus: ["Lists, tuples, dictionaries and sets.", "Comprehensions and module imports.", "Read and write text, CSV and JSON."], challenge: "Build a small data-processing script with clean inputs and outputs." },
      { week: 4, title: "NumPy arrays", depth: ["Implement"], focus: ["Array creation, shapes, axes and dtypes.", "Indexing and slicing.", "Elementwise operations and reductions.", "Predict shapes before code runs."], challenge: "Annotate the input shape, output shape and transformed axis for every operation." },
      { week: 5, title: "Vectorisation and broadcasting", depth: ["Explain", "Implement"], focus: ["Matrix multiplication versus elementwise multiplication.", "Reshape, transpose and concatenate.", "Broadcasting rules.", "Numerical stability basics."], challenge: "Explain three valid broadcasting examples and diagnose one invalid case." },
      { week: 6, title: "NumPy mini-project", depth: ["Implement"], focus: ["Linear-regression forward prediction.", "Mean-squared error.", "Analytic or finite-difference gradients.", "Gradient descent, plots and tests."], challenge: "Implement linear regression using only NumPy and show that the loss falls." }
    ]
  },
  {
    id: 2,
    title: "Applied Mathematics",
    shortTitle: "Math",
    weeks: [7, 10],
    colour: "#b78cff",
    outcome: "Connect equations directly to tensors, gradients, losses and probability outputs.",
    gate: [
      "Derive gradients for a scalar linear-regression loss.",
      "Explain softmax invariance to adding the same constant to every logit.",
      "Compute a small cross-entropy example by hand.",
      "Implement a two-layer forward and backward pass without autodiff."
    ],
    evidence: "math_to_tensors.ipynb with worked examples, shape annotations and numerical gradient checks.",
    resources: [["Dive into Deep Learning", "https://d2l.ai"]],
    weekData: [
      { week: 7, title: "Linear algebra in code", depth: ["Explain", "Implement"], focus: ["Vectors, matrices and tensors.", "Dot products, matrix products and linear maps.", "Basis intuition, rank and norms.", "Cosine similarity in NumPy."], challenge: "Translate each important equation into tensor shapes." },
      { week: 8, title: "Calculus and optimisation", depth: ["Explain", "Implement"], focus: ["Derivatives and partial derivatives.", "Gradient and chain rule.", "Directional change.", "Gradient descent, learning rate and curvature intuition."], challenge: "Trace a gradient through two or three linked operations." },
      { week: 9, title: "Probability and information", depth: ["Explain", "Implement"], focus: ["Random variables, expectation and variance.", "Conditional probability and likelihood.", "Logits and softmax.", "Entropy and cross-entropy."], challenge: "Explain cross-entropy as both a formula and a penalty for low correct-class probability." },
      { week: 10, title: "Backpropagation by hand", depth: ["Implement"], focus: ["Two-layer network on a small batch.", "Forward computation.", "Manual gradient derivation.", "Finite-difference gradient checks."], challenge: "Code a complete two-layer forward and backward pass without autodiff." }
    ]
  },
  {
    id: 3,
    title: "PyTorch & Neural Networks",
    shortTitle: "PyTorch",
    weeks: [11, 18],
    colour: "#ff8d83",
    outcome: "Train, inspect and debug small models independently.",
    gate: [
      "Build and train an MLP without copying a complete tutorial.",
      "Explain why standard PyTorch cross-entropy expects logits.",
      "Diagnose underfitting and overfitting runs from learning curves.",
      "Save activations and gradients, then run a controlled ablation."
    ],
    evidence: "A reproducible MLP project with config, metrics, three controlled comparisons and a concise report.",
    resources: [
      ["PyTorch: Learn the Basics", "https://pytorch.org/tutorials/beginner/basics/intro.html"],
      ["Learning PyTorch with Examples", "https://pytorch.org/tutorials/beginner/pytorch_with_examples.html"],
      ["Dive into Deep Learning", "https://d2l.ai"]
    ],
    weekData: [
      { week: 11, title: "Tensors and autograd", depth: ["Implement"], focus: ["Tensor creation, device, dtype and shapes.", "Broadcasting and requires_grad.", "Computational graphs and backward.", "Gradient accumulation."], challenge: "Inspect shapes and gradients through a small computation graph." },
      { week: 12, title: "Modules and parameters", depth: ["Implement"], focus: ["nn.Module and Parameter.", "Linear layers and activations.", "Forward methods and model inspection.", "State dictionaries."], challenge: "Build and inspect a small module with clearly named parameters." },
      { week: 13, title: "Training loop", depth: ["Implement"], focus: ["Dataset, DataLoader and batching.", "Forward pass and loss.", "zero_grad, backward and optimiser step.", "Train and evaluation modes."], challenge: "Write the complete training loop from memory and explain the order." },
      { week: 14, title: "Classification", depth: ["Explain", "Implement"], focus: ["Binary and multiclass logits.", "Sigmoid and softmax.", "BCE and cross-entropy.", "Accuracy and confusion matrix."], challenge: "Train a classifier while avoiding the common double-softmax error." },
      { week: 15, title: "Optimisation behaviour", depth: ["Investigate"], focus: ["SGD, momentum and Adam.", "Batch size and learning rate.", "Initialisation.", "Vanishing and exploding gradients."], challenge: "Compare controlled optimisation variants using learning curves." },
      { week: 16, title: "Generalisation", depth: ["Investigate"], focus: ["Train, validation and test splits.", "Overfitting and regularisation.", "Dropout, weight decay and early stopping.", "Data leakage."], challenge: "Produce one underfit and one overfit run, then diagnose each." },
      { week: 17, title: "Model internals", depth: ["Implement", "Investigate"], focus: ["Hooks and parameter inspection.", "Activation inspection and gradient norms.", "Neuron or layer ablation.", "Controlled perturbations."], challenge: "Save internal activations and run an ablation with a justified baseline." },
      { week: 18, title: "MLP project", depth: ["Investigate"], focus: ["Train an MLP on FashionMNIST or a small equivalent.", "Fix seeds and preserve split discipline.", "Compare three controlled variants.", "Write conclusions and limitations."], challenge: "Produce a reproducible project with three controlled comparisons." }
    ]
  },
  {
    id: 4,
    title: "Empirical ML Research",
    shortTitle: "Research",
    weeks: [19, 23],
    colour: "#ffc76a",
    outcome: "Design experiments that produce believable evidence rather than attractive plots.",
    gate: [
      "Write a one-page experiment plan before running code.",
      "Repeat a result across seeds or justify a deterministic test.",
      "Identify leakage or unfair comparison in a supplied example.",
      "Reproduce your own result from a clean environment."
    ],
    evidence: "A five-section mini-paper with all runs linked to code and configs.",
    resources: [
      ["Scikit-learn common pitfalls", "https://scikit-learn.org/stable/common_pitfalls.html"],
      ["Weights & Biases experiment tracking", "https://docs.wandb.ai/guides/track/"]
    ],
    weekData: [
      { week: 19, title: "Research questions", depth: ["Investigate"], focus: ["Turn curiosity into a falsifiable hypothesis.", "Define intervention and metric.", "Choose a baseline.", "State the expected result."], challenge: "Frame one vague question as a testable experiment." },
      { week: 20, title: "Controls and reproducibility", depth: ["Investigate"], focus: ["Seeds, baselines and ablations.", "Negative controls and repeated runs.", "Config and environment records.", "Versioned code."], challenge: "Design controls that can rule out at least one alternative explanation." },
      { week: 21, title: "Evaluation", depth: ["Investigate"], focus: ["Metric choice, confidence and variance.", "Split discipline and data leakage.", "Cherry-picking.", "Multiple comparisons."], challenge: "Audit an experiment for leakage and unfair comparisons." },
      { week: 22, title: "Experiment tracking", depth: ["Implement"], focus: ["Log configurations and metrics.", "Save plots and checkpoints.", "Record notes and failed runs.", "Compare experiments systematically."], challenge: "Create a reusable experiment record that includes failures." },
      { week: 23, title: "Mini-study", depth: ["Investigate"], focus: ["Study one MLP behaviour.", "Run across seeds or interventions.", "Write hypothesis, method and results.", "State limitations and next test."], challenge: "Produce a compact five-section mini-paper linked to every run." }
    ]
  },
  {
    id: 5,
    title: "Transformers from the Inside",
    shortTitle: "Transformers",
    weeks: [24, 31],
    colour: "#ff7db2",
    outcome: "Implement and train a small decoder-only transformer and explain every major tensor.",
    gate: [
      "Write scaled dot-product attention from memory and test masking.",
      "Trace one token through embedding, attention, MLP, residuals and unembedding.",
      "Train a decoder-only transformer until it learns a visible pattern.",
      "Explain every reshape and matrix multiplication in attention code."
    ],
    evidence: "A small transformer repository with architecture diagram, shape table, curves, samples and comparisons.",
    resources: [
      ["Attention Is All You Need", "https://arxiv.org/abs/1706.03762"],
      ["Hugging Face LLM Course", "https://huggingface.co/learn/llm-course"],
      ["nanoGPT", "https://github.com/karpathy/nanoGPT"]
    ],
    weekData: [
      { week: 24, title: "Language modelling", depth: ["Explain", "Implement"], focus: ["Tokens, vocabulary and context window.", "Next-token prediction and teacher forcing.", "Logits and cross-entropy.", "Perplexity."], challenge: "Implement and explain a tiny next-token prediction setup." },
      { week: 25, title: "Embeddings and positions", depth: ["Implement"], focus: ["Token embeddings.", "Positional embeddings.", "Embedding lookup and unembedding.", "Weight tying."], challenge: "Trace shapes from token IDs to logits." },
      { week: 26, title: "Single-head attention", depth: ["Implement"], focus: ["Queries, keys and values.", "Scaled attention scores.", "Causal mask and softmax.", "Weighted value aggregation."], challenge: "Write single-head causal attention from memory and test its mask." },
      { week: 27, title: "Multi-head attention", depth: ["Implement"], focus: ["Head dimensions and parallel subspaces.", "Tensor reshaping.", "Concatenation.", "Output projection."], challenge: "Explain every reshape and transpose in multi-head attention." },
      { week: 28, title: "Transformer block", depth: ["Explain", "Implement"], focus: ["Residual stream.", "Layer normalisation.", "MLP block and residual connections.", "Pre-norm versus post-norm awareness."], challenge: "Implement a transparent transformer block with shape assertions." },
      { week: 29, title: "Complete decoder model", depth: ["Implement"], focus: ["Stack transformer blocks.", "Produce logits.", "Train on a tiny corpus.", "Generate autoregressively and save checkpoints."], challenge: "Train a small decoder and reproduce generation from a saved checkpoint." },
      { week: 30, title: "Training and debugging", depth: ["Investigate"], focus: ["Sequence batching and masking errors.", "Unstable loss and learning rate.", "Context length and gradient clipping.", "Sampling temperature."], challenge: "Diagnose at least two deliberately introduced training problems." },
      { week: 31, title: "Architecture project", depth: ["Investigate"], focus: ["Document the model end to end.", "Compare two model or training choices.", "Inspect attention patterns.", "Inspect residual activations."], challenge: "Create an architecture diagram, shape table and two controlled comparisons." }
    ]
  },
  {
    id: 6,
    title: "AI Alignment Context",
    shortTitle: "Alignment",
    weeks: [32, 33],
    colour: "#70d8ff",
    outcome: "Explain why interpretability is pursued, where it helps and where it remains insufficient.",
    gate: [
      "Explain three ways an AI system can act against its designer's intention.",
      "Give two realistic safety uses and two limitations of interpretability.",
      "Connect one interpretability experiment to a safety question without overstating evidence."
    ],
    evidence: "A concept map linking alignment problems, evidence, tools and remaining uncertainty.",
    resources: [
      ["Concrete Problems in AI Safety", "https://arxiv.org/abs/1606.06565"],
      ["Anthropic interpretability research", "https://www.anthropic.com/research#interpretability"]
    ],
    weekData: [
      { week: 32, title: "Alignment problem map", depth: ["Explain"], focus: ["Specification, optimisation and generalisation failures.", "Robustness and monitoring.", "Scalable oversight and alignment.", "Capability evidence versus safety evidence."], challenge: "Build a concrete map of failure types and possible evidence." },
      { week: 33, title: "Role of interpretability", depth: ["Explain", "Investigate"], focus: ["Mechanistic interpretability as reverse engineering.", "Monitoring, auditing and scientific understanding.", "Incomplete coverage and fragile explanations.", "Uncertain safety relevance."], challenge: "Connect one method to one safety question and state what it cannot prove." }
    ]
  },
  {
    id: 7,
    title: "Mechanistic Interpretability",
    shortTitle: "Mech Interp",
    weeks: [34, 43],
    colour: "#78e4c5",
    outcome: "Use descriptive and causal tools to analyse known transformer mechanisms.",
    gate: [
      "Cache and modify activations with TransformerLens.",
      "Run ablation and activation patching with justified baselines.",
      "Explain induction heads using behavioural and mechanistic evidence.",
      "Replicate one known result and analyse discrepancies and limitations."
    ],
    evidence: "A complete replication package with code, setup, plots, discrepancies, limitations and instructions.",
    resources: [
      ["TransformerLens documentation", "https://transformerlensorg.github.io/TransformerLens/"],
      ["Transformer Circuits framework", "https://transformer-circuits.pub/2021/framework/index.html"],
      ["Induction Heads", "https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html"]
    ],
    weekData: [
      { week: 34, title: "TransformerLens basics", depth: ["Implement"], focus: ["Load a small pretrained model.", "Tokenise text and cache activations.", "Inspect model configuration.", "Use hooks safely."], challenge: "Cache and modify an activation in a small pretrained model." },
      { week: 35, title: "Attention and logits", depth: ["Implement", "Explain"], focus: ["Attention patterns and head outputs.", "Direct logit attribution.", "Logit lens.", "Residual-stream decomposition."], challenge: "Explain how selected components contribute to a chosen logit." },
      { week: 36, title: "Ablation", depth: ["Investigate"], focus: ["Zero, mean and resample ablations.", "Baseline choice.", "Behavioural changes.", "Distribution-shift problems."], challenge: "Run an ablation whose baseline you can defend." },
      { week: 37, title: "Activation patching", depth: ["Investigate"], focus: ["Clean and corrupted prompts.", "Patch locations.", "Recovery metrics.", "Coarse-to-fine searches."], challenge: "Define a clean/corrupt pair and identify causally relevant locations." },
      { week: 38, title: "Induction heads", depth: ["Investigate"], focus: ["Repeated-token tasks.", "Previous-token heads.", "Induction patterns and copy scores.", "Behavioural evidence."], challenge: "Present both behavioural and mechanistic evidence for an induction head." },
      { week: 39, title: "Circuit framework", depth: ["Explain", "Implement"], focus: ["Residual-stream pathways.", "QK and OV circuits.", "Composition and virtual weights.", "Path-level reasoning."], challenge: "Trace a small pathway using QK and OV reasoning." },
      { week: 40, title: "Known circuit replication", depth: ["Investigate"], focus: ["Choose a compact published result.", "Match the original setup.", "Replicate closely.", "Analyse discrepancies."], challenge: "Replicate an induction-head or IOI result before changing one factor." },
      { week: 41, title: "Probes and steering", depth: ["Investigate"], focus: ["Linear probes and split discipline.", "Selectivity.", "Interventions along directions.", "Limits of decodability claims."], challenge: "Separate decodability from causal influence in one experiment." },
      { week: 42, title: "Sparse features", depth: ["Recognise", "Implement"], focus: ["Superposition intuition.", "Sparse autoencoders.", "Feature activation examples.", "Reconstruction and sparsity trade-offs."], challenge: "Train or run a small SAE example and inspect feature activations." },
      { week: 43, title: "Modern circuit tracing", depth: ["Recognise", "Investigate"], focus: ["Attribution graphs.", "Feature-based circuits.", "Current limitations.", "A small open-source example if compute permits."], challenge: "Evaluate what a circuit-tracing output supports and what remains uncertain." }
    ]
  },
  {
    id: 8,
    title: "Portfolio & Career",
    shortTitle: "Portfolio",
    weeks: [44, 48],
    colour: "#ffc76a",
    outcome: "Produce credible evidence of empirical research ability.",
    gate: [
      "A new reader can reproduce the central result.",
      "The report separates observation, causal evidence and speculation.",
      "The extension has a justified baseline and robustness check.",
      "Present the project in five minutes and defend every design choice."
    ],
    evidence: "A public portfolio with three projects, one polished report and a focused application package.",
    resources: [["Transformer Circuits Thread", "https://transformer-circuits.pub"]],
    weekData: [
      { week: 44, title: "Choose an extension", depth: ["Investigate"], focus: ["Select one replicated result.", "Change one meaningful variable.", "Choose model, data, prompts or intervention.", "Keep the question narrow."], challenge: "Justify one extension that produces an interpretable comparison." },
      { week: 45, title: "Pre-register the study", depth: ["Investigate"], focus: ["Question, motivation and hypothesis.", "Setup and baselines.", "Success criteria and risks.", "Stopping rule."], challenge: "Write the plan before running the main experiments." },
      { week: 46, title: "Run and debug", depth: ["Investigate"], focus: ["Execute experiments.", "Preserve failed runs.", "Refine only when justified.", "Perform robustness checks."], challenge: "Maintain a clear audit trail from plan to final analysis." },
      { week: 47, title: "Write and release", depth: ["Investigate"], focus: ["Clear report and reproducible repository.", "Figures and limitations.", "Run instructions.", "Concise project summary."], challenge: "Release a result that a new reader can reproduce." },
      { week: 48, title: "Career packaging", depth: ["Implement"], focus: ["Focused CV and portfolio page.", "Research-interest statement.", "Research-engineer and fellowship pathways.", "Honest claims matched to evidence."], challenge: "Package three projects and give a five-minute research presentation." }
    ]
  }
];

const ALL_WEEKS = ROADMAP.flatMap(phase =>
  phase.weekData.map(week => ({
    ...week,
    phaseId: phase.id,
    phaseTitle: phase.title,
    phaseShortTitle: phase.shortTitle,
    colour: phase.colour,
    outcome: phase.outcome,
    phaseGate: phase.gate,
    evidence: phase.evidence,
    resources: phase.resources
  }))
);
