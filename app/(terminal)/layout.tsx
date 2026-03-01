import { TopBar } from "@/components/layout/top-bar";
import { SideNav } from "@/components/layout/side-nav";

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex pt-[52px]">
        <SideNav />
        <main className="flex-1 ml-[220px] p-6 overflow-y-auto h-[calc(100vh-52px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
