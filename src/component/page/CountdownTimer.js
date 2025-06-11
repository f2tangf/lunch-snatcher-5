"use client";
import { useState, useEffect } from 'react'

export default function CountdownTimer({
  start = 30,         // 倒数起点（秒）
  onComplete = () => {}, // 倒完之后的回调
}) {
  const [time, setTime] = useState(start)

  useEffect(() => {
    if (time <= 0) {
      onComplete()
      return
    }
    const id = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(id);
  }, [time, onComplete]);

  // 格式化 mm:ss，如果纯秒数也可以直接 `{time}`
  const mm = String(Math.floor(time / 60)).padStart(2, '0')
  const ss = String(time % 60).padStart(2, '0')

  return (
    <div className="countdown">
      {mm}:{ss}
      <style jsx>{`
        .countdown {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 2rem;
          font-weight: bold;
          color: #DEDEDEDE;
          background: 2F9172;
          padding: 12px 60px;
          border-radius: 0px;
          z-index: 50;
        }
      `}</style>
    </div>
  )
}