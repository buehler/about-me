# About me

Personal website of Christoph Bühler: research, publications and journey.

A static site built with [Jekyll](https://jekyllrb.com/) and deployed to GitHub Pages by
[`.github/workflows/pages.yml`](.github/workflows/pages.yml). There is no CMS and no
server: the pages are plain HTML templates that are filled from a few data files.

- Live: https://me.cbue.ch/

## How to edit content

Almost every change is a one-line edit in one of these files. You don't need to touch the HTML.

| What | Where |
| --- | --- |
| Email, GitHub/LinkedIn/Bluesky/ORCID/Scholar links, organisation links (HSG, OST, smartive, …) | `_data/links.yml` |
| Name, role, group, supervisor, location, intro sentence, hobbies | `_data/site.yml` |
| Research interest cards | `_data/interests.yml` |
| Journey timeline (jobs, degrees, teaching) | `_data/journey.yml` |
| About text (Markdown) | `_includes/about.md` |
| Publications | `_publications/*.md` (one file per paper) |
| Paper PDFs | `assets/papers/` |

### Change a link

Edit the URL in `_data/links.yml`. Every page that shows the link (hero, footer, about text,
journey, search-engine metadata) is updated on the next build.

### Add a publication

1. Copy `_publications/_template.md` to `_publications/<url-slug>.md`. The file name
   becomes the URL: `/pub/<url-slug>/`.
2. Fill in the front matter (title, date, venue, authors, DOI, BibTeX, …) and write the
   abstract below it.
3. Put the PDF into `assets/papers/` and reference it in `pdf:`.

The homepage list, the filters, the detail page, `publications.bib`, the sitemap and the
Google Scholar meta tags are all generated from that one file.

## URLs and domains

The site is served at the root of the custom domain `https://me.cbue.ch/`. The domain is
set once in `_config.yml` (`url`, with an empty `baseurl`) and in `CNAME`. Internal links
never contain a hard-coded domain: templates use Jekyll's `relative_url` (and
`absolute_url` for canonical/social URLs).

**Changing the domain:** update `url` in `_config.yml`, `CNAME`, and the custom domain
under *Settings → Pages*, then push.

## Local preview

Requires Ruby ≥ 3.1 and Bundler.

```sh
bundle install
bundle exec jekyll serve --livereload      # http://localhost:4000
```

Without Ruby installed you can use Docker:

```sh
docker run --rm -p 4000:4000 -v "$PWD":/srv/jekyll -w /srv/jekyll ruby:3.3 \
  sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

Check internal links like CI does:

```sh
bundle exec jekyll build && bundle exec htmlproofer _site --disable-external
```

## Deployment

Every push runs the workflow: build, then check internal links. Pushes to `main`
additionally deploy to GitHub Pages. One-time setup: *Settings → Pages → Build and
deployment → Source: GitHub Actions*.

## Structure

```
_config.yml          site settings, collections, defaults
_data/               editable content (see table above)
_includes/           partials: head, nav, footer, cards, icons, about text
_layouts/            base page and publication page
_publications/       one Markdown file per publication
assets/css/site.css  all styles (light and dark theme)
assets/js/site.js    theme toggle, menu, filters, copy button, GSAP animations
assets/js/vendor/    GSAP 3.15.0 with ScrollTrigger and Flip (vendored)
assets/fonts/        Instrument Sans and Instrument Serif (SIL OFL), self-hosted
index.html           homepage
publications.bib     all BibTeX entries, generated
```

Animations respect `prefers-reduced-motion`, and the site is fully usable without JavaScript.
