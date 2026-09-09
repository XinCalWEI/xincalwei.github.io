---
layout: post
title: "Building the Systems Behind AI: Notes from Heng Liao"
date: 2026-09-09 09:00:00-0400
description: Notes on Heng Liao's discussion of Ascend, the eighteen-level pagoda, chip architecture, memory and interconnects, open source, and the discipline of building useful systems.
tags:
  - "Notes from AI Podcasts & Talks"
categories: perspectives
thumbnail: assets/img/blog/heng-liao-chips-systems-ai-notes.png
thumbnail_fit: wide
related_posts: false
toc:
  sidebar: right
  breakpoint: lg
---

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" fetchpriority="high" path="assets/img/blog/heng-liao-chips-systems-ai-notes.png" avoid_scaling=true class="img-fluid rounded z-depth-1" zoomable=true alt="Illustrated notes on Heng Liao's interview, with an eighteen-level pagoda connecting materials, chips, software, and applications, surrounded by ideas about Ascend and engineering" %}
  </div>
</div>
<div class="caption">
  An illustrated synthesis of Liao's metaphors and assessments in the supplied excerpts. Forecasts reflect his views at the time of the interview. Click the image to enlarge it.
</div>

One sentence stayed with me throughout Heng Liao's interview:

> “My calendar says 2030, while my customers are living in 2026.”

It captures a difficulty that is easy to miss when looking at an AI chip's specification sheet. An architect commits to a design years before the customer uses it. In that interval, models change, memory becomes scarce, programming tools evolve, and the assumptions behind the product may disappear. The chip still has to arrive on time and do something useful.

[Heng Liao](https://calendar.hkust.edu.hk/zh-hant/events/ece-seminar-journey-through-computer-engineering-mathalgorithms-languages-frameworks-chips) is a Huawei Fellow and chief scientist at Huawei's 2012 Laboratories and HiSilicon, with responsibility for Da Vinci hardware and software architecture. His career spans Tsinghua, research at Princeton, PMC-Sierra, and Huawei. In the [Bilibili × WAIC AI interview](https://www.bilibili.com/video/BV1nB3u6tERu/), he moves between that personal history and the systems behind Ascend: processors, manufacturing, memory, compilers, optical links, and the people who make them work together.

I found the conversation most useful when he explained a trade-off or revisited a judgment that had proved wrong. His account connects the history of an industry with the everyday work of choosing a design, building it, and discovering what the original plan missed.

_These notes draw on two transcript excerpts, which contain transcription errors and do not cover the entire interview. English quotations are translated from identifiable Chinese passages, with minor editing for readability. Linked papers and documentation provide supplementary technical context. Personal interpretations are my own; recollections, forecasts, and assessments of competitors remain Liao's views._

## I. What a long engineering career teaches

### Computing and connectivity grew together

Liao describes semiconductor history through two intertwined lines. One is processing: personal computers, enterprise servers, and eventually AI accelerators. The other is connectivity: telephone modems, optical backbone networks, broadband access, mobile networks, and devices that keep people continuously connected. A processor becomes useful inside a wider information system; a network generates demand for the machines and services attached to it.

His own career crossed those lines. At PMC-Sierra, he worked through the enthusiasm surrounding communications infrastructure in the late 1990s and the contraction after the internet bubble. He remembers colleagues heating lunch and discussing the next round of layoffs. The technology could still be valuable while the companies financing its expansion struggled to recover their investment.

The distinction between technological adoption and business survival matters. Internet applications eventually became enormous businesses, but that did not mean every supplier that built the earlier infrastructure recovered. Liao's team looked for another market in storage, bringing him into contact with enterprise computing companies and engineers whose experience stretched back to earlier generations of machines. Working through that transition gave him a view of how customer requirements, distribution, and margins shape technical opportunity.

He then describes another shift: a server vendor serving thousands of dispersed enterprises has a different business from one supplying a few enormous cloud companies. The former needs broad distribution and local support. A hyperscaler buys in volume, concentrates equipment in large data centers, and has the expertise and bargaining power to influence the design itself. Demand can grow while the supplier's freedom and share of the value shrink.

Liao describes a long semiconductor “sunset,” making a sweeping claim about the absence of U.S. venture investment in chip startups before the AI revival. I treat this as his recollection of the investment climate, rather than an independently verified funding total. His broader argument is that success at the application layer can concentrate buying power further down the chain, making the next independent hardware business harder to build.

### The customer's calendar is not the architect's calendar

The calendar metaphor explains why listening to customers is necessary but insufficient. A current complaint is evidence about the present. A chip being defined today may have to serve a workload several years from now.

He describes a sequence of architecture decisions, detailed design, verification, fabrication, system integration, and customer qualification. Each stage consumes time. If a supplier simply implements what the dominant customer requests today, the finished product can arrive optimized for yesterday's problem. Conversely, a team can predict a future need correctly and still fail because the customer, software, or business model is not ready when the hardware arrives.

This is the tension between responsiveness and judgment. Engineers need actual workloads, failures, and customer conversations, while also asking which requirements will persist and which will change. They must earn enough technical credibility to discuss the future with researchers who are still inventing it. Liao describes these exchanges as an ongoing effort to align incomplete views, rather than a single forecast that settles the roadmap.

His early doubts about Huawei's products make the point more convincing. He recalls questioning the case for an Arm server processor when x86 supply and software were well established. Why would a customer switch without a large price or performance advantage? He also favored smaller edge AI products over a large training processor, because the domestic market for training did not yet look substantial to him.

He now regards those judgments as too narrow. The assumptions about supply, infrastructure needs, and China's model-development activity changed. A reasonable argument under one set of conditions became a poor guide to the next. He does not present his experience as an unbroken sequence of correct predictions; it had trained him to recognize failure, but could also make him discount a new opportunity too quickly.

For me, that is one of the strongest passages in the interview. Experience helps identify danger. It also needs updating when the environment that produced it changes.

### Foundries changed the assumptions behind a chip company

The manufacturing model is another example of a powerful idea built on particular conditions. [TSMC, founded in 1987](https://www.tsmc.com/english/dedicatedFoundry), pioneered the pure-play foundry model: manufacturing chips designed by customers rather than competing with those customers through its own branded chip products.

Liao's analogy is electricity. A company that needs power does not normally construct a power station. In the same way, a chip designer can use shared fabrication infrastructure whose capital cost, process development, and operating scale would be difficult to support alone. This separation helped make sophisticated design possible for many more firms.

But the arrangement assumes that the manufacturing capability remains accessible. Liao recalls the period when HiSilicon could select leading suppliers across the world, then the abrupt loss of that freedom under supply restrictions. A design optimized around the best available global process could no longer take that process for granted.

His response is to return to the assumptions underneath the architecture. Which manufacturing steps are available? Which packaging techniques are reliable? Can a problem be moved into a layer where the team has more room to work? The foundry model remains economically powerful, but an architecture has to fit the supply system that can actually deliver it.

## II. The eighteen-level pagoda

### The scarce skill is crossing floors

Liao uses an “eighteen-level pagoda” to describe the distance from physical materials to an application. In the supplied excerpts, he does not enumerate eighteen fixed layers. He places chips around the seventh floor, fabrication and packaging around the fifth and sixth, and materials and devices further below. Above the chip are programming, compilers, algorithms, models, and applications.

The following groups collect the examples he gives; they are not a numbered taxonomy.

| Region of the pagoda      | Examples in the conversation                                           | What the neighboring layers need to understand                |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| Materials and devices     | Materials, transistor structures, electrical and optical properties    | Which physical behaviors and constraints the design inherits  |
| Fabrication and packaging | Process capabilities, stacking, assembly, power delivery, heat removal | What can be manufactured and operated reliably                |
| Chips                     | Compute units, memory interfaces, interconnects                        | How available hardware resources match the workload           |
| Programming and execution | Languages, compilers, kernels, runtimes                                | How to express an algorithm and use the hardware efficiently  |
| Models and applications   | Sparsity, data formats, context management, agents, services           | Which capabilities create value and what they cost to deliver |

The point is the traffic between floors. A model developer sees memory pressure; a chip architect sees idle arithmetic units; a compiler engineer sees an opportunity to reorganize the computation. Each can be correct within a local view while missing an improvement that crosses their boundary.

> “If you don't have enough memory bandwidth, I'll find ways to save bandwidth in the algorithm. If you have compute to spare, I'll spend more compute to save bandwidth.”

That is a concrete description of co-design. It involves knowing enough about the adjacent layer to make a useful trade. Elsewhere in the conversation, Liao discusses changing data formats, choosing parallel decompositions, and balancing matrix and vector processing as related design choices.

Liao emphasizes that deep specialists are indispensable. The shortage he notices is in people who can form a productive conversation across specialties. Being able to repeat another field's vocabulary is not enough. You have to understand its constraints well enough that someone working there can trust your questions.

> “When someone can work across layers, they are like a thread connecting individual pearls into a necklace.”

### Turning an impossible problem into a work list

The pagoda also explains how Liao approaches a seemingly impossible target. A question such as “Can we reproduce the capability of the world's leading semiconductor manufacturer?” is too large to guide tomorrow's work. A yes or no answer tells an engineering team very little.

> “What I find most valuable is breaking an apparently impossible problem into ten or a hundred more concrete problems, then breaking those down further—perhaps into a thousand problems in physics, chemistry, and mathematics.”

Once decomposed, the problem becomes uneven. Some components are already achievable. Others need refinement. A few may be genuinely out of reach under the current conditions. That unevenness matters because a system can sometimes exploit strong components to compensate for weaker ones, or move a requirement across a boundary.

This does not guarantee that the whole system is feasible. The difficult parts still have to connect, and the result still has to satisfy cost and reliability requirements. But it gives the team something to investigate. Instead of repeatedly debating a national or corporate capability in the abstract, engineers can ask which measurements, materials, interfaces, or processes are preventing a particular result.

Liao describes the supply shock in that language. It forced him to study areas he previously had little reason to enter: manufacturing equipment, precision motion, measurement, and the details of devices. His renewed confidence came from seeing specific obstacles become solvable. I found that account more informative than the language of either inevitable success or permanent inferiority.

### Measuring progress beyond a process-node name

The interview separates several benefits often bundled together under semiconductor scaling: fitting more devices into an area, reducing the cost of a useful function, increasing speed, and reducing energy. Those gains do not have to improve at the same rate.

Liao argues that finer processes have become increasingly difficult and expensive, while energy remains a major reason to pursue them. He asks designers to examine the quantities that matter to a system: how long a transition or communication takes, how much energy it consumes, and what it costs to provide the required service. A node label by itself cannot answer all of those questions.

He also acknowledges the penalties in the compute he describes: it can require more energy and greater cost. Delivering a useful system does not make those disadvantages disappear. They remain part of the deployment decision alongside availability, performance, and the surrounding infrastructure.

He connects this view with Huawei's proposed Tau scaling approach. In its [May 2026 presentation](https://www.huawei.com/en/news/2026/5/ieee-iscas-tau-scaling), Huawei frames Tau around signal-propagation delay and describes techniques such as LogicFolding as ways to pursue density and performance through structural changes. I treat this as the company's proposed engineering direction, rather than a universally established replacement for Moore's law.

The broader design question is still useful: when a familiar route becomes harder, can changing geometry, connectivity, or packaging improve the same end result? Stacking may shorten some paths while introducing thermal or manufacturing problems elsewhere. A different partition may improve one resource balance while increasing communication. Every proposed improvement has to be evaluated across the relevant floors.

This is also why Liao objects to copying a competitor's design mechanically. If the available process, memory, interconnect, and economic conditions differ, the same architecture may not produce the same outcome. Originality has a practical purpose when it lets a product exploit what is actually available.

## III. What Ascend learned from real AI workloads

### From 910 to 950: the uncertainty changed

Liao's contrast between the early Ascend 910 period and the 950 design period is striking. Earlier, the team had access to advanced logic manufacturing, but much less clarity about which AI workloads would become large, recurring businesses. Training mattered, and edge deployment looked promising. The present scale and form of language-model inference were harder to anticipate.

Later, the manufacturing conditions were more restrictive, but the workload was far more concrete. Developers were training and deploying capable models. Open model releases exposed computations that a hardware team could inspect and measure. Customers brought actual problems with throughput, latency, compatibility, and cost. The uncertainty had moved from “What will this be used for?” toward “How can we deliver it under these constraints?”

That change makes open models relevant below the software layer. A chip team can examine tensor shapes, numerical formats, communication patterns, and the operations consuming time. A model is no longer merely a forecast about a future algorithm; it becomes evidence for architecture decisions.

Liao gives DeepSeek particular credit for choosing algorithmic complexity to reduce expensive work. Sparsely activated experts and compressed representations can improve the resource balance, but they add routing, movement, and other supporting operations. An architecture dominated by peak matrix multiplication may therefore need a different balance of vector processing, memory, and communication for a more selective model.

DeepSeek's own [hardware reflections on V3](https://arxiv.org/abs/2505.09343) support this broad connection between model design and infrastructure: the authors discuss mixture-of-experts, latent attention, low-precision training, and communication alongside recommendations for future hardware. I would not infer the internals of closed models from Liao's comparison. The stronger lesson is that a model's structure changes what “enough hardware” means.

### A token has to move through memory and networks

The deployment lesson Liao returns to most often is bandwidth. In particular, he says that serving the decoding phase of a language model exposed a different balance of compute and memory demand from the workloads used to motivate earlier designs.

For technical context, **prefill** is the phase in which the model processes the prompt and builds the state needed for generation. During **decode**, it produces successive tokens while repeatedly accessing weights and cached attention state. The exact bottleneck depends on the model, batch size, context length, precision, and parallelization, but these phases can favor different hardware configurations.

This makes peak arithmetic throughput an incomplete purchasing guide. If the arithmetic units are waiting for data, adding more of them may leave much of the added capacity idle. Memory capacity determines what can fit; memory bandwidth determines how quickly it can be accessed; the interconnect determines how expensive it is to divide the work among devices.

Liao distinguishes two service goals: low token-generation latency and high token throughput per card. He emphasizes that a production system has to achieve both. The challenge is their practical balance, rather than simply whether a model runs or how much arithmetic capacity a chip advertises.

As a supplementary example, Huawei's [CloudMatrix384 serving paper](https://arxiv.org/abs/2506.12708) describes separating prefill and decode resources, pooling resources, and overlapping communication and computation in a system built around 384 Ascend 910C NPUs. Its reported results belong to the workloads and configurations studied; the architectural point is that chips, memory, networking, and scheduling are designed together.

Asked which would account for the larger share of chip demand, Liao says inference, adding that the shift is already happening. His economic rationale is that training builds a capability, while inference delivers it to users and generates income. I read this as his business argument about useful deployment, rather than a measured industry-wide ratio or a rule fixing the training-to-inference balance for every organization.

### Granularity matters alongside bandwidth

A network can perform well when moving large blocks and poorly when moving many small ones. Liao illustrates this through a contrast between megabyte-scale transfers and much smaller messages encountered in deployment. Setup costs, synchronization, and the efficiency of each transfer matter even when the advertised bandwidth is high.

The same issue appears inside a processor. If the hardware works in blocks that are too large for a particular access pattern, it can move or process data that the algorithm does not need. Liao's image is a box filled with large stones: spaces remain between them. Smaller pieces can use that space differently. The analogy is imperfect, but it makes the mismatch between workload size and hardware granularity easy to picture.

This leads him to the debate between SIMD and SIMT. **SIMD**, single instruction, multiple data, expresses parallel operations over data lanes. **SIMT**, single instruction, multiple threads, presents a thread-based programming model. Modern processors can combine features from both approaches, so the labels alone reveal less than the execution details and programming behavior.

> “Instead of arguing as though this were religion, we should use different computation modes for different situations.”

There is a verifiable example in Huawei's [September 2025 Ascend roadmap](https://www.huawei.com/en/news/2025/9/hc-xu-keynote-speech). The announced 950 design combines SIMD and SIMT and reduces memory-access granularity from 512 bytes to 128 bytes. The roadmap also distinguishes memory configurations for prefill/recommendation and decode/training. These are Huawei's published design choices; they do not, by themselves, establish superiority on every workload.

Liao's argument is that discussions of processor families should eventually give way to the actual limiting factors: how the data is divided, how fast it moves, how cores synchronize, and how readily the programmer can express the computation.

### The software–hardware interface keeps moving

The interview revisits an older architecture question: how much scheduling work should a compiler perform, and how much should hardware perform dynamically? Liao remembers the period when VLIW and superscalar designs represented competing answers. The same division of responsibility remains relevant to accelerator programming, although modern GPUs should not simply be equated with historical VLIW machines.

For a contemporary model, another important boundary is the kernel. A high-level framework can express a computation through many separate operators. Each operator may introduce launch, synchronization, or data-movement costs. When a service needs much lower latency, repeatedly crossing those boundaries can become a substantial part of execution time.

Kernel fusion combines operations so that intermediate data can remain closer to the computation and some overheads can be avoided. [FlashAttention](https://arxiv.org/abs/2205.14135), which Liao mentions, is a well-established example of designing an exact attention algorithm around movement between levels of GPU memory. Its gains do not depend on changing the mathematical result into an approximate one.

Fusion also creates a programming challenge. Large, carefully scheduled computations are difficult to write and keep changing at the lowest level. Liao points toward languages and compiler interfaces that let developers express useful blocks of work while retaining control over performance. [TileLang](https://github.com/tile-ai/tilelang) is one such language; the [PTO work](https://github.com/huawei-csl/pto-kernels) he discusses uses a tile-oriented virtual instruction interface for Ascend.

The opportunity, in his view, is that a changing interface can create room for another hardware platform. A developer may increasingly express an optimization through a higher-level system whose compiler handles more of the mapping. That does not automatically erase CUDA's accumulated tools, libraries, or user knowledge. It does change where some of the portability work and design freedom may sit.

## IV. Building a complete system

### Silicon area, package edges, and the footprint of a data center

Liao challenges the assumption that every generation should concentrate more compute into the same package and rack. His objection is about the supporting resources that must grow with the compute.

He offers a simple geometric thought experiment. If a square compute region has side length **n**, its area grows as **n²**, while its perimeter grows as **4n**. In a design where growing compute demand must be served through its edges, communication and memory access face a different geometric scaling problem from arithmetic density.

I read this as an illustration of an architectural pressure, not a proof that all larger chips are doomed. Real packages use complex routing and multiple dies, and three-dimensional connections can change the assumptions. But it is a useful reason to ask how data, power, and heat will be handled before treating a larger compute region as an uncomplicated gain.

At rack scale, the surrounding building matters too. A denser rack still needs electricity and cooling. Equipment squeezed into a smaller footprint can require larger external cooling facilities, more demanding power distribution, and more complicated plumbing. Saving space at one level may move the space and cost elsewhere.

Liao therefore favors a design that can spread compute over more physical space and connect it efficiently. The trade is explicit: longer connections introduce communication challenges, so optical interconnects become part of the architecture. Space, cabling, cooling, and compute can then be balanced together.

He frames this partly as managing the number of simultaneous breakthroughs a product requires.

> “I have to deliver a reliable product that meets our quality standards in every generation. If we have to overcome twenty physical limits at once, failing at just one can sink the product.”

A team still has to take technical risks. The decision is where those risks create enough value, and where a less demanding choice helps the whole product reach customers. That perspective is especially important when fabrication and supply options differ from those available to a competitor.

### Why he puts optics near the package

The optical discussion is one of the most concrete examples of crossing floors. Liao describes the path from an electrical chip interface to an optical link. Placing the optical module at the front of a system can require a substantial electrical path between it and the processor. Moving the conversion closer can shorten that path and reduce some of the difficult high-speed electrical routing.

But proximity introduces another set of questions. Optical behavior depends on material properties, including refractive index, which changes with temperature. Lasers have reliability constraints. Optical coupling introduces losses. Moving everything into a hot processor package can make thermal and serviceability questions harder.

Liao describes choosing **near-package optics (NPO)**: close to the compute package, rather than treating deeper integration as automatically better. He also worries that distributing one powerful external light source across many channels concentrates optical power and adds coupling problems. His preference is to keep sources local to the optical module and use redundancy to address failures.

These are his choices for the system he describes, not a universal verdict against co-packaged optics or external lasers. The useful part is the reasoning chain. Electrical reach affects placement; placement affects temperature; temperature affects optical behavior and reliability; reliability affects redundancy and maintenance; all of them affect the system's cost.

He traces his interest back to studying optical communications well before it became central to his current work. He even recalls attending a short course because he expected electrical links eventually to become limiting. He had expected optical links to become necessary at a lower signaling rate than proved to be the case, but the knowledge later gave him a basis for asking better design questions.

The pagoda metaphor earns its place here. A choice about the shape of a data center reaches down into optical materials, and knowledge of those materials travels back up into system architecture.

### Modularity has value when the workload changes

A tightly integrated system can offer high density and a well-defined configuration. It also fixes relationships among compute, memory, storage, and communication. If a later workload needs a very different balance, the original configuration may be difficult to change.

Liao describes interest in smaller building blocks connected through flexible interconnects. A longer context, a different model architecture, or a new latency target can change what the service needs. The ability to recombine resources becomes a way of accommodating uncertainty after the initial design decision.

That flexibility depends on the supporting components. An AI accelerator needs host processors, memory, storage, network interfaces, switches, communication protocols, and software. A missing or weak component can constrain an otherwise capable system. Interoperability matters because customers also own equipment built before the new architecture arrived.

For that reason, Liao's argument for a more independent system is not simply an argument for replacing one GPU. It is about possessing enough of the necessary capabilities to define how the components work together, while still connecting to existing systems. The cost and usefulness of the complete configuration remain the test.

He applies an economic test to the wider industry as well. A sustainable path needs products and manufacturing businesses that can support themselves; technical feasibility alone is insufficient if continued operation depends on indefinite losses or subsidy.

### Running inference, training a model, and supporting research

One distinction I want to keep using is Liao's account of three different software demands.

| Activity                                | What must work                                                                           | Why the support burden changes                                                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Inference for an established model      | Correct, efficient serving under the target latency and throughput requirements          | Optimization can be reused across deployments of that model                                 |
| Production training for a defined model | Forward and backward computation, numerical behavior, distributed execution, convergence | More operations and system behavior must work across a sustained training run               |
| Research                                | Frequent changes to algorithms, kernels, layouts, and experiments                        | The platform must make unfamiliar work practical without requiring a bespoke port each time |

This is not a universal ranking of difficulty: production inference can demand exceptional optimization. Liao's distinction concerns the breadth and rate of change the software platform has to absorb. A fixed model provides a relatively stable target. A research team changes the target every day.

> “But to support research, we need a more advanced compiler stack.”

Being able to publish a successful model port is therefore a milestone, but an ecosystem also has to support the next experiment. For me, the practical test is whether researchers can change an algorithm and get it running efficiently without waiting for a bespoke implementation each time.

Ascend's [CANN documentation](https://www.hiascend.com/document/detail/en/canncommercial/800/quickstart/quickstart/quickstart_18_0004.html) describes this connecting role: graph compilation and execution, runtime services, operator development, and communication support between AI frameworks and processors. Liao distinguishes broad compatibility for ordinary users from the work of a smaller group pursuing the best economics for a specific production workload. Both constituencies matter.

His assessment of the remaining gap is direct:

> “But our biggest shortcoming is still the software ecosystem.”

As deployments grow, he hopes more developers will have both a reason and an opportunity to improve the platform. That is a plausible feedback loop, but it requires actual participation. Hardware availability creates the possibility of a community; useful tools, reliable behavior, and a responsive development process determine whether that community grows.

### Open source increases the bandwidth between people

Liao's defense of open source is unusually practical. A complicated technical system is difficult to explain through meetings, slide decks, support tickets, and documents released only after negotiation. Each exchange has limited bandwidth, and a developer may wait for another person to interpret an implementation detail.

> “Once I show you all the code, I don't have to talk you through it: you can explore all those files and directories yourself.”

The claim is not that collaboration stops. It is that inspection becomes possible without a separate conversation at every step. A customer can trace behavior, identify a mismatch, test a change, and arrive at the discussion with a more precise question. Maintainers receive better evidence in return.

Liao also connects open code with AI-assisted programming. He says it provides material for training coding models and describes those models as already helping with CANN development. This adds another reason, in his account, to make the software accessible.

There is a cost to choosing a distinct architecture. Existing software embodies years of assumptions about the platform on which it was developed. Changing user habits and supporting that accumulated work require substantial effort. Liao's defense of differentiation is that copying those assumptions indefinitely can restrict the ability to design for one's own constraints.

> “Even if you have a hundred weaknesses, you must have one strength.”

I take the sentence as a product requirement: a different system needs a reason for someone to use it. Compatibility lowers the cost of trying; a useful advantage gives the customer a reason to stay. Neither can substitute entirely for the other.

## V. The people who make the system possible

### A prototype becomes a product through dependable work

One reason Liao gives for accepting the interview is a concern about the next generation of engineers. After giving a lecture in a computer-organization course at Tsinghua, he was troubled that students attracted to current AI topics might avoid the difficult work of understanding the hardware beneath them.

Liao's simplest example of engineering is an electric kettle. A clever design that boils water is a prototype. A product must also behave acceptably when a component fails, when water reaches an unexpected place, or when a user does something the designer did not anticipate. It needs to fail safely.

He says the difference became clear after he entered industry. As a student, he could program, design something that worked, and still miss the large body of verification, integration, and production work needed before ordinary people could rely on it. The gap was not simply another clever idea.

> “An engineer must first be dependable and take responsibility. Everything else rests on that.”

This shapes his view of teams. A large product cannot depend on every participant being a competition winner or a famous researcher. It needs people who understand their responsibilities, deliver carefully, expose problems, and coordinate their work. Exceptional individual ability helps, but it does not replace a functioning engineering process.

Chip development makes the consequences unusually tangible. Software can often be compiled and tried within minutes. Liao describes physical silicon feedback arriving after a much longer cycle, on the order of eighteen to twenty months in the process he discusses. That does not mean there is no testing before fabrication—simulation and verification are essential—but it means errors that survive those stages are expensive to discover in the manufactured device.

He therefore wants young engineers to gain experience at the module and subsystem level and live through complete development cycles. A timing constraint or an unreliable interface becomes easier to respect after seeing what it does to the whole product. Credentials cannot compress all of that learning into an interview or a short appointment.

At the same time, he welcomes younger colleagues who come to argue a technical point. His description of the local culture he tries to create emphasizes self-direction and curiosity. Reliability sets the standard for delivery; curiosity keeps the team from merely repeating the previous design.

### Looking beyond the work assigned to you

Crossing floors requires effort outside a narrow job description. Liao describes reading papers from adjacent fields, asking questions about physical systems, and finding people whose work initially seems unrelated. The optical course is one example. Asking how a rack's heat reaches a cooling facility is another.

His account contains a tension between acting on experienced intuition and recognizing how often experience can mislead. In the optics discussion, he sometimes rules out a direction before testing it, based on the physical difficulties he expects. Elsewhere, he is candid about business judgments that failed because his view of the surrounding world was too narrow. I find that tension more useful than a promise that experience will always point to the right answer.

A small story about receiving criticism, especially from within the company, makes this visible. He compares the hardest period to being desperately thirsty: the first available water is a rescue, and only later does its taste become the complaint. For Liao, increasing criticism was a sign that the most difficult period had passed. I read the analogy as a change in expectations once survival is no longer the only standard.

It is an uncomfortable form of progress. The engineering work that prevents a disruption may remain invisible, while the next inconvenience becomes very visible. A mature product has to accept that higher standard.

### Open competition and the next application problem

Liao returns to the industry structure with more optimism than his earlier “sunset” story might suggest. In his view, AI has not reached a stable plateau. New teams keep changing what is possible, and open model releases allow others to inspect and extend their work. He hopes that technical movement and a willingness to share will keep opportunities open across several layers.

These are expectations, not guarantees that market power will disappear. Compute, distribution, financing, and developer habits still matter. His own account of platform adoption makes their importance clear. He also acknowledges that a company's willingness to remain open can change.

What interests me is how he connects competition with a still-unsolved application problem: personal context. A capable model does not automatically know the meeting someone attended, the decision their team made, or the history behind a current task. The user spends time reconstructing that context in prompts.

An assistant present across work tools could reduce that burden. But Liao immediately describes the collision with privacy, company confidentiality, and the person's sense of control. Access to more context makes the assistant more capable while making its boundaries more consequential. A valuable application must solve both sides of that design problem.

He sees another opening in physical AI. Digital tasks have become much more tractable in his experience, while machines acting in the world still face gaps in models, energy, bodies, and dependable operation. In his view, physical AI still needs its defining model breakthrough. The diversity of physical tasks and embodiments is, for him, a reason to expect room for many kinds of products.

His optimism about China belongs in this account too. It is rooted in the engineering and research communities he encounters and in a desire to build useful domestic capability. He explicitly distinguishes that ambition from a wish to make another country fail. The useful outcome he describes is more capability to improve people's lives.

### Books, engineering memory, and being useful

The books Liao mentions reveal what he thinks an engineering education can miss. [Jon Gertner's _The Idea Factory_](https://www.penguinrandomhouse.com/books/303275/the-idea-factory-by-jon-gertner/) offers a history of Bell Labs and the conditions surrounding sustained invention. Liao is drawn to the interaction of people, institutions, and technical fields, and to the possibility that a place becomes unusually productive when those conditions meet.

He recommends _The Innovator's Dilemma_ for understanding how an established organization's strengths can obstruct its next opportunity. _The Rules of Work_ addresses a different scale: the everyday coordination and judgment involved in working with other people. _The Soul of a New Machine_ is particularly close to his concerns because it follows a team developing a computer and makes the human experience of engineering visible. He also mentions an Edison biography, with an emphasis on recognizing a useful problem and persisting through practical experiments.

Liao recalls later meeting someone he remembered as an intern in _The Soul of a New Machine_; by then, he says, that person was a senior engineer at EMC. The encounter made that continuity tangible: machines change, but the work of coordinating people, finding faults, and carrying a project through uncertainty passes between generations.

That is what connects this interview with my earlier notes on [Ming Zeng]({% post_url 2026-09-04-when-intelligence-becomes-infrastructure %}) and [Liyiming Ke]({% post_url 2026-09-04-how-robots-learn-to-get-better %}). Zeng asks how strategy develops before the future is clear. Ke asks how a robot improves through experience. Liao adds the long commitments and physical constraints beneath the systems that make those possibilities available.

My strongest takeaway is to spend more time at the boundaries of a problem. A model that needs less memory traffic can change the value of a chip. A better compiler can change who is able to use it. A more suitable optical link can change where the system can be built. Dependable people turn those connected choices into something others can rely on.

When the interviewer asks whether software engineers worried about AI should move into hardware, Liao declines to offer that simple escape route. He emphasizes identifying new needs and using greater implementation capacity to attempt work that was previously out of reach. The continuing responsibility is to find something worth building.

His account of motivation is simpler than the technology surrounding it:

> “We bring nothing into life and take nothing with us when we leave. I just hope to be useful along the way—to be of use to others.”
