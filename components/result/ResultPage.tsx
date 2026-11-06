"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResultSession } from "@/components/result/ResultSessionProvider";

export function ResultPage() {
  const router = useRouter();
  const { result, clearResult } = useResultSession();
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!result && !isRetrying) {
      router.replace("/");
    }
  }, [isRetrying, result, router]);

  if (!result) {
    return (
      <main className="result-page state-page">
        <p role="status">Đang kiểm tra kết quả…</p>
      </main>
    );
  }

  const retryQuiz = () => {
    setIsRetrying(true);
    router.push("/quiz");
    clearResult();
  };

  return (
    <main className="result-page">
      <div className={`result-shell${showDetails ? " result-shell-expanded" : ""}`}>
        {!showDetails ? (
          <header className="result-intro">
            <h1 className="display-heading">Kết quả tự đánh giá</h1>
            <p className="result-description">
              Kết quả dưới đây giúp bạn nhìn lại thói quen sử dụng AI của mình. Đây không
              phải là chẩn đoán hay đánh giá năng lực.
            </p>
            <button className="button button-dark result-continue" type="button" onClick={() => setShowDetails(true)}>
              Xem kết quả
            </button>
          </header>
        ) : (
          <div className="result-content-enter">
            <div className="result-layout">
              <aside className="result-sidebar" aria-label="Tóm tắt và thao tác kết quả">
                <div className="score-summary">
                  <div className="score-badge" aria-label={`Điểm trung bình ${result.score.displayMean} trên 5`}>
                    {result.score.displayMean} / 5.00
                  </div>
                  <p className="category-line">
                    <strong>Mức tham khảo:</strong> {result.category.label}
                  </p>
                  <p className="total-score">
                    <strong>Điểm tổng:</strong> {result.score.totalScore} / {result.score.maxTotalScore}
                  </p>
                </div>

                <div className="result-actions">
                  <button className="button button-outline" type="button" onClick={retryQuiz}>
                    Làm lại bài tự đánh giá
                  </button>
                  <Link className="button button-dark" href="/">
                    Quay về trang chủ
                  </Link>
                </div>
              </aside>

              <div className="result-main">
                <section className="result-detail" aria-labelledby="result-overview-title">
                  <h2 id="result-overview-title" className="subsection-title result-section-heading">
                    <span className="result-section-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M4 19.5h16M6.5 16V11m5.5 5V6.5m5.5 9.5v-7" />
                        <path d="M5 11h3v5H5zm5.5-5h3v10h-3zm5.5 3h3v7h-3z" />
                      </svg>
                    </span>
                    <span>1. Kết quả theo từng khía cạnh</span>
                  </h2>
                  <div className="subscale-grid">
                    {result.subscales.map((subscale) => (
                      <article className="subscale-card" key={subscale.key}>
                        <h3>{subscale.label}</h3>
                        <p>{subscale.displayMean} / 5.0</p>
                        <div
                          className="subscale-track"
                          role="progressbar"
                          aria-label={`Điểm ${subscale.label}`}
                          aria-valuemin={1}
                          aria-valuemax={5}
                          aria-valuenow={subscale.mean}
                        >
                          <span className="subscale-fill" style={{ width: `${(subscale.mean / 5) * 100}%` }} />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="result-feedback" aria-labelledby="feedback-title">
                  <h2 id="feedback-title" className="subsection-title result-section-heading">
                    <span className="result-section-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M4 5.5h16v11H9l-5 4v-15Z" />
                        <path d="M8 10h8m-8 3h5" />
                      </svg>
                    </span>
                    <span>2. Nhận xét chung:</span>
                  </h2>
                  <p>{result.feedback}</p>
                </section>

                <section className="result-advice" aria-labelledby="advice-title">
                  <h2 id="advice-title" className="subsection-title result-section-heading">
                    <span className="result-section-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M9 18h6m-5 3h4m-7-7.2a7 7 0 1 1 8.1 0c-.9.6-1.6 1.4-1.8 2.4h-4.4c-.2-1-.9-1.8-1.9-2.4Z" />
                        <path d="M12 3v1.5m7.2 2.3-1.1 1.1M4.9 6.8 6 7.9" />
                      </svg>
                    </span>
                    <span>3. Lời khuyên dành cho bạn:</span>
                  </h2>
                  <ul className="advice-list">
                    {result.advice.map((advice) => <li key={advice}>{advice}</li>)}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
