import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description,
}: Readonly<PlaceholderPageProps>) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <Card className="w-full max-w-xl">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-sm dark:from-gray-600 dark:to-gray-800">
            <svg
              className="h-10 w-10 text-gray-400 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {description && (
            <p className="mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}

          <Alert className="mt-8 flex flex-col gap-3 text-left">
            <div className="flex items-center gap-3">
              <span>🚧</span>
              <AlertTitle>Under Construction</AlertTitle>
            </div>
            <AlertDescription className="mt-1">
              We're building something amazing! This feature is currently in
              development and will be available soon.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
