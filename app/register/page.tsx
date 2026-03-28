import { BottomNav } from "@/components/bottom-nav";
import { RegisterPanel } from "@/components/register-panel";
import { RegistryHeader } from "@/components/registry-header";

export default function RegisterPage() {
  return (
    <main className="app-shell">
      <div className="page-grid">
        <RegistryHeader
          eyebrow="Registration Console"
          title="Set your badge."
          description="Check a name, submit once, and follow the registration state."
        />

        <section className="panel" style={{ borderRadius: 26, padding: 18, minHeight: 520 }}>
          <RegisterPanel />
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
