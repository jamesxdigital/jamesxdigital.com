---
layout: default
title: Contact
permalink: /contact/
---

<div id="content" class="site-content">
  <main id="main" class="site-main inner">
    <div class="entry-content">
      <header class="entry-header">
        <h2 class="entry-title">Contact 📫</h2>
      </header>
      {% if site.contact_page_description %}
      <p>{{ site.contact_page_description }}</p>
      {{else}}
      {% endif %}
      <section class="contact-form">
        <form name="contact" data-netlify="true" data-netlify-recaptcha="true" netlify-honeypot="bot-field"
          method="post" id="contact-form">
          <div class="hidden">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </div>

          <div class="form-item">
            <label class="form-label">Your Email <span>*</span></label>
            <input type="text" name="email" placeholder="Your email address..." class="form-input" required />
          </div>

          <div class="form-item">
            <label class="form-label">Your Name <span>*</span></label>
            <input type="text" name="name" placeholder="Your name..." class="form-input" required />
          </div>

          <div class="form-item">
            <label class="form-label">Your Message <span>*</span></label>
            <textarea name="message" placeholder="Your message..." class="form-textarea"></textarea>
          </div>

          <div data-netlify-recaptcha="true"></div>

          <div class="form-item">
            <input type="submit" value="Send Message" class="button" />
          </div>
        </form>
      </section>
    </div><!-- .entry-content-->

  </main>
</div>
