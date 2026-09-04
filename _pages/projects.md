---
layout: page
title: Projects
permalink: /projects/
description: Research on geohazard susceptibility, runout, monitoring, infrastructure response, and risk, complemented by retrospective analysis of observed impacts.
nav: true
nav_order: 3
display_categories: [Prospective Modelling, Retrospective Analysis]
horizontal: false
---

<p class="projects-visual-note">
Cover images are conceptual illustrations; the project pages present the underlying methods, data, and evidence.
</p>

<nav class="projects-jump" aria-label="Project groups">
  <span>Explore</span>
  <a href="#prospective-modelling">Prospective Modelling</a>
  <a href="#retrospective-analysis">Retrospective Analysis</a>
</nav>

<div class="projects tm-projects">
{% if site.enable_project_categories and page.display_categories %}
  {% for category in page.display_categories %}
    {% assign category_id = category | slugify %}
    {% assign categorized_projects = site.projects | where: "category", category %}
    {% assign sorted_projects = categorized_projects | sort: "importance" %}
    <section class="project-group project-group--{{ category_id }}" aria-labelledby="{{ category_id }}">
      <header class="project-group__header">
        <h2 id="{{ category_id }}" class="category">{{ category }}</h2>
        {% if category == "Prospective Modelling" %}
          <p>Forward-looking models that connect terrain, monitoring, motion, infrastructure response, and consequence.</p>
        {% else %}
          <p>Evidence synthesis that reconstructs observed landslide consequences across places, events, and sources.</p>
        {% endif %}
      </header>
      <div class="project-grid project-grid--{{ category_id }}">
        {% if category == "Prospective Modelling" %}
          {% assign sub_areas = "Susceptibility,Hazard,Infrastructure Response,Risk,Monitoring" | split: "," %}
          {% for sub_area in sub_areas %}
            {% assign sub_area_projects = sorted_projects | where: "sub_area", sub_area %}
            {% for project in sub_area_projects %}
              {% include projects.liquid %}
            {% endfor %}
          {% endfor %}
        {% else %}
          {% for project in sorted_projects %}
            {% include projects.liquid %}
          {% endfor %}
        {% endif %}
      </div>
    </section>
  {% endfor %}
{% else %}
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="project-grid">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
