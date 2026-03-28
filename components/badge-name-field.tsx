type BadgeNameFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BadgeNameField({ value, onChange }: BadgeNameFieldProps) {
  return (
    <label className="input-shell">
      <span className="input-label">Badge Name</span>
      <input
        className="text-field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ice-signal"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        maxLength={24}
      />
    </label>
  );
}
