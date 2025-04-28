// utils/api.ts

export async function getData(url: string, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: 'no-store' // Disable caching to always get fresh data
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`[getData] ${url} response status:`, res.status);
    }

    const text = await res.text();
    
    if (process.env.NODE_ENV === "development") {
      console.log(`[getData] ${url} raw response:`, text);
    }

    // Handle empty response
    if (!text) {
      console.error(`[getData] ${url} returned empty response`);
      return null;
    }

    try {
      const json = JSON.parse(text);
      
      if (!res.ok) {
        const error = json.error || `Request failed with status ${res.status}`;
        console.error(`[getData] ${url} failed:`, error);
        throw new Error(error);
      }
      
      return json;
    } catch (e) {
      console.error(`[getData] Failed to parse JSON response:`, e);
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    console.error(`[getData] ${url} request failed:`, error);
    throw error;
  }
}

export async function postData(url: string, data: any, token?: string) {
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
    
    // Handle empty response
    if (!text) {
      console.error(`[postData] ${url} returned empty response`);
      return null;
    }

    try {
      const json = JSON.parse(text);
      
      if (!res.ok) {
        const error = json.error || `Request failed with status ${res.status}`;
        console.error(`[postData] ${url} failed:`, error);
        throw new Error(error);
      }
      
      return json;
    } catch (e) {
      console.error(`[postData] Failed to parse JSON response:`, e);
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    console.error(`[postData] ${url} request failed:`, error);
    throw error;
  }
}
