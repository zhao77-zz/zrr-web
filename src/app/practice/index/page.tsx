import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-6 px-2">
      <div className="max-w-5xl mx-auto">
        <header className="text-center py-10 bg-gradient-to-b from-purple-700 to-purple-500 rounded-b-2xl shadow-lg mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-widest drop-shadow-lg">九尾·KPL顶级中单选手</h1>
          <p className="text-white mt-3 text-lg font-semibold">峡谷智将·中路法王</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-2xl mx-auto hover:-translate-y-1 transition-transform">
          <h3 className="text-xl font-bold text-purple-700 mb-4">✨ 选手成长历程</h3>
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              <tr><td className="pl-4 border-l-4 border-purple-500 py-2">2017年夏 - 加入XQ青训战队</td></tr>
              <tr><td className="pl-4 border-l-4 border-purple-500 py-2">2019年3月9日 - KPL首秀</td></tr>
              <tr><td className="pl-4 border-l-4 border-purple-500 py-2">2021年 - 年度三亚传奇</td></tr>
              <tr><td className="pl-4 border-l-4 border-purple-500 py-2">2024年 - 转会杭州LGD.NBW</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-purple-700 border-b-2 border-orange-500 pb-2 mb-3">🏆 荣誉殿堂</h3>
          <ol className="list-decimal list-inside text-purple-800 space-y-1">
            <li>2021 KPL春季赛亚军</li>
            <li>2021 KPL秋季赛亚军</li>
            <li>2021 挑战者杯亚军</li>
          </ol>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-purple-700 border-b-2 border-orange-500 pb-2 mb-3">🎯 招牌英雄</h3>
          <ul className="columns-2 gap-2 list-none p-0">
            <li className="relative pl-6 mb-2 before:content-['🎮'] before:absolute before:left-0 text-purple-700">不知火舞</li>
            <li className="relative pl-6 mb-2 before:content-['🎮'] before:absolute before:left-0 text-purple-700">上官婉儿</li>
            <li className="relative pl-6 mb-2 before:content-['🎮'] before:absolute before:left-0 text-purple-700">貂蝉</li>
            <li className="relative pl-6 mb-2 before:content-['🎮'] before:absolute before:left-0 text-purple-700">沈梦溪</li>
            <li className="relative pl-6 mb-2 before:content-['🎮'] before:absolute before:left-0 text-purple-700">姜子牙</li>
            <li className="relative pl-6 mb-2 before:content-['🎮'] before:absolute before:left-0 text-purple-700">弈星</li>
          </ul>
        </div>

        <div className="flex justify-center mb-8">
          <form action="https://s.weibo.com/weibo" target="_blank" className="flex gap-3 w-full max-w-xl">
            <input type="text" name="q" defaultValue="九尾" placeholder="搜索九尾最新动态..." className="flex-1 px-5 py-3 border-2 border-purple-500 rounded-full text-base focus:outline-none focus:border-orange-500 transition" />
            <input type="submit" value="立即搜索" className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 hover:opacity-90 transition cursor-pointer" />
          </form>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">🔥 高光时刻</h2>
          <Image src="/practice/images/jiuwei.webp" alt="九尾赛场英姿" width={600} height={340} className="rounded-xl shadow-lg mx-auto mb-6" />
          <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-xl text-center py-4 mb-6">
            <a href="https://pvp.qq.com/match/kpl/kingproleague/index.html" target="_blank" className="text-white text-lg font-bold px-8 py-3 inline-block rounded-full hover:scale-105 transition">🎮 官方观赛通道</a>
            <p className="text-gray-200 mt-2 text-sm">实时观看KPL职业联赛</p>
          </div>
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="//player.bilibili.com/player.html?isOutside=true&aid=936095092&bvid=BV1NT4y117gT&cid=494156055&p=1"
              scrolling="no"
              frameBorder="no"
              allowFullScreen
              width="100%"
              height="450"
              className="w-full h-full"
              style={{ borderRadius: '12px' }}
            ></iframe>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
      </div>
    </div>
  );
} 