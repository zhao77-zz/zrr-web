import { Suspense } from 'react';

async function getWakaTimeStats() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) {
    console.error("WakaTime API key is not set.");
    return "API Key Not Configured";
  }

  try {
    const url = `https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=${apiKey}`;
    
    const response = await fetch(
      url,
      {
        next: {
          revalidate: 3600, // 每小时重新获取一次数据
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WakaTime API request failed with status: ${response.status}`);
      console.error(`WakaTime API error response: ${errorText}`);
      return "Error Fetching Data";
    }

    const stats = await response.json();
    return stats.data?.text || "No activity yet";
  } catch (error) {
    console.error("Failed to fetch WakaTime stats:", error);
    return "Server Error";
  }
}

async function WakaTimeData() {
    const stats = await getWakaTimeStats();
    return (
        <p>总编码时长: <span className="font-semibold text-cyan-300">{stats}</span></p>
    );
}

export default function WakaTimeStats() {
  return (
    <footer className="text-slate-400 text-center p-8 mt-auto w-full z-10">
        <p className="mb-2">&copy; {new Date().getFullYear()} Web前端开发课程</p>
        <Suspense fallback={<p>正在加载编码时长...</p>}>
            <WakaTimeData />
        </Suspense>
    </footer>
  );
} 