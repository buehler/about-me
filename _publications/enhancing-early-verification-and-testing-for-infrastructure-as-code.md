---
title: "Enhancing Early Verification and Testing for Infrastructure as Code"
date: 2025-06-27
kind: "Master thesis"
filter: thesis
short: "MSc thesis · HSG"
venue:
authors:
  - "Christoph Bühler"
topics:
  - "Infrastructure as Code"
  - "Testing"
pdf: /assets/papers/msc-thesis-hsg-iac-verification.pdf
doi:
extra_links: []
bibtex: |
  @mastersthesis{buehler2025EarlyVerificationIaC,
    title        = {Enhancing Early Verification and Testing for Infrastructure as Code},
    author       = {Christoph Bühler},
    year         = 2025,
    month        = {June},
    day          = {27},
    address      = {9000 St. Gallen, Switzerland},
    school       = {University of St. Gallen (HSG)},
    type         = {Master's thesis}
  }
---
Infrastructure as Code (IaC) has become essential in managing modern cloud environments, yet misconfigurations remain a significant risk, often leading to costly outages and security breaches. This thesis introduces a novel static analysis approach for verifying network-level connectivity in Terraform-based IaC before deployment. By transforming declarative configurations into abstract graph models, the method enables early detection of unreachable services and misconfigurations without requiring infrastructure provisioning. A proof-of-concept tool, evaluated on the TerraDS dataset, demonstrated strong scalability and effectiveness in realworld scenarios. The approach integrates seamlessly into DevOps pipelines, enhancing existing IaC testing workflows. Looking ahead, the method offers potential for broader verification across multi-cloud environments, including cost and energy efficiency assessments.
