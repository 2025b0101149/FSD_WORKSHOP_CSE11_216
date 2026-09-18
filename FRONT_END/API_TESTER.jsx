import { useState } from "react";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

function tryParseJson(value, fallback) {
  if (!value || !value.trim()) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export default function APITester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [headers, setHeaders] = useState('{"Content-Type":"application/json"}');
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const parsedHeaders = tryParseJson(headers, {});
      const requestOptions = {
        method,
        headers: parsedHeaders,
      };

      if (method !== "GET" && method !== "HEAD" && body.trim()) {
        const parsedBody = tryParseJson(body, body);
        requestOptions.body = typeof parsedBody === "string" ? parsedBody : JSON.stringify(parsedBody, null, 2);

        if (!Object.keys(parsedHeaders).some((key) => key.toLowerCase() === "content-type")) {
          requestOptions.headers = {
            ...parsedHeaders,
            "Content-Type": "application/json",
          };
        }
      }

      const result = await fetch(url, requestOptions);
      const contentType = result.headers.get("content-type") || "";
      const text = await result.text();

      let responseData = text;
      if (contentType.includes("application/json") && text) {
        try {
          responseData = JSON.parse(text);
        } catch {
          responseData = text;
        }
      }

      setResponse({
        status: result.status,
        statusText: result.statusText,
        data: responseData,
      });
    } catch (requestError) {
      setError(requestError.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="api-dashboard" id="api-tester">
      <div className="dashboard-header">
        <div>
          <p className="tag">API DASHBOARD</p>
          <h2>Request Builder</h2>
        </div>
        <button className="ghost-btn" type="button">
          New Request
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Method</span>
          <strong>{method}</strong>
        </div>
        <div className="stat-card">
          <span>Status</span>
          <strong>{response ? response.status : "--"}</strong>
        </div>
        <div className="stat-card">
          <span>Latency</span>
          <strong>{loading ? "..." : "Fast"}</strong>
        </div>
      </div>

      <form className="request-panel" onSubmit={handleSubmit}>
        <div className="method-row">
          {METHODS.map((item) => (
            <button
              key={item}
              type="button"
              className={method === item ? "method-btn active" : "method-btn"}
              onClick={() => setMethod(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="url-row">
          <input
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://api.example.com/users"
            required
          />
          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>

        <div className="editor-grid">
          <label className="field-group">
            <span>Headers</span>
            <textarea
              rows="6"
              value={headers}
              onChange={(event) => setHeaders(event.target.value)}
            />
          </label>

          <label className="field-group">
            <span>Body</span>
            <textarea
              rows="6"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={`{\n  "title": "hello"\n}`}
            />
          </label>
        </div>
      </form>

      <div className="response-panel">
        <div className="response-header">
          <h3>Response</h3>
          {response && (
            <span className="status-pill">
              {response.status} {response.statusText}
            </span>
          )}
        </div>

        {error ? (
          <div className="alert error">{error}</div>
        ) : response ? (
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        ) : (
          <div className="empty-state">No response yet. Send a request to inspect the API output.</div>
        )}
      </div>
    </section>
  );
}