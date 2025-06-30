import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center tracking-widest drop-shadow">CSS 样式表演示</h1>
        <section className="mb-8 bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">案例说明</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>本案例演示了外部样式表、内部样式表、内联样式的优先级和效果。</li>
            <li>请观察下方列表的不同样式。</li>
          </ul>
        </section>
        <div className="bg-purple-100/60 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">效果演示</h3>
          <div className="p-6 bg-purple-900/80 rounded-md">
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li className="text-green-500">
                <span className="font-semibold">[外部样式表]:</span> 本行文本的样式（如基础颜色、字体）可能由全局 `globals.css` 文件定义。
              </li>
              <li className="text-pink-400 underline decoration-wavy">
                <span className="font-semibold">[内部样式表]:</span> 本行文本的样式（如下划线和颜色）通过页面级样式模拟（在React/Next.js中通常通过CSS-in-JS或模块化CSS实现，此处用Tailwind类模拟）。
              </li>
              <li style={{ color: '#8A2BE2', fontWeight: 'bold' }}>
                <span style={{ color: '#FBBF24', textDecoration: 'none' }}>[内联样式]:</span> 本行文本的样式（紫色和粗体）直接通过 `style` 属性定义，具有最高优先级。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 