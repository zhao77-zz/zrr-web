'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  useEffect(() => {
    // 类和对象
    class student {
      name: string;
      age: number;
      school: string;
      grade: number;
      constructor(name: string, age: number, school: string, grade: number) {
        this.name = name;
        this.age = age;
        this.school = school;
        this.grade = grade;
      }
      learn(subject: string = '语文') {
        console.log(`${this.name}正在学习${subject},厉害`);
      }
      exam() {
        console.log(`${this.name}正在上课`);
      }
    }
    const xiaoming = new student('小明', 7, '实验中学', 1);
    xiaoming.learn('英语');
    xiaoming.exam();

    class undergraduate extends student {
      major: string;
      experience: number;
      constructor(name: string, age: number, school: string, grade: number, major: string, skill: string, experience: number) {
        super(name, age, school, grade);
        this.major = major;
        this.experience = experience;
      }
      intern(corp: string) {
        console.log(`${this.name}正在${corp}实习`);
      }
    }
    // 仅演示类定义和方法调用
    // 回调函数、setTimeout
    console.log('111111');
    setTimeout(function() {
      console.log('2222222');
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-700 hover:text-orange-500 font-bold text-lg transition">← 返回作业平台首页</Link>
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center tracking-widest drop-shadow">JavaScript 类与对象基础</h1>
        <section className="mb-8 bg-white/80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">案例说明</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>本案例演示了 JavaScript 类、继承、方法、回调等基础语法。</li>
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