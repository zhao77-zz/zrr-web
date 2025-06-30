import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center tracking-widest drop-shadow">css练习</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold underline text-aquamarine-400 mb-4" style={{ color: 'aquamarine' }}>使用样式表的三种方式</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
            <li>外部样式表</li>
            <li>内部样式表</li>
            <li style={{ color: 'beige' }}>内嵌样式表</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 