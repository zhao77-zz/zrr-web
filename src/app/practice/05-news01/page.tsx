'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  useEffect(() => {
    const a = 100;
    // alert(a);
    console.log(a);
    const api_key = "ssssx-=-dddd";
    console.log(api_key);
    console.log(typeof a, typeof api_key, typeof true);
    const b = "1";
    console.log(a + b);
    console.log(a + Number(b));
    const c = "100";
    console.log(a == Number(c));
    console.log(a === Number(c));
    // 分支语句
    const current_time = '12:20';
    if (current_time == '12:20') {
      console.log('加油！');
    } else {
      console.log('认真学习');
    }
    // for 循环
    for (let i = 0; i <= 10; i++) {
      console.log(i);
    }
    // while 循环
    let hug = 60;
    while (hug > 0) {
      console.log('继续学习');
      hug = hug - 10;
    }
    // 函数
    function intro() {
      console.log('你好，我是一个爱学习的人！');
    }
    intro();
    function intro2(content: string) {
      console.log('以下是我的介绍：  ' + String(content));
    }
    console.log(typeof intro2('这是传入的参数'));
    intro2('这是传入的参数');
    function intro3(content1: string, content2: string) {
      console.log('以下是我的介绍的内容：  ' + String(content1) + String(content2));
    }
    intro3('参数1', '参数2');
    function intro4(content: string) {
      console.log(content);
      return content + '这是返回值';
    }
    intro4('带返回值的函数');
    const result = intro4('带返回值的函数');
    console.log(result);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center tracking-widest drop-shadow">JavaScript 核心语法学习</h1>
        <section className="mb-8 bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">案例说明</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>本案例演示了 JavaScript 变量、类型判断、分支、循环、函数等基础语法。</li>
            <li>页面加载后会在控制台输出相关信息。</li>
            <li>请按 F12 打开浏览器控制台，观察输出。</li>
          </ul>
        </section>
        <section className="flex flex-col items-center bg-purple-100/60 rounded-xl p-8 shadow">
          <Image
            src="/img/260.jpg"
            alt="科技感背景"
            width={400}
            height={200}
            className="rounded-lg mb-6 shadow-lg"
          />
          <div className="text-lg text-purple-800 bg-white/80 rounded p-4 text-center">
            （本页无可视内容，请查看控制台输出）
          </div>
        </section>
      </div>
    </div>
  );
} 