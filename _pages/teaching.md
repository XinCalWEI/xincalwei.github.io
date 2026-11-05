---
layout: page
permalink: /teaching/
title: Teaching
kicker: Teaching & mentoring
description: I have served as a guest lecturer, teaching assistant, and faculty member for the following courses.
layout_width: wide
nav: true
nav_order: 3
---

<!-- Courses grouped by institution. Data: _data/teaching.yml (also feeds the
     CV's Teaching section). Styles: .tm-teach in _sass/pages/_inner.scss. -->

<div class="tm-teach">
  {% for school in site.data.teaching %}
    {% assign school_id = school.short | default: school.institution | slugify | prepend: 'teach-' %}
    <section class="teach-group" aria-labelledby="{{ school_id }}">
      <div class="teach-group__head">
        {% if school.short %}<p class="tag">{{ school.short }}</p>{% endif %}
        <h2 class="teach-group__title" id="{{ school_id }}">{{ school.institution }}</h2>
      </div>
      <ul class="teach-list">
        {% for course in school.courses %}
          <li class="teach-item">
            <h3 class="teach-item__title">{{ course.title }}</h3>
            {% if course.url %}
              <a class="text-link" href="{{ course.url }}" target="_blank" rel="noopener noreferrer">
                {{- course.link_label | default: 'Details' }}
                {% include icon.liquid name="arrow-up-right" %}
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
    </section>
  {% endfor %}

  <p class="teach-also">
    Mentoring: <a href="{{ '/people/' | relative_url }}">undergraduate researchers I work with</a>.
    Outreach: <a href="{{ '/outreach/' | relative_url }}">an undergraduate study group, K-12 hazard-science activities, and an invited practitioner seminar</a>.
  </p>
</div>
