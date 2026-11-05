---
layout: page
title: Landslide Risk Assessment from Failure to Consequence
description: A subset-simulation and large-deformation framework propagates uncertain soil-strength parameters through slope failure and post-failure response, then links case-specific consequence measures to vulnerability, temporal exposure, and risk.
img: assets/img/projects/covers/landslide-risk-assessment.png
cover_fit: cover
cover_position: 50% 50%
cover_alt: "Conceptual illustration of slope failure, runout, and spatially distributed consequences across an exposed valley community."
importance: 5
category: Prospective Modelling
sub_area: Risk
toc:
  sidebar: right
  breakpoint: lg
related_publications: true
---

<div class="project-detail prose" markdown="1">

<p class="project-detail__eyebrow">Quantitative risk · Large deformation · Rare-event simulation</p>

<div class="project-detail__lede" markdown="1">
This study replaces the usual break between slope-stability analysis and empirical runout estimation with a Coupled Eulerian–Lagrangian (CEL) simulation of pre-failure behavior and post-failure motion. In the runout-to-structure formulation, subset simulation estimates the probability that a realization reaches the specified element, while CEL-derived response quantities enter a separate vulnerability model. In the Ganjingzi application, the consequence measure is instead simulated wave height, with zero vulnerability assigned to stable or blue-alert states. {% cite cui2022quantitative %}
</div>

<div class="project-detail__facts" aria-label="Project overview">
  <div><strong>Physical engine</strong><span>CEL simulation of failure, large deformation, runout, and deposition</span></div>
  <div><strong>Probability engine</strong><span>Subset simulation targeted at the runout-to-element threshold</span></div>
  <div><strong>Applications</strong><span>Baqiao excavation scenarios and Ganjingzi wave-induced passenger risk</span></div>
</div>

<div class="project-detail__role">
  <strong>My role in this collaborative study.</strong> The published contribution statement lists Xin Wei's roles as data curation and reviewing and editing. {% cite cui2022quantitative %}
</div>

<nav class="project-detail__jump" aria-label="Jump to a risk-assessment section">
  <strong>Jump to</strong>
  <a href="#risk-concepts">Risk concepts</a>
  <a href="#qra-method">SS–CEL method</a>
  <a href="#baqiao-case">Baqiao</a>
  <a href="#ganjingzi-case">Ganjingzi</a>
  <a href="#risk-contribution">Contribution</a>
</nav>

## From failure to risk: conceptual boundaries {#risk-concepts}

The paper is not a regional susceptibility-mapping study. It evaluates the risk posed by a specified slope to a specified exposed element. Its central distinction is between a slope that becomes unstable and a realization whose motion reaches the element at risk. {% cite cui2022quantitative %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Concept</th><th>Meaning in this study</th><th>Representation</th></tr>
  </thead>
  <tbody>
    <tr><td>Susceptibility</td><td>Spatial tendency toward landsliding; not a direct output of this paper</td><td>Outside the case-specific QRA</td></tr>
    <tr><td>Failure</td><td>A sampled slope realization becomes unstable</td><td>$P_f=N_f/N_t$</td></tr>
    <tr><td>Reach probability</td><td>A failed landslide reaches the exposed element</td><td>$P_r=N_r/N_f$</td></tr>
    <tr class="is-emphasized"><td>Impact probability in the runout-to-element formulation</td><td>A sampled realization fails and reaches the element; the Ganjingzi wave application uses the separate accounting convention reported in Table 7</td><td>$P_{fr}=N_r/N_t=P_fP_r$</td></tr>
    <tr><td>Intensity</td><td>Attributes used to characterize the action on the exposed element</td><td>CEL-derived velocity, moving volume, and debris depth with prescribed slope height; wave height in the reservoir case</td></tr>
    <tr><td>Vulnerability</td><td>Conditional degree of loss under the modeled intensity and resistance</td><td>$V\in[0,1]$</td></tr>
    <tr><td>Temporal exposure</td><td>Probability that the element is present in the potential impact zone</td><td>$P_t$</td></tr>
    <tr><td>Risk</td><td>Impact probability combined with exposure and conditional loss</td><td>$R=P_{fr}P_t\overline{V}E$</td></tr>
  </tbody>
</table>
</div>

Here, “impact” primarily means satisfying the reach condition defined for the exposed element. CEL does not directly compute structural damage. It computes motion and intensity measures, which are subsequently converted to vulnerability through empirical functions, engineering judgment, historical information, or assigned wave-alert categories. {% cite cui2022quantitative %}

## From slope failure to impact probability {#qra-method}

The conventional case-specific risk expression separates slope failure from spatial reach:

<div class="project-detail__equation" markdown="1">

$$
R=P_fP_rP_tVE,
\qquad
P_f=\frac{N_f}{N_t},
\qquad
P_r=\frac{N_r}{N_f}.
$$

Because $P_fP_r=N_r/N_t$, the paper defines a joint failure-and-reach probability:

$$
P_{fr}=\frac{N_r}{N_t},
\qquad
R=P_{fr}P_t\overline{V}E,
\qquad
\overline{V}=\frac{1}{N_r}\sum_{j=1}^{N_r}V_j.
$$

<p><strong>Interpretation.</strong> <span>$N_t$</span> is the total number of sampled slopes, <span>$N_f$</span> is the number that fail, and <span>$N_r$</span> is the number that reach the exposed element. The proposed formulation embeds failure and spatial reach in <span>$P_{fr}$</span>; it does not remove failure mechanics from the simulation. Eqs. (2), (9)–(11) from {% cite cui2022quantitative %}.</p>

</div>

<div class="project-detail__figure-scroll">
{% include figure.liquid path="assets/img/projects/research/qra-risk-chain.svg" class="img-fluid" alt="Conceptual chain from lognormal soil-strength samples through CEL failure and runout, the reach threshold, vulnerability, exposure, and risk" %}
</div>

<div class="caption">
    Conceptual synthesis of the paper's risk chain. The physical simulation ends at motion and intensity; the consequence stage uses an empirical vulnerability representation. Based on Eqs. (9)–(19) in {% cite cui2022quantitative %}; not plotted data.
</div>

### The impact event used by subset simulation

Subset simulation defines the target threshold event as

<div class="project-detail__equation" markdown="1">

$$
F=\{z(\mathbf{X})>b\}=\{L>b\},
$$

where $\mathbf{X}$ contains the uncertain soil parameters, $L$ is the CEL-simulated runout distance, and $b$ is the distance from the original slope toe to the exposed element. The paper's “failure event” in the subset-simulation equations is therefore a mathematical threshold-exceedance event, not merely the initiation of geotechnical failure.

Intermediate events progressively approach the target:

$$
F_i=\{z(\mathbf{X})>b_i\},
\qquad
b_1<b_2<\cdots<b_n=b,
$$

with $P(F_1)=P(F_{i+1}\mid F_i)=P_0$. Samples that satisfy the current intermediate event seed Markov-chain Monte Carlo sampling at the next level. Eqs. (12)–(13) from {% cite cui2022quantitative %}.

</div>

The formal construction partitions the response space into mutually exclusive regions. $\Omega_0$ lies below the first intermediate threshold, $\Omega_i=F_i\setminus F_{i+1}$ for $i=1,\ldots,n-1$, and $\Omega_n=F_n$. Their reported occurrence probabilities are $P(\Omega_i)=P_0^i-P_0^{i+1}$ for $i=0,\ldots,n-1$ and $P(\Omega_n)=P_0^n$. These regions are then weighted by their occurrence probabilities, within-subset proportions of impacting samples, and mean vulnerabilities. {% cite cui2022quantitative %}

<div class="project-detail__equation" markdown="1">

$$
R=
\sum_{i=1}^{n}
P(\Omega_i)
\left(\frac{N_{r,i}}{N_i}\right)
\left(\frac{1}{N_{r,i}}\sum_{j=1}^{N_{r,i}}V_{j,i}\right)
P_tE.
$$

<p>This is a probability-weighted aggregation across subset regions, not a simple average of all numerical simulations. Eq. (16) from {% cite cui2022quantitative %}.</p>

</div>

### CEL as the large-deformation engine

CEL combines two numerical descriptions. In the Lagrangian step, the mesh and material deform together. In the Eulerian step, the convective motion is calculated and material and field variables are mapped back to a regular mesh. This two-step treatment avoids the severe mesh distortion that can stop conventional Lagrangian calculations during very large deformation. {% cite cui2022quantitative %}

<div class="project-detail__equation" markdown="1">

$$
\frac{\partial w}{\partial t}=S,
\qquad
\frac{\partial w}{\partial t}
+\nabla\cdot\mathbf{W}(w,\mathbf{v},\mathbf{x},t)=0.
$$

<p>The first expression is solved in the Lagrangian step; the second represents the Eulerian convective step. The simulations use a linear-elastic, perfectly plastic Mohr–Coulomb material, zero dilation, and ABAQUS CEL. Eqs. (7)–(8) from {% cite cui2022quantitative %}.</p>

</div>

CEL is the large-deformation implementation used in these cases, but the risk formulation is not tied to it; the authors note that other large-deformation solvers could be substituted. {% cite cui2022quantitative %}

{% include figure.liquid path="assets/img/projects/research/qra-trace-point-method.png" class="img-fluid" alt="Trace-point method for extracting runout distance, displacement, debris depth, and slope height from a CEL landslide simulation" zoomable=true %}

<div class="caption">
    Trace points connect the CEL field calculation to consequence-relevant outputs. Runout is measured from the original toe to the farthest displaced trace point; velocity is obtained from displacement rate; moving volume is estimated from the proportion of trace points classified as unstable by nonzero displacement; and debris depth is evaluated at the exposed element. Fig. 1 from {% cite cui2022quantitative %}.
</div>

### What is uncertain—and what is prescribed

The case studies propagate parametric uncertainty in cohesion $c$ and friction angle $\phi$, both modeled as lognormal random variables. The paper does not state that they are statistically independent. Unit weight, stiffness, Poisson's ratio, geometry, excavation angle, reservoir level, and remediation configuration are prescribed inputs or scenarios. Natural spatial variability is not modeled. {% cite cui2022quantitative %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Case</th><th>Random soil-strength parameters</th><th>Representative fixed/scenario inputs</th></tr>
  </thead>
  <tbody>
    <tr><td>Baqiao</td><td>$c$ and $\phi$ for Lishi and Malan loess</td><td>Loess stratigraphy, excavation geometry, structure location, $E$, $\nu$, and unit weight</td></tr>
    <tr><td>Ganjingzi</td><td>$c$ and $\phi$ for the sliding mass</td><td>Global/local geometry, 145/175 m water levels, anti-slide piles, interfaces, $E$, $\nu$, and unit weight</td></tr>
  </tbody>
</table>
</div>

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Case and material</th><th>$\gamma$ (kN/m³)</th><th>$E$ (MPa)</th><th>$\nu$</th><th>$\phi$, mean ± SD</th><th>$c$, mean ± SD</th></tr>
  </thead>
  <tbody>
    <tr><td>Baqiao — Lishi loess $Q_2$</td><td>18.0</td><td>85</td><td>0.31</td><td>23.6° ± 3.1°</td><td>42.1 ± 20.5 kPa</td></tr>
    <tr><td>Baqiao — Malan loess $Q_3$</td><td>17.1</td><td>68</td><td>0.30</td><td>21.5° ± 4.75°</td><td>30.5 ± 17.7 kPa</td></tr>
    <tr><td>Ganjingzi — sliding mass</td><td>23.6</td><td>3.2</td><td>0.33</td><td>29.8° ± 3.17°</td><td>18.5 ± 2.1 kPa</td></tr>
    <tr><td>Ganjingzi — bedrock</td><td>26.2</td><td>1,600</td><td>0.49</td><td>Not reported</td><td>Not reported</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    Material inputs from Tables 1 and 6. Means and SDs apply to the lognormal $\phi$ and $c$ variables; $\gamma$, $E$, and $\nu$ are fixed inputs. The paper does not state statistical independence between $\phi$ and $c$. {% cite cui2022quantitative %}
</div>

### Three analytical routes in the paper

The efficiency and method-comparison results use three distinct routes. Keeping them separate is essential:

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Route</th><th>Composition</th><th>Purpose</th><th>Consequence information</th></tr>
  </thead>
  <tbody>
    <tr class="is-emphasized"><td>Proposed Approach 1</td><td>Subset simulation + CEL</td><td>Formal QRA method proposed in the paper</td><td>Scenario-specific $L$, velocity, volume, debris depth or wave height</td></tr>
    <tr><td>Direct MCS + CEL</td><td>Direct Monte Carlo sampling + the same CEL model</td><td>Numerical validation of SS estimates and sampling efficiency</td><td>The same CEL-derived dynamic quantities</td></tr>
    <tr><td>Conventional Approach 2</td><td>10,000 MCS samples + SRFEM stability + empirical runout</td><td>Framework comparison in Baqiao</td><td>Runout is estimated empirically; post-failure velocity and deposit evolution are not directly simulated, and $V=1$ is assumed after reach</td></tr>
  </tbody>
</table>
</div>

## Baqiao: excavation, runout, and structural risk {#baqiao-case}

### Site and controlled excavation scenarios

The 2011 Baqiao loess landslide was approximately 90 m high and 170 m wide, with a 12 m slip-surface thickness, a sliding volume of $1.5\times10^5$ m³, and an observed runout of 150 m. Two nearby structures were destroyed. Field investigation identified slope-toe excavation for brick-making material as the triggering factor considered in the case study. {% cite cui2022quantitative %}

{% include figure.liquid path="assets/img/projects/research/qra-baqiao-scenarios.png" class="img-fluid" alt="Baqiao geological profile with original and excavated slope scenarios, structure location, factor of safety, and slope-to-structure distances" zoomable=true %}

<div class="caption">
    Baqiao stratigraphy and excavation scenarios. Scenario I is the original slope; Scenarios II–IV prescribe progressively steeper cuts and different slope-to-structure thresholds. Cropped from Fig. 5 in {% cite cui2022quantitative %}.
</div>

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Scenario</th><th>Slope angle</th><th>Structure threshold $b$</th><th>Mean-parameter FS</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr><td>I</td><td>24.3°</td><td>—</td><td>1.32</td><td>Original state; not included in the SS risk comparison</td></tr>
    <tr><td>II</td><td>40°</td><td>40 m</td><td>1.04</td><td>First excavation scenario</td></tr>
    <tr><td>III</td><td>50°</td><td>66 m</td><td>0.87</td><td>Intermediate excavation</td></tr>
    <tr><td>IV</td><td>60°</td><td>82 m</td><td>0.75</td><td>Steepest excavation</td></tr>
  </tbody>
</table>
</div>

The modeled element at risk is a three-floor steel structure no more than five years old. Its resistance score is

$$
Res=(0.90\times0.65\times0.80)^{1/3}\approx0.78,
$$

based on structural type, floor count, and age. In the Baqiao comparison, $P_t=1$ and $E=1$ monetary unit. The resulting $R$ is therefore a comparative risk value under those assumptions, rather than a site-specific estimate of monetary loss. {% cite cui2022quantitative %}

### From CEL dynamics to structural vulnerability

The Baqiao vulnerability model first combines moving volume, velocity, debris depth, and slope height into a dimensionless intensity $Int$. It then compares intensity with the resistance score:

<div class="project-detail__equation" markdown="1">

Let $x=Int/Res$. Then

$$
V=
\begin{cases}
2x^2, & x\le0.5,\\[3pt]
1-2(1-x)^2, & 0.5<x\le1,\\[3pt]
1, & x>1,
\end{cases}
$$

with

$$
Int=1-\prod_{k=1}^{n}(1-\alpha_k),
\qquad
Res=\left(\prod_{k=1}^{n}\beta_k\right)^{1/n}.
$$

<p><span>$\alpha_k$</span> are intensity-factor scores and <span>$\beta_k$</span> are resistance-factor scores assigned from the paper's vulnerability table. Eqs. (17)–(19) from {% cite cui2022quantitative %}.</p>

</div>

Slope cutting shifts the simulated distributions of runout distance, velocity, and moving volume toward larger values:

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Scenario</th><th>Runout distance, mean ± SD</th><th>Velocity, mean ± SD</th><th>Moving volume, mean ± SD</th></tr>
  </thead>
  <tbody>
    <tr><td>II</td><td>14.10 ± 16.75 m</td><td>1.07 ± 1.04 m/s</td><td>$(0.35\pm0.49)\times10^5$ m³</td></tr>
    <tr><td>III</td><td>39.00 ± 23.93 m</td><td>2.43 ± 1.71 m/s</td><td>$(1.14\pm0.83)\times10^5$ m³</td></tr>
    <tr class="is-emphasized"><td>IV</td><td>58.46 ± 26.52 m</td><td>3.11 ± 1.06 m/s</td><td>$(1.95\pm0.93)\times10^5$ m³</td></tr>
  </tbody>
</table>
</div>

{% include figure.liquid path="assets/img/projects/research/qra-baqiao-dynamics.png" class="img-fluid" alt="Histograms of Baqiao runout distance, velocity, and moving volume for the 40, 50, and 60 degree excavation scenarios" zoomable=true %}

<div class="caption">
    Simulated Baqiao dynamic-behavior distributions. The paper attributes the shifts to higher center of gravity and potential energy under steeper cutting. Most spreads also increase, except velocity from Scenario III to IV. Cropped from Fig. 6 in {% cite cui2022quantitative %}.
</div>

### A worked subset-simulation calculation

For Scenario II, the paper sets $P_0=0.1$ and $N=400$ per level. One initial direct-MCS level and two MCMCS levels require

$$
400+(1-0.1)\times2\times400=1{,}120
$$

simulations. At each of the first two levels, the 40 samples with the largest runout distances become seeds for the next level. {% cite cui2022quantitative %}

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Subset</th><th>$P(\Omega_i)$</th><th>Impacting samples</th><th>$P_{fr,i}$</th><th>$\overline{V}_i$</th></tr>
  </thead>
  <tbody>
    <tr><td>$\Omega_0$</td><td>0.90</td><td>0/360</td><td>0</td><td>0</td></tr>
    <tr><td>$\Omega_1$</td><td>0.09</td><td>285/360</td><td>0.792</td><td>0.955</td></tr>
    <tr class="is-emphasized"><td>$\Omega_2$</td><td>0.01</td><td>400/400</td><td>1.000</td><td>0.981</td></tr>
  </tbody>
</table>
</div>

The weighted calculation gives $P_{fr}\approx0.081$ and $R\approx0.078$; Table 4 reports impact probability 8.13%, mean vulnerability 0.958, and risk 0.078. This worked example shows how rare-event probability and conditional consequence are assembled rather than merely reporting a simulation count. {% cite cui2022quantitative %}

### Risk, direct-MCS validation, and the empirical comparator

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Scenario</th><th>$P_{fr}$</th><th>$\overline V$</th><th>SS–CEL $R$</th><th>Direct MCS–CEL $R$</th><th>Reaching samples / CEL runs (unweighted)</th></tr>
  </thead>
  <tbody>
    <tr><td>II</td><td>8.13%</td><td>0.958</td><td>0.078</td><td>0.081</td><td>685/1,120</td></tr>
    <tr><td>III</td><td>11.75%</td><td>0.958</td><td>0.113</td><td>0.109</td><td>407/760</td></tr>
    <tr class="is-emphasized"><td>IV</td><td>14.75%</td><td>0.964</td><td>0.142</td><td>0.143</td><td>419/760</td></tr>
  </tbody>
</table>
</div>

The raw SS count 685/1,120 is not an empirical estimate of $P_{fr}$; samples from different subset levels carry different occurrence-probability weights.

The direct-MCS–CEL values provide numerical validation of subset sampling within the same physical model. For Scenario II, direct MCS required 8,000 CEL simulations to obtain 678 impacting samples, while SS obtained 685 from 1,120. The efficiency comparison is therefore SS versus direct MCS inside the CEL framework—not SS–CEL versus the conventional empirical Approach 2. {% cite cui2022quantitative %}

The conventional comparison produces much larger risk values in this case:

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Scenario</th><th>$P_f$</th><th>$P_r$</th><th>Assumed $V$ after reach</th><th>Approach 2 $R$</th></tr>
  </thead>
  <tbody>
    <tr><td>II</td><td>50.70%</td><td>100%</td><td>1</td><td>0.507</td></tr>
    <tr><td>III</td><td>89.30%</td><td>98.43%</td><td>1</td><td>0.879</td></tr>
    <tr><td>IV</td><td>99.75%</td><td>79.18%</td><td>1</td><td>0.790</td></tr>
  </tbody>
</table>
</div>

For Scenario IV, the empirical model predicts mean runout 94.17 m with SD 14.47 m, compared with an 82 m structure threshold. The paper attributes the conservative estimate in this Baqiao comparison to the empirical runout relation, which was derived from a limited set of loess-landslide records spanning different triggering conditions and may therefore be biased and uncertain. Separately, Approach 2 adopts the most unfavorable vulnerability assumption, $V=1$, whenever the modeled runout reaches the structure. This result is specific to the comparator used in Baqiao and is not evidence that every conventional QRA necessarily overestimates risk. {% cite cui2022quantitative %}

<div class="project-detail__source-note"><strong>Source note.</strong> Tables 3–4 report the first Baqiao SS–CEL risk as 0.078; the surrounding prose and conclusion round it to 0.079. Table values are used throughout this page.</div>

## Ganjingzi: landslide motion, impulse waves, and passenger risk {#ganjingzi-case}

### Geometry and modeled scenarios

The Ganjingzi slope lies approximately 150 m from the Yangtze River navigation channel. The potential global landslide is about 440 m long, 220 m wide, and 21 m thick, with a volume of $2\times10^6$ m³. The local severe-deformation zone is approximately 170 m by 100 m by 12 m, with a volume of $2\times10^5$ m³. {% cite cui2022quantitative %}

{% include figure.liquid path="assets/img/projects/research/qra-ganjingzi-geometry.png" class="img-fluid" alt="Ganjingzi cross-section showing the potential global and local landslides, anti-slide piles, bedrock, and reservoir levels of 145 and 175 metres" zoomable=true %}

<div class="caption">
    Ganjingzi numerical geometry: global and local potential failures, two anti-slide-pile rows, and the two evaluated reservoir levels. Cropped from Fig. 8 in {% cite cui2022quantitative %}.
</div>

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Scenario</th><th>Slope state</th><th>Reservoir levels</th><th>Consequence pathway</th></tr>
  </thead>
  <tbody>
    <tr><td>I</td><td>Potential global landslide</td><td>145 and 175 m</td><td>Water entry → impulse wave → vessel vulnerability</td></tr>
    <tr><td>II</td><td>Potential local landslide</td><td>145 and 175 m</td><td>Water entry → impulse wave → vessel vulnerability</td></tr>
    <tr class="is-emphasized"><td>III</td><td>Slope reinforced by two anti-slide-pile rows</td><td>145 and 175 m</td><td>Residual wave consequence after remediation</td></tr>
  </tbody>
</table>
</div>

The CEL model represents bedrock and piles as rigid materials, uses Coulomb-friction soil–pile and soil–bedrock interfaces, applies self-weight, and contains approximately 73,000 EC3D8R elements, for which the paper reports a 2 m $\times$ 2 m element size. Cohesion and friction angle of the sliding mass are lognormal random variables with reported means and SDs of $18.5\pm2.1$ kPa and $29.8^\circ\pm3.17^\circ$. {% cite cui2022quantitative %}

### From simulated wave height to vulnerability and exposure

Water-surface trace points convert soil–water motion into maximum wave height. The consequence model then maps wave height to vessel vulnerability: {% cite cui2022quantitative %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Wave height</th><th>Alert class</th><th>Assigned vessel vulnerability</th></tr>
  </thead>
  <tbody>
    <tr><td>$>3$ m</td><td>Red</td><td>0.8</td></tr>
    <tr><td>2–3 m</td><td>Orange</td><td>0.4</td></tr>
    <tr><td>1–2 m</td><td>Yellow</td><td>0.2</td></tr>
    <tr><td>$\le1$ m</td><td>Blue</td><td>0</td></tr>
  </tbody>
</table>
</div>

The temporal-exposure calculation uses approximately 200 vessels per day, an assumed vessel speed of 25 km/h, and a 220 m potential impact zone. Each vessel occupies the zone for 31.4 s, giving

<div class="project-detail__equation" markdown="1">

$$
P_t=
\frac{200\times31.4}{24\times60\times60}
=7.27\%.
$$

<p>This is the probability that passengers are present in the potential impact zone at the moment of a landslide under the paper's traffic assumptions. {% cite cui2022quantitative %}</p>

</div>

<div class="project-detail__figure--portrait">
{% include figure.liquid path="assets/img/projects/research/qra-landslide-wave-scenarios.png" class="img-fluid" alt="Global Ganjingzi landslide simulations entering the reservoir and generating maximum waves of 5.4 metres at water level 175 metres and 10.2 metres at water level 145 metres" zoomable=true %}

<div class="caption">
    Global-failure simulations with maximum-wave-height callouts of 5.4 m at the 175 m water level and 10.2 m at the 145 m level. Fig. 9 reports these callouts, whereas Table 7 separately reports mean vulnerability and risk from the probabilistic analysis. {% cite cui2022quantitative %}
</div>
</div>

### Reported risk and effect of anti-slide piles

For this case, stable or blue-alert samples are retained and assigned $V=0$. Table 7 therefore lists $P_{fr}=100\%$ for its aggregation. This is an accounting choice for the wave-consequence calculation; it does not mean that every sampled slope produces a damaging landslide. {% cite cui2022quantitative %}

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Scenario</th><th>Water level</th><th>Reported $P_{fr}$</th><th>$P_t$</th><th>Mean vulnerability</th><th>Reported individual risk $R$</th><th>Criterion</th></tr>
  </thead>
  <tbody>
    <tr><td>Global</td><td>145 m</td><td>100%</td><td>7.27%</td><td>0.022</td><td>$3.12\times10^{-4}$</td><td>Above $10^{-4}$</td></tr>
    <tr><td>Global</td><td>175 m</td><td>100%</td><td>7.27%</td><td>0.042</td><td>$6.04\times10^{-4}$</td><td>Above $10^{-4}$</td></tr>
    <tr><td>Local</td><td>145 m</td><td>100%</td><td>7.27%</td><td>0.079</td><td>$1.15\times10^{-3}$</td><td>Above $10^{-4}$</td></tr>
    <tr><td>Local</td><td>175 m</td><td>100%</td><td>7.27%</td><td>0.112</td><td>$1.62\times10^{-3}$</td><td>Above $10^{-4}$</td></tr>
    <tr class="is-emphasized"><td>Reinforced</td><td>145 m</td><td>100%</td><td>7.27%</td><td>0.003</td><td>$3.65\times10^{-5}$</td><td>Below $10^{-4}$</td></tr>
    <tr class="is-emphasized"><td>Reinforced</td><td>175 m</td><td>100%</td><td>7.27%</td><td>0</td><td>0</td><td>Below $10^{-4}$</td></tr>
  </tbody>
</table>
</div>

All four unreinforced global/local cases exceed the paper's adopted individual-risk criterion of $10^{-4}$. The Table 7 values for the reinforced slope are no greater than $3.65\times10^{-5}$. {% cite cui2022quantitative %}

<div class="project-detail__source-note"><strong>Source notes.</strong> The prose adjacent to Table 7 reverses which reinforced water level has $3.65\times10^{-5}$ and which has zero risk. This page reproduces Table 7 exactly as printed and reports the discrepancy without attempting to resolve it. Separately, the additional scaling needed to recover $R$ from the printed $P_{fr}$, $P_t$, and $\overline V$ columns is not specified, so the risk values are reported as published rather than independently recomputed.</div>

## What this work establishes {#risk-contribution}

### Evidence-supported contribution

- **Failure and runout share one physical simulation.** CEL propagates the same sampled shear-strength parameters through initiation, large deformation, travel, and deposition. {% cite cui2022quantitative %}
- **For the runout-to-element formulation, the terminal event is impact.** In Baqiao, the framework directly estimates $P_{fr}$, the joint probability of slope failure and reach, instead of estimating $P_f$ and $P_r$ separately. In Ganjingzi, all subset states are retained and consequence is controlled through wave-height-dependent vulnerability. {% cite cui2022quantitative %}
- **Rare-event sampling is evaluated within a fixed physical model.** SS–CEL and direct MCS–CEL produce close Baqiao risk values, while SS generates comparable numbers of impacting realizations with fewer CEL evaluations. {% cite cui2022quantitative %}
- **The same chain accommodates different consequences.** Baqiao uses structure vulnerability based on runout dynamics; Ganjingzi uses CEL-simulated wave height, vessel exposure, and alert-based vulnerability to compare anti-slide piles. {% cite cui2022quantitative %}

### Modeling assumptions stated in the paper

- Soil is linear elastic and perfectly plastic under a Mohr–Coulomb model; dilation is set to zero.
- Cohesion and friction angle are lognormal random variables; case geometry and interventions are prescribed scenarios.
- Field geological conditions are simplified to keep the computational load affordable.
- Baqiao fixes $P_t=1$ and $E=1$ for comparative evaluation.
- Vulnerability is based on empirical functions, engineering judgment, historical records, or assigned wave-alert classes rather than direct simulation of structural impact. {% cite cui2022quantitative %}

### Authors' stated limitations

<div class="project-detail__scope" markdown="1">

The paper identifies two principal limitations. First, vulnerability is not obtained from direct landslide–structure impact simulation; such simulation could improve the consequence assessment. Second, natural spatial variability of soil properties is not included, even though prior studies show that it can affect risk. The case studies therefore demonstrate the proposed computational framework under parametric uncertainty and simplified site representations. {% cite cui2022quantitative %}

</div>

</div>
