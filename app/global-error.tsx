"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error;
}

export default function GlobalError({ error }: GlobalErrorProps): JSX.Element {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={(error as any).statusCode || 500} />
      </body>
    </html>
  );
}
    