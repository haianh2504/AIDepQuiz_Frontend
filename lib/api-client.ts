import type {
  ApiErrorPayload,
  QuizDefinitionResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
} from "@/lib/api-types";

const API_ROOT = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1";

export class ApiClientError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let payload: ApiErrorPayload = {};

    try {
      payload = (await response.json()) as ApiErrorPayload;
    } catch {
      // Keep the HTTP status as the fallback when the server has no JSON body.
    }

    throw new ApiClientError(
      payload.error?.message ?? "Không thể xử lý yêu cầu lúc này.",
      response.status,
      payload.error?.code,
    );
  }

  return (await response.json()) as T;
}

export function getAiDependenceTest(): Promise<QuizDefinitionResponse> {
  return request<QuizDefinitionResponse>("/tests/ai-dependence");
}

export function submitAiDependenceTest(
  payload: SubmitQuizRequest,
): Promise<SubmitQuizResponse> {
  return request<SubmitQuizResponse>("/tests/ai-dependence/submit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

