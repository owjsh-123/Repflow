import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, BrainCircuit, CalendarDays, Dumbbell, Ruler, Target, Trophy } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/app/dashboard/")({
  component: DashboardPage,
});

const quickActions = [
  { title: "Log workout", body: "Record sets, reps, weight, time and distance.", to: "/app/log-workout" as const, icon: Dumbbell },
  { title: "AI Coach", body: "Generate a training split around your goal and schedule.", to: "/app/coach" as const, icon: BrainCircuit },
  { title: "Measurements", body: "Track body weight, body fat and measurements.", to: "/app/measurements" as const, icon: Ruler },
  { title: "Workout history", body: "Review previous sessions and training consistency.", to: "/app/workouts" as const, icon: CalendarDays },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Header title="Dashboard" />

      <section className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-background to-cyan-500/10 p-6 sm:p-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500">RepFlow</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Make every set count.</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Log your training, follow body-composition progress and use the coach to build a plan you can actually stick to.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild><Link to="/app/log-workout">Start workout</Link></Button>
            <Button asChild variant="outline"><Link to="/app/coach">Build a plan</Link></Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Activity} label="Current streak" value="Start today" />
        <Stat icon={Trophy} label="Personal records" value="Track PRs" />
        <Stat icon={BarChart3} label="Training volume" value="Build history" />
        <Stat icon={Target} label="Primary goal" value="Set in Coach" />
      </section>

      <section>
        <h3 className="mb-4 text-xl font-bold">Quick actions</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickActions.map(({ title, body, to, icon: Icon }) => (
            <Link key={title} to={to} search={to === "/app/workouts" ? { page: 1 } : undefined as never} className="group">
              <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:border-emerald-500/50">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return (
    <Card className="p-4">
      <Icon className="mb-3 size-5 text-emerald-500" />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </Card>
  );
}
