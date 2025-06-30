'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // fetch 获取 GitHub 提交日期
  async function getSomething(repoUrl: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const parts = repoUrl.split('/');
      const username = parts[parts.length - 2];
      const repoName = parts[parts.length - 1];
      fetch(`https://api.github.com/repos/${username}/${repoName}/commits`)
        .then(response => response.json())
        .then(data => {
          const commitDates = (data as Array<{ commit: { committer: { date: string } } }>).map(commit => commit.commit.committer.date);
          resolve(commitDates);
        })
        .catch(reject);
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await getSomething('https://github.com/zhao77-zz/web--');
        setDates(result);
        console.log('提交日期(JSON):', JSON.stringify(result));
      } catch (err) {
        setError('获取提交日期失败');
        console.error('获取提交日期失败:', err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center tracking-widest drop-shadow">JavaScript 异步编程练习</h1>
        <section className="mb-8 bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">案例说明</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>本案例演示了 Promise、async/await、fetch API 等异步编程基础。</li>
            <li>页面加载后会自动获取 GitHub 提交日期并以 JSON 形式展示。</li>
            <li>请按 F12 打开浏览器控制台，观察输出。</li>
          </ul>
        </section>
        <section className="flex flex-col items-center bg-purple-100/60 rounded-xl p-8 shadow">
          <div id="demo" className="w-full overflow-x-auto mt-4 text-purple-900 bg-white/80 rounded p-4 text-center">
            {error ? error : (dates.length > 0 ? JSON.stringify(dates) : '加载中...')}
          </div>
        </section>
      </div>
    </div>
  );
} 