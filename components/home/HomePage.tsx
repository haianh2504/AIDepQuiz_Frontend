import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SiteHeader } from "@/components/navigation/SiteHeader";

const aspectCards = [
  {
    number: "1",
    title: "Phụ thuộc về cảm xúc",
    description: "Đo cảm giác bất an, căng thẳng hoặc thiếu tự tin khi không thể sử dụng AI.",
  },
  {
    number: "2",
    title: "Phụ thuộc về chức năng",
    description: "Đo mức độ người dùng gặp khó khăn khi hoàn thành nhiệm vụ nếu không có sự hỗ trợ của AI.",
  },
  {
    number: "3",
    title: "Phụ thuộc về nhận thức",
    description: "Đo xu hướng giao cho AI những hoạt động như suy nghĩ, phân tích, giải quyết vấn đề hoặc ra quyết định.",
  },
  {
    number: "4",
    title: "Mất khả năng kiểm soát",
    description: "Đo mức độ khó giảm hoặc dừng sử dụng AI ngay cả khi người dùng biết rằng mình không thực sự cần sử dụng công cụ này.",
  },
];

const likertOptions = [
  "Hoàn toàn không đồng ý",
  "Không đồng ý",
  "Không đồng ý cũng không phản đối",
  "Đồng ý",
  "Hoàn toàn đồng ý",
];

const researchSteps = [
  "Xây dựng nhóm câu hỏi ban đầu dựa trên các lý thuyết về phụ thuộc công nghệ, tự quản lý bản thân.",
  "Nhờ các chuyên gia đánh giá mức độ rõ ràng, liên quan và cần thiết của từng câu hỏi.",
  "Thử nghiệm câu hỏi với người tham gia và khảo sát hai nhóm độc lập.",
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
                  Khía cạnh {card.number}: <span>( 4 câu )</span>
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

          <div className="test-overview-divider test-overview-divider-bottom" aria-hidden="true" />
        </section>

        <section id="academic-basis" className="information-section section-shell" aria-labelledby="academic-title">
          <ScrollReveal className="section-heading academic-heading">
            <h2 id="academic-title" className="section-title">
              Bài test được xây dựng dựa trên cơ sở nào?
            </h2>
            <p className="section-description">
              Nội dung bài test được xây dựng dựa trên khái niệm AI dependence trong
              nghiên cứu học thuật, đặc biệt là bốn khía cạnh được đề xuất trong AIDep-22.
            </p>
          </ScrollReveal>

          <div className="academic-research-grid">
            <ScrollReveal className="aiddep-summary">
              <h3>AIDep-22 là gì?</h3>
              <p>
                AIDep-22 (AI Dependence Scale) là thang đo gồm 22 câu hỏi, được phát
                triển và kiểm định trên sinh viên đại học tại Trung Quốc nhằm đánh giá
                sự phụ thuộc vào AI qua bốn khía cạnh: cảm xúc, chức năng, nhận thức và
                khả năng kiểm soát hành vi.
              </p>
              <div className="research-sample" aria-label="Nghiên cứu trên hai mẫu độc lập gồm 800 sinh viên đại học Trung Quốc">
                <span>2 Mẫu độc lập</span>
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

            <ScrollReveal className="research-process" delay={100}>
              <h3>Nhóm nghiên cứu đã:</h3>
              <ul>
                {researchSteps.map((step, index) => (
                  <ScrollReveal as="li" delay={index * 75} key={step}>
                    {step}
                  </ScrollReveal>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal className="adaptation-summary">
            <h3>AIDepQuiz đơn giản là:</h3>
            <p>
              Bài tự đánh giá 16 câu bằng tiếng Việt, được phát triển dựa trên thang đo
              AI Dependence Scale (AIDep-22) đã được nghiên cứu trên sinh viên đại học
              Trung Quốc, nhằm giúp người dùng nhận diện mức độ AI ảnh hưởng đến cảm
              xúc, công việc, tư duy và khả năng tự kiểm soát của mình.
            </p>
          </ScrollReveal>
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

