---
layout: page
title: Physics-Guided AI for Regional Landslide Susceptibility
description: A three-paper first-author research program develops, tests, and interprets physics-guided models for cross-region landslide-susceptibility mapping, with explicit analysis of training-sample variability.
img: assets/img/projects/covers/physics-guided-susceptibility.png
cover_fit: cover
cover_position: 50% 50%
cover_alt: "Conceptual illustration of layered terrain inputs, physics-guided learning, and a regional landslide-susceptibility field across mountainous terrain."
importance: 1
category: Prospective Modelling
sub_area: Susceptibility
toc:
  sidebar: right
  breakpoint: lg
related_publications: true
---

<div class="project-detail prose" markdown="1">

<p class="project-detail__eyebrow">Physics-guided learning · Cross-region evaluation · Training-sample variability</p>

<div class="project-detail__lede" markdown="1">
This project centers on three first-author papers that form a continuous research program. The 2021 study introduced a CNN–TRIGRS hybrid framework; the 2023 study systematically tested which physical module should be used and how model averaging addresses realization-to-realization variability; the 2024 study isolated the practical roles of spatial neighborhoods, data resolution, factor reduction, and data-driven nonlinearity. {% cite wei2021novel wei2023comparison wei2024improving %}
</div>

<div class="project-detail__scope">
  <strong>My role in the core research.</strong> Across these three papers, the published contribution statements list my roles in conceptualization, methodology, investigation—including field investigation—data curation, and writing the original drafts. {% cite wei2021novel wei2023comparison wei2024improving %}
</div>

<nav class="project-detail__jump" aria-label="Jump to a core research section">
  <strong>Jump to</strong>
  <a href="#shared-spatial-test-bed">Overview</a>
  <a href="#study-2021">2021 study</a>
  <a href="#study-2023">2023 study</a>
  <a href="#study-2024">2024 study</a>
  <a href="#core-synthesis">Synthesis</a>
</nav>

## Core research arc

<div class="project-detail__arc">
  <a href="https://link.springer.com/article/10.1007/s11069-021-04844-0" target="_blank" rel="noopener">
    <span class="project-detail__arc-year">2021</span>
    <span class="project-detail__arc-body">
      <strong>A hybrid framework integrating physical model and convolutional neural network</strong>
      <em>Natural Hazards 109, 471–497</em>
      <span>Introduced two explicit roles for physics: replacing discrete lithology with continuous safety factor and screening non-landslide samples.</span>
    </span>
  </a>
  <a href="https://link.springer.com/article/10.1007/s11440-023-01841-4" target="_blank" rel="noopener">
    <span class="project-detail__arc-year">2023</span>
    <span class="project-detail__arc-body">
      <strong>Comparison of hybrid data-driven and physical models at regional scales</strong>
      <em>Acta Geotechnica 18, 4453–4476</em>
      <span>Compared four physical modules, distinguished mean performance from variability caused by random training-sample selection, and tested model averaging in a larger validation region.</span>
    </span>
  </a>
  <a href="https://www.sciencedirect.com/science/article/pii/S1674987124000069" target="_blank" rel="noopener">
    <span class="project-detail__arc-year">2024</span>
    <span class="project-detail__arc-body">
      <strong>Improving pixel-based regional landslide susceptibility mapping</strong>
      <em>Geoscience Frontiers 15, 101782</em>
      <span>Identified which data, spatial, physical, and algorithmic choices materially improved the two hybrid models.</span>
    </span>
  </a>
</div>

## Shared spatial test bed

The three studies use a deliberately spatial evaluation design in the Three Gorges Reservoir area. Zhuyuan supplies the training inventory, Qinglian serves as the principal cross-region test, and Wushan provides a substantially larger additional testing or validation region in the 2023 and 2024 studies. The regions differ in lithology, topography, inventory distribution, and conditioning-factor distributions. {% cite wei2021novel wei2023comparison wei2024improving %}

{% include figure.liquid path="assets/img/projects/research/susceptibility-study-regions.png" class="img-fluid" alt="Maps of the Zhuyuan training region, Qinglian testing region, and Wushan additional testing region within Chongqing, with landslide inventories over elevation" zoomable=true %}

<div class="caption">
    Spatial evaluation design used in the 2024 study: Zhuyuan for training, Qinglian for cross-region testing, and Wushan for additional testing without local fine-tuning. Fig. 5 from {% cite wei2024improving %}.
</div>

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Region</th><th>Role</th><th>Evidence used in the core papers</th></tr>
  </thead>
  <tbody>
    <tr><td>Zhuyuan</td><td>Training</td><td>85 landslide records in the 2021/2023 datasets; model fitting and within-region checks</td></tr>
    <tr><td>Qinglian</td><td>Primary cross-region test</td><td>119 landslide records; includes geological units absent or scarcely represented in Zhuyuan</td></tr>
    <tr><td>Wushan</td><td>Additional test/validation</td><td>2,954.7 km² and approximately 960 inventory records in the 2023 study</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    Region roles and inventory context reported across the three papers. {% cite wei2021novel wei2023comparison wei2024improving %}
</div>

## 2021 — CNN–TRIGRS framework {#study-2021}

### Research gap

The 2021 paper targeted two sources of cross-region failure. First, a categorical lithology channel can contain units in the testing region that do not occur in the training region; Qinglian's $J_2s$ unit is the central example. Second, an incomplete landslide inventory can cause random down-sampling to select unrecorded unstable grids as non-landslide training samples. The authors describe this as the first comprehensive CNN–TRIGRS integration for regional LSM, while explicitly treating the implementation as a preliminary framework. {% cite wei2021novel %}

### CNN architecture and spatial samples

The data-driven module uses a multi-channel two-dimensional CNN. A sliding window converts the 12 conditioning-factor maps into $5\times5\times12$ samples, enabling the network to learn spatial relations among neighboring grids and channel-wise relations among conditioning factors. The architecture contains three convolutional stages followed by fully connected layers, without pooling; the paper reports 7,250 trainable parameters. {% cite wei2021novel %}

The augmentation strategy responds to a specific sample-to-parameter imbalance: the Zhuyuan inventory provides 6,673 landslide grids, fewer than the number of trainable parameters. Successive $90^\circ$ rotations expand the spatial samples fourfold. Dropout and Min–Max normalization are also used, and binary cross-entropy supplies the training loss. Model outputs between 0 and 1 are later grouped into very-low, low, moderate, high, and very-high susceptibility classes using Jenks natural breaks. {% cite wei2021novel %}

<div class="project-detail__equation" markdown="1">

$$
12@5\times5
\rightarrow
8@5\times5
\rightarrow
16@4\times4
\rightarrow
32@3\times3
\rightarrow
32
\rightarrow
8
\rightarrow
2
$$

<p><strong>Schematic tensor labels reproduced from Fig. 1.</strong> The two outputs are the model's landslide and non-landslide class scores, and the reported susceptibility output lies between 0 and 1. The study does not evaluate whether these outputs are calibrated occurrence probabilities. The paper also does not fully specify the padding and reshaping operations, so this diagram should not be read as a complete implementation specification.</p>

</div>

### Why lithology was the first physics target

The 50-realization leave-one-factor-out experiment considered both the mean AUC and its spread. Omitting lithology produced the lowest mean and the widest range. River distance, road distance, and NDVI also produced comparatively broad distributions when removed. The authors interpreted these patterns as consistent with the roles of reservoir-level fluctuation, engineering activity, and vegetation cover in the study area, while noting that slope and curvature ranked lower than expected. Because the information was limited and the CNN can perform internal feature selection, all 12 factors were retained in the model. {% cite wei2021novel %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Factor removed</th><th>Mean AUC</th><th>Min–max AUC</th><th>Evidence in this experiment</th></tr>
  </thead>
  <tbody>
    <tr class="is-emphasized"><td>Lithology</td><td>0.929</td><td>0.877–0.955</td><td>Lowest mean and widest range</td></tr>
    <tr><td>Distance to rivers</td><td>0.932</td><td>0.892–0.948</td><td>One of the dominant factors identified by the authors</td></tr>
    <tr><td>Distance to roads</td><td>0.932</td><td>0.889–0.959</td><td>One of the dominant factors identified by the authors</td></tr>
    <tr><td>NDVI</td><td>0.936</td><td>0.884–0.955</td><td>One of the dominant factors identified by the authors</td></tr>
    <tr><td>Curvature</td><td>0.943</td><td>0.909–0.961</td><td>Lower importance than the authors expected</td></tr>
    <tr><td>Slope</td><td>0.946</td><td>0.918–0.962</td><td>Lower importance than the authors expected</td></tr>
    <tr><td>TWI</td><td>0.957</td><td>0.943–0.966</td><td>Highest mean AUC after removal among the rows shown</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    Selected leave-one-factor-out results from Fig. 7. These rankings apply to this study area and experiment; they are not universal factor rankings. {% cite wei2021novel %}
</div>

### The two roles assigned to physics

TRIGRS computes a time- and depth-dependent infinite-slope safety factor:

<div class="project-detail__equation" markdown="1">

$$
F_s(Z,t)=
\frac{\tan\phi'}{\tan\delta}
+
\frac{c'-\Psi(Z,t)\gamma_w\tan\phi'}
{\gamma_s Z\sin\delta\cos\delta}
$$

<p><strong>Variables.</strong> <span>$c'$</span> and <span>$\phi'$</span> are effective strength parameters; <span>$\delta$</span> is slope angle; <span>$Z$</span> is depth; <span>$\Psi(Z,t)$</span> is pressure head; and <span>$\gamma_w$</span> and <span>$\gamma_s$</span> are the unit weights of water and soil. The study uses TRIGRS output as an explanatory feature and screening criterion rather than as the final susceptibility prediction.</p>

</div>

The hybrid keeps 12 input channels but replaces lithology with the continuous $F_s$ map. For negative-sample screening, a $5\times5$ candidate window is retained only when the inventory label is 0 and its mean $F_s$ is greater than 2. The CNN remains the binary classifier. {% cite wei2021novel %}

The transformation changes the geological encoding rather than the 30 m spatial resolution: eight categorical lithologic units are converted into grid-level continuous $F_s$ values for the 199,184 Qinglian grids. The paper reports an $F_s$ range of 0–11. These values are outputs of an explicitly parameterized physical model, not quantities learned by the CNN. {% cite wei2021novel %}

<div class="project-detail__equation" markdown="1">

$$
Z(\delta)=
\begin{cases}
Z_{\max}\left(1-\dfrac{\delta}{40^\circ}\right), & \delta\le 40^\circ,\\[6pt]
0, & \delta>40^\circ.
\end{cases}
$$

<p><strong>Physical assumptions reported in the paper.</strong> Soil thickness decreases linearly from <span>$Z_{\max}$</span> on flat terrain to zero at a <span>$40^\circ$</span> slope; no soil is retained above that angle. The initial water table is placed 85% of the local soil thickness below the ground surface, soil properties are assigned by lithology, and the infinite-slope equation neglects inter-grid forces. Eq. (3) from {% cite wei2021novel %}.</p>

</div>

The screening threshold and the physical-evaluation threshold serve different purposes. A candidate negative training window must have mean $F_s>2$, whereas the soil-depth sensitivity analysis later evaluates stand-alone TRIGRS classification at the grid-level threshold $F_s=1.2$. {% cite wei2021novel %}

{% include figure.liquid path="assets/img/projects/research/hybrid-cnn-trigrs-workflow.png" class="img-fluid" alt="Flowchart of the 2021 CNN and CNN-TRIGRS hybrid models, including lithology replacement, safety-factor-based negative-sample screening, spatial training, and cross-region testing" zoomable=true %}

<div class="caption">
    The two integration points are visible in Steps 2–3: TRIGRS transforms lithology into grid-scale $F_s$ and pre-selects more likely stable negatives before CNN training. Fig. 3 from {% cite wei2021novel %}.
</div>

### Evaluation design

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Evaluation</th><th>Training data</th><th>Testing data</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td>Within-region</td><td>70% of a balanced Zhuyuan sample set</td><td>30% of that sample set</td><td>Check fitting when training and testing samples share the same region</td></tr>
    <tr><td>Cross-region</td><td>Zhuyuan</td><td>Qinglian Town, evaluated area-wide</td><td>Measure spatial generalization without Qinglian training labels</td></tr>
    <tr><td>Repeated cross-region</td><td>50 balanced training-set realizations from Zhuyuan</td><td>An area-wide Qinglian susceptibility prediction for each realization</td><td>Quantify variation caused by random training-sample selection</td></tr>
  </tbody>
</table>
</div>

The underlying 30 m inventory contains 6,673 landslide and 193,674 non-landslide grids in Zhuyuan, and 17,326 landslide and 181,858 non-landslide grids in Qinglian. Twelve conditioning factors are used: elevation, slope, aspect, curvature, NDVI, lithology, land use, distance to roads, distance to rivers, annual precipitation, TWI, and SPI. {% cite wei2021novel %}

### Quantitative evidence

<div class="project-detail__metrics" aria-label="Selected 2021 results">
  <div><strong>0.533 → 0.637</strong><span>Illustrative cross-region comparison: CNN versus hybrid without sample pre-selection</span></div>
  <div><strong>0.573 → 0.631</strong><span>Mean Qinglian AUC across 50 realizations: CNN versus screened hybrid</span></div>
  <div><strong>0.202 → 0.088</strong><span>Min–max AUC interval width across those realizations</span></div>
</div>

In the within-region 70/30 experiment, CNN and hybrid AUC values were 0.936 and 0.941. In one Zhuyuan-to-Qinglian realization, they were 0.533 and 0.637. The repeated cross-region experiment below provides the more informative comparison because it does not depend on one random training set. {% cite wei2021novel %}

<div class="project-detail__source-note"><strong>Source note.</strong> Sec. 4.1 and Fig. 8 report the within-region CNN AUC as 0.936; the paper's conclusion reports 0.929. The section-specific value is used here.</div>

Across 50 cross-region realizations, the hybrid without sample pre-selection increased mean AUC by 4.9% relative to CNN and reduced the min–max interval width by 24.8%. Adding $F_s$-based sample pre-selection increased mean AUC by a further 5.0% and reduced the hybrid interval width by 42.1%. {% cite wei2021novel %}

{% include figure.liquid path="assets/img/projects/research/hybrid-2021-auc-preselection.png" class="img-fluid" alt="AUC distributions of fifty Qinglian predictions from the CNN, the hybrid without sample pre-selection, and the hybrid with TRIGRS-based sample pre-selection" zoomable=true %}

<div class="caption">
    Fifty cross-region realizations separate the gain from replacing lithology with $F_s$ (CNN → unscreened hybrid) from the additional gain produced by negative-sample screening. Fig. 12 from {% cite wei2021novel %}.
</div>

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Model</th><th>Min</th><th>25%</th><th>Mean</th><th>75%</th><th>Max</th></tr>
  </thead>
  <tbody>
    <tr><td>CNN</td><td>0.469</td><td>0.537</td><td>0.573</td><td>0.612</td><td>0.671</td></tr>
    <tr><td>Hybrid, no pre-selection</td><td>0.504</td><td>0.577</td><td>0.601</td><td>0.634</td><td>0.656</td></tr>
    <tr class="is-emphasized"><td>Hybrid, with pre-selection</td><td>0.590</td><td>0.617</td><td>0.631</td><td>0.647</td><td>0.678</td></tr>
  </tbody>
</table>
</div>

### Spatial evidence beyond AUC

The cross-region failure was spatially structured. When the Zhuyuan-trained CNN was applied to Qinglian, most of the region was assigned very-low susceptibility, while moderate-to-very-high predictions were concentrated near rivers. The $J_2s$ unit absent from the training region formed a conspicuous failure area; the resulting AUC was 0.533. The authors attributed this pattern to the unlearned unit and the limited spatial differentiation provided by only eight categorical lithologic classes. {% cite wei2021novel %}

Replacing lithology with $F_s$ improved transfer but did not eliminate variation between random training sets. One unscreened hybrid realization reached AUC 0.637 and placed 51.9% of observed landslide grids in the moderate-to-very-high classes; it identified many river-adjacent landslides but continued to underestimate areas farther from rivers. A second realization reached only 0.603 and classified 28.3% of landslide grids as moderate-to-very-high. These contrasting maps motivated the 50-realization analysis rather than selection of one favorable map. {% cite wei2021novel %}

{% include figure.liquid path="assets/img/projects/research/hybrid-2021-qinglian-map.png" class="img-fluid" alt="Qinglian landslide susceptibility map from an illustrative 2021 screened CNN-TRIGRS realization, with five susceptibility classes, landslide inventory outlines, and AUC 0.634" zoomable=true %}

<div class="caption">
    An illustrative screened-hybrid realization in Qinglian. Its AUC is 0.634; the statistical screening gain is established by the 50-realization distributions above, not by comparing this single map with a different unscreened realization. Fig. 13 from {% cite wei2021novel %}.
</div>

In this screened realization, 60.4% of observed landslide grids fell in the moderate-to-very-high classes, including 44.9% in the very-high class. The class-specific relative landslide density supplies a complementary check to AUC:

<div class="project-detail__equation" markdown="1">

$$
R_i=
\frac{n_i/N_i}{\displaystyle\sum_j n_j/N_j}\times100,
$$

<p><span>$n_i$</span> is the number of landslide grids and <span>$N_i$</span> is the total number of grids in class <span>$i$</span>. For Fig. 13, <span>$R_i$</span> rises monotonically from 9.970 to 28.004 across the five susceptibility classes, indicating that mapped susceptibility and observed landslide density increase together. {% cite wei2021novel %}</p>

</div>

### Sensitivity of physical output versus hybrid prediction

The raw TRIGRS output is sensitive to the assumed maximum soil depth. At the stand-alone threshold $F_s=1.2$, increasing $Z_{\max}$ from 10 to 30 m raised TPR from 2.9% to 39.7%, while FPR rose from 3.0% to 32.6%. The $Z_{\max}=20$ and 30 m configurations produced TPR/FPR ratios of 1.24 and 1.22; the 10 m configuration produced a ratio below 1 and classified nearly the entire region as safe. {% cite wei2021novel %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Configuration</th><th>Stand-alone physical result</th><th>Mean screened-hybrid AUC</th><th>Screened-hybrid min–max AUC</th></tr>
  </thead>
  <tbody>
    <tr><td>$Z_{\max}=10$ m</td><td>TPR 2.9%; FPR 3.0%; TPR/FPR &lt; 1</td><td>0.626</td><td>0.556–0.659</td></tr>
    <tr class="is-emphasized"><td>$Z_{\max}=20$ m</td><td>TPR/FPR 1.24</td><td>0.631</td><td>0.590–0.678</td></tr>
    <tr><td>$Z_{\max}=30$ m</td><td>TPR 39.7%; FPR 32.6%; TPR/FPR 1.22</td><td>0.624</td><td>0.590–0.657</td></tr>
    <tr><td>CNN baseline</td><td>No TRIGRS classification</td><td>0.573</td><td>0.469–0.671</td></tr>
  </tbody>
</table>
</div>

Across the three tested soil-depth assumptions, the screened-hybrid mean remained between 0.624 and 0.631 even though the stand-alone physical maps changed substantially. This experiment clarifies the intended role of physics: TRIGRS supplies structured information to the CNN as a feature and screening criterion rather than serving as the final calibrated susceptibility predictor. {% cite wei2021novel %}

### Original contribution and stated boundaries

- The paper reports the first comprehensive attempt to combine CNN and TRIGRS for regional LSM. Physics is assigned two operational roles—feature construction and negative-sample screening—while CNN performs classification. {% cite wei2021novel %}
- The cross-region testing scheme and 50 realizations evaluate generalization and robustness rather than selecting one favorable result. {% cite wei2021novel %}
- Physics-based screening reduces the probability of drawing mislabeled negatives from an incomplete inventory; it does not reconstruct missing landslides. The field survey emphasized residential areas, so unstable or previously failed grids in remote areas could remain labeled as non-landslides. {% cite wei2021novel %}
- The paper describes the framework as preliminary. Future work proposed by the authors includes deeper/wider CNNs, transfer learning, and more complete inventories from radar, optical remote sensing, and field investigation. The framework was validated using Zhuyuan and Qinglian in Fengjie County. {% cite wei2021novel %}

## 2023 — Physical-module selection and training-sample uncertainty {#study-2023}

### From one hybrid to four

The 2023 paper is organized around three questions: whether a simplified infinite-slope module can replace TRIGRS without sacrificing hybrid performance; whether compatibility between the physical module and the dominant landslide mechanism affects transfer performance; and whether model averaging can reduce the variability caused by random selection of non-landslide training samples. {% cite wei2023comparison %}

All four models replace geological strata with $F_s$ and use a physics-based stable-sample criterion, but their failure mechanisms and hydrological assumptions differ. This design separates two questions that are easily conflated: whether a physics-derived representation helps the CNN, and whether the selected physical formulation is appropriate for the dominant landslide type. {% cite wei2023comparison %}

The spatial transfer problem remains concrete in this dataset: $J_2s$ is absent from Zhuyuan but present in Qinglian, while $J_2xs$ occupies little of the training region—with only one recorded training landslide—but approximately one-fifth of the testing region. The paper also reports differences in elevation, terrain variability, road–inventory distance, and annual precipitation between the two towns. {% cite wei2023comparison %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Hybrid</th><th>Physical module</th><th>Main physical assumption</th><th>How the grid-level $F_s$ is obtained</th></tr>
  </thead>
  <tbody>
    <tr><td>H1</td><td>TRIGRS</td><td>Richards-equation infiltration and grid runoff coupled to infinite-slope stability</td><td>Minimum computed $F_s$ across possible depths at the evaluated time</td></tr>
    <tr><td>H2</td><td>ISSM, natural condition</td><td>Deep groundwater and no seepage within the sliding mass; infiltration/runoff ignored</td><td>Natural-condition infinite-slope equation</td></tr>
    <tr class="is-emphasized"><td>H3</td><td>ISSM, saturated condition</td><td>Water table at the surface, full saturation, and seepage parallel to the slope</td><td>Saturated infinite-slope equation</td></tr>
    <tr><td>H4</td><td>Scoops3D</td><td>Bishop simplified analysis with spherical rotational trial surfaces, using the saturated soil parameters</td><td>Minimum across trial surfaces that affect each DEM grid</td></tr>
  </tbody>
</table>
</div>

### Sample construction and the 2023 CNN

The CNN receives $11\times11\times9$ samples. Nine channels represent elevation, slope, curvature, NDVI, geology or $F_s$, land use, distance to rivers, distance to roads, and annual precipitation. All landslide-grid samples are retained. An equal number of non-landslide samples is drawn after physics-based screening, and rotation is used for augmentation. The screening rule retains candidates whose center grid and eight neighbors have an average $F_s>1$. A realization therefore means a separately trained model built from a different random negative subset—not repeated evaluation of one fixed network. Mean AUC describes cross-region discrimination, while range and SD describe training-sample-selection variability. {% cite wei2023comparison %}

The 2023 CNN is both wider and deeper than the 2021 network. Three parallel branches learn channel weights and spatial patterns at different scales: $1\times1\rightarrow3\times3$, $1\times1\rightarrow5\times5$, and $3\times3$ max pooling followed by $1\times1$ convolution. Their feature maps are concatenated, passed through 32- and 64-filter convolutional stages, flattened, and processed by dense layers of 128, 64, 32, 16, and 8 units before the class output. The reported network contains 1,033,266 weights and biases and is trained with binary cross-entropy, back-propagation, and Adam. Fig. 4 does not separately draw the final two-unit output layer, so this is reported architecture rather than executable reconstruction code. {% cite wei2023comparison %}

Across all four physical modules, soil depth again decreases linearly to zero as slope increases from $0^\circ$ to $40^\circ$, and properties are assigned by geological stratum. TRIGRS alone uses an initial water table at 85% of soil depth. Table 3 reports natural soil unit weights of 21–22 kN/m³, natural cohesion of 32.8–42 kPa, and friction angles of $16^\circ$–$17.7^\circ$ across the eight units; the corresponding saturated ranges are 21.5–22.5 kN/m³, 26.2–39 kPa, and $13^\circ$–$15.2^\circ$. These stratum-wise assignments are inputs to the physical modules, not calibrated spatial fields. {% cite wei2023comparison %}

For the two simplified infinite-slope modules, the paper uses:

<div class="project-detail__equation" markdown="1">

$$
F_s^{\mathrm{natural}}
=
\frac{c'}{\gamma_s Z_{\max}\sin\delta\cos\delta}
+
\frac{\tan\phi'}{\tan\delta}
$$

$$
F_s^{\mathrm{saturated}}
=
\frac{c'}{\gamma_{\mathrm{sat}} Z_{\max}\sin\delta\cos\delta}
+
\frac{\gamma'\tan\phi'}{\gamma_{\mathrm{sat}}\tan\delta}
$$

<p><strong>Variables.</strong> <span>$Z_{\max}$</span> is maximum soil depth; <span>$\gamma_s$</span>, <span>$\gamma_{\mathrm{sat}}$</span>, and <span>$\gamma'$</span> are the natural, saturated, and submerged unit weights of soil. The two equations differ primarily in their groundwater and saturation assumptions.</p>

</div>

{% include figure.liquid path="assets/img/projects/research/hybrid-physical-modules.png" class="img-fluid" alt="Four physical modules compared in the 2023 hybrid-model study: TRIGRS, infinite-slope stability under natural and saturated conditions, and three-dimensional Scoops3D" zoomable=true %}

<div class="caption">
    The four physical modules differ in hydrological assumptions and failure-surface representation. Fig. 6 from {% cite wei2023comparison %}.
</div>

### Diagnosing the CNN-only transfer failure

In one realization, CNN AUC decreased from 0.812 over the Zhuyuan training region to 0.615 in Qinglian. The geology-specific diagnostic is more revealing: within Qinglian's $J_2s$-only area, the paper reports a mean AUC of 0.574, and 10% of the realizations fell below 0.5. The $J_2s$ unit is absent from training, while $J_2xs$ covers little of Zhuyuan—with one recorded training landslide—but roughly one-fifth of Qinglian. {% cite wei2023comparison %}

<div class="project-detail__source-note"><strong>Source note.</strong> Sec. 4.2/Fig. 12 and Fig. 15 contain non-identical 100-realization CNN summaries. Fig. 15 values are used below to keep the direct cross-model comparison internally consistent. {% cite wei2023comparison %}</div>

### Physical-model performance before hybridization

The three two-dimensional modules produced similar stand-alone AUC values in Qinglian, whereas Scoops3D produced approximately 0.45. The authors relate the lower Scoops3D performance to failure-mode applicability: the study inventory is dominated by shallow landslides, while Scoops3D searches spherical rotational surfaces suited to deep-seated failures. {% cite wei2023comparison %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Physical module</th><th>Mean $F_s$</th><th>SD of $F_s$</th><th>Stand-alone AUC</th></tr>
  </thead>
  <tbody>
    <tr><td>TRIGRS</td><td>2.601</td><td>2.789</td><td>0.568</td></tr>
    <tr><td>Natural ISSM</td><td>2.615</td><td>2.826</td><td>0.569</td></tr>
    <tr class="is-emphasized"><td>Saturated ISSM</td><td>2.211</td><td>2.881</td><td>0.587</td></tr>
    <tr><td>Scoops3D</td><td>1.407</td><td>0.454</td><td>≈0.45</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    Values from Fig. 14. Scoops3D is labeled 0.455 in the figure and 0.452 in the accompanying text, so the table reports approximately 0.45. {% cite wei2023comparison %}
</div>

Added process detail did not automatically produce a stronger regional physical predictor. The authors explain the similar TRIGRS, natural-ISSM, and saturated-ISSM AUC values by the difficulty of obtaining accurate regional soil properties and depths, unrepresented spatiotemporal input uncertainty, and omitted effects of engineering construction and vegetation on infiltration and runoff. This is the authors' interpretation of the comparison, not an independent causal experiment. {% cite wei2023comparison %}

Scoops3D produced a more spatially concentrated $F_s$ field and the smallest $F_s$ SD because it considers interactions among soil columns. That physically more structured output did not yield the best susceptibility discrimination: its spherical rotational surfaces were less compatible with the shallow colluvial landslides that dominate the inventory. The comparison therefore tests physical applicability rather than treating physical-model complexity as a proxy for hybrid quality. {% cite wei2023comparison %}

### One hundred realizations: accuracy and robustness are different criteria

{% include figure.liquid path="assets/img/projects/research/susceptibility-auc-distributions.png" class="img-fluid" alt="AUC distributions over one hundred realizations for CNN and the H1, H2, and H3 physics-guided CNN models" zoomable=true %}

<div class="caption">
    The three shallow-slope hybrids have nearly identical mean AUC, but H3 has the narrowest min–max range and the smallest SD. Values in the table below are transcribed from Fig. 15. {% cite wei2023comparison %}
</div>

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Model</th><th>Min</th><th>Q1</th><th>Mean</th><th>Q3</th><th>Max</th><th>SD</th></tr>
  </thead>
  <tbody>
    <tr><td>CNN</td><td>0.472</td><td>0.559</td><td>0.596</td><td>0.635</td><td>0.693</td><td>0.049</td></tr>
    <tr><td>H1: CNN + TRIGRS</td><td>0.550</td><td>0.666</td><td>0.686</td><td>0.711</td><td>0.739</td><td>0.038</td></tr>
    <tr><td>H2: CNN + natural ISSM</td><td>0.563</td><td>0.666</td><td>0.685</td><td>0.712</td><td>0.735</td><td>0.036</td></tr>
    <tr class="is-emphasized"><td>H3: CNN + saturated ISSM</td><td>0.598</td><td>0.675</td><td>0.684</td><td>0.700</td><td>0.723</td><td>0.021</td></tr>
    <tr><td>H4: CNN + Scoops3D</td><td>0.518</td><td>0.591</td><td>0.618</td><td>0.646</td><td>0.700</td><td>0.045</td></tr>
  </tbody>
</table>
</div>

The paper attributes H3's smaller variability to its impact on negative-sample screening under the shared $F_s>1$ criterion. H1 and H2 did not effectively remove candidate negatives because the minimum values in their physical-module $F_s$ maps exceeded the cutoff. H3 did remove candidates and therefore reduced the chance of sampling unstable grids as negatives. H4 improved mean AUC through the continuous $F_s$ representation, but its SD of 0.045 remained close to the CNN value of 0.049 because its $F_s$ field also did not effectively pre-screen negatives. {% cite wei2023comparison %}

Among H1–H3, H3 was recommended because its realization distribution had the highest minimum, narrowest range, and smallest SD—not because it had the highest mean, which was slightly larger for H1. In the separate H3–H4 comparison, the paper explains H3's advantage by the saturated infinite-slope module's greater suitability for the shallow landslides that dominate the inventory, compared with Scoops3D's spherical rotational surfaces. {% cite wei2023comparison %}

### Model averaging in Qinglian and Wushan

<div class="project-detail__equation" markdown="1">

$$
\overline{\mathbf{Y}}
=
\frac{1}{m}
\sum_{r=1}^{m}a_r\mathbf{Y}_r,
\qquad a_r=1
$$

<p>The study uses a uniform element-wise average of independently trained susceptibility matrices.</p>

</div>

{% include figure.liquid path="assets/img/projects/research/hybrid-2023-realization-maps.png" class="img-fluid" alt="Three Qinglian susceptibility maps from independently trained H3 realizations with visibly different spatial patterns and AUC values of 0.717, 0.685, and 0.639" zoomable=true %}

<div class="caption">
    Three independently trained H3 realizations produce different spatial patterns even though the architecture and physical module are unchanged. Their AUC values are 0.717, 0.685, and 0.639. Fig. 17 from {% cite wei2023comparison %}.
</div>

The averaging rationale is not majority voting over class labels. It is an element-wise average of continuous susceptibility fields. Under the paper's error–ambiguity explanation, averaging effectiveness depends jointly on the accuracy and spatial diversity of the individual realizations. {% cite wei2023comparison %}

In Qinglian, 20 random H3 realizations ranged from 0.626 to 0.723. Averaging subsets of 5, 10, 15, and all 20 realizations yielded AUC values of 0.708, 0.709, 0.705, and 0.705. These averages exceeded most, but not the best, individual Qinglian realization. {% cite wei2023comparison %}

Threshold-specific TPR/FPR ratios provide a second evaluation of the five-realization H3 average. At every listed susceptibility-class threshold, H3 has the largest ratio among CNN, saturated ISSM, and the hybrid average:

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Classification threshold</th><th>CNN</th><th>Saturated ISSM</th><th>H3 average</th></tr>
  </thead>
  <tbody>
    <tr class="is-emphasized"><td>Very high</td><td>1.445</td><td>1.398</td><td>2.106</td></tr>
    <tr><td>High</td><td>1.279</td><td>1.251</td><td>1.885</td></tr>
    <tr><td>Moderate</td><td>1.203</td><td>1.179</td><td>1.528</td></tr>
    <tr><td>Low</td><td>1.075</td><td>1.113</td><td>1.216</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    TPR/FPR ratios from Table 4; the lower bound of each susceptibility class is used as the binary threshold. At the very-high threshold, H3 has FPR 0.179 and TPR 0.377, giving 2.106. {% cite wei2023comparison %}
</div>

Wushan provides a second, substantially larger transfer test. Its area is 2,954.7 km²—approximately 12 times the training area—and the study reports about 960 landslides. Five H3 realizations trained without Wushan data produced AUC values of 0.760, 0.785, 0.817, 0.683, and 0.703; their uniform average reached **0.834**, exceeding all five. {% cite wei2023comparison %}

Wushan is not simply a larger holdout. Its geological and topographic conditions differ substantially from Zhuyuan, and many inventory records lie along the Three Gorges Reservoir banks. No Wushan data were used for training. In the paper's visual assessment, the high and very-high zones of the averaged map capture almost all mapped records. {% cite wei2023comparison %}

{% include figure.liquid path="assets/img/projects/research/hybrid-wushan-validation.png" class="img-fluid" alt="Wushan landslide susceptibility map produced by averaging five H3 realizations and ROC curves for the five individual realizations and their average" zoomable=true %}

<div class="caption">
    Wushan validation: the averaged map and ROC curve combine five H3 realizations without Wushan model training. Fig. 20 from {% cite wei2023comparison %}.
</div>

### Original contribution and stated limitations

- The paper shows that choosing a physically based module requires both physical-module performance and compatibility with the dominant landslide mechanism; adding a more three-dimensional model does not automatically improve the hybrid. {% cite wei2023comparison %}
- It evaluates mean performance and realization-to-realization variability separately, then tests uniform model averaging as a way to address variation caused by random training-sample selection. {% cite wei2023comparison %}
- The formal limitations state that spatial variability of soil properties and temporal changes in conditioning factors and inventories were not considered. Proposed next steps include failure-probability or reliability-index screening, multi-temporal data, and transfer learning. {% cite wei2023comparison %}

## 2024 — Key design elements in pixel-based mapping {#study-2024}

### What the 2024 study isolates

The 2024 paper moves from proposing a hybrid to dissecting why it performs as it does. Rather than treating hybrid-model performance as a single aggregate gain, it examines five design levers through a sequence of controlled comparisons: physics-derived explanatory-factor nonlinearity, pixel spatial neighborhoods, data-driven algorithmic nonlinearity, model-parameter count, and data quantity and quality. {% cite wei2024improving %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Controlled experiment</th><th>What is changed</th><th>What is held conceptually fixed</th></tr>
  </thead>
  <tbody>
    <tr><td>Physics-derived representation</td><td>Geological class versus saturated-ISSA $F_s$</td><td>Single-pixel LR framework</td></tr>
    <tr><td>Factor reduction</td><td>Starting with nine factors; one factor removed at each step after coefficient refitting</td><td>Hybrid Model I and 30 m inputs</td></tr>
    <tr><td>Input resolution</td><td>1,000 m versus 30 m land cover</td><td>Elevation, land cover, and $F_s$</td></tr>
    <tr><td>Spatial context</td><td>Single-pixel versus local-area samples from 90 to 390 m</td><td>Selected factors and cross-region test</td></tr>
    <tr><td>Algorithmic nonlinearity</td><td>LR versus compact CNN at common local-area sizes</td><td>Same physical module and factor channels</td></tr>
    <tr><td>Data scarcity</td><td>Training pool reduced from 100% to 1%</td><td>Three-factor, 270 m configurations</td></tr>
    <tr><td>New-region transfer</td><td>Direct application in Wushan</td><td>No Wushan-label fine-tuning or calibration</td></tr>
  </tbody>
</table>
</div>

Hybrid Model I combines logistic regression with saturated infinite-slope stability analysis; Hybrid Model II combines a deliberately compact CNN with the same physical module. The common data pipeline merges factor maps into a multichannel image, converts geology into $F_s$, discretizes the data to 30 m pixels, reconstructs single-pixel or local-area samples with a sliding window, screens candidate negatives using sample-average $F_s$, and down-samples the retained negatives to match the landslide-sample count. {% cite wei2024improving %}

The physical module is the saturated infinite-slope stability analysis:

<div class="project-detail__equation" markdown="1">

$$
F_s
=
\frac{c'}{H\gamma_{\mathrm{sat}}\sin\delta\cos\delta}
+
\frac{\gamma'\tan\phi'}{\gamma_{\mathrm{sat}}\tan\delta}
$$

<p><strong>Variables.</strong> <span>$c'$</span> and <span>$\phi'$</span> are effective cohesion and friction angle; <span>$\delta$</span> is slope angle; <span>$H$</span> is soil thickness; and <span>$\gamma_{\mathrm{sat}}$</span> and <span>$\gamma'$</span> are saturated and submerged soil unit weights. The resulting <span>$F_s$</span> is used as a nonlinear explanatory factor in both hybrid models.</p>

</div>

The more general ISSA formulation contains the groundwater-depth ratio $k=h_w/H$. The paper sets $k=1$ for the saturated condition because regional water-table depths are difficult to obtain and the preceding comparison found limited change in average hybrid performance across the tested saturation assumptions. {% cite wei2024improving %}

### Controlled model and sample design

The distinction between a single pixel and a local area is explicit in the regression model. For $c$ explanatory factors, single-pixel LR uses one value per factor:

<div class="project-detail__equation" markdown="1">

$$
\operatorname{logit}(p)
=
\ln\left(\frac{p}{1-p}\right)
=
\sum_{k=1}^{c}w_kx_k+w_0.
$$

For an $n\times n$ local area, each factor at each neighboring grid receives its own coefficient:

$$
\operatorname{logit}(p)
=
\ln\left(\frac{p}{1-p}\right)
=
\sum_{i=1}^{n}\sum_{j=1}^{n}\sum_{k=1}^{c}w_{ijk}x_{ijk}+w_0.
$$

<p>The sample shapes are <span>$1\times1\times c$</span> and <span>$n\times n\times c$</span>, respectively. In both cases the target is the landslide probability of the center grid. Eqs. (3)–(4) from {% cite wei2024improving %}.</p>

</div>

{% include figure.liquid path="assets/img/projects/research/susceptibility-sample-construction.png" class="img-fluid" alt="Comparison of single-pixel and local-area samples: a single value per factor versus a spatial tensor of neighboring grids whose center grid is the prediction target" zoomable=true %}

<div class="caption">
    Single-pixel and local-area sample construction. The local-area LR assigns a separate coefficient to every factor at every location in the neighborhood. Fig. 4 from {% cite wei2024improving %}.
</div>

The CNN is intentionally constrained to make the LR–CNN comparison interpretable: one convolutional stage, one dense output stage, and parallel $1\times1$ and $3\times3$ filters. The resulting feature maps are flattened and passed to a sigmoid output trained with binary cross-entropy. Weight sharing and local connectivity allow the $9\times9\times3$ CNN configuration to use fewer reported parameters than local-area LR—163 versus 244—despite its greater algorithmic nonlinearity. {% cite wei2024improving %}

### Physics-derived factors and factor reduction

In the Table 3 comparison, where testing AUC is calculated after excluding the $J_2s^2$ area because that unit is absent from the training region, replacing geological information with $F_s$ increased LR training AUC from 0.623 to 0.695 and testing AUC from 0.648 to 0.682. Because the explanatory factors were Min–Max normalized and no multicollinearity was found, the fitted coefficients can be compared directly: the coefficient of $F_s$ was $-1.604$, versus $-0.232$ for the original geological/lithological factor. The negative $F_s$ coefficient is consistent with lower susceptibility at higher stability. {% cite wei2024improving %}

The physics-derived feature addresses two distinct problems. First, $J_2s^2$ is absent from the training region, so ordinary LR cannot learn a category–response relation for that unit; continuous $F_s$ provides a representation in the same numerical domain across both regions. Second, $F_s$ is a nonlinear combination of slope geometry, soil strength, unit weight, and saturation assumptions. The paper's XOR illustration is conceptual rather than a landslide-data experiment: it shows how a constructed nonlinear feature can make a previously inseparable input space linearly separable. {% cite wei2024improving %}

The step-wise deletion procedure is itself part of the experimental contribution. At each step, LR is refitted, the coefficients of all remaining factors are recalculated, and the factor with the smallest absolute fitted coefficient is removed. The deletion order is curvature → NDVI → annual precipitation → distance to roads → slope → distance to rivers. This leaves elevation, land cover, and $F_s$; the next deletion removes $F_s$, followed by elevation. {% cite wei2024improving %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Step</th><th>Factors retained</th><th>Training AUC</th><th>Testing AUC</th><th>Factor removed next</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>9</td><td>0.695</td><td>0.685</td><td>Curvature</td></tr>
    <tr><td>2</td><td>8</td><td>0.695</td><td>0.685</td><td>NDVI</td></tr>
    <tr><td>3</td><td>7</td><td>0.695</td><td>0.686</td><td>Annual precipitation</td></tr>
    <tr><td>4</td><td>6</td><td>0.694</td><td>0.683</td><td>Distance to roads</td></tr>
    <tr><td>5</td><td>5</td><td>0.690</td><td>0.687</td><td>Slope</td></tr>
    <tr><td>6</td><td>4</td><td>0.687</td><td>0.690</td><td>Distance to rivers</td></tr>
    <tr class="is-emphasized"><td>7</td><td>3: elevation + land cover + $F_s$</td><td>0.690</td><td>0.691</td><td>$F_s$</td></tr>
    <tr><td>8</td><td>2: elevation + land cover</td><td>0.679</td><td>0.675</td><td>Elevation</td></tr>
    <tr><td>9</td><td>1: land cover</td><td>0.651</td><td>0.636</td><td>—</td></tr>
  </tbody>
</table>
</div>

Steps 1–7 maintain testing AUC between 0.683 and 0.691. Removing $F_s$ in Step 8 reduces it to 0.675, supporting the three-factor minimum reported by the paper. {% cite wei2024improving %}

<div class="project-detail__source-note"><strong>Source note.</strong> Table 3 excludes the $J_2s^2$ area for comparison with ordinary LR and reports testing AUC 0.682; the subsequent Table 4 step-wise Hybrid I experiment reports full-region testing AUC 0.685 at Step 1. These are experiment-specific values rather than a rounding difference.</div>

### Data resolution and spatial neighborhood

Using the three-factor Hybrid I, 1,000 m land-cover data produced training/testing AUC values of 0.647/0.655; 30 m data produced 0.690/0.691, a reported 5.5% testing-AUC increase. The fitted land-cover coefficient also changed from 0.666 at 1,000 m to $-3.916$ at 30 m. The paper treats this as evidence that resolution materially changes how the model uses land cover; the coefficient sign is not given an additional physical interpretation. {% cite wei2024improving %}

For spatial context, single-pixel Hybrid I begins at 0.691. Local-area samples raise its AUC to approximately 0.72, which the paper summarizes as an approximately 4.2% increase. Hybrid Model I reaches its highest plotted value, 0.727, at 210 m and obtains 0.726 at 270 m. Hybrid Model II reaches its maximum of 0.739 at 270 m. The authors adopt 270 m as the common sample size for the subsequent controlled comparison and Wushan application. {% cite wei2024improving %}

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Sample side length</th><th>Hybrid I: LR + ISSA</th><th>Hybrid II: CNN + ISSA</th></tr>
  </thead>
  <tbody>
    <tr><td>30 m</td><td>0.691</td><td>Not plotted</td></tr>
    <tr><td>90 m</td><td>0.716</td><td>0.718</td></tr>
    <tr><td>150 m</td><td>0.726</td><td>0.729</td></tr>
    <tr><td>210 m</td><td><strong>0.727</strong></td><td>0.733</td></tr>
    <tr class="is-emphasized"><td>270 m</td><td>0.726</td><td><strong>0.739</strong></td></tr>
    <tr><td>330 m</td><td>0.721</td><td>0.731</td></tr>
    <tr><td>390 m</td><td>0.719</td><td>0.727</td></tr>
  </tbody>
</table>
</div>

The section text lists sample sizes through 330 m, whereas Fig. 11 also plots 390 m; the table follows the values shown in Fig. 11. {% cite wei2024improving %}

The inventory's mean landslide area is 56,287.1 m², corresponding to an equivalent square side of 237.2 m. The authors offer this scale correspondence—and the irregular, elongated shape of real landslides—as a possible explanation for the strong performance near 270 m. They also note that increasingly large windows can introduce information redundant to the stability of the center slope. {% cite wei2024improving %}

{% include figure.liquid path="assets/img/projects/research/spatial-window-performance.png" class="img-fluid" alt="Testing AUC of the logistic-regression and CNN hybrid models for sample spatial sizes from 30 to 390 metres" zoomable=true %}

<div class="caption">
    Hybrid Model I rises from 0.691 for a single 30 m pixel to about 0.72 with local-area samples. Hybrid Model II is higher than Hybrid Model I at every common tested local-area size. Fig. 11 from {% cite wei2024improving %}.
</div>

At the common 270 m configuration, replacing LR with CNN increases AUC from 0.726 to 0.739, a difference of 0.013. By comparison, adding spatial context raises Hybrid I from 0.691 to roughly 0.72. Under the tested configurations, the paper therefore concludes that pixel-neighborhood information has a larger effect than increasing data-driven algorithmic nonlinearity. Its XOR example with a four-neuron hidden layer is a conceptual demonstration of algorithmic nonlinearity, not an additional landslide-data result. {% cite wei2024improving %}

### Model complexity, training quantity, and Wushan

The full training pool contains 52,696 samples. As the selected proportion decreases, testing AUC initially remains stable and then declines. Hybrid Model I falls earlier and more rapidly: at 20%, 5%, and 1% of the available pool, its AUC values are 0.720, 0.697, and 0.619, compared with 0.732, 0.722, and 0.632 for Hybrid Model II. The paper does not infer a universal minimum training percentage from this experiment. {% cite wei2024improving %}

{% include figure.liquid path="assets/img/projects/research/susceptibility-training-data-quantity.png" class="img-fluid" alt="Testing AUC of Hybrid Models I and II as the selected training pool is reduced from 100 percent to 1 percent" zoomable=true %}

<div class="caption">
    Training-data-quantity experiment. Hybrid Model II remains more stable as the sample pool becomes small. Fig. 14 from {% cite wei2024improving %}.
</div>

For the three-factor, 270 m ($9\times9$) local-area configuration, Hybrid Model I has $9\times9\times3+1=244$ fitted coefficients. The compact CNN has 163 reported parameters. The paper associates its greater sample-efficiency with weight sharing and local connectivity; the comparison is specific to this deliberately compact architecture rather than to CNNs in general. {% cite wei2024improving %}

### Transfer to Wushan without local calibration

Wushan does not provide the same categorical geological-stratum product used in Zhuyuan and Qinglian. The study instead uses an engineering geological map, estimates soil properties from its lithological descriptions, and runs ISSA to generate the common $F_s$ representation. Both models then use elevation, 30 m land cover, $F_s$, and 270 m local-area samples. No Wushan landslide labels are used to fine-tune or calibrate either model. {% cite wei2024improving %}

The resulting AUC values are **0.745** for Hybrid Model I and **0.756** for Hybrid Model II. At the highest listed quantile threshold, their absolute metrics are nearly identical:

<div class="table-responsive project-detail__table project-detail__table--wide">
<table>
  <thead>
    <tr><th>Model</th><th>Threshold</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>FPR</th><th>F1</th></tr>
  </thead>
  <tbody>
    <tr><td>Hybrid I</td><td>0.757</td><td>0.803</td><td>0.039</td><td>0.604</td><td>0.195</td><td>0.073</td></tr>
    <tr class="is-emphasized"><td>Hybrid II</td><td>0.764</td><td>0.803</td><td>0.039</td><td>0.605</td><td>0.195</td><td>0.074</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    Threshold-specific values from Table 8. They complement, but are not interchangeable with, threshold-independent AUC. {% cite wei2024improving %}
</div>

The paper discusses low precision and comparatively high FPR in relation to inventory incompleteness. Field surveys emphasize roads and populated areas, so some highly susceptible remote areas without mapped records may not be genuine false predictions. It also notes that landslide polygons can include runout zones that may have been stable before failure. {% cite wei2024improving %}

{% include figure.liquid path="assets/img/projects/research/susceptibility-wushan-maps.png" class="img-fluid" alt="Wushan susceptibility maps produced by Hybrid Model I and Hybrid Model II without local label fine-tuning, with AUC values of 0.745 and 0.756" zoomable=true %}

<div class="caption">
    Direct Wushan application without local-label fine-tuning: Hybrid Model I (left) and Hybrid Model II (right). Fig. 18 from {% cite wei2024improving %}.
</div>

### Original contribution and stated limitations

- The paper separates the effects of physics-derived explanatory factors, neighborhood information, algorithmic nonlinearity, parameter count, input quantity, and spatial resolution instead of treating hybrid performance as a single undifferentiated gain. {% cite wei2024improving %}
- It shows that the LR hybrid can retain cross-region AUC close to that of the compact CNN hybrid while offering greater practicality and interpretability; the compact CNN provides a marginal AUC increase and greater stability as training data are reduced. {% cite wei2024improving %}
- The methods state several modeling assumptions: saturated condition $k=1$; seepage parallel to the slope; neglected inter-pixel forces; identical estimated soil parameters within each geological unit; and a linear relation between LR predictors and log odds. These are stated assumptions rather than results of the ablation experiments. {% cite wei2024improving %}
- The discussion notes that field inventories may underrepresent remote areas, mapped polygons may include runout zones that were stable before failure, and higher-resolution inventories and factors could improve evaluation. It proposes InSAR, LiDAR, UAV imagery, and image recognition as possible routes to a more complete inventory. Wushan is evaluated without local calibration. {% cite wei2024improving %}

## Synthesis across the three studies {#core-synthesis}

<div class="table-responsive project-detail__table project-detail__program-matrix">
<table>
  <thead>
    <tr><th>Scientific question</th><th>2021</th><th>2023</th><th>2024</th></tr>
  </thead>
  <tbody>
    <tr><td>How should physics enter the model?</td><td>Use $F_s$ as a continuous feature and sample-screening criterion</td><td>Compare four candidate physical modules and their failure assumptions</td><td>Quantify the weight and practical value of the physics-derived factor</td></tr>
    <tr><td>How should transfer be evaluated?</td><td>Train in Zhuyuan and test in Qinglian</td><td>Add 100 realizations and Wushan validation</td><td>Repeat Wushan evaluation with LR and compact CNN hybrids</td></tr>
    <tr><td>How are data and model variability investigated?</td><td>Quantify the effect of random negative-sample selection over 50 balanced training-set realizations</td><td>Compare 100 realizations, select the module with lower realization-to-realization variability, and average susceptibility matrices</td><td>Hold the physical module fixed while testing training-data quantity, parameter count, spatial context, and input resolution</td></tr>
    <tr><td>What is the practical model-design lesson?</td><td>In the tested Zhuyuan-to-Qinglian transfer, $F_s$ improved the geological representation and reduced negative-sample-selection uncertainty</td><td>Match the physical module to the dominant failure mode; greater model complexity alone does not ensure better hybrid performance</td><td>Under the tested LR and compact-CNN configurations, spatial-neighborhood information produced a larger AUC gain than additional data-driven nonlinearity; training quantity and input resolution also affected performance</td></tr>
  </tbody>
</table>
</div>

## Related collaborative extensions

Related collaborative work addresses dense regional prediction and probabilistic calibration of physically based slope models. These studies complement the core papers but solve distinct methodological problems.

### Dense probability-field prediction with U-Net

U-Net changes the mapping from “local area → center-pixel probability” to “local multi-channel area → complete probability matrix.” The model uses $16\times16\times10$ inputs, an encoder–decoder structure, skip connections, and overlapping output averaging. Across 20 realizations, mean AUC was 0.868 in the training region and 0.661 in the cross-region evaluation; averaging 20 cross-region matrices yielded 0.684. {% cite tan2024study %}

{% include figure.liquid path="assets/img/projects/research/unet-susceptibility-framework.png" class="img-fluid" alt="Three-panel U-Net landslide susceptibility framework showing spatial sampling, encoder-decoder learning with skip connections, and probability-map reconstruction" zoomable=true %}

<div class="caption">
    U-Net sampling, encoder–decoder architecture, and regional probability-map reconstruction. Fig. 1 from {% cite tan2024study %}.
</div>

### Spatial calibration of the physical model

A DCT–Bayesian method represents a spatially varying friction-angle field with retained DCT coefficients and estimates them from stable/unstable observations. In the Qinglian case, calibration raised AUC from 0.516 to 0.842, with TPR 0.588 and FPR 0.026. The spatial field is inferred rather than directly measured. {% cite luo2022probabilistic %}

{% include figure.liquid path="assets/img/projects/research/dct-calibration-results.png" class="img-fluid" alt="Calibrated regional results showing factor of safety, failure probability, inferred friction angle, and ROC curves" zoomable=true %}

<div class="caption">
    MAP-estimated safety, failure probability, friction-angle field, and ROC comparison. Fig. 18 from {% cite luo2022probabilistic %}.
</div>

### Efficient Bayesian calibration with PCE

For coupled hydro-mechanical models, polynomial-chaos expansion approximates repeated numerical responses inside Bayesian MCMC:

<div class="project-detail__equation" markdown="1">

$$
\widehat{F}(\boldsymbol{\theta})
=
d_0\Psi_0(\boldsymbol{\theta})
+
\sum_{i=1}^{U-1}d_i\Psi_i(\boldsymbol{\theta})
$$

</div>

In the 2023 numerical example, the complete proposed method—including surrogate training—required 1.69 h, compared with 207.5 h for Bayesian estimation using the numerical model directly. Pore-pressure responses were most informative for hydraulic parameters, while displacement responses were more informative for stiffness and strength. {% cite zhang2023polynomial %}

{% include figure.liquid path="assets/img/projects/research/pce-bayesian-workflow.png" class="img-fluid" alt="Two-stage workflow for constructing polynomial-chaos surrogate models and using them in Bayesian MCMC parameter estimation" zoomable=true %}

<div class="caption">
    PCE surrogate construction followed by Bayesian parameter estimation. The numerical example uses model responses with 3% artificial Gaussian noise. Fig. 2 from {% cite zhang2023polynomial %}.
</div>

Earlier PCE-based probabilistic back-analysis produced posterior statistics and 95% prediction intervals close to direct numerical-model back-analysis for the same synthetic slope response. {% cite wu2018probabilistic %}

<div class="project-detail__figure--portrait">
{% include figure.liquid path="assets/img/projects/research/pce-back-analysis-uncertainty.png" class="img-fluid" alt="Numerical-model and PCE-based back-analysis pore-pressure responses with 95 percent prediction intervals and synthetic data" zoomable=true %}

<div class="caption">
    Numerical-model and PCE-based back-analysis intervals in the 2018 numerical example. Fig. 7 from {% cite wu2018probabilistic %}.
</div>
</div>

The DCT-inferred regional friction-angle field cannot be checked directly because the actual field is unknown. The two PCE studies demonstrate their methods through numerical examples rather than field deployments. {% cite luo2022probabilistic zhang2023polynomial wu2018probabilistic %}

</div>
