import Head from 'next/head'
import { useState } from 'react'
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
    tag: 'Streaming',
    title: 'Pipeline Real-Time de Fraude',
    subtitle: 'Detecção de fraude em transações financeiras com latência sub-segundo',
    description:
      'Sistema de detecção de fraude em tempo real usando Flink e Kafka Streams. Modelos de ML servidos via Feast feature store. Processamento de 120K transações/minuto com SLA de 200ms end-to-end.',
    stack: ['Apache Flink', 'Kafka', 'Feast', 'Redis', 'Python', 'Kubernetes'],
    metrics: [
      { label: 'Transações/min', value: '120K' },
      { label: 'Latência E2E', value: '< 200ms' },
      { label: 'Precisão ML', value: '98.7%' },
    ],
    color: 'teal',
    architecture: [
      { layer: 'Fonte', items: ['POS Systems', 'Mobile Apps', 'Web'], color: '#5de0c8' },
      { layer: 'Stream', items: ['Kafka Topics', 'Flink Jobs', 'State Store'], color: '#3dbba8' },
      { layer: 'ML', items: ['Feast', 'Redis Cache', 'Model Serving'], color: '#5de0c8' },
      { layer: 'Saída', items: ['Alertas', 'Block/Allow', 'Audit Log'], color: '#2da890' },
    ],
  },
  {
    id: 3,
    tag: 'Analytics Engineering',
    title: 'dbt Semantic Layer Corporativo',
    subtitle: 'Modelagem dimensional unificada para 12 áreas de negócio',
    description:
      'Implementação de Data Vault 2.0 como camada de staging e dbt para modelos dimensionais. Mais de 300 modelos versionados, testes automatizados e documentação gerada. Adoção de dbt Semantic Layer para métricas consistentes em todos os dashboards.',
    stack: ['dbt Core', 'Snowflake', 'Data Vault 2.0', 'Great Expectations', 'Airflow', 'Metabase'],
    metrics: [
      { label: 'Modelos dbt', value: '300+' },
      { label: 'Cobertura de testes', value: '94%' },
      { label: 'Áreas de negócio', value: '12' },
    ],
    color: 'amber',
    architecture: [
      { layer: 'Fontes', items: ['ERP', 'CRM', 'SaaS APIs', 'Files'], color: '#f7b26a' },
      { layer: 'Staging', items: ['Data Vault', 'Hubs', 'Links', 'Sats'], color: '#d4904a' },
      { layer: 'Marts', items: ['dbt Models', 'Sem. Layer', 'Testes'], color: '#f7b26a' },
      { layer: 'Consumo', items: ['BI Tools', 'Data Apps', 'APIs'], color: '#d4904a' },
    ],
  },
  {
    id: 4,
    tag: 'DataOps',
    title: 'Plataforma de Observabilidade de Dados',
    subtitle: 'Monitoramento end-to-end de qualidade, linhagem e SLAs de pipelines',
    description:
      'Construção de plataforma interna de observabilidade de dados integrando OpenLineage para rastreamento de linhagem, Monte Carlo para qualidade, e dashboards customizados de SLA. Reduziu MTTR de incidentes de dados de 4h para 25min.',
    stack: ['OpenLineage', 'Marquez', 'Great Expectations', 'Monte Carlo', 'Grafana', 'Prometheus'],
    metrics: [
      { label: 'MTTR', value: '25min' },
      { label: 'Pipelines monit.', value: '800+' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    color: 'coral',
    architecture: [
      { layer: 'Coleta', items: ['OpenLineage', 'Custom Hooks', 'Airflow'], color: '#f76a7c' },
      { layer: 'Armazena', items: ['Marquez', 'TimeSeries DB', 'S3'], color: '#d44a5a' },
      { layer: 'Análise', items: ['Linhagem', 'Qualidade', 'Alertas'], color: '#f76a7c' },
      { layer: 'Visib.', items: ['Grafana', 'Slack', 'PagerDuty'], color: '#d44a5a' },
    ],
  },
]

const SKILLS = [
  { category: 'Linguagens', items: ['Python', 'SQL', 'Scala', 'Bash'] },
  { category: 'Orquestração', items: ['Apache Airflow', 'Prefect', 'Dagster'] },
  { category: 'Processamento', items: ['Apache Spark', 'Apache Flink', 'dbt'] },
  { category: 'Cloud', items: ['AWS', 'Azure', 'GCP'] },
  { category: 'Storage', items: ['Delta Lake', 'Apache Iceberg', 'Snowflake', 'BigQuery'] },
  { category: 'Streaming', items: ['Apache Kafka', 'Kinesis', 'Pub/Sub'] },
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

function ProjectCard({ project }) {
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
          {expanded ? '↑ Ocultar arquitetura' : '↓ Ver arquitetura'}
        </button>

        {expanded && (
          <div className={styles.archWrap}>
            <p className={styles.archTitle}>Diagrama de Arquitetura</p>
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
  return (
    <>
      <Head>
        <title>Portfólio — Engenheiro de Dados</title>
        <meta name="description" content="Portfólio de projetos de Engenharia de Dados — arquiteturas, pipelines e plataformas de dados" />
        <meta property="og:title" content="Portfólio — Engenheiro de Dados" />
        <meta property="og:description" content="Arquiteturas e projetos de Engenharia de Dados" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.noise} aria-hidden />

      <nav className={styles.nav}>
        <span className={styles.navLogo} aria-label="Portfólio">
          <span className={styles.navDot} />
          <span className="mono">eng.dados</span>
        </span>
        <div className={styles.navLinks}>
          <a href="#projetos">Projetos</a>
          <a href="#skills">Skills</a>
          <a href="mailto:pedroaquinodev@email.com" className={styles.navCta}>Contato</a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroDot} />
              Disponível para oportunidades
            </div>
            <h1 className={styles.heroTitle}>
              Engenheiro<br />
              <span className={styles.heroGradient}>de Dados</span>
            </h1>
            <p className={styles.heroSub}>
              Construo plataformas de dados escaláveis — de pipelines em tempo real a
              lakehouses corporativos. Foco em arquiteturas que suportam decisões críticas de negócio.
            </p>
            <div className={styles.heroActions}>
              <a href="#projetos" className={styles.btnPrimary}>Ver projetos</a>
              <a href="mailto:pedroaquinodev@email.com" className={styles.btnSecondary}>Entre em contato</a>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden>
            <div className={styles.heroGrid}>
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={styles.heroCell} style={{
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`
                }} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projetos" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Projetos</span>
              <h2 className={styles.sectionTitle}>Arquiteturas em produção</h2>
              <p className={styles.sectionDesc}>
                Soluções de dados que movem agulhas reais — não demos, não POCs.
              </p>
            </div>
            <div className={styles.grid}>
              {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Stack</span>
              <h2 className={styles.sectionTitle}>Ferramentas & tecnologias</h2>
            </div>
            <div className={styles.skillsGrid}>
              {SKILLS.map((s, i) => (
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
              <h2 className={styles.ctaTitle}>Quer construir algo juntos?</h2>
              <p className={styles.ctaDesc}>
                Estou aberto a conversas sobre posições de engenharia de dados, arquitetura de dados ou consultoria.
              </p>
              <a href="mailto:pedroaquinodev@email.com" className={styles.btnPrimary}>
                Falar comigo →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <span className="mono" style={{ color: 'var(--text-3)', fontSize: '13px' }}>
            Feito com Next.js · Hospedado na Vercel
          </span>
        </div>
      </footer>
    </>
  )
}
