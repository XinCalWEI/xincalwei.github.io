---
layout: page
title: Submarine Debris-Flow Runout and Pipeline Risk
description: Regional runout simulations capture material softening over complex seabed terrain, then estimate pipeline impact, network damage, and the benefits of rerouting.
img: assets/img/projects/covers/submarine-pipeline-risk.png
cover_fit: cover
cover_position: 50% 50%
cover_alt: "Conceptual illustration of submarine debris-flow runout intersecting a seabed pipeline network, with an alternative route outside the main impact corridor."
importance: 4
category: Prospective Modelling
sub_area: Risk
toc:
  sidebar: right
related_publications: true
---

<div class="project-detail prose" markdown="1">

<p class="project-detail__eyebrow">Submarine geohazards · Regional simulation · Infrastructure risk</p>

<div class="project-detail__lede" markdown="1">
This project links two complementary research layers. The first resolves how submarine debris flows propagate and soften over regional three-dimensional terrain. The second carries the evolving thickness and velocity fields into a distributed model of pipeline impact, segment failure, network capacity, and route-level risk. {% cite chen2023simulation chen2022debris %}
</div>

<div class="project-detail__facts" aria-label="Project overview">
  <div><strong>Terrain</strong><span>GIS representation of regional three-dimensional seabed topography</span></div>
  <div><strong>Hazard</strong><span>Runout, thickness, velocity, and material-strength evolution</span></div>
  <div><strong>Risk</strong><span>Pipeline forces, segment failure, network capacity, and mitigation</span></div>
</div>

## Research questions

1. How can regional submarine debris-flow runout be simulated efficiently on complex natural terrain while retaining the effects of progressive material softening?
2. How do the resulting thickness and velocity fields translate into spatially distributed pipeline impact, network damage, and practical routing decisions?

## Layer 1: regional runout with material softening

The runout model solves one-dimensional depth-averaged mass and momentum equations on a GIS grid. Each cell can exchange material through eight directions, allowing the model to follow thickness, velocity, flow direction, cumulative basal shear strain, and evolving yield strength across a regional domain. A Herschel–Bulkley rheology represents plug and sheared layers. {% cite chen2023simulation %}

<div class="project-detail__equation" markdown="1">

$$
\tau_y=\tau_{y,\infty}+\left(\tau_{y,0}-\tau_{y,\infty}\right)e^{-\delta\gamma}
$$

<p><strong>Interpretation.</strong> Yield strength decreases from its initial value <span>$\tau_{y,0}$</span> toward a residual value <span>$\tau_{y,\infty}$</span> as basal shear strain <span>$\gamma$</span> accumulates. The softening factor <span>$\delta$</span> controls how quickly that loss of strength occurs.</p>

</div>

The regional solver was checked against a flume test, two three-dimensional slump tests, and the St Niklausen submarine slide. In the flume comparison, simulated runout was 11.8 m—0.2 m below the experiment—and the mean deposit-thickness difference was 0.013 m. Material softening is neglected in these validation cases. {% cite chen2023simulation %}

{% include figure.liquid path="assets/img/projects/research/submarine-runout-validation.png" class="img-fluid" alt="Three profiles comparing the St Niklausen submarine slide deposit from a seismic reflection profile, a coupled Eulerian-Lagrangian model, and the regional depth-averaged model" zoomable=true %}

<div class="caption">
    St Niklausen validation: seismic-reflection deposit geometry, a previous CEL result, and the proposed model produce comparable runout and deposit-thickness distributions. Fig. 9 from {% cite chen2023simulation %}.
</div>

{% include figure.liquid path="assets/img/projects/research/submarine-softening-effect.png" class="img-fluid" alt="Four simulated submarine debris-flow deposits showing greater lateral spreading as the material-softening factor increases" zoomable=true %}

<div class="caption">
    An idealized continental-shelf example shows how increasing the modeled softening factor changes the final deposit footprint. Cropped from Fig. 12 in {% cite chen2023simulation %}.
</div>

Using a hypothesized initial mass on the Shenhu terrain, the model used 70,069 cells over 28.03 km². The simulated flow largely stopped after about 3,600 s. Across eight monitoring points, maximum velocity ranged from **10.26 to 19.72 m/s** and maximum thickness from **8.56 to 34.88 m**. Within the tested parameter range, higher yield strength shortened runout, while stronger softening increased both runout and affected area. {% cite chen2023simulation %}

## Layer 2: impact and pipeline-network performance

The distributed pipeline model adds three modules: spatial discretization, regional debris-flow dynamics, and pipeline impact/damage evaluation. Flow direction matters because the radial impact force is generally much larger when the pipeline axis is nearly perpendicular to the moving debris. Segment failures are then propagated through the network according to the remaining transport capacity. {% cite chen2022debris %}

<div class="project-detail__equation" markdown="1">

$$
D_{\mathrm{network}}=1-I_{\mathrm{network}},
\qquad
R_{\mathrm{network}}=\sum_{i=1}^{m}P_{f,i}D_{\mathrm{network},i}
$$

<p><strong>Interpretation.</strong> <span>$I_{\mathrm{network}}$</span> is the fraction of transport capacity retained after damaged segments are removed. Across <span>$m$</span> mutually exclusive debris-flow events, scenario risk combines each event's assumed probability with its modeled network-capacity loss.</p>

</div>

{% include figure.liquid path="assets/img/projects/research/submarine-pipeline-impact.png" class="img-fluid" alt="Time sequence of a simulated submarine debris flow crossing a pipeline network with corresponding impact velocity, radial force, and axial force profiles" zoomable=true %}

<div class="caption">
    A baseline scenario tracks the flow as it crosses four pipeline locations and resolves the associated velocity and force profiles. Cropped from Fig. 5 in {% cite chen2022debris %}.
</div>

## What the modeled scenarios show

<div class="project-detail__metrics" aria-label="Selected quantitative findings">
  <div><strong>11.1 m/s</strong><span>Maximum pipeline impact velocity in the baseline network scenario</span></div>
  <div><strong>39.3 kN/m</strong><span>Maximum radial impact force in that scenario, versus 4.9 kN/m axially</span></div>
  <div><strong>0.12 → 0</strong><span>Scenario risk reduced by the most conservative rerouting plan, with 7.1 km of added pipeline</span></div>
</div>

The baseline network scenario produced a damage index of **0.29**, corresponding to a modeled loss of 29% of transport capacity. Larger volume, lower yield strength, lower consistency, and interacting flows increased the affected area and network damage. Because terrain controls the path, changing the initiation location could also determine whether the flow intersected the network at all. {% cite chen2022debris %}

Within this scenario set, increasing pipe-material yield strength reduced risk from 0.12 to as low as 0.02. Rerouting around slopes steeper than 20° reduced it to 0.03 with 2.6 km of additional pipeline; avoiding slopes steeper than 10° reduced the modeled risk to zero with 7.1 km of additional pipeline. {% cite chen2022debris %}

{% include figure.liquid path="assets/img/projects/research/pipeline-rerouting-strategies.png" class="img-fluid" alt="Map comparing the original submarine pipeline network with two rerouting plans that avoid seabed slopes above twenty and ten degrees, accompanied by scenario risk indices" zoomable=true %}

<div class="caption">
    Original network and two rerouting plans evaluated against the assumed debris-flow events; Plan A reduces the simultaneous-event risk index from 0.12 to 0.03, and Plan B to 0. Fig. 14 from {% cite chen2022debris %}.
</div>

## Proposed broader research framework

A 2024 review of hydrate-exploitation and marine-environment geohazards identifies monitoring data, multiphase and multifield coupling, multiscale analysis, susceptibility and vulnerability data, and engineering risk standards as research needs. It proposes a multi-scale, multi-spatial-temporal “digital triplet” framework for geohazard risk management in the Qiongdongnan Basin. {% cite jiang2024current %}

<div class="project-detail__figure--portrait">
{% include figure.liquid path="assets/img/projects/research/hydrate-risk-digital-triplet.png" class="img-fluid" alt="Conceptual digital-triplet framework proposed for multi-scale geohazard sensing, numerical analysis, intelligent decision-making, and risk control in the Qiongdongnan Basin" zoomable=true %}

<div class="caption">
    Conceptual multi-scale and multi-spatial-temporal digital-triplet framework proposed by the review paper. Fig. 12 from {% cite jiang2024current %}.
</div>
</div>

## Scientific contribution

- **Regional efficiency with process detail.** Depth-averaged dynamics and GIS routing resolve evolving flow over large natural terrain without treating runout as a single empirical distance. {% cite chen2023simulation %}
- **Material evolution matters.** The strength-softening law explains why a fixed-strength analysis can underestimate the affected area in the modeled scenarios. {% cite chen2023simulation %}
- **Hazard fields connect to network function.** Thickness, velocity, and direction are converted into impact forces, segment failures, and remaining transport capacity. {% cite chen2022debris %}
- **The model supports engineering choices.** Material upgrades and alternative routes can be compared with the same network-level risk measure. {% cite chen2022debris %}

## Scope and limitations

<div class="project-detail__scope" markdown="1">

In the Shenhu runout application, the terrain is derived from regional data, while the initiation area and debris-flow properties are assumed. The runout model simplifies ambient-fluid effects, does not capture debris-flow-generated waves, and does not include geotechnical or geological uncertainty; the authors also call for additional flume and field datasets. {% cite chen2023simulation %}

The pipeline application uses a hypothetical production network and assumed potential debris-flow locations. It treats the debris flow as a one-phase mixture, ignores inherent pipeline movement and interaction between the pipelines and sliding material, models pipeline elements as suspended members with simple supports, and measures consequences through transport-capacity loss. The semi-empirical impact-force equations also have a stated range of applicability in terms of the non-Newtonian Reynolds number. {% cite chen2022debris %}

</div>

</div>
