---
layout: default
permalink: /blog/
title: Blog
description: Research notes on geohazards, landslide data, and AI, plus perspectives on AI systems, tutorials, and event reports.
nav: true
nav_order: 6
layout_width: wide
---

<!-- The index derives every filter from post front matter so the interface
     cannot drift from the content. Pagination remains off because combined
     search and filtering need access to the complete collection.
     JS hooks (assets/js/blog-filter.js): .tm-blog[data-blog-index], .blog-grid,
     .blog-card[data-cats|data-tags|data-search|data-tail], .chip[data-kind=tag]
     [data-filter][data-label], #blog-type, #blog-search, .blog-search__clear,
     .blog-filters__status, .blog-empty, .blog-reset, .blog-empty__reset. -->

{% assign latest_post = site.posts | first %}

<div class="post tm-blog" data-blog-index>
  <header class="post-header blog-head">
    <p class="kicker">News &amp; writing</p>
    <h1 class="post-title">Blog</h1>
    <p class="post-description">
      Ideas, methods, and field notes.
      {% if site.blog_description %}{{ site.blog_description }}, along with the tools and conversations shaping my work.{% endif %}
    </p>
    <p class="post-meta blog-head__meta">
      {{ site.posts | size }} posts
      {%- if latest_post %}<span aria-hidden="true"> · </span>Updated <time datetime="{{ latest_post.date | date_to_xmlschema }}">{{ latest_post.date | date: '%b %Y' }}</time>{% endif %}
    </p>
  </header>

  <section class="blog-discovery" aria-label="Find and filter posts">
    <div class="blog-tools">
      <div class="blog-search" role="search" aria-label="Search blog posts">
        <label class="sr-only" for="blog-search">Search posts</label>
        {% include icon.liquid name="search" class="blog-search__icon" %}
        <input id="blog-search" type="search" placeholder="Search posts" autocomplete="off" spellcheck="false" aria-controls="blog-posts">
        <button class="blog-search__clear" type="button" aria-label="Clear search" hidden>
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>

      <div class="blog-select">
        <label class="blog-select__label" for="blog-type">Type</label>
        <select id="blog-type" aria-controls="blog-posts">
          <option value="">All types</option>
          {% assign registered_category_keys = site.data.blog_taxonomy.categories | map: 'key' %}
          {% for taxonomy_category in site.data.blog_taxonomy.categories %}
            {% assign category_key = taxonomy_category.key %}
            {% assign category_posts = site.categories[category_key] %}
            {% if category_posts %}
              <option value="{{ category_key | slugify }}">{{ taxonomy_category.label }}</option>
            {% endif %}
          {% endfor %}
          {% assign categories = site.categories | sort %}
          {% for category in categories %}
            {% unless registered_category_keys contains category[0] %}
              <option value="{{ category[0] | slugify }}">{{ category[0] | replace: '-', ' ' | capitalize }}</option>
            {% endunless %}
          {% endfor %}
        </select>
        {% include icon.liquid name="chevron-down" class="blog-select__chevron" %}
      </div>
    </div>

    <div class="blog-topics">
      <span class="blog-topics__label" id="blog-topics-label">Topics</span>
      <div class="blog-filters" role="group" aria-labelledby="blog-topics-label">
        <button class="chip is-active" type="button" data-filter="" data-kind="tag" data-label="All" aria-pressed="true" aria-controls="blog-posts">
          All <span class="chip__n">{{ site.posts | size }}</span>
        </button>
        {% assign registered_tag_keys = site.data.blog_taxonomy.tags | map: 'key' %}
        {% for taxonomy_tag in site.data.blog_taxonomy.tags %}
          {% assign tag_key = taxonomy_tag.key %}
          {% assign tag_posts = site.tags[tag_key] %}
          {% if tag_posts %}
            {% assign tag_slug = tag_key | slugify %}
            <button class="chip" type="button" data-filter="{{ tag_slug }}" data-kind="tag" data-label="{{ taxonomy_tag.label | escape }}" aria-pressed="false" aria-controls="blog-posts">
              {{ taxonomy_tag.label }} <span class="chip__n">{{ tag_posts | size }}</span>
            </button>
          {% endif %}
        {% endfor %}
        {% assign tags = site.tags | sort %}
        {% for tag in tags %}
          {% unless registered_tag_keys contains tag[0] %}
            {% assign tag_slug = tag[0] | slugify %}
            <button class="chip" type="button" data-filter="{{ tag_slug }}" data-kind="tag" data-label="{{ tag[0] | escape }}" aria-pressed="false" aria-controls="blog-posts">
              {{ tag[0] }} <span class="chip__n">{{ tag[1] | size }}</span>
            </button>
          {% endunless %}
        {% endfor %}
      </div>
    </div>

  </section>

  <div class="blog-results">
    <p class="blog-filters__status" role="status" aria-live="polite" aria-atomic="true" data-total="{{ site.posts | size }}">
      Showing all {{ site.posts | size }} posts
    </p>
    <button class="blog-reset" type="button" hidden>Clear filters</button>
  </div>

  <div class="blog-grid" id="blog-posts">
    {% assign supporting_count = site.posts | size | minus: 1 %}
    {% assign tail_remainder = supporting_count | modulo: 2 %}
    {% for post in site.posts %}
      {% assign is_tail = false %}
      {% if forloop.last and tail_remainder == 1 %}
        {% assign is_tail = true %}
      {% endif %}
      {% include blog_card.liquid post=post featured=forloop.first latest=forloop.first tail=is_tail %}
    {% endfor %}
  </div>

  <div class="blog-empty" hidden>
    <h2>No matching posts</h2>
    <p>Try another keyword or clear the current filters.</p>
    <button class="xw-btn xw-btn--secondary blog-empty__reset" type="button">Show all posts</button>
  </div>
</div>

<script src="{{ '/assets/js/blog-filter.js' | relative_url | bust_file_cache }}" defer></script>
