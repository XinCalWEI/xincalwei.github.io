---
layout: post
title: Key Elements for Improving Pixel-Based Landslide Susceptibility Mapping
date: 2024-07-01 10:00:00
description: Exploring key strategies to enhance landslide susceptibility mapping through physics-based models, spatial neighborhoods, and data quality improvements.
tags:
  - "Landslides"
  - "Geospatial AI"
categories: research
thumbnail: assets/img/projects/covers/physics-guided-susceptibility.png
---

These key elements for improving pixel-based landslide susceptibility mapping include:

**<span style="font-size: 0.9em;">(1) Constructing new landslide explanatory factors with higher nonlinearity</span>**

Physics-based models such as ISSA are powerful tools for generating new nonlinear explanatory factors, such as the slope safety factor. These factors enhance model generalization by transforming inconsistent geological and lithological data across regions into a continuous, normalized safety factor. They also mitigate prediction uncertainty caused by incomplete landslide inventories by pre-selecting non-landslide samples.

**<span style="font-size: 0.9em;">(2) Considering the pixel spatial neighborhood</span>**

Model performance improves substantially when using local-area samples instead of single-pixel samples. With local-area samples, the AUC values of Hybrid Model I in the testing region increase significantly, reducing the extent of areas mistakenly classified as high susceptibility and improving low-susceptibility area recognition.

**<span style="font-size: 0.9em;">(3) Increasing the nonlinearity of the data-driven module</span>**

Hybrid Model II consistently outperforms Hybrid Model I across the training region, testing region, and a new region (Wushan County). However, the improvement from considering pixel spatial neighborhoods exceeds the improvement contributed by increasing nonlinearity. Hybrid Model I—while incorporating spatial neighborhoods—already offers strong predictive accuracy along with better practicality and interpretability.

**<span style="font-size: 0.9em;">(4) Reducing model parameters</span>**

Because landslide labels are limited, minimizing the number of trainable model parameters is essential for improving susceptibility mapping. Fewer parameters reduce the required number of labels while maintaining predictive performance. This can be achieved through classical statistical models like logistic regression, or through specific deep learning architectures such as CNNs, which inherently reduce parameters via weight sharing and local connectivity.

**<span style="font-size: 0.9em;">(5) Increasing data quantity and quality</span>**

Both the number of landslide records (labels) and the quality of the input features (explanatory factors) strongly affect LSM model performance.

---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/key_elements_susceptibility.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Key elements for improving pixel-based landslide susceptibility mapping.
</div>

---

**Read the full paper:** [Improving pixel-based regional landslide susceptibility mapping](https://www.sciencedirect.com/science/article/pii/S1674987124000069)

_Wei, X., Gardoni, P., Zhang, L., Tan, L., Liu, D., Du, C., & Li, H. (2024). Improving pixel-based regional landslide susceptibility mapping. Geoscience Frontiers, 15(4), 101782._
