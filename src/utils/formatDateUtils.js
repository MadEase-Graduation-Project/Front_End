export function formatDate(dateString) {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function formatDateShort(dateString) {
  if (!dateString) return "";
  // Parse as UTC, fallback for ISO strings without Z
  let date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Try to fix common issues (e.g., missing Z)
    date = new Date(dateString + "Z");
    if (isNaN(date.getTime())) return "";
  }
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(-4);
  return `${yy}-${mm}-${dd}`;
}
