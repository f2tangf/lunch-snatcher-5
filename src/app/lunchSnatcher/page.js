// src/app/lunchSnatcher/page.js
'use client';


import Image from "next/image";
import { useState, useEffect, useRef, Link } from "react";
import { HashRouter as Router, Routes, Route} from "react-router-dom";


import StartPage01 from '@/component/page/StartPage01';
import StartPage02 from '@/component/page/StartPage02';
import StartPage03 from '@/component/page/StartPage03';
import GamePage from '@/component/page/GamePage';
import ResultPage01 from '@/component/page/ResultPage01';
import ResultPage02 from '@/component/page/ResultPage02';



import BgImg from '@/../public/source/0-1-notice/0-1-bg.png';
import GroupImg1 from '@/../public/source/0-1-notice/0-1-big-group.png';
import NextBtnImg from '@/../public/source/0-1-notice/0-1-button.png';




export default function lunchSnatcher() {


  // 用 useState 管理目前是哪個頁面，用數字（0～5）表示各頁
  const [gameState, setGameState] = useState(0) // ← 預設從 0 開始

  // 共用的 onNext
  const onNext = () => setGameState(s => s + 1)
  // GamePage 專用
  const onWin  = () => setGameState(4)
  const onFail = () => setGameState(5)
  // ResultPage 回 Home 或 再玩一次
  const goHome     = () => setGameState(0)
  const playAgain  = () => setGameState(3)



  const pages =[
    <StartPage01 onNext={() => setGameState(1)}/>,
    <StartPage02 onNext={() => setGameState(2)}/>,
    <StartPage03 onNext={() => setGameState(3)}/>,
    <GamePage    onWin={() => setGameState(5)} onFail={() => setGameState(6)} />,
    <ResultPage01 onPlayAgain={() => setGameState(4)} onHome={() => setGameState(0)} />,
    <ResultPage02 onPlayAgain={() => setGameState(4)} onHome={() => setGameState(0)} />,
  ]
 
 
  return (
  
        <>
        <div style={{ 
          width: '100vw', 
          height: '100vh', 
          position: 'relative',
          overflow: 'hidden'
         }}>

            { gameState === 0 && <StartPage01  onNext={onNext} /> }
            { gameState === 1 && <StartPage02  onNext={onNext} /> }
            { gameState === 2 && <StartPage03  onNext={onNext} /> }
            { gameState === 3 && <GamePage     onWin={onWin} onFail={onFail} /> }
            { gameState === 4 && <ResultPage01 onPlayAgain={playAgain} onHome={goHome} /> }
            { gameState === 5 && <ResultPage02 onPlayAgain={playAgain} onHome={goHome} /> }
          
            </div>

      </>

      
 );
      
}
