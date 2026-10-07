import { BrainCircuit, ClipboardPen, Gauge, History, LogOut, Menu, PencilRuler, Shield } from "lucide-react";
import { useState } from "react";
import { createFileRoute, Link, Outlet, redirect, useLocation, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createAuthClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/app")({ beforeLoad: ({ context }) => { if (!context.loggedIn) throw redirect({ to: "/" }); }, component: RouteComponent });

function RouteComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const location = useLocation();
  const adminIsActive = location.pathname.includes("/app/admin");
  const nav = "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors";
  const active = { className: "cursor-default bg-primary text-primary-foreground" };
  const inactive = { className: "hover:bg-accent hover:text-accent-foreground" };
  const handleLogout = async () => { const authClient = createAuthClient(); await authClient.signOut({ fetchOptions: { onSuccess: async () => { setIsMobileMenuOpen(false); await router.invalidate(); queryClient.clear(); router.navigate({ to: "/", reloadDocument: true }); } } }); };
  const links = [
    ["Dashboard", "/app/dashboard", Gauge], ["Workout", "/app/log-workout", ClipboardPen], ["Coach", "/app/coach", BrainCircuit], ["Measure", "/app/log-measurement", PencilRuler], ["History", "/app/workouts", History],
  ] as const;
  const menu = (mobile=false) => <>
    {links.map(([label,to,Icon]) => <Link key={label} to={to as any} search={to === "/app/workouts" ? {page:1} : undefined as any} className={`${nav} ${mobile ? "w-full justify-start" : ""}`} activeProps={active} inactiveProps={inactive} onClick={() => mobile && setIsMobileMenuOpen(false)}><Icon className="size-4" />{label}</Link>)}
    <button type="button" onClick={handleLogout} className={cn(nav, mobile ? "w-full justify-start" : "ml-auto", inactive.className)}><LogOut className="size-4" />Logout</button>
    <Link to="/app/admin/exercises" activeOptions={{ exact:false }} className={cn(nav, adminIsActive ? active.className : inactive.className)} onClick={() => mobile && setIsMobileMenuOpen(false)}><Shield className="size-4" />Admin</Link>
  </>;
  return <main className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border px-2 py-2 md:py-4 md:px-8"><nav className="mx-auto hidden w-full max-w-5xl items-center gap-2 px-6 md:flex"><Link to="/app/dashboard" className="mr-2 font-extrabold tracking-tight text-emerald-500">RepFlow</Link>{menu()}</nav>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between md:hidden"><span className="pl-2 font-extrabold text-emerald-500">RepFlow</span><Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}><SheetTrigger asChild><Button variant="outline" size="icon"><Menu className="size-5" /></Button></SheetTrigger><SheetContent side="left" className="w-72 p-0"><SheetHeader className="border-b"><SheetTitle>RepFlow</SheetTitle></SheetHeader><nav className="flex flex-col gap-1 p-4">{menu(true)}</nav></SheetContent></Sheet></div>
    </header>
    <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-10"><Outlet /></div>
  </main>;
}
