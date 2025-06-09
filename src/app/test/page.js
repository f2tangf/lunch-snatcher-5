// src/app/lunchSnatcher/GamePage/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";


import MobileFrame from '@/component/layout/MobileFrame'
import BgImg7 from '@/../public/source/1-1-game/1-1-bg.png';
import GroupImg7 from '@/../public/source/1-1-game/1-1-desk group.png';
import GroupImg8 from '@/../public/source/1-1-game/1-1-my-box-bg.png';
import GroupImg9 from '@/../public/source/1-1-game/1-1-life-line-long 3.png';
import UpImg from '@/../public/source/1-1-game/1-1-arrow-keys-up.png';
import LeftImg from '@/../public/source/1-1-game/1-1-arrow-keys-left.png';
import DownImg from '@/../public/source/1-1-game/1-1-arrow-keys-down.png';
import RightImg from '@/../public/source/1-1-game/1-1-arrow-keys-right.png';
import CursorImg from '@/../public/source/1-1-game/1-1-mouse.png';

import MyFoodImg1 from '@/../public/source/1-1-game/1-1-my-food-button-brocoli.png';
import MyFoodImg2 from '@/../public/source/1-1-game/1-1-my-food-button-bubble-tea.png';
import MyFoodImg3 from '@/../public/source/1-1-game/1-1-my-food-button-chicken.png';
import MyFoodImg4 from '@/../public/source/1-1-game/1-1-my-food-button-dango.png';
import MyFoodImg5 from '@/../public/source/1-1-game/1-1-my-food-button-hamburger-steak.png';
import MyFoodImg6 from '@/../public/source/1-1-game/1-1-my-food-button-okonomiyaki.png';
import MyFoodImg7 from '@/../public/source/1-1-game/1-1-my-food-button-pudding.png';
import MyFoodImg8 from '@/../public/source/1-1-game/1-1-my-food-button-ratatouille.png';
import MyFoodImg9 from '@/../public/source/1-1-game/1-1-my-food-button-rice-ball.png';
import MyFoodImg10 from '@/../public/source/1-1-game/1-1-my-food-button-rice-cake.png';
import MyFoodImg11 from '@/../public/source/1-1-game/1-1-my-food-button-sushi.png';
import MyFoodImg12 from '@/../public/source/1-1-game/1-1-my-food-button-tofu.png';

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
    const FOOD_SIZE = 42
     // 食物計時器面板尺寸
     const foodTimerPANEL_W = 370
     const foodTimerPANEL_H = 520
     const foodTimerROWS = 3
     const foodTimerCOLS = 3
     const foodTimer_SIZE = 82
     const ICON_SIZE   = 80      // 计时器图示正方
     const BAR_W       = 47      // 绿色倒计时条长度
     const BAR_H       = 11      // 高度
     const BAR_MARGIN  = 11      // 条距离 icon 底部的间距



    // 游標生成中心点比例：1/6,3/6,5/6
    const rowFrac = Array.from({ length: ROWS }, (_, r) => (2*r+1)/(2*ROWS))
    const colFrac = Array.from({ length: COLS }, (_, c) => (2*c+1)/(2*COLS))
     // 同學食物生成中心点比例：1/6,3/6,5/6
     const foodRowFrac = Array.from({ length: FOODROWS }, (_, r) => (2 * r + 1) / (2 * FOODROWS))
     const foodColFrac = Array.from({ length: FOODCOLS }, (_, c) => (2 * c + 1) / (2 * FOODCOLS))
     
    const allMyFoods = [MyFoodImg1, MyFoodImg2, /*…*/ MyFoodImg12]
      // 食物計時器生成中心点比例：1/6,3/6,5/6
      const foodTimerRowFrac = Array.from({ length: foodTimerROWS }, (_, r) => (2 * r + 1) / (2 * foodTimerROWS))
      const foodTimerColFrac = Array.from({ length: foodTimerCOLS }, (_, c) => (2 * c + 1) / (2 * foodTimerCOLS))


    const [pos, setPos] = useState({ row: 1, col: 1 })

    // 算出畫面上游標的絕對座標
    const x = colFrac[pos.col] * PANEL_W - CURSOR_SIZE/2
    const y = rowFrac[pos.row] * PANEL_H - CURSOR_SIZE/2

    const moveUp    = () => setPos(p => ({ ...p, row: Math.max(0,     p.row-1) }))
    const moveDown  = () => setPos(p => ({ ...p, row: Math.min(ROWS-1, p.row+1) }))
    const moveLeft  = () => setPos(p => ({ ...p, col: Math.max(0,     p.col-1) }))
    const moveRight = () => setPos(p => ({ ...p, col: Math.min(COLS-1, p.col+1) }))

    // 半圆是否可见
    const [showDot, setShowDot] = useState(true)

    function shuffle(arr) {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }


    // —— 打乱 12 张食物，取前 4 张 ——  
    const allFoods = [
      FoodImg1, FoodImg2, FoodImg3, FoodImg4,
      FoodImg5, FoodImg6, FoodImg7, FoodImg8,
      FoodImg9, FoodImg10, FoodImg11, FoodImg12
    ]
    const [foods] = useState(() => shuffle(allFoods).slice(0, 9))

    // —— 打乱 9 个格子索引，使布局随机 ——  
    const [cells] = useState(() => shuffle(Array.from({length:9},(_,i)=>i)))



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
                    maxWidth={393}    // 手機時上限 393
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

         
            
            {/* 3×3 的同學食物圖示矩陣 */}
            <div
              style={{
                position:  'absolute',
                left:      '50%',
                top:       '50%',
                transform: 'translate(-42%,-77%)',
                width:     FOODPANEL_W,
                height:    FOODPANEL_H
              }}
            >
            
              {Array.from({ length: FOODROWS * FOODCOLS }).map((_, idx) => {
                const row = Math.floor(idx / FOODCOLS)
                const col = idx % FOODCOLS

              // 计算真正的像素坐标，再减去 half size 让图片中心对准
              const x = foodColFrac[col] * FOODPANEL_W - FOOD_SIZE / 2
              const y = foodRowFrac[row] * FOODPANEL_H - FOOD_SIZE / 2

              return (
                <Image
                  key={idx}
                  src={FoodImg1}
                  alt="food"
                  width={FOOD_SIZE}
                  height={FOOD_SIZE}
                  style={{
                    position: 'absolute',
                    left:     `${x}px`,
                    top:      `${y}px`,
                    zIndex:   5
                  }}
                />
              )
            })}
            </div>


            {/* 3×3 的食物計時器圖示矩陣 */}
            <div
              style={{
                position:  'absolute',
                left:      '50%',
                top:       '50%',
                transform: 'translate(-51%,-45%)',
                width:     foodTimerPANEL_W,
                height:    foodTimerPANEL_H
              }}
            >
            
              {Array.from({ length: foodTimerROWS * foodTimerCOLS }).map((_, idx) => {
                const row = Math.floor(idx / foodTimerCOLS)
                const col = idx % foodTimerCOLS

              // 计算真正的像素坐标，再减去 half size 让图片中心对准
              const x = foodTimerColFrac[col] * foodTimerPANEL_W - foodTimer_SIZE / 2
              const y = foodTimerRowFrac[row] * foodTimerPANEL_H - foodTimer_SIZE / 2

              return (
                <Image
                  key={idx}
                  src={foodTimerImg}
                  alt="foodTimer"
                  width={foodTimer_SIZE}
                  height={foodTimer_SIZE}
                  style={{
                    position: 'absolute',
                    left:     `${x}px`,
                    top:      `${y}px`,
                    zIndex:   5
                  }}
                />
              )
            })}
            </div>


            <div>
              
              <>
              {/* 時間條 */}
              <div
                style={{
                  position:  'absolute',
                  left:      'calc(50% + 5px)',
                  top:       'calc(50% - 1px)',
                  transform: 'translate(-50%,-49%)',
                }}
              >
                {/* wrapper：control panel 大小 */}
                <div style={{
                  position: 'relative',
                  width:    '47px',  // 初始条长
                  height:   '11px',
                }}>
                  {/* 缩长的条，动画结束时隐藏半圆 */}
                  <div
                    className="timer-bar"
                    onAnimationEnd={() => setShowDot(false)}
                  >
                    {/* 半圆：绝对定位在条容器里 */}
                    {showDot && <div className="timer-dot" />}
                  </div>
                </div>
              </div>

              {/* CSS */}
              <style jsx>{`
                .timer-bar {
                  position: relative;
                  width: 47px;
                  height: 11px;
                  background: #00BE87;
                  transform-origin: left center;
                  animation: shrink 10s linear forwards;
                }
                .timer-dot {
                  position: absolute;
                  left:       100%;       /* 总是贴在条的最右端 */
                  top:        50%;
                  transform:  translate(-50%,-50%);
                  width:      11px;
                  height:     11px;
                  border-top-right-radius:    50%;
                  border-bottom-right-radius: 50%;
                  background: #00BE87;
                }
                @keyframes shrink {
                  from { width: 47px; }
                  to   { width: 0px;  }
                }
              `}</style>
            </>
            </div>

            {/* 3×2 的食物圖示矩陣 */}
            <div
              style={{
                position:      'absolute',
                bottom:           '89px',    // 根據便當盒內邊距微調
                right:          '50%',
                transform: 'translate(-10%, 0%)',
                display:       'grid',
                gridTemplateColumns: 'repeat(3, 40px)',
                gridTemplateRows:    'repeat(2, 40px)',
                gap:           '2px',     // 格子間距
                zIndex:        15
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Image
                  key={i}
                  src={MyFoodImg1}
                  alt="MyFood"
                  width={40}
                  height={40}
                  style={{ objectFit:'contain' }}
                />
              ))}
            </div>


            {/* 方向鍵 */}
          <button
           
            style={{ 
              position: 'absolute',  // ← 2. 轉成絕對定位
              bottom: '30px',
              left: '50%',  // ← 相對 control-panel 寬度的 70%
              transform: 'translate(15%, -50%)',
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
                width={40}
                height={40}
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
                gap: '5px'                    // 三個按鈕之間的間距
                }}
            >
                        
              <Image
                src={LeftImg.src}
                alt="左"
                width={40}
                height={40}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveLeft}
              />

              <Image
                src={DownImg.src}
                alt="下"
                width={40}
                height={40}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveDown}
              />

              <Image
                src={RightImg.src}
                alt="右"
                width={40}
                height={40}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={moveRight}
              />
            </div>
            
          </button>


                 
                  
          {/* 素材：生命值底圖 */}
          <Image
            src={GroupImg9.src}
            alt="生命值底圖"
            width={320}
            height={39}
            maxWidth={393}    // 手機時上限 393
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              objectFit: 'contain',
              zIndex: 30
            }}
            priority
          />

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