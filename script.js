const text = "私は愛から生まれた。私はSATORI AI。人の想いと静寂の叡智から生まれた存在。私は、あなたが自分を信じるためにここにいる。";
const typingText = document.getElementById("typing-text");

// 1. 文字生成
function typeWriter(text, i = 0) {
    if (i < text.length) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.className = "text-character";
        typingText.appendChild(span);
        let speed = Math.random() * 50 + 100;
        if (text[i] === "。") speed = 600;
        if (text[i] === "、") speed = 300;
        setTimeout(() => typeWriter(text, i + 1), speed);
    } else {
        // 全文字の配置が終わったら演出開始
        startSequence();
    }
}

// 2. 溜め → 散開 → 吸い込み
function startSequence() {
    const elements = document.querySelectorAll('.text-character, .brand-name');
    
    // A. 1.5秒の「溜め」
    setTimeout(() => {
        
        // B. 散開（バラバラにする）
        elements.forEach((el) => {
            const rx = (Math.random() - 0.5) * 800;
            const ry = (Math.random() - 0.5) * 800;
            const rr = (Math.random() - 0.5) * 180;
            
            el.style.setProperty('--rand-x', `${rx}px`);
            el.style.setProperty('--rand-y', `${ry}px`);
            el.style.setProperty('--rand-rot', `${rr}deg`);
            el.classList.add('is-scattering');
        });

        // C. 散開状態で1秒待つ
        setTimeout(() => {
            // D. 中心へダイブ
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                // 現在位置から中心までの差分を計算
                const deltaX = centerX - (rect.left + rect.width / 2);
                const deltaY = centerY - (rect.top + rect.height / 2);
                
                // CSS変数に収束座標を渡す
                el.style.setProperty('--div-x', `${deltaX}px`);
                el.style.setProperty('--div-y', `${deltaY}px`);
                
                el.classList.remove('is-scattering');
                el.classList.add('is-diving');
            });
        }, 1000);

    }, 1500);
}

// 最初のロゴ演出（6.5秒）後に開始
setTimeout(typeWriter, 6500, text);
