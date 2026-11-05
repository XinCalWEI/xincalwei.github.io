---
layout: page
title: Gallery
permalink: /gallery/
description: Moments from conferences, campus, and the places in between.
kicker: Photographs
layout_width: wide
nav: false
---

<!-- Equal-width columns (1 / 2 / 3 by viewport); every photo keeps its own
     shape, so the zoomed view (assets/js/zoom.js) is never cropped. width/height
     are the files' pixel sizes so the columns reserve space before images load.
     Banbury photos are referenced from assets/img/news/ — do not duplicate the
     files into assets/img/gallery/.
     tile_sizes mirrors the column breakpoints in .tm-gallery .gallery-grid
     (1 column below 360px, 2 from 360px, 3 from 992px) so phones fetch the
     480w/800w variant instead of 1400w. San Diego tiles 1, 2, 5, 7 and 9 are
     the tops of the columns in the first screen (measured at 390, 834 and
     1440px) and load eagerly; 1 and 7, the first tile of each phone column,
     also get fetchpriority="high". Everything else stays lazy. -->

{% assign tile_sizes = '(min-width: 1120px) 344px, (min-width: 992px) 31vw, (min-width: 360px) 46vw, 92vw' %}

<div class="tm-gallery">
  <section class="gallery-set">
    <h2 class="gallery-set__title">San Diego, California — June 2026</h2>
    <div class="gallery-grid">
      <figure class="gallery-tile">
        {% include figure.liquid loading="eager" fetchpriority="high" path="assets/img/gallery/san-diego-2026-4657.jpg" width="2000" height="1500" title="A curious gull along the La Jolla coast" alt="Seagull overlooking the La Jolla coastline" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>A curious gull along the La Jolla coast</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid loading="eager" path="assets/img/gallery/san-diego-2026-4800.jpg" width="2000" height="1500" title="A quiet moment above the Pacific" alt="Two visitors sitting above the Pacific Ocean along the San Diego coast" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>A quiet moment above the Pacific</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4813.jpg" width="2000" height="1500" title="Along the La Jolla coast" alt="Xin Wei along the La Jolla coast" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Along the La Jolla coast</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4746.jpg" width="2000" height="1125" title="Seabirds and sea lions along La Jolla's rocky shore" alt="Seabirds and sea lions along the rocky La Jolla shoreline" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Seabirds and sea lions along La Jolla's rocky shore</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid loading="eager" path="assets/img/gallery/san-diego-2026-4766.jpg" width="2000" height="1125" title="Evening light over the Pacific" alt="Evening light over the Pacific Ocean along the San Diego coast" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Evening light over the Pacific</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4774.jpg" width="2000" height="1125" title="Pacific swells meeting the La Jolla cliffs" alt="Waves breaking along the La Jolla cliffs" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Pacific swells meeting the La Jolla cliffs</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid loading="eager" fetchpriority="high" path="assets/img/gallery/san-diego-2026-4909.jpg" width="1500" height="2000" title="AIMS26 conversations with a view of the Pacific" alt="Xin Wei with a fellow AIMS26 participant overlooking the Pacific Ocean" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>AIMS26 conversations with a view of the Pacific</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4917.jpg" width="2000" height="1500" title="Paragliding above the Pacific" alt="Red and blue paraglider above the Pacific Ocean" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Paragliding above the Pacific</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid loading="eager" path="assets/img/gallery/san-diego-2026-4962.jpg" width="2000" height="1500" title="Sunlight breaking through over the San Diego coast" alt="Sunbeams breaking through clouds above the San Diego coast" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Sunlight breaking through over the San Diego coast</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4964.jpg" width="2000" height="1125" title="Sunbeams over the Pacific" alt="Sunbeams illuminating the Pacific Ocean" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Sunbeams over the Pacific</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4973.jpg" width="2000" height="1125" title="Light spilling through the clouds" alt="Soft sunbeams over the Pacific Ocean" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Light spilling through the clouds</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/san-diego-2026-4978.jpg" width="2000" height="1125" title="A paraglider beneath the evening light" alt="Paraglider beneath sunbeams over the Pacific Ocean" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>A paraglider beneath the evening light</figcaption>
      </figure>
    </div>
  </section>

  <section class="gallery-set">
    <h2 class="gallery-set__title">AI in Science Fellowship Entrepreneurial Workshop — Banbury Center, NY</h2>
    <div class="gallery-grid">
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_group.jpg" width="6550" height="4367" title="AI in Science Fellows at the Entrepreneurial Workshop" alt="Group photo of AI in Science Fellows at the Banbury Center, September 2025" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>AI in Science Fellows at the Entrepreneurial Workshop</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_2.jpg" width="3024" height="4032" title="Outside the Banbury Center" alt="Xin Wei with a fellow participant outside the Banbury Center" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Outside the Banbury Center</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_1.jpg" width="4032" height="3024" title="Evening conversations on the Banbury lawn" alt="Fellows talking on the lawn outside the Banbury Center at dusk" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Evening conversations on the Banbury lawn</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_3.jpg" width="3520" height="1980" title="A quiet visitor on the Banbury grounds" alt="A deer grazing on the Banbury Center grounds" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>A quiet visitor on the Banbury grounds</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_4.jpg" width="3520" height="1980" title="Sunset over the harbor" alt="Fiery sunset over the water near the Banbury Center" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Sunset over the harbor</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_5.jpg" width="4032" height="3024" title="Dusk through the trees" alt="Sunset framed by trees over the harbor near the Banbury Center" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Dusk through the trees</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/news/banbury_6.jpg" width="4032" height="3024" title="Last light over the water" alt="Evening sky over the harbor near the Banbury Center" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Last light over the water</figcaption>
      </figure>
    </div>
  </section>

  <section class="gallery-set">
    <h2 class="gallery-set__title">Four Seasons in Ann Arbor</h2>
    <div class="gallery-grid">
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/summer-ann-arbor-4296.jpg" width="2000" height="1500" title="Summer in Ann Arbor" alt="Children chasing giant soap bubbles on a campus lawn in Ann Arbor" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Summer in Ann Arbor</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/autumn_1.jpg" width="4032" height="3024" title="Autumn in Michigan" alt="A white curly-coated dog on a wide green lawn under a dramatic cloudy sky" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Autumn in Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/autumn_2.jpg" width="4032" height="3024" title="Autumn in Michigan" alt="A red maple among green and yellow trees beside a grassy field" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Autumn in Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/autumn_3.jpg" width="3024" height="4032" title="Autumn in Michigan" alt="A tall red maple on a residential street, its leaves scattered across the sidewalk" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Autumn in Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/autumn_4.jpg" width="4032" height="3024" title="Autumn in Michigan" alt="Green, orange and red trees side by side under grey clouds" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Autumn in Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/autumn_5.jpg" width="4032" height="3024" title="Autumn in Michigan" alt="A road lined with trees turning orange and yellow" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Autumn in Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/autumn_6.jpg" width="1440" height="1080" title="Autumn in Michigan" alt="A faint rainbow above yellow trees at the edge of an empty basketball court" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Autumn in Michigan</figcaption>
      </figure>
    </div>
  </section>

  <section class="gallery-set">
    <h2 class="gallery-set__title">Group Outing</h2>
    <div class="gallery-grid">
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/group_outing.jpg" width="2040" height="1536" title="Group outing" alt="Group outing by the water" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>Group outing</figcaption>
      </figure>
    </div>
  </section>

  <section class="gallery-set">
    <h2 class="gallery-set__title">Beauty of the University of Michigan</h2>
    <div class="gallery-grid">
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/umich-1.jpeg" width="2048" height="1365" title="University of Michigan" alt="An ivy-covered red-brick campus building framed by orange leaves, with fallen leaves in the foreground" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>University of Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/umich2.jpeg" width="2048" height="1366" title="University of Michigan" alt="Two people walking past a glass and orange-panelled campus building beneath an autumn oak" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>University of Michigan</figcaption>
      </figure>
      <figure class="gallery-tile">
        {% include figure.liquid path="assets/img/gallery/umich3.jpeg" width="1280" height="1600" title="University of Michigan" alt="A Gothic stone campus building with twin towers against a pink sunset sky" class="img-fluid" sizes=tile_sizes zoomable=true %}
        <figcaption>University of Michigan</figcaption>
      </figure>
    </div>
    <p class="gallery-set__note">Images are from the <a href="https://www.linkedin.com/posts/university-of-michigan_all-the-fall-colors-ugcPost-7257014815318016000-1nE0" target="_blank" rel="noopener noreferrer">official University of Michigan account</a>.</p>
  </section>

</div>
