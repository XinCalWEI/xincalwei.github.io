---
layout: page
title: Projects
permalink: /projects/
description: Research projects across the geohazard risk chain — from susceptibility to early warning, and from prospective modeling to retrospective analysis.
nav: true
nav_order: 3
display_categories: [Prospective Modelling, Retrospective Analysis]
horizontal: false
toc:
  sidebar: left
---

<!-- pages/projects.md — TerraMosaic-styled project index.
     sub_area is this repo's custom grouping dimension; the split list below
     defines the display order and must match the sub_area values used in
     _projects/*.md front matter. -->

<div class="projects tm-projects">
{% if site.enable_project_categories and page.display_categories %}
  {% for category in page.display_categories %}
    <a id="{{ category }}" href=".#{{ category }}">
      <h2 class="category">{{ category }}</h2>
    </a>
    {% assign categorized_projects = site.projects | where: "category", category %}
    {% assign sorted_projects = categorized_projects | sort: "importance" %}
    {% if category == "Prospective Modelling" %}
      {% assign sub_areas = "Susceptibility,Hazard,Vulnerability,Risk,Early Warning" | split: "," %}
      {% for sub_area in sub_areas %}
        {% assign sub_area_projects = sorted_projects | where: "sub_area", sub_area %}
        {% if sub_area_projects.size > 0 %}
          <h3 class="sub-area sub-area--{{ sub_area | slugify }}">{{ sub_area }}</h3>
          <div class="row row-cols-1 row-cols-md-2">
            {% for project in sub_area_projects %}
              {% include projects.liquid %}
            {% endfor %}
          </div>
        {% endif %}
      {% endfor %}
    {% else %}
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in sorted_projects %}
          {% include projects.liquid %}
        {% endfor %}
      </div>
    {% endif %}
  {% endfor %}
{% else %}
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
