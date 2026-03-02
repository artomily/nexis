import { TopBar } from "@/components/layout/top-bar";

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="pt-13 p-6 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
