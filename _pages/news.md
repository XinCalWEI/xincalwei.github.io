---
layout: page
title: News
kicker: News & writing
permalink: /news/
description: Conferences, workshops, invited talks, and program milestones — newest first.
nav: true
nav_order: 5
layout_width: wide
---

<!-- Year-grouped archive: hairline rows with a mono date column, category tag,
     title, one-line dek and (from 768px) a thumbnail. Rows: _includes/about_feed.liquid;
     styles: .tm-news in _sass/pages/_inner.scss. -->

{% assign news_sorted = site.news | sort: 'date' | reverse %}
{% assign year_groups = news_sorted | group_by_exp: 'item', "item.date | date: '%Y'" %}

<div class="tm-news">
  {% if year_groups.size > 1 %}
    <nav class="news-years" aria-label="News by year">
      <span class="news-years__label">{{ news_sorted | size }} updates</span>
      <ul>
        {% for yg in year_groups %}
          <li><a href="#y{{ yg.name }}">{{ yg.name }}</a></li>
        {% endfor %}
      </ul>
    </nav>
  {% endif %}

{% for yg in year_groups %}

<section class="news-year" aria-labelledby="y{{ yg.name }}">
<div class="news-year__head">
<h2 id="y{{ yg.name }}">{{ yg.name }}</h2>
<span class="news-year__count">{{ yg.items | size }} update{% if yg.items.size > 1 %}s{% endif %}</span>
</div>
{% assign year_total = yg.items | size %}
{% comment %} the newest year's first four rows fill the first screen at 1440x900: their thumbnails load eagerly {% endcomment %}
{% if forloop.first %}{% assign feed_eager = 4 %}{% else %}{% assign feed_eager = 0 %}{% endif %}
{% include about_feed.liquid items=yg.items limit=year_total kind='news' excerpt=true eager=feed_eager %}
</section>
{% endfor %}

</div>
