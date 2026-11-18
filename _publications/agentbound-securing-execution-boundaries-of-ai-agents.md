---
title: "AgentBound: Securing Execution Boundaries of AI Agents"
date: 2026-07-07
kind: "Conference paper"
filter: conference
short: "FSE 2026"
venue: "Proceedings of the 34th ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (FSE)"
authors:
  - "Christoph Bühler"
  - "Matteo Biagiola"
  - "Luca Di Grazia"
  - "Guido Salvaneschi"
topics:
  - "AI agents"
  - "MCP"
  - "Access control"
pdf: /assets/papers/agentbound-fse-2026.pdf
doi: "10.1145/3808103"
extra_links:
  - label: "Replication Package"
    url: "https://doi.org/10.5281/zenodo.19571298"
    icon: package
bibtex: |
  @inproceedings{buehler2026AgentBound,
    title = {{{AgentBound}}: {{Securing}} Execution Boundaries of {{AI}} Agents},
    booktitle = {Proceedings of the 34th {{ACM}} Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering ({{FSE}})},
    author = {Bühler, Christoph and Biagiola, Matteo and Di Grazia, Luca and Salvaneschi, Guido},
    date = {2026-07},
    series = {2026},
    volume = {3},
    pages = {24},
    publisher = {ACM},
    address = {New York, NY, USA},
    location = {Montreal, Canada},
    doi = {10.1145/3808103},
    acronym = {FSE},
    articleno = {FSE096},
    issue = {FSE},
    supp = {https://doi.org/10.5281/zenodo.19571298}
  }
---
Large Language Models (LLMs) have evolved into AI agents that interact with external tools and environments to perform complex tasks. The Model Context Protocol (MCP) has become the de facto standard for connecting agents with such resources, but security has lagged behind: thousands of MCP servers execute with unrestricted access to host systems, creating a broad attack surface. In this paper, we introduce AgentBound, the first access control framework for MCP servers. AgentBound combines a declarative policy mechanism, inspired by the Android permission model, with a policy enforcement engine that contains malicious behavior without requiring MCP server modifications. We build a dataset containing the 296 most popular MCP servers, and show that access control policies can be generated automatically from source code with 80.9% accuracy. We also show that AgentBound blocks the majority of security threats in several malicious MCP servers, and that the policy enforcement engine introduces negligible overhead. Our contributions provide developers and project managers with a foundation for securing MCP servers while maintaining productivity, enabling researchers and tool builders to explore new directions for declarative access control and MCP security.
