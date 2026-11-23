// Data Default Konten Slide
let slideData = {
    titles: [
        "Hai Sayangku! 💌",
        "Makasih Ya... 🧸",
        "Fun Fact Hari Ini 🐰",
        "Jujur Ya... 🥺",
        "Yeay! I Love You! 🎉❤️"
    ],
    messages: [
        "Aku bikin hadiah kecil ini khusus buat kamu. Klik tombol di bawah pelan-pelan ya, ada sesuatu yang mau aku bilang...",
        "Terima kasih sudah hadir di hidupku, selalu sabar ngadepin tingkahku, dan bikin hari-hariku jauh lebih berwarna.",
        "Kamu tahu nggak bedanya kamu sama WiFi? Kalau WiFi nyambungnya ke HP, kalau kamu nyambungnya langsung ke hatiku. Eaaa~",
        "Kamu sayang banget nggak sama aku? Awas salah pencet tombolnya ya!",
        "Makasih sudah milih sayang sama aku! Semoga kita selalu bareng, makin bahagia, dan saling jaga selamanya. Love you to the moon and back! ❤️"
    ]
};

let currentSlide = 0;
let typingTimer = null;
let dodgeCount = 0;
let yesScale = 1;

const funnyHints = [
    "Eits, nggak kena! 😜",
    "Tombolnya licin ya? Coba yang pink aja!",
    "Wlee, nggak bisa dipencet! 🏃💨",
    "Udah nyerah aja, pencet 'Sayang Banget'!",
    "Tombol 'Enggak' lagi cuti hari ini 😂"
];

// Inisialisasi Hati Melayang di Latar
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const emojis = ['❤️', '💖', '💕', '🌸', '✨', '💗'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
        heart.style.fontSize = (Math.random() * 14 + 16) + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 9000);
    }, 600);
}

// Efek Animasi Judul Bergelombang
function applyWaveTitle(elementId, text) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    [...text].forEach((char, idx) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = (idx * 0.08) + 's';
        el.appendChild(span);
    });
}

// Efek Ketik Kata-Kata (Typewriter)
function typeMessage(elementId, text) {
    clearInterval(typingTimer);
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;
    typingTimer = setInterval(() => {
        if (i < text.length) {
            el.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
            i++;
        } else {
            clearInterval(typingTimer);
            el.innerHTML = text;
        }
    }, 32);
}

// Menampilkan Slide Tertentu
function showSlide(index) {
    document.querySelectorAll('.slide').forEach((s, idx) => {
        s.classList.toggle('active', idx === index);
    });
    document.querySelectorAll('.dot').forEach((d, idx) => {
        d.classList.toggle('active', idx === index);
    });

    if (index === 0) {
        applyWaveTitle('title-0', slideData.titles[0]);
    } else {
        document.getElementById(`title-${index}`).innerText = slideData.titles[index];
    }

    typeMessage(`msg-${index}`, slideData.messages[index]);
}

function nextSlide() {
    if (!isPlayingMusic && currentSlide === 0) {
        toggleMusic(true); // Otomatis nyalakan musik lembut saat klik pertama
    }
    if (currentSlide < 4) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function restartSlides() {
    currentSlide = 0;
    dodgeCount = 0;
    yesScale = 1;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    yesBtn.style.transform = 'scale(1)';
    noBtn.style.transform = 'translate(0, 0)';
    document.getElementById('funnyHint').innerText = '';
    showSlide(0);
}

// Interaksi Tombol Menghindar di Slide 4
function dodgeButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const hint = document.getElementById('funnyHint');

    const maxX = 110;
    const maxY = 65;
    const randX = (Math.random() * 2 - 1) * maxX;
    const randY = (Math.random() * 2 - 1) * maxY;

    noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
    
    yesScale += 0.14;
    yesBtn.style.transform = `scale(${Math.min(yesScale, 1.85)})`;

    hint.innerText = funnyHints[dodgeCount % funnyHints.length];
    dodgeCount++;
}

function acceptLove() {
    currentSlide = 4;
    showSlide(4);
    launchConfetti();
}

// Efek Confetti Meriah
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ff4d6d', '#ff8fa3', '#ffb703', '#8338ec', '#06d6a0', '#ff0a54'];

    for (let i = 0; i < 130; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 6,
            h: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            angle: Math.random() * 360,
            spin: Math.random() * 6 - 3
        });
    }

    let frame = 0;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.angle += p.spin;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        frame++;
        if (frame < 240) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animateConfetti();
}

// Generator Musik Kotak Musik Romantis (Web Audio API - Tanpa File MP3)
let audioCtx = null;
let isPlayingMusic = false;
let musicInterval = null;

const melodyNotes = [
    523.25, 659.25, 783.99, 1046.50, // C5 E5 G5 C6
    880.00, 783.99, 659.25, 587.33,  // A5 G5 E5 D5
    698.46, 880.00, 1046.50, 987.77, // F5 A5 C6 B5
    783.99, 659.25, 587.33, 523.25   // G5 E5 D5 C5
];
let noteIdx = 0;

function playMusicBoxNote(freq) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.15);
}

function toggleMusic(forcePlay = false) {
    const label = document.getElementById('musicLabel');
    const icon = document.getElementById('musicIcon');

    if (isPlayingMusic && !forcePlay) {
        isPlayingMusic = false;
        clearInterval(musicInterval);
        label.innerText = "Putar Musik";
        icon.innerText = "🎵";
        return;
    }

    if (!isPlayingMusic) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isPlayingMusic = true;
        label.innerText = "Musik Aktif";
        icon.innerText = "🎶";
        musicInterval = setInterval(() => {
            playMusicBoxNote(melodyNotes[noteIdx % melodyNotes.length]);
            noteIdx++;
        }, 550);
    }
}

// Fitur Modal Edit Pesan
function openModal() {
    document.getElementById('inputTitle0').value = slideData.titles[0];
    document.getElementById('inputMsg0').value = slideData.messages[0];
    document.getElementById('inputMsg1').value = slideData.messages[1];
    document.getElementById('inputMsg2').value = slideData.messages[2];
    document.getElementById('inputMsg3').value = slideData.messages[3];
    document.getElementById('inputMsg4').value = slideData.messages[4];
    document.getElementById('editModal').classList.add('open');
}

function closeModal() {
    document.getElementById('editModal').classList.remove('open');
}

function saveCustomMessages() {
    slideData.titles[0] = document.getElementById('inputTitle0').value || slideData.titles[0];
    slideData.messages[0] = document.getElementById('inputMsg0').value || slideData.messages[0];
    slideData.messages[1] = document.getElementById('inputMsg1').value || slideData.messages[1];
    slideData.messages[2] = document.getElementById('inputMsg2').value || slideData.messages[2];
    slideData.messages[3] = document.getElementById('inputMsg3').value || slideData.messages[3];
    slideData.messages[4] = document.getElementById('inputMsg4').value || slideData.messages[4];
    closeModal();
    showSlide(currentSlide);
}

// Jalankan Saat Halaman Dimuat
window.onload = () => {
    createFloatingHearts();
    showSlide(0);
};