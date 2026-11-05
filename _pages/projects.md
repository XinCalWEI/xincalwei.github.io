---
layout: page
title: Research
permalink: /projects/
kicker: Research program
description: Three connected research thrusts, grounded in collaborative studies of geotechnical risk and infrastructure resilience.
nav: true
nav_order: 1
nav_title: Research
layout_width: wide

# Research-page copy lives here. Thrust titles and blurbs match the homepage
# (_pages/about.md); keep the two in step. Projects join a thrust through
# `thrust:` in their own front matter (_projects/*.md) and are ordered by
# `importance`. `outputs` link to entries on /publications/ by BibTeX key
# (heading: `outputs_title`, default "Key papers").
intro: >-
  My work spans prospective modeling and retrospective analysis of geohazards.
  I integrate domain knowledge with AI, drawing on data that ranges from remote
  sensing to web-based and crowdsourced records, so that models of future
  hazards and evidence from past disasters inform each other.
thrusts:
  - id: ai
    index: "01"
    title: Reliable, scalable AI for geohazards
    blurb: >-
      I integrate physically based slope models with machine learning to map
      where landslides are likely and anticipate slope response. Physics-derived
      safety factors, spatial neighborhoods, and cross-region testing improve
      transfer and reduce training-sample uncertainty; recurrent networks
      forecast rainfall-driven pore-water pressure to inform early warning.
    outputs:
      - key: wei2024improving
        meta: 2024 · Geosci. Front.
        title: Improving pixel-based regional landslide susceptibility mapping
      - key: wei2023comparison
        meta: 2023 · Acta Geotech.
        title: Comparison of hybrid data-driven and physical models for landslide susceptibility mapping at regional scales
      - key: wei2021machine
        meta: 2021 · Geosci. Front.
        title: "Machine learning for pore-water pressure time-series prediction: Application of recurrent neural networks"
  - id: data
    index: "02"
    title: Landslide data & knowledge discovery
    blurb: >-
      I use generative AI to reconstruct how past landslides affected
      communities. An agentic framework developed with USGS partners extracts,
      merges, and checks impact records from government reports and news,
      revealing direct losses and underappreciated indirect consequences.
    outputs_title: Key presentation
    outputs:
      - key: wei2025agu
        meta: 2025 · AGU Fall Meeting · NH31B-04
        title: Selected for oral presentation and featured as an AGU25 Highlighted Talk
  - id: infrastructure
    index: "03"
    title: Community research infrastructure
    blurb: >-
      Through TerraMosaic, I bring fragmented landslide datasets together under
      standardized metadata so AI models can be trained, compared, and tested
      for transfer. I also convene AGU sessions on reliable and scalable
      geohazard intelligence and lead the SPARK Forum community initiative.
    outputs_title: Key presentation
    outputs:
      - key: wei2025agu_platform
        meta: 2025 · AGU Fall Meeting · with student mentees
        title: Building a Community-Curated, Open-Access Platform of Global Landslide Datasets to Support Reliable and Scalable AI Models
    initiatives:
      - label: Open platform · Founder
        title: TerraMosaic
        text: >-
          A community-curated, open-access landslide research platform I
          initiated at the University of Michigan. It brings global landslide
          inventories and related geospatial datasets together under
          standardized metadata, alongside curated papers, open tools and code,
          and a daily research digest.
        links:
          - text: Visit terramosaic.org
            url: https://www.terramosaic.org/
            external: true
      - label: Convening · AGU Fall Meeting
        title: "Toward Reliable and Scalable Geohazard Intelligence: From Multiscale Sensing to Open Data Foundations"
        text: >-
          Primary convener of this AGU session in 2025 and 2026. In 2025 it ran
          as poster and oral sessions, with invited talks from USGS, Stanford,
          and the University of Washington.
        links:
          - text: AGU25 session recap
            url: /news/agu25_meeting/
          - text: AGU26 session NH23F (primary convener)
            url: https://agu.confex.com/agu/agu26/meetingapp.cgi/Session/282060
            external: true
      - label: Community initiative · Schmidt Sciences
        title: SPARK Forum
        text: >-
          I led the successful Community Initiative funding application for
          SPARK Forum: Responsible Research Translation and Cross-Sector
          Collaboration, funded through the Schmidt Sciences AI in Science
          Fellowship Community Initiatives Fund. The main program is tentatively
          planned for March 8–12, 2027, at the University of Michigan.
        links:
          - text: Read the announcement
            url: /news/spark_forum_community_initiative_funding/
  - id: foundations
    index: ""
    kicker: Foundations · Collaborative studies
    title: Geotechnical risk & infrastructure resilience
    blurb: >-
      Grounded in geotechnical risk and reliability: collaborative studies that
      carry hazards through to infrastructure consequences, from quantitative
      landslide risk assessment to submarine debris flows, pipelines, and
      offshore foundations.
    outputs:
      - key: cui2022quantitative
        meta: 2022 · Acta Geotech.
        title: Quantitative risk assessment of landslides with direct simulation of pre-failure to post-failure behaviors
      - key: chen2022debris
        meta: 2022 · Eng. Geol.
        title: Debris-flow-induced damage assessment for a submarine pipeline network in regional-scale natural terrain
      - key: zhu2022estimation
        meta: 2022 · Soil Dyn. Earthq. Eng.
        title: Estimation of horizontal bearing capacity of mat foundation on structured and over-consolidated clays under cyclic wave loads
---

{%- assign research_projects = site.projects | sort: 'importance' -%}

<div class="research">

<p class="research__intro">{{ page.intro }}</p>

<nav class="research-index" aria-label="Research thrusts">
  <ol class="research-index__list">
    {%- for thrust in page.thrusts -%}
      {%- assign thrust_projects = research_projects | where: 'thrust', thrust.id -%}
      <li class="research-index__item{% if thrust.index == '' %} research-index__item--support{% endif %}">
        <a class="research-index__link" href="#{{ thrust.id }}">
          <span class="research-index__num" aria-hidden="true">{% if thrust.index != '' %}{{ thrust.index }}{% else %}+{% endif %}</span>
          <span class="research-index__title">{{ thrust.title }}</span>
          <span class="research-index__count">
            {%- if thrust.initiatives -%}
              {{ thrust.initiatives | size }} initiatives
            {%- elsif thrust.index == '' -%}
              {{ thrust_projects | size }} collaborative studies
            {%- else -%}
              {%- assign thrust_pending = thrust_projects | where_exp: 'p', 'p.status' -%}
              {%- assign thrust_done = thrust_projects.size | minus: thrust_pending.size -%}
              {{ thrust_done }} project{% if thrust_done != 1 %}s{% endif %}
              {%- if thrust_pending.size > 0 %} · {{ thrust_pending.size }} in development{% endif -%}
            {%- endif -%}
          </span>
        </a>
      </li>
    {%- endfor -%}
  </ol>
</nav>

{%- for thrust in page.thrusts -%}
{%- assign thrust_projects = research_projects | where: 'thrust', thrust.id -%}
  <section class="thrust thrust--{{ thrust.id }}{% if thrust.index == '' %} thrust--support{% endif %}" id="{{ thrust.id }}" aria-labelledby="{{ thrust.id }}-title">
    <header class="thrust__head">
      {%- if thrust.index != '' -%}
        <p class="thrust__num" aria-hidden="true">{{ thrust.index }}</p>
        <p class="kicker thrust__kicker">Research thrust</p>
      {%- else -%}
        <p class="kicker thrust__kicker">{{ thrust.kicker }}</p>
      {%- endif -%}
      <h2 class="thrust__title" id="{{ thrust.id }}-title">{{ thrust.title }}</h2>
      <p class="thrust__blurb">{{ thrust.blurb }}</p>
    </header>

    <div class="thrust__body">
      {%- if thrust.initiatives -%}
        {%- for initiative in thrust.initiatives -%}
          <article class="project-row project-row--text initiative">
            <div class="project-row__body">
              <p class="project-row__meta"><span class="project-row__area">{{ initiative.label }}</span></p>
              <h3 class="project-row__title">{{ initiative.title }}</h3>
              <p class="project-row__desc">{{ initiative.text }}</p>
              <p class="project-row__links">
                {%- for link in initiative.links -%}
                  {%- if link.external -%}
                    <a class="text-link" href="{{ link.url }}">{{ link.text }} {% include icon.liquid name="arrow-up-right" %}</a>
                  {%- else -%}
                    <a class="text-link" href="{{ link.url | relative_url }}">{{ link.text }} {% include icon.liquid name="arrow-right" %}</a>
                  {%- endif -%}
                {%- endfor -%}
              </p>
            </div>
          </article>
        {%- endfor -%}
      {%- endif -%}
      {%- for project in thrust_projects -%}
        {% include projects.liquid %}
      {%- endfor -%}
    </div>
    {%- if thrust.outputs -%}
      <div class="thrust__outputs">
        <h3 class="thrust__outputs-title">{{ thrust.outputs_title | default: 'Key papers' }}</h3>
        <ul class="thrust__output-list">
          {%- for output in thrust.outputs -%}
            <li>
              <a class="thrust__output" href="{{ '/publications/' | relative_url }}#{{ output.key }}">
                <span class="thrust__output-meta">{{ output.meta }}</span>
                <span class="thrust__output-title">{{ output.title }}</span>
              </a>
            </li>
          {%- endfor -%}
        </ul>
      </div>
    {%- endif -%}

  </section>
{%- endfor -%}

</div>
