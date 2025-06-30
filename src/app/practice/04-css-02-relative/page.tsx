import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 tracking-widest drop-shadow">案例演示：相对定位 (Relative)</h1>
          <p className="text-lg text-purple-600/90 max-w-3xl mx-auto">`position: relative` 使元素相对于其在正常文档流中的原始位置进行偏移，但其原始空间仍被保留。</p>
        </header>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Section: Normal Flow */}
          <section className="bg-white/80 rounded-xl shadow-xl border border-purple-200 p-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">正常文档流</h2>
            <div className="space-y-4 text-purple-800 text-center">
              <div className="p-4 bg-purple-200/80 rounded-lg">元素 1</div>
              <div className="p-4 bg-purple-200/80 rounded-lg">元素 2</div>
              <div className="p-4 bg-purple-400/40 border border-purple-400 rounded-lg">元素 3 (将要被定位的元素)</div>
              <div className="p-4 bg-purple-200/80 rounded-lg">元素 4</div>
            </div>
          </section>
          {/* Section: Relative Positioning */}
          <section className="bg-white/80 rounded-xl shadow-xl border border-purple-200 p-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">相对定位 (Relative)</h2>
            <div className="space-y-4 text-purple-800 text-center relative">
              <div className="p-4 bg-purple-200/80 rounded-lg">元素 1</div>
              <div className="p-4 bg-purple-200/80 rounded-lg">元素 2</div>
              {/* Ghost element showing original position */}
              <div className="p-4 bg-purple-100/60 border-2 border-dashed border-purple-400 rounded-lg text-purple-400">元素 3 的原始位置</div>
              {/* The relatively positioned element */}
              <div className="p-4 bg-purple-500/80 rounded-lg absolute w-full left-10" style={{ top: 'calc(8rem + 2rem + 8px)' }}>
                元素 3 (position: relative; top: ...; left: 40px;)
              </div>
              <div className="p-4 bg-purple-200/80 rounded-lg">元素 4</div>
              <p className="text-sm text-orange-500 pt-16 text-center">
                注意：即使元素3被移动，元素4的位置也并未改变，因为元素3在文档流中占据的空间被保留了。
              </p>
            </div>
          </section>
        </div>
        <div className="mt-12 bg-white/80 rounded-xl p-6 border border-purple-200 shadow">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">核心代码</h3>
          <pre className="bg-purple-900/80 text-sm text-purple-100 font-mono p-4 rounded-md overflow-x-auto">
            <code>
{`.target-element {
  position: relative;
  top: 50px; /* 相对于原始位置向下移动 50px */
  left: 40px; /* 相对于原始位置向右移动 40px */
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
} 