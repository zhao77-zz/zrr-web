import Link from "next/link";
import DdddddExerciseCard, { ExerciseCardProps } from "./exercise-card";
import exercisesData from './exercises.json';
import WakaTimeStats from "./wakatime-stats";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-purple-900/80 backdrop-blur-md text-white p-4 shadow-lg w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-orange-400 transition-colors duration-300 tracking-wider">
          作业平台
        </Link>
        <div className="space-x-6 text-lg">
          <Link href="/" className="hover:text-orange-400 transition-colors duration-300">首页</Link>
          <Link href="/practice/embed-demo" className="hover:text-orange-400 transition-colors duration-300">问答</Link>
        </div>
      </div>
    </nav>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] opacity-20 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-slate-900 to-transparent rounded-full blur-3xl"></div>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 pt-28 w-full z-10">
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-700 to-purple-300 mb-6 drop-shadow-lg">
            Web前端技术开发
          </h1>
          <div className="mb-6">
            <p className="text-2xl md:text-3xl font-semibold text-purple-600 mb-2">
              P231014713 赵蓉润
            </p>
          </div>
          <p className="text-lg md:text-xl text-purple-700/80 max-w-3xl mx-auto tracking-wide">
            探索未来前端的每一道光，点亮属于你的高能成长之路。
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {exercisesData.map((exercise: ExerciseCardProps) => (
              <DdddddExerciseCard
                key={exercise.id}
                id={exercise.id}
                title={exercise.title}
                description={exercise.description}
                imageUrl={exercise.imageUrl}
                link={exercise.link}
                tags={exercise.tags}
              />
            ))}
          </div>
        </section>
      </main>

      <WakaTimeStats />
    </div>
  );
}
