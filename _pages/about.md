---
layout: about
title: About
permalink: /
# subtitle is not rendered by the About layout (role/affiliation below are), but
# it feeds the site search index — keep it in sync with them.
subtitle: Eric and Wendy Schmidt AI in Science Postdoctoral Research Fellow, University of Michigan

# Hero fields. `tagline` allows inline HTML: <span class="kw">…</span> renders
# the gradient-underline keyword treatment (see _sass/_about.scss).
eyebrow: AI for Science · Geotechnical Engineering · Geohazards
tagline: 'Understanding and predicting <span class="kw">geohazards</span> by uniting <span class="kw">AI and domain knowledge</span>, for more resilient communities.'
role: Eric and Wendy Schmidt AI in Science Postdoctoral Research Fellow
affiliation: University of Michigan
# funder credit, folded into the identity block instead of opening the bio
funder: 'Supported by <a href="https://www.schmidtsciences.org/" target="_blank" rel="noopener noreferrer">Schmidt Sciences</a>'
# rendered as a third identity line under the affiliation
role2: 'Founder of <a href="https://www.terramosaic.org/" target="_blank" rel="noopener noreferrer">TerraMosaic</a>'

profile:
  image: prof_pic.jpg
  address: 3520 Green Court, Ann Arbor, MI 48105

research_overview:
  image: about/ai-geohazard-research-overview-hq.webp
  alt: Diagram of Xin Wei's research framework integrating geohazard science with AI, data, and computation for prospective modeling, retrospective analysis, and resilient communities

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: false # the About feed is never clipped; see _includes/about_feed.liquid
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: false
  limit: 3 # leave blank to include all the blog posts
---

<div class="bio-visual">
  {% assign bio_visual_path = page.research_overview.image | prepend: 'assets/img/' %}
  {%
    include figure.liquid path=bio_visual_path alt=page.research_overview.alt
    width="1672" height="941" zoomable=true avoid_scaling=true
  %}
</div>

I earned my Ph.D. in Geotechnical Engineering from Shanghai Jiao Tong University, including a period as a visiting scholar in structural engineering at the University of Illinois at Urbana–Champaign.

My research sits at <span class="hl">the intersection of geohazard mitigation and AI</span>. It advances the understanding and mitigation of geohazards by integrating domain knowledge with AI — building on expertise in geotechnical engineering, geospatial analysis, and risk and reliability analysis; leveraging the transformative potential of AI; and utilizing diverse data sources ranging from web-based and crowdsourced data to remote sensing.

My work spans <span class="hl">prospective modeling and retrospective analysis</span> of geohazards, with a current focus on landslides. Prospectively, I develop novel models for <span class="hl">susceptibility and risk assessment, hazard characterization, and early warning</span> to improve the resilience of communities facing geohazards. Retrospectively, I leverage <span class="hl">generative AI</span> to extract and analyze heterogeneous data to uncover how disasters have affected communities — revealing underappreciated impacts, cascading consequences, and patterns of recovery and resilience.

Ultimately, my goal is to help build <span class="hl">more resilient communities</span> by advancing scientifically grounded and societally relevant approaches to geohazard understanding and mitigation.
