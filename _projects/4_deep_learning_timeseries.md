---
layout: page
title: Pore-Water Pressure Forecasting with Recurrent Neural Networks
description: A field study compares MLP, RNN, LSTM, and GRU models for one-hour-ahead pore-water-pressure forecasting from monitored rainfall and PWP histories.
img: assets/img/projects/covers/pwp-monitoring-forecasting.png
cover_fit: cover
cover_position: 50% 50%
cover_alt: "Conceptual illustration linking slope sensors and meteorological time series to recurrent-neural-network forecasts of pore-water pressure."
importance: 6
category: Prospective Modelling
sub_area: Monitoring
toc:
  sidebar: right
related_publications: true
---

<div class="project-detail prose" markdown="1">

<p class="project-detail__eyebrow">Field monitoring · Recurrent neural networks · Next-hour prediction</p>

<div class="project-detail__lede" markdown="1">
Pore-water pressure (PWP) is a direct input to slope-stability analysis, but its response to rainfall can be nonlinear, site-specific, and delayed. This study compares a static multilayer perceptron with standard RNN, LSTM, and GRU models for predicting PWP one hour ahead from rainfall and monitoring histories. {% cite wei2021machine %}
</div>

<div class="project-detail__facts" aria-label="Project overview">
  <div><strong>Site</strong><span>A fully instrumented natural slope in Hong Kong</span></div>
  <div><strong>Data</strong><span>1,224 hourly rainfall and pore-pressure records</span></div>
  <div><strong>Forecast</strong><span>Next-hour PWP from 3–12 hours of input history</span></div>
</div>

## Research question

Do recurrent models provide more accurate and stable short-term PWP predictions than a static neural network, particularly when the groundwater response lags behind rainfall?

The comparison focuses on two representative piezometers. SP3 was installed at 2 m depth in less-permeable completely decomposed volcanic rock and showed a pronounced delayed response. SP8 was installed at 1 m depth in colluvium and responded more rapidly. SP4 and SP9 provided additional checks of GRU performance. {% cite wei2021machine %}

<div class="project-detail__figure--portrait">
{% include figure.liquid path="assets/img/projects/research/pwp-study-area.png" class="img-fluid" alt="Topographic map locating the monitored natural slope near Tung Chung and Hong Kong International Airport" zoomable=true %}

<div class="caption">
    Location of the approximately 25,000 m² monitored natural slope above the North Lantau Expressway in Tung Chung, Hong Kong. Fig. 3 in {% cite wei2021machine %}, after Evans and Lam (2003).
</div>
</div>

{% include figure.liquid path="assets/img/projects/research/pwp-monitoring-layout.png" class="img-fluid" alt="Topographic monitoring layout showing piezometers, tensiometers, rain gauges, and the SP3, SP4, SP8, and SP9 analysis locations" zoomable=true %}

<div class="caption">
    Monitoring layout and the four piezometers used in the model comparison and supplementary checks. Fig. 4 in {% cite wei2021machine %}, after Evans and Lam (2003).
</div>

## Data and model design

The hourly record ran from June 8 to September 12, 2001, with gaps in the monitoring period. Inputs included hourly rainfall, PWP, and rainfall accumulated over 3, 6, and 12 hours. The first 75% of the time series was used for training and the final 25% for testing. Each architecture was trained 30 times, and the distributions of $R^2$ and RMSE were used for evaluation. {% cite wei2021machine %}

The gated recurrent unit updates its state as

<div class="project-detail__equation" markdown="1">

$$
h_t=(1-z_t)\odot h_{t-1}+z_t\odot\widetilde{h}_t
$$

<p><strong>Interpretation.</strong> The update gate <span>$z_t$</span> controls how much of the previous state is retained and how much is replaced by the candidate state. This memory mechanism helps represent delayed rainfall–PWP responses that are difficult for a static MLP and can challenge a standard RNN.</p>

</div>

## Prediction performance

<div class="project-detail__metrics" aria-label="Selected quantitative findings">
  <div><strong>R² 0.96</strong><span>Mean GRU and LSTM performance at SP3, with RMSE 0.31 kPa</span></div>
  <div><strong>R² 0.89</strong><span>Mean GRU performance at SP8, with RMSE 0.63 kPa</span></div>
  <div><strong>43.23 vs. 99.48 s</strong><span>Mean training time for single- versus double-layer GRU, with nearly unchanged accuracy</span></div>
</div>

<div class="table-responsive project-detail__table">
<table>
  <thead>
    <tr><th>Location</th><th>Model</th><th>Mean R²</th><th>Mean RMSE</th><th>Mean training time</th></tr>
  </thead>
  <tbody>
    <tr><td>SP3</td><td>MLP</td><td>0.91</td><td>0.47 kPa</td><td>23.01 s</td></tr>
    <tr><td>SP3</td><td>Standard RNN</td><td>0.91</td><td>0.47 kPa</td><td>28.77 s</td></tr>
    <tr><td>SP3</td><td>LSTM</td><td>0.96</td><td>0.31 kPa</td><td>55.20 s</td></tr>
    <tr class="is-emphasized"><td>SP3</td><td>GRU</td><td>0.96</td><td>0.31 kPa</td><td>39.68 s</td></tr>
    <tr><td>SP8</td><td>MLP</td><td>0.73</td><td>0.99 kPa</td><td>23.45 s</td></tr>
    <tr><td>SP8</td><td>Standard RNN</td><td>0.87</td><td>0.70 kPa</td><td>28.99 s</td></tr>
    <tr><td>SP8</td><td>LSTM</td><td>0.88</td><td>0.68 kPa</td><td>52.64 s</td></tr>
    <tr class="is-emphasized"><td>SP8</td><td>GRU</td><td>0.89</td><td>0.63 kPa</td><td>40.53 s</td></tr>
  </tbody>
</table>
</div>
<div class="caption">
    Mean test performance over 30 random training runs with a six-hour input window. Values are transcribed from Tables 3–4 in {% cite wei2021machine %}; the reported training times were measured on an Intel i7-8700 CPU with 16 GB RAM.
</div>

{% include figure.liquid path="assets/img/projects/research/pwp-input-window-sp3.png" class="img-fluid" alt="R squared and RMSE distributions for GRU, LSTM, standard RNN, and MLP predictions at piezometer SP3 using input windows from three to twelve hours" zoomable=true %}

<div class="caption">
    At SP3, the gated models remain accurate and stable across the tested input-window lengths, whereas the MLP varies more strongly. Cropped from Fig. 8 in {% cite wei2021machine %}.
</div>

{% include figure.liquid path="assets/img/projects/research/pwp-input-window-sp8.png" class="img-fluid" alt="R squared and RMSE distributions for GRU, LSTM, standard RNN, and MLP predictions at piezometer SP8 using input windows from three to twelve hours" zoomable=true %}

<div class="caption">
    SP8 presents a more difficult test for the static MLP; GRU and LSTM show narrower performance ranges. Cropped from Fig. 9 in {% cite wei2021machine %}.
</div>

## Key findings and contribution

- **Temporal structure matters.** At SP3, one observed PWP rise occurred about eight hours later than at SP8. LSTM and GRU were more robust than standard RNN where this lag was apparent. {% cite wei2021machine %}
- **A simpler gated model was sufficient.** A second GRU layer more than doubled mean training time in the reported experiment without a meaningful accuracy gain. {% cite wei2021machine %}
- **Dropout was important.** The model without dropout showed wave-like overfitting artifacts, while a dropout rate of 0.5 improved agreement with observations. {% cite wei2021machine %}
- **Positive-pressure records were scarce.** Positive PWP observations comprised only 1.2% and 2.9% of the SP3 and SP8 records, and the paper associates this scarcity with deviations in positive PWP prediction. {% cite wei2021machine %}

## Relationship to early warning

The authors position the findings as guidance for establishing landslide early-warning systems; the study itself evaluates one-hour-ahead PWP prediction using $R^2$ and RMSE. {% cite wei2021machine %}

## Scope and limitations

<div class="project-detail__scope" markdown="1">

The case study uses one monitored natural slope and 1,224 hours of rainfall and PWP records, including periods with unavailable measurements. The paper identifies missing PWP data as a possible limit on prediction performance. Positive PWP observations account for only 1.2% and 2.9% of the SP3 and SP8 records, respectively, and the authors associate this scarcity with deviations at positive PWP values. The Min–Max normalization uses extrema from the complete dataset, and the paper notes that new data extending this range would require renormalization. {% cite wei2021machine %}

</div>

</div>
