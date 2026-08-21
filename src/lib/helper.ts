export const getScoreBadge = (score: number) => {
  if (score >= 70)
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      bar: "bg-emerald-500",
    };
  if (score >= 50)
    return {
      text: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      bar: "bg-amber-500",
    };
  return {
    text: "text-rose-700",
    bg: "bg-rose-50 border-rose-200",
    bar: "bg-rose-500",
  };
};
