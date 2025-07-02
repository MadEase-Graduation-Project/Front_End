// for extract msg from payload

export function extractMessage(payload) {
  if (!payload) return "";
  return payload.message ?? payload.msg ?? "";
}
