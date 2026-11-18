{%- comment -%}
About text (Markdown). Organisation links come from _data/links.yml via org.html.
{%- endcomment -%}
{%- capture smartive %}{% include org.html key="smartive" %}{% endcapture -%}
{%- capture ost %}{% include org.html key="ost" %}{% endcapture -%}
{%- capture hsg %}{% include org.html key="hsg" %}{% endcapture -%}

I am a PhD student with the {{ site.data.site.group }} at the {{ hsg }}, working under the supervision of {{ site.data.site.supervisor }}. My research focuses on software engineering and security in the age of AI, with a particular emphasis on AI agent security.

My current work investigates how AI agents can be made safer and more secure when interacting with software systems and real-world resources. I am particularly interested in mechanisms that provide agents with well-defined security boundaries, limit their capabilities and potential impact, and protect agents and their environments against threats such as prompt injection and other attacks. More broadly, my research explores how established and novel software engineering and security techniques can be applied to build trustworthy agentic systems.

Before moving into research, I worked as a software engineer for more than a decade, including nine wonderful years at {{ smartive }}. Alongside that work, I co-created and taught the certificate of advanced studies in Front-End Engineering Advanced at {{ ost }}. My passion for exploring new technologies and solving complex problems has always driven my learning and research.

In July 2024, I joined the {{ site.data.site.group }} as a research assistant while completing my Master's degree in Computer Science at the University of St. Gallen, where my research focused on testing and verification of Infrastructure as Code (IaC) programs. Since April 2026, I have been pursuing my PhD in the same group. Earlier, I completed a Master's degree at OST (formerly HSR), with a thesis on identity security and authentication in heterogeneous systems.

When I am not exploring new technologies or working on my research, I enjoy spending time with my wife and our kid. I also enjoy playing video games, sailing, snowboarding, and Lindy Hop dancing.
