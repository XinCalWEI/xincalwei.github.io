---
layout: post
title: "How Robots Learn to Get Better: Notes from Liyiming Ke"
date: 2026-09-04 23:20:00
description: My reflections on Liyiming Ke's discussion of experience-driven robot learning, generalization, evaluation, embodiment, and the human questions raised by increasingly capable AI.
tags:
  - "Notes from AI Podcasts & Talks"
categories: perspectives
thumbnail: assets/img/blog/liyiming-ke-robot-learning-notes.png
thumbnail_fit: wide
related_posts: false
toc:
  sidebar: right
  breakpoint: lg
---

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/blog/liyiming-ke-robot-learning-notes.png" class="img-fluid rounded z-depth-1" zoomable=true alt="A visual synthesis of Liyiming Ke's discussion of robot learning, generalization, performance, embodiment, industry, and human life" %}
  </div>
</div>
<div class="caption">
  My synthesis of the conversation: from experience-driven robot learning and embodied intelligence to productivity, agency, and human choice. The English wording in this illustration is a paraphrase, not a verbatim quotation.
</div>

Most robot demonstrations invite a simple question: **Can the machine complete the task?** This conversation made me replace it with a harder one: **Can the machine become better after doing it—and can that improvement survive outside the carefully arranged scene in which we first saw it?**

[Liyiming Ke](https://kayke.xyz/) works at [Physical Intelligence (PI)](https://www.pi.website/) on machine learning for robot manipulation. During her PhD at the University of Washington, she built a robot that manipulates objects with chopsticks, using deliberately constrained hardware to study data-driven fine motor skills. Her path—from economics to machine learning, real-world robotics, reinforcement learning, and science-fiction writing—gave the conversation an unusual range. It moved easily between action representations and hardware reliability, then out toward productivity, social dependence, and the question of what people may choose to do when machines can do much more.

The original long-form Chinese interview is available on [Bilibili](https://www.bilibili.com/video/BV12bNB6vEtt/).

> **A note on this post:** These are my English-language notes and synthesis, not a transcript. I have reorganized the conversation around the ideas that stayed with me; translations, emphasis, and interpretation are my own. I cross-checked technical details against public materials from Ke and Physical Intelligence where possible. Speculative ideas in the later sections should not be read as PI's product roadmap.

## A research question deeper than any algorithm

Ke's long-running research question is more durable than the name of any method: **How can an agent improve through experience?**

Imitation learning offers a compelling starting point. A person demonstrates a behavior, and the robot learns to reproduce it. But the approach also raises an obvious limit: if the robot only imitates what it has been shown, where does improvement beyond the demonstration come from? How does it learn to correct the states that the demonstrator never entered, discover a better strategy, or turn a fragile motion into a reliable skill?

That question drew Ke from imitation learning toward reinforcement learning. What interested her was not simply reward maximization as a mathematical label. It was the combination of practice, exploration, credit assignment, and objective design:

- **Practice:** some motor skills become reliable only through repeated execution;
- **exploration:** the system must try variations if it is to discover a better strategy;
- **credit assignment:** a failure near the end may have been caused by a poor grasp much earlier;
- **the objective:** a system can optimize a specified objective effectively while still missing what we actually meant.

The chopsticks robot makes this research philosophy concrete. Chopsticks provide few contact points and little mechanical help, so they form a demanding test of control and precision. Ke found that a person using teleoperation could still make the hardware perform difficult manipulations. That served as an existence proof: the hardware configuration did not make the task physically impossible. It did **not** prove that an algorithm would learn the behavior or generalize it, but it changed the research question. The challenge became whether a learned policy could acquire a sufficiently effective strategy—and then refine it through practice.

## Two philosophies of robotics

The conversation describes a productive tension between traditional robotics and learning-based robotics.

The traditional pipeline often separates perception, planning, and control. Experts model the system, reason about geometry and dynamics, design intermediate representations, and build in guarantees where possible. Learning-based robotics asks whether more of that structure can be absorbed through data and optimization: define the goal, provide examples and experience, and let the system discover parts of the solution.

I would not frame this history as an old school being replaced by a new one. Traditional roboticists raised a criticism that remains completely valid: a robot that can do many things unreliably may be less useful than a conventional system that performs one task quickly and almost without failure. A highly structured factory can reward engineered precision more than broad but shallow generality.

The more interesting promise of machine learning is therefore not simply a longer list of demonstrations. It is a different **cost curve**. If every new task requires another large group of specialists to model, tune, and integrate the system, capability scales roughly with human engineering effort. A more general learning system would make it possible to add tasks, objects, environments, or robot platforms without a proportional increase in expert labor.

This also clarifies what it means to “remove the expert.” Expertise does not disappear from research. It is embedded in the data, hardware, objectives, model, evaluation, and system design. The goal is to remove the requirement that every eventual user become a robotics expert before asking a robot to do something useful.

## Capability is only the first rung

I found it useful to organize the model sequence emphasized in the interview around three questions. This is my summary rather than an official PI taxonomy.

| Stage              | Central question                                                             | Why it matters                                                                                 |
| ------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Capability**     | Can the robot perform a task that was previously out of reach?               | It reveals whether a new class of behavior has become technically possible.                    |
| **Generalization** | Can the policy work with unfamiliar objects, environments, and embodiments?  | It determines whether every deployment must begin with another large data-collection campaign. |
| **Performance**    | Can the robot work quickly, reliably, repeatedly, and recover from mistakes? | It separates an impressive demonstration from a practically useful system.                     |

[π₀](https://www.pi.website/blog/pi0) addressed capability at the level of a generalist vision-language-action policy trained across many tasks and robot platforms. [π₀.₅](https://www.pi.website/blog/pi05) shifted attention toward open-world generalization, including long-horizon household tasks in homes absent from the training set. The key question was no longer only whether the model had seen a skill, but whether it could combine physical behavior with enough visual and semantic understanding to use that skill appropriately in a new place.

Generalization is where vague claims about scaling need to become precise. “More data helps” is not yet a scaling law. A meaningful robotics question asks what kind of diversity is being added and how much it improves performance under a specified shift: another home, another object distribution, another embodiment, or another task family. Reported improvements with greater environmental diversity are encouraging, but they do not prove that all relevant variation has been captured or that data can simply be scaled without limit.

[π\*₀.₆](https://www.pi.website/blog/pistar06) then foregrounded performance through RECAP, combining demonstrations, expert corrections, autonomous rollouts, reward feedback, and reinforcement learning. It is important to distinguish the underlying `π₀.₆` VLA from the experience-trained `π*₀.₆` variant. The published results evaluate whether on-robot experience can improve success rate and throughput—successful task completions per hour—on specific real-world tasks.

This is not a complete chronology of PI's models. The conversation and these notes emphasize π₀, π₀.₅, and π\*₀.₆; PI's broader public research also includes [π₀.₇](https://www.pi.website/blog/pi07). I find the earlier sequence valuable because it exposes three different research bottlenecks rather than treating each model release as a single number that went up.

Capability makes a compelling video. Generalization and performance determine whether the capability can leave the video.

## Failure belongs in the learning loop

Human demonstrations usually show the robot what correct behavior looks like. They rarely cover the peculiar states created by the robot's own mistakes: a gripper approaches at the wrong angle, an object slips into an unusual pose, or an early error compounds until a later action fails.

Once robots learn from their own behavior, failure changes status. It is no longer only an error to remove from the dataset. It becomes a state that the system must learn to recognize and exit. But failed trajectories are not automatically useful. They need a learning signal—such as a reward, a correction, an intervention, or information about which action improved or worsened the eventual outcome.

The resulting loop is simple to write and hard to make work:

**policy → execution → success, failure, or recovery → labeled experience → updated policy → new execution**

This loop addresses a structural mismatch in imitation learning. The training data comes from a person's behavior, but deployment produces states from the policy's behavior. Collecting experience under the current policy brings the training distribution closer to the situations the system actually creates.

The most useful definition of robustness here is not “never makes a mistake.” A robust system notices that the world has departed from its expected path, recovers, and continues. Recovery is part of the intelligence, not a cosmetic feature added after the main policy works.

It also changes the role of deployment. Deployment is usually drawn as the last box in a product roadmap. For an experience-driven robot, it can become part of the training system: real use can produce new states, corrections, outcomes, and failure modes that feed the next learning cycle. The product endpoint becomes a potential data source.

## Robotics has an evaluation problem

The difficulty of evaluation was one of the most important parts of the interview.

For a language model, many systems can be evaluated against the same dataset. Physical tasks resist that standardization. Consider the instruction “pick up the cup.” Performance may change with the cup's material, weight, orientation, contents, location, surrounding clutter, table height, lighting, camera placement, robot platform, and initial joint configuration. A reported success rate means little without the distribution over which it was measured.

Even “success” is underspecified. Did the robot eventually finish? How long did it take? Did it spill anything? Was the motion stable? Could it repeat the task for hours? Throughput is useful because it couples speed with successful completion, but it still does not capture every dimension of quality or safety.

This helps explain why robotics does not yet have one universally meaningful leaderboard. Teams use different embodiments, environments, perturbations, tasks, and success criteria. Evaluation is not administrative work that begins after the research; it is part of the research.

A home is a revealing stress test, though not necessarily the first or only commercial destination. It combines unfamiliar layouts, rigid and deformable objects, ambiguous natural-language instructions, people moving nearby, long-term hardware reliability, cost, safety, and tasks that can last much longer than a laboratory clip. Controlled factories and warehouses may support useful deployment earlier precisely because the environment can be structured around current capabilities.

This is why I now ask more questions when I see a polished robot demo:

- Was the test scene represented in the training data?
- What changes when the object, lighting, or starting state moves?
- How often can the behavior be repeated?
- How quickly does it finish?
- What happens after the first mistake?
- Can the hardware sustain the behavior outside a short recording?

The demo answers whether something happened once. Evaluation asks what capability actually produced it.

## Progress is not just a larger model

Once evaluation is treated as part of the research, a second lesson follows: progress cannot be reduced to building a larger model.

Data quality depends on more than the number of trajectories. It includes the value and diversity of the task, the quality of the action, coverage of meaningful states, and how much learnable information is represented. A slow, hesitant grasp and a direct, skilled grasp may both receive the label “success,” yet they teach very different behavior. Foundation models do not make annotation, representation, or curation disappear.

The same pragmatism applies to simulation. Simulation is valuable when it captures the interaction that matters or helps a policy learn how to explore efficiently. But contact-rich manipulation can depend on friction, deformation, folds, compliance, and other properties that are difficult to reproduce faithfully. Generating more simulated data does not help automatically if the simulator omits the physics that determines the task. Real-world data remains especially important where those gaps dominate.

[FAST](https://www.pi.website/research/fast)—Frequency-space Action Sequence Tokenization—illustrates another lever: how actions are represented. It applies a discrete cosine transform and then byte-pair encoding to turn continuous action sequences into tokens that are more suitable for autoregressive models. The point is broader than one tokenizer. Progress can come from the representation connecting a large model to physical action, not only from increasing parameter count.

[Hi Robot](https://www.pi.website/research/hirobot) addresses a different gap. A long, abstract instruction cannot always be mapped reliably into minutes of joint commands in one step. A hierarchical system can use a high-level component to interpret and decompose the request, while a lower-level vision-language-action policy executes the subtasks. Reasoning and action remain connected, but they operate at different temporal and semantic scales.

FAST and Hi Robot stayed with me because they show why “just scale the model” is too thin an account of progress. The bottleneck may sit in the data, the action representation, the hierarchy between language and motion, the reward, the hardware, or the evaluation itself. Generalization and specialization can also reinforce each other: a stronger general model improves the starting point for a specific task, while pushing one task toward reliability exposes weaknesses in the underlying representation.

## One intelligence, many bodies

The humanoid argument is easy to understand: homes, tools, stairs, shelves, and workplaces were designed around the human body. A robot with a similar form may be able to enter that environment without requiring it to be rebuilt.

Ke is more interested in the intelligence than in defending one body plan. The reverse historical analogy is equally useful: cars are not shaped like people, so people built roads and cities around them. If a non-humanoid robot becomes useful enough, environments may adapt to the machine rather than the machine copying the human form exactly.

This leads to a deeper definition of generality. A general robot “brain” need not mean a brain for one humanoid body. Humans use the same nervous system to walk, drive, handle chopsticks, and control tools that extend the body. Similarly, cross-embodiment learning asks whether one intelligence can transfer across arms, mobile manipulators, grippers, and other physical configurations.

A simple body performing a complex task can sometimes make the contribution of intelligence especially clear. The chopsticks robot makes the same point from the opposite direction: when deliberately constrained hardware completes precise manipulation, it becomes easier to see what the learned policy contributes.

Ke's speculation goes further: reconfigurable bodies, interchangeable tools and limbs, and perhaps machines that can assemble other machines. I read this as a thought experiment rather than a product forecast. Its value is that it breaks the biological assumption that an intelligent system must inhabit one permanent body.

Embodiment also reminds us that language is not the world. The word “cup” does not contain its weight, temperature, friction, fragility, liquid content, or graspable surfaces. Physical intelligence must be grounded through sensory observations, action, and environmental feedback—for example, vision, proprioception, and potentially touch. It is inherently multimodal because the world is.

## Hardware and deployment are part of the intelligence

Talk of a general robot brain can make hardware sound solved. It is not.

A five-minute demonstration and a machine that works for hours every day are different engineering objects. Motors wear, calibration drifts, objects collide, grippers fail, floors get scratched, and safety matters more when a large machine shares space with people. Size itself creates a trade-off: a larger robot may reach and lift more, while a smaller one may be safer, cheaper, and less intimidating.

The useful framing is not that hardware should be optimized for software, or vice versa. Both should be optimized for task performance. End effectors, sensing, mechanics, data collection, policy design, and recovery behavior form one system.

External partnerships are therefore more than a route to market. Different companies bring different hardware and deployment environments; applying a shared model across them provides evidence about how well cross-embodiment and cross-scenario generalization holds. The industry structure is still open. Some companies may provide a reusable intelligence layer while others build hardware and vertical products. Others may remain vertically integrated. No arrangement has yet proved to be the single stable answer.

The tension between research and commercialization is equally real. Customer deployments expose the states that matter and can produce valuable experience. But extensive one-off integration can also consume the people who would otherwise work on the general learning problem. The balance is not “research or product.” It is whether deployment strengthens the learning loop or turns every new customer into a separate engineering project.

## The frontier needs a different kind of organization

A learning system this broad has an organizational consequence: no single discipline owns it. Modern robot learning brings together traditional robotics, machine learning, vision, language, control, data systems, hardware, manufacturing, evaluation, and deployment. Ke's doctoral training in a traditional robotics environment helped her avoid treating success in simulation or on a benchmark as a substitute for making the whole physical system work.

Large generalist models also change the organizational scale of the research. A project may depend on persistent hardware fleets, long-lived software infrastructure, heterogeneous datasets, compute, and groups of people whose work must remain compatible over years. Academic laboratories remain essential sources of ideas and talent, but students arrive and graduate. As Ke explains, sustaining one integrated system through those cycles can introduce continuity costs that are less significant for smaller, self-contained projects.

That helps explain the appeal of a research-focused startup: a cross-disciplinary team can keep improving a shared system without rebuilding its infrastructure around every paper. Ke describes research directions forming through conversations among people who recognize that a problem matters, rather than only through a centralized task list. Reading groups also become a mechanism for rapidly spreading new methods—including how colleagues use coding agents in their own workflows.

AI agents expand execution capacity, but Ke is careful about the distinction between executing more work and doing better research. Running many agents is easy. Choosing where to aim them remains difficult. As execution becomes cheaper, problem selection, judgment, interpretation, and the ability to change direction become more—not less—important.

## When greater capability changes human dependence

The interview eventually leaves robotics, but not its central question.

Ke reflects on how coding agents can reduce everyday functional dependence between colleagues. A question that once required finding the person responsible for a module may now be answered first by an agent. This can increase individual autonomy and team capacity, even while frontier robot research itself demands deeper cross-disciplinary collaboration.

The point is not that social connection disappears. It is that some relationships may become less compulsory. People may gain more choice over when, why, and with whom they collaborate. The same logic could extend beyond software if general AI and robots make a wider range of practical skills accessible to an individual.

That expanded capability could change more than workplace efficiency. A person might create a game, film, research tool, or physical environment that currently requires a large organization. Tasks that are economically impossible because they demand many kinds of specialized labor could become feasible. The meaningful outcome would not simply be higher output. It would be a larger space of lives and projects that ordinary people can choose.

There is a tension here that I found particularly honest. Ke's research is driven by optimization: make the robot faster, more reliable, and more capable. Her interest in fiction and social theory keeps asking why faster is necessarily better, which preferences are really our own, and what should remain outside the logic of productivity.

Her analogy from algorithms captures the tension neatly: a greedy choice that looks optimal at every step need not produce the global optimum. A nonlinear path—from economics to AI, from imitation to reinforcement learning, or from an expected academic career toward a research startup—may look inefficient locally while becoming coherent in retrospect.

## The objective function is still ours

Robot learning once asked how experts should tell a machine what to do. The emerging question is how to build a machine that improves through experience and carries that ability into a new body or environment. Solving more of this problem would expand what a person or organization can accomplish, but it would not tell us which possibilities deserve pursuit.

That is why Ke's combination of robotics and science fiction makes sense to me. Robotics expands the possibility space; fiction asks how people might live inside it. If AI and robotics continue expanding what one person is able to do, the harder constraint may no longer be capability. It may be our ability to decide what is worth doing.

**The machine can optimize an objective. Capability alone cannot tell us which objectives are worth choosing.**
