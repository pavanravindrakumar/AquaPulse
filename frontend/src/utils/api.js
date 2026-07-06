const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://aquapulse-backend-j91c.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function getSensorDashboard() {
  return request("/sensors");
}

export function getPrediction(payload) {
  return request("/predictions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getRecommendations() {
  return request("/recommendations");
}

export function getAlerts() {
  return request("/alerts");
}

export function getHealth() {
  return request("/health");
}
