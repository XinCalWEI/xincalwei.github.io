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
  From experience-driven robot learning and embodied intelligence to productivity, agency, and human choice.
</div>

Most robot demonstrations invite a simple question: **Can the machine complete the task?** This conversation made me replace it with a harder one: **Can the machine become better after doing it—and can that improvement survive outside the carefully arranged scene in which we first saw it?**

[Liyiming Ke](https://kayke.xyz/) works at [Physical Intelligence (PI)](https://www.pi.website/) on machine learning for robot manipulation. During her PhD at the University of Washington, she built a robot that uses chopsticks for precise manipulation. Her route into robotics was unconventional: economics led her toward machine learning, theory led to real systems, imitation learning led to reinforcement learning, and an interest in fiction kept the human consequences of technical progress in view.

The same tension runs throughout the conversation: optimization can make a system more capable, but it cannot determine what is worth optimizing.

The original long-form Chinese interview is available on [Bilibili](https://www.bilibili.com/video/BV12bNB6vEtt/).

> **A note on this post:** These are my English-language notes and synthesis, not a transcript. I reorganized the conversation around its central arguments and cross-checked technical details against public materials from Ke and Physical Intelligence. The quoted passages are translated renderings from the Chinese conversation; a few have been condensed or lightly paraphrased for clarity. Speculative ideas in the later sections should not be read as PI's product roadmap.

## Part I — From imitation to experience

### The question behind the career

Ke does not define her research by loyalty to a particular algorithm. Reinforcement learning is one current approach; the more durable question is how experience changes an agent.

> “The deeper question is how an agent becomes better through experience.”

She entered university interested in questions about people and society, studied economics, and encountered optimization and game theory before moving more deeply into machine learning. A mathematical objective could be translated into an algorithm, code, and an observable result. Yet purely theoretical work eventually felt incomplete. She wanted to know what happened when an algorithm had to act through a real mechanism, under friction, delay, imperfect sensing, and hardware it could not simply assume away.

At the University of Washington, she learned robotics from the full stack rather than treating the robot as a clean output device for a model: mechanics, calibration, sensing, teleoperation, control, and the software connecting them. Claims made in simulation met a blunt standard—does the system actually work on a physical robot, and how well? That training sharpened her commitment to learning-based methods while making her less satisfied with algorithms that worked only in an abstract setting.

Her fiction writing adds a second lens. Robotics and fiction both begin with an imagined possibility, but the distance between an idea and a finished object is where most of the work lives.

### Two traditions, one standard of usefulness

A traditional pipeline often separates perception, planning, and control. Experts build models of the robot and its environment, reason about geometry and dynamics, select intermediate representations, and design components whose behavior can be analyzed. When the operating conditions are controlled and the task is fixed, this approach can produce exceptional speed, precision, and reliability. Industrial automation is the clearest example: a conventional system that performs one operation almost perfectly may be far more useful than a general model that performs many operations inconsistently.

Learning-based robotics places knowledge differently. Instead of specifying every intermediate rule, researchers provide tasks, demonstrations, observations, actions, and feedback, then ask the system to learn more of the mapping from perception to behavior. This does not make expertise disappear. Expertise is still present in the hardware, data collection, model architecture, objective, safety constraints, and evaluation. The goal is to avoid requiring a robotics expert to redesign the entire pipeline each time an ordinary user asks for a new behavior.

The two approaches therefore imply different scaling curves. Traditional methods often have a clear relationship between engineering input and task performance, but much of that investment must be repeated for the next task. A general learning system may demand much more data and infrastructure at the beginning, yet its promise is lower marginal effort: a new object, environment, robot, or task should not always require starting from zero.

> “If the endpoint of machine learning is a robot that can do everything but does nothing well, that is clearly not enough.”

Breadth is not a substitute for performance. The long-term goal is to combine broad prior knowledge with the ability to become genuinely good at the task in front of it.

### Why chopsticks?

The chopsticks robot turns this methodological debate into a physical experiment.

Chopsticks are mechanically simple, but they are unforgiving. Their small, curved, slippery tips offer little passive support, and a tiny positioning error can determine whether a small object is held or dropped. That makes them a valuable research platform: they shift much of the burden from specialized hardware to the control policy. If a learned policy can achieve precise manipulation through such a constrained tool, it becomes easier to see what the intelligence contributes.

Before claiming that learning would generalize from task A to tasks B, C, and D, Ke wanted to make task A work with real precision. She pushed a single difficult task far enough that performance itself became the research problem.

She assembled an inexpensive six-degree-of-freedom arm from available components and equipped it with chopsticks. The hardware was far from ideal: calibration and joint inaccuracies could accumulate at the end effector, at a scale comparable to the small objects it needed to grasp. But teleoperation supplied an important existence proof. If a person could remotely guide the imperfect mechanism to complete the task, then the hardware did not make success physically impossible. That did not prove a policy could learn the skill. It isolated the next question: could data and learning recover an effective strategy despite the hardware's imperfections?

The first stage relied on human demonstrations and model-free imitation learning. In [Grasping with Chopsticks](https://personalrobotics.cs.washington.edu/publications/ke2021grasping.pdf), Ke and her collaborators addressed covariate shift—the tendency of small prediction errors to push a learned policy into states absent from its demonstrations. They increased data support around the object and created synthetic corrective labels for nearby deviations. On the physical system, these methods raised average grasp success from 37.3% to 80%, close to the reported human teleoperator result of 82.6%.

The result was strong, but it exposed the ceiling of imitation. Producing especially clean demonstrations required substantial human attention, and the policy was still learning to reproduce the behavior it had been given. A demonstrator can show a successful trajectory, but does not naturally demonstrate every state that the robot's own errors will create. Nor does copying explain how the policy should move beyond the demonstrator's speed or reactivity.

> “As I went deeper into imitation learning, I became dissatisfied. If all you ever do is copy someone else, you cannot truly break through. Reinforcement learning puts more emphasis on exploration—on moving beyond prior performance and raising the ceiling.”

This led to [CherryBot](https://goodcherrybot.github.io/), which used simulation pretraining followed by real-world reinforcement learning for dynamic fine manipulation. The robot learned from its own interaction, practiced reactive retries, and adapted to disturbances that were difficult to encode in a precise physical model. The project reported continual improvement from 30 minutes of real-world interaction and demonstrated grasping small swinging objects as well as generalization to different objects and disturbances.

The sequence matters more than any single result. Teleoperation established physical feasibility. Imitation learning transferred a human strategy and revealed covariate shift. Real-world reinforcement learning let the robot practice in the states created by its own behavior. What began as “Can this machine use chopsticks?” became a much deeper question: **What complete learning process allows a physical agent to exceed the ceiling of its demonstrations?**

## Part II — The anatomy of improvement

### Reinforcement learning is more than repetition

“Trial and error” compresses several different learning problems.

**Practice.** Some physical skills improve only through repeated execution. A policy must adapt a strategy to the body it actually controls—the delays, compliance, sensing, and inaccuracies of that particular system. In this sense, repeated robot interaction plays a role similar to athletic practice: it turns an approximate movement into a behavior that is faster, more precise, and more repeatable.

**Exploration.** Repetition alone can rehearse the same limitation. Improvement requires trying something not already contained in the current behavior. Exploration may be microscopic—a slight change in an arm trajectory—or much larger, such as testing another controller, representation, or research direction. The hard question is not whether to vary the behavior, but how to choose variations that are likely to teach the system something useful. Exploration that is too timid cannot escape the current policy; exploration that is too unconstrained wastes interaction and may be unsafe.

**Credit assignment.** A reward arrives after a sequence of actions, but the decisive cause may have occurred much earlier. A box may collapse at the final fold because the first flap was misaligned. A cup may spill during placement because the grasp was unstable from the beginning. Learning requires identifying which earlier decision made the later outcome more or less likely. Without that attribution, additional experience can record failure without revealing what should change.

**Communicating the objective.** A reward function is not the same thing as the intention behind it. An agent may optimize a measurable proxy while exploiting a loophole that no person intended. This is the familiar problem of reward hacking, but Ke frames it as a broader communication problem. Some outcomes—whether code passes a test, for example—are relatively easy to verify. Many physical tasks are not. “Clean the table,” “handle this carefully,” or “make this look right” can depend on context, common sense, and preferences that are difficult to reduce to one scalar.

> “To me, this is not fundamentally a problem of writing a reward function. It is a problem of communicating to the agent what we want it to do; the reward function is only one way of expressing that.”

A black-box policy is not unconstrained merely because its internal process is hard to interpret. It remains bounded by its training data, action space, feedback, and objective. The difficulty is that these boundaries may encode only an incomplete version of what people meant. Useful experience must expose variation, connect outcomes to the actions that produced them, and carry a signal that says what improvement means.

### What counts as good experience?

More data is not automatically better data. Ke describes quality along several distinct dimensions.

| Dimension                  | The question it asks                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Task value**             | Does the experience concern a behavior that is meaningful or transferable?            |
| **Action quality**         | Is the trajectory direct, efficient, precise, and worth imitating?                    |
| **Coverage and diversity** | Which objects, environments, initial states, perturbations, and failures are present? |
| **Information and labels** | Can the learner recover the task, outcome, objects, corrections, and relevant state?  |

Two datasets with the same number of trajectories can therefore have very different value. A hesitant grasp and a skilled grasp may both end in success, while ten nearly identical demonstrations may add less than one trajectory that reveals a new failure mode.

Different data sources also play different roles:

- **Human demonstrations** provide intentional, often high-quality examples of how to begin the task.
- **Expert corrections and interventions** identify serious errors and show how behavior should change.
- **Autonomous rollouts** reveal the states produced by the current policy rather than by a human expert.
- **Recovery trajectories** teach the system what to do after the nominal plan has already gone wrong.
- **Rewards or outcome labels** connect behavior to success, quality, or progress.

> “Bad data can be good data—especially when it shows what happens after a mistake and how the robot corrects it.”

A failed trajectory without an outcome, correction, or useful contrast may teach very little. Its value comes from locating the failure, showing a better alternative, or demonstrating how the robot can return to a productive state. Human demonstrations tend to stay near successful trajectories; autonomous experience reaches the off-distribution states that the deployed policy actually creates. In this learning recipe, they are complementary because they answer different questions.

The learning loop can therefore be written as:

**policy → physical execution → outcome, correction, or recovery → labeled experience → policy update → new execution**

Once a robot can operate with limited supervision, real use can generate situations, outcomes, and corrections for the next training cycle.

**Real versus simulated experience.**

Ke's position on simulation is pragmatic rather than ideological: use the source that helps solve the problem. Simulation can provide inexpensive variation, allow aggressive exploration, and teach structures that transfer to the physical world. CherryBot itself used simulation pretraining before real-world fine-tuning.

But simulation is only useful to the extent that it contains the interaction governing the task. Contact-rich manipulation depends on friction, deformation, folds, compliance, perception error, and small geometric variations. A simulated shirt that does not deform like fabric, or a simulated grasp that omits the relevant friction, can generate a large dataset while leaving out the reason the real task succeeds or fails. In that case, increasing the number of simulated trajectories does not necessarily increase useful information.

Real-world interaction has the opposite trade-off. It captures the actual physics and hardware, but requires machines, operators, resets, maintenance, space, and time. Autonomous data collection reduces part of this cost by removing continuous teleoperation, yet it does not eliminate the need to define tasks, monitor safety, label outcomes, and maintain the platform.

The choice between real and simulated data depends on a concrete question: **Which source captures the variation and feedback required by this task, and how can the two sources be combined without hiding a consequential gap?**

### Capability, generalization, and performance

> “The keyword for π₀ was capability. For π₀.₅, it was generalization. For π\*₀.₆, it was performance.”

I read this as Ke's retrospective framing rather than an official PI taxonomy.

| Stage              | Central question                                                          | What must be demonstrated                                                                         |
| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Capability**     | Can the robot perform a task that was previously out of reach?            | A new class of sufficiently complex physical behavior is technically possible.                    |
| **Generalization** | Can it work with unfamiliar objects, environments, tasks, or embodiments? | The skill survives a meaningful shift rather than depending on one recreated training scene.      |
| **Performance**    | Can it work quickly, reliably, repeatedly, and recover from mistakes?     | The behavior is useful as a sustained process, not merely successful in a selected demonstration. |

[π₀](https://www.pi.website/blog/pi0) addressed capability through a generalist vision-language-action model trained on diverse tasks and robot platforms. It combines a pretrained vision-language model with an action expert and directly produces low-level motor commands. Its demonstrations included laundry folding, table bussing, grocery packing, cable routing, box assembly, and other dexterous behaviors across single-arm, dual-arm, and mobile manipulators. The contribution was not that every task was solved completely. It was evidence that broad cross-embodiment pretraining could provide a shared foundation and then be specialized to demanding downstream tasks.

[π₀.₅](https://www.pi.website/blog/pi05) moved the bottleneck from whether a task could be performed to whether it could be performed somewhere new. Household work is a useful test because two homes do not place the same objects in the same arrangement. Generalization must operate at several levels: grasping an unfamiliar plate by an appropriate part, deciding that shoes belong in a closet rather than on a bed, and sequencing multiple skills to clean a room. In its location-scaling study, the team trained variants with mobile-manipulation data from up to 104 locations; separately, π₀.₅ was evaluated on long-horizon tasks in homes excluded from training.

The scaling question must then be specific. How does performance in a held-out home change as the training set includes more locations? Does improvement come from another hour in the same kitchen, another object type, another robot, or another physical layout? The reported trend with increased location diversity was encouraging, but the model was explicitly described as far from perfect. A curve over a defined environmental shift is meaningful; “more data will solve it” is not yet an explanation.

[π\*₀.₆](https://www.pi.website/blog/pistar06) foregrounded performance through RECAP—RL with Experience and Corrections via Advantage-conditioned Policies. The notation matters. The base `π₀.₆` is a VLA trained with supervised learning; `π*₀.₆` is the RL-adapted variant. RECAP first uses offline RL and advantage conditioning during pretraining. For a downstream task, the model is fine-tuned on demonstrations and then improved through iterations of autonomous robot episodes, sparse task-outcome rewards, optional expert interventions, value estimation, and policy updates.

The evaluation considered both success rate and throughput: successful task completions per hour. On some of the hardest tasks, experience training more than doubled throughput and reduced failure rates by a factor of two or more. The project also reported uninterrupted demonstrations well beyond the scale of a short clip: making espresso drinks for 13 hours, folding 50 previously unseen laundry items in a new home, and assembling and labeling 59 boxes used for packaging in a factory. These results remain task-specific evaluations, not proof of universal robustness, but they show what becomes measurable when performance—not only capability—is the research target.

Capability makes a compelling video. Generalization determines whether the capability survives a new situation. Performance determines whether anyone can depend on it.

**Generality and specialization also reinforce one another.**

A strong general model gives each new application a better starting point. It brings visual and semantic knowledge, prior physical skills, and experience from other robots and tasks. The specialized system therefore needs less task-specific data than a policy trained from scratch.

The influence also runs in reverse. Pushing one task from “usually works” to sustained high performance exposes weaknesses that a broad benchmark can hide: an action representation may be too coarse, recovery data may be missing, the gripper may be poorly matched to the task, or the evaluation may reward completion while ignoring time. Improvements prompted by that concrete task can strengthen the underlying model and benefit related tasks.

This produces a flywheel:

**general pretraining → stronger task-specific starting point → demanding deployment and evaluation → better data, representation, and recovery → stronger general model**

A general foundation makes specialization cheaper, while serious specialization prevents the general model from becoming broad but shallow.

### Evaluation defines the frontier

The part I kept returning to was evaluation.

> “Robot evaluation is even harder: you have to run the model on the physical machine before you know what it did, and only then can you score it.”

Consider the instruction “pick up the cup.” Performance may change with the cup's material, weight, orientation, contents, location, surrounding clutter, table height, lighting, camera placement, robot platform, and initial joint configuration. A success rate says little without the distribution over which it was measured.

Even success itself is underspecified. Did the robot eventually finish? How long did it take? Was the motion stable? Did it recover after a slip? Could it repeat the task for hours without intervention? Throughput is useful because it couples time with successful completion, but reliability, perturbation robustness, safety, and hardware uptime remain separate dimensions.

Robotics has no single universally meaningful leaderboard. Teams choose different tasks, bodies, environments, perturbations, and success criteria. The frontier is multidimensional, and part of the research is deciding which dimension should be made measurable. A new evaluation can reveal a bottleneck that a new model score would otherwise conceal.

A home is a revealing composite stress test, though not necessarily the first or only commercial destination. It combines unfamiliar layouts, rigid and deformable objects, ambiguous instructions, people moving nearby, long task horizons, hardware reliability, cost, and safety. Controlled factories and warehouses may support useful deployment earlier precisely because the environment can be structured around current capabilities.

When I now watch a polished robot video, I ask four questions:

- What meaningful variation was excluded from the training data?
- How often and how quickly can the behavior be repeated?
- What happens after the first mistake?
- Can the complete system sustain the task outside a short recording?

The demonstration answers whether something happened once. Evaluation asks what capability actually produced it.

## Part III — A model is not yet a robot

### Beyond scale: representation and hierarchy

Progress cannot be reduced to parameter count. The bottleneck may sit in how actions are represented or how an abstract instruction is connected to physical execution.

[FAST](https://www.pi.website/research/fast)—Frequency-space Action Sequence Tokenization—addresses the representation problem. A dexterous robot operates at a high control frequency, so even a short behavior can become a long sequence of strongly correlated continuous actions. Naively discretizing every dimension and timestep produces long, highly redundant token sequences and performs poorly on dexterous skills.

FAST normalizes an action chunk, applies a discrete cosine transform, quantizes the coefficients, flattens them with lower-frequency components first, and then uses byte-pair encoding. PI reports that this compresses typical action chunks to 30–60 tokens—roughly ten times shorter than prior action tokenizations—and can train up to five times faster while retaining performance comparable to diffusion or flow-matching approaches. Its autoregressive inference, however, remains slower than π₀'s flow-matching decoder.

[Hi Robot](https://www.pi.website/research/hirobot) addresses hierarchy. A request such as “make me a vegetarian sandwich” cannot be mapped reliably into minutes of joint commands as if it were one atomic action. Hi Robot uses a high-level vision-language policy to interpret the scene, reason about the request, incorporate feedback, and produce short language instructions. A separate lower-level π₀ VLA policy then converts each instruction, together with images and robot state, into motor actions. The two policies share a VLM backbone but play different roles.

The two levels operate at different temporal and semantic scales. The high-level component decides what should happen next; the lower-level policy handles how that step is physically performed. This separation also lets the system respond to contextual corrections—such as being told that an object is not trash—without discarding the low-level skills it already knows.

A larger model does not automatically solve a poor action language or a missing reasoning hierarchy. The interface between a model and the physical world can itself be the research problem.

### One intelligence, many bodies

The humanoid argument is easy to understand: homes, tools, stairs, shelves, and workplaces were designed around human bodies. A robot with a similar form may enter that environment without requiring everything around it to be rebuilt.

Ke is more interested in the intelligence than in defending one body plan. The reverse historical analogy is equally useful: cars are not shaped like people, so people built roads and cities around them. If a non-humanoid robot becomes useful enough, environments may adapt to the machine rather than the machine copying the human form exactly.

> “A human can drive a car, operate an excavator, move a leg, or use a hand with the same brain. To me, that is the most fundamental meaning of a general robot brain—not simply a brain built for one humanoid body.”

Cross-embodiment learning asks whether knowledge can transfer among arms, mobile manipulators, dual-arm systems, grippers, and other physical configurations. The bodies have different action spaces and physical limits, so transfer is not automatic. But the tasks still share structure: objects persist, containers open, fabric folds, collisions matter, and actions alter future observations. A foundation model may learn parts of this structure across platforms and then adapt them to the body currently available.

Ke pushes this thought further in a deliberately speculative direction. She imagines bodies that are reconfigurable, machines that replace damaged parts, and eventually robots that can assemble or repair other robots. Once every component has been replaced, the machine begins to resemble the Ship of Theseus: is it still the same robot because its identity, memory, or role persists, even though none of its original body remains?

This is a thought experiment, not a PI roadmap. It breaks the biological assumption that one intelligence must inhabit one permanent body.

### The robot is a stack, not a model

Talk of a general robot brain can make the rest of the machine sound solved. It is not. A working robot is a coupled stack:

1. **Mechanics and actuators** determine how the body can move and how much force, speed, reach, and precision it can provide.
2. **Low-level control** translates desired positions or forces into commands the motors can execute while keeping the mechanism stable.
3. **Policies and planning** interpret the task and decide which physical actions should happen next.
4. **Sensing and feedback** reveal how the world changed, allowing every higher layer to update its decision.

A weakness at one layer changes what the others can achieve. Backlash or poor calibration makes a precise policy look inaccurate. A weak gripper forces the policy to compensate. Latency between observation and action limits reactivity. A capable model paired with an unreliable mechanism remains an unreliable robot.

Hardware and software should both be optimized for the task and the performance people need. Replaceable end effectors, sensing, compliance, control frequency, policy design, and recovery behavior are choices within the same system.

Time changes the engineering standard as well. A five-minute demonstration and a robot that works every day are different objects. Motors wear, calibration drifts, cables fatigue, grippers fail, batteries deplete, and unexpected collisions occur. Size introduces another trade-off: a larger robot may reach farther and carry more, while a smaller one may be safer, cheaper, and less intimidating around people. None of these questions can be answered by a benchmark score alone.

### Deployment as part of the research system

Deployment is valuable when it closes the learning loop. A partner may provide a different robot body, task distribution, operating environment, or performance requirement. Running a shared policy there tests cross-embodiment and cross-scenario generalization while exposing failures a laboratory would not know to construct.

Some groups may concentrate on a reusable intelligence layer; others may focus on hardware or a vertical application; still others may integrate the entire stack. The choice determines who collects the data, who can modify the robot, and whether improvements transfer beyond one customer.

Early deployment can make evaluation more realistic and generate valuable experience. But extensive one-off integration can consume the people and infrastructure needed to solve the general learning problem. Deployment helps research when it strengthens a reusable learning system rather than turning every installation into a separate engineering project.

### Why the frontier needs a long-lived organization

The technical stack has an organizational consequence. General robot learning depends on persistent hardware fleets, datasets accumulated over time, shared software, substantial compute, and people from robotics, machine learning, vision, language, control, data systems, hardware, and operations. A single result may depend on months of work that never appears in the architecture diagram.

Ke chose a research-focused startup after initially expecting to pursue a faculty career. Academic laboratories remain essential sources of ideas and talent, but students arrive, learn a system, and eventually graduate. That cycle becomes harder when one integrated physical platform must remain operational and improve over many years.

A stable team can preserve the system while allowing research directions to remain fluid. Ke describes projects forming through conversations among people who recognize that a problem matters, as well as reading groups that spread new methods quickly across the organization. The advantage is not centralization for its own sake. It is shortening the distance from an idea to an experiment, from an experiment to robot experience, and from that experience to the next model.

Coding agents can increase how much implementation one researcher can execute, but more code or more experiments do not guarantee better research. As execution becomes cheaper, choosing the question and interpreting the result matter more. Automation moves the bottleneck; it does not remove judgment.

## Part IV — Capability does not choose the purpose

### Trust, autonomy, and new forms of dependence

Ke distinguishes capability from permission and responsibility. An AI system may be able to propose a consequential action without being authorized to take it, or receive permission while remaining unable to bear responsibility for the outcome. Higher intelligence alone does not settle whether an agent should delete files, change production code, or inform a medical decision. The person who delegates the action still needs ways to inspect, constrain, or reverse it. Trust grows through demonstrated capability, bounded authority, and a clear account of who remains responsible.

At the same time, AI agents are already changing smaller forms of dependence. A developer who once had to locate the colleague responsible for a module may first ask an agent to trace the code. One person may coordinate several agents and complete work that previously required multiple handoffs. This can increase autonomy and reduce the friction of collaboration.

It does not follow that people become less social or that teams become unnecessary. Frontier robotics demonstrates the opposite: when the system becomes more ambitious, the number of disciplines that must cooperate increases. What may decline is **compulsory dependence** for routine access to knowledge or execution. People gain more choice over when collaboration is necessary and what kind of relationship it should be.

There is also a new dependence hiding inside that autonomy. If a personal agent becomes the main interface through which someone receives information, writes software, organizes work, or interprets other people, then the person may depend less on individual colleagues but more on the filter itself. An intermediary can expand access while shaping what is seen. Greater independence at one layer can create infrastructural dependence at another.

### Productivity is not the objective function of a life

If general AI and robotics make many specialized skills easier to access, one individual or a small team may be able to attempt projects that currently require a large organization. A person could build a research tool, repair a complex environment, create a game, or produce a story by directing a collection of software and physical agents. The most interesting outcome would not simply be more output per hour. It would be a larger space of projects and lives that become possible.

> “I do want our work to increase productivity, so that one person can do things that once required many people. But I believe in human creativity. I do not think we live merely to increase productivity; we live to explore the enduring questions of love and death.”

Ke's technical work is organized around optimization: improve success, throughput, robustness, precision, and dexterity. Her interest in fiction and social theory asks why those improvements matter and whether the values surrounding them are as universal as they appear. A culture that prizes efficiency can make productivity feel like a natural objective, even though it is also a social preference formed in a particular place and time.

Her analogy from algorithms captures the limit. A greedy algorithm chooses what looks best at the current step, but a sequence of locally optimal decisions need not reach the global optimum. A detour that seems inefficient may create knowledge, relationships, or possibilities that were invisible to the local objective. Her own nonlinear path—from economics to machine learning, from theory to hardware, from imitation to reinforcement learning, and from an expected academic career to a research startup—became coherent only in retrospect.

This does not require rejecting optimization. It requires distinguishing a useful metric from a complete account of value. Success rate can improve a robot; throughput can expose whether a behavior is practical; productivity can give people more time and capability. None of these measurements can decide how that time should be lived, which relationships should matter, or what kind of world greater capability ought to build.

Robotics expands the possibility space; fiction asks how people might live inside it.

**The machine can optimize an objective. Capability alone cannot tell us which objectives are worth choosing.**
