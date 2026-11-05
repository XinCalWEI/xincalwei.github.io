---
layout: project
title: Hazard Characterization of Fast-Moving Landslide Runout with Geospatial Deep Learning
description: Project materials are currently being prepared.
status: In development
sitemap: false # a stub until the project has materials; the Research index shows it unlinked
# conceptual cover, kept but no longer shown on the Research index
img: assets/img/projects/covers/landslide-runout-hazard.png
cover_fit: cover
cover_position: 50% 50%
cover_alt: "Conceptual illustration of fast-moving landslide runout combined with multiscale geospatial layers and a deep-learning representation."
importance: 3
category: Prospective Modeling
sub_area: Hazard
# Research index (_pages/projects.md, _includes/projects.liquid)
thrust: ai
label: Runout hazard
---

{%- assign thrust_projects = site.projects | where: 'thrust', page.thrust | sort: 'importance' -%}

<div class="project-detail prose" markdown="1">

Until this project's materials are ready, see the published projects in the same research thrust:

<ul>
{%- for p in thrust_projects -%}
  {%- unless p.status %}
  <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {%- endunless -%}
{%- endfor %}
</ul>

</div>
