---
layout: post
title: "When Models and Agents Evolve Together: Notes from Fuli Luo"
date: 2026-09-13 09:00:00-0400
description: Notes on Fuli Luo's interview about OpenClaw, agent training, long-context model design, and how research teams learn as their tools change.
tags:
  - "Notes from AI Podcasts & Talks"
categories: perspectives
thumbnail: assets/img/blog/fuli-luo-models-agents-notes.png
thumbnail_fit: wide
related_posts: false
toc:
  sidebar: right
  breakpoint: lg
---

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" fetchpriority="high" path="assets/img/blog/fuli-luo-models-agents-notes.png" avoid_scaling=true class="img-fluid rounded z-depth-1" zoomable=true alt="Illustrated notes on Fuli Luo's interview, connecting models, agent frameworks, post-training, compute, and research organizations along a mountain path" %}
  </div>
</div>
<div class="caption">
  A visual summary of the interview. The diagram groups related ideas; its resource ratios and forecasts are interview-era estimates. Click to enlarge.
</div>

Fuli Luo initially saw OpenClaw as a new interface for capabilities she already used. Coding agents, messaging, memory, and an assistant available throughout the day sounded like familiar ideas assembled into a product.

During the Spring Festival break, she tried it late one night and kept talking until daylight. Over the next few days, she used it to think through team-building questions and implement a research prototype. By then, she was actively looking for tasks that would expose its limits.

> “What I feel I lack now is imagination—I have to think furiously about what it still cannot do.”

[Fuli Luo](https://newsen.pku.edu.cn/news_events/news/people/15385.html) is introduced in the [Chinese interview on Bilibili](https://www.bilibili.com/video/BV1iVoVBgERD/) as the leader of Xiaomi's MiMo model team. She discusses how this experience changed her approach to model training, architecture, compute, and the organization of research.

The interview made me think more carefully about what I am evaluating when I use an agent. Its results depend on the model, the information it receives, the tools it can use, and how it responds to feedback. Luo describes changing each of these while also changing how her team works. Following those decisions is more useful than treating every improvement as a gain in the model alone.

_These thematic notes draw on two transcript parts with imperfect transcription and speaker labels. Quotations are my English translations of identifiable guest passages; ambiguous turns are paraphrased in context. Linked primary sources supply technical clarification. Product comparisons and forecasts belong to the period around the March 2026 MiMo-V2-Pro, Omni, and TTS releases._

## I. How the framework changes what a model can do

### What changed when she used it

For demanding software engineering, Luo already relied on Claude Code with a strong Claude model. What surprised her about OpenClaw was how much of the work around the model it handled.

In their first conversation, the assistant noticed how late it was and suggested that she sleep. She later examined the mechanisms behind that apparent attentiveness: behavioral instructions, the time supplied with a conversation, and how context was assembled for the model. Small design choices were changing the interaction.

She next discussed curiosity, recruiting, and organizing a team. The system helped turn those exchanges into practices and skills she could use again. It retained parts of the discussion that would otherwise have needed another explanation.

Then she asked for something closer to her research: a simulated user agent that could participate in multi-turn interactions. Such a component could help construct richer tasks and training data. She recalls producing a working prototype after one or two hours of discussion, much sooner than she had expected.

Her examples show what an agent framework does. It decides what information to retain and present, connects the model to tools and other models, and manages when work begins or resumes. These functions determine whether the model can act on a request without the user supplying every missing step.

### A stronger model can improve the framework for a smaller one

Because OpenClaw was open source, Luo could change its memory and agent-coordination code. She used Claude Opus 4.6 to help make those changes, then tried less expensive models in the revised framework.

Some performed better than she had expected. A model that could not design the improved framework could still use the instructions, retained context, and procedures that the stronger model had helped create.

Luo still credits the strongest model for difficult framework modifications and her most surprising results. Extended software engineering and kernel optimization continued to expose differences between models. Better memory and tool access helped with some limitations; they did not supply every missing reasoning capability.

She describes Claude Code as a strong reference for software development and OpenClaw as better suited to some of the broader tasks she tried. A personal assistant needs to carry information across conversations, use different communication channels, schedule work, and find ways to interpret unfamiliar inputs. The relevant comparison is how well each system completes the intended task.

### Three different meanings of improvement

The word “learning” can hide several different changes in this discussion. I find it helpful to separate them:

| What changes     | An example from the discussion                                        | What has actually improved                                                |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Retained context | Memories, skills, task history, and working preferences               | The system has more relevant information available for future interaction |
| The framework    | Revised orchestration, routing, memory handling, or coordination code | The model operates in a different environment                             |
| Model parameters | Supervised fine-tuning or reinforcement learning on task experience   | Training changes the model's behavior                                     |

The first two can make an agent more useful without changing its model weights. They can also expose tasks and failure modes that later become training material. Luo's larger ambition is for these forms of improvement to reinforce one another: a stronger model helps redesign the framework, and a better framework gives the model more effective ways to act and learn.

A framework also needs revision as its models change. A larger context window may allow a different memory strategy. Better video understanding may make it useful to preserve information that an older pipeline discarded. Keeping the framework fixed can leave those gains unused.

## II. Training agents on complete tasks

### Why coding appears at every transition

Luo keeps returning to code because it offers useful structure at several stages of model development.

During pretraining, which builds a model's initial capabilities from large datasets, a code repository supplies dependencies across files, interfaces, tests, and implementations. Understanding one function may require information elsewhere in the project. Luo sees code as an especially concentrated source of long-range relationships a model has to track.

During reasoning training, code and mathematics offer relatively strong feedback. A program can be executed; a proposed solution can be checked against a verifier. Those checks are incomplete accounts of quality, but they can make some errors easier to identify than in a wholly open-ended response.

During agent training, software development adds interaction over time. A project involves planning, implementation, execution, debugging, and revision. Luo also points out that a demanding task need not produce much code: a short implementation can require a long sequence of experiments to establish whether it improves performance. The duration and difficulty lie partly in verification.

Code therefore offers long dependencies, verifiable outcomes, and tasks that require repeated action. Luo expects some of the resulting abilities to transfer to other work, but says broader training is needed to make that transfer reliable. Occasional success in a new domain is not yet consistent performance there.

Looking back, Luo describes different contributions from the open-model community. Llama made important training choices easier to study. Qwen provided a broad range of models and a developer ecosystem. DeepSeek pursued architectures that improved training and inference efficiency. She sees these contributions as mutually useful: accessible models support further research, while architectural advances make new scales and applications practical.

The spread of reasoning capability beyond its initial code-and-math setting surprised her. That experience became a reason to question her first reaction to another apparently narrow coding tool. She had already seen a tractable training domain support a broader change in behavior.

### Reconstructing a task's working conditions

A real task supplies more than a prompt. It has files, tools, earlier decisions, constraints, user feedback, and a state that changes after each action. Luo identifies reconstructing that environment as a major difficulty in turning actual use into training.

If an agent succeeded only after a person explained a business rule, the useful lesson includes the rule and how it became relevant. If it failed because it lacked access to a tool, replaying the text alone may hide the cause. If the user changed a requirement midway through the task, the model has to respond to that change rather than complete the original plan mechanically.

This is where the simulated user agent fits. It can help construct interactions in which requirements change or a user provides feedback. Those interactions can supply demonstrations for supervised fine-tuning and experience for reinforcement learning. Their value depends on how well they represent the tasks and responses the deployed agent will encounter.

Skills address another part of the problem. Many organizations have procedures that never appeared in public pretraining data: what counts as a finished deliverable, which exception requires escalation, how a local workflow is normally carried out. People can teach these practices through repeated interaction and preserve them in reusable instructions or tools.

A skill gives the model information or a procedure to use at execution time. Later training may incorporate experience from using it, but storing a skill does not itself update model parameters.

### Evaluation has to follow the work

Luo criticizes evaluations that call a task “agentic” while placing it in a very narrow, simplified setup. A model can improve at repairing a selected bug or answering a question with a few tool calls and still be unreliable inside a more complicated framework. The deployment asks it to understand additional instructions, preserve longer histories, handle interruptions, and adapt to a person who is no longer correcting every implementation detail.

She recalls temporarily setting aside familiar benchmark rankings when direct use revealed large differences in capability. As progress became harder to distinguish, precise evaluation became necessary again.

> “A good framework needs a strong, generalizable evaluation system before it can improve itself.”

At first, an expert user may supply much of that evaluation: pointing out what failed, adding missing context, changing a constraint, and asking the system to try again. The research question is how to capture more of that feedback in a form that supports systematic improvement across tasks, rather than relying on the same expert to repair each run.

The anonymous release gave the team another check. Luo describes testing whether outside users agreed with its internal assessment and learning that long-form generation needed more work. The team focused on that weakness before the named release. Xiaomi's [Pro announcement](https://mimo.mi.com/docs/en-US/news/previous-news/v2-pro-release) identifies Hunter Alpha as an early anonymous version of MiMo-V2-Pro.

For my own use, I want to know what the agent was asked to do, what resources it had, how often a person intervened, and whether the delivered result passed inspection. Those details help explain what a benchmark score or a successful demonstration leaves unresolved.

## III. Long context, model architecture, and compute

### Long context has to be useful and affordable

Luo says the MiMo-V2 architecture was designed to process long contexts accurately and efficiently. Flash and Pro were developed in parallel, before the team knew how OpenClaw would be used. Their priority was a model that could make practical use of a long history at an affordable cost.

An agent repeatedly uses task history, instructions, tool outputs, and partially completed work. Retaining relevant material saves the user from explaining it again, but processing that material takes time and memory. A larger context window still needs effective caching and decisions about what to retain.

Luo separates context capacity from the difficulty of training on genuinely long tasks. Filling a window with text is not enough: the task must contain useful dependencies and feedback across that history. Generating and evaluating long interactions is expensive, so the team also has to decide which tasks justify the training cost.

Two model specifications help anchor the discussion. These are launch-era figures from Xiaomi's [Flash repository](https://github.com/XiaomiMiMo/MiMo-V2-Flash) and [Pro announcement](https://mimo.mi.com/docs/en-US/news/previous-news/v2-pro-release).

| Model         | Total / active parameters | Local : global attention pattern | Published context capacity |
| ------------- | ------------------------- | -------------------------------- | -------------------------- |
| MiMo-V2-Flash | 309B / 15B                | 5:1                              | Up to 256K tokens          |
| MiMo-V2-Pro   | Over 1T / 42B             | 7:1                              | Up to 1M tokens            |

The ratios describe the main hybrid pattern. Flash has a first-layer exception: its [technical report](https://arxiv.org/html/2601.02780v1) lists 39 sliding-window attention layers and 9 global layers. These attention ratios are separate from expert activation. In a mixture-of-experts model, a token uses only a subset of the model's experts; total and active parameter counts therefore describe different aspects of its size and computation.

Hybrid attention combines layers that attend within a local window with layers that can attend across the sequence. Flash's published local window is 128 tokens. Using more local layers can reduce memory and computation, but too much restriction can hurt the model's ability to use distant information.

Luo describes finding room for a more aggressive mixture in the larger model while maintaining the capability her team wanted. She immediately qualifies the generality of that observation:

> “These are our experimental results; I am not sure other teams would obtain the same results.”

### Spare compute and multi-token prediction

The team was already well into training when a closer examination of inference revealed substantial unused computation. Multi-token prediction offered a way to use that capacity for faster generation.

Multi-token prediction, or MTP, has two roles. During training, it adds objectives for predicting tokens beyond the next one. During inference, it can propose several future tokens for the main model to verify together. When enough proposals are accepted, this advances generation faster than processing one token at a time. Xiaomi's [Flash technical report](https://arxiv.org/abs/2601.02780) describes lightweight MTP modules for this purpose.

This verification checks the proposed tokens against the target model's generation process, not against facts about the world. It does not remove hallucinations the model could already produce. The speed benefit depends on how often proposals are accepted, the cost of verifying them, and the available hardware capacity.

Luo compares this opportunity with multi-head latent attention, or MLA, which compresses cached attention information. Her criticism concerns whether a particular architecture and inference setting leave enough compute available to profit from additional speculative work.

MLA and MTP can be used together: [DeepSeek-V3's report](https://arxiv.org/html/2412.19437v2) describes both and reports a decoding speedup. The question is whether the extra speculative work pays off for a particular model, workload, and hardware configuration. If decoding already keeps the arithmetic units busy, there may be less spare capacity to use.

When decoding spends much of its time waiting for memory, arithmetic capacity can remain idle. MTP can use some of that capacity to propose and verify additional tokens. Luo's design argument is to measure this balance on the intended hardware and improve the complete inference process.

> “Once you have experienced a faster model with comparable intelligence, you cannot go back to the slower one.”

### Planning architecture while adapting post-training

Luo distinguishes the long commitments of architecture and pretraining from the responsiveness needed in post-training. A base model takes time to design and train. The framework in which users will eventually run it may change substantially before that process finishes.

A tightly optimized architecture can be effective when the hardware and workload are sufficiently predictable. If those assumptions change, some of its specialization may become a constraint. A simpler design with room to adjust may give the team more options later, although simplicity by itself does not guarantee good efficiency.

This becomes more significant when post-training is an extended program rather than a short final stage. New environments, skills, model capabilities, and evaluation methods can keep expanding what the same base model can do. The original assumptions about context length, serving hardware, or task distribution then have more time to become outdated.

Luo considers a roughly trillion-parameter base an “entry ticket” for approaching the hardest agent capabilities she was using as a reference at the time. That is her assessment of a particular frontier, rather than an established minimum size for capable agents. It leaves room for smaller models to be useful in many tasks.

She also distinguishes catching up with a model available today from keeping pace with what its developer produces next. In the interview, she thought responsive teams could approach the then-current Claude reference within a few months. That was a forecast about a fixed reference point, not a claim that the moving frontier would stand still.

At the same time, she expected stronger agents to increase inference demand and put more pressure on chip and memory supply. Decisions about the next model's scale and hardware therefore had to begin while the current model was still improving.

Her standard for original research is whether an idea can work at scale and contribute to a useful model. She describes several connected advances adding up to frontier-level performance. The results of architecture, training, and infrastructure research become visible together when someone uses the model.

### Faster implementation changes the compute budget

When an idea takes less time to implement, more ideas can reach the point where they need to run. Luo describes this as a shift toward experimental compute becoming a more visible bottleneck. The GPUs have not accelerated merely because the researcher writes code faster.

> “If the tests are accurate enough, you can pursue ten ideas in parallel instead of queuing them as before.”

Reliable evaluation is what makes those parallel trials useful. The team still has to tell which result is meaningful and which experiment to run next.

Her resource discussion separates the final production training run from the research required to decide what that run should be. Architecture experiments, data studies, debugging, and agent post-training all need capacity. She argues for substantial resources outside the headline training job and for post-training becoming much more significant in the overall budget. Her suggested ratios are illustrative planning judgments, rather than a measured allocation rule for every lab.

The infrastructure also changes. A rollout is an attempt the model makes at a task during training. A reasoning rollout may largely involve generating text and checking an answer. An agent rollout can involve code execution, tools, files, long waits, and interrupted work. The training system must coordinate CPU, GPU, storage, and tasks with uneven durations.

The [Flash report](https://arxiv.org/abs/2601.02780) describes corresponding work on scheduling, prefix caching, tool execution, and consistency between rollout and training. Each affects how much useful experience the team can collect with its available compute.

## IV. Coordinating language, perception, and speech

### Different models can play different roles

Luo describes Pro, Omni, and TTS working within an agent framework. A language model can plan much of a task, another model can interpret an image or recording when needed, and a speech model can produce the spoken response. The choice of model at each step affects the task's speed, cost, and accuracy.

Xiaomi's [MiMo-V2-Omni announcement](https://mimo.mi.com/docs/en-US/news/previous-news/v2-omni-release) describes text, image, audio, and video understanding, including joint audio-video input and interaction with digital environments. [MiMo-V2-TTS](https://mimo.mi.com/docs/en-US/news/previous-news/v2-tts-release) generates speech with natural-language control over delivery and expression.

OpenClaw helped her see how these previously separate projects could contribute to one task. A model did not have to supply every capability itself if the framework could call another model at the appropriate moment.

In the interview, she describes the immediate advantage of composing their own family over combining other capable models as small. Closer coordination was an opportunity she wanted to develop further.

The framework can itself limit a modality. A system may receive a video but reduce it to isolated images or textual summaries, losing relationships across sound, movement, and time. Stronger multimodal models can encourage a better interface, while a better interface gives those models a task in which their additional information is useful.

### Reconsidering a unified architecture

Luo initially favored discrete audio tokens partly because they could allow shared modeling and reinforcement-learning methods across modalities. Turning a continuous signal into a sequence of tokens could reduce the number of different training and inference systems the team needed to build.

The representation still had to preserve the information that mattered. Their audio work encouraged her, but she remained willing to use a different approach for images. In discussing Omni's visual pathway, she says the representation remained continuous; the changes focused on making the architecture more efficient.

> “But we are not building this architecture for the sake of unification itself.”

Coding agents then changed the cost calculation. Rewriting parts of the training infrastructure took less work than she had expected. If a better model needed a different implementation, the team could build it more readily. There was less reason to compromise the model merely to keep the software uniform.

This was one of the clearest changes of mind in the interview. By making implementation cheaper, AI changed which model designs she was willing to consider.

In speech generation, simple post-training labels such as happy, sad, faster, or slower appeared to support much richer natural-language descriptions of delivery. Luo found that generalization striking, but had not established how a comparable smaller model would perform. She also said the TTS model was still unstable. At that stage, the free release let people experiment while the team worked on making its behavior more dependable.

### More senses do not settle the AGI question

Luo felt that the smaller multimodal model sometimes showed richer world knowledge and greater sensitivity to detail than larger language models. She was less certain how to measure this or whether it reflected a general increase in intelligence. She leaves open whether broader perception is necessary for general intelligence.

Generation combined with perception might offer further opportunities, but she presents that as a question. The immediate reason to develop multimodal capability is practical: an agent working in varied environments needs access to information that is not always textual.

When the host returns to a triangle diagram of biological and machine intelligence, he places language near the top of the biological path and describes language-heavy AI as an inverted triangle. Luo questions whether machines must retrace biology's sequence. Organisms evolved under survival pressure; models begin with human knowledge, compute, and people deliberately helping them improve.

Extending agents into physical environments also introduces batteries, mechanisms, dexterity, and other constraints that do not improve on the same schedule as software.

## V. The organization is a learning environment too

### Making useful experiments visible to one another

Luo did not want her reaction to OpenClaw to remain a private discovery. She describes setting up machines and shared groups so that colleagues could try it without each spending hours on deployment. The shared setting mattered: someone else's successful attempt suggested a task another person would not have thought to ask for.

> “I think our imaginations multiply one another.”

The groups filled with examples of what the agent could do. People also changed the framework together, testing it against their own tasks. Luo found that these shared attempts suggested improvements more quickly than working on it alone.

She recounts telling colleagues to use the tool extensively or leave, then explains that she did not intend to enforce a dismissal rule or assess message counts. She wanted them to take the change seriously. The part I would take into my own work is the preparation: removing installation friction and giving people a place to discover useful tasks together.

### Strong foundations, room to move

Luo describes hiring many people who had not trained a frontier-scale model before. She looks for strong technical foundations, curiosity, and motivation, then tries to create conditions in which they can learn from demanding work and from one another.

She gives a concrete example of someone suited to agent post-training: a person who uses models frequently, keeps a private collection of test tasks, and notices exactly where a new model improves or fails. That familiarity can produce a research question. Does the failure require better data, a different environment, or a change in training?

Her emphasis on learning does not make prior experience irrelevant. She specifically recognizes its value in infrastructure and operations. The aim is to give capable people room to develop expertise rather than require every skill at hiring time.

She describes loose boundaries between pretraining, post-training, data, and other areas. Data judgment can transfer between stages. People may follow an interesting problem rather than remain permanently assigned to the category under which they joined. A person can drive a project without having absolute authority over everyone contributing to it. Giving researchers every intermediate answer may help them reproduce a result while weakening their ability to originate the next idea.

> “I think equal footing has value in itself: it lets everyone contribute their creativity and intelligence on equal terms.”

Coordination still comes from shared questions, technical standards, and people making their work understandable to one another. Luo describes her role as helping people recognize a worthwhile direction and giving them room to pursue it.

> “Senior leaders, especially, should not feel a strong need for control or believe that nothing can work without them.”

She also values different backgrounds because a homogeneous group can dismiss an unfamiliar observation as noise. Someone with another perspective may recognize it as a useful research signal.

She treats adequate compensation as a baseline. Meaning and autonomy matter as well: they affect whether someone wants to keep investigating when there is no clear answer yet.

### Training stability and recovery from failures

The team did not keep every training run going in the name of speed. Luo describes stopping even after a loss spike—a sudden increase in training error—had subsided. A recovered curve did not establish that everything inside the model was still working properly.

They examined activations, parameter values, and the routing of tokens to experts. Finding a cause could require people who understood the model, numerical behavior, distributed software, and hardware to work through the same problem.

Some investigations lasted days or longer. The absence of a fixed launch deadline made those pauses possible, but did not make them comfortable. Compute was limited, and Luo describes the discouragement of wondering whether another experiment had taught them anything.

Agent reinforcement-learning infrastructure also has to cope with failures outside the model. A tool may time out, or a long interaction may stop for a reason the system cannot immediately identify. The training process needs ways to continue useful work despite irregular execution.

Luo extends this argument to differences in model behavior when training and rollout inference run on different systems. She describes agent RL as requiring compromises between algorithmic requirements and engineering constraints. Teams have to manage those discrepancies, interruptions, and resource scheduling while checking their effects on training.

A large team may have more resources for parallel exploration, while a compact group can sometimes investigate a difficult failure more quickly. Luo values close collaboration between people who understand different parts of the system.

## VI. Research ambitions and open questions

### Parallel agents and a higher capability ceiling

Luo is enthusiastic about collaboration but cautious about claims made for multi-agent systems. She sees reasons to divide work: separate contexts can improve focus, tasks can proceed in parallel, and a coordinator can use different capabilities where they are needed.

Yet she says she had not seen convincing evidence that existing arrangements reliably enabled the system to solve harder tasks. Speed, cost, and capability are different quantities. Finishing work sooner can be valuable even if the system cannot solve a harder class of problem. Adding agents can also introduce communication, coordination, and duplicated-work costs.

Her experience of people jointly improving a framework answers a different question from whether autonomous agents can do the same. The evaluation also needs to account for the time and compute their coordination consumes.

### Research assistance and research that improves AI

Luo describes being surprised by how much a strong model could do after receiving the relevant research context. Work she once regarded as too creative to formalize began to look partly reproducible through skills and workflows.

> “I used to think our work was creative enough that it could not be turned into skills and workflows, but now I find that it can.”

Her ambition goes beyond writing experimental code. A research agent would have to understand a question, use an experimental platform, work within resource limits, evaluate results, and decide what to investigate next. If it could help produce a stronger model, that model might then improve the tools used in the next research cycle.

She predicts that AI will be able to produce stronger intelligence within one or two years. That is her forecast in the interview, not an established timetable for AGI. The examples she gives show research assistance and changes to workflow; autonomous research that reliably produces better models remains a more demanding claim.

A research agent can generate more experiments without choosing a better direction. It can also improve a metric while missing a flaw in the experiment. I would want to know which decisions remain with the researchers and how a proposed model improvement is independently checked.

Luo repeatedly revises her expectations as she uses new tools. That makes her predictions worth following as research judgments, while leaving them open to evidence from the next set of experiments.

### Openness, privacy, and useful scale

Open source lets users inspect a framework, change an unsuitable assumption, contribute skills, and adapt it to another model or environment. Luo's own modifications to OpenClaw show why she values that access. It turns a user who finds a limitation into someone who can help address it.

She also reasons backward from deployment: widely used intelligence would run on chips owned by many organizations. Open models give those participants something around which they can adapt their hardware and software. In her view, openness can accelerate progress through several parts of that distributed system.

One ownership detail in the interview needs clarification. Peter Steinberger's [February 2026 announcement](https://steipete.me/posts/2026/openclaw) described his joining OpenAI and OpenClaw moving to a foundation. It did not announce a sale of the project. Luo's relevant point is that people could continue inspecting and improving the open framework.

She imagines smaller local models handling suitable privacy-sensitive tasks, with more demanding, nonprivate work sent to the cloud. This was an early design direction in the interview. Local model execution alone does not establish the privacy of the whole system: its tools and routing still determine where information travels.

For me, that raises a question about assistants that retain more daily context. Knowing meetings, messages, and preferences could save repeated explanation. It also makes the rules about retention, access, and authorization more consequential.

Luo also asks how an agent can use a company's existing resources: operating systems, hardware, distribution, and communication channels. Improving the model and framework is one task; connecting them effectively to those resources is another. A company may need to change how it organizes work to benefit from the combination.

Luo distinguishes expanding the frontier of difficult work from making AI broadly useful. The latter requires cost, speed, perception, and interaction that fit ordinary circumstances. A task completed once at an extravagant cost may reveal capability without yet providing a service people can use routinely.

> “I think the AI revolution is fundamentally about productivity, which means paying close attention to end-to-end task completion and cost efficiency.”

### What faster research is for

Luo recalls having a relatively clear target in quantitative research: predicting prices. In model research, the objective is less stable. She returns to whether her work makes difficult tasks easier and gives people time to do something they value. A better score does not settle that question on its own.

She had considered a nonprofit that would support basic research with compute and infrastructure. The idea was unfinished, but it made her answer concrete. Even if AI takes over much of her current work, she can imagine other research worth helping people undertake.

That interest connects this conversation with the earlier notes in this series. [Ming Zeng]({% post_url 2026-09-04-when-intelligence-becomes-infrastructure %}) asks how organizations create the conditions for strategic insight. [Liyiming Ke]({% post_url 2026-09-04-how-robots-learn-to-get-better %}) emphasizes environments and feedback through which agents improve. [Heng Liao]({% post_url 2026-09-09-building-the-systems-behind-ai %}) shows how decisions cross the boundaries between workloads, software, and physical infrastructure.

I would now ask more of a research tool than whether it gives me a good answer. Can I supply the context it is missing? Can I change how it works? Does the next attempt benefit from the last one? Luo's examples make those questions practical: saved instructions, a revised framework, a better test, and a training run paused long enough to understand a failure.

Faster implementation matters most when what was learned carries into the next experiment. That is the part of this conversation I want to keep using.
