'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Page() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 类和对象
    class Car {
      brand: string;
      model: string;
      year: number;
      constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
      }
      start() {
        console.log(`汽车 ${this.brand} ${this.model} 启动了`);
      }
      stop() {
        console.log(`汽车 ${this.brand} ${this.model} 停止了`);
      }
    }
    const myCar = new Car('Mi', 'Yu7', 2025);
    myCar.start();
    myCar.stop();

    class ElectricCar extends Car {
      range: number;
      constructor(brand: string, model: string, year: number, range: number) {
        super(brand, model, year);
        this.range = range;
      }
      charge() {
        console.log(`电动汽车 ${this.brand} ${this.model} 正在充电`);
      }
    }
    const myElectricCar = new ElectricCar('Tesla', 'Model Y', 2025, 300);
    myElectricCar.start();
    myElectricCar.charge();

    // 回调函数练习
    console.log('111111');
    setTimeout(function () {
      console.log('22222');
    }, 2000);
    console.log('333333');

    // DOM 操作
    if (divRef.current) {
      console.log(divRef.current);
      divRef.current.innerHTML = '这是从脚本动态更改的内容（点击我试试）';
      divRef.current.onclick = function () {
        alert('我也被点击了！');
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <section className="mb-8 bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">案例说明：类、继承、回调与DOM操作</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>本案例演示了 TypeScript 类、继承、回调函数、DOM 操作等基础知识。</li>
            <li>页面加载后请按 F12 打开浏览器控制台，观察输出。</li>
            <li>你可以点击标题和下方内容，体验事件绑定与交互。</li>
          </ul>
        </section>
        <section className="flex flex-col items-center bg-purple-100/60 rounded-xl p-8 shadow">
          <h1
            ref={h1Ref}
            style={{ cursor: 'pointer', transition: 'color 0.3s' }}
            onClick={() => alert('你点我干啥！')}
            className="text-3xl font-bold mb-6 text-center text-purple-700 hover:text-orange-500"
          >
            这是一个标题的原始内容
          </h1>
          <div className="text-lg text-purple-800 bg-white/80 rounded p-4 text-center cursor-pointer hover:bg-purple-200 transition-colors">
            这是一个段落（点击我试试）
          </div>
        </section>
      </div>
    </div>
  );
} 