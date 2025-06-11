// src/app/lunchSnatcher/GamePage/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";


import MobileFrame from '@/component/layout/MobileFrame'
import BgImg7 from '@/../public/source/1-1-game/1-1-bg.png';
import GroupImg7 from '@/../public/source/1-1-game/1-1-desk group.png';
import GroupImg8 from '@/../public/source/1-1-game/1-1-notice-box.png';
import GroupImg9 from '@/../public/source/1-1-game/1-1-life-line-long 3.png';
import UpImg from '@/../public/source/1-1-game/1-1-arrow-keys-up.png';
import LeftImg from '@/../public/source/1-1-game/1-1-arrow-keys-left.png';
import DownImg from '@/../public/source/1-1-game/1-1-arrow-keys-down.png';
import RightImg from '@/../public/source/1-1-game/1-1-arrow-keys-right.png';
import CursorImg from '@/../public/source/1-1-game/1-1-mouse.png';


import FoodImg1 from '@/../public/source/1-1-game/1-1-brocoli.png';
import FoodImg2 from '@/../public/source/1-1-game/1-1-bubble-tea.png';
import FoodImg3 from '@/../public/source/1-1-game/1-1-chicken.png';
import FoodImg4 from '@/../public/source/1-1-game/1-1-dango.png';
import FoodImg5 from '@/../public/source/1-1-game/1-1-hamburger-steak.png';
import FoodImg6 from '@/../public/source/1-1-game/1-1-okonomiyaki.png';
import FoodImg7 from '@/../public/source/1-1-game/1-1-pudding.png';
import FoodImg8 from '@/../public/source/1-1-game/1-1-ratatouille.png';
import FoodImg9 from '@/../public/source/1-1-game/1-1-rice-ball.png';
import FoodImg10 from '@/../public/source/1-1-game/1-1-rice-cake.png';
import FoodImg11 from '@/../public/source/1-1-game/1-1-sushi.png';
import FoodImg12 from '@/../public/source/1-1-game/1-1-tofu.png';

import CountdownTimer from '@/component/page/CountdownTimer'

import foodTimerImg from '@/../public/source/1-1-game/1-1-timer.png';



export default function GamePage({onWin, onFail}) {
 
    {/* 游標矩陣 */} {/* 同學食物矩陣 */}{/* 食物計時器矩陣 */}  
    // 游標面板尺寸
    const PANEL_W     = 360
    const PANEL_H     = 522
    const ROWS        = 3
    const COLS        = 3
    const CURSOR_SIZE = 65
    const CELL_W = PANEL_W / COLS
    const CELL_H = PANEL_H / ROWS
    // 同學食物面板尺寸
    const FOODPANEL_W = 370
    const FOODPANEL_H = 520
    const FOODROWS = 3
    const FOODCOLS = 3
    const FOOD_SIZE = 50



    // 游標生成中心点比例：1/6,3/6,5/6
    const rowFrac = Array.from({ length: ROWS }, (_, r) => (2*r+1)/(2*ROWS))
    const colFrac = Array.from({ length: COLS }, (_, c) => (2*c+1)/(2*COLS))
     // 同學食物生成中心点比例：1/6,3/6,5/6
     const foodRowFrac = Array.from({ length: FOODROWS }, (_, r) => (2 * r + 1) / (2 * FOODROWS))
     const foodColFrac = Array.from({ length: FOODCOLS }, (_, c) => (2 * c + 1) / (2 * FOODCOLS))
     
    


    const [pos, setPos] = useState({ row: 1, col: 1 })

    // 算出畫面上游標的絕對座標
    const x = colFrac[pos.col] * PANEL_W - CURSOR_SIZE/2
    const y = rowFrac[pos.row] * PANEL_H - CURSOR_SIZE/2

    const moveUp    = () => setPos(p => ({ ...p, row: Math.max(0,     p.row-1) }))
    const moveDown  = () => setPos(p => ({ ...p, row: Math.min(ROWS-1, p.row+1) }))
    const moveLeft  = () => setPos(p => ({ ...p, col: Math.max(0,     p.col-1) }))
    const moveRight = () => setPos(p => ({ ...p, col: Math.min(COLS-1, p.col+1) }))


    
    // 在 GamePage 最上方，import 完 FoodImg1～12 之後
    const allMyFoods = [
      { src: FoodImg1, score: 5 },
      { src: FoodImg2, score: 10 },
      { src: FoodImg3, score: 20 },
      { src: FoodImg4, score: 5 },
      { src: FoodImg5, score: 10 },
      { src: FoodImg6, score: 20 },
      { src: FoodImg7, score: 5 },
      { src: FoodImg8, score: 10 },
      { src: FoodImg9, score: 20 },
      { src: FoodImg10, score: 5 },
      { src: FoodImg11, score: 10 },
      { src: FoodImg12, score: 20 },
    ]
    
    
    {/* 遊戲計分器 */}
    // 1. score state
      const [score, setScore] = useState(0);

      // 吃到食物時呼它：setScore(s => s + 增分)
      const addScore = delta => setScore(s => s + delta);

      // 倒數結束時的 handler
      const handleTimeUp = () => {
        if (score >= 100) {
          onWin();   // 分數 >= 100 → ResultPage01
          } else {
          onFail();  // 分數 < 100  → ResultPage02
        }
      };

      useEffect(() => {
        if (score >= 100) {
          onWin();
        }
      }, [score]);



      // 1. 這個 state 用來存當前要顯示的那四個食物
      const [foodSpawns, setFoodSpawns] = useState([]) 

      useEffect(() => {
        const showDuration = 3000; // 顯示 3 秒
        const gapDuration  = 200;  // 顯示結束後間隔 0.5 秒
        let hideTimer;
    
        const spawnFoods = () => {
          // 1. 隨機 4 個不同位置 (0~8)
          const positions = [];
          while (positions.length < 4) {
            const n = Math.floor(Math.random() * FOODROWS * FOODCOLS);
            if (!positions.includes(n)) positions.push(n);
          }
    
          // 2. 隨機抽 4 張「圖 + 分數」
          const picks = [...allMyFoods]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    
          // 3. 合併位置、圖、分數與真實像素 x,y
          const items = positions.map((posIdx, i) => {
            const row = Math.floor(posIdx / FOODCOLS);
            const col = posIdx % FOODCOLS;
            const x = foodColFrac[col] * FOODPANEL_W - FOOD_SIZE / 2;
            const y = foodRowFrac[row] * FOODPANEL_H - FOOD_SIZE / 2;
            return {
              id:    posIdx,
              src:   picks[i].src,
              score: picks[i].score,
              x, y
            };
          });
    
          setFoodSpawns(items);
    
          // 3 秒後自動清空
          hideTimer = setTimeout(() => setFoodSpawns([]), showDuration);
        };
    
        // 首次立即產生
        spawnFoods();
        // 每 (3 秒顯示 + 0.5 秒間隔) 召喚新一組
        const intervalId = setInterval(spawnFoods, showDuration + gapDuration);
    
        return () => {
          clearInterval(intervalId);
          clearTimeout(hideTimer);
        };
      }, []);
    
      // -------- 游標移動後檢測是否踩中食物 --------
      useEffect(() => {
        const idx = pos.row * FOODCOLS + pos.col;
        const hit = foodSpawns.find(item => item.id === idx);
        if (hit) {
          // 加分、立即把這顆食物從陣列裡移除
          setScore(s => {
            const newScore = s + hit.score;
            if (newScore >= 100) {
              onWin();            // 立刻成功，跳到 ResultPage01
            }
            return newScore;
          });
          setFoodSpawns(fs => fs.filter(f => f.id !== idx));
        }
      }, [pos]);

    
    
  
    
    return (
      <>

        <div style={{ 
          width: '100vw', 
          height: '100vh', 
          position: 'relative',
          overflow: 'hidden'
          }}>


          {/* 背景圖片 */}
          <div className="fixed inset-0 w-full h-full">
            <img
              src={BgImg7.src}
              alt="遊戲背景"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover', zIndex: 0 }}
            />
        </div>

        {/* 素材：桌椅底圖 */}
        <div style={{ 
            position: 'absolute',
            top: 0,
            bottom: 120,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'

          
          }}>

            <div style={{ 
              width: '100%',     
              maxWidth: 332,      
              height: 'auto',
            }}>
              
              <Image
                src={GroupImg7.src}
                alt="桌椅底圖"
                
                width={324}
                height={464}
                objectFit="contain"
                priority
              />

            </div>
         </div>

          {/* 素材：通知窗 */}
          <Image
                    src={GroupImg8.src}
                    alt="通知窗"
                    width={350}
                    height={750}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        objectFit: 'contain',
                        zIndex: 10
                    }}
                    priority
                />


              {/* 30 秒倒计时，结束直接判定失败 */}
              <CountdownTimer start={30} onComplete={() => {
                // 倒數歸零時，只有在低於 100 才判失敗
                  if (score < 100) onFail();
                 }} 
              />

            
              {/* 左下角分數顯示 */}
              <div style={{
                position: 'absolute',
                bottom: 80,
                left: '50%',
                transform: 'translateX(-125%)',
                background: 'rgba(0,0,0,0.4)',
                padding: '30px 12px',
                borderRadius: '4px',
                color: '#FFF',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                zIndex: '15'
              }}>
                Score：{score}
              </div>

            
            
        
        
           {/* 3×3 同學食物矩陣 */}
            <div
              style={{
                position: 'absolute',
                left:     '50%',
                top:      '50%',
                transform:'translate(-42%, -77%)',
                width:    FOODPANEL_W,
                height:   FOODPANEL_H,
              }}
            >
              {Array.from({ length: FOODROWS * FOODCOLS }).map((_, idx) => {
                const spawn = foodSpawns.find(f => f.id === idx)
                if (!spawn) return null

                return (
                  <Image
                    key={spawn.id}
                    src={spawn.src}
                    alt="food"
                    width={FOOD_SIZE}
                    height={FOOD_SIZE}
                    style={{
                      position: 'absolute',
                      left:     `${spawn.x}px`,
                      top:      `${spawn.y}px`,
                      zIndex:   5,
                    }}
                  />
                )
              })}
            </div>




            {/* 方向鍵 */}
          <button
           
            style={{ 
              position: 'absolute',  // ← 2. 轉成絕對定位
              bottom: '30px',
              left: '50%',  // ← 相對 control-panel 寬度的 70%
              transform: 'translate(-5%, -38%)',
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
              zIndex: 20,
              transition: 'transform 0.3s ease'
              
            }}
          >

            
            <div
                style={{
                display: 'flex',
                justifyContent: 'center',  // 水平置中
                width: '100%',             // 滿寬度可視需求調整
                }}
            >
              
                <Image
                src={UpImg.src}
                alt="上"
                width={45}
                height={45}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveUp}
                />
            </div>

            <div
              style={{
                display: 'flex',               // 啟用 flex
                flexDirection: 'row',          // 水平排列
                justifyContent: 'center',      // 水平置中（也可改成 space-between / space-around）
                alignItems: 'center',          // 垂直置中
                gap: '8px'                    // 三個按鈕之間的間距
                }}
            >
                        
              <Image
                src={LeftImg.src}
                alt="左"
                width={45}
                height={45}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveLeft}
              />

              <Image
                src={DownImg.src}
                alt="下"
                width={45}
                height={45}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveDown}
              />

              <Image
                src={RightImg.src}
                alt="右"
                width={45}
                height={45}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveRight}
              />
            </div>
            
          </button>


                 
                  
          
          {/* 游標面板容器：先置中 */}
          <div
            style={{
              position:  'absolute',
              left:      '50%',
              top:       '43%',
              transform: 'translate(-50%, -50%)',
              width:     PANEL_W,
              height:    PANEL_H,
            }}
          >


          {/* 只留一個游標 */}
          <Image
            src={CursorImg}
            alt="游標"
            width={CURSOR_SIZE}
            height={CURSOR_SIZE}
            style={{
              position: 'absolute',
              left:     x,
              top:      y,
              zIndex:   5,
            }}
          />
            </div>

            
    </div>

      </>
    );
  }