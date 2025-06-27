import { useState } from "react";
import clsx from "clsx"; // 推荐：条件 className 拼接工具
export default function FeatureGrid() {
  // 所有功能块
  const features = [
    { key: "basics", label: "基本信息", icon: "#icon-gerenxinxi" },
    { key: "feature", label: "用户特征", icon: "#icon--sousuo" },
    { key: "operator", label: "运营商", icon: "#icon-wifi1" },
    { key: "vpn", label: "代理检测", icon: "#icon-network" },
    { key: "blacklist", label: "黑名单", icon: "#icon-heimingdanchaxun" },
    { key: "peopleNumber", label: "使用人数", icon: "#icon-duoren" },
    { key: "analyse", label: "原生分析", icon: "#icon-shouhuihuojian" },
    { key: "language", label: "时区语言", icon: "#icon-yuyan1" },
  ];

  // 状态：每个功能块的状态 idle | loading | done
  type FeatureStatus = "idle" | "loading" | "done";
  type StatusMap = { [key: string]: FeatureStatus };

  const [status, setStatus] = useState<StatusMap>(
    features.reduce<StatusMap>((acc, f) => {
      acc[f.key] = "idle";
      return acc;
    }, {})
  );

  // 模拟一个查询操作
  const runQuery = async () => {
    // 查询前先将所有状态设为 idle（黑白）
    setStatus(
      features.reduce<StatusMap>((acc, f) => {
        acc[f.key] = "idle";
        return acc;
      }, {})
    );
    // 依次为每个功能块设置 loading 和 done
    for (const f of features) {
        setStatus(prev => ({
            ...prev,
            [f.key]: "loading"
        }));
        await new Promise(res => setTimeout(res, 500));
        setStatus(prev => ({
            ...prev,
            [f.key]: "done"
        }));
    }
  };

  return (
    
    <div className="p-4">
        
    <div className="flex justify-center mb-4">
      <button
        onClick={runQuery}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        一键检测
      </button>
    </div>

      <ul className="grid grid-cols-4 gap-4">
        {features.map(f => (
          <li key={f.key} className={clsx("p-2 rounded shadow text-center", {
            "opacity-50": status[f.key] === "loading",
            "bg-gray-100": status[f.key] === "idle",
            "bg-green-100": status[f.key] === "done",
          })}>
            <div className="icon flex justify-center">
              <svg
                className={clsx(
                  "m-icon w-8 h-8",
                  status[f.key] === "idle" && "filter grayscale",
                  status[f.key] === "loading" && "animate-spin",
                  status[f.key] === "done" && ""
                )}
                aria-hidden="true"
              >
                <use xlinkHref={f.icon}></use>
              </svg>
            </div>
            <h2 className="mt-2">{f.label}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
