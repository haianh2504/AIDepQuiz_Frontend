import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SiteHeader } from "@/components/navigation/SiteHeader";

type AspectIconKind = "emotion" | "function" | "cognition" | "control";

const aspectCards = [
  {
    number: "1",
    icon: "emotion",
    title: "Phụ thuộc về cảm xúc",
    description: "Đo cảm giác bất an, căng thẳng hoặc thiếu tự tin khi không thể sử dụng AI.",
  },
  {
    number: "2",
    icon: "function",
    title: "Phụ thuộc về chức năng",
    description: "Đo mức độ người dùng gặp khó khăn khi hoàn thành nhiệm vụ nếu không có sự hỗ trợ của AI.",
  },
  {
    number: "3",
    icon: "cognition",
    title: "Phụ thuộc về nhận thức",
    description: "Đo xu hướng giao cho AI những hoạt động như suy nghĩ, phân tích, giải quyết vấn đề hoặc ra quyết định.",
  },
  {
    number: "4",
    icon: "control",
    title: "Phụ thuộc về kiểm soát",
    description: "Đo mức độ khó giảm hoặc dừng sử dụng AI ngay cả khi người dùng biết rằng mình không thực sự cần sử dụng công cụ này.",
  },
] as const;

function AspectIcon({ kind }: { kind: AspectIconKind }) {
  return (
    <span className="aspect-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {kind === "emotion" ? (
          <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 5.7a4.8 4.8 0 0 1 8.8 3.1Z" />
        ) : null}
        {kind === "function" ? (
          <>
            <rect x="3.5" y="7.5" width="17" height="12.5" rx="2" />
            <path d="M8 7.5V5h8v2.5M3.5 12h17m-10 0v2h3v-2" />
          </>
        ) : null}
        {kind === "cognition" ? (
          <>
            <path d="M12 4.2v15.6M12 7a3 3 0 0 0-5.8-1.1 3.5 3.5 0 0 0-1.4 6.4 3.4 3.4 0 0 0 2.5 5.8A3 3 0 0 0 12 16" />
            <path d="M12 7a3 3 0 0 1 5.8-1.1 3.5 3.5 0 0 1 1.4 6.4 3.4 3.4 0 0 1-2.5 5.8A3 3 0 0 1 12 16" />
          </>
        ) : null}
        {kind === "control" ? (
          <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M10 8.5v7m4-7v7" />
          </>
        ) : null}
      </svg>
    </span>
  );
}

const likertOptions = [
  "Hoàn toàn không đồng ý",
  "Không đồng ý",
  "Không đồng ý cũng không phản đối",
  "Đồng ý",
  "Hoàn toàn đồng ý",
];

const scoreLevels = [
  { label: "Thấp", range: "1.00–2.33", tone: "low" },
  { label: "Trung bình", range: "2.34–3.66", tone: "moderate" },
  { label: "Cao", range: "3.67–5.00", tone: "high" },
];

export function HomePage() {
  return (
    <div className="site-page home-page">
      <SiteHeader />

      <main id="top">
        <section className="hero-section section-shell" aria-labelledby="hero-title">
          <div className="hero-content">
            <h1 id="hero-title" className="display-heading">
              AI đang hỗ trợ bạn, hay đang suy nghĩ thay bạn?
            </h1>
            <p className="hero-description">
              Bài tự đánh giá gồm 16 câu hỏi giúp bạn nhìn lại mức độ AI đang ảnh hưởng
              đến cách bạn bắt đầu, suy nghĩ và hoàn thành công việc. Kết quả chỉ nhằm
              mục đích tự nhận thức, không phải chẩn đoán tâm lý.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/quiz">
                Bắt đầu tự đánh giá
              </Link>
              <Link className="text-action" href="#academic-basis">
                Xem phương pháp <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider hero-divider" aria-hidden="true" />

        <section id="quiz-info" className="test-overview-section section-shell" aria-labelledby="quiz-info-title">
          <ScrollReveal className="test-overview-intro">
            <h2 id="quiz-info-title" className="section-title">
              Tổng quan về bài test
            </h2>
            <p className="test-overview-lead">
              Khám phá mức độ phụ thuộc vào AI của bạn qua 16 câu hỏi và nhận lời khuyên
              <br className="test-overview-lead-break" />
              để sử dụng công nghệ chủ động, hiệu quả hơn
            </p>
          </ScrollReveal>

          <ScrollReveal className="test-overview-copy">
            <h3>Bài test tập trung vào bốn khía cạnh của sự phụ thuộc vào AI:</h3>
            <p>
              Phụ thuộc vào AI không chỉ được thể hiện qua việc sử dụng AI thường xuyên.
              Bài test xem xét liệu người dùng có đang dựa vào AI để điều chỉnh cảm xúc,
              hoàn thành nhiệm vụ, suy nghĩ hoặc kiểm soát thói quen sử dụng hay không.
            </p>
          </ScrollReveal>

          <div className="aspect-grid">
            {aspectCards.map((card, index) => (
              <ScrollReveal
                as="article"
                className="aspect-card"
                delay={index * 75}
                key={card.title}
              >
                <h3>
                  <AspectIcon kind={card.icon} />
                  <span>
                    Khía cạnh {card.number}: <span>( 4 câu )</span>
                  </span>
                </h3>
                <p className="aspect-card-title">{card.title}</p>
                <p className="aspect-card-description">{card.description}</p>
              </ScrollReveal>
            ))}
          </div>

          <div className="test-overview-divider" aria-hidden="true" />

          <section className="response-guidance" aria-labelledby="response-guidance-title">
            <ScrollReveal className="response-guidance-copy">
              <h3 id="response-guidance-title">Bạn sẽ trả lời như thế nào?</h3>
              <p>
                Bài test gồm 16 phát biểu. Với mỗi phát biểu, hãy chọn mức độ phù hợp
                nhất với bạn dựa trên trải nghiệm trong khoảng thời gian gần đây.
              </p>

              <ol className="likert-list">
                {likertOptions.map((option, index) => (
                  <ScrollReveal
                    as="li"
                    delay={index * 65}
                    key={option}
                  >
                    <span aria-hidden="true">{index + 1}</span>
                    {option}
                  </ScrollReveal>
                ))}
              </ol>
            </ScrollReveal>

            <ScrollReveal
              as="aside"
              className="principles-card"
              delay={120}
              aria-labelledby="principles-title"
            >
              <h3 id="principles-title">3 nguyên tắc:</h3>
              <p>Để có kết quả chính xác nhất</p>
              <div className="principles-panel">
                <ul>
                  <li>Không có câu trả lời đúng hoặc sai.</li>
                  <li>
                    Hãy trả lời theo trải nghiệm thật, không trả lời theo điều bạn nghĩ
                    là “tốt”.
                  </li>
                  <li>Không cần suy nghĩ quá lâu ở mỗi câu hỏi.</li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          <figure className="quiz-demo-figure">
            <Image
              src="/images/quiz-demo-clear.gif"
              alt="Minh họa cách trả lời các câu hỏi trong bài tự đánh giá"
              width={1100}
              height={984}
              unoptimized
            />
          </figure>

          <div
            className="test-overview-divider scoring-guide-divider"
            aria-hidden="true"
          />

          <section className="scoring-guide" aria-labelledby="scoring-guide-title">
            <ScrollReveal className="scoring-guide-heading">
              <h3 id="scoring-guide-title">Cách tính điểm và các mức kết quả</h3>
              <p>
                Điểm được tổng hợp từ những lựa chọn bạn tự báo cáo trong 16 câu hỏi.
              </p>
            </ScrollReveal>

            <div className="scoring-guide-grid">
              <ScrollReveal as="article" className="scoring-card">
                <h4>Thang trả lời</h4>
                <ol className="scoring-scale-list">
                  {likertOptions.map((option, index) => (
                    <li key={option}>
                      <span>{index + 1}</span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>

              <ScrollReveal as="article" className="scoring-card" delay={75}>
                <h4>Công thức tính</h4>
                <dl className="scoring-formulas">
                  <div>
                    <dt>Điểm tổng</dt>
                    <dd>Tổng điểm 16 câu (16–80)</dd>
                  </div>
                  <div>
                    <dt>Điểm trung bình toàn bài</dt>
                    <dd>Điểm tổng ÷ 16 (1.00–5.00)</dd>
                  </div>
                  <div>
                    <dt>Điểm từng khía cạnh</dt>
                    <dd>Tổng điểm 4 câu thuộc khía cạnh ÷ 4</dd>
                  </div>
                </dl>
                <p className="scoring-card-note">
                  Mức kết quả được xác định theo điểm trung bình chưa làm tròn.
                </p>
              </ScrollReveal>

              <ScrollReveal as="article" className="scoring-card" delay={150}>
                <h4>Các mức tham khảo</h4>
                <p className="scoring-level-description">Dựa trên điểm trung bình</p>
                <ul className="scoring-level-list">
                  {scoreLevels.map((level) => (
                    <li key={level.label} data-level={level.tone}>
                      <span>{level.label}</span>
                      <span>{level.range}</span>
                    </li>
                  ))}
                </ul>
                <p className="scoring-card-note">
                  Khoảng điểm tính theo trung bình chưa làm tròn.
                </p>
              </ScrollReveal>
            </div>

            <p className="scoring-disclaimer">
              Đây là bài tự đánh giá dựa trên trải nghiệm của bạn, không có câu trả lời
              đúng hoặc sai. Các mức kết quả hiện là tham khảo giáo dục tạm thời, chưa
              phải ngưỡng chẩn đoán hay kết luận về năng lực cá nhân.
            </p>
          </section>

          <div className="test-overview-divider test-overview-divider-bottom" aria-hidden="true" />
        </section>

        <section id="academic-basis" className="information-section section-shell" aria-labelledby="academic-title">
          <ScrollReveal className="section-heading academic-heading">
            <h2 id="academic-title" className="section-title">
              Bài test được xây dựng dựa trên cơ sở nào?
            </h2>
            <p className="section-description">
              Phần này giới thiệu nghiên cứu gốc AIDep-22 và giải thích AIDepQuiz tham
              khảo nghiên cứu đó như thế nào.
            </p>
          </ScrollReveal>

          <div className="academic-research-grid">
            <ScrollReveal className="aiddep-summary">
              <h3>AIDep-22 là gì?</h3>
              <article className="aiddep-evidence-card">
                <h4>Thang đo và cơ sở học thuật</h4>
                <div>
                  <p>
                    AIDep-22 (AI Dependence Scale) là thang đo gốc gồm 22 câu, được xây
                    dựng và đánh giá trong nghiên cứu về sự phụ thuộc vào AI ở sinh viên
                    đại học Trung Quốc. Thang đo xem xét bốn khía cạnh: phụ thuộc về cảm
                    xúc, chức năng, nhận thức và mất kiểm soát. Nghiên cứu báo cáo kết
                    quả ủng hộ cấu trúc bốn khía cạnh, độ tin cậy và giá trị đo lường của
                    thang gốc; đây là cơ sở để AIDepQuiz tham khảo.
                  </p>
                </div>
              </article>
              <div className="aiddep-research-details">
                <p>
                  <strong>Nhóm tác giả:</strong> Houyu Wu, Haiyang Ni, Wenfu Luo và
                  Tenglong Wu.
                </p>
              </div>
              <div className="research-sample" aria-label="Nghiên cứu AIDep-22 trên hai mẫu riêng biệt, tổng cộng 800 sinh viên đại học Trung Quốc">
                <span>Nghiên cứu gốc: 2 mẫu</span>
                <span>800 sinh viên đại học Trung Quốc</span>
              </div>
              <a
                className="text-action research-link"
                href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1725393/full"
                target="_blank"
                rel="noreferrer"
              >
                Đọc tài liệu nghiên cứu gốc <span aria-hidden="true">→</span>
              </a>
            </ScrollReveal>

            <ScrollReveal className="aidepquiz-development" delay={100}>
              <h3>Sự kế thừa và phát triển riêng của AIDepQuiz</h3>
              <div className="aidepquiz-development-grid">
                <ScrollReveal as="article" className="aidepquiz-development-card">
                  <h4>Kế thừa cách tiếp cận</h4>
                  <div>
                    <p>
                      Tham khảo bốn khía cạnh AIDep-22, thang trả lời 1–5 và cách tổng
                      hợp điểm trung bình. Ngưỡng kết quả AIDepQuiz là quy tắc riêng,
                      khác ngưỡng AIDep-22.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal as="article" className="aidepquiz-development-card" delay={50}>
                  <h4>Phát triển riêng</h4>
                  <div>
                    <p>
                      AIDepQuiz có bộ 16 câu hỏi tiếng Việt, biên soạn cho phạm vi và
                      cách tính điểm của dự án; đây không phải 22 câu gốc hay bản dịch
                      nguyên văn.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal as="article" className="aidepquiz-development-card" delay={100}>
                  <h4>Mục đích và giới hạn</h4>
                  <div>
                    <p>
                      Đây là dự án học thuật quy mô nhỏ phục vụ học tập và tham khảo.
                      Điểm số chỉ là tham khảo tạm thời, chưa kiểm định ở Việt Nam và
                      không phải ngưỡng lâm sàng, chẩn đoán hay kết luận năng lực; lời
                      khuyên chỉ để tự suy ngẫm, không thay tư vấn chuyên môn.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="section-divider security-section-divider" aria-hidden="true" />

        <section
          id="test-result-security"
          className="information-section information-section-last section-shell"
          aria-labelledby="security-title"
        >
          <ScrollReveal className="security-intro">
            <h2 id="security-title" className="section-title">
              Bạn nên hiểu kết quả như thế nào?
            </h2>
            <p className="section-description">
              Bài test không xác định bạn có “nghiện AI” hay không, không đánh giá trí
              thông minh và không dự đoán thành tích học tập. Kết quả chỉ nên được dùng
              như một điểm bắt đầu để bạn suy nghĩ về thói quen sử dụng AI của mình.
            </p>
          </ScrollReveal>

          <div className="section-divider security-divider" aria-hidden="true" />

          <ScrollReveal className="security-privacy" delay={80}>
            <h2 className="section-title">Về quyền riêng tư của bạn</h2>
            <p className="section-description">
              Bạn không cần đăng nhập hoặc cung cấp tên, email để làm bài test. Kết quả
              chỉ nhằm giúp bạn tự nhìn lại thói quen sử dụng AI và hiện chưa được thu
              thập hoặc sử dụng làm dữ liệu nghiên cứu.
            </p>
          </ScrollReveal>
        </section>
      </main>
    </div>
  );
}

