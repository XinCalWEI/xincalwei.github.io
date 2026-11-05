---
layout: post
title: "SPARK Forum Receives Community Initiative Funding"
date: 2026-09-18 09:00:00-0400
description: I led a successful Community Initiative funding application for SPARK Forum, with the main program tentatively planned for March 8–12, 2027, at the University of Michigan.
inline: false
related_posts: false
thumbnail: assets/img/news/spark-forum/spark-forum-poster.png
category: Community Initiative
website_screenshots:
  - image: spark-website-about.png
    width: 1304
    height: 1312
    alt: SPARK website About page with the initiative's mission, funding acknowledgement, and conveners
    caption: "About SPARK: the initiative's mission, funding acknowledgement, and conveners."
  - image: spark-website-forum.png
    width: 1253
    height: 1070
    alt: SPARK Forum overview with tentative dates and a draft five-day main program
    caption: "Forum overview and draft program: March 7 for check-in, followed by the March 8–12 main program. All dates are tentative."
  - image: spark-website-organizers.png
    width: 1232
    height: 1096
    alt: Profiles and responsibilities of the six Fellows and alumni leading the SPARK Forum
    caption: "The six Fellows and alumni leading the SPARK Forum, with their organizing roles."
  - image: spark-website-acknowledgements.png
    width: 1228
    height: 429
    alt: Acknowledgements to colleagues at Schmidt Sciences and the Michigan Institute for Data and AI in Society
    caption: "Acknowledging guidance, coordination, and practical support from colleagues at Schmidt Sciences and MIDAS."
  - image: spark-website-principles.png
    width: 1225
    height: 587
    alt: Five principles guiding SPARK, from responsible research and collaboration to reproducibility, accessibility, and lasting relationships
    caption: "SPARK's guiding principles: responsibility, collaboration, reproducible practice, accessible technical depth, and lasting relationships."
---

I’m pleased to share that the Community Initiative proposal I led for **SPARK Forum** has been awarded funding through the **Schmidt Sciences AI in Science Fellowship Community Initiatives Fund**.

We are planning **SPARK Forum: Responsible Research Translation and Cross-Sector Collaboration** at the **University of Michigan**, with the main program tentatively scheduled for **March 8–12, 2027**.

{% include figure.liquid path="assets/img/news/spark-forum/spark-forum-poster.png" class="img-fluid rounded z-depth-1" alt="SPARK Forum poster illustrating collaboration among current and alumni AI in Science Fellows and partners across academia, government, industry, and national laboratories" width="1920" height="1081" zoomable=true avoid_scaling=true %}

<div class="caption">
  SPARK Forum promotional illustration. Dates remain tentative.
  <a href="{{ '/assets/pdf/spark-forum-2027.pdf' | relative_url }}">View the original poster (PDF)</a>.
</div>

SPARK is being designed as a retreat-style forum for current and alumni **AI in Science (AIS) Fellows**. We also plan to invite partners from academia, government, industry, and national laboratories. The aim is to explore how AI-for-science research can address real stakeholder needs and translate into meaningful societal impact.

The planned program will combine expert talks and discussions on responsible AI and emerging technologies with hands-on tutorials and cross-sector team projects. Teams would work from a stakeholder-defined problem toward a minimum viable prototype, connecting research ideas with practical needs.

Mentorship, career conversations, and informal retreat activities are also planned, giving participants time to build connections across disciplines, institutions, cohorts, and sectors. I’m grateful for the support and look forward to developing the forum with colleagues across the AIS community.

> **Applications are not yet open.** Please stay tuned for more information as dates and program details are confirmed.

[Learn more about SPARK Forum and follow future updates](https://xincalwei.github.io/spark-schmidt-ais-community-hub/forum/).

## A preview of the SPARK Community Hub

These screenshots show the website as of September 18, 2026. Forum dates and program details remain tentative. Click an image to enlarge it.

{% for screenshot in page.website_screenshots %}
{% assign screenshot_path = screenshot.image | prepend: 'assets/img/news/spark-forum/' %}

  <div class="my-4">
    {% include figure.liquid path=screenshot_path class="img-fluid rounded z-depth-1" alt=screenshot.alt width=screenshot.width height=screenshot.height caption=screenshot.caption zoomable=true avoid_scaling=true %}
  </div>
{% endfor %}
