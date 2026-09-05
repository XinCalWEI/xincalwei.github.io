// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "News",
          description: "Conferences, workshops, invited talks, and program milestones — newest first.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications-presentations",
          title: "Publications/Presentations",
          description: "Publications are ordered from newest to oldest.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Research on geohazard susceptibility, runout, monitoring, infrastructure response, and risk, complemented by retrospective analysis of observed impacts.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-community-outreach",
          title: "Community Outreach",
          description: "Community engagement and public science outreach activities.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/outreach/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "I have served as a guest lecturer, teaching assistant, and faculty member for the following courses.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-people-mentees",
          title: "People / Mentees",
          description: "Students I mentor and have mentored through undergraduate research programs.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "Bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-gallery",
              title: "Gallery",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/gallery/";
              },
            },{id: "post-how-robots-learn-to-get-better-notes-from-liyiming-ke",
        
          title: "How Robots Learn to Get Better: Notes from Liyiming Ke",
        
        description: "My reflections on Liyiming Ke&#39;s discussion of experience-driven robot learning, generalization, evaluation, embodiment, and the human questions raised by increasingly capable AI.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/how-robots-learn-to-get-better/";
          
        },
      },{id: "post-when-intelligence-becomes-infrastructure-notes-from-ming-zeng",
        
          title: "When Intelligence Becomes Infrastructure: Notes from Ming Zeng",
        
        description: "My reflections on Ming Zeng&#39;s discussion of strategic uncertainty, AI industry evolution, AI-native organizations, and the changing value of human work.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/when-intelligence-becomes-infrastructure/";
          
        },
      },{id: "post-call-for-abstracts-agu26-session-nh052",
        
          title: "Call for Abstracts: AGU26 Session NH052",
        
        description: "We invite contributions on reliable and scalable geohazard intelligence, from multiscale sensing and geospatial AI to open data foundations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/agu26-nh052-call-for-abstracts/";
          
        },
      },{id: "post-geospatial-foundation-models",
        
          title: "Geospatial Foundation Models",
        
        description: "Exploring foundation models for geospatial applications",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/geospatial-foundation-models/";
          
        },
      },{id: "post-knowledge-guided-machine-learning-kgml",
        
          title: "Knowledge-Guided Machine Learning (KGML)",
        
        description: "An introduction to knowledge-guided machine learning approaches",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/knowledge-guided-machine-learning/";
          
        },
      },{id: "post-community-curated-open-access-landslide-platform",
        
          title: "Community-Curated, Open-Access Landslide Platform",
        
        description: "A centralized hub for globally sourced landslide inventories and geospatial data, supporting AI model development and benchmarking.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/landslide-platform/";
          
        },
      },{id: "post-git-from-beginner-to-advanced",
        
          title: "Git: From Beginner to Advanced",
        
        description: "A practical Git workflow, common commands, and learning resources from beginner to advanced",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/git-beginner-to-advanced/";
          
        },
      },{id: "post-key-elements-for-improving-pixel-based-landslide-susceptibility-mapping",
        
          title: "Key Elements for Improving Pixel-Based Landslide Susceptibility Mapping",
        
        description: "Exploring key strategies to enhance landslide susceptibility mapping through physics-based models, spatial neighborhoods, and data quality improvements.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/key-elements-landslide-susceptibility/";
          
        },
      },{id: "post-common-terminal-shortcuts",
        
          title: "Common Terminal Shortcuts",
        
        description: "A clean, card-style cheatsheet for frequently used command line interface shortcuts",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/terminal-shortcuts/";
          
        },
      },{id: "books-probability-concepts-in-engineering-emphasis-on-applications-to-civil-and-environmental-engineering-2nd-edition",
          title: 'Probability Concepts in Engineering: Emphasis on Applications to Civil and Environmental Engineering (2nd...',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/probability_concepts_engineering/";
            },},{id: "books-rainfall-induced-soil-slope-failure",
          title: 'Rainfall-Induced Soil Slope Failure',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/rainfall_induced_slope_failure/";
            },},{id: "books-shoe-dog",
          title: 'Shoe Dog',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/shoe_dog/";
            },},{id: "books-structural-and-system-reliability",
          title: 'Structural and System Reliability',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/structural_system_reliability/";
            },},{id: "books-the-body-keeps-the-score-brain-mind-and-body-in-the-healing-of-trauma",
          title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of...',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_body_keeps_the_score/";
            },},{id: "books-the-english-patient",
          title: 'The English Patient',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_english_patient/";
            },},{id: "books-thinking-fast-and-slow",
          title: 'Thinking, Fast and Slow',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/thinking_fast_and_slow/";
            },},{id: "news-emi-pmc-2024",
          title: 'EMI/PMC 2024',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/emipmc_2024/";
            },},{id: "news-2024-midas-postdoctoral-fellowship-programs-orientation-amp-ai-bootcamp",
          title: '2024 MIDAS Postdoctoral Fellowship Programs Orientation &amp;amp; AI Bootcamp',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/midas_2024_bootcamp/";
            },},{id: "news-agu-fall-meeting-2024",
          title: 'AGU Fall Meeting 2024',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/agu24_announcement/";
            },},{id: "news-2025-spring-geotechnical-seminar",
          title: '2025 Spring Geotechnical Seminar',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/spring_geotech_seminar_2025/";
            },},{id: "news-u-m-knowledge-guided-machine-learning-kgml-workshop",
          title: 'U-M Knowledge-Guided Machine Learning (KGML) Workshop',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/kgml_workshop_2025/";
            },},{id: "news-ai-in-science-fellowship-entrepreneurial-workshop",
          title: 'AI in Science Fellowship Entrepreneurial Workshop',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/banbury_entrepreneurial_workshop_2025/";
            },},{id: "news-u-m-annual-data-science-amp-ai-summit-2025",
          title: 'U-M Annual Data Science &amp;amp; AI Summit 2025',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/midas_summit_2025/";
            },},{id: "news-agu25-toward-reliable-and-scalable-geohazard-intelligence",
          title: 'AGU25 – Toward Reliable and Scalable Geohazard Intelligence',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/agu25_announcement/";
            },},{id: "news-2025-american-geophysical-union-agu-fall-meeting",
          title: '2025 American Geophysical Union (AGU) Fall Meeting',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/agu25_meeting/";
            },},{id: "news-mentees-present-at-the-2026-urop-spring-research-symposium",
          title: 'Mentees Present at the 2026 UROP Spring Research Symposium',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/urop_symposium_2026/";
            },},{id: "news-multimodal-ai-and-new-collaborations-at-aims26",
          title: 'Multimodal AI and New Collaborations at AIMS26',
          description: "Reflections from AIMS26 at UC San Diego, where researchers across disciplines explored multimodal AI through talks, tutorials, a hackathon, and shared conversations.",
          section: "News",handler: () => {
              window.location.href = "/news/aims26_multimodal_ai/";
            },},{id: "news-pitching-terramosaic-at-the-interdisciplinary-science-summit-2026",
          title: 'Pitching TerraMosaic at the Interdisciplinary Science Summit 2026',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/interdisciplinary_science_summit_2026/";
            },},{id: "projects-physics-guided-ai-for-regional-landslide-susceptibility",
          title: 'Physics-Guided AI for Regional Landslide Susceptibility',
          description: "A three-paper first-author research program develops, tests, and interprets physics-guided models for cross-region landslide-susceptibility mapping, with explicit analysis of training-sample variability.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_ai_physics_susceptibility/";
            },},{id: "projects-landslide-risk-assessment-from-failure-to-consequence",
          title: 'Landslide Risk Assessment from Failure to Consequence',
          description: "A subset-simulation and large-deformation framework propagates uncertain soil-strength parameters through slope failure and post-failure response, then links case-specific consequence measures to vulnerability, temporal exposure, and risk.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_risk_assessment_simulation/";
            },},{id: "projects-submarine-debris-flow-runout-and-pipeline-risk",
          title: 'Submarine Debris-Flow Runout and Pipeline Risk',
          description: "Regional runout simulations capture material softening over complex seabed terrain, then estimate pipeline impact, network damage, and the benefits of rerouting.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_submarine_debris_flow/";
            },},{id: "projects-pore-water-pressure-forecasting-with-recurrent-neural-networks",
          title: 'Pore-Water Pressure Forecasting with Recurrent Neural Networks',
          description: "A field study compares MLP, RNN, LSTM, and GRU models for one-hour-ahead pore-water-pressure forecasting from monitored rainfall and PWP histories.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_deep_learning_timeseries/";
            },},{id: "projects-hazard-characterization-of-fast-moving-landslide-runout-with-geospatial-deep-learning",
          title: 'Hazard Characterization of Fast-Moving Landslide Runout with Geospatial Deep Learning',
          description: "Project materials are currently being prepared.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_geospatial_deep_learning/";
            },},{id: "projects-horizontal-capacity-of-offshore-mat-foundations-under-cyclic-waves",
          title: 'Horizontal Capacity of Offshore Mat Foundations under Cyclic Waves',
          description: "Coupled soil–water simulations show how cyclic loading, clay structure, and over-consolidation govern interface pore pressure and horizontal-capacity evolution in offshore mat foundations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_infrastructure_vulnerability/";
            },},{id: "projects-unveiling-the-underappreciated-consequences-of-landslides-across-the-united-states-with-generative-ai",
          title: 'Unveiling the Underappreciated Consequences of Landslides across the United States with Generative AI...',
          description: "An agentic generative-AI framework that extracts and synthesizes diverse web sources to capture the full range of direct and indirect landslide impacts.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_generative_ai_landslides/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%78%69%6E%63%77%65%69@%75%6D%69%63%68.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/XinCalWEI", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/xin-wei-calvin", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Bs4I0eAAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
