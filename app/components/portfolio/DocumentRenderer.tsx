import { articles, allProjects, featuredProjects, toolkitGroups } from "@/app/data/content";
import { fileInfo } from "@/app/data/navigation";
import type { FileKey } from "@/app/types/portfolio";
import { ActionLinks, ProjectDetail, Tags } from "@/app/components/portfolio/ContentPrimitives";
import { PortfolioIcon } from "@/app/components/icons/PortfolioIcon";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

type DocumentRendererProps = {
  active: FileKey;
  openFile: (key: FileKey) => void;
  openInspector: () => void;
  showMoreProjects: boolean;
  revealProjects: () => void;
};

export default function DocumentRenderer({
  active,
  openFile,
  openInspector,
  showMoreProjects,
  revealProjects,
}: DocumentRendererProps) {
  const path =
    active === "rag" || active === "assistant" || active === "decs"
      ? `~/portfolio/work/${fileInfo[active].name}`
      : `~/portfolio/${fileInfo[active].name}`;
  return (
    <div className="doc">
      <p className="doc-path">{path}</p>
      {active === "home" && (
        <>
          <p className="comment"># portfolio entry point · choose what to inspect</p>
          <h1>
            I’m Sakthivel. I build AI that
            <br />
            shows its work.
          </h1>
          <p className="lead">
            Senior software engineer building full-stack products and generative AI systems, with a
            focus on retrieval, evidence, and the engineering that makes AI dependable.
          </p>
          <div className="home-actions">
            <Button
              variant="primary"
              className="primary-action"
              onClick={() => openFile("projects")}
            >
              Explore selected work <span>↗</span>
            </Button>
            <Button
              variant="secondary"
              className="secondary-action"
              onClick={() => openFile("about")}
            >
              Meet the engineer <span>→</span>
            </Button>
          </div>
          <div className="identity-strip">
            <span>4+ years engineering</span>
            <i />
            <span>Chennai, India</span>
            <i />
            <span>RAG · AI agents · full-stack</span>
          </div>
          <hr className="section-rule" />
          <div className="section-line">
            <div>
              <p className="comment">{"//"} start with a system</p>
              <h2>Selected work</h2>
            </div>
            <Button variant="quiet" className="inline-action" onClick={() => openFile("projects")}>
              All projects <span>→</span>
            </Button>
          </div>
          <div className="file-grid project-cards">
            {featuredProjects.map((project, index) => (
              <Button
                variant="card"
                className="project-tile"
                key={project.key}
                type="button"
                onClick={() => openFile(project.key)}
              >
                <span className="tile-index">
                  0{index + 1} <i>{project.stamp}</i>
                </span>
                <b>{project.title}</b>
                <small>{project.summary}</small>
                <span className="tile-open">Inspect project ↗</span>
              </Button>
            ))}
          </div>
          <div className="home-bottom">
            <span>New here?</span>
            <button type="button" onClick={() => openFile("approach")}>
              See how I think about reliable AI <span>→</span>
            </button>
            <button type="button" onClick={openInspector}>
              Open the RAG trace inspector <span>⌁</span>
            </button>
          </div>
        </>
      )}
      {active === "projects" && (
        <>
          <p className="comment"># projects · selected work</p>
          <h1>
            Systems with a reason
            <br />
            to exist.
          </h1>
          <p className="lead">
            Six projects across retrieval, agentic AI, document workflows, analytics, and full-stack
            product engineering. Start with the three featured systems, then expand the archive.
          </p>
          <div className="project-index">
            {(showMoreProjects ? allProjects : featuredProjects).map((project, index) => (
              <Button
                variant="card"
                className="project-index-row"
                key={project.key}
                type="button"
                onClick={() => openFile(project.key)}
              >
                <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="index-copy">
                  <span className="project-stamp">{project.stamp}</span>
                  <b>{project.title}</b>
                  <small>{project.summary}</small>
                </span>
                <span className="index-arrow">Inspect ↗</span>
              </Button>
            ))}
          </div>
          {!showMoreProjects && (
            <Button variant="secondary" className="show-more-button" onClick={revealProjects}>
              Show all 6 projects <span>↓</span>
              <small>Includes earlier client work</small>
            </Button>
          )}
          {showMoreProjects && (
            <p className="comment">
              # showing all projects · selected work first, followed by earlier client systems
            </p>
          )}
          <p className="comment">
            # Use the left map to jump between sections, or press ⌘K to search.
          </p>
        </>
      )}
      {active === "approach" && (
        <>
          <p className="comment"># how I approach AI engineering</p>
          <h1>
            Build for trust.
            <br />
            Ship for real use.
          </h1>
          <p className="lead">
            My goal is not to make a model look impressive in a demo. It’s to make the whole feature
            understandable, safe to use, and useful inside the product it belongs to.
          </p>
          <div className="principle-list">
            <article>
              <span>01 / EVIDENCE</span>
              <h2>Answers should show their work.</h2>
              <p>
                Keep retrieval connected to source pages and chunks. Inspect ranking decisions so a
                weak answer can be traced to evidence, retrieval, or generation.
              </p>
              <Button variant="quiet" className="inline-action" onClick={() => openFile("rag")}>
                Explore the RAG work <span>→</span>
              </Button>
            </article>
            <article>
              <span>02 / BOUNDARIES</span>
              <h2>Give AI only the access it needs.</h2>
              <p>
                Validate generated queries, preserve row-level authorization, and mask sensitive
                data. Agent tools should have clear inputs, narrow permissions, and observable
                outcomes.
              </p>
              <Button
                variant="quiet"
                className="inline-action"
                onClick={() => openFile("assistant")}
              >
                See the guarded assistant <span>→</span>
              </Button>
            </article>
            <article>
              <span>03 / UNCERTAINTY</span>
              <h2>Make the uncertain parts visible.</h2>
              <p>
                Extraction and model output will sometimes need a second look. Put review and
                exception handling in the workflow so people can correct or resolve the gaps.
              </p>
              <Button variant="quiet" className="inline-action" onClick={() => openFile("decs")}>
                See document review flows <span>→</span>
              </Button>
            </article>
            <article>
              <span>04 / DELIVERY</span>
              <h2>Design the system around the user’s work.</h2>
              <p>
                Connect models to interfaces, APIs, data, and operational paths. A feature is ready
                when it fits the application and its real support needs—not just when the prompt
                works.
              </p>
              <Button
                variant="quiet"
                className="inline-action"
                onClick={() => openFile("experience")}
              >
                See where I’ve applied this <span>→</span>
              </Button>
            </article>
          </div>
          <div className="interactive-callout">
            <div>
              <span className="callout-label">TRY AN EXAMPLE</span>
              <b>Follow a question from retrieval to evidence.</b>
              <small>Inspect each step in the RAG trace.</small>
            </div>
            <button className="primary-action" type="button" onClick={openInspector}>
              Open trace inspector <span>⌁</span>
            </button>
          </div>
        </>
      )}
      {active === "about" && (
        <>
          <p className="comment"># whoami</p>
          <h1>
            Engineer first.
            <br />
            AI systems in practice.
          </h1>
          <p className="lead">
            I’m a Microsoft-certified senior software engineer with 4+ years of experience across
            full-stack enterprise applications and generative AI.
          </p>
          <p>
            My foundation is in the complete application: APIs, interfaces, data, and the workflows
            that connect them. Lately, I’ve been applying that foundation to LLM-powered systems,
            hybrid retrieval, document intelligence, and agentic workflows.
          </p>
          <div className="codebox">
            <span className="dim">{"//"} what I care about</span>
            <br />
            <span className="key">evidence</span> <span className="dim">→</span> make answers
            traceable to sources
            <br />
            <span className="key">access</span> &nbsp; <span className="dim">→</span> keep data
            boundaries explicit
            <br />
            <span className="key">delivery</span> <span className="dim">→</span> fit AI into
            software people already use
          </div>
          <h2>Recently</h2>
          <p>
            At WhiteBlue Cloud Services, I build enterprise applications for data-quality and
            compliance workflows, and integrate AI capabilities into application experiences.
          </p>
          <p>
            Before that, at Manomay Insurtech, I contributed to insurance and pension products, a
            conversational assistant for policy and claims data, and OCR-driven document processing.
          </p>
          <ActionLinks />
        </>
      )}
      {active === "rag" && (
        <>
          <div className="doc-top-actions">
            <button type="button" onClick={() => openFile("projects")}>
              ← All selected work
            </button>
            <button type="button" onClick={openInspector}>
              Open interactive trace <span>⌁</span>
            </button>
          </div>
          <span className="project-stamp">PERSONAL PROJECT · RETRIEVAL SYSTEMS</span>
          <h1>
            Hybrid RAG observability
            <br />
            &amp; debugging
          </h1>
          <p className="lead">
            A workbench for inspecting why a chunk surfaced, how rankings combine, and where an
            answer’s evidence came from.
          </p>
          <div className="codebox">
            <span className="dim">query</span>
            <br /> &nbsp; ↓<br />
            <span className="key">dense_search</span>(query) <span className="dim">+</span>{" "}
            <span className="key">bm25_search</span>(query)
            <br /> &nbsp; ↓<br />
            <span className="key">reciprocal_rank_fusion</span>(results, k=60)
            <br /> &nbsp; ↓<br />
            <span className="val">source page</span> + chunk → grounded response
          </div>
          <h2>What’s inside</h2>
          <ul>
            <li>Hybrid retrieval combining dense vector search with BM25 keyword search.</li>
            <li>
              Configurable top-K, ranking weights, and RRF constants for retrieval experiments.
            </li>
            <li>
              Diagnostics that explain dense and keyword rankings, agreement signals, and chunk
              selection.
            </li>
            <li>Page-aware PDF ingestion, recursive chunking, citations to pages and chunks.</li>
            <li>Grounding checks and tracing across ingestion, retrieval, and generation.</li>
          </ul>
          <Tags values={["Python", "Embeddings", "BM25", "RRF", "Citations", "Tracing"]} />
          <hr className="section-rule" />
          <h2>Why I built it</h2>
          <p>
            When an answer is wrong, “the model hallucinated” isn’t a useful debugging report. I
            wanted to inspect the retrieval path itself: what each search method found, how the
            merged ranking changed, and which exact source supported the response.
          </p>
          <p className="comment"># inspect the system, not just its output</p>
        </>
      )}
      {active === "assistant" && (
        <>
          <div className="doc-top-actions">
            <button type="button" onClick={() => openFile("projects")}>
              ← All selected work
            </button>
            <button type="button" onClick={() => openFile("approach")}>
              How I build <span>→</span>
            </button>
          </div>
          <span className="project-stamp">INSURANCE · CONVERSATIONAL GENAI</span>
          <h1>
            Policy &amp; claims
            <br />
            assistant
          </h1>
          <p className="lead">
            A conversational interface to policy and claims information, combining structured
            records with semantic search over policy documents and FAQs.
          </p>
          <div className="codebox">
            <span className="dim">question</span>
            <br /> ├─ <span className="key">structured data</span> → validate query → execute SQL
            <br /> └─ <span className="key">policy knowledge</span> → retrieve relevant passages
            <br /> &nbsp;&nbsp;&nbsp; ↓<br /> response synthesis →{" "}
            <span className="val">mask PII</span> → answer
          </div>
          <h2>Designed around data boundaries</h2>
          <ul>
            <li>Natural-language access to policy and claims records.</li>
            <li>LLM-assisted SQL workflow with query validation and database execution.</li>
            <li>
              Semantic retrieval over policy documents and FAQs using embeddings and vector
              similarity.
            </li>
            <li>PII masking and row-level authorization in the data workflow.</li>
          </ul>
          <Tags
            values={["LLM integration", "SQL", "Vector search", "PII masking", "Authorization"]}
          />
          <p className="comment">
            # contribution: full-stack development, retrieval, and guarded data access
          </p>
        </>
      )}
      {active === "decs" && (
        <>
          <div className="doc-top-actions">
            <button type="button" onClick={() => openFile("projects")}>
              ← All selected work
            </button>
            <button type="button" onClick={() => openFile("experience")}>
              Related experience <span>→</span>
            </button>
          </div>
          <span className="project-stamp">DOCUMENT AI · WORKFLOW AUTOMATION</span>
          <h1>
            DECS — document
            <br />
            extraction engine
          </h1>
          <p className="lead">
            An OCR-driven document workflow that turns extracted fields into reviewable, actionable
            business data.
          </p>
          <div className="codebox">
            <span className="key">document</span> → OCR &amp; extraction → structured fields
            <br /> &nbsp;&nbsp;&nbsp; ↓<br />
            underwriter review → <span className="val">approve</span> / handle exception
            <br /> &nbsp;&nbsp;&nbsp; ↓<br />
            automated ledger synchronization
          </div>
          <h2>Workflow contributions</h2>
          <ul>
            <li>Structured-data extraction from incoming documents.</li>
            <li>Underwriter review and approval workflows.</li>
            <li>Exception handling for documents that need intervention.</li>
            <li>Automated synchronization with downstream ledger systems.</li>
          </ul>
          <p>
            Document AI is most useful when the uncertain parts have a clear destination. Review and
            exception paths keep people in control when extraction needs a second look.
          </p>
          <Tags
            values={["OCR", "Azure AI Document Intelligence", "Review workflow", "Integration"]}
          />
        </>
      )}
      {active === "kla" && (
        <ProjectDetail
          back={openFile}
          stamp="SEMICONDUCTOR ANALYTICS · KLA CORPORATION"
          title="KAI inspection analytics"
          intro="An analytics experience for exploring semiconductor inspection results and making defect patterns easier to inspect."
          bullets={[
            "Built interactive defect analysis views for inspection data.",
            "Worked on rendering and exploration patterns for large datasets.",
            "Focused on making complex quality signals navigable for engineering users.",
          ]}
          tags={["Analytics", "Large datasets", "Interactive UI", "KAI"]}
        />
      )}
      {active === "energyya" && (
        <ProjectDetail
          back={openFile}
          stamp="INVOICE AUTOMATION · ENERGYYA"
          title="Invoice automation portal"
          intro="An invoice processing and analytics portal that uses document intelligence to move incoming invoices toward structured data."
          bullets={[
            "Integrated Azure AI Document Intelligence for invoice extraction.",
            "Built portal workflows around processing and analytics.",
            "Connected extracted information to application-side review and follow-up.",
          ]}
          tags={["Azure AI Document Intelligence", "Invoices", "Automation", "Analytics"]}
        />
      )}
      {active === "hpe" && (
        <ProjectDetail
          back={openFile}
          stamp="PORTAL MODERNIZATION · HPE TECHNOMICS"
          title="Customer portal modernization"
          intro="A modernization effort moving a legacy customer portal toward a more modular API and React-based application architecture."
          bullets={[
            "Moved legacy .NET MVC functionality toward .NET Web API.",
            "Built React application experiences for the customer portal.",
            "Worked across the migration boundary between existing workflows and a newer stack.",
          ]}
          tags={[".NET MVC", ".NET Web API", "React", "Modernization"]}
        />
      )}
      {active === "stack" && (
        <>
          <p className="comment">{"//"} a working set, grouped by where it fits</p>
          <h1>The toolkit</h1>
          <p className="lead">
            Tools I’ve used to ship products and AI workflows, grouped by the kinds of problems they
            help solve.
          </p>
          <div className="toolkit-groups">
            {toolkitGroups.map((group) => (
              <section className="toolkit-group" key={group.group}>
                <h2>{group.group}</h2>
                <div className="skill-grid">
                  {group.skills.map((name) => (
                    <Card className="skill-card" key={name}>
                      <span className="skill-icon" aria-hidden="true">
                        <PortfolioIcon name={name} />
                      </span>
                      <b>{name}</b>
                      <span className="skill-arrow">↗</span>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="credential-strip">
            <span>MICROSOFT</span>
            <b>Azure AI Apps &amp; Agents Developer Associate · AI-103</b>
          </div>
          <div className="credential-strip">
            <span>GOOGLE</span>
            <b>Real World AI Applications with Gemini and Imagen</b>
          </div>
        </>
      )}
      {active === "experience" && (
        <>
          <p className="comment"># a short history of building production software</p>
          <h1>Career log</h1>
          <p className="lead">
            From full-stack enterprise software into applied AI: each role has been about making
            complex workflows usable, secure, and dependable.
          </p>
          <div className="timeline detailed-timeline">
            <div className="timeline-item">
              <b>Senior Software Engineer</b>
              <span>Mar 2025 — Present</span>
              <small>WhiteBlue Cloud Services · Chennai</small>
              <p>
                Building enterprise applications for data-quality and compliance workflows across
                frontend, backend APIs, relational data, and Azure services.
              </p>
              <ul>
                <li>
                  Deliver full-stack features spanning user-facing workflows, service integrations,
                  and database-backed applications.
                </li>
                <li>
                  Develop backend workflows and APIs that support data validation, quality
                  management, and compliance operations.
                </li>
                <li>
                  Contribute AI-assisted capabilities where language models can make existing
                  workflows easier to navigate.
                </li>
                <li>
                  Work with product and engineering teams to take features from requirements through
                  delivery and support.
                </li>
              </ul>
              <Tags
                values={[
                  "Enterprise software",
                  "Azure",
                  "APIs",
                  "Data quality",
                  "AI-assisted workflows",
                ]}
              />
            </div>
            <div className="timeline-item">
              <b>Software Engineer</b>
              <span>Aug 2022 — Feb 2025</span>
              <small>Manomay Insurtech · Hyderabad</small>
              <p>
                Developed insurance and pension products, including conversational access to policy
                and claims information and document-processing workflows.
              </p>
              <ul>
                <li>
                  Built and maintained enterprise insurance and pension application features across
                  backend and frontend.
                </li>
                <li>
                  Contributed to an assistant combining natural-language questions, SQL-backed
                  records, and semantic retrieval over policy material.
                </li>
                <li>
                  Applied query validation, PII masking, and row-level access controls in assistant
                  data workflows.
                </li>
                <li>
                  Contributed to DECS document extraction, underwriter review, exception handling,
                  and downstream ledger synchronization.
                </li>
              </ul>
              <Tags values={["Insurtech", "GenAI", "RAG", "SQL", "Document AI"]} />
            </div>
            <div className="timeline-item">
              <b>Internship Trainee</b>
              <span>Mar 2022 — Aug 2022 · 6 mos</span>
              <small>Manomay Insurtech · Remote · Internship</small>
              <p>
                Contributed to insurance and pension portals, focusing on responsive UI
                implementation for member-facing workflows.
              </p>
              <ul>
                <li>
                  Supported the ICB FNOL insurance portal, implementing UI for First Notice of Loss
                  workflows and digital claim initiation.
                </li>
                <li>
                  Developed responsive interfaces for the Silver Thatch and Chambers pension portals
                  to improve accessibility and usability.
                </li>
                <li>
                  Worked with design and development teams to translate UI/UX requirements into
                  interactive web experiences.
                </li>
              </ul>
              <Tags
                values={["Insurance", "Pension portals", "Responsive UI", "Product collaboration"]}
              />
            </div>
          </div>
          <Button variant="quiet" className="inline-action" onClick={() => openFile("education")}>
            Continue to education <span>→</span>
          </Button>
        </>
      )}
      {active === "education" && (
        <>
          <p className="comment"># education · foundation</p>
          <h1>
            Where the foundation
            <br />
            was built.
          </h1>
          <p className="lead">
            A computer science degree at a long-standing engineering college in Karaikudi, Tamil
            Nadu.
          </p>
          <section className="campus-card">
            <div
              className="campus-art"
              role="img"
              aria-label="Illustrated campus facade representing A.C. Government College of Engineering and Technology"
            >
              <div className="campus-sky">
                <span>10°04′ N · 78°46′ E</span>
                <i>☼</i>
              </div>
              <div className="campus-building">
                <span className="roofline" />
                <span className="building-name">ACGCET</span>
                <span className="building-columns">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="building-base" />
              </div>
              <div className="campus-ground">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="campus-caption">
              <span>COLLEGE · KARAIKUDI, TAMIL NADU</span>
              <a href="https://accet.ac.in/about-institution" target="_blank" rel="noreferrer">
                Visit official college site ↗
              </a>
            </div>
          </section>
          <div className="education-record">
            <span className="education-years">2018 — 2022</span>
            <div>
              <h2>B.E. Computer Science and Engineering</h2>
              <b>Alagappa Chettiar Government College of Engineering and Technology</b>
              <p>
                Autonomous engineering institution in Karaikudi, affiliated with Anna University.
                Founded in 1952.
              </p>
              <a href="https://accet.ac.in/about-institution" target="_blank" rel="noreferrer">
                About the institution ↗
              </a>
            </div>
          </div>
          <p className="comment">
            # the degree was the start; shipping software is where the learning compounds
          </p>
        </>
      )}
      {active === "articles" && (
        <>
          <p className="comment"># writing · notes from building</p>
          <h1>
            Ideas from the
            <br />
            engineering desk.
          </h1>
          <p className="lead">
            Long-form notes on retrieval, AI agents, and how software changes when it starts working
            alongside intelligence. Each card opens the original LinkedIn article.
          </p>
          <div className="article-grid">
            {articles.map((article, index) => (
              <Card as="article" className="article-card" key={article.href}>
                <div className="article-card-top">
                  <span>
                    0{index + 1} / {article.date}
                  </span>
                  <span>↗</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <a href={article.href} target="_blank" rel="noreferrer">
                  Read on LinkedIn <span>↗</span>
                </a>
              </Card>
            ))}
          </div>
          <p className="comment"># new writing will appear here as it’s published</p>
        </>
      )}
      {active === "contact" && (
        <>
          <p className="comment"># open a line of communication</p>
          <h1>
            Have a useful problem
            <br />
            to solve?
          </h1>
          <p className="lead">
            I’m open to thoughtful conversations about AI engineering, retrieval systems, and
            building software that people can rely on.
          </p>
          <p>
            Based in Chennai, India. Comfortable working across full-stack product engineering and
            applied AI systems.
          </p>
          <a className="contact-email" href="mailto:sakthivel.ganesan@hotmail.com">
            sakthivel.ganesan@hotmail.com ↗
          </a>
          <ActionLinks />
        </>
      )}
    </div>
  );
}
