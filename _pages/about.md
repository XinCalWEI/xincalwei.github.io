---
layout: about
title: About
permalink: /
layout_width: wide
# Not rendered by the About layout, but it feeds the site search index: keep it
# in sync with hero.position / hero.affiliation below.
subtitle: Eric and Wendy Schmidt AI in Science Postdoctoral Fellow, University of Michigan

# -----------------------------------------------------------------------------
# All homepage copy lives in this front matter. Rendering: _layouts/about.liquid
# and _includes/home/*.liquid; styles: _sass/pages/_home.scss.
# Fields marked "HTML" accept inline HTML (links); everything else is plain text.
# -----------------------------------------------------------------------------

hero:
  kicker: Geohazards · Landslide science · AI for science
  statement: "Reliable, scalable AI for geohazards: anticipating landslides, uncovering the consequences of past disasters, and building open data for resilient communities."
  position: Eric and Wendy Schmidt AI in Science Postdoctoral Fellow
  affiliation: University of Michigan · Michigan Institute for Data and AI in Society
  founder: # "Founder, TerraMosaic"
    role: Founder
    name: TerraMosaic
    url: https://www.terramosaic.org/
  funder: 'Supported by <a href="https://www.schmidtsciences.org/">Schmidt Sciences</a>' # HTML
  actions: # the first one is the primary (filled) button
    - label: Research
      url: /projects/
    - label: Publications
      url: /publications/
    - label: CV
      url: /cv/
  # Contact links come from _data/socials.yml (email, scholar, ORCID, GitHub, LinkedIn).
  # At-a-glance strip under the hero. Date-stamp any metric that changes.
  facts:
    - label: Based in
      text: Ann Arbor, Michigan
      detail: 42.28° N, 83.74° W
    - label: Google Scholar, Nov 2026
      text: 678 citations · h-index 10
      url: https://scholar.google.com/citations?user=Bs4I0eAAAAAJ
    - label: Recognition
      text: AGU25 Highlighted Talk
      url: https://agu.confex.com/agu/agu25/meetingapp.cgi/Paper/1938874
    - label: Convening
      text: Primary convener, AGU 2025 & 2026
      url: /news/agu25_meeting/

profile:
  image: about/xin-wei-2026-09.jpg
  alt: Portrait of Xin Wei

# Section heads: mono kicker ("01 — Research") over the serif title, optional dek.
sections:
  research:
    index: "01"
    kicker: Research
    title: Research program
    link_label: All research projects
    url: /projects/
  publications:
    index: "02"
    kicker: Publications
    title: Selected publications
    dek: First-author papers and talks. Citation counts are from Google Scholar.
  updates:
    index: "03"
    kicker: Updates
    title: News & writing
  service:
    index: "04"
    kicker: Teaching & service
    title: Teaching, mentoring & service
  partners:
    index: "05"
    kicker: Collaborators
    title: Collaborators & support
    dek: The labs, centers, and initiatives behind my research.

research:
  framing: My work spans prospective modeling and retrospective analysis of geohazards. I integrate domain knowledge with AI, drawing on data that ranges from remote sensing to web-based and crowdsourced records, so that models of future hazards and evidence from past disasters inform each other.
  bio: I am an Eric and Wendy Schmidt AI in Science Postdoctoral Fellow at the University of Michigan, hosted by the Michigan Institute for Data and AI in Society (MIDAS). My research integrates geotechnical engineering, geospatial analysis, and risk and reliability analysis with AI to understand and mitigate geohazards, with a current focus on landslides. I earned my Ph.D. in Geotechnical Engineering from Shanghai Jiao Tong University, including a period as a visiting scholar in structural engineering at the University of Illinois Urbana-Champaign.
  thrusts:
    - number: "01"
      url: /projects/#ai
      title: Reliable, scalable AI for geohazards
      blurb: I integrate physically based slope models with machine learning to map where landslides are likely and anticipate slope response. Physics-derived safety factors, spatial neighborhoods, and cross-region testing improve transfer and reduce training-sample uncertainty; recurrent networks forecast rainfall-driven pore-water pressure to inform early warning.
      evidence:
        - label: Physics-guided AI for regional landslide susceptibility
          kind: Project
          url: /projects/1_ai_physics_susceptibility/
        - label: Improving pixel-based regional landslide susceptibility mapping
          kind: Geosci. Front. 2024
          url: https://doi.org/10.1016/j.gsf.2024.101782
        - label: Pore-water pressure forecasting with recurrent neural networks
          kind: Project
          url: /projects/4_deep_learning_timeseries/
    - number: "02"
      url: /projects/#data
      title: Landslide data & knowledge discovery
      blurb: I use generative AI to reconstruct how past landslides affected communities. An agentic framework developed with USGS partners extracts, merges, and checks impact records from government reports and news, revealing direct losses and underappreciated indirect consequences.
      evidence:
        - label: Unveiling the underappreciated consequences of landslides with generative AI
          kind: Project
          url: /projects/7_generative_ai_landslides/
        - label: AGU25 Highlighted Talk on landslide consequences
          kind: AGU 2025
          url: https://agu.confex.com/agu/agu25/meetingapp.cgi/Paper/1938874
    - number: "03"
      url: /projects/#infrastructure
      title: Community research infrastructure
      blurb: Through TerraMosaic, I bring fragmented landslide datasets together under standardized metadata so AI models can be trained, compared, and tested for transfer. I also convene AGU sessions on reliable and scalable geohazard intelligence and lead the SPARK Forum community initiative.
      evidence:
        - label: TerraMosaic, the open landslide research platform
          kind: Platform
          url: https://www.terramosaic.org/
        - label: SPARK Forum receives community initiative funding
          kind: News 2026
          url: /news/spark_forum_community_initiative_funding/
        - label: AGU26 session on reliable and scalable geohazard intelligence
          kind: AGU 2026
          url: /blog/2026/agu26-nh052-call-for-abstracts/
  framework:
    caption: How the three thrusts connect.
    # the owner's original raster overview (kept in the repo, linked as a download)
    download: assets/img/about/ai-geohazard-research-overview-2026-09.png
    download_label: Download the research overview (PNG, 2.8 MB)
  strand:
    title: Grounded in geotechnical risk and reliability.
    text: "Collaborative studies carry hazards through to infrastructure consequences: quantitative risk assessment, submarine debris flows and pipelines, and offshore foundations."
    link_label: Collaborative risk studies
    url: /projects/#foundations
  vision:
    lead: Where this is going
    text: "My long-term goal is reliable and scalable geohazard intelligence: AI that is grounded in physical understanding, trained on open and well-documented data, and tested for transfer across regions and hazard types. I aim to connect prospective models of susceptibility, hazard, and infrastructure risk with retrospective evidence of how disasters affect communities, so that each informs the other — and, through TerraMosaic and community initiatives, to turn fragmented geohazard evidence into usable intelligence for researchers, decision-makers, and communities."

terramosaic:
  kicker: Open-access platform
  title: TerraMosaic
  tagline: Connect the pieces of global landslide research.
  body: A community-curated, open-access landslide research platform I initiated at the University of Michigan. It brings global landslide inventories and related geospatial datasets together under standardized metadata — inventory type, resolution, coverage, models, evaluation settings, and whether cross-region transfer was tested — alongside curated papers, open tools and code, and a daily research digest.
  facts:
    - Map-searchable datasets with standardized metadata
    - Curated papers, tools, code & foundational data
    - Daily research digest
    - Community contributors from USGS, NASA, Oxford, TUM, and more
  cta:
    label: Visit terramosaic.org
    url: https://www.terramosaic.org/
  logo:
    image: assets/img/partners/terramosaic.png
    width: 900
    height: 146

selected_papers: true # the "Selected publications" list: bib entries with selected={true}

news:
  limit: 5
writing:
  limit: 3

service:
  - label: Teaching
    text: Courses and academies at Michigan, Illinois, and Shanghai Jiao Tong.
    link_label: Teaching record
    url: /teaching/
  - label: Mentoring
    text: Six undergraduate researchers through UROP and ECSR; mentees co-authored an AGU25 abstract and presented at the 2026 UROP symposium.
    link_label: Mentees and projects
    url: /people/
  - label: Service
    text: Primary convener, AGU Fall Meeting 2025 & 2026; reviewer for six journals; early-career member, FoMLIG Council.
    link_label: Service on the CV
    url: /cv/
  - label: Outreach
    text: K-12 hazard-science activities, undergraduate mentoring circles, and practitioner talks.
    link_label: Outreach activities
    url: /outreach/

# Collaborators & support logo grid. width/height are the image's pixel size
# (they reserve space before the logo loads); `fit: wide` / `compact` / `large`
# nudge the optical size of very wide, very compact, or small-in-canvas marks.
partners:
  - name: Schmidt Sciences
    url: https://schmidtsciences.org/
    image: assets/img/partners/schmidt_sciences.png
    width: 900
    height: 378
    fit: large
  - name: Michigan Institute for Data and AI in Society (MIDAS)
    url: https://midas.umich.edu/
    image: assets/img/partners/midas.png
    width: 900
    height: 140
    fit: wide
  - name: Civil and Environmental Engineering, University of Michigan
    url: https://cee.engin.umich.edu/
    image: assets/img/partners/cee.png
    width: 522
    height: 134
  - name: Computer Science and Engineering, University of Michigan
    url: http://cse.engin.umich.edu/
    image: assets/img/partners/cse.png
    width: 734
    height: 152
  - name: AIDD Lab
    url: https://disasterdata.engin.umich.edu/
    image: assets/img/partners/aidd-logo.png
    width: 900
    height: 192
  - name: Garcia Research Group
    url: https://cee.engin.umich.edu/people/garcia-f-estefan-t/
    image: assets/img/partners/garcia-group.png
    width: 636
    height: 142
  - name: REALIZE Lab
    url: https://sites.google.com/view/realize-lab/home
    image: assets/img/partners/realize.png
    width: 900
    height: 289
  - name: U.S. Geological Survey
    url: https://www.usgs.gov/
    image: assets/img/partners/usgs.png
    width: 471
    height: 175
  - name: MAE Center, University of Illinois Urbana-Champaign
    url: https://mae.cee.illinois.edu/index.html
    image: assets/img/partners/mae_center.png
    width: 562
    height: 134
  - name: TerraMosaic
    url: https://www.terramosaic.org/
    image: assets/img/partners/terramosaic.png
    width: 900
    height: 146
    fit: wide
  - name: Girls Encoded
    url: https://girlsencoded.eecs.umich.edu/
    image: assets/img/partners/girls_encoded.png
    width: 401
    height: 262
    fit: compact
  - name: Ground Truth Alaska
    url: https://groundtruthalaska.org/
    image: assets/img/partners/ground_truth_alaska.png
    width: 365
    height: 211
    fit: compact
---
