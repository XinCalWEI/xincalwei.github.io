---
layout: post
title: "When Intelligence Becomes Infrastructure: Notes from Ming Zeng"
date: 2026-09-02 09:00:00-0400
description: My reflections on Ming Zeng's discussion of strategic uncertainty, AI industry evolution, AI-native organizations, and the changing value of human work.
tags:
  - "Notes from AI Podcasts & Talks"
categories: perspectives
thumbnail: assets/img/blog/ming-zeng-ai-era-card.png
thumbnail_fit: wide
related_posts: false
toc:
  sidebar: right
  breakpoint: lg
---

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/blog/ming-zeng-ai-era-card.png" class="img-fluid rounded z-depth-1" zoomable=true alt="A visual synthesis of Ming Zeng's three-stage view of AI infrastructure, agent applications, AI-native systems, strategy, organizational change, and human value" %}
  </div>
</div>
<div class="caption">
  My synthesis of the conversation: from AI infrastructure and application exploration to native systems, organizational change, and human value.
</div>

The question I kept returning to after this conversation was not which AI company or product will win. It was a more fundamental one: **what changes when intelligence stops being a scarce capability held mainly by people and becomes an increasingly standardized, affordable, and callable input?**

Ming Zeng's answer reaches far beyond models. It connects the industrialization of intelligence with strategy under uncertainty, the emergence of agents, the economics of infrastructure, the design of organizations, the changing value of experience, and the human purpose of work.

The interviewee, [Ming Zeng](https://kingcenter.stanford.edu/people/ming-zeng), is a business strategist and former Chief Strategy Officer of Alibaba Group. The original conversation is available in Chinese on [Bilibili](https://www.bilibili.com/video/BV1XNtJ6UEmm/).

> **A note on sources and quotations:** This post is my edited synthesis, not a transcript or a claim that the outcomes below are inevitable. The supplied transcript was automatically generated and contains obvious errors in some names, numbers, and English terms. All English quotations below are translated from Chinese and, where necessary, lightly condensed for readability. Where the wording was uncertain, I paraphrased rather than quoted.

## I. Strategy under uncertainty

### Belief comes before proof

The first part of the interview changes the meaning of strategic expertise. When the host asks how Alibaba knew that several fiercely contested decisions would prove correct, Zeng does not claim that the answer was visible in the data.

> “We didn't know. We saw it because we believed.”

This is not a celebration of intuition detached from evidence. Zeng immediately adds the missing caution: contrarian thinking is not inherently correct. Many non-consensus ideas fail, and the success stories available for study are filtered by survivorship bias.

The distinction is between consensus excellence and era-defining strategy. A company can execute a broadly accepted direction exceptionally well and become excellent. A company that helps define an era usually begins with a picture of the future that most people do not yet share. It must act before that picture can be proved, endure negative feedback, and keep revising its path as reality supplies new evidence.

What I found useful is that belief here is neither certainty nor stubbornness. It is a provisional commitment strong enough to support action but still answerable to the world. The difficult skill is to preserve the underlying question while changing the route whenever the evidence demands it.

### Strategy is a cascade, not one dramatic decision

Zeng's Alibaba examples also show why a bold headline is not yet a strategy. A decision such as building a cloud business immediately branches into further choices: whether to design for one internal use case or many external ones, which scenario to serve first, whether components should be open or closed, and which layers of databases, computing, and storage the company must build itself.

Each choice changes the feasible choices beneath it. Strategy therefore travels from a broad thesis through a sequence of increasingly concrete technical, product, and organizational commitments. A correct high-level direction can still fail through poor second- and third-order decisions. Conversely, detailed execution can reveal that the original picture needs revision.

This made Zeng's approach to signals and noise clearer to me. He is not trying to forecast a specific winner. He is trying to identify the structure of an industry's evolution. That requires sensing widely enough to notice changes outside one's current model, then thinking deeply enough not to chase only the trend that has already become visible to everyone else.

### The middle horizon carries the creative burden

Zeng's familiar formulation—look ten years ahead, think three years ahead, act one year ahead—is often repeated as a planning cadence. In the interview, he makes it much less mechanical.

> “The numbers are only illustrative. What matters is the tension and trade-offs across the short, medium, and long term. Strategy is fundamentally about trade-offs.”

The intervals can be five years, two years, and six months, or something else suited to the industry. The indispensable part is the middle horizon. A distant vision cannot tell a team what to do tomorrow. A one-year forecast built from current monthly growth merely extends the present and can create a “growth illusion.”

The middle horizon forces a team to imagine several connected steps. If the long-term destination is meaningful, what must become true before it is reachable? What is the third milestone, the second, and the first? Which present action creates the option to reach the next one?

This connects to three strategic states that should not be managed in the same way:

| Strategic state | Primary problem                                        | Appropriate operating emphasis                                                             |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Exploration** | The direction and viable solution are still uncertain. | Founder-led search, many informative trials, low-cost failure, and fast learning.          |
| **Formation**   | A repeatable feedback loop is beginning to appear.     | Narrowing the thesis, strengthening the loop, and testing whether it can repeat and scale. |
| **Maturity**    | The direction is sufficiently understood to scale.     | Efficiency, standardization, reliability, and disciplined execution.                       |

This table is my operational interpretation of Zeng's discussion. Its value is simple: asking for mature-stage efficiency during exploration can destroy the variation from which a strategy must emerge. Treating a mature system as endless exploration prevents it from compounding.

## II. From metered intelligence to an agent economy

### Why Zeng sees an infrastructure layer maturing

Zeng describes general-purpose technological revolutions as moving through three broad stages. Before that framework makes sense, however, intelligence has to become usable as an input.

He treats the normalization of token-based usage and pricing as one sign—not proof—that this is happening. Electricity became easy to consume when users no longer needed to understand the power plant and could buy a standardized unit. Data transmission became easier to buy when usage could be measured consistently. In a similar way, tokens make access to model capability meterable, callable through software, and legible as a cost. Tokens meter usage, not intelligence itself; the analogy is economic rather than a claim of technical equivalence.

The model continues to improve and prices continue to change, but the user no longer has to build the underlying intelligence from scratch. That is the shift from a research breakthrough toward infrastructure.

My reconstruction of Zeng's three-stage framework is:

| Stage                       | What changes                                                                            | Central uncertainty                                                           |
| --------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Infrastructure**          | Models become stronger, cheaper to call, and easier to integrate as a standard input.   | Which providers and technical architectures will sustain reliable supply?     |
| **Application exploration** | Teams build agents, workflows, products, and new business models on top of that input.  | Which tasks create enough value and feedback to support a durable product?    |
| **Native applications**     | Products and organizations are designed around machine intelligence from the beginning. | Which forms will emerge from the accumulated experiments of the second stage? |

Zeng offers 2026 as his judgment about a possible boundary: the first stage is becoming mature enough for the second to begin in earnest. I read this as a strategic thesis, not a settled industry fact or a precise date on a universal clock.

### The second stage cannot be skipped

The strongest correction to a common AI narrative is Zeng's refusal to treat application exploration as a waiting room.

> “The second stage is exciting and valuable in its own right. You cannot skip over it; without passing through it, there is no third-stage opportunity.”

Many early applications will disappear. That does not make the stage disposable. Their experiments reveal what users delegate, where models fail, which interaction patterns work, what context must be retained, which data is valuable, and where a business can form a closed loop.

The mobile-internet example is instructive. Recommendation systems, mobile hardware, bandwidth, video production, and user behavior did not mature as one coordinated invention. Early products explored different pieces. A recommendation model developed in one product could later combine with short-form video and improving infrastructure to create a genuinely native experience.

The third stage is therefore less likely to be designed in isolation by one person than to emerge from the interaction of thousands of second-stage attempts. Industry-level learning can be real even when company-level outcomes are failures.

The same experimental logic operates at three levels:

- At the **industry level**, diverse application failures search the possibility space.
- At the **company level**, participation creates knowledge of customers, context, data, and failure modes.
- At the **organizational level**, lowering the cost of an informative failure allows the search to continue.

### From an information age to an age of capabilities

The browser analogy becomes much more powerful once agents are defined not as chat interfaces but as packaged capabilities.

> “The innovation of AI is that it takes us from an age of information into an age of capabilities.”

Websites allowed people to digitize and share information. Agents aim to package an ability so that someone else can invoke it: analyze a dataset, negotiate a workflow, write and test software, manage a process, or coordinate other tools.

In the early web, the browser and open standards lowered barriers on both sides. Publishing became accessible to more creators, while clicking and navigating made consumption accessible to more users. Supply and demand expanded together. Only after websites multiplied did a Yahoo-like discovery layer become urgent.

Zeng thinks the first large agent opportunity may similarly be browser-like: a common way to create, publish, invoke, and combine capabilities. Once that layer lowers the barrier for both developers and users, the number of agents can expand. Discovery comes next.

But choosing an agent is a higher-stakes problem than choosing a website. A disappointing page wastes a few minutes. An agent may receive money, personal data, business permissions, or responsibility for a consequential task. Users need evidence about competence, identity, cost, reliability, and accountability. A future discovery layer may therefore combine a directory, evaluation system, trust mechanism, and marketplace between capability providers and users.

An agent operating system belongs further out. In Zeng's speculative third-stage picture, a user expresses an intent and the system quietly orchestrates the necessary agents; individual tools may disappear behind the outcome. The sequence I take from the conversation is:

**model infrastructure → agent and skill experiments → browser-like creation and access standards → abundant agents → discovery and trust → platforms → intent-driven orchestration**

That sequence is my synthesis, not a timetable or a prediction that the web will repeat itself exactly.

### Models can be essential without capturing every layer of value

Zeng uses business history to resist a tempting inference: a company that becomes extraordinarily valuable during the first stage must also dominate the native stage. General-purpose technology transitions have repeatedly produced early infrastructure or access leaders that looked definitive at the time. Some remained important; others did not own the applications that followed.

His more direct analogies are refineries and utilities. A refinery is indispensable to a chemical economy, but it does not automatically invent or own every chemical product. Electricity is required by an appliance, but the power provider does not thereby become the appliance company.

The economic question is substitutability. Model providers may remain meaningfully differentiated while becoming similar enough that customers can switch among them. As substitution becomes credible, buyer power rises. Pricing moves away from capturing a large share of every customer's value and closer to competition around the cost of supplying intelligence.

Zeng therefore imagines a possible infrastructure equilibrium with a small number of providers and strong public oversight, because society would depend on stable, affordable supply. This is a thesis about a potential industrial structure, not a statement that current model companies are identical or that model research has ceased to matter.

In fact, he also identifies a powerful counterforce: a model organization can use AI to improve AI research itself. Models assist coding, experimentation, evaluation, data work, and engineering; those improvements accelerate the next model, which further improves the internal tools. The advantage is not compute alone but an **organizational intelligence flywheel** joining researchers, models, infrastructure, data, and feedback.

The capabilities required in the next stage are different. Infrastructure competition rewards reliability and deep technical invention. Application competition also requires product judgment, empathy with ordinary users, context management, interaction design, and an understanding of a specific task. A first-stage organization does not automatically possess those capabilities merely because it has the strongest model.

### The application moat is another intelligence flywheel

The application layer has its own version of the flywheel. An agent performs real work, receives feedback from the world, improves its context or algorithms, becomes capable of a harder adjacent task, and earns more opportunities to act. More useful work produces more informative feedback.

This is deeper than a conventional data loop. The product is not only collecting clicks; it is learning how to perform a capability. The defensible unit may combine task-specific data, context, evaluation, interaction design, and algorithms that make the agent better within that environment.

Simple tasks with little room for learning are vulnerable to absorption by the base model. If an application does one shallow transformation that the next model can perform directly, its boundary may disappear. A stronger starting point is a complex and valuable task with enough structure for the application to accumulate unique understanding and expand.

That technical depth does not necessarily require training another foundation model. Application companies can innovate in memory, context, planning, tool use, evaluation, feedback, interfaces, and the way a workflow closes around real outcomes.

This explains Zeng's insistence that waiting is not a neutral strategy:

> “You cannot simply wait it out. If you are not in the arena, you cannot accumulate the relevant experience; when the real wave arrives, it will knock you over.”

I think of the missing asset as **cognitive capital**. A team that starts early may lose money or abandon a product, but it learns what customers mean, which contexts matter, how agents fail, what should be measured, and where the loop can close. A team that waits for certainty saves the cost of early errors but may arrive without the knowledge required to recognize the real opportunity.

Zeng's deliberately provocative defense of early bubbles follows the same logic. When no central referee knows which direction is right, high expected rewards attract talent and finance parallel experiments. Most fail; collectively, they produce information. This is not a defense of unlimited spending. The useful operating principle is to lower the cost of each trial and increase the number of trials that genuinely change what is known.

### Robotics makes the uncertainty visible

Robotics sits earlier in its industrial cycle and offers a live test of this framework. Zeng sees at least two plausible routes. One begins with a general “brain” and works toward broader physical embodiment. Another begins with a specific body and environment, closes the loop among action, data, and feedback, and expands from that foothold.

His mountain analogy is apt: one group may climb from the north slope and another from the south. The challenge is not to declare the correct route in advance but to turn one working capability into a broad and useful range of abilities.

The automotive analogy separates a prototype from an industry. Many teams could build an early vehicle; the larger transformation came when manufacturing made a useful product repeatable and affordable at scale. Zeng uses the ability to sell ten thousand robots as a deliberately concrete milestone. The number should not be mistaken for a universal threshold. His point is that stable production and delivery may matter more than another isolated demonstration.

He then suggests that appliances may be a better analogy than a single universal car or humanoid. If AI is like electricity, robots are interfaces through which it enters the physical world. Homes and industries may need many forms—companionship, household work, manufacturing, logistics, or maintenance—rather than one body that wins every category.

## III. The organization as the next product

### The corporation is an industrial-era design

The organizational part of the interview is not an aside. It follows directly from the economics of intelligence.

Zeng treats the modern managerial corporation as an institutional technology of the industrial era. Large-scale production required standardized jobs, repeatable processes, managerial layers, and coordination across many people. The corporation bundled those requirements into a durable form.

If AI changes the cost of expertise, execution, communication, and coordination, simply adding a model to that inherited structure may leave the most important assumptions untouched. Zeng therefore deliberately prefers the word **organization** to **company**.

He sees today's research-led “new labs” as early prototypes of another form. They are not a finished answer, and their practices may not transfer directly to every kind of work. Their importance is that researchers dissatisfied with both conventional companies and universities are already experimenting with smaller, mission-centered ways of organizing difficult creative work. The label “lab” marks an opening rather than a settled institutional design.

His prediction is strong, but more precise than “companies will disappear”:

> “The hierarchical corporate form will decline. Human specialization and collaboration will continue; organization itself will never disappear.”

People will still need one another because no individual has unlimited time, judgment, relationships, or creative range. The open question is which structures will coordinate those differences.

### Adding AI to a workflow is not yet AI-native

Embedding AI into an existing workflow is useful, but Zeng calls it transitional because the workflow was designed around human limitations and organizational boundaries. An AI-native organization starts one level earlier: it defines the work, decomposes it into tasks, then decides which combination of people and agents should perform them.

The contrast can be summarized this way:

| Industrial organizing logic                            | Possible AI-native organizing logic                                  |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| Define a job and write a job description.              | Define an outcome and decompose the work into tasks.                 |
| Hire a person into a persistent role.                  | Assemble people and agents around the current task.                  |
| Route decisions through reporting lines.               | Route decisions toward relevant capability and context.              |
| Evaluate the occupant of a position periodically.      | Record contribution and feedback through delivered results.          |
| Optimize a human-designed workflow with AI assistance. | Redesign the workflow around what humans and AI can each contribute. |

This is my reconstruction of the direction discussed in the interview, not a complete operating model.

The job is more than a label. It anchors recruitment, departments, levels, salary bands, promotion, performance review, and career ladders. If the task becomes the smaller unit, all of those surrounding systems have to be reconsidered.

Authority also becomes more situational. In a hierarchy, rank often determines who decides across many unrelated questions. In a task network, the stronger voice may belong to the person—or eventually the agent—with the most relevant capability and evidence for that particular problem.

### The one-person company is evidence, not the destination

AI can collapse many functions that once required a company into the hands of one person. That makes the one-person company an important transitional demonstration. It proves that the coordination cost of producing something can fall dramatically.

Zeng does not see isolation as the endpoint. One person remains bounded. As AI absorbs more homogeneous work, the remaining reason to invite another person is increasingly that the person contributes something complementary and difficult to replace.

This produces a partner-like organization rather than a crowd of interchangeable employees. Zeng's sports-team analogy is more useful than the phrase “flat organization”: a striker, defender, and goalkeeper are not equal because they do the same work. They are peers because their different abilities are essential to the shared outcome.

Smaller teams may therefore combine greater AI leverage with higher value per person, clearer contribution, and stronger partnership. Openness, shared context, personal agency, and co-creation become operating requirements rather than cultural decoration.

### The organization must generate strategy

The deepest organizational claim answers a question posed directly by the host: why place organization before strategy?

The conventional sequence is straightforward: leaders decide the strategy; the organization executes it. That sequence assumes the leaders already know the answer. During a technological transition, they do not.

Zeng describes the organization instead as a neural network. Different nodes observe customers, technologies, competitors, and operational failures. They run local experiments, develop partial interpretations, and share context. Connections among those signals allow an insight to appear that no central planner possessed beforehand.

> “The real work of organizational design is to create an environment in which strategic insight can emerge.”

He continues by asking whether previously unimagined insights can be put to use and whether the group's collective intelligence is evolving. This is a different definition of organizational performance. The organization is not only a machine for scaling a chosen answer; it is a system for discovering the answer.

The mechanism matters:

**distributed sensing → local experiments → feedback → shared context → connection and collision → unexpected insight → strategic commitment**

Zeng invokes Netflix's “context, not control” principle. Context here is not surveillance or a larger dashboard for the CEO. It is the reason behind the goal, the current state of the environment, the assumptions being tested, and the relevant work happening elsewhere. With enough shared context, nodes can make coherent local decisions. Without it, decentralization becomes fragmentation.

An AI-supported “organizational brain” could help maintain this context, connect related work, and detect when teams drift from a shared objective. This is also why Zeng thinks the original logic of OKRs may receive stronger technical support. Many organizations turned OKRs into another KPI system because genuine alignment demanded more shared understanding than the organization could sustain.

### Why incumbents face more than a tooling problem

“All in AI” is not an organizational design. A large incumbent can purchase models, deploy copilots, and automate workflows while preserving the decision structure, incentives, architecture, and assumptions of the previous era.

Zeng contrasts the difficulty of converting a hundred-thousand-person organization into an AI-native one with growing a ten-person AI-native team into a thousand-person organization. The figures are illustrative, but the asymmetry is real: the first path must unwind established structures and assumptions; the second builds its coordination model as it grows.

His comparison between the internet and AI makes the discontinuity clearer. He characterizes the internet primarily as a revolution in relations of production—how people and information connect—while AI reaches more directly into productive capacity—how work itself is performed. The mobile internet retained enough of the earlier internet architecture that some incumbents could migrate. If AI changes the production function beneath the organization, continuity may be weaker.

The critical question is therefore not whether an incumbent can launch an AI product. It is whether the old organization can create and protect a genuinely new organizational form long enough for it to develop its own strategy.

### Founders need conviction without ego

Zeng's distinction between an excellent founder and a great one returns to feedback.

> “Greatness is defined after the fact. It is the result of overcoming negative feedback again and again.”
>
> “The endeavor is bigger than the individual.”

Conventional signs of excellence often arrive with positive feedback: credentials, growth, approval, and visible competence. A non-consensus undertaking may produce the opposite for years. The difficulty is not merely tolerating criticism. It is continuing to learn without letting either external rejection or personal ego determine the next decision.

Negative feedback is not evidence that the direction is correct. Zeng also stresses that many unconventional ideas fail; being both right and able to turn the idea into reality is exceptionally rare. Endurance matters only when it remains joined to judgment, execution, and learning.

Zeng connects a smaller ego with greater empathy and less dependence on short-term validation. A founder trying constantly to prove personal brilliance is drawn toward decisions that generate quick confirmation. A founder trying to make the undertaking succeed can listen more widely, change course, and give other people genuine ownership.

This is why he asks founders what they want to have built ten years from now. A valuation target is an external score. “I want this to exist” reveals a different source of motivation. I heard a progression from opportunity, to strategy, to vision, to mission—each step less dependent on immediate external reward.

The same integration appears in the founder's work. Product, technology, business structure, customer value, and resource allocation become harder to separate. Zeng suggests that the standalone product-manager role may therefore become less central. Application-era founders need enough technical understanding to reason about capability, but they need not all be researchers. A technical or model cofounder and a product, domain, or business cofounder may form a genuinely complementary partnership.

Technical superiority alone is not a business model. Once alternatives become sufficiently substitutable, competition limits excess returns. Technical founders must learn to ask not only whether the system is better, but what customers can substitute, where feedback compounds, and why value will remain attached to their organization.

## IV. What remains human

### Experience changes value; people do not become obsolete

Zeng's argument about experience is easy to flatten into a generational claim. It is subtler.

Experience historically carried value partly because it stored information unavailable elsewhere. When reusable parts of that experience are digitized into models, access to the information becomes less scarce. A younger person can use AI to become conversant in a field much faster than before.

This does not erase tacit knowledge, relationships, embodied judgment, or the ability to act responsibly in context. It changes what differentiates a person. Memory of established practice becomes less defensible on its own; judgment under uncertainty, taste, empathy, trust, problem formulation, initiative, and the ability to orchestrate AI become more important.

My own takeaway is that the human advantage shifts away from possessing answers and toward deciding which question deserves attention, recognizing when an answer does not fit reality, and coordinating people around a purpose that cannot be reduced to the next output.

### Education is caught between two systems

The educational model Zeng critiques is built around knowledge transfer and a relatively linear path: school, credential, job, and advancement within a role. If knowledge becomes cheap and jobs become less stable as organizational units, that path loses some of its predictive power.

The replacement has not yet been institutionalized. Students can sense that the old promise is weakening without being able to see a reliable new route. Zeng suggests that society may need a generation to absorb the transition because those who grow up with AI from an early age will treat it as part of their environment rather than as a tool added later.

The abilities worth cultivating become less linear: asking strong questions, exploring without a guaranteed answer, directing one's own learning, collaborating with AI, testing uncertain ideas, understanding trade-offs, and recovering from failure.

### Creativity means moving toward what does not yet exist

If models can reproduce more established knowledge and familiar creative forms, defining creativity as “writing a song” or “making an image” is no longer sufficient.

> “This is the ability to create something from nothing.”

The sentence follows Zeng's argument that creativity needs a broader definition than producing a familiar artistic form. “Something from nothing” does not mean creation without material or history. It means defining a problem that has not been named, imagining a need that has not been served, designing a new relationship or organization, or giving people an experience and source of meaning that did not previously exist.

As the cost of retrieving and recombining the known falls, human effort can move further toward the unknown.

### Beyond efficiency

The narrow version of AI transformation asks how one person can complete far more tasks than before. The deeper version asks which tasks should exist at all—and what people might create if less attention were consumed by repetitive work.

Zeng notes that much knowledge work has been simple, repetitive, burdensome, and emotionally empty. If AI absorbs part of it, technological progress should not mean replacing ten assigned tasks with one hundred. It should increase autonomy and release creative capacity.

That changes how an organization should be judged. Output per employee still matters, but so may the freedom to explore, the quality of collaboration, and whether people can find meaning and satisfaction in the work. Zeng points to early Google practices—time for self-directed exploration, respect for differentiated contribution, and an environment designed to attract creative people—as an imperfect preview of that cultural direction.

> “Perhaps happiness will become a requirement.”

I read that line less as a promise that technology will make everyone happy than as a design constraint. An organization that gains enormous leverage from AI but leaves no autonomy, curiosity, or purpose has changed its throughput without changing the human experience of work.

At the exploratory edge, efficiency itself needs a better definition. Eliminating every anomaly and failed attempt may remove the information required to discover a new path. The goal is not waste. It is **effective exploration**: lower the cost of being wrong, preserve the ability to learn from an unexpected result, and increase the number of experiments that can change the model.

## My synthesis: five connected transitions

The value of this conversation is not that it supplies a list of predictions to memorize. Zeng explicitly says that he is looking for structural patterns rather than making short-term forecasts. I read the argument as five connected transitions:

1. **Technology:** intelligence becomes increasingly standardized, affordable, and callable.
2. **Industry:** agents package capabilities; experiments create standards, feedback loops, trust layers, and eventually native applications.
3. **Strategy:** organizations must act before proof, connect long vision to near-term choices, and match their operating system to the current stage of uncertainty.
4. **Organization:** jobs may give way to tasks, rank to situational capability, and execution-only hierarchies to networks that help generate strategy.
5. **Human value:** as established knowledge becomes cheaper, judgment, agency, empathy, mission, and the ability to create what does not yet exist become more scarce.

None of these outcomes is guaranteed, and the arrows will not move at the same speed. The framework is useful because it connects them causally. If intelligence becomes an infrastructure input, applications can experiment at larger scale. If agents perform capabilities rather than merely return information, platforms need new standards and trust. If AI changes the production function, organizations built around fixed jobs and stable expertise come under pressure. If those structures loosen, people must decide what they want the new freedom to serve.

I remain least certain about the farthest extrapolations: the eventual agent operating system and the institutional form that might follow the managerial corporation. They are valuable here as questions that reveal present constraints, not as destinations I assume will arrive exactly as described.

My central takeaway is not simply that AI will create different products. Intelligence as infrastructure can loosen institutions built around scarce knowledge, fixed roles, linear planning, and scale efficiency. The most consequential competition may be over who discovers not only a stronger model, but a valuable capability, a self-improving feedback loop, a strategy-generating organization, and a more meaningful use of human attention.

The technology expands what can be done. The unresolved question—one no model or organizational chart can answer for us—is what deserves to be done.
