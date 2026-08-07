---
layout: page
title: News
permalink: /news/
description: Conferences, workshops, invited talks, and program milestones — newest first.
nav: true
nav_order: 0
---

<!-- Year-grouped archive built on the shared About feed rows (with 2-line
     excerpts here — the homepage section stays titles-only). news.liquid
     remains for upstream compatibility but is no longer used. -->

<div class="about news-page">
  {% assign news_sorted = site.news | sort: 'date' | reverse %}
  {% assign year_groups = news_sorted | group_by_exp: 'item', "item.date | date: '%Y'" %}
  {% for yg in year_groups %}
    <section class="news-year">
      <div class="news-year__head">
        <h2 id="y{{ yg.name }}">{{ yg.name }}</h2>
        <span class="news-year__count">{{ yg.items | size }} update{% if yg.items.size > 1 %}s{% endif %}</span>
      </div>
      {% assign year_total = yg.items | size %}
      <div class="cardlist">{% include about_feed.liquid items=yg.items limit=year_total kind='news' excerpt=true %}</div>
    </section>
  {% endfor %}
</div>
