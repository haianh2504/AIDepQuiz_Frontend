"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResultSession } from "@/components/result/ResultSessionProvider";

export function ResultPage() {
  const router = useRouter();
  const { result, clearResult } = useResultSession();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (!result) {
      router.replace("/");
    }
  }, [result, router]);

  if (!result) {
    return (
      <main className="result-page state-page">
        <p role="status">Đang kiểm tra kết quả…</p>
      </main>
    );
  }

  const retryQuiz = () => {
    clearResult();
    router.push("/quiz");
  };

  return (
    <main className="result-page">
      <div className="result-shell">
        <header className="result-intro">
          <h1 className="display-heading">Kết quả tự đánh giá</h1>
          <p className="result-description">
            Kết quả dưới đây giúp bạn nhìn lại thói quen sử dụng AI của mình. Đây không
            phải là chẩn đoán hay đánh giá năng lực.
          </p>
        </header>

        <section className="result-overview" aria-labelledby="result-overview-title">
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

          <div className="result-detail">
            <h2 id="result-overview-title" className="subsection-title">
              1. Kết quả theo từng khía cạnh
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
          </div>
        </section>

        <section className="result-content-grid">
          <div className="result-actions">
            <button className="button button-outline" type="button" onClick={() => setIsConfirmOpen(true)}>
              Làm lại bài tự đánh giá
            </button>
            <Link className="button button-dark" href="/">
              Quay về trang chủ
            </Link>
          </div>

          <div className="result-copy">
            <section aria-labelledby="feedback-title">
              <h2 id="feedback-title" className="subsection-title">2. Nhận xét chung:</h2>
              <p>{result.feedback}</p>
            </section>

            <section aria-labelledby="advice-title">
              <h2 id="advice-title" className="subsection-title">3. Lời khuyên dành cho bạn:</h2>
              <ul className="advice-list">
                {result.advice.map((advice) => <li key={advice}>{advice}</li>)}
              </ul>
            </section>
          </div>
        </section>
      </div>

      {isConfirmOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="retry-title">
            <h2 id="retry-title">Làm lại bài tự đánh giá?</h2>
            <p>Kết quả hiện tại sẽ bị xóa và bạn sẽ bắt đầu lại từ câu đầu tiên.</p>
            <div className="dialog-actions">
              <button className="button button-outline" type="button" onClick={() => setIsConfirmOpen(false)}>
                Hủy
              </button>
              <button className="button button-dark" type="button" onClick={retryQuiz}>
                Làm lại
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
