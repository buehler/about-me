---
# Copy this file to _publications/<url-slug>.md (the file name becomes the URL: /pub/<url-slug>/).
# Files starting with "_" are ignored, so this template is never published.
title: "Title of the Paper"
date: 2026-01-31                 # publication date (YYYY-MM-DD)
kind: "Conference paper"          # e.g. Conference paper, Journal article, Master thesis, Workshop paper
filter: conference                # filter chip on the homepage: conference | thesis
short: "ABC 2026"                 # short venue label shown on cards
venue: "Proceedings of the …"     # full venue; leave empty for theses
authors:
  - "Christoph Bühler"
  - "Co-Author Name"
topics:
  - "Topic one"
  - "Topic two"
pdf: /assets/papers/abc-2026.pdf  # put the PDF into assets/papers/; leave empty if none
doi: "10.1145/0000000"            # without https://doi.org/; leave empty if none
extra_links:                      # optional additional buttons; icon: package | database | link | file-text
  - label: "Replication Package"
    url: "https://doi.org/10.5281/zenodo.0000000"
    icon: package
bibtex: |
  @inproceedings{key,
    title = {Title of the Paper},
    author = {Bühler, Christoph},
    year = {2026},
  }
---
The abstract goes here, written in Markdown.
