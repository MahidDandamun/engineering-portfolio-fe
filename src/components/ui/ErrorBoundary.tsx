"use client";

import { Component, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onReset?: () => void;
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

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
		this.props.onReset?.();
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return <DefaultErrorFallback error={this.state.error} reset={this.handleReset} />;
		}

		return this.props.children;
	}
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
	return (
		<div className="flex min-h-100 items-center justify-center p-8">
			<div className="max-w-md text-center">
				<div className="mb-6 flex justify-center">
					<div
						className="rounded-full bg-linear-to-r from-red-500 to-rose-500 p-4 shadow-lg shadow-red-500/25 
            dark:from-red-600 dark:to-rose-600"
					>
						<AlertCircle className="h-8 w-8 text-white" />
					</div>
				</div>

				<h2
					className="mb-3 text-2xl font-bold 
          text-[#2d3436] dark:text-white"
				>
					Something went wrong
				</h2>

				<p
					className="mb-6 text-base 
          text-[#636e72] dark:text-gray-400"
				>
					{error?.message || "An unexpected error occurred. Please try again."}
				</p>

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Button onClick={reset} variant="primary">
						Try Again
					</Button>
					<Button onClick={() => window.location.reload()} variant="outline">
						Reload Page
					</Button>
				</div>

				{process.env.NODE_ENV === "development" && error && (
					<details className="mt-6 text-left">
						<summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400">
							Error Details
						</summary>
						<pre className="mt-2 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200">
							{error.stack}
						</pre>
					</details>
				)}
			</div>
		</div>
	);
}
