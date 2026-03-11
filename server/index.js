import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 5174;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const questions = [
  {
    id: "numpy-slice",
    question: "NumPy: Given a = np.array([[1, 2, 3], [4, 5, 6]]), what does a[:, 1] return?",
    answers: ["[2, 5]", "array([2, 5])", "2 5"],
  },
  {
    id: "python-list-tuple",
    question: "Python: What's the key difference between a list and a tuple?",
  },
  {
    id: "css-grid",
    question: "Web Dev: What does CSS display: grid enable?",
  },
  {
    id: "cpp-stack-heap",
    question: "C++: One-line difference between stack and heap memory?",
  },
  {
    id: "java-jvm",
    question: "Java: What is the purpose of the JVM?",
  },
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "fast-backend" });
});

app.get("/api/questions", (_req, res) => {
  res.json({ items: questions });
});

app.get("/api/news", async (req, res) => {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return res.status(501).json({
      error: "Missing GNEWS_API_KEY",
      items: [],
    });
  }

  const topic = req.query.topic || "technology";
  const max = req.query.max || "3";
  const url = `https://gnews.io/api/v4/top-headlines?topic=${topic}&lang=en&max=${max}&token=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: "News fetch failed", items: [] });
    }
    const data = await response.json();
    const items = (data.articles || []).slice(0, 3).map((item) => ({
      title: item.title,
      desc: item.description || "Read the latest update.",
      url: item.url,
    }));
    res.json({ items });
  } catch (error) {
    res.status(502).json({ error: "News fetch error", items: [] });
  }
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  res.json({
    ok: true,
    received: { name, email, subject: subject || "", message },
    note: "Contact endpoint is wired. Add email or DB integration here.",
  });
});

app.post("/api/query", (req, res) => {
  const { name, email, topic, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }
  res.json({
    ok: true,
    received: { name, email, topic: topic || "General", message },
    note: "Query received. Hook this into email or a CRM.",
  });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ ok: false, error: "Message is required." });
  }
  res.json({
    ok: true,
    reply:
      "Thanks for reaching FAST! Share your email in the query form and we will respond within 48 hours.",
  });
});

app.post("/api/run/python", (_req, res) => {
  res.status(501).json({
    ok: false,
    error: "Python execution not enabled. Add a sandboxed runner on the server.",
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`FAST backend running on http://localhost:${port}`);
});
