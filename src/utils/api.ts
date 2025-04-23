// utils/api.ts

export async function getData(url: string, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn(`[getData] No token provided for ${url}`);
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("Failed to parse JSON response");
  }

  if (!res.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[getData] ${url} failed:`, json);
    }
    throw new Error(json.error || `GET request failed with status ${res.status}`);
  }

  return json;
}

export async function postData(url: string, data: any, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn(`[postData] No token provided for ${url}`);
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("Failed to parse JSON response");
  }

  if (!res.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[postData] ${url} failed:`, json);
    }
    throw new Error(json.error || `POST request failed with status ${res.status}`);
  }

  return json;
}
