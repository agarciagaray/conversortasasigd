import { RateConverter } from "@/components/RateConverter";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Header */}
      <header className="gradient-header text-primary-foreground py-16 md:py-20 px-4 text-center relative overflow-hidden">
        {/* Decorative wave */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Conversor de Tasas Financieras
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Herramienta profesional para convertir entre Tasas Efectivas y
            Nominales con precisión matemática
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 -mt-8 px-4 pb-12">
        <RateConverter />
      </main>
    </div>
  );
};

export default Index;
