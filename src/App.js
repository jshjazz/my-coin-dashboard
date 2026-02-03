import React, { useState, useEffect } from 'react';
import './App.css'; 
import { TrendingUp, MessageSquare, Target, Zap, Send, Activity, BarChart3 } from 'lucide-react';

function App() {
  // 실시간 가격 상태 관리
  const [prices, setPrices] = useState({ btc: '...', eth: '...', sol: '...' });

  // 바이낸스 실시간 시세 연동 (무료 API)
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
        const results = await Promise.all(
          symbols.map(s => fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${s}`).then(r => r.json()))
        );
        
        setPrices({
          btc: parseFloat(results[0].price).toLocaleString(),
          eth: parseFloat(results[1].price).toLocaleString(),
          sol: parseFloat(results[2].price).toLocaleString()
        });
      } catch (e) { console.error("가격 로드 실패"); }
    };

    fetchPrices();
    const timer = setInterval(fetchPrices, 3000); // 3초마다 갱신
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#0c1017', minHeight: '100vh', color: '#d1d4dc' }}>
      
      {/* 3단계: 실시간 전광판 (실제 데이터 연동) */}
      <div style={{ backgroundColor: '#131722', borderBottom: '1px solid #2a2e39', padding: '10px 20px', display: 'flex', gap: '40px', overflow: 'hidden', fontSize: '12px', fontWeight: 'bold' }}>
        <div style={{ color: '#00ff41' }}>BTC/USDT ${prices.btc} <span style={{fontSize: '10px'}}>LIVE</span></div>
        <div style={{ color: '#8ab4f8' }}>ETH/USDT ${prices.eth}</div>
        <div style={{ color: '#9d59ff' }}>SOL/USDT ${prices.sol}</div>
        <div style={{ color: '#ff9800', marginLeft: 'auto' }}>AI SIGNAL: STRONG ACCUMULATION</div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px', color: '#2962ff' }}>
            <Zap size={26} fill="#2962ff" /> AI INVESTMENT VIP
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '12px' }}>
            <Activity size={14} color="#00ff41" /> STATUS: CONNECTED
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '25px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* 실시간 차트 */}
            <section style={{ height: '500px', padding: '15px' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe title="TV" src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE%3ABTCUSDT&interval=D&theme=dark&style=1&locale=kr`} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
              </div>
            </section>

            {/* AI 대화창 (Grok이 실제 가격 언급) */}
            <section style={{ padding: '20px', height: '400px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '15px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="#2962ff" /> AI STRATEGY DEBATE
              </h2>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #ff9800' }}>
                  <span style={{ color: '#ff9800', fontWeight: 'bold' }}>Grok 🤖</span>
                  <p style={{ margin: '5px 0 0', fontSize: '14px', lineHeight: '1.6' }}>
                    야, 지금 비트 ${prices.btc}인 거 안 보여? 이더(${prices.eth})도 따라오고 있잖아. 형이 말했지, 지금 눈치 보면 평생 졸업 못 한다고. 롱 버튼 뽑아라! 🔥
                  </p>
                </div>
                <div style={{ backgroundColor: 'rgba(138, 180, 248, 0.1)', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #8ab4f8' }}>
                  <span style={{ color: '#8ab4f8', fontWeight: 'bold' }}>Gemini 💎</span>
                  <p style={{ margin: '5px 0 0', fontSize: '14px' }}>솔라나(${prices.sol})의 상승세가 무섭네요. 하지만 과매수 구간이니 주의가 필요합니다.</p>
                </div>
              </div>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <section style={{ textAlign: 'center', padding: '40px 20px', background: '#131722' }}>
              <p style={{ fontSize: '11px', color: '#5d606b', fontWeight: 'bold' }}>BUY STRENGTH</p>
              <p style={{ fontSize: '64px', fontWeight: '900', color: '#00ff41' }}>8.2</p>
            </section>
            
            <section style={{ border: '1px solid #2962ff', padding: '25px', background: '#131722' }}>
              <h2 style={{ color: '#2962ff', fontSize: '15px' }}><Target size={18} /> TARGET</h2>
              <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '10px', color: '#2962ff' }}>ENTRY POINT</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>$ {prices.btc}</p>
                <button style={{ width: '100%', backgroundColor: '#2962ff', color: 'white', border: 'none', padding: '15px', marginTop: '20px', borderRadius: '8px', fontWeight: 'bold' }}>EXECUTE NOW</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
