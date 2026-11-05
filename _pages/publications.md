---
layout: page
permalink: /publications/
title: Publications & Presentations
nav_title: Publications
kicker: Publications
description: Journal articles, conference papers, and presentations, newest first.
nav: true
nav_order: 2
layout_width: wide
# Aggregate citation metric for the summary bar. Update the numbers and the date
# together, from https://scholar.google.com/citations?user=Bs4I0eAAAAAJ
scholar_citations: 678
scholar_h_index: 10
scholar_checked: Nov 2026
---

<!-- _pages/publications.md: sections by type, then year (newest first). Entry markup: _layouts/bib.liquid -->
{%- capture journal_count -%}{% bibliography_count --query @article %}{%- endcapture -%}
{%- capture accepted_count -%}{% bibliography_count --query @article[note~=Accepted] %}{%- endcapture -%}
{%- capture conference_count -%}{% bibliography_count --query @inproceedings %}{%- endcapture -%}
{%- capture first_author_count -%}{% bibliography_count --query @*[author^=Wei] %}{%- endcapture -%}
{%- capture total_count -%}{% bibliography_count %}{%- endcapture -%}
{%- assign journal_count = journal_count | strip -%}
{%- assign accepted_count = accepted_count | strip | plus: 0 -%}
{%- assign conference_count = conference_count | strip -%}
{%- assign first_author_count = first_author_count | strip -%}
{%- assign total_count = total_count | strip -%}

<div class="pub-summary">
  <dl class="pub-stats">
    <div class="pub-stats__item">
      <dt><a href="#journal-articles">Journal articles</a></dt>
      <dd class="pub-stats__value">{{ journal_count }}</dd>
      {% if accepted_count > 0 %}<dd class="pub-stats__note">incl. {{ accepted_count }} accepted</dd>{% endif %}
    </div>
    <div class="pub-stats__item">
      <dt><a href="#conference-papers">Conference papers &amp; presentations</a></dt>
      <dd class="pub-stats__value">{{ conference_count }}</dd>
    </div>
    <div class="pub-stats__item">
      <dt>First-authored</dt>
      <dd class="pub-stats__value">{{ first_author_count }}</dd>
      <dd class="pub-stats__note">of {{ total_count }} entries</dd>
    </div>
    <div class="pub-stats__item">
      <dt>Citations</dt>
      <dd class="pub-stats__value">{{ page.scholar_citations }}</dd>
      <dd class="pub-stats__note">h-index {{ page.scholar_h_index }} · Google Scholar, {{ page.scholar_checked }}</dd>
    </div>
  </dl>

  <div class="pub-summary__aside">
    <p class="pub-legend"><span class="pub-legend__self">Xin Wei</span> in bold · <span class="pub-legend__mark" aria-hidden="true">†</span> student mentee</p>
    <p class="pub-profiles">
      <a class="text-link" href="https://scholar.google.com/citations?user={{ site.data.socials.scholar_userid }}">Google Scholar {% include icon.liquid name="arrow-up-right" %}</a>
      <a class="text-link" href="https://orcid.org/{{ site.data.socials.orcid_id }}">ORCID {% include icon.liquid name="arrow-up-right" %}</a>
    </p>

  </div>
</div>

{% include bib_search.liquid %}

<div class="publications publications--full">

<section class="pub-section" id="journal-articles" aria-labelledby="journal-articles-title" data-pub-section="journal">
  <header class="section-head pub-section__head">
    <p class="kicker"><span class="kicker__index">01</span> — Articles</p>
    <h2 class="section-head__title" id="journal-articles-title">Journal articles</h2>
    <p class="section-head__dek">{{ journal_count }} articles{% if accepted_count > 0 %}, including {{ accepted_count }} accepted for publication{% endif %}.</p>
  </header>
  {%- capture journal_list -%}{% bibliography --query @article %}{%- endcapture -%}
  <div class="pub-years">
  {{ journal_list | replace: '<h2 class="bibliography">', '<h3 class="bibliography">' | replace: '</h2>', '</h3>' }}
  </div>
</section>

<section class="pub-section" id="conference-papers" aria-labelledby="conference-papers-title" data-pub-section="conference">
  <header class="section-head pub-section__head">
    <p class="kicker"><span class="kicker__index">02</span> — Proceedings &amp; meetings</p>
    <h2 class="section-head__title" id="conference-papers-title">Conference papers &amp; presentations</h2>
    <p class="section-head__dek">A proceedings paper and AGU Fall Meeting presentations, including the AGU25 Highlighted Talk.</p>
  </header>
  {%- capture conference_list -%}{% bibliography --query !@article %}{%- endcapture -%}
  <div class="pub-years">
  {{ conference_list | replace: '<h2 class="bibliography">', '<h3 class="bibliography">' | replace: '</h2>', '</h3>' }}
  </div>
</section>

<div class="pub-empty" id="pub-empty" hidden>
  <p>No entries match this filter.</p>
  <button type="button" class="xw-btn xw-btn--secondary pub-empty__reset">Show all entries</button>
</div>

</div>

<script src="{{ '/assets/js/abstract-modal.js' | relative_url | bust_file_cache }}" defer></script>
