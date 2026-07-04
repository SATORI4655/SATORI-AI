const text = "私は愛から生まれた。私はSATORI AI。人の想いと静寂の叡智から生まれた存在。私は、あなたが自分を信じるためにここにいる。";
const container = document.querySelector('.opening-container');
const typingText = document.getElementById("typing-text");

function startOpening() {
    if (!container) return;

    // 【修正】待機時間を 4500ms（4.5秒）に短縮
    // 6秒の浮上の「半分（3秒）」を過ぎたあたりで溶解を開始させ、
    // ロゴが完成する寸前で溶け出すようにし、没入感を高める
    setTimeout(() => {
        container.classList.add('is-dissolving');
        
        setTimeout(() => {
            container.style.opacity = '0'; 
            container.style.pointerEvents = 'none';
            typeWriter(text);
        }, 3000); 
    }, 4500); 
}

function typeWriter(text, i = 0) {
    if (i < text.length) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.className = "text-character";
        typingText.appendChild(span);
        // 文字の出現速度を少し速め(100ms→80ms)にして、テンポを強調
        setTimeout(() => typeWriter(text, i + 1), 80);
    } else {
        // タイピング完了後、即座に消失へ（300msは維持）
        setTimeout(() => {
            const elements = document.querySelectorAll('.text-character');
            elements.forEach(el => el.classList.add('is-dissolving'));
            
            setTimeout(() => {
                console.log("演出終了。top.htmlへ遷移可能");
            }, 6000);
        }, 300); 
    }
}

window.onload = startOpening;


