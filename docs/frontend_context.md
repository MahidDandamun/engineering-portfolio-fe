# FRONTEND CONTEXT

## For Client-Side Development

**Inherits from**: ROOT_CONTEXT.md  
**Project**: Engineering Portfolio Frontend  
**Last Updated**: January 29, 2026  
**Review Status**: Complete

---

## 1. FRONTEND ARCHITECTURE

### Application Type

**Chosen**: Hybrid (SSR + SSG + CSR)  
**Framework**: Next.js 16.1.6 with App Router  
**Reason**:

- Server-side rendering for optimal SEO on public pages (`/projects`, `/certificates`)
- Client-side navigation for SPA-like experience
- React Server Components by default with selective client components
- Built-in routing, image optimization, and API routes

### Routing Strategy

**Library**: Next.js App Router (file-based)  
**Pattern**:

- File-system routing with `app/` directory
- Dynamic routes using `[slug]` and `[id]` brackets
- Route groups with `(admin)` for layout isolation
- Nested layouts for admin sections

**Route Structure**:

```
app/
├── page.tsx                         # / (Home)
├── layout.tsx                       # Root layout with providers
├── projects/
│   ├── page.tsx                     # /projects (Public list)
│   └── [slug]/page.tsx              # /projects/[slug] (Detail)
├── certificates/page.tsx            # /certificates
├── contact/page.tsx                 # /contact
└── admin/
    ├── layout.tsx                   # Admin-specific layout
    ├── page.tsx                     # /admin (Dashboard)
    ├── login/
    │   ├── layout.tsx               # Login-specific layout
    │   └── page.tsx                 # /admin/login
    ├── projects/
    │   ├── page.tsx                 # /admin/projects (List)
    │   ├── new/page.tsx             # /admin/projects/new
    │   └── [id]/edit/page.tsx       # /admin/projects/[id]/edit
    └── certificates/page.tsx        # /admin/certificates
```

### State Management

**Global State**:

- **React Context** for cross-cutting concerns (auth, theme)
- **TanStack Query v5.90.20** for server state management
- No traditional state management library (Redux/Zustand) needed

**When to use**:

- **Context**: Authentication state, theme preferences
- **TanStack Query**: All API data (projects, certificates, user profile)
- **useState**: Component-local UI state (modals, forms, dropdowns)

---

## 2. COMPONENT ARCHITECTURE

### Component Structure

**Pattern**: Feature-based with UI primitives

```
src/components/
├── ui/              # Reusable UI primitives (Button, Input, Card, Modal, Badge, Skeleton, Select, Textarea)
├── layout/          # Layout components (Navbar, Footer, PageWrapper, Section)
├── home/            # Home page features (Hero, Skills, FeaturedProjects, ContactCTA)
├── projects/        # Project features (ProjectCard, ProjectFilter, ProjectGrid)
├── certificates/    # Certificate features (CertificateCard, CertificateGrid)
└── admin/           # Admin features (AdminSidebar, ProtectedRoute)
```

### Component Pattern

**Standard Component**:

```typescript
"use client"; // Only for client components

import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ComponentNameProps extends ComponentProps<'div'> {
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
}

export function ComponentName({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        "base-classes",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

**Forwarded Ref Component (for UI primitives)**:

```typescript
"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, children, className, disabled, ...props }, ref) => {
    const { isGhibli } = useTheme();

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          "base-button-classes",
          getVariantClasses(variant, isGhibli),
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
```

### Component Naming

**Files**: `PascalCase.tsx` (e.g., `Button.tsx`, `ProjectCard.tsx`)  
**Components**: Always `PascalCase` (e.g., `Button`, `ProjectCard`)  
**Props interfaces**: `ComponentNameProps` (e.g., `ButtonProps`, `ProjectCardProps`)  
**Hooks**: `use` prefix (e.g., `useProjects`, `useAuth`)

---

## 3. STYLING APPROACH

### CSS Framework/Library

**Library**: Tailwind CSS v4  
**Reason**:

- Utility-first for rapid prototyping
- Built-in responsive design
- Small bundle size with purging
- Excellent IDE autocomplete

### Styling Patterns

**Base Styling with Tailwind**:

```typescript
import { cn } from "@/lib/utils"; // clsx + tailwind-merge

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "rounded-xl border bg-white p-6 shadow-sm",
      "dark:bg-gray-800 dark:border-gray-700",
      className
    )}>
      {children}
    </div>
  );
}
```

**Theme-Aware Styling**:

```typescript
import { useTheme } from "@/context";

export function ThemedComponent() {
  const { isGhibli } = useTheme();

  return (
    <div className={cn(
      "rounded-xl p-6",
      isGhibli
        ? "bg-gradient-to-r from-[#ffeaa7] to-[#fdcb6e] text-[#2d3436]"
        : "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white"
    )}>
      Content
    </div>
  );
}
```

### Theme Configuration

**Unique Dual-Theme System**:

- **Light Mode (Spirited Away)**: Soft, warm colors inspired by Studio Ghibli's Spirited Away
    - Primary: `#E8A5A5` (Soft coral pink - Chihiro's outfit)
    - Secondary: `#8B9D83` (Sage green - natural, calming)
    - Accent: `#C17B6C` (Warm terracotta - bathhouse accents)
    - Background: `#F5F0E8` (Soft cream - bathhouse walls)
    - Background Secondary: `#EBF0E4` (Pale sage - natural calm)
    - Text: `#3A3632` (Deep warm gray - readable)
    - Muted Red: `#B85C5C` (Softer red accent)
    - Wood Tones: `#8B6F47` (Warm wood accents)

- **Dark Mode (JJK)**: Purple/blue gradients inspired by Jujutsu Kaisen anime
    - Primary: `#8b5cf6` (Purple)
    - Secondary: `#3b82f6` (Blue)
    - Background: `#0a0a0f` (Deep black)
    - Text: `#ffffff` (White)
    - Borders: `rgba(255, 255, 255, 0.2)` (Transparent white)

**Theme Context**:

```typescript
// src/context/ThemeContext.tsx
const { theme, toggleTheme, isGhibli, isJJK } = useTheme();
// isGhibli = theme === "light"
// isJJK = theme === "dark"
```

### Responsive Design Strategy

**Approach**: Mobile-first  
**Breakpoints** (Tailwind defaults):

- Mobile: `< 640px` (default, no prefix)
- Tablet: `sm: 640px`
- Desktop: `md: 768px`, `lg: 1024px`
- Large Desktop: `xl: 1280px`, `2xl: 1536px`

**Usage**:

```typescript
<div className="w-full sm:w-1/2 lg:w-1/3">
  <div className="p-4 sm:p-6 lg:p-8">
    Responsive Content
  </div>
</div>
```

---

## 4. DATA FETCHING

### HTTP Client

**Library**: Native `fetch` with custom wrapper  
**Configuration**:

```typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public data?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export async function api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const url = /^https?:\/\//i.test(endpoint) ? endpoint : `${API_BASE}${endpoint}`;

	const res = await fetch(url, {
		...options,
		credentials: "include", // Required for cookie-based auth
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
```

### Data Fetching Pattern

**Library**: TanStack Query v5.90.20  
**Cache strategy**:

- **Stale time**: 5 minutes for list queries (projects, certificates)
- **Cache time**: 10 minutes before garbage collection
- **Refetch**: On window focus for critical data
- **Retry**: 3 attempts with exponential backoff

**Query Keys Factory Pattern**:

```typescript
// src/hooks/useProjects.ts
export const projectKeys = {
	all: ["projects"] as const,
	lists: () => [...projectKeys.all, "list"] as const,
	list: (params?: GetProjectsParams) => [...projectKeys.lists(), params] as const,
	featured: () => [...projectKeys.all, "featured"] as const,
	details: () => [...projectKeys.all, "detail"] as const,
	detail: (slug: string) => [...projectKeys.details(), slug] as const,
	byId: (id: string) => [...projectKeys.details(), "id", id] as const,
};

export function useProjects(params?: GetProjectsParams) {
	return useQuery({
		queryKey: projectKeys.list(params),
		queryFn: async () => {
			try {
				return await projectsApi.getAll(params);
			} catch {
				// Fallback to dummy data for development
				return fallbackData;
			}
		},
	});
}
```

**Mutation Pattern**:

```typescript
export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateProjectDTO) => projectsApi.create(data),
		onSuccess: () => {
			// Invalidate all project queries to refetch
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success("Project created successfully");
		},
		onError: (error: ApiError) => {
			toast.error(error.message || "Failed to create project");
		},
	});
}
```

### API Service Layer

**Organization**: Domain-specific API modules

```typescript
// src/lib/projects.ts
export interface GetProjectsParams {
	category?: string;
	difficulty?: string;
	search?: string;
	page?: number;
	limit?: number;
}

export const projectsApi = {
	getAll: (params?: GetProjectsParams) =>
		api<{ data: Project[]; pagination: Pagination }>(`/api/projects${createQueryString(params)}`),

	getFeatured: () => api<{ data: Project[] }>("/api/projects/featured"),

	getBySlug: (slug: string) => api<{ data: Project }>(`/api/projects/${slug}`),

	getById: (id: string) => api<{ data: Project }>(`/api/projects/${id}`),

	create: (data: CreateProjectDTO) =>
		api<{ data: Project }>("/api/projects", {
			method: "POST",
			body: JSON.stringify(data),
		}),

	update: (id: string, data: UpdateProjectDTO) =>
		api<{ data: Project }>(`/api/projects/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	delete: (id: string) => api<{ message: string }>(`/api/projects/${id}`, { method: "DELETE" }),
};
```

**Similar modules**: `src/lib/auth.ts`, `src/lib/certificates.ts`, `src/lib/upload.ts`

---

## 5. FORM HANDLING

### Form Library

**Library**: React Hook Form v7.71.1  
**Version**: 7.71.1  
**Reason**:

- Minimal re-renders (uncontrolled by default)
- Built-in validation
- Excellent TypeScript support
- Small bundle size

### Form Validation

**Library**: Zod v4.3.6  
**Integration**: `@hookform/resolvers` for RHF + Zod integration

**Example Form with Validation**:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum(["web", "embedded", "software", "3d"]),
  difficulty: z.enum(["easy", "intermediate", "hard", "professional"]),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  images: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export function ProjectForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      featured: false,
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await createProject(data);
      toast.success("Project created!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title")}
        error={errors.title?.message}
        label="Title"
      />
      {/* More fields... */}
      <Button type="submit" isLoading={isSubmitting}>
        Create Project
      </Button>
    </form>
  );
}
```

### Form Submission Pattern

**Standard Flow**:

1. User submits form
2. Zod validates on client
3. React Hook Form handles submission
4. TanStack Query mutation sends to API
5. On success: invalidate queries, show toast, navigate
6. On error: show toast with error message

**Server-side validation**: Backend validates again with Zod (shared schemas)

---

## 6. STATE MANAGEMENT

### Global State

**Store for**:

- **Authentication**: Current user, login/logout functions (React Context)
- **Theme**: Current theme, toggle function (React Context)
- **Server Data**: Projects, certificates (TanStack Query cache)

**Don't store**:

- Form state (use React Hook Form)
- UI state like modals, dropdowns (use useState)
- Derived data (compute on-the-fly)

### State Structure

**Auth Context**:

```typescript
// src/context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch current user on mount
  // Login/logout implementations

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
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

**Theme Context**: See section 3 (Styling)

### Local State Guidelines

**Use `useState` for**:

- Modal open/closed state
- Dropdown expanded state
- Form input controlled values (when needed)
- Temporary UI state (loading spinners, tooltips)

**Use TanStack Query for**:

- All API data
- Paginated lists
- Search results
- User profile

**Use React Context for**:

- Cross-cutting concerns (auth, theme)
- Values needed by many components deep in the tree

---

## 7. AUTHENTICATION

### Auth Strategy

**Method**: JWT tokens stored in HTTP-only cookies  
**Storage**: Cookies (server-managed, not accessible via JavaScript)  
**Flow**:

1. User submits login form
2. Backend validates credentials
3. Backend sets HTTP-only cookie with JWT
4. Frontend stores user object in Auth Context
5. All API requests include cookie automatically (`credentials: "include"`)
6. Logout clears cookie on backend

**Cookie Details**:

- Name: `token`
- Flags: `HttpOnly`, `Secure` (production), `SameSite=Strict`
- Expiry: 7 days

### Auth Context/Hook

```typescript
// src/context/AuthContext.tsx
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}

// Usage in components
const { user, isAuthenticated, login, logout, isLoading } = useAuth();

// Login
await login(email, password);

// Logout
await logout();

// Check auth
if (isAuthenticated) {
	// User is logged in
}
```

### Protected Routes

**Component-level Protection**:

```typescript
// src/components/admin/ProtectedRoute.tsx
"use client";

import { useAuth } from "@/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

**Usage in Admin Pages**:

```typescript
// app/admin/projects/page.tsx
import { ProtectedRoute } from "@/components/admin";

export default function AdminProjectsPage() {
  return (
    <ProtectedRoute>
      {/* Admin content */}
    </ProtectedRoute>
  );
}
```

---

## 8. ERROR HANDLING

### Error Boundaries

**Implementation**: Per-page error boundaries for granular error handling

```typescript
// src/components/ui/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";
import { useTheme } from "@/context";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // TODO: Send to error tracking service (Sentry)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback error={this.state.error} reset={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  const { isGhibli } = useTheme();

  return (
    <div className={cn(
      "flex min-h-screen items-center justify-center p-8",
      isGhibli ? "bg-[#fef9f3]" : "bg-[#0a0a0f]"
    )}>
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {error?.message || "An unexpected error occurred"}
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
```

**Usage in Pages**:

```typescript
// app/projects/page.tsx
import { ErrorBoundary } from "@/components/ui";

export default function ProjectsPage() {
  return (
    <ErrorBoundary>
      <ProjectsContent />
    </ErrorBoundary>
  );
}
```

### Error Display Pattern

**Toast Notifications** (using Sonner):

```typescript
import { toast } from "sonner";

// Success
toast.success("Project created successfully!");

// Error
toast.error("Failed to create project");

// Custom
toast("Processing...", {
	description: "This may take a few seconds",
	duration: 3000,
});
```

**Inline Error Messages** (Forms):

```typescript
<Input
  {...register("title")}
  error={errors.title?.message}  // Shows error below input
  label="Project Title"
/>
```

### API Error Handling

**Custom Error Class**:

```typescript
// src/lib/api.ts
export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public data?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ApiError";
	}
}
```

**Usage in Mutations**:

```typescript
const { mutate, isError, error } = useCreateProject();

mutate(data, {
	onSuccess: () => toast.success("Created!"),
	onError: (error: ApiError) => {
		if (error.status === 401) {
			toast.error("Please log in again");
			router.push("/admin/login");
		} else {
			toast.error(error.message || "Something went wrong");
		}
	},
});
```

---

## 9. PERFORMANCE OPTIMIZATION

### Code Splitting

**Strategy**: Route-based (automatic with Next.js App Router)

**Lazy Loading Components**:

```typescript
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

export function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**Dynamic Imports**:

```typescript
// For client-only libraries
import dynamic from "next/dynamic";

const ClientOnlyComponent = dynamic(() => import("./ClientComponent"), {
  ssr: false,
  loading: () => <Loader2 className="animate-spin" />,
});
```

### Rendering Optimization

**Techniques**:

- ✅ Use React Server Components by default (Next.js 16)
- ✅ Use `"use client"` directive only when necessary (hooks, events, browser APIs)
- ✅ Use `React.memo` for expensive pure components
- ✅ Use `useMemo` for expensive calculations
- ✅ Use `useCallback` for event handlers passed to memoized children

**Example Memoization**:

```typescript
import { memo } from "react";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

export const ProjectCard = memo(({ project, onDelete }: ProjectCardProps) => {
  // Expensive rendering logic
  return <Card>...</Card>;
});

ProjectCard.displayName = "ProjectCard";
```

### Image Optimization

**Strategy**: Use Next.js `<Image>` component

```typescript
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video">
      <Image
        src={project.images[0] || "/placeholder.png"}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-lg"
        priority={project.featured} // Preload featured images
      />
    </div>
  );
}
```

**Benefits**:

- Automatic format conversion (WebP, AVIF)
- Lazy loading by default
- Responsive images with `sizes`
- Blur placeholder support

---

## 10. ACCESSIBILITY

### Accessibility Standards

**Target**: WCAG 2.1 Level AA

### Accessibility Checklist

- ✅ All images have alt text
- ✅ Forms have proper labels and error announcements
- ✅ Interactive elements are keyboard accessible (Tab, Enter, Space)
- ✅ Color contrast meets WCAG AA standards (4.5:1 for text)
- ✅ Focus indicators are visible (custom ring styles)
- ✅ Semantic HTML is used (`<nav>`, `<main>`, `<article>`, `<button>`)
- ✅ ARIA labels where needed (`aria-label`, `aria-describedby`)
- ✅ Skip to main content link (for screen readers)
- ⚠️ Form validation errors announced to screen readers (needs improvement)
- ⚠️ Loading states announced (needs `aria-live` regions)

### Accessibility Testing

**Tools**:

- Lighthouse (Chrome DevTools) - Automated accessibility audit
- axe DevTools (Browser extension) - Real-time accessibility checks
- Keyboard testing - Manual Tab/Enter/Space navigation
- Screen reader testing - NVDA (Windows), VoiceOver (Mac)

**Process**:

1. Run Lighthouse audit on each page
2. Fix all critical issues (score target: 90+)
3. Test keyboard navigation on all interactive elements
4. Verify focus indicators are visible

---

## 11. TESTING

### Testing Framework

**Framework**: Vitest v4.0.18  
**Version**: 4.0.18  
**Reason**:

- Fast (ESM native, parallelized)
- Jest-compatible API
- Excellent Vite integration
- Built-in code coverage

### Testing Library

**Library**: React Testing Library v16.3.2  
**Version**: 16.3.2  
**Philosophy**: Test behavior, not implementation

### Test Structure

```
src/__tests__/
├── setup.tsx                    # Test configuration
├── components/
│   ├── Badge.test.tsx
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   ├── Modal.test.tsx
│   └── ProjectCard.test.tsx
├── hooks/
│   ├── useCertificates.test.tsx
│   └── useProjects.test.tsx
├── lib/
│   ├── api.test.ts
│   └── utils.test.ts
└── types/
    └── types.test.ts
```

### Component Testing Pattern

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("shows loading spinner when isLoading is true", () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("from-[#8b5cf6]");

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole("button")).toHaveClass("from-red-600");
  });
});
```

### Hook Testing

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProjects } from "@/hooks/useProjects";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProjects", () => {
  it("fetches projects successfully", async () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

### E2E Testing

**Framework**: Playwright (installed as part of this implementation)  
**Configuration**: `playwright.config.ts` in root  
**Tests**: `e2e/` directory

**Example E2E Test**:

```typescript
import { test, expect } from "@playwright/test";

test("home page loads and shows featured projects", async ({ page }) => {
	await page.goto("/");

	await expect(page.locator("h1")).toContainText("Engineering Portfolio");
	await expect(page.locator('[data-testid="featured-projects"]')).toBeVisible();

	const projectCards = page.locator('[data-testid="project-card"]');
	await expect(projectCards).toHaveCount(3); // Assuming 3 featured
});

test("admin login flow", async ({ page }) => {
	await page.goto("/admin/login");

	await page.fill('input[name="email"]', "admin@example.com");
	await page.fill('input[name="password"]', "password123");
	await page.click('button[type="submit"]');

	await expect(page).toHaveURL("/admin");
	await expect(page.locator("h1")).toContainText("Dashboard");
});
```

---

## 12. TYPE SAFETY

### TypeScript Configuration

**Strict mode**: Enabled  
**Key settings**:

```json
{
	"compilerOptions": {
		"strict": true,
		"noUncheckedIndexedAccess": true,
		"noImplicitReturns": true,
		"noFallthroughCasesInSwitch": true,
		"forceConsistentCasingInFileNames": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"jsx": "preserve",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

### Type Organization

```
src/types/
├── index.ts         # Re-exports all types
├── project.ts       # Project domain types
├── certificate.ts   # Certificate domain types
└── api.ts           # API response types
```

### Type Patterns

**API Response Wrapper**:

```typescript
// src/types/api.ts
export interface ApiResponse<T> {
	data: T;
	message?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}
```

**Domain Types**:

```typescript
// src/types/project.ts
export const CATEGORIES = ["web", "embedded", "software", "3d"] as const;
export const DIFFICULTIES = ["easy", "intermediate", "hard", "professional"] as const;

export type ProjectCategory = (typeof CATEGORIES)[number];
export type ProjectDifficulty = (typeof DIFFICULTIES)[number];

export interface Project {
	_id: string;
	title: string;
	slug: string;
	description: string;
	content: string;
	category: ProjectCategory;
	difficulty: ProjectDifficulty;
	technologies: string[];
	images: string[];
	githubUrl?: string;
	liveUrl?: string;
	featured: boolean;
	startDate: string;
	endDate?: string;
	createdAt: string;
	updatedAt: string;
}

export type CreateProjectDTO = Omit<Project, "_id" | "slug" | "createdAt" | "updatedAt">;
export type UpdateProjectDTO = Partial<CreateProjectDTO>;
```

**Component Props**:

```typescript
// src/components/ui/Button.tsx
import { HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
	variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
	children?: React.ReactNode;
}
```

---

## 13. ENVIRONMENT VARIABLES

### Environment Configuration

**Files**:

- `.env.local` - Local development (not committed)
- `.env.production` - Production values (not committed)
- `.env.example` - Template (committed)

**Required Variables**:

```bash
# API Configuration
# Set your API base URL (do not commit secrets).
NEXT_PUBLIC_API_URL=https://your-api-url.com

# Optional: Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Accessing Environment Variables

**Next.js Pattern**:

```typescript
// Client-side (must have NEXT_PUBLIC_ prefix)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side (no prefix needed)
const secretKey = process.env.API_SECRET_KEY;
```

**Type-Safe Config**:

```typescript
// src/lib/config.ts
export const config = {
	apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
	enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
} as const;

// Usage
import { config } from "@/lib/config";
console.log(config.apiUrl);
```

---

## 14. BUILD & BUNDLING

### Build Tool

**Tool**: Next.js built-in (Turbopack in dev, Webpack in production)  
**Version**: 16.1.6

### Build Configuration

**Next.js Config**:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/YOUR_CLOUD_NAME/**",
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: false, // Fail build on ESLint errors
	},
	typescript: {
		ignoreBuildErrors: false, // Fail build on TypeScript errors
	},
};

export default nextConfig;
```

### Bundle Size Optimization

- ✅ Tree shaking enabled (Next.js default)
- ✅ Code splitting per route (Next.js default)
- ✅ Large dependencies lazy loaded (Framer Motion only on interactive components)
- ✅ Image optimization with next/image
- ✅ Font optimization with next/font
- ⚠️ Bundle analysis needed (add `@next/bundle-analyzer`)

**Build Commands**:

```bash
npm run build       # Production build
npm run start       # Start production server
npm run dev         # Development server
```

---

## 15. SEO & METADATA

### Meta Tags

**Library**: Next.js built-in `metadata` API

**Root Layout Metadata**:

```typescript
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Engineering Portfolio",
		template: "%s | Engineering Portfolio",
	},
	description: "Showcasing web, embedded, software, and 3D projects",
	keywords: ["portfolio", "engineering", "web development", "embedded systems"],
	authors: [{ name: "Your Name" }],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://yoursite.com",
		siteName: "Engineering Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Engineering Portfolio",
		description: "Showcasing engineering projects",
	},
};
```

**Page-specific Metadata**:

```typescript
// app/projects/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const project = await fetchProject(params.slug);

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			images: [project.images[0]],
		},
	};
}
```

### Social Sharing

**Open Graph Tags** (auto-generated from metadata):

- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`

**Twitter Cards** (auto-generated):

- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

---

## 16. INTERNATIONALIZATION (i18n)

### i18n Library

**Library**: None (not enabled)  
**Enabled**: No  
**Reason**: Single-language portfolio (English only)

**Future Implementation** (if needed):

- Use `next-intl` for Next.js App Router
- Create `locales/` directory with JSON files
- Wrap app with `<NextIntlClientProvider>`

---

## 17. ANIMATION & TRANSITIONS

### Animation Library

**Library**: Framer Motion v12.29.2  
**When to use**:

- Button hover/tap effects
- Page transitions
- Modal enter/exit animations
- Stagger effects (project grid loading)

### Animation Patterns

**Button Micro-interactions**:

```typescript
import { motion } from "framer-motion";

<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="..."
>
  Click me
</motion.button>
```

**Page Transitions**:

```typescript
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

**Stagger Children**:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project._id} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## 18. THIRD-PARTY INTEGRATIONS

### Analytics

**Tool**: Not configured (future: Vercel Analytics or Plausible)  
**Implementation**: Add `<Analytics />` component to root layout

### Error Tracking

**Tool**: Not configured (future: Sentry)  
**Implementation**:

```typescript
// src/lib/sentry.ts (future)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	environment: process.env.NODE_ENV,
});
```

### Other Integrations

1. **Cloudinary** (Image hosting)
    - Purpose: Store project images
    - Library: Native fetch for uploads
    - Setup: Upload via admin panel to `https://api.cloudinary.com/v1_1/.../image/upload`

2. **React Markdown** (Content rendering)
    - Purpose: Render project descriptions with Markdown
    - Library: `react-markdown` + `remark-gfm`
    - Usage:

        ```typescript
        import ReactMarkdown from "react-markdown";
        import remarkGfm from "remark-gfm";

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.content}
        </ReactMarkdown>
        ```

---

## 19. DEVELOPMENT WORKFLOW

### Code Formatting

**Formatter**: Prettier (ESLint integrated)  
**Linter**: ESLint v9 with Next.js config  
**Config**:

```javascript
// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

export default eslintConfig;
```

**Scripts**:

```bash
npm run lint         # Check for linting errors
npm run lint -- --fix # Auto-fix linting errors
```

### Git Hooks

**Tool**: Not configured (future: Husky + lint-staged)  
**Recommended Hooks**:

- `pre-commit`: Run `npm run lint` and `npm run test`
- `pre-push`: Run `npm run build` to ensure production build succeeds

### Browser DevTools

**Extensions**:

- React Developer Tools (component tree, props inspection)
- TanStack Query DevTools (query cache, mutations, stale time)
- Redux DevTools (not used, but available if needed)
- axe DevTools (accessibility)

**Usage**:

```typescript
// TanStack Query DevTools (development only)
// Already included in QueryProvider
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## 20. COMMON AI MISTAKES (FRONTEND)

### 1. **Forgetting "use client" directive**

- **What AI does wrong**: Adds hooks (useState, useEffect) to Server Components
- **Correct approach**: Add `"use client";` at the top of files using:
    - React hooks (useState, useEffect, useContext, etc.)
    - Browser APIs (window, localStorage, etc.)
    - Event handlers (onClick, onChange, etc.)

### 2. **Using localStorage directly without checking SSR**

- **What AI does wrong**:
    ```typescript
    const theme = localStorage.getItem("theme"); // Crashes on server
    ```
- **Correct approach**:
    ```typescript
    useEffect(() => {
    	if (typeof window !== "undefined") {
    		const theme = localStorage.getItem("theme");
    	}
    }, []);
    ```

### 3. **Not using Next.js Image component**

- **What AI does wrong**: `<img src="..." />` (no optimization)
- **Correct approach**:
    ```typescript
    import Image from "next/image";
    <Image src="..." alt="..." width={500} height={300} />
    ```

### 4. **Importing wrong router**

- **What AI does wrong**: `import { useRouter } from "next/router";` (Pages Router)
- **Correct approach**: `import { useRouter } from "next/navigation";` (App Router)

### 5. **Not handling loading/error states in queries**

- **What AI does wrong**: `const { data } = useProjects();` (crashes if undefined)
- **Correct approach**:

    ```typescript
    const { data, isLoading, isError, error } = useProjects();

    if (isLoading) return <Skeleton />;
    if (isError) return <ErrorMessage error={error} />;
    return <ProjectGrid projects={data.data} />;
    ```

### 6. **Forgetting to invalidate queries after mutations**

- **What AI does wrong**:
    ```typescript
    const { mutate } = useCreateProject();
    mutate(data); // No cache update
    ```
- **Correct approach**:
    ```typescript
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
    	mutationFn: createProject,
    	onSuccess: () => {
    		queryClient.invalidateQueries({ queryKey: projectKeys.all });
    	},
    });
    ```

### 7. **Not using the `cn` utility for conditional classes**

- **What AI does wrong**:
    ```typescript
    className={`base-class ${isActive ? "active" : ""} ${className}`}
    ```
- **Correct approach**:
    ```typescript
    import { cn } from "@/lib/utils";
    className={cn("base-class", isActive && "active", className)}
    ```

### 8. **Using inline async in event handlers**

- **What AI does wrong**:
    ```typescript
    <button onClick={async () => await createProject()}>Create</button>
    ```
- **Correct approach**:

    ```typescript
    const handleCreate = async () => {
      try {
        await createProject();
        toast.success("Created!");
      } catch (error) {
        toast.error(error.message);
      }
    };

    <button onClick={handleCreate}>Create</button>
    ```

### Specific Library Gotchas

**TanStack Query**:

- ❌ Don't: Forget to wrap app with `<QueryClientProvider>`
- ✅ Do: Wrap in root layout with custom QueryProvider
- ❌ Don't: Use `useQuery` without handling `isLoading` and `isError`
- ✅ Do: Always check states before rendering data

**React Hook Form**:

- ❌ Don't: Use controlled inputs everywhere (defeats the purpose)
- ✅ Do: Use `{...register("fieldName")}` for uncontrolled inputs
- ❌ Don't: Validate on every keystroke (annoying UX)
- ✅ Do: Use `mode: "onBlur"` or `mode: "onSubmit"`

**Framer Motion**:

- ❌ Don't: Animate every element (performance issues)
- ✅ Do: Use sparingly for key interactions (buttons, modals, page transitions)
- ❌ Don't: Forget to add `layout` prop for layout animations
- ✅ Do: Use `motion.div` with `layout` for smooth position changes

**Next.js App Router**:

- ❌ Don't: Use Pages Router APIs (`getStaticProps`, `getServerSideProps`)
- ✅ Do: Use Server Components, `fetch` with caching, or Client Components with TanStack Query
- ❌ Don't: Make entire pages Client Components unnecessarily
- ✅ Do: Keep pages as Server Components, create Client Components for interactive parts

---

## 21. FRONTEND CHECKLIST

### Before Starting Development

- ✅ Component structure decided (feature-based with UI primitives)
- ✅ Styling approach chosen (Tailwind CSS v4)
- ✅ State management strategy defined (Context + TanStack Query)
- ✅ Data fetching pattern established (TanStack Query with query keys)
- ✅ Routing configured (Next.js App Router)

### During Development

- ✅ Components are properly typed (all props have interfaces)
- ✅ All user inputs are validated (Zod schemas)
- ✅ Loading states are handled (Skeleton components)
- ✅ Error states are handled (Error boundaries + toast)
- ✅ Accessibility guidelines followed (semantic HTML, ARIA labels)
- ✅ Responsive design implemented (mobile-first Tailwind)

### Before Deployment

- ✅ All tests passing (Vitest unit tests)
- ⚠️ E2E tests added (Playwright - in progress)
- ✅ No console errors or warnings
- ⚠️ Bundle size optimized (needs bundle analyzer)
- ⚠️ Performance metrics acceptable (needs Lighthouse audit)
- ✅ SEO meta tags added (metadata API)
- ❌ Analytics integrated (future)
- ❌ Error tracking configured (future: Sentry)

---

## 22. COMPONENT LIBRARY

### UI Components

**Library**: Custom (no third-party UI library)  
**Reason**: Full design control for anime-inspired dual-theme system

### Custom Components Inventory

| Component         | Purpose                   | Key Props                      | Example Use                                                       |
| ----------------- | ------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| **Button**        | Primary interaction       | `variant`, `size`, `isLoading` | `<Button variant="primary" size="lg">Submit</Button>`             |
| **Input**         | Text input                | `label`, `error`, `type`       | `<Input label="Email" error={errors.email} />`                    |
| **Textarea**      | Multi-line text           | `label`, `error`, `rows`       | `<Textarea label="Description" rows={5} />`                       |
| **Select**        | Dropdown selection        | `label`, `options`, `error`    | `<Select label="Category" options={categories} />`                |
| **Badge**         | Status/category indicator | `variant`, `size`              | `<Badge variant="success">Published</Badge>`                      |
| **Card**          | Content container         | `className`, `children`        | `<Card><p>Content</p></Card>`                                     |
| **Modal**         | Dialog overlay            | `isOpen`, `onClose`, `title`   | `<Modal isOpen={open} onClose={() => setOpen(false)}>...</Modal>` |
| **Skeleton**      | Loading placeholder       | `className`, `count`           | `<Skeleton className="h-64 w-full" count={3} />`                  |
| **ThemeToggle**   | Theme switcher            | none                           | `<ThemeToggle />`                                                 |
| **ErrorBoundary** | Error catching            | `children`, `fallback`         | `<ErrorBoundary><Page /></ErrorBoundary>`                         |
| **Toaster**       | Toast container           | none                           | `<Toaster position="top-right" />`                                |

### Layout Components

| Component        | Purpose                     | Usage                         |
| ---------------- | --------------------------- | ----------------------------- |
| **Navbar**       | Top navigation              | Auto-included in root layout  |
| **Footer**       | Bottom footer               | Auto-included in root layout  |
| **PageWrapper**  | Page container with padding | Wrap all page content         |
| **Section**      | Semantic section divider    | Group related content         |
| **AdminSidebar** | Admin navigation            | Auto-included in admin layout |

### Feature Components

| Component            | Purpose                     | Location                   |
| -------------------- | --------------------------- | -------------------------- |
| **Hero**             | Home page hero              | `components/home/`         |
| **Skills**           | Skills showcase             | `components/home/`         |
| **FeaturedProjects** | Homepage project grid       | `components/home/`         |
| **ContactCTA**       | Contact call-to-action      | `components/home/`         |
| **ProjectCard**      | Individual project display  | `components/projects/`     |
| **ProjectFilter**    | Category/difficulty filters | `components/projects/`     |
| **ProjectGrid**      | Responsive project grid     | `components/projects/`     |
| **CertificateCard**  | Individual certificate      | `components/certificates/` |
| **CertificateGrid**  | Certificate grid layout     | `components/certificates/` |
| **ProtectedRoute**   | Auth guard for admin        | `components/admin/`        |

---

**Last Updated**: January 29, 2026  
**Review Status**: Complete  
**Next Review**: February 29, 2026 (or after major architecture changes)

---

## APPENDIX: Quick Reference

### Key File Locations

- **API Client**: `src/lib/api.ts`
- **Auth Context**: `src/context/AuthContext.tsx`
- **Theme Context**: `src/context/ThemeContext.tsx`
- **Project Hooks**: `src/hooks/useProjects.ts`
- **Certificate Hooks**: `src/hooks/useCertificates.ts`
- **Type Definitions**: `src/types/`
- **UI Components**: `src/components/ui/`
- **Test Setup**: `src/__tests__/setup.tsx`

### Key Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server

# Testing
npm run test             # Run unit tests (watch mode)
npm run test:run         # Run unit tests (once)
npm run test:coverage    # Generate coverage report
npx playwright test      # Run E2E tests

# Code Quality
npm run lint             # Check linting errors
npm run lint -- --fix    # Auto-fix linting errors
```

### Environment Variables Template

```bash
# .env.local (create this file)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Production
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

### Common Imports

```typescript
// UI Components
import { Button, Input, Modal, Badge, Card } from "@/components/ui";

// Layout
import { PageWrapper, Section } from "@/components/layout";

// Hooks
import { useProjects, useCertificates } from "@/hooks";

// Context
import { useAuth, useTheme } from "@/context";

// Utils
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

// Types
import type { Project, Certificate, ProjectCategory } from "@/types";
```

---

**End of Frontend Context Document**
