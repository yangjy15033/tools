"use client";

import { useState ,useEffect } from "react";
import FeatureGrid from "./featureGrid";
import Svgs from "./svgs";

export default function Home() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIp = async () => {
      const res = await fetch('https://api.ipify.org?format=json');
      const data: { ip: string } = await res.json();
      setIp(data.ip); 
    };
    fetchIp();
    // 这里可以放 Ajax、初始化、埋点、监听等
  }, []); // 👈 空数组 = 只在挂载时执行一次

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("检测IP:", ip);
    await new Promise(res => setTimeout(res, 1000));
    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <header className="row-start-1 flex items-center justify-center gap-[24px]">
        <h1 className="text-3xl font-bold text-center">
          IP检测
        </h1><br/> 
      </header>
      <Svgs />
      <main className="row-start-2 flex flex-col items-center justify-center gap-[24px]">
        <p className="text-center text-lg text-gray-500">
         最权威的IP检测工具，提供IP地址查询、地理位置、运营商信息、代理检测等多种功能。
        </p>
        <form
          id="ip-form"
          className="flex gap-2 mt-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="ip"
            name="ip"
            placeholder="输入IP地址"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={ip}
            onChange={e => setIp(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "检测中..." : "检测"}
          </button>
        </form>
         
        <FeatureGrid/>        
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
