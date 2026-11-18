---
title: "TerraDS: A Dataset for Terraform HCL Programs"
date: 2025-04-28
kind: "Conference paper"
filter: conference
short: "MSR 2025"
venue: "Proceedings of the IEEE/ACM 22nd International Conference on Mining Software Repositories (MSR)"
authors:
  - "Christoph Bühler"
  - "David Spielmann"
  - "Roland Meier"
  - "Guido Salvaneschi"
topics:
  - "Infrastructure as Code"
  - "Dataset"
pdf: /assets/papers/terrads-msr-2025.pdf
doi: "10.1109/msr66628.2025.00101"
extra_links:
  - label: "Dataset"
    url: "https://zenodo.org/records/14217386"
    icon: database
bibtex: |
  @inproceedings{buehler2025TerraDS,
    acronym = {MSR},
    author = {Bühler, Christoph and Spielmann, David and Meier, Roland and Salvaneschi, Guido},
    title = {{TerraDS}: A Dataset for {Terraform} {HCL} Programs},
    booktitle = {Proceedings of the IEEE/ACM 22nd International Conference on Mining Software Repositories},
    series = {MSR '25},
    year = {2025},
    month = apr,
    numpages = {5},
    pages = {654--658},
    location = {Ottawa, Canada},
    publisher = {IEEE},
    address = {Piscataway, NJ, USA},
    isbn = {979-8-3315-0183-9},
    doi = {10.1109/MSR66628.2025.00101},
    keywords = {Cloud Computing, Configuration Management, Open Source Software, Static Analysis},
  }
---
Infrastructure as Code (IaC) aims to automate infrastructure management by enabling the definition of infrastructure configurations in programs, rather than manually configuring hardware or cloud resources. Terraform is one of the most widely used IaC tools, gaining significant traction in recent years, as highlighted by its large and active user community and widespread adoption in both open-source and enterprise environments. Terraform’s code is written in the HashiCorp Configuration Language (HCL), which defines the infrastructure in a declarative manner. Despite the widespread adoption of Terraform, there is no large-scale dataset available for researchers to study IaC Terraform programs systematically. To address this gap, we present TerraDS, the first dataset of publicly available Terraform programs written in HCL. TerraDS contains the HCL code and the metadata of 67,360 open source repositories with permissive open-source licenses. The dataset includes 279,344 Terraform modules with 1,773,991 registered resources, all compiled into a reusable archive (~335 MB).
