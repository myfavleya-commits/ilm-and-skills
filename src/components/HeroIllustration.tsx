import {
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  Globe2,
  MousePointer2,
  Sparkle,
  Sprout,
} from 'lucide-react';

export function HeroIllustration() {
  return (
    <div
      className="hero-illustration"
      role="img"
      aria-label="Illustration of a sample educational website, lesson document, and learning resources. From knowledge to practical skills."
    >
      <div aria-hidden="true" style={{ display: 'contents' }}>
        <svg
          className="arch-pattern"
          viewBox="0 0 600 540"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M90 540V248C90 118 300 28 300 28s210 90 210 220v292M128 540V259c0-110 172-190 172-190s172 80 172 190v281M167 540V272c0-91 133-160 133-160s133 69 133 160v268M206 540V284c0-70 94-125 94-125s94 55 94 125v256"
            stroke="currentColor"
          />
          <circle cx="539" cy="58" r="24" />
          <path d="m539 26 7 25 25 7-25 7-7 25-7-25-25-7 25-7 7-25Z" />
        </svg>
        <div className="art-heading">
          <span>
            <span className="art-dot" />A WORLD OF POSSIBILITY
          </span>
          <Sprout size={22} strokeWidth={1.3} />
        </div>
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="computer-art">
          <div className="monitor-frame">
            <div className="mock-browser">
              <span />
              <span />
              <span />
              <div>
                <Globe2 size={9} />
                your-knowledge.example
              </div>
              <span className="browser-dot" />
            </div>
            <div className="mock-website">
              <div className="mock-site-nav">
                <div className="tiny-logo">
                  <BookOpen size={12} />
                  THE LEARNING SPACE
                </div>
                <div>
                  About<span>Lessons</span>Resources
                </div>
              </div>
              <div className="mock-site-main">
                <div>
                  <span className="mock-eyebrow">LEARN. TEACH. INSPIRE.</span>
                  <strong>
                    Knowledge worth
                    <br />
                    sharing.
                  </strong>
                  <p>
                    A place to connect thoughtful teaching
                    <br />
                    with curious minds.
                  </p>
                  <span className="mock-site-button">
                    Explore my lessons <ArrowUpRight size={6} />
                  </span>
                </div>
                <div className="mock-arch">
                  <BookOpen size={48} strokeWidth={1} />
                  <span>Rooted in purpose.</span>
                  <span className="mock-arch-line" />
                </div>
              </div>
              <div className="mock-site-bottom">
                <div>
                  <span className="mock-square">
                    <BookOpen size={12} />
                  </span>
                  <span>
                    Thoughtful lessons<small>Clear, practical learning</small>
                  </span>
                </div>
                <div>
                  <span className="mock-square">
                    <Globe2 size={12} />
                  </span>
                  <span>
                    A wider classroom<small>Connection beyond borders</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="monitor-chin">
            <span />
          </div>
          <div className="monitor-neck" />
          <div className="monitor-foot" />
        </div>
        <div className="art-document">
          <div className="art-document-top">
            <span>
              <FileText size={14} />
            </span>
            <span>
              MY FIRST LESSON PLAN
              <small>From an idea to a useful resource</small>
            </span>
          </div>
          <div className="doc-line long" />
          <div className="doc-line" />
          <div className="doc-line medium" />
          <div className="doc-note">
            <Check size={11} />
            Prepared with purpose
          </div>
        </div>
        <div className="art-book">
          <div className="book-cover">
            <span>
              KNOWLEDGE
              <br />& POSSIBILITY
            </span>
            <BookOpen size={32} strokeWidth={1} />
            <small>A NEW CHAPTER</small>
          </div>
          <div className="book-pages" />
        </div>
        <div className="art-cursor">
          <MousePointer2 size={23} fill="#e9c989" />
          <span>Your next chapter</span>
        </div>
        <div className="art-bottom">
          <span className="art-bottom-line" />
          <p>
            Rooted in tradition.
            <br />
            <strong>Connected to tomorrow.</strong>
          </p>
          <Sparkle className="art-star" size={25} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
