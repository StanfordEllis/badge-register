type RegistryHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RegistryHeader({ eyebrow, title, description }: RegistryHeaderProps) {
  return (
    <header className="stack" style={{ gap: 8, paddingTop: 8 }}>
      <p className="section-title">{eyebrow}</p>
      <h1 className="display-title" style={{ fontSize: "clamp(2rem, 8vw, 3.8rem)" }}>
        {title}
      </h1>
      <p className="subtle" style={{ margin: 0, maxWidth: 440 }}>
        {description}
      </p>
    </header>
  );
}
