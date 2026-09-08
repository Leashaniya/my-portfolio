import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Layers,
  Database,
  Workflow,
  BarChart3,
  Bot,
  Headphones,
  PenLine,
} from "lucide-react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = {
  title: "Undergraduate Trainee — Data Engineering",
  company: "IFS",
  date: "Feb 2025 — Present",
  bullets: [
    "Consolidated SAP and business data from multiple Microsoft Fabric workspaces into a centralized Lakehouse, enabling enterprise wide semantic modeling, reporting, and analytics.",
    "Designed and optimized scalable Bronze to Gold data pipelines in Microsoft Fabric using PySpark notebooks and Medallion Architecture principles, implementing data quality controls, business logic, and standardized data models.",
    "Developed and maintained Power BI semantic models, DAX measures, and KPI frameworks, enabling trusted reporting and data driven decision making across internal business functions.",
    "Designed a Microsoft Fabric based data reconciliation solution to compare DnB and THOR customer data, applying matching logic, data standardization, enrichment, and validation rules.",
    "Redesigned enterprise sales pipeline workflows by implementing owner based notification mechanisms, replacing group level alerts with targeted notifications.",
  ],
};

const PROJECTS = [
  {
    icon: Layers,
    title: "Customer Analytics Platform",
    subtitle: "Microsoft Fabric",
    description:
      "End-to-end customer analytics platform using metadata driven ingestion, layered Bronze to Silver to Gold transformations, and full pipeline orchestration. Delivered a Gold layer Customer 360 dataset with a semantic model for reporting.",
    tags: ["Microsoft Fabric", "PySpark", "Semantic Models", "Lakehouse"],
    link: "https://github.com/Leashaniya/Customer_Analytics_withFabric",
  },
  {
    icon: BarChart3,
    title: "Data Warehousing & BI Solution",
    subtitle: "Football Analytics Dataset",
    description:
      "Complete BI solution on a custom football OLTP dataset — dimensional data warehouse in SQL Server, ETL pipelines with SSIS, an SSAS cube with hierarchies, and interactive Power BI analytics with drill-downs and cascading filters.",
    tags: ["SQL Server", "SSIS", "SSAS", "Power BI"],
    link: "https://github.com/Leashaniya/DWBI-ASSIGNMENT-01",
  },
  {
    icon: Database,
    title: "Airbnb End-to-End Pipeline",
    subtitle: "Cloud-Native ELT",
    description:
      "Cloud-native ELT pipeline ingesting Airbnb data into AWS S3, staged and loaded into Snowflake. dbt-managed transformations across staging, intermediate, and mart layers, with dimensional modeling and tests for downstream reporting.",
    tags: ["AWS S3", "Snowflake", "dbt", "SQL"],
    link: null,
  },
  {
    icon: Workflow,
    title: "E-Commerce ETL Pipeline",
    subtitle: "Apache Airflow",
    description:
      "Orchestrated ETL pipeline using Apache Airflow DAGs to extract, transform, and load order and delivery data, with task scheduling and dependency management. Containerized with Astro CLI and Docker for reproducible deployment.",
    tags: ["Apache Airflow", "Docker", "Astro CLI", "Python"],
    link: null,
  },
  {
    icon: Bot,
    title: "Multi-Agent Exam Paper Generator",
    subtitle: "RAG + Multi-Agent AI",
    description:
      "Multi agent AI pipeline with specialized agents for blueprint analysis, content retrieval, question writing, and quality validation — generating curriculum aligned exam papers using RAG (FAISS, sentence transformers). Full stack with FastAPI, React, and MongoDB.",
    tags: ["RAG", "FastAPI", "React", "MongoDB"],
    link: "https://github.com/Leashaniya/Research-Project",
  },
  {
    icon: Headphones,
    title: "AI Powered IT Helpdesk Agent",
    subtitle: "Copilot Studio & Power Automate",
    description:
      "No code IT support agent using Copilot Studio, grounded on internal IT policy documentation to answer employee queries. Integrated Power Automate workflows to automate ticket creation and routing.",
    tags: ["Copilot Studio", "Power Automate", "AI Automation"],
    link: "https://medium.com/@leashakrish2002/building-an-ai-powered-it-helpdesk-agent-with-microsoft-copilot-studio-and-power-automate-b5c1eede38d0",
  },
];

const SKILL_GROUPS = [
  {
    label: "Data Engineering & Pipelines",
    items: ["Microsoft Fabric", "Azure Synapse", "Azure Data Factory", "Snowflake", "Lakehouse Architecture", "Delta Tables", "ETL / ELT Pipelines", "PySpark", "Apache Airflow", "dbt", "Kafka", "Dataflows"],
  },
  {
    label: "Languages & Data Modeling",
    items: ["Python", "SQL", "Java", "Data Modeling", "Semantic Models"],
  },
  {
    label: "BI, Reporting & Tools",
    items: ["Power BI", "DAX", "Fabric Notebooks", "SSIS", "SSAS", "Git", "Docker", "Microsoft Copilot Studio", "Power Automate"],
  },
];

const SOFT_SKILLS = [
  "Communication",
  "Analytical Thinking",
  "Adaptability",
  "Teamwork",
  "Time Management",
  "Problem Solving",
  "Attention to Detail",
];

const CERTS = [
  {
    name: "Python 3 Fundamentals",
    org: "Pluralsight",
    link: "https://drive.google.com/file/d/1tbrYa8itbD8GURlHcAllE6Ron5Lj_iv_/view?usp=sharing",
  },
  {
    name: "Reading, Writing and Parsing JSON Files in Python",
    org: "Pluralsight",
    link: "https://drive.google.com/file/d/1BtuiUg2zOb1RfikGlB6_GMuJ07_YlVjK/view?usp=sharing",
  },
  {
    name: "Python Data Essentials: Data Structures",
    org: "Pluralsight",
    link: "https://drive.google.com/file/d/16tvKPoxVbo2JnOzeaRhGKUl2LvjJc-du/view?usp=sharing",
  },
  {
    name: "Introduction to Large Language Models",
    org: "Coursera",
    link: "https://drive.google.com/file/d/1wlPO9gpFjJEtYZ9wCNL27toTqJygpSbo/view?usp=drive_link",
  },
  {
    name: "Python for Data Science, AI & Development",
    org: "Coursera",
    link: "https://drive.google.com/file/d/1vRdUEDH-slyqSfy9_LRyaogcXYXQckMd/view?usp=sharing",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#101826", color: "#E9EBEF" }}
      className="min-h-screen font-sans antialiased"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Nav */}
      <nav
        style={{ borderColor: "rgba(233,235,239,0.08)" }}
        className="font-body sticky top-0 z-40 border-b backdrop-blur-md"
      >
        <div
          style={{ backgroundColor: "rgba(16,24,38,0.85)" }}
          className="absolute inset-0 -z-10"
        />
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#home" className="font-display text-sm font-semibold tracking-tight">
            Portfolio
          </a>
          <ul className="hidden gap-6 text-sm md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  style={{
                    color: active === n.id ? "#D9A441" : "rgba(233,235,239,0.65)",
                  }}
                  className="transition-colors hover:text-[#D9A441]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-5xl px-6 pb-24 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p style={{ color: "#D9A441" }} className="font-body mb-4 text-sm">
              Data Engineer
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Hi, I'm Leashaniya <br /> Building scalable data
              <br />platforms and analytics solutions.
            </h1>
            <p
              style={{ color: "rgba(233,235,239,0.75)" }}
              className="font-body mt-6 max-w-lg text-[15px] leading-relaxed"
            >
              I'm a Data Engineer passionate about building scalable data
              platforms and transforming raw data into reliable,
              analytics ready datasets. I enjoy solving complex data
              challenges, improving data reliability, and delivering
              solutions that support business decision making.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                style={{ backgroundColor: "#D9A441", color: "#101826" }}
                className="font-body rounded-sm px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
              >
                View projects
              </a>
              <a
                href="#contact"
                style={{ borderColor: "rgba(233,235,239,0.25)" }}
                className="font-body rounded-sm border px-5 py-2.5 text-sm font-medium transition-colors hover:border-[#D9A441]"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="justify-self-center md:justify-self-end">
            <div
              style={{ borderColor: "rgba(217,164,65,0.4)" }}
              className="h-72 w-72 overflow-hidden rounded-2xl border md:h-80 md:w-80"
            >
              <img
                src="photo.jpg"
                alt="Leashaniya Krishnapillai"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        style={{ borderColor: "rgba(233,235,239,0.08)" }}
        className="border-t px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-10 text-2xl font-semibold">Work experience</h2>
          <div style={{ borderColor: "rgba(233,235,239,0.15)" }} className="border-l pl-8">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-lg font-semibold">{EXPERIENCE.title}</h3>
              <span style={{ color: "#D9A441" }} className="font-body text-sm">
                {EXPERIENCE.date}
              </span>
            </div>
            <p style={{ color: "rgba(233,235,239,0.6)" }} className="font-body mb-5 text-sm">
              {EXPERIENCE.company}
            </p>
            <ul className="space-y-3">
              {EXPERIENCE.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{ color: "rgba(233,235,239,0.8)" }}
                  className="font-body flex gap-3 text-[15px] leading-relaxed"
                >
                  <span style={{ color: "#D9A441" }} className="mt-1.5 shrink-0">
                    —
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        style={{ borderColor: "rgba(233,235,239,0.08)" }}
        className="border-t px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-10 text-2xl font-semibold">Featured projects</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((p) => {
              const Icon = p.icon;
              const Wrapper = p.link ? "a" : "div";
              const wrapperProps = p.link
                ? { href: p.link, target: "_blank", rel: "noreferrer" }
                : {};
              return (
                <Wrapper
                  key={p.title}
                  {...wrapperProps}
                  style={{
                    borderColor: "rgba(233,235,239,0.1)",
                    backgroundColor: "rgba(233,235,239,0.02)",
                  }}
                  className={`group flex flex-col rounded-sm border p-6 transition-colors ${
                    p.link ? "hover:border-[#D9A441]/50" : ""
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <Icon size={20} style={{ color: "#D9A441" }} />
                    {p.link && (
                      <ExternalLink
                        size={15}
                        style={{ color: "rgba(233,235,239,0.3)" }}
                        className="transition-colors group-hover:text-[#D9A441]"
                      />
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold">{p.title}</h3>
                  <p style={{ color: "#D9A441" }} className="font-body mb-3 text-xs">
                    {p.subtitle}
                  </p>
                  <p
                    style={{ color: "rgba(233,235,239,0.65)" }}
                    className="font-body mb-5 flex-1 text-sm leading-relaxed"
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          borderColor: "rgba(233,235,239,0.15)",
                          color: "rgba(233,235,239,0.6)",
                        }}
                        className="font-body rounded-sm border px-2 py-0.5 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        style={{ borderColor: "rgba(233,235,239,0.08)" }}
        className="border-t px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-10 text-2xl font-semibold">Skills</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {SKILL_GROUPS.map((g) => (
              <div key={g.label}>
                <h3
                  style={{ color: "#D9A441" }}
                  className="font-body mb-3 text-sm font-medium"
                >
                  {g.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      style={{
                        borderColor: "rgba(233,235,239,0.15)",
                        color: "rgba(233,235,239,0.75)",
                      }}
                      className="font-body rounded-sm border px-3 py-1 text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ color: "#D9A441" }} className="font-body mb-3 mt-10 text-sm font-medium">
            Soft skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {SOFT_SKILLS.map((s) => (
              <span
                key={s}
                style={{
                  borderColor: "rgba(233,235,239,0.15)",
                  color: "rgba(233,235,239,0.75)",
                }}
                className="font-body rounded-sm border px-3 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section
        id="education"
        style={{ borderColor: "rgba(233,235,239,0.08)" }}
        className="border-t px-6 py-20"
      >
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display mb-6 text-2xl font-semibold">Education</h2>
            <div style={{ borderColor: "rgba(233,235,239,0.15)" }} className="border-l pl-6">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-base font-semibold">
                  BSc (Hons) IT — Data Science
                </h3>
              </div>
              <p style={{ color: "#D9A441" }} className="font-body mb-1 text-sm">
                SLIIT · Jul 2022 — Jul 2026
              </p>
              <p style={{ color: "rgba(233,235,239,0.6)" }} className="font-body mb-4 text-sm">
                CGPA 3.3
              </p>
              <div style={{ borderColor: "rgba(233,235,239,0.15)" }} className="border-l pl-6 mt-6">
                <h3 className="font-display text-base font-semibold">Advanced Level Examination</h3>
                <p style={{ color: "#D9A441" }} className="font-body mb-1 text-sm">
                  Feb 2022 — Mathematics Stream
                </p>
                <p style={{ color: "rgba(233,235,239,0.6)" }} className="font-body text-sm">
                  IT — B, Mathematics — C, Physics — C
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <div>
                <p className="font-display text-sm font-semibold">Dean's List 2022</p>
                <p style={{ color: "rgba(233,235,239,0.6)" }} className="font-body text-xs">
                  Outstanding academic achievement
                </p>
              </div>
              <div>
                <p className="font-display text-sm font-semibold">Colors Award 2023</p>
                <p style={{ color: "rgba(233,235,239,0.6)" }} className="font-body text-xs">
                  Track & field
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display mb-6 text-2xl font-semibold">Certifications</h2>
            <ul className="space-y-4">
              {CERTS.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderColor: "rgba(233,235,239,0.1)" }}
                    className="group flex items-center justify-between border-b pb-3 transition-colors hover:border-[#D9A441]/50"
                  >
                    <div>
                      <p className="font-body text-sm">{c.name}</p>
                      <p style={{ color: "rgba(233,235,239,0.5)" }} className="font-body text-xs">
                        {c.org}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      style={{ color: "rgba(233,235,239,0.3)" }}
                      className="shrink-0 transition-colors group-hover:text-[#D9A441]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer
        id="contact"
        style={{ borderColor: "rgba(233,235,239,0.08)" }}
        className="border-t px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-4 text-2xl font-semibold">Let's connect</h2>
          <p style={{ color: "rgba(233,235,239,0.7)" }} className="font-body mb-8 max-w-md text-[15px] leading-relaxed">
            Open to conversations, collaborations, and new opportunities.
            Feel free to reach out.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:leashakrish2002@gmail.com"
              style={{ borderColor: "rgba(233,235,239,0.2)" }}
              className="font-body flex items-center gap-2 rounded-sm border px-4 py-2 text-sm transition-colors hover:border-[#D9A441]"
            >
              <Mail size={15} /> leashakrish2002@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/leashaniya-krishnapillai-36b20a247/"
              target="_blank"
              rel="noreferrer"
              style={{ borderColor: "rgba(233,235,239,0.2)" }}
              className="font-body flex items-center gap-2 rounded-sm border px-4 py-2 text-sm transition-colors hover:border-[#D9A441]"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href="https://github.com/Leashaniya"
              target="_blank"
              rel="noreferrer"
              style={{ borderColor: "rgba(233,235,239,0.2)" }}
              className="font-body flex items-center gap-2 rounded-sm border px-4 py-2 text-sm transition-colors hover:border-[#D9A441]"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href="https://medium.com/@leashakrish2002"
              target="_blank"
              rel="noreferrer"
              style={{ borderColor: "rgba(233,235,239,0.2)" }}
              className="font-body flex items-center gap-2 rounded-sm border px-4 py-2 text-sm transition-colors hover:border-[#D9A441]"
            >
              <PenLine size={15} /> Medium
            </a>
          </div>
          <p style={{ color: "rgba(233,235,239,0.35)" }} className="font-body mt-16 text-xs">
            © 2026 Leashaniya Krishnapillai
          </p>
        </div>
      </footer>
    </div>
  );
}
