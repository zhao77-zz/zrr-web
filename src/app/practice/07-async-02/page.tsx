'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 示例异步请求
        const res = await fetch('https://api.github.com/repos/vercel/next.js/commits');
        const data: Array<{ commit: { committer: { date: string } } }> = await res.json();
        setResult(JSON.stringify(data.map((c) => c.commit.committer.date)));
      } catch {
        setError('获取数据失败');
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center tracking-widest drop-shadow">JavaScript 异步编程练习 2</h1>
        <section className="mb-8 bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">案例说明</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>本案例演示了 Promise、async/await、fetch API 等异步编程基础。</li>
            <li>页面加载后会自动获取 Next.js 仓库的提交日期并以 JSON 形式展示。</li>
            <li>请按 F12 打开浏览器控制台，观察输出。</li>
          </ul>
        </section>
        <section className="flex flex-col items-center bg-purple-100/60 rounded-xl p-8 shadow">
          <div className="w-full overflow-x-auto mt-4 text-purple-900 bg-white/80 rounded p-4 text-center">
            {error ? error : (result ? result : '加载中...')}
          </div>
        </section>
      </div>
    </div>
  );
} 