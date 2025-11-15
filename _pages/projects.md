---
layout: page
title: Projects
permalink: /projects/
description: A growing collection of cool projects.
nav: true
nav_order: 3
display_categories: [Prospective Modelling, Retrospective Analysis]
horizontal: false
toc:
  sidebar: left
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}

  {% if category == "Prospective Modelling" %}
    <!-- Group by sub-areas for Prospective Modelling -->
    {% assign sub_areas = "Susceptibility,Hazard,Vulnerability,Risk,Early Warning" | split: "," %}
    {% for sub_area in sub_areas %}
      {% assign sub_area_projects = sorted_projects | where: "sub_area", sub_area %}
      {% if sub_area_projects.size > 0 %}
        <h3 class="sub-area">{{ sub_area }}</h3>
        <div class="row row-cols-1 row-cols-md-2">
          {% for project in sub_area_projects %}
            {% include projects.liquid %}
          {% endfor %}
        </div>
      {% endif %}
    {% endfor %}
  {% else %}
    <!-- Display without sub-areas for other categories -->
    {% if page.horizontal %}
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
      </div>
    </div>
    {% else %}
    <div class="row row-cols-1 row-cols-md-2">
      {% for project in sorted_projects %}
        {% include projects.liquid %}
      {% endfor %}
    </div>
    {% endif %}
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
