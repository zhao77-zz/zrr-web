import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4 text-center tracking-widest drop-shadow">中单选手九尾</h1>
        <h3 className="text-xl font-bold text-red-500 mb-6 text-center leading-relaxed">九尾登场经历</h3>
        <table className="mx-auto w-4/5 border-separate border-spacing-y-2 mb-8">
          <tbody>
            <tr><td className="text-red-500 py-2 border-b border-gray-300">1.1 2017年夏,许鑫蓁加入XQ俱乐部旗下青训战队——QST战队</td></tr>
            <tr><td className="text-red-500 py-2 border-b border-gray-300">1.2 2019年3月9日,许鑫蓁初登KPL舞台</td></tr>
            <tr><td className="text-red-500 py-2 border-b border-gray-300">1.3 2021和队伍一年三亚</td></tr>
            <tr><td className="text-red-500 py-2 border-b border-gray-300">1.4 2024年,转会至杭州lgd.nbw战队</td></tr>
          </tbody>
        </table>
        <div className="mb-8">
          <h4 className="text-center text-lg font-semibold mb-2">微博主页</h4>
          <form action="https://s.weibo.com/weibo" target="_blank" className="flex justify-center gap-3">
            <input type="text" name="q" defaultValue="九尾" placeholder="搜索微博" className="px-4 py-2 border border-gray-300 rounded-md w-72" />
            <input type="submit" value="搜索微博" className="bg-purple-700 text-white px-6 py-2 rounded-md font-bold cursor-pointer hover:bg-purple-800 transition" />
          </form>
        </div>
        <div className="mb-8">
          <p className="bg-purple-700 text-white border border-black text-lg p-6 rounded mb-4">许鑫蓁游戏ID九尾现效力于杭州LGD.NBW王者荣耀战队</p>
          <ol className="bg-purple-700 text-white border border-black text-lg p-6 rounded mb-4 list-decimal list-inside">
            <li>2021年 kpl春季赛亚军</li>
            <li>2021年 kpl秋季赛冠军</li>
            <li>2021年 kpl挑战者杯亚军</li>
          </ol>
          <ul className="bg-purple-700 text-white border border-black text-lg p-6 rounded mb-4 list-disc list-inside">
            <li>不知火舞</li>
            <li>上官婉儿</li>
            <li>貂蝉</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">kpl比赛<br /><span className="text-lg">比赛视频</span></h2>
          <p className="text-center text-lg mb-4">观赛链接 <a href="https://pvp.qq.com/match/kpl/kingproleague/index.html" className="text-purple-700 underline hover:text-orange-500 transition">这是kpl王者荣耀职业联赛的链接</a></p>
        </div>
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full flex justify-center mb-4">
            <Image src="/img/jiuwei.webp" alt="九尾选手" width={500} height={300} className="rounded-lg animate-spin [animation-duration:10s]" />
          </div>
          <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-lg bg-cyan-400/80 p-2">
            <iframe
              src="//player.bilibili.com/player.html?isOutside=true&aid=936095092&bvid=BV1NT4y117gT&cid=494156055&p=1"
              scrolling="no"
              frameBorder="no"
              allowFullScreen
              width="100%"
              height="300"
              className="w-full h-[300px] rounded-lg"
              style={{ backgroundColor: '#16ada3', borderRadius: '10px', padding: '10px' }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
} 