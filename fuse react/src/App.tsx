import heroImg from './assets/hero.png'
import './App.css'

const sidebarSections = [
  {
    title: 'Dashboards',
    subtitle: 'Start from here',
    items: [
      { label: 'Dashboard', icon: 'clipboard', path: 'dashboard' },
      { label: 'Settings', icon: 'badge', path: '/apps/settings' },
    ],
    
  },
  {
    title: 'Category',
    items: [
      {
        label: 'Academy',
        icon: 'withdraw',
        path: '/apps/academy/courses',
        active: true,
      },
    ],
  },
]

function Icon({ type }: { type: string }) {
  switch (type) {
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 4h6" />
          <path d="M9 2h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a2 2 0 0 1 2-2Z" />
          <path d="m9 13 2 2 4-4" />
        </svg>
      )
    case 'badge':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9.2 3.4 2.8-1.4 2.8 1.4 3.1-.2 1.4 2.8 2.5 1.9-.7 3 .7 3-2.5 1.9-1.4 2.8-3.1-.2-2.8 1.4-2.8-1.4-3.1.2-1.4-2.8L2.3 14l.7-3-.7-3L5 6.1l1.4-2.8Z" />
          <path d="m9.4 12 1.8 1.8 3.6-3.6" />
        </svg>
      )
    case 'withdraw':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v12" />
          <path d="m7 11 5 5 5-5" />
          <path d="M4 20h16" />
        </svg>
      )
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2H6.5A2.5 2.5 0 0 0 4 11.5v-4Z" />
          <path d="M4 11.5A2.5 2.5 0 0 1 6.5 9H20v8a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-5Z" />
          <path d="M16 14h4" />
        </svg>
      )
    case 'info':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6" />
          <path d="M12 7h.01" />
        </svg>
      )
    case 'chevron':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m7 14 5-5 5 5" />
        </svg>
      )
    default:
      return null
  }
}

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__top">
          <div className="brand">
            <div className="brand__mark" aria-hidden="true">
              <span className="brand__diamond brand__diamond--top"></span>
              <span className="brand__diamond brand__diamond--mid"></span>
              <span className="brand__diamond brand__diamond--bottom"></span>
            </div>
            <div className="brand__text">
              <strong>FUSE</strong>
              <span>React</span>
            </div>
          </div>

          <nav aria-label="Sidebar navigation">
            {sidebarSections.map((section) => (
              <section className="sidebar__section" key={section.title}>
                <h2 className="sidebar__section-title">{section.title}</h2>
                {section.subtitle ? (
                  <p className="sidebar__section-subtitle">{section.subtitle}</p>
                ) : null}
                <ul className="sidebar__list">
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.label}`}>
                      <a
                        className={`sidebar__link${item.active ? ' is-active' : ''}`}
                        href={item.path}
                      >
                        <span className="sidebar__icon">
                          <Icon type={item.icon} />
                        </span>
                        <span className="sidebar__label">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <div className="sidebar__footer">
          <img className="profile__avatar" src={heroImg} alt="Abbott Keitch" />
          <div className="profile__details">
            <strong>Abbott Keitch</strong>
            <span>admin@fusetheme.com</span>
          </div>
          <button className="profile__action" type="button" aria-label="Profile info">
            <Icon type="info" />
          </button>
          <button className="profile__action" type="button" aria-label="Collapse sidebar">
            <Icon type="chevron" />
          </button>
        </div>
      </aside>

      <section className="content-panel" aria-labelledby="preview-title">
        <p className="eyebrow">Sidebar preview</p>
        <h1 id="preview-title">Fuse-style navigation</h1>
        <p className="content-panel__lead">
          The left sidebar now mirrors the layout from your screenshot with the
          same section titles, menu order, selected state, and bottom profile area.
        </p>
      </section>
    </main>
  )
}

export default App
