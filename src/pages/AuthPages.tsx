import { useState } from "react";

function Section({ title, children }: any) {
  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800 }}>{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LoginPage({ onNavigate }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || data?.message || "Login failed");
        setLoading(false);
        return;
      }

      // Store token and user
      if (data.token) localStorage.setItem("authToken", data.token);
      if (data.user) localStorage.setItem("authUser", JSON.stringify(data.user));

      setMessage("✓ Logged in");
      setTimeout(() => onNavigate("home"), 600);
    } catch (err: any) {
      setMessage(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Log in to HireFlow">
      <div style={{ maxWidth: 520, margin: "0 auto", background: "var(--surface)", padding: 28, borderRadius: 12 }}>
        {message && <div style={{ marginBottom: 12 }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: "100%", height: 44, padding: "0 12px" }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{ width: "100%", height: 44, padding: "0 12px" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--primary" type="submit" style={{ flex: 1 }}>{loading ? "Logging in..." : "Login"}</button>
            <button type="button" className="btn btn--outline" onClick={() => onNavigate("register")}>Sign up</button>
          </div>
        </form>
      </div>
    </Section>
  );
}

export function RegisterPage({ onNavigate }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: "employer" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || data?.message || "Register failed");
        setLoading(false);
        return;
      }

      if (data.token) localStorage.setItem("authToken", data.token);
      if (data.user) localStorage.setItem("authUser", JSON.stringify(data.user));

      setMessage("✓ Account created");
      setTimeout(() => onNavigate("home"), 600);
    } catch (err: any) {
      setMessage(err.message || "Register error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Create an employer account">
      <div style={{ maxWidth: 520, margin: "0 auto", background: "var(--surface)", padding: 28, borderRadius: 12 }}>
        {message && <div style={{ marginBottom: 12 }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Company / Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", height: 44, padding: "0 12px" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: "100%", height: 44, padding: "0 12px" }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{ width: "100%", height: 44, padding: "0 12px" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--primary" type="submit" style={{ flex: 1 }}>{loading ? "Creating..." : "Create account"}</button>
            <button type="button" className="btn btn--outline" onClick={() => onNavigate("login")}>Login</button>
          </div>
        </form>
      </div>
    </Section>
  );
}

export default null;
