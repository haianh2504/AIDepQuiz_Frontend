"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const questionStatementRef = useRef<HTMLParagraphElement>(null);
  const shouldFocusQuestionRef = useRef(false);
  const isAdvancingRef = useRef(false);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (shouldFocusQuestionRef.current) {
      shouldFocusQuestionRef.current = false;
      questionStatementRef.current?.focus();
    }
  }, [currentIndex]);

  useEffect(() => () => {
    if (autoAdvanceTimerRef.current !== null) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
  }, []);

  const currentQuestion = definition?.questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.questionId] : undefined;
  const finalQuestion = definition?.questions[definition.questions.length - 1];
  const isFinalQuestionAnswered = finalQuestion !== undefined && answers[finalQuestion.questionId] !== undefined;
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === (definition?.questions.length ?? 0) - 1;
  const quizSteps = useMemo(() => {
    if (!definition) {
      return [];
    }

    return definition.questions.reduce<Array<{ key: string; label: string }>>((steps, question) => {
      if (!steps.some((step) => step.key === question.subscale)) {
        steps.push({ key: question.subscale, label: question.subscaleLabel });
      }

      return steps;
    }, []);
  }, [definition]);

  const currentStepIndex = currentQuestion
    ? quizSteps.findIndex((step) => step.key === currentQuestion.subscale)
    : -1;
  const currentStepQuestions = currentQuestion && definition
    ? definition.questions.filter((question) => question.subscale === currentQuestion.subscale)
    : [];
  const currentStepCompletedCount = currentStepQuestions.reduce((count, question, index) => {
    if (count !== index || answers[question.questionId] === undefined) {
      return count;
    }

    return count + 1;
  }, 0);
  const currentStepProgress = currentStepQuestions.length
    ? (currentStepCompletedCount / currentStepQuestions.length) * 100
    : 0;

  const subscaleTitle = useMemo(() => {
    if (!currentQuestion) {
      return "";
    }

    return currentQuestion.subscaleLabel;
  }, [currentQuestion]);

  const selectAnswer = (value: number) => {
    if (!currentQuestion || isSubmitting || isAdvancingRef.current) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.questionId]: value,
    }));

    if (definition && !isLastQuestion) {
      isAdvancingRef.current = true;
      setIsAdvancing(true);

      const advanceToNextQuestion = () => {
        autoAdvanceTimerRef.current = null;
        shouldFocusQuestionRef.current = true;
        isAdvancingRef.current = false;
        setIsAdvancing(false);
        setCurrentIndex((index) => Math.min(index + 1, definition.questionCount - 1));
      };

      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
      if (delay === 0) {
        advanceToNextQuestion();
      } else {
        autoAdvanceTimerRef.current = setTimeout(advanceToNextQuestion, delay);
      }
    }
  };

  const goToPreviousQuestion = () => {
    shouldFocusQuestionRef.current = true;
    setCurrentIndex((index) => Math.max(0, index - 1));
  };

  const goToNextQuestion = () => {
    if (
      !definition ||
      isLastQuestion ||
      currentAnswer === undefined ||
      isSubmitting ||
      isAdvancing
    ) {
      return;
    }

    shouldFocusQuestionRef.current = true;
    setCurrentIndex((index) => Math.min(index + 1, definition.questionCount - 1));
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
          <nav className="quiz-step-tracker" aria-label="Tiến trình bài test">
            <ol className="quiz-step-list" style={{ gridTemplateColumns: `repeat(${quizSteps.length}, minmax(0, 1fr))` }}>
              {quizSteps.map((step, index) => {
                const isCurrentStep = index === currentStepIndex;
                const isCompletedFinalStep = step.key === finalQuestion?.subscale && isFinalQuestionAnswered;
                const state = index < currentStepIndex || isCompletedFinalStep
                  ? "completed"
                  : isCurrentStep
                    ? "current"
                    : "upcoming";
                const statusLabel = state === "completed" ? "đã hoàn thành" : state === "current" ? "đang thực hiện" : "chưa thực hiện";
                const connectorProgress = state === "completed" ? 100 : state === "current" ? currentStepProgress : 0;

                return (
                  <li
                    className={`quiz-step is-${state}`}
                    key={step.key}
                    aria-current={isCurrentStep ? "step" : undefined}
                    aria-label={`Bước ${index + 1}: ${step.label}, ${statusLabel}`}
                  >
                    {index < quizSteps.length - 1 ? (
                      <span className="quiz-step-connector" aria-hidden="true">
                        <span style={{ width: `${connectorProgress}%` }} />
                      </span>
                    ) : null}
                    <span className="quiz-step-marker" aria-hidden="true">
                      {state === "completed" ? (
                        <svg viewBox="0 0 20 20" focusable="false">
                          <path d="m4 10.5 4 4 8-9" />
                        </svg>
                      ) : state === "current" ? (
                        <span className="quiz-step-current-dot" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    {isCurrentStep ? (
                      <span className="quiz-step-tooltip" aria-hidden="true">
                        <span>Bước {index + 1}</span>
                        <strong>{step.label}</strong>
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        </section>

        <section className="question-section" aria-labelledby="question-title">
          <p id="question-title" ref={questionStatementRef} tabIndex={-1} className="question-statement">
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
                  disabled={isSubmitting || isAdvancing}
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
              disabled={currentIndex === 0 || isSubmitting || isAdvancing}
              onClick={goToPreviousQuestion}
            >
              Trước
            </button>
            {isLastQuestion ? (
              <button
                className="button button-dark button-navigation"
                type="button"
                disabled={currentAnswer === undefined || isSubmitting}
                onClick={() => void submit()}
              >
                {isSubmitting ? "Đang gửi…" : "Hoàn thành"}
              </button>
            ) : (
              <button
                className="button button-dark button-navigation"
                type="button"
                disabled={currentAnswer === undefined || isSubmitting || isAdvancing}
                onClick={goToNextQuestion}
              >
                Tiếp
              </button>
            )}
          </div>
        </section>

        {error ? <p className="inline-error" role="alert">{error}</p> : null}

        <p className="quiz-note">Lưu ý: Hãy trả lời dựa trên thói quen thực tế của bạn.</p>
      </div>
    </main>
  );
}

