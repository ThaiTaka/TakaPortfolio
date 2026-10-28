import { profile } from '../../data/profile'
import { ui } from '../../data/ui'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const values = ['Tò mò và ham học hỏi', 'Giải quyết vấn đề thực tiễn', 'Học tập liên tục', 'Nghiên cứu bài bản', 'Chia sẻ và giảng dạy']

const snapshot = [
  { k: 'Họ và tên', v: profile.fullName },
  { k: 'Trường', v: profile.university },
  { k: 'Ngành', v: profile.field },
  { k: 'Giảng dạy', v: 'STEM, Python, Pygame · từ 2023' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="about-title" eyebrow={ui.about.eyebrow}>
          Giới thiệu <em>bản thân</em>
        </SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-white/75 md:text-lg">
              <p>
                Tôi là {profile.fullName}, thường được biết đến với tên {profile.brand}. Tôi đang học ngành {profile.field} tại {profile.university} và
                thích biến ý tưởng thành những phần mềm chạy được. Mối quan tâm của tôi trải rộng từ trí tuệ nhân tạo, lập trình full-stack, thuật toán
                cho đến phát triển game và các giải pháp giải quyết vấn đề thực tế.
              </p>
              <p>
                Song song với việc xây dựng phần mềm, tôi vừa giảng dạy STEM vừa dạy lập trình Python và Pygame từ năm 2023, giúp học sinh tiếp cận lập trình và
                công nghệ qua trải nghiệm thực hành. Công việc này cũng giúp tôi học cách giải thích và thiết kế sản phẩm rõ ràng hơn.
              </p>
            </div>
            <h3 className="eyebrow mb-3 mt-8">{ui.about.values}</h3>
            <ul className="flex flex-wrap gap-2">
              {values.map((v) => (
                <li key={v} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-stroke bg-surface p-6 md:p-8">
              <h3 className="eyebrow mb-5">{ui.about.snapshot}</h3>
              <dl className="divide-y divide-stroke">
                {snapshot.map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="text-sm text-muted">{row.k}</dt>
                    <dd className="text-right text-sm font-medium text-white/90">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
