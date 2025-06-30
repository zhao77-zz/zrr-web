import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-purple-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1
          className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-8 text-center tracking-widest drop-shadow bg-[url('/img/260.jpg')] bg-no-repeat bg-center min-h-[120px] flex items-center justify-center"
        >
          css核心概念:背景、盒模型、布局、动画
        </h1>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">背景</h2>
          <div className="bg-white/80 rounded p-4 shadow">
            <p className="text-gray-700">
              &quot;cascading&quot;的音标是不知道。如果你想在HTML文件里为<br />
              linear:        英 美
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">盒模型</h2>
          <div>
            <div className="box-border w-32 h-32 border-dashed border-2 border-green-400 p-5 mb-8 flex items-center justify-center bg-white/80 rounded text-green-700 font-semibold">box中的内容 1</div>
            <div className="box-border w-32 h-32 border-dashed border-2 border-green-400 p-5 mb-8 flex items-center justify-center bg-white/80 rounded text-green-700 font-semibold">box中的内容 2</div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">背景</h2>
          <div></div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">背景</h2>
          <div></div>
        </section>
      </div>
    </div>
  );
} 