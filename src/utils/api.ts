interface ApiError {
  error?: string;
}

export async function getData<T extends object = Record<string, unknown>>(
  url: string,
  token?: string
): Promise<T | null> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
    const text = await res.text();

    if (!text) {
      console.error(`[getData] ${url} returned empty response`);
      return null;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error(`[getData] Failed to parse JSON response from ${url}`);
      throw new Error("Invalid JSON response");
    }

    if (!res.ok) {
      const errorMsg =
        (parsed as ApiError)?.error ??
        `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return parsed as T;
  } catch (error) {
    console.error(`[getData] ${url} request failed:`, error);
    throw error;
  }
}

export async function postData<
  TResponse extends object = Record<string, unknown>,
  TBody extends Record<string, unknown> = Record<string, unknown>,
>(url: string, data: TBody, token?: string): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const text = await res.text();

    if (!text) {
      throw new Error("Empty response from server");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (!res.ok) {
      const errorMsg =
        typeof parsed === "object" &&
        parsed !== null &&
        "error" in parsed &&
        typeof (parsed as ApiError).error === "string"
          ? (parsed as ApiError).error
          : `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return parsed as TResponse;
  } catch (error) {
    console.error(`[postData] ${url} request failed:`, error);
    throw error;
  }
}
