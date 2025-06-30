import Link from 'next/link';
import Image from 'next/image';
import MyAppDemo from "../my-app-demo";
import MyAppHello from "../my-app-hello";

export default function MyAppHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <section className="max-w-3xl mx-auto mb-10 bg-white/80 rounded-xl border border-purple-200 shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <Image src="/img/260.jpg" alt="My App 示例" width={220} height={140} className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-2">My App 示例</h2>
            <p className="text-purple-800 mb-2">一个简单的 React 应用页面，展示了组件化开发的基础。</p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-700/20 text-purple-700 px-3 py-1 rounded text-xs font-mono">React</span>
              <span className="bg-purple-700/20 text-purple-700 px-3 py-1 rounded text-xs font-mono">入门</span>
            </div>
          </div>
        </section>
        <h1 className="text-3xl font-bold mb-6 text-purple-700">组件演示区</h1>
        <div className="space-y-6">
          <div className="bg-purple-900/80 text-purple-100 font-mono rounded-lg p-4 shadow">
            <MyAppDemo />
          </div>
          <div className="bg-purple-900/80 text-purple-100 font-mono rounded-lg p-4 shadow">
            <MyAppHello />
          </div>
        </div>
      </div>
    </div>
  );
} 