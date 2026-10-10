/* Brain Map — self-contained concept tree for the Law Learning PWA. */
(function () {
  "use strict";
  var mount = document.getElementById("brain-map-panel");
  if (!mount) return;

  var sourceCore = "https://api.sci.gov.in/supremecourt/2015/20639/20639_2015_Judgement_15-Mar-2019.pdf";
  var sourceTower = "https://api.sci.gov.in/jonew/judis/2711.pdf";
  var topic = {
    id: "negligence",
    label: "Negligence",
    eyebrow: "LAW OF TORTS",
    note: "Civil negligence: how careless conduct may create legal liability. Expand a branch to see its meaning, examples and exam relevance.",
    children: [
      {
        id: "meaning", label: "1 · What does negligence mean?", hint: "Start with the definition",
        detail: "Negligence is failure to exercise the care legally expected in the circumstances, where that failure causes actionable harm to someone to whom a duty is owed.",
        example: "Example: A shop fails to address a foreseeable slip hazard and a customer is injured."
      },
      {
        id: "ingredients", label: "2 · Essential ingredients", hint: "Duty → Breach → Resulting damage",
        detail: "For a basic answer, analyse a duty of care, breach of that duty and resulting damage. Causation and remoteness help explain whether the harm is legally attributable to the breach.",
        children: [
          {
            id: "duty", label: "Duty of care", hint: "Was care legally owed?",
            detail: "A duty of care is a legal obligation to take reasonable care to avoid harm to another person. Foreseeability, proximity and whether imposing a duty is fair and reasonable may be relevant to the particular relationship.",
            example: "Example: A hotel operator ordinarily owes appropriate safety duties to guests using its facilities.",
            children: [
              { id: "foreseeability", label: "Foreseeability", detail: "Could a reasonable person anticipate this kind of harm?" },
              { id: "proximity", label: "Proximity", detail: "Is the relationship between the parties sufficiently close for the law to recognise a duty?" },
              { id: "scope", label: "Scope of duty", detail: "What precautions does the law reasonably require from this defendant in these circumstances?" }
            ]
          },
          {
            id: "breach", label: "Breach of duty", hint: "Did conduct fall below the required standard?",
            detail: "Identify what reasonable care required and compare that standard with what the defendant actually did or failed to do.",
            example: "Example: Leaving a dangerous spill unmarked after staff know about it may be a breach.",
            children: [
              { id: "standard", label: "Reasonable standard", detail: "The required standard depends on the circumstances, risk and sometimes the person's professional skills." },
              { id: "omission", label: "Act or omission", detail: "A careless action, or a failure to act when legally required, can constitute a breach." }
            ]
          },
          {
            id: "damage", label: "Causation and damage", hint: "Did the breach produce legally relevant harm?",
            detail: "Establish actual, actionable injury or loss and a sufficient causal connection with the breach. Mere carelessness, without the required damage, does not complete the basic tort.",
            children: [
              { id: "causal", label: "Causal connection", detail: "Explain how the defendant's breach caused or materially contributed to the injury." },
              { id: "remoteness", label: "Remoteness", detail: "Consider whether the kind of harm is too remote to be attributed to the breach." },
              { id: "proofdamage", label: "Proven harm", detail: "Identify and support the injury or loss; the availability and measure of damages depend on the facts." }
            ]
          }
        ]
      },
      {
        id: "proof", label: "3 · Proof and legal doctrines", hint: "How is negligence established?",
        children: [
          {
            id: "burden", label: "Burden of proof",
            detail: "Ordinarily the claimant must establish the ingredients of civil negligence on the applicable civil standard of proof.",
            example: "Evidence may include photographs, safety reports, witness statements and medical records."
          },
          {
            id: "resipsa", label: "Res ipsa loquitur", hint: "The thing speaks for itself",
            detail: "In suitable circumstances, the nature of the accident can support an inference of negligence even where the precise negligent act is difficult to identify. It does not make every accident automatically actionable.",
            example: "In Municipal Corporation of Delhi v. Subhagwanti, the Supreme Court applied this principle following the collapse of a municipal clock tower.",
            source: sourceTower
          }
        ]
      },
      {
        id: "defences", label: "4 · Potential defences", hint: "Liability may be reduced or defeated",
        children: [
          {
            id: "contrib", label: "Contributory negligence",
            detail: "Where the injured person's own lack of reasonable care contributes to the damage, it may affect the allocation of responsibility and compensation, subject to the applicable law.",
            example: "Example: A person ignores clear warnings and contributes to their own injury."
          },
          {
            id: "volenti", label: "Voluntary assumption of risk",
            detail: "A defence may arise where a person freely and knowingly consents to the relevant risk. Mere awareness of a danger does not by itself establish consent.",
            example: "Distinguish voluntary acceptance of a legal risk from simply being aware that an activity is risky."
          }
        ]
      },
      {
        id: "cases", label: "5 · Important cases", hint: "Use the ratio, not just the case name",
        children: [
          {
            id: "poonam", label: "Poonam Verma v. Ashwin Patel (1996)",
            detail: "The Supreme Court identified the elements of negligence as a duty to exercise due care, a breach of that duty, and consequential damage; this formulation was quoted in a later Supreme Court decision.",
            source: sourceCore
          },
          {
            id: "tower", label: "MCD v. Subhagwanti (1966)",
            detail: "The collapse of the municipal clock tower was assessed using res ipsa loquitur. A useful case when discussing negligence inferred from an accident's circumstances.",
            source: sourceTower
          },
          {
            id: "kerala", label: "KTDC Ltd. v. Deepti Singh (2019)",
            detail: "The Supreme Court discussed negligence and the duty of care in a hotel swimming-pool incident. Use it to learn the analysis of duty, breach and damage.",
            source: sourceCore
          }
        ]
      },
      {
        id: "problem", label: "6 · Apply it to a problem", hint: "Practise legal reasoning",
        detail: "Problem: A customer slips on a wet supermarket floor. Employees knew about the spill but put up no warning sign. The customer fractures an arm.",
        children: [
          { id: "issue", label: "Issue", detail: "Did the supermarket negligently cause the injury?" },
          { id: "rule", label: "Rule", detail: "Identify duty of care, breach, resulting damage and the relevant causal link." },
          { id: "apply", label: "Application", detail: "A shop owes reasonable care to visitors. The known, unmarked spill may show breach. Ask whether the breach caused the fall and injury; evaluate all facts." },
          { id: "conclusion", label: "Conclusion", detail: "There is a plausible negligence claim if duty, breach, causation and actionable harm are proved. Do not declare liability without considering evidence and defences." }
        ]
      },
      {
        id: "answer", label: "7 · Structure an exam answer", hint: "Remember the order",
        children: [
          { id: "intro", label: "A · Definition", detail: "Define negligence in two or three clear sentences." },
          { id: "essentials", label: "B · Essential elements", detail: "Explain duty, breach, causal connection and damage in separate subheadings." },
          { id: "authority", label: "C · Case law", detail: "Cite an accurately identified precedent and explain its legal principle." },
          { id: "illustration", label: "D · Application", detail: "Apply each requirement to a short factual illustration or exam problem." },
          { id: "end", label: "E · Conclusion", detail: "Summarise when negligence gives rise to legal liability and note relevant limitations or defences." }
        ]
      }
    ]
  };

  function element(tag, className, value) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = value;
    return el;
  }

  var heading = element("div", "bm-heading");
  heading.appendChild(element("p", "eyebrow", "CONCEPT BRANCHES · INDIAN LAW"));
  heading.appendChild(element("h2", "", "Brain Map"));
  heading.appendChild(element("p", "bm-intro", "Tap any branch to open its smaller concepts. All connections use straight, right-angle lines. No separate horizontal scrolling inside branches."));
  mount.appendChild(heading);

  var toolbar = element("div", "bm-toolbar");
  var expand = element("button", "bm-action", "Expand all");
  var collapse = element("button", "bm-action", "Collapse all");
  expand.type = collapse.type = "button";
  var status = element("span", "bm-status");
  toolbar.append(expand, collapse, status);
  mount.appendChild(toolbar);

  var tree = element("div", "bm-tree");
  tree.setAttribute("aria-label", "Interactive negligence mind map");
  mount.appendChild(tree);

  var count = 0;
  function makeNode(entry, level) {
    count++;
    var box = element("details", "bm-node" + (level === 0 ? " bm-root" : ""));
    box.dataset.nodeId = entry.id;
    box.open = level === 0;

    var summary = element("summary", "bm-summary");
    var titleGroup = element("span", "bm-summary-text");
    titleGroup.appendChild(element("strong", "", entry.label));
    if (entry.hint) titleGroup.appendChild(element("small", "", entry.hint));
    summary.appendChild(titleGroup);
    summary.appendChild(element("span", "bm-plus"));
    box.appendChild(summary);

    var body = element("div", "bm-node-body");
    if (entry.detail) body.appendChild(element("p", "bm-detail", entry.detail));
    if (entry.example) {
      var example = element("p", "bm-example");
      example.appendChild(element("strong", "", "Remember: "));
      example.appendChild(document.createTextNode(entry.example));
      body.appendChild(example);
    }
    if (entry.source) {
      var link = element("a", "bm-source", "Read Supreme Court judgment ↗");
      link.href = entry.source;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      body.appendChild(link);
    }
    if (entry.children && entry.children.length) {
      var children = element("div", "bm-children");
      entry.children.forEach(function (child) { children.appendChild(makeNode(child, level + 1)); });
      body.appendChild(children);
    }
    box.appendChild(body);
    box.addEventListener("toggle", updateStatus);
    return box;
  }

  var root = {
    id: topic.id,
    label: topic.label,
    hint: topic.eyebrow,
    detail: topic.note,
    children: topic.children
  };
  tree.appendChild(makeNode(root, 0));
  function updateStatus() {
    var opened = tree.querySelectorAll("details[open]").length;
    status.textContent = opened + " / " + count + " opened";
  }
  expand.addEventListener("click", function () {
    tree.querySelectorAll("details").forEach(function (node) { node.open = true; });
    updateStatus();
  });
  collapse.addEventListener("click", function () {
    tree.querySelectorAll("details").forEach(function (node) { node.open = node.classList.contains("bm-root"); });
    updateStatus();
  });
  updateStatus();

  var sourceBox = element("section", "bm-reading");
  sourceBox.appendChild(element("h3", "", "Primary sources"));
  sourceBox.appendChild(element("p", "", "The map is a revision aid, not a substitute for reading the judgments or your prescribed textbook."));
  [
    ["Supreme Court: KTDC Ltd. v. Deepti Singh (2019)", sourceCore],
    ["Supreme Court: Municipal Corporation of Delhi v. Subhagwanti (1966)", sourceTower]
  ].forEach(function (item) {
    var a = element("a", "bm-reading-link", item[0] + " ↗");
    a.href = item[1]; a.target = "_blank"; a.rel = "noopener noreferrer";
    sourceBox.appendChild(a);
  });
  mount.appendChild(sourceBox);
})();
