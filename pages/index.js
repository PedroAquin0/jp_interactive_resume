import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const PROJECTS = [
  {
    id: 1,
    tag: 'Data Platform',
    title: 'Reestruturação de arquitetura',
    subtitle: 'Plataforma de ingestão e processamento de dados para com +20 eventos/dia teve seu custo cortado em 90%',
    description:
      'Arquitetura medallion (Bronze → Silver → Gold) orquestrava 8 glue jobs no total. 1 job para camada bronze (JDBC conectado no SQL) e 7 para camada silver. A lógica de processamento via pyspark foi atualizada para pyarrow, manipulando o que já havia no catálogo utilizando Athena. Resultando em um custo reduzido drasticamente',
    stack: ['AWS', 'Glue', 'StepFunction', 'Lambda', 'Unity Catalog'],
    metrics: [
      { label: 'Eventos/dia', value: '20+' },
      { label: 'Redução de custo', value: '~90%' },
    ],
    color: 'purple',
    architecture: [
      { layer: 'Ingestão', items: ['StepFunction'], color: '#7c6af7' },
      { layer: 'Bronze', items: ['Glue JDBC to SQL'], color: '#5a5070' },
      { layer: 'Silver', items: ['Lambda'], color: '#9370db' }    
    ],
  },
  {
    id: 2,
    tag: 'Data Platform',
    title: 'Pipeline API até DataWarehouse',
    subtitle: 'Plataforma de ingestão de processamento de dados de medicina ocupacional',
    description:
      'Lambda que fazia consumo de 3 API`s para buscar tabelas via GETURL+Token, orquestrando jobs glue e crawlers que levam os dados até AWS Redshift',
    stack: ['Python Requests', 'PySpark' ,'Glue', 'Crawler', 'Redshift', 'Starschema'],
    metrics: [
      { label: 'Equipes impactadas', value: '20+' }
    ],
    color: 'purple',
    architecture: [
      { layer: 'Ingestão', items: ['Python Requests', 'Lambda'], color: '#7c6af7' },
      { layer: 'Silver/Gold', items: ['Glue'], color: '#5a5070' },
      { layer: 'Starschema', items: ['Glue', 'Redshift'], color: '#9370db' },
    ],
  },
  {
    id: 3,
    tag: 'Data Platform',
    title: 'SAP -> DLT -> Unity Catalog',
    subtitle: 'Mecanismo de captura de dados CDC até o databricks',
    description:
      'Configuração do Software Aecorsoft para captura de atualizações em tabelas SAP e exportação para catálogo Databricks, anexado ao Delta Live Tables',
    stack: ['Aecorsoft', 'Databricks' ,'DLT', 'Python'],
    metrics: [
      { label: 'POC`s comerciais usadas', value: '5+' }
    ],
    color: 'purple',
    architecture: [
      { layer: 'Ingestão', items: ['SAP', 'Aecorsoft'], color: '#7c6af7' },
      { layer: 'Silver', items: ['DLT'], color: '#5a5070' },
      { layer: 'Starschema', items: ['Unity Catalog'], color: '#9370db' },
    ],
  }
]

const SKILLS = [
  { category: 'Linguagens', items: ['Python', 'SQL', 'Terraform'] },
  { category: 'Orquestração', items: ['StepFunction', 'Glue Workflow'] },
  { category: 'Processamento', items: ['Apache Spark', 'Pyarrow', 'dbt'] },
  { category: 'Cloud', items: ['AWS', 'DataBricks'] },
  { category: 'Storage', items: ['Delta Lake', 'Glue Catalog', 'Redshift'] }
]

const PROJECTS_EN = [
  {
    id: 1,
    tag: 'Data Platform',
    title: 'Architecture redesign',
    subtitle: 'Data ingestion and processing platform handling 20+ events/day with a 90% cost reduction',
    description:
      'A medallion architecture (Bronze → Silver → Gold) orchestrated 8 Glue jobs in total: 1 job for the Bronze layer (JDBC connected to SQL) and 7 for the Silver layer. The PySpark processing logic was updated to PyArrow, manipulating existing catalog data through Athena, resulting in a drastic cost reduction.',
    stack: ['AWS', 'Glue', 'StepFunction', 'Lambda', 'Unity Catalog'],
    metrics: [
      { label: 'Events/day', value: '20+' },
      { label: 'Cost reduction', value: '~90%' },
    ],
    color: 'purple',
    architecture: [
      { layer: 'Ingestion', items: ['StepFunction'], color: '#7c6af7' },
      { layer: 'Bronze', items: ['Glue JDBC to SQL'], color: '#5a5070' },
      { layer: 'Silver', items: ['Lambda'], color: '#9370db' }
    ],
  },
  {
    id: 2,
    tag: 'Data Platform',
    title: 'API to Data Warehouse pipeline',
    subtitle: 'Occupational medicine data ingestion and processing platform',
    description:
      'A Lambda function consumed 3 APIs to retrieve tables through GET URLs and tokens, orchestrating Glue jobs and crawlers that delivered the data to AWS Redshift.',
    stack: ['Python Requests', 'PySpark', 'Glue', 'Crawler', 'Redshift', 'Star schema'],
    metrics: [{ label: 'Teams impacted', value: '20+' }],
    color: 'purple',
    architecture: [
      { layer: 'Ingestion', items: ['Python Requests', 'Lambda'], color: '#7c6af7' },
      { layer: 'Silver/Gold', items: ['Glue'], color: '#5a5070' },
      { layer: 'Star schema', items: ['Glue', 'Redshift'], color: '#9370db' },
    ],
  },
  {
    id: 3,
    tag: 'Data Platform',
    title: 'SAP → DLT → Unity Catalog',
    subtitle: 'CDC data capture mechanism connected to Databricks',
    description:
      'Configuration of Aecorsoft software to capture updates in SAP tables and export them to the Databricks catalog, connected to Delta Live Tables.',
    stack: ['Aecorsoft', 'Databricks', 'DLT', 'Python'],
    metrics: [{ label: 'Commercial POCs used', value: '5+' }],
    color: 'purple',
    architecture: [
      { layer: 'Ingestion', items: ['SAP', 'Aecorsoft'], color: '#7c6af7' },
      { layer: 'Silver', items: ['DLT'], color: '#5a5070' },
      { layer: 'Star schema', items: ['Unity Catalog'], color: '#9370db' },
    ],
  }
]

const SKILLS_EN = [
  { category: 'Languages', items: ['Python', 'SQL', 'Terraform'] },
  { category: 'Orchestration', items: ['StepFunction', 'Glue Workflow'] },
  { category: 'Processing', items: ['Apache Spark', 'PyArrow', 'dbt'] },
  { category: 'Cloud', items: ['AWS', 'Databricks'] },
  { category: 'Storage', items: ['Delta Lake', 'Glue Catalog', 'Redshift'] }
]

function ArchDiagram({ layers }) {
  return (
    <div className={styles.arch}>
      {layers.map((layer, i) => (
        <div key={i} className={styles.archLayer}>
          <div className={styles.archLabel} style={{ color: layer.color }}>
            {layer.layer}
          </div>
          <div className={styles.archItems}>
            {layer.items.map((item, j) => (
              <span
                key={j}
                className={styles.archItem}
                style={{ borderColor: layer.color + '40', color: layer.color }}
              >
                {item}
              </span>
            ))}
          </div>
          {i < layers.length - 1 && (
            <div className={styles.archArrow} style={{ color: layer.color }}>→</div>
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project, language }) {
  const [expanded, setExpanded] = useState(false)

  const colorMap = {
    purple: { accent: '#7c6af7', glow: 'rgba(124,106,247,0.12)', tag: 'rgba(124,106,247,0.15)' },
    teal:   { accent: '#5de0c8', glow: 'rgba(93,224,200,0.10)',  tag: 'rgba(93,224,200,0.12)' },
    amber:  { accent: '#f7b26a', glow: 'rgba(247,178,106,0.10)', tag: 'rgba(247,178,106,0.12)' },
    coral:  { accent: '#f76a7c', glow: 'rgba(247,106,124,0.10)', tag: 'rgba(247,106,124,0.12)' },
  }

  const c = colorMap[project.color]

  return (
    <article
      className={styles.card}
      style={{ '--card-accent': c.accent, '--card-glow': c.glow }}
    >
      <div className={styles.cardInner}>
        <header className={styles.cardHeader}>
          <span className={styles.cardTag} style={{ background: c.tag, color: c.accent }}>
            {project.tag}
          </span>
          <h2 className={styles.cardTitle}>{project.title}</h2>
          <p className={styles.cardSubtitle}>{project.subtitle}</p>
        </header>

        <div className={styles.metrics}>
          {project.metrics.map((m, i) => (
            <div key={i} className={styles.metric}>
              <span className={styles.metricValue} style={{ color: c.accent }}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.cardDesc}>{project.description}</p>

        <button
          className={styles.expandBtn}
          style={{ '--btn-color': c.accent }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? `↑ ${language === 'en' ? 'Hide architecture' : 'Ocultar arquitetura'}`
            : `↓ ${language === 'en' ? 'View architecture' : 'Ver arquitetura'}`}
        </button>

        {expanded && (
          <div className={styles.archWrap}>
            <p className={styles.archTitle}>{language === 'en' ? 'Architecture Diagram' : 'Diagrama de Arquitetura'}</p>
            <ArchDiagram layers={project.architecture} />
          </div>
        )}

        <footer className={styles.cardFooter}>
          <div className={styles.stack}>
            {project.stack.map((tech, i) => (
              <span key={i} className={styles.tech}>{tech}</span>
            ))}
          </div>
        </footer>
      </div>
    </article>
  )
}

export default function Home() {
  const [language, setLanguage] = useState('pt')
  const isEnglish = language === 'en'
  const projects = isEnglish ? PROJECTS_EN : PROJECTS
  const skills = isEnglish ? SKILLS_EN : SKILLS

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'pt-BR'
  }, [isEnglish])

  return (
    <>
      <Head>
        <title>{isEnglish ? 'Portfolio — Data Engineer' : 'Portfólio — Engenheiro de Dados'}</title>
        <meta name="description" content={isEnglish ? 'Data Engineering project portfolio — architectures, pipelines and data platforms' : 'Portfólio de projetos de Engenharia de Dados — arquiteturas, pipelines e plataformas de dados'} />
        <meta property="og:title" content={isEnglish ? 'Portfolio — Data Engineer' : 'Portfólio — Engenheiro de Dados'} />
        <meta property="og:description" content={isEnglish ? 'Data Engineering architectures and projects' : 'Arquiteturas e projetos de Engenharia de Dados'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.noise} aria-hidden />

      <nav className={styles.nav}>
        <span className={styles.navLogo} aria-label={isEnglish ? 'Portfolio' : 'Portfólio'}>
          <span className={styles.navDot} />
          <span className="mono">eng.dados</span>
        </span>
        <div className={styles.navLinks}>
          <a href="#projetos">{isEnglish ? 'Projects' : 'Projetos'}</a>
          <a href="#skills">Skills</a>
          <a href="mailto:pedroaquinodev@email.com" className={styles.navCta}>{isEnglish ? 'Contact' : 'Contato'}</a>
          <div className={styles.languageSwitcher} aria-label="Language selector">
            <button className={language === 'pt' ? styles.languageActive : styles.languageButton} onClick={() => setLanguage('pt')} aria-pressed={language === 'pt'}>PT</button>
            <button className={language === 'en' ? styles.languageActive : styles.languageButton} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroWrapper}>
          {/* Left */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroDot} />
              {isEnglish ? 'Available for contract opportunities' : 'Disponível para oportunidades PJ'}
            </div>
            <h1 className={styles.heroTitle}>
              {isEnglish ? <>Data<br /><span className={styles.heroGradient}>Engineer</span></> : <>Engenheiro<br /><span className={styles.heroGradient}>de Dados</span></>}
            </h1>
            <p className={styles.heroSub}>
              {isEnglish
                ? 'I build scalable data platforms — from real-time pipelines to enterprise lakehouses. I focus on architectures that support critical business decisions.'
                : 'Construo plataformas de dados escaláveis — de pipelines em tempo real a lakehouses corporativos. Foco em arquiteturas que suportam decisões críticas de negócio.'}
            </p>
            <div className={styles.heroActions}>
              <a href="#projetos" className={styles.btnPrimary}>
                {isEnglish ? 'View projects' : 'Ver projetos'}
              </a>

              <a
                href="mailto:pedroaquinodev@email.com"
                className={styles.btnSecondary}
              >
                {isEnglish ? 'Get in touch' : 'Entre em contato'}
              </a>
            </div>
          </div>

          {/* Right - Certifications */}
          <div className={styles.certifications}>
            <span className={styles.certTitle}>{isEnglish ? 'Certifications' : 'Certificações'}</span>

            <div className={styles.certGrid}>
              <img
                src="/certs/aws_pract.png"
                alt="AWS Cloud Practitioner"
                className={styles.certBadge}
              />

              <img
                src="/certs/Scrum_Foundational.png"
                alt="Scrum Foundation Professional Certificate"
                className={styles.certBadge}
              />

              <img
                src="/certs/databricks_accreditations.png"
                alt="Databicks Partner Accreditations"
                className={styles.certBadge}
              />

              <img
                src="/certs/aws_technical.png"
                alt="AWS Partner Accreditations"
                className={styles.certBadge}
              />
              <img
                src="/certs/advantages_azure_databricks.png"
                alt="Advantages of Azure Databricks & Microsoft Fabric"
                className={styles.certBadge}
              />
              <img
                src="/certs/gen_ai_llm.png"
                alt="Advantages of Gen AI & LLM on Databricks"
                className={styles.certBadge}
              />
              <img
                src="/certs/lakehouse_fundamentals.png"
                alt="Databricks Lakehouse Fundamentals"
                className={styles.certBadge}
              />
              <img
                src="/certs/cloud_economics.png"
                alt="AWS Cloud Economics Essentials"
                className={styles.certBadge}
              />
            </div>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden>
          <div className={styles.heroGrid}>
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={styles.heroCell}
                style={{
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
      </section>

        {/* Projects */}
        <section id="projetos" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{isEnglish ? 'Projects' : 'Projetos'}</span>
              <h2 className={styles.sectionTitle}>{isEnglish ? 'Architectures in production' : 'Arquiteturas em produção'}</h2>
            </div>
            <div className={styles.grid}>
              {projects.map(p => <ProjectCard key={p.id} project={p} language={language} />)}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Stack</span>
              <h2 className={styles.sectionTitle}>{isEnglish ? 'Tools & technologies' : 'Ferramentas & tecnologias'}</h2>
            </div>
            <div className={styles.skillsGrid}>
              {skills.map((s, i) => (
                <div key={i} className={styles.skillGroup}>
                  <h3 className={styles.skillCategory}>{s.category}</h3>
                  <div className={styles.skillItems}>
                    {s.items.map((item, j) => (
                      <span key={j} className={styles.skillItem}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaGlow} aria-hidden />
              <h2 className={styles.ctaTitle}>{isEnglish ? 'Want to build something together?' : 'Quer construir algo juntos?'}</h2>
              <p className={styles.ctaDesc}>
                {isEnglish ? 'I am open to conversations about data engineering, data architecture or consulting opportunities.' : 'Estou aberto a conversas sobre posições de engenharia de dados, arquitetura de dados ou consultoria.'}
              </p>
              <a href="mailto:pedroaquinodev@email.com" className={styles.btnPrimary}>
                {isEnglish ? 'Talk to me →' : 'Falar comigo →'}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <span className="mono" style={{ color: 'var(--text-3)', fontSize: '13px' }}>
            {isEnglish ? 'Built with Next.js · Hosted on Vercel' : 'Feito com Next.js · Hospedado na Vercel'}
          </span>
        </div>
      </footer>
    </>
  )
}
