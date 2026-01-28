# Frontend Context: Engineering Portfolio

> **Purpose**: Comprehensive context document for building the frontend. This covers goals, architecture, API integration, and implementation guidance.

---

## 🎯 Project Goal

Build a **recruiter-friendly engineering portfolio** that showcases:

- Technical versatility (web, embedded, software, 3D)
- Project depth and decision-making
- Professional certifications
- Resume/contact information

**Target Audience**: Recruiters and technical hiring managers

---

## 🛠️ Recommended Stack

| Layer         | Technology                   | Reason                          |
| ------------- | ---------------------------- | ------------------------------- |
| **Framework** | Next.js 15 (App Router)      | SSR for SEO, fast navigation    |
| **Language**  | TypeScript                   | Type safety with backend        |
| **Styling**   | Tailwind CSS                 | Rapid prototyping               |
| **State**     | TanStack Query (React Query) | Server state, caching           |
| **Forms**     | React Hook Form + Zod        | Validation matches backend      |
| **Icons**     | Lucide React                 | Clean, consistent icons         |
| **Animation** | Framer Motion                | Professional micro-interactions |

---

## 📐 Information Architecture

### Public Pages

| Route              | Purpose                                 | Data Source                         |
| ------------------ | --------------------------------------- | ----------------------------------- |
| `/`                | Hero, skills summary, featured projects | `GET /api/projects/featured`        |
| `/projects`        | All projects with filters               | `GET /api/projects?category=&page=` |
| `/projects/[slug]` | Project detail page                     | `GET /api/projects/slug/:slug`      |
| `/certificates`    | Credentials grid/carousel               | `GET /api/certificates`             |
| `/contact`         | Contact form + socials                  | Static + form submission            |

### Protected Pages (Admin)

| Route                       | Purpose              |
| --------------------------- | -------------------- |
| `/admin`                    | Dashboard overview   |
| `/admin/login`              | Admin authentication |
| `/admin/projects`           | CRUD projects        |
| `/admin/projects/new`       | Create project form  |
| `/admin/projects/[id]/edit` | Edit project form    |
| `/admin/certificates`       | CRUD certificates    |

---

## 🗃️ TypeScript Interfaces

```typescript
// types/project.ts
export interface Project {
	_id: string;
	slug: string;
	title: string;
	summary: string;
	description: string; // Markdown content
	category: "web" | "embedded" | "software" | "3d";
	difficulty: "easy" | "intermediate" | "hard" | "professional";
	techStack: string[];
	githubUrl?: string;
	liveUrl?: string;
	thumbnail?: string;
	images?: string[];
	featured: boolean;
	createdAt: string;
	updatedAt: string;
}

export type ProjectCategory = Project["category"];
export type ProjectDifficulty = Project["difficulty"];

export interface CreateProjectDTO {
	slug: string;
	title: string;
	summary: string;
	description: string;
	category: ProjectCategory;
	difficulty: ProjectDifficulty;
	techStack: string[];
	githubUrl?: string;
	liveUrl?: string;
	thumbnail?: string;
	images?: string[];
	featured?: boolean;
}

export type UpdateProjectDTO = Partial<CreateProjectDTO>;
```

```typescript
// types/certificate.ts
export interface Certificate {
	_id: string;
	title: string;
	issuer: string;
	dateIssued: string;
	credentialId?: string;
	imageUrl?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateCertificateDTO {
	title: string;
	issuer: string;
	dateIssued: string; // ISO date
	credentialId?: string;
	imageUrl?: string;
}

export type UpdateCertificateDTO = Partial<CreateCertificateDTO>;
```

```typescript
// types/api.ts
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
}

export interface User {
	id: string;
	username: string;
}
```

---

## 🔌 API Integration

### Base Configuration

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		credentials: "include", // Required for cookie auth
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw new ApiError(data.message || "Request failed", res.status, data);
	}

	return data;
}

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public data?: any,
	) {
		super(message);
		this.name = "ApiError";
	}
}
```

### API Functions

```typescript
// lib/api/projects.ts
export const projectsApi = {
	getAll: (params?: { category?: string; page?: number; limit?: number }) => {
		const searchParams = new URLSearchParams();
		if (params?.category) searchParams.set("category", params.category);
		if (params?.page) searchParams.set("page", String(params.page));
		if (params?.limit) searchParams.set("limit", String(params.limit));

		const query = searchParams.toString();
		return api<PaginatedResponse<Project>>(`/api/projects${query ? `?${query}` : ""}`);
	},

	getFeatured: () => api<ApiResponse<Project[]>>("/api/projects/featured"),

	getBySlug: (slug: string) => api<ApiResponse<Project>>(`/api/projects/slug/${slug}`),

	create: (data: CreateProjectDTO) =>
		api<ApiResponse<Project>>("/api/projects", {
			method: "POST",
			body: JSON.stringify(data),
		}),

	update: (id: string, data: UpdateProjectDTO) =>
		api<ApiResponse<Project>>(`/api/projects/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	delete: (id: string) => api<ApiResponse<null>>(`/api/projects/${id}`, { method: "DELETE" }),
};
```

```typescript
// lib/api/auth.ts
export const authApi = {
	login: (credentials: { username: string; password: string }) =>
		api<ApiResponse<{ user: User }>>("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(credentials),
		}),

	logout: () => api<ApiResponse<null>>("/api/auth/logout", { method: "POST" }),

	getMe: () => api<ApiResponse<{ user: User }>>("/api/auth/me"),
};
```

```typescript
// lib/api/upload.ts
export const uploadApi = {
	uploadProjectImage: async (file: File) => {
		const formData = new FormData();
		formData.append("image", file);

		const res = await fetch(`${API_BASE}/api/upload/project`, {
			method: "POST",
			credentials: "include",
			body: formData, // No Content-Type header for FormData
		});

		return res.json();
	},
};
```

---

## 🔐 Authentication Flow

### Auth Context

```typescript
// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authApi } from "@/lib/api/auth";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authApi.getMe()
      .then((res) => setUser(res.data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await authApi.login({ username, password });
    setUser(res.data?.user || null);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

---

## 🎨 UI Component Guidelines

### Project Card Structure

```
┌─────────────────────────────────────┐
│ [Thumbnail/GIF]                     │
├─────────────────────────────────────┤
│ Project Name                        │
│ One-liner purpose                   │
│                                     │
│ 🏷️ Web | Intermediate              │
│ ⚙️ [React] [Node] [PostgreSQL]      │
│                                     │
│ [GitHub] [Live Demo]                │
└─────────────────────────────────────┘
```

### Skills Groupings (by domain)

| Domain                 | Skills                                              |
| ---------------------- | --------------------------------------------------- |
| **Web Development**    | React, Next.js, Node, Express, TypeScript, Tailwind |
| **Data & Cloud**       | PostgreSQL, MongoDB, Docker, Cloud Infra            |
| **Systems & Embedded** | C, C++, Linux/Unix, Bash, Embedded Systems          |
| **Design & Tooling**   | Figma, Postman, VS Code, Git                        |

---

## 🎯 Implementation Priorities

### Phase 1: Core Public Pages

1. **Home page** - Hero, skills, featured projects
2. **Projects list** - Filter by category, pagination
3. **Project detail** - Full markdown content
4. **Certificates** - Grid/carousel display

### Phase 2: Admin Dashboard

1. **Login page** - Simple auth form
2. **Projects CRUD** - Table + forms
3. **Certificates CRUD** - Table + forms
4. **Image uploads** - Drag & drop

### Phase 3: Polish

1. **Responsive design** - Mobile-first
2. **Animations** - Page transitions, hover effects
3. **SEO** - Meta tags, Open Graph
4. **Resume download** - PDF link in navbar

---

## 🌐 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000

# Production
NEXT_PUBLIC_API_URL=https://mhd-dev-api.up.railway.app
```

---

## 📝 Quick Reference

### Backend API Summary

| Action             | Method | Endpoint                   | Auth |
| ------------------ | ------ | -------------------------- | ---- |
| Get all projects   | GET    | `/api/projects`            | ❌   |
| Get featured       | GET    | `/api/projects/featured`   | ❌   |
| Get by slug        | GET    | `/api/projects/slug/:slug` | ❌   |
| Create project     | POST   | `/api/projects`            | ✅   |
| Update project     | PUT    | `/api/projects/:id`        | ✅   |
| Delete project     | DELETE | `/api/projects/:id`        | ✅   |
| Get certificates   | GET    | `/api/certificates`        | ❌   |
| Create certificate | POST   | `/api/certificates`        | ✅   |
| Update certificate | PUT    | `/api/certificates/:id`    | ✅   |
| Delete certificate | DELETE | `/api/certificates/:id`    | ✅   |
| Upload image       | POST   | `/api/upload/project`      | ✅   |
| Login              | POST   | `/api/auth/login`          | ❌   |
| Logout             | POST   | `/api/auth/logout`         | ✅   |
| Get me             | GET    | `/api/auth/me`             | ✅   |

### Enum Values

```typescript
const CATEGORIES = ["web", "embedded", "software", "3d"] as const;
const DIFFICULTIES = ["easy", "intermediate", "hard", "professional"] as const;
```

### Important Notes

1. **CORS**: Add your frontend origin to backend's `ALLOWED_ORIGINS` env var
2. **Cookies**: Always use `credentials: "include"` for authenticated requests
3. **Validation**: Use same Zod schemas as backend for client-side validation
4. **Images**: Upload to Cloudinary first, then use returned URL in create/update
5. **Markdown**: `description` field supports markdown - use `react-markdown`

---

## 🚀 Quick Start Commands

```bash
# Create Next.js project
npx create-next-app@latest engineering-portfolio-fe --typescript --tailwind --app --src-dir

# Install dependencies
npm install @tanstack/react-query react-hook-form @hookform/resolvers zod lucide-react framer-motion react-markdown

# Start development
npm run dev
```

---

**Backend Repo**: engineering-portfolio-be  
**Production API**: https://mhd-dev-api.up.railway.app  
**API Docs**: https://mhd-dev-api.up.railway.app/api-docs
