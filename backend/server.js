import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const jobs = [
  {
    id: 1,
    title: "iOS Developer",
    company: "Nooro",
    location: "USA",
    type: "Full-time",
    category: "Engineering",
    salary: "$60k-$130k",
    description:
      "We are looking for an iOS Developer to build clean mobile experiences and work with modern development tools.",
    tags: ["api", "backend", "git", "ios", "security"],
  },
  {
    id: 2,
    title: "Senior DevOps Engineer",
    company: "Lemon.io",
    location: "Remote",
    type: "Full-time",
    category: "Engineering",
    salary: "$80k-$150k",
    description:
      "We are looking for a DevOps Engineer to manage cloud infrastructure, CI/CD pipelines, and deployment workflows.",
    tags: [".Net", "android", "AWS", "azure", "C"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "HireFlow",
    location: "Nairobi",
    type: "Full-time",
    category: "Development",
    salary: "$40k-$90k",
    description:
      "Build responsive React interfaces and improve the user experience for a modern hiring platform.",
    tags: ["react", "javascript", "css", "vite"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    category: "Design",
    salary: "$30k-$70k",
    description:
      "Create clean layouts, user flows, wireframes, and visual designs for web applications.",
    tags: ["figma", "ux", "ui", "design"],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "GrowthLab",
    location: "Hybrid",
    type: "Part-time",
    category: "Marketing",
    salary: "$25k-$60k",
    description:
      "Support campaigns, content strategy, social media, and growth marketing experiments.",
    tags: ["seo", "content", "social", "ads"],
  },
  {
    id: 6,
    title: "Finance Assistant",
    company: "CapitalWorks",
    location: "Nairobi",
    type: "Full-time",
    category: "Finance",
    salary: "$35k-$75k",
    description:
      "Assist with finance operations, reporting, invoices, budgeting, and account management.",
    tags: ["finance", "excel", "reporting", "budget"],
  },
  {
    id: 7,
    title: "Product Manager",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    category: "Management",
    salary: "$70k-$140k",
    description:
      "Lead product planning, roadmap decisions, customer research, and team coordination.",
    tags: ["product", "strategy", "roadmap", "management"],
  },
  {
    id: 8,
    title: "Digital Content Creator",
    company: "MediaFlow",
    location: "Remote",
    type: "Contract",
    category: "Digital",
    salary: "$20k-$55k",
    description:
      "Create digital content for websites, campaigns, social media, and brand storytelling.",
    tags: ["content", "video", "digital", "brand"],
  },
];

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "HireFlow backend API is running",
  });
});

app.get("/api/jobs", (req, res) => {
  const { search = "", category = "All", type = "All" } = req.query;

  const normalizedSearch = String(search).toLowerCase().trim();
  const normalizedCategory = String(category).toLowerCase().trim();
  const normalizedType = String(type).toLowerCase().trim();

  let filteredJobs = jobs;

  if (normalizedSearch) {
    filteredJobs = filteredJobs.filter((job) => {
      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.type,
        job.category,
        job.salary,
        job.description,
        ...(job.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }

  if (normalizedCategory && normalizedCategory !== "all") {
    filteredJobs = filteredJobs.filter(
      (job) => job.category.toLowerCase() === normalizedCategory
    );
  }

  if (normalizedType && normalizedType !== "all") {
    filteredJobs = filteredJobs.filter(
      (job) => job.type.toLowerCase() === normalizedType
    );
  }

  res.json({
    status: "success",
    count: filteredJobs.length,
    data: filteredJobs,
  });
});

app.get("/api/jobs/categories", (req, res) => {
  const categories = ["All", ...new Set(jobs.map((job) => job.category))];

  res.json({
    status: "success",
    data: categories,
  });
});

app.get("/api/jobs/:id", (req, res) => {
  const jobId = Number(req.params.id);
  const job = jobs.find((item) => item.id === jobId);

  if (!job) {
    return res.status(404).json({
      status: "error",
      message: "Job not found",
    });
  }

  return res.json({
    status: "success",
    data: job,
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`HireFlow backend running on http://localhost:${PORT}`);
});
