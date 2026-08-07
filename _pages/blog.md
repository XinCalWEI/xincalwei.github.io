---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
---

<!-- Magazine-style blog index with client-side filtering.
     Filter chips are generated from the posts themselves (site.categories /
     site.tags) so they can never drift from reality — do NOT hand-maintain a
     list in _config.yml. Pagination is intentionally off: filtering must see
     every post, not just the current page. See assets/js/blog-filter.js. -->

<div class="post about tm-blog">

  <header class="blog-head">
    <h1 class="post-title">Blog</h1>
    {% if site.blog_description %}
      <p class="post-description">{{ site.blog_description }}</p>
    {% endif %}
  </header>

  <div class="blog-filters" role="group" aria-label="Filter posts">
    <button class="chip chip--all is-active" type="button" data-filter="" data-kind="all">
      All <span class="chip__n">{{ site.posts | size }}</span>
    </button>

    {% assign cats = site.categories | sort %}
    {% for c in cats %}
      {% assign slug = c[0] | slugify %}
      <button class="chip chip--cat chip--{{ slug }}" type="button" data-filter="{{ slug }}" data-kind="cat">
        {{ c[0] | replace: '-', ' ' }} <span class="chip__n">{{ c[1] | size }}</span>
      </button>
    {% endfor %}

    {% assign tags = site.tags | sort %}
    {% for t in tags %}
      {% assign slug = t[0] | slugify %}
      <button class="chip chip--tag" type="button" data-filter="{{ slug }}" data-kind="tag">
        <i class="fa-solid fa-hashtag" aria-hidden="true"></i>{{ t[0] }} <span class="chip__n">{{ t[1] | size }}</span>
      </button>
    {% endfor %}

  </div>

  <p class="blog-filters__status" role="status" aria-live="polite"></p>

  <div class="blog-grid">
    {% for post in site.posts %}
      {% if post.external_source == blank %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
      {% else %}
        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
      {% endif %}
      {% assign cat = post.categories | first %}
      {% assign href = post.url | relative_url %}
      {% assign is_external = false %}
      {% if post.redirect != blank %}
        {% if post.redirect contains '://' %}
          {% assign href = post.redirect %}
          {% assign is_external = true %}
        {% else %}
          {% assign href = post.redirect | relative_url %}
        {% endif %}
      {% endif %}

      <!-- NOTE: the separating space must NOT sit next to Liquid's whitespace-control
           dashes, or it is stripped and the slugs run together ("researchevents"). -->
      {% capture card_cats %}{% for c in post.categories %}{{ c | slugify }} {% endfor %}{% endcapture %}
      {% capture card_tags %}{% for t in post.tags %}{{ t | slugify }} {% endfor %}{% endcapture %}

      <a
        class="blog-card{% if forloop.first %} blog-card--featured{% endif %}"
        href="{{ href }}"
        data-cats="{{ card_cats | strip }}"
        data-tags="{{ card_tags | strip }}"
        {% if is_external %}target="_blank" rel="noopener noreferrer"{% endif %}
      >
        <div class="blog-card__media{% if post.thumbnail_fit == 'contain' %} blog-card__media--contain{% endif %}">
          {% if post.thumbnail %}
            {% include figure.liquid path=post.thumbnail sizes="640px" alt="" %}
          {% else %}
            <span class="blog-card__ph" aria-hidden="true">
              <span class="tiles"><span></span><span></span><span></span><span></span></span>
            </span>
          {% endif %}
        </div>
        <div class="blog-card__body">
          {% if cat %}
            <span class="feed__pill feed__pill--{{ cat | slugify }}">{{ cat | replace: '-', ' ' }}</span>
          {% endif %}
          <h2 class="blog-card__title">
            {{- post.title -}}
            {%- if is_external %}
              <i class="fa-solid fa-arrow-up-right-from-square blog-card__ext" aria-hidden="true"></i>
              <span class="sr-only">(opens in a new tab)</span>
            {% endif -%}
          </h2>
          {% if post.description %}
            <p class="blog-card__desc">{{ post.description }}</p>
          {% endif %}
          <p class="blog-card__meta">{{ post.date | date: '%b %-d, %Y' }} · {{ read_time }} min read</p>
        </div>
      </a>
    {% endfor %}

  </div>

  <p class="blog-empty" hidden>No posts match that filter yet. <button class="blog-empty__reset" type="button">Show all posts</button></p>

</div>

<script src="{{ '/assets/js/blog-filter.js' | relative_url }}" defer></script>
