import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <header className="py-6">
          <h1 className="text-3xl font-semibold">WeatherGPT</h1>
          <p className="text-muted-foreground">
            Your intelligent weather companion
          </p>
        </header>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">What’s the weather like?</h2>

          <div className="mt-4 flex gap-3">
            <Input placeholder="Ask about the weather..." />
            <Button>Ask</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
