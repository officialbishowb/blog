const socials = [
  { name: "GitHub", href: "https://github.com/officialbishowb" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/bishowb/" },
  { name: "Instagram", href: "https://instagram.com/officialbishowb" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="ds-container flex min-h-[5.5rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <span className="ds-label">&copy; {currentYear} officialbishowb</span>
        <div className="flex flex-wrap gap-x-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-label py-3 text-muted-foreground hover:text-primary transition-colors"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
