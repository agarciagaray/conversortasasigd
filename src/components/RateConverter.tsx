import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ArrowRight, Calculator, Check, CheckCircle2, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";

const periodMultipliers: Record<string, number> = {
  anual: 1,
  semestral: 2,
  trimestral: 4,
  bimestral: 6,
  mensual: 12,
  quincenal: 24,
  diario: 365,
};

const periodNames: Record<string, string> = {
  anual: "Anual",
  semestral: "Semestral",
  trimestral: "Trimestral",
  bimestral: "Bimestral",
  mensual: "Mensual",
  quincenal: "Quincenal",
  diario: "Diario",
};

interface ConversionResult {
  value: number;
  formula: string;
  description: string;
  variables: { name: string; description: string }[];
  typeFrom: string;
  typeTo: string;
  periodFrom: string;
  periodTo: string;
}

export function RateConverter() {
  const [typeFrom, setTypeFrom] = useState("efectiva");
  const [typeTo, setTypeTo] = useState("nominal");
  const [periodFrom, setPeriodFrom] = useState("anual");
  const [periodTo, setPeriodTo] = useState("mensual");
  const [rateFrom, setRateFrom] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatNumber = (num: number, decimals = 5): string => {
    if (num === null || num === undefined || isNaN(num)) return "0";
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(num * factor) / factor;
    return rounded.toString();
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleTypeFromChange = (value: string) => {
    setTypeFrom(value);
    setTypeTo(value === "efectiva" ? "nominal" : "efectiva");
    clearMessages();
  };

  const handleTypeToChange = (value: string) => {
    setTypeTo(value);
    setTypeFrom(value === "nominal" ? "efectiva" : "nominal");
    clearMessages();
  };

  const convertRate = () => {
    clearMessages();
    setResult(null);

    const rate = parseFloat(rateFrom);

    if (isNaN(rate) || rateFrom === "") {
      setError("Por favor, ingrese una tasa válida");
      return;
    }

    if (rate < 0 || rate > 100) {
      setError("La tasa debe estar entre 0 y 100");
      return;
    }

    if (typeFrom === typeTo) {
      setError("Debe seleccionar tipos de tasas diferentes");
      return;
    }

    try {
      const rateDecimal = rate / 100;
      let resultValue: number;
      let formula = "";
      let description = "";
      let variables: { name: string; description: string }[] = [];

      if (typeFrom === "efectiva" && typeTo === "nominal") {
        const mFrom = periodMultipliers[periodFrom];
        const mTo = periodMultipliers[periodTo];

        let effectiveAnnual = rateDecimal;
        if (mFrom !== 1) {
          effectiveAnnual = Math.pow(1 + rateDecimal, mFrom) - 1;
        }

        resultValue = Math.pow(1 + effectiveAnnual, 1 / mTo) - 1;

        formula = "iN = [(1 + iE)^(1/m) - 1]";
        description = `Donde se convierte la Tasa Efectiva ${periodNames[periodFrom]} a Tasa Nominal ${periodNames[periodTo]}.`;
        variables = [
          { name: "iE", description: `Tasa Efectiva ${periodNames[periodFrom]} (${rate}%)` },
          { name: "iN", description: `Tasa Nominal ${periodNames[periodTo]} (resultado)` },
          { name: "m", description: `Número de períodos ${periodNames[periodTo]} en un año (${mTo})` },
        ];
      } else {
        const mFrom = periodMultipliers[periodFrom];
        const mTo = periodMultipliers[periodTo];

        const effectiveAnnual = Math.pow(1 + rateDecimal / mFrom, mFrom) - 1;
        resultValue = Math.pow(1 + effectiveAnnual, 1 / mTo) - 1;

        formula = "iE = (1 + iN/m)^m - 1";
        description = `Donde se convierte la Tasa Nominal ${periodNames[periodFrom]} a Tasa Efectiva ${periodNames[periodTo]}.`;
        variables = [
          { name: "iN", description: `Tasa Nominal ${periodNames[periodFrom]} (${rate}%)` },
          { name: "iE", description: `Tasa Efectiva ${periodNames[periodTo]} (resultado)` },
          { name: "m", description: `Número de períodos ${periodNames[periodFrom]} en un año (${mFrom})` },
        ];
      }

      setResult({
        value: resultValue,
        formula,
        description,
        variables,
        typeFrom,
        typeTo,
        periodFrom,
        periodTo,
      });

      showSuccess("Conversión realizada exitosamente");
    } catch (err) {
      setError("Error en el cálculo: " + (err as Error).message);
    }
  };

  const resetForm = () => {
    setRateFrom("");
    setTypeFrom("efectiva");
    setTypeTo("nominal");
    setPeriodFrom("anual");
    setPeriodTo("mensual");
    setResult(null);
    clearMessages();
  };

  const copyFormula = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.formula);
        setCopied(true);
        showSuccess("Fórmula copiada al portapapeles");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setError("No se pudo copiar la fórmula");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Form Card */}
      <Card className="card-shadow p-6 md:p-8 transition-shadow hover:card-shadow-hover">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border-l-4 border-destructive flex items-center gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <span className="text-destructive font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border-l-4 border-success flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
            <span className="text-success font-medium">{success}</span>
          </div>
        )}

        {/* Row 1: Tipo de Tasa Origen + Tasa (%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="typeFrom" className="flex items-center gap-2 font-semibold">
              <ArrowRight className="h-4 w-4 text-primary" />
              Tipo de Tasa Origen
            </Label>
            <Select value={typeFrom} onValueChange={handleTypeFromChange}>
              <SelectTrigger id="typeFrom" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                <SelectItem value="efectiva">Tasa Efectiva</SelectItem>
                <SelectItem value="nominal">Tasa Nominal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rateFrom" className="flex items-center gap-2 font-semibold">
              <span className="text-primary font-bold">%</span>
              Tasa (%)
            </Label>
            <Input
              id="rateFrom"
              type="number"
              placeholder="Ingrese la tasa"
              min="0"
              max="100"
              step="0.00001"
              value={rateFrom}
              onChange={(e) => {
                setRateFrom(e.target.value);
                clearMessages();
              }}
              className="bg-background"
            />
          </div>
        </div>

        {/* Row 2: Periodo Origen + Tipo de Tasa Destino */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="periodFrom" className="flex items-center gap-2 font-semibold">
              <Calculator className="h-4 w-4 text-primary" />
              Periodo Origen
            </Label>
            <Select value={periodFrom} onValueChange={(v) => { setPeriodFrom(v); clearMessages(); }}>
              <SelectTrigger id="periodFrom" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                {Object.entries(periodNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="typeTo" className="flex items-center gap-2 font-semibold">
              <ArrowRight className="h-4 w-4 text-primary" />
              Tipo de Tasa Destino
            </Label>
            <Select value={typeTo} onValueChange={handleTypeToChange}>
              <SelectTrigger id="typeTo" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                <SelectItem value="nominal">Tasa Nominal</SelectItem>
                <SelectItem value="efectiva">Tasa Efectiva</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 3: Periodo Destino + Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="periodTo" className="flex items-center gap-2 font-semibold">
              <Calculator className="h-4 w-4 text-primary" />
              Periodo Destino
            </Label>
            <Select value={periodTo} onValueChange={(v) => { setPeriodTo(v); clearMessages(); }}>
              <SelectTrigger id="periodTo" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                {Object.entries(periodNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-3">
            <Button
              onClick={convertRate}
              className="flex-1 gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Convertir
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              className="flex-shrink-0"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className="card-shadow p-6 md:p-8 animate-fade-in">
          {/* Conversion Path */}
          <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-muted rounded-lg">
            <span className="gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
              {result.typeFrom === "efectiva" ? "Efectiva" : "Nominal"} {periodNames[result.periodFrom]}
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <span className="gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
              {result.typeTo === "efectiva" ? "Efectiva" : "Nominal"} {periodNames[result.periodTo]}
            </span>
          </div>

          {/* Result Box */}
          <div className="relative bg-muted rounded-xl p-8 mb-6 text-center overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 gradient-primary" />
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Tasa Resultado
            </p>
            <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              {formatNumber(result.value * 100)}%
            </p>
            <p className="text-muted-foreground">
              Tasa {result.typeTo === "efectiva" ? "Efectiva" : "Nominal"} {periodNames[result.periodTo]}
            </p>
          </div>

          {/* Formula Section */}
          <div className="bg-muted rounded-xl p-6">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-4">
              Fórmula Utilizada
            </h3>

            <div className="relative bg-background border rounded-lg p-5 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={copyFormula}
                className="absolute top-3 right-3"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
              <code className="font-mono text-lg text-foreground">
                {result.formula}
              </code>
            </div>

            <p className="text-muted-foreground mb-4">
              {result.description}
            </p>

            <div className="bg-background border rounded-lg p-5 space-y-3">
              {result.variables.map((v) => (
                <div key={v.name} className="flex gap-3">
                  <span className="font-mono font-semibold text-primary min-w-[40px]">
                    {v.name}
                  </span>
                  <span className="text-muted-foreground">= {v.description}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Explanatory Boxes: always rendered at the end of the page; when a result
          exists they appear below it because they are placed after the result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 bg-muted">
          <h4 className="text-lg font-semibold mb-2">Tasa Efectiva</h4>
          <p className="text-sm text-muted-foreground">
            Es el porcentaje real que se gana o se paga en un período determinado (por ejemplo, en un año). Incluye el efecto de los intereses que se van sumando sobre el capital, es decir, los intereses ganan más intereses.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Ejemplo:</strong> Si en un año depositas dinero y los intereses se suman cada mes, la tasa efectiva muestra cuánto ganaste realmente al final del año con esas sumas mensuales.
          </p>
        </Card>

        <Card className="p-5 bg-muted">
          <h4 className="text-lg font-semibold mb-2">Tasa Nominal</h4>
          <p className="text-sm text-muted-foreground">
            Es un porcentaje que indica cuánto se ganará o pagará en intereses, pero sin tener en cuenta la acumulación de los intereses durante el período. Suele expresarse junto con la frecuencia de capitalización (mensual, trimestral, etc.).
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Ejemplo:</strong> Una tasa nominal anual del 12 % con capitalización mensual significa que se cobra 1 % cada mes, pero no refleja directamente la ganancia o costo total del año.
          </p>
        </Card>
      </div>
    </div>
  );
}
