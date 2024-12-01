---
layout: post
title: "Local Canvas – Hybrid AI Videos"
description: "An app transforming videos into hybrid artworks by detecting objects and applying artistic styles through AI."
weight: 3
thumbnail: "/assets/images/tripleinnovation/LocalCanvas/LocalCanvas_1.jpg"
client: "Triple Innovation, Netherlands"
---

Local Canvas is a collaborative project within Triple Innovation. The app is designed to transform videos into living artworks. Users upload a video, and our back-end AI identifies objects in the footage—such as people or cars. These objects can then be styled with specific artistic techniques, like Pop Art or a Gustav Klimt-inspired look, while the rest of the scene remains untouched. This creates a unique hybrid visual experience where AI-styled elements coexist with real-life surroundings.

<figure class="figure-full">
  <video controls crossorigin playsinline>
    <source src="/assets/images/tripleinnovation/LocalCanvas/LocalCanvas_4_1080.mp4" type="video/mp4">
  </video>
  <figcaption>
    <h4>Montage of Local Canvas Outputs</h4>
    <p>
      A demonstration of how Local Canvas detects objects in videos, applies artistic styles to them, and integrates them seamlessly into the scene.
    </p>
  </figcaption>
</figure>

<figure class="figure-full">
  <video controls crossorigin playsinline>
    <source src="/assets/images/tripleinnovation/LocalCanvas/LocalCanvas_5_1080.mp4" type="video/mp4">
  </video>
  <figcaption>
    <h4>Deep Dive into Local Canvas</h4>
    <p>
      A detailed walkthrough of how Local Canvas works, from object detection and image segmentation to applying AI-generated artistic styles and reconstructing the final video output.
    </p>
  </figcaption>
</figure>

In addition to applying predefined artistic styles, we also experimented with enabling users to create custom models based on their own drawings or photos. For instance, a user could draw a car, upload it, and the app would generate a model that applies their custom style to real cars in videos. This shifts the AI’s role from a passive tool to an active artistic collaborator, allowing users to remix reality in entirely new ways.

<figure class="figure-full">
  <video controls crossorigin playsinline>
    <source src="/assets/images/tripleinnovation/LocalCanvas/LocalCanvas_2_1080.mp4" type="video/mp4">
  </video>
  <figcaption>
    <h4>Custom Model: César Manrique-Inspired Style</h4>
    <p>
      An experiment where Local Canvas uses a custom LoRA trained on the artistic style of César Manrique, applying the style to a car detected in the video.
    </p>
  </figcaption>
</figure>

<figure class="figure-full">
  <video controls crossorigin playsinline>
    <source src="/assets/images/tripleinnovation/LocalCanvas/LocalCanvas_3_1080.mp4" type="video/mp4">
  </video>
  <figcaption>
    <h4>Custom Model: Hand-Drawn Car Style</h4>
    <p>
      A simpler experiment where Local Canvas uses a LoRA trained on a single hand-drawn image of a car. This custom style is then applied to a real-life car in the video.
    </p>
  </figcaption>
</figure>