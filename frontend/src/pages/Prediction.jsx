import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PredictionCard from "../components/PredictionCard";
import SkeletonCard from "../components/SkeletonCard";
import { getPrediction, getRecommendations } from "../utils/api";

const formFields = [
    { label: "Pond ID", placeholder: "Enter pond identifier", defaultValue: "Pond 4" },
    { label: "Temperature (°C)", placeholder: "Example: 28.4", defaultValue: "28.4" },
    { label: "pH Level", placeholder: "Example: 7.6", defaultValue: "7.6" },
    { label: "Dissolved Oxygen (mg/L)", placeholder: "Example: 6.8", defaultValue: "6.8" },
];

const initialFormValues = {
    pond_id: "Pond 4",
    temperature_c: "28.4",
    ph_level: "7.6",
    dissolved_oxygen_mg_l: "6.8",
    turbidity_ntu: "18",
};

function buildPredictionPayload(values) {
    return {
        pond_id: values.pond_id,
        temperature_c: Number(values.temperature_c),
        ph_level: Number(values.ph_level),
        dissolved_oxygen_mg_l: Number(values.dissolved_oxygen_mg_l),
        turbidity_ntu: Number(values.turbidity_ntu),
    };
}

function Prediction() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState(initialFormValues);
    const [prediction, setPrediction] = useState(null);
    const [recommendationData, setRecommendationData] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadPredictionData() {
            setIsLoading(true);
            setError("");

            try {
                const predictionResponse = await
                getPrediction(

                buildPredictionPayload(initialFormValues)
                );

                if (!isMounted) return;

                setPrediction(predictionResponse);

                try{
                    const recommendationResponse = await getRecommendations();

                    if (isMounted) {

                        setRecommendationData(recommendationResponse);

                    }
                } catch (recommendationError) {
                    console.log("Recommendations unavailable:", recommendationError);
                }

            } catch (requestError) {
                if (!isMounted) {
                    return;
                }

                // Backend may be unavailable — fall back to realistic mock prediction
                try {
                    const mock = generateMockPrediction(initialFormValues);
                    setPrediction(mock);
                    // try to still get recommendations, but ignore errors
                    try {
                        const rec = await getRecommendations();
                        setRecommendationData(rec);
                    } catch (e) {
                        // ignore
                    }
                    setError("Backend unavailable, showing simulated prediction.");
                } catch (e) {
                    setError(requestError instanceof Error ? requestError.message : "Unable to load prediction data.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadPredictionData();

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const predictionResponse = await getPrediction(buildPredictionPayload(formValues));

            setPrediction(predictionResponse);
        } catch (requestError) {
            // Try graceful mock fallback on submit
            const mock = generateMockPrediction(formValues);
            setPrediction(mock);
            setError(requestError instanceof Error ? requestError.message : "Unable to generate prediction. Using simulated result.");
        } finally {
            setIsSubmitting(false);
        }
    }

    function generateMockPrediction(values) {
        const t = Number(values.temperature_c ?? values.temperature ?? 0);
        const ph = Number(values.ph_level ?? 0);
        const dox = Number(values.dissolved_oxygen_mg_l ?? 0);
        const turb = Number(values.turbidity_ntu ?? values.turbidity ?? 0);

        // Simple heuristic for risk
        let risk = "Low";
        if (t > 31 || ph < 6.5 || ph > 9 || dox < 4 || turb > 80) risk = "High";
        else if (t > 29 || ph < 6.8 || ph > 8.5 || dox < 5 || turb > 40) risk = "Medium";

        const confidence_score = Math.max(65, Math.min(96, Math.round(90 - (risk === "High" ? 15 : risk === "Medium" ? 5 : 0) + (Math.random() * 6 - 3))));

        const recommendation =
            risk === "High"
                ? "Immediate inspection and corrective action required: check aeration and water exchange."
                : risk === "Medium"
                ? "Monitor closely and consider targeted aeration or partial water change."
                : "Conditions are stable. Continue regular monitoring and feeding routines.";

        const result = risk === "High" ? "At Risk" : "Stable";

        const explanation = `Estimated risk ${risk} based on temperature ${t}°C, pH ${ph}, DO ${dox} mg/L and turbidity ${turb} NTU.`;

        return {
            pond_id: values.pond_id ?? "Pond 1",
            result,
            confidence_score,
            risk_level: risk,
            recommendation,
            explanation,
            generated_at: new Date().toISOString(),
        };
    }

    const predictionCards = prediction
        ? [
            {
                title: "AI Prediction Result",
                value: prediction.result,
                detail: prediction.explanation,
            },
            {
                title: "Confidence Score",
                value: `${prediction.confidence_score}%`,
                detail: "Confidence score returned by the backend prediction service.",
            },
            {
                title: "Risk Level",
                value: prediction.risk_level,
                detail: "Risk level is derived from the current sensor input values.",
            },
            {
                title: "Recommendation Card",
                value: prediction.recommendation,
                detail: "Recommended next action from the prediction service.",
                highlight: true,
            },
        ]
        : [];

    const recommendations = recommendationData?.recommendations ?? [];

    const predictionTimestamp = prediction?.generated_at ? new Date(prediction.generated_at).toLocaleString() : null;

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_25%)]" />
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">AI prediction lab</p>
                    <h1 className="mt-3 text-4xl font-bold md:text-5xl">Prediction Page</h1>
                    <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
                        Run a dummy aquaculture risk prediction using live-style parameters and review the estimated outcome.
                    </p>
                </motion.div>

                {error ? (
                    <div className="mb-8 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 backdrop-blur-xl">
                        Unable to load live prediction data. Showing the last available output if present. {error}
                    </div>
                ) : null}

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <motion.section
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
                    >
                        <h2 className="text-2xl font-semibold">Input Form</h2>
                        <p className="mt-1 text-sm text-slate-400">Enter the latest pond parameters to simulate an AI risk assessment.</p>

                        {isLoading ? (
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {formFields.map((field) => (
                                    <div key={field.label} className="space-y-2">
                                        <div className="h-4 w-28 rounded-full bg-white/10" />
                                        <div className="h-12 rounded-2xl bg-white/10" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                                {formFields.map((field) => (
                                    <motion.label
                                        key={field.label}
                                        whileHover={{ y: -2 }}
                                        className="space-y-2 text-sm text-slate-300"
                                    >
                                        <span className="block font-medium text-slate-200">{field.label}</span>
                                        <input
                                            type="text"
                                            value={
                                                field.label === "Pond ID"
                                                    ? formValues.pond_id
                                                    : field.label === "Temperature (°C)"
                                                        ? formValues.temperature_c
                                                        : field.label === "pH Level"
                                                            ? formValues.ph_level
                                                            : formValues.dissolved_oxygen_mg_l
                                            }
                                            onChange={(event) => {
                                                const { value } = event.target;

                                                if (field.label === "Pond ID") {
                                                    setFormValues((current) => ({ ...current, pond_id: value }));
                                                } else if (field.label === "Temperature (°C)") {
                                                    setFormValues((current) => ({ ...current, temperature_c: value }));
                                                } else if (field.label === "pH Level") {
                                                    setFormValues((current) => ({ ...current, ph_level: value }));
                                                } else if (field.label === "Dissolved Oxygen (mg/L)") {
                                                    setFormValues((current) => ({ ...current, dissolved_oxygen_mg_l: value }));
                                                } else {
                                                    setFormValues((current) => ({ ...current, turbidity_ntu: value }));
                                                }
                                            }}
                                            placeholder={field.placeholder}
                                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                                        />
                                    </motion.label>
                                ))}
                                <div className="md:col-span-2">
                                    <label className="space-y-2 text-sm text-slate-300">
                                        <span className="block font-medium text-slate-200">Turbidity (NTU)</span>
                                        <input
                                            type="text"
                                            value={formValues.turbidity_ntu}
                                            onChange={(event) => setFormValues((current) => ({ ...current, turbidity_ntu: event.target.value }))}
                                            placeholder="Example: 18"
                                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                                        />
                                    </label>
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_20px_60px_rgba(34,211,238,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSubmitting ? "Generating..." : "Generate Prediction"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.section>

                    <section className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-4">
                                <SkeletonCard lines={2} />
                                <SkeletonCard lines={2} />
                                <SkeletonCard lines={2} />
                                <SkeletonCard lines={2} />
                            </div>
                        ) : prediction ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">Prediction Summary</p>
                                            <p className="mt-2 text-lg font-semibold text-white">{prediction.result} — {prediction.pond_id}</p>
                                            <p className="mt-1 text-sm text-slate-300">{prediction.explanation}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`rounded-full px-3 py-1 text-sm font-semibold ${prediction.risk_level === 'High' ? 'bg-rose-500 text-white' : prediction.risk_level === 'Medium' ? 'bg-amber-400 text-slate-900' : 'bg-emerald-400 text-slate-900'}`}>
                                                    {prediction.risk_level}
                                                </div>
                                                <div className="text-sm text-slate-300">Confidence: <span className="font-medium text-white">{prediction.confidence_score}%</span></div>
                                            </div>
                                            {predictionTimestamp ? <div className="text-xs text-slate-400">Generated: {predictionTimestamp}</div> : null}
                                        </div>
                                    </div>
                                </motion.div>

                                {predictionCards.map((card, index) => (
                                    <motion.div
                                        key={card.title}
                                        initial={{ opacity: 0, x: 16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.35, delay: index * 0.06 }}
                                    >
                                        <PredictionCard {...card} />
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: 0.25 }}
                                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
                                >
                                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">AI recommendations</p>
                                    <div className="mt-4 space-y-3">
                                        {recommendations.length > 0 ? (
                                            recommendations.map((item) => (
                                                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="font-medium text-white">{item.title}</p>
                                                            <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                                                        </div>
                                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                                                            {item.priority}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-400">No recommendation data available.</p>
                                        )}
                                    </div>

                                    {recommendationData?.next_actions?.length ? (
                                        <div className="mt-5">
                                            <p className="text-sm font-medium text-slate-200">Next actions</p>
                                            <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                                {recommendationData.next_actions.map((action) => (
                                                    <li key={action} className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                </motion.div>
                            </>
                        ) : (
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-300 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
                                Prediction data is not available yet.
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Prediction;