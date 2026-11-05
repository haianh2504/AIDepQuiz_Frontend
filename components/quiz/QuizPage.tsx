"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiClientError, getAiDependenceTest, submitAiDependenceTest } from "@/lib/api-client";
import type { QuizDefinitionResponse } from "@/lib/api-types";
import { useResultSession } from "@/components/result/ResultSessionProvider";

function getErrorMessage(error: unknown) {
  if (error instanceof ApiClientError) {
    if (error.status === 422) {
      return "Một hoặc nhiều câu trả lời chưa hợp lệ. Vui lòng kiểm tra lại bài làm.";
    }

    if (error.status >= 500) {
      return "Hệ thống tạm thời chưa thể xử lý bài làm. Vui lòng thử lại sau.";
    }
  }

  return "Không thể tải bài test lúc này. Vui lòng thử lại.";
}

export function QuizPage() {
  const router = useRouter();
  const { setResult } = useResultSession();
  const [definition, setDefinition] = useState<QuizDefinitionResponse | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuiz = () => {
    setIsLoading(true);
    setError(null);

    getAiDependenceTest()
      .then((response) => setDefinition(response))
      .catch((requestError: unknown) => setError(getErrorMessage(requestError)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let isActive = true;

    getAiDependenceTest()
      .then((response) => {
        if (isActive) {
          setDefinition(response);
        }
      })
      .catch((requestError: unknown) => {
        if (isActive) {
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const currentQuestion = definition?.questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.questionId] : undefined;
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === (definition?.questions.length ?? 0) - 1;
  const progress = definition ? (answeredCount / definition.questionCount) * 100 : 0;

  const subscaleTitle = useMemo(() => {
    if (!currentQuestion) {
      return "";
    }

    return currentQuestion.subscaleLabel;
  }, [currentQuestion]);

  const selectAnswer = (value: number) => {
    if (!currentQuestion || isSubmitting) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.questionId]: value,
    }));
  };

  const submit = async () => {
    if (!definition || answeredCount !== definition.questionCount) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitAiDependenceTest({
        testVersion: definition.testVersion,
        answers: definition.questions.map((question) => ({
          questionId: question.questionId,
          value: answers[question.questionId],
        })),
      });

      setResult(response);
      router.push("/result_quiz");
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError));
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="quiz-page state-page">
        <p role="status">Đang tải bài test…</p>
      </main>
    );
  }

  if (error && !definition) {
    return (
      <main className="quiz-page state-page">
        <div className="state-card" role="alert">
          <p>{error}</p>
          <button className="button button-dark" type="button" onClick={loadQuiz}>
            Thử lại
          </button>
        </div>
      </main>
    );
  }

  if (!definition || !currentQuestion) {
    return null;
  }

  return (
    <main className="quiz-page">
      <div className="quiz-shell">
        <section className="quiz-heading" aria-labelledby="quiz-subscale-title">
          <h1 id="quiz-subscale-title" key={currentQuestion.subscale} className="quiz-group-title">
            {subscaleTitle}
          </h1>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Tiến trình bài test"
            aria-valuemin={0}
            aria-valuemax={definition.questionCount}
            aria-valuenow={answeredCount}
          >
            <span className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="question-section" aria-labelledby="question-title">
          <p id="question-title" className="question-statement">
            <strong>Câu {currentQuestion.questionNumber}:</strong> {currentQuestion.text}
          </p>

          <div className="option-list" role="radiogroup" aria-label="Các lựa chọn trả lời">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer === option.value;

              return (
                <button
                  className={`quiz-option${isSelected ? " is-selected" : ""}`}
                  key={option.optionId}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectAnswer(option.value)}
                  disabled={isSubmitting}
                >
                  <strong>{option.value}.</strong> {option.text}
                </button>
              );
            })}
          </div>
        </section>

        <section className="quiz-footer" aria-label="Điều hướng bài test">
          <p className="question-count">
            {currentQuestion.questionNumber}/{definition.questionCount}
          </p>
          <div className="quiz-actions">
            <button
              className="button button-dark button-navigation"
              type="button"
              disabled={currentIndex === 0 || isSubmitting}
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            >
              Sau
            </button>
            <button
              className="button button-dark button-navigation"
              type="button"
              disabled={currentAnswer === undefined || isSubmitting}
              onClick={() => {
                if (isLastQuestion) {
                  void submit();
                } else {
                  setCurrentIndex((index) => Math.min(definition.questionCount - 1, index + 1));
                }
              }}
            >
              {isSubmitting ? "Đang gửi…" : isLastQuestion ? "Hoàn thành" : "Tiếp"}
            </button>
          </div>
        </section>

        {error ? <p className="inline-error" role="alert">{error}</p> : null}

        <p className="quiz-note">Lưu ý: Hãy trả lời dựa trên thói quen thực tế của bạn.</p>
      </div>
    </main>
  );
}

