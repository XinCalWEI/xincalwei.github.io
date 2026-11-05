---
layout: page
permalink: /outreach/
title: Community Outreach
nav_title: Outreach
kicker: Service & outreach
description: Community engagement and public science outreach activities.
layout_width: wide
nav: false # reached through the "More" menu and the footer
nav_order: 5
---

<div class="prose tm-outreach">

<article class="story" markdown="1">
<p class="story__kicker">Mentorship</p>

## [Journey Through CEE: from undergrad to future success](https://cee.engin.umich.edu/2024/12/16/building-bridges-advancing-community-at-u-m-civil-environmental-engineering/)

While there are many formal opportunities for undergraduates to engage with the department and professors, there are fewer informal channels for them to connect with PhD students, postdocs, or faculty members—to ask questions, seek guidance, and build relationships.

This project aims to establish a study group named "Journey Through CEE: from undergrad to future success" specifically for undergraduate students within the Civil and Environmental Engineering (CEE) department. Each study group meeting will feature several speakers (PhD students, postdocs, or professors) who will share their insights on various themes, including course learning experiences, academic research, career planning, and even personal life experiences (like managing stress and overcoming challenges).

The primary goal of the study group is to increase communication channels between undergraduates and PhD students, postdocs, or professors (helping undergraduate students feel more connected to the CEE community), while offering mentorship in a supportive, informal setting. The study group will help students build healthier mindsets, increase academic exposure, develop critical thinking skills, and explore both academic and career pathways.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/outreach/journey_through_cee.jpg" width="4032" height="3024" sizes="(min-width: 800px) 736px, 95vw" class="img-fluid rounded z-depth-1" alt="Group photo at a Journey Through CEE mentorship gathering" zoomable=true %}
    </div>
</div>
<div class="caption">
    Journey Through CEE: Connecting undergraduates with mentors for academic and career success.
</div>

</article>

<article class="story" markdown="1">
<p class="story__kicker">Academic Service</p>

## Judge for the Poster Session at the [U-M Annual Data Science & AI Summit 2025](https://midas.umich.edu/events/midas-summit-2025-posters/)

</article>

<article class="story" markdown="1">
<p class="story__kicker">Invited Talk</p>

## [2025 Spring Geotechnical Seminar](https://sections.asce.org/connecticut/042525-spring-geotechnical-seminar-earn-7-nys-pdhs)

<p class="story__meta">25 April 2025 · TPC River Highlands, Cromwell, Connecticut</p>

Invited by the CT Valley Geo-Institute Committee, I delivered an invited talk, "Advancing Regional Landslide Risk Assessment with Integrated AI-Physics Solutions," at the 2025 Spring Geotechnical Seminar in Connecticut to over 100 geotechnical engineering professionals, helping raise industry exposure to emerging methods and tools from academia.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/spring_geotech_seminar_2025.jpeg" width="4032" height="3024" sizes="(min-width: 800px) 736px, 95vw" class="img-fluid rounded z-depth-1" alt="Certificate presentation at the 2025 Spring Geotechnical Seminar" zoomable=true %}
    </div>
</div>
<div class="caption">
    At the 2025 Spring Geotechnical Seminar, Cromwell, Connecticut.
</div>

</article>

<article class="story" markdown="1">
<p class="story__kicker">K-12 Science Outreach</p>

## ["Urban Hazards and Risk Management" Event](https://www.sohu.com/a/324524017_363254)

At SJTU, I co-designed science outreach activities for elementary school students in China as part of the "Urban Hazards and Risk Management" event, held in 2019 at Tongji University and organized by the Chinese Society for Civil Engineering, with co-hosts including SJTU, the ISSMGE Technical Committee TC304, and the journal Underground Space.

The program combined expert lectures, hands-on activities, interactive games, and laboratory demonstrations to introduce disaster awareness and risk management concepts to young audiences in an engaging and accessible way.

I contributed to designing activities such as VR-based fire escape training and wave-dissipating seawall demonstrations, which transformed abstract natural hazard concepts into tangible experiences. These activities strengthened students' understanding of disaster risks, fostered curiosity about science and engineering, and encouraged early awareness of community resilience.

<div class="row media-row mt-3">
    <div class="col-sm" style="--ar: 1.778">
        {% include figure.liquid loading="lazy" path="assets/img/outreach/sjtu_outreach_1.jpg" sizes="(min-width: 576px) 300px, 95vw" width="1920" height="1080" class="img-fluid rounded z-depth-1" alt="Students watching a tabletop wave-dissipating seawall demonstration" zoomable=true %}
    </div>
    <div class="col-sm" style="--ar: 1.333">
        {% include figure.liquid loading="lazy" path="assets/img/outreach/sjtu_outreach_2.jpg" sizes="(min-width: 576px) 300px, 95vw" width="1440" height="1080" class="img-fluid rounded z-depth-1" alt="Outreach volunteers explaining coastal hazard demonstrations to students" zoomable=true %}
    </div>
    <div class="col-sm" style="--ar: 1.333">
        {% include figure.liquid loading="lazy" path="assets/img/outreach/sjtu_outreach_3.jpg" sizes="(min-width: 576px) 300px, 95vw" width="3968" height="2976" class="img-fluid rounded z-depth-1" alt="Students taking part in a supervised VR fire escape activity" zoomable=true %}
    </div>
</div>
<div class="caption">
    Elementary school students engaging with VR fire escape training and wave-dissipating seawall demonstrations at the Urban Hazards and Risk Management event, Tongji University, 2019.
</div>

{% comment %} Video posters: the 800w WebP that jekyll-imagemagick generates (about 34 KB against 84 KB for the 1920px JPEG); the JPEG when WebP generation is off (local dev). {% endcomment %}
{% assign video_poster_base = 'assets/img/outreach/sjtu_video_' %}
{% if site.imagemagick.enabled %}{% assign video_poster_ext = '_poster-800.webp' %}{% else %}{% assign video_poster_ext = '_poster.jpg' %}{% endif %}

<div class="row media-row mt-4">
    <div class="col-sm">
        <video controls playsinline preload="none" width="1920" height="1080" poster="{{ video_poster_base | append: '1' | append: video_poster_ext | relative_url }}" aria-label="Urban Hazards and Risk Management outreach demonstration 1" class="img-fluid rounded z-depth-1">
            <source src="{{ 'assets/img/outreach/sjtu_video_1.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="col-sm">
        <video controls playsinline preload="none" width="1920" height="1080" poster="{{ video_poster_base | append: '2' | append: video_poster_ext | relative_url }}" aria-label="Urban Hazards and Risk Management outreach demonstration 2" class="img-fluid rounded z-depth-1">
            <source src="{{ 'assets/img/outreach/sjtu_video_2.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="col-sm">
        <video controls playsinline preload="none" width="1920" height="1080" poster="{{ video_poster_base | append: '3' | append: video_poster_ext | relative_url }}" aria-label="Urban Hazards and Risk Management outreach demonstration 3" class="img-fluid rounded z-depth-1">
            <source src="{{ 'assets/img/outreach/sjtu_video_3.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
<div class="caption">
    Video demonstrations of the hands-on activities at the event (about 15–18 seconds each, 9–11 MB; they load when played).
</div>

</article>

</div>
