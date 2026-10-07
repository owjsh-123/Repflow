import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/coach/")({ component: CoachPage });

type Goal = "muscle" | "strength" | "fat-loss" | "general";

const splits: Record<number, string[]> = {
  2: ["Full Body A", "Full Body B"],
  3: ["Push", "Pull", "Legs"],
  4: ["Upper A", "Lower A", "Upper B", "Lower B"],
  5: ["Push", "Pull", "Legs", "Upper", "Lower"],
  6: ["Push A", "Pull A", "Legs A", "Push B", "Pull B", "Legs B"],
};

const exercises: Record<string, string[]> = {
  Push: ["Bench Press — 3×6–10", "Incline DB Press — 3×8–12", "Shoulder Press — 3×8–12", "Lateral Raise — 3×12–20", "Triceps Pressdown — 3×10–15"],
  Pull: ["Lat Pulldown — 3×8–12", "Barbell Row — 3×6–10", "Seated Cable Row — 3×8–12", "Rear Delt Fly — 3×12–20", "Biceps Curl — 3×10–15"],
  Legs: ["Squat — 3×6–10", "Romanian Deadlift — 3×8–12", "Leg Press — 3×10–15", "Leg Curl — 3×10–15", "Calf Raise — 4×10–15"],
};

function buildExercises(name: string) {
  if (name.includes("Push")) return exercises.Push;
  if (name.includes("Pull")) return exercises.Pull;
  if (name.includes("Leg" ) || name.includes("Lower")) return exercises.Legs;
  if (name.includes("Upper")) return [...exercises.Push.slice(0, 3), ...exercises.Pull.slice(0, 3)];
  return ["Squat — 3×6–10", "Bench Press — 3×6–10", "Lat Pulldown — 3×8–12", "Romanian Deadlift — 3×8–12", "Lateral Raise — 3×12–20", "Biceps Curl — 2×10–15"];
}

function CoachPage() {
  const [goal, setGoal] = useState<Goal>("muscle");
  const [days, setDays] = useState(4);
  const [generated, setGenerated] = useState(false);
  const plan = useMemo(() => (splits[days] ?? splits[4]).map(name => ({ name, exercises: buildExercises(name) })), [days]);

  return (
    <div className="space-y-6">
      <Header title="AI Coach" />
      <Card className="border-emerald-500/20">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500"><BrainCircuit className="size-6" /></div>
          <div><p className="font-semibold">Smart program builder</p><p className="text-sm text-muted-foreground">V1 creates a practical evidence-informed split instantly. A model-powered coach can be connected later.</p></div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2"><span className="text-sm font-medium">Goal</span><select className="w-full rounded-md border bg-background p-2.5" value={goal} onChange={e => setGoal(e.target.value as Goal)}><option value="muscle">Build muscle</option><option value="strength">Get stronger</option><option value="fat-loss">Fat loss / retain muscle</option><option value="general">General fitness</option></select></label>
          <label className="space-y-2"><span className="text-sm font-medium">Training days / week</span><select className="w-full rounded-md border bg-background p-2.5" value={days} onChange={e => setDays(Number(e.target.value))}>{[2,3,4,5,6].map(d => <option key={d} value={d}>{d} days</option>)}</select></label>
        </div>
        <Button className="mt-5" onClick={() => setGenerated(true)}>Generate my plan</Button>
      </Card>

      {generated && <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-emerald-500"><CheckCircle2 className="size-4" /> Plan generated for {goal.replace("-", " ")} · {days} days/week</div>
        <div className="grid gap-4 md:grid-cols-2">
          {plan.map((day, index) => <Card key={day.name}><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Day {index + 1}</p><h3 className="mt-1 text-lg font-bold">{day.name}</h3><ul className="mt-4 space-y-2 text-sm">{day.exercises.map(ex => <li key={ex} className="rounded-lg bg-muted/50 px-3 py-2">{ex}</li>)}</ul></Card>)}
        </div>
        <Card><p className="font-semibold">Progression rule</p><p className="mt-1 text-sm text-muted-foreground">When you reach the top of the rep range on every working set with good form, increase the load slightly next session. Keep most sets around 1–3 reps in reserve.</p></Card>
      </div>}
    </div>
  );
}
