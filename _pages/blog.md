---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
---

<!-- The index derives every filter from post front matter so the interface
     cannot drift from the content. Pagination remains off because combined
     search and filtering need access to the complete collection. -->

{% assign latest_post = site.posts | first %}

<div class="post about tm-blog" data-blog-index>
  <header class="blog-head">
    <p class="blog-eyebrow"><span aria-hidden="true"></span>Blog</p>
    <h1 class="post-title">Ideas, methods, and field notes.</h1>
    <div class="blog-head__footer">
      {% if site.blog_description %}
        <p class="post-description">{{ site.blog_description }}, along with the tools and conversations shaping my work.</p>
      {% endif %}
      <p class="blog-head__meta">
        <span>{{ site.posts | size }} posts</span>
        {% if latest_post %}
          <span aria-hidden="true"></span>
          <span>Updated <time datetime="{{ latest_post.date | date_to_xmlschema }}">{{ latest_post.date | date: '%b %Y' }}</time></span>
        {% endif %}
      </p>
    </div>
  </header>

  <section class="blog-discovery" aria-label="Find and filter posts">
    <div class="blog-tools">
      <div class="blog-search" role="search" aria-label="Search blog posts">
        <label class="sr-only" for="blog-search">Search posts</label>
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <input id="blog-search" type="search" placeholder="Search posts" autocomplete="off" spellcheck="false" aria-controls="blog-posts">
        <button class="blog-search__clear" type="button" aria-label="Clear search" hidden>
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <kbd aria-hidden="true">/</kbd>
      </div>

      <label class="blog-select" for="blog-type">
        <span class="sr-only">Filter by content type</span>
        <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
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
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </label>
    </div>

    <div class="blog-topics">
      <span class="blog-topics__label" id="blog-topics-label">Topics &amp; series</span>
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
    <button class="blog-reset" type="button" hidden>Clear filters <i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
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
    <span class="blog-empty__icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
    <h2>No matching posts</h2>
    <p>Try another keyword or clear the current filters.</p>
    <button class="blog-empty__reset" type="button">Show all posts</button>
  </div>
</div>

<script src="{{ '/assets/js/blog-filter.js' | relative_url }}" defer></script>
