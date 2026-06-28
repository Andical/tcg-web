// --- MOBILE MENU LOGIC ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
    } else {
        menu.classList.add('translate-x-full');
    }
}

// --- TRADUCCIONES ---
const TEXTS = {
    es: {
        nav: {
            info: "Información del Juego",
            comm: "Comunidad",
            creator: "El Creador",
            lang: "ES"
        },
        hero: {
            desc: "Un nuevo mundo de cartas Online abre sus puertas. Lidera ejércitos en tierras devastadas. Elige tu color: Blanco, Negro, Verde, Azul, Rojo o combínalos a tu gusto.",
            steam: "Steam",
            steamSub: "Próximamente",
            itch: "Itch.io",
            itchSub: "Web / PC",
            onlineNum: "ONLINE",
            onlineLbl: "PvP & PvE",
            factions: "FACCIONES",
            cards: "CARTAS",
            fair: "JUEGO JUSTO"
        },
        features: {
            title: "EL ARTE DE LA GUERRA OSCURA",
            ecoTitle: "FORJA Y COLECCIONA",
            ecoDesc: "Consigue cartas jugando. Farmea recursos en batalla, craftea criaturas legendarias, hechizos poderosos y completa tu colección sin barreras de pago.",
            modeTitle: "MODOS DE GUERRA",
            modeDesc: "Domina el PvP Clasificatorio, sobrevive a Incursiones PvE cooperativas y descubre los secretos del mundo en el Modo Historia.",
            custTitle: "PERSONALIZACIÓN TOTAL",
            custDesc: "Tu estilo, tu reino. Personaliza dorsos de cartas, avatares y decora tu campo de batalla con trofeos de guerra."
        },
        auth: {
            switchLogin: "Ya tengo cuenta",
            switchRegister: "No tengo cuenta",
            titleLogin: "ACCESO COMANDANTE",
            titleRegister: "NUEVO RECLUTA",
            placeholderEmail: "Correo Electrónico",
            placeholderUser: "Nombre de Usuario",
            placeholderPass: "Contraseña",
            remember: "Recordarme",
            forgot: "¿Olvidaste la contraseña?",
            submitLogin: "Entrar al Frente",
            submitRegister: "Únete a la Guerra"
        },
        community: {
            title: "COMUNIDAD",
            discordTitle: "DISCORD",
            discordDesc: "Únete al consejo. Códigos gratis semanales, eventos exclusivos y noticias del frente.",
            instaTitle: "INSTAGRAM",
            instaDesc: "El arte de la guerra. Revelación de nuevas cartas, novedades y diseños visuales.",
            ytTitle: "YOUTUBE",
            ytDesc: "Archivos visuales. Devlogs de desarrollo, tutoriales de estrategia y trailers cinemáticos."
        },
        creator: {
            sub: 'ÁNGEL JIMÉNEZ "UROMIR" - ESPAÑA',
            title: "EL FORJADOR",
            bio: '"Soy un verdadero amante de los juegos de cartas. He pasado media vida recorriendo los planos de Magic y estudiando cada estrategia existente en el género. Pero siempre sentí que faltaba algo... una oscuridad más profunda, un desafío mayor. Por eso he creado Ravens of War. He volcado toda mi experiencia para forjar un juego único, sin piedad, diseñado por y para jugadores que buscan la batalla definitiva. Podéis encontrarme en el juego y en Discord bajo el nombre de Uromir."',
            cta: "Contactar al Mando"
        },
        footer: "Todos los derechos reservados. Fantasy Dungeon Studio."
    },
    en: {
        nav: {
            info: "Game Info",
            comm: "Community",
            creator: "The Creator",
            lang: "EN"
        },
        hero: {
            desc: "A new world of Online cards opens its gates. Lead armies in ravaged lands. Choose your color: White, Black, Green, Blue, Red, or combine them as you wish.",
            steam: "Steam",
            steamSub: "Coming Soon",
            itch: "Itch.io",
            itchSub: "Web / PC",
            onlineNum: "ONLINE",
            onlineLbl: "PvP & PvE",
            factions: "FACTIONS",
            cards: "CARDS",
            fair: "FAIR PLAY"
        },
        features: {
            title: "THE ART OF DARK WAR",
            ecoTitle: "FORGE & COLLECT",
            ecoDesc: "Earn cards by playing. Farm resources in battle, craft legendary creatures, powerful spells, and complete your collection with no paywalls.",
            modeTitle: "WAR MODES",
            modeDesc: "Dominate Ranked PvP, survive cooperative PvE Raids, and uncover world secrets in Story Mode.",
            custTitle: "TOTAL CUSTOMIZATION",
            custDesc: "Your style, your realm. Customize card backs, avatars, and decorate your battlefield with war trophies.",
        },
        auth: {
            switchLogin: "I have an account",
            switchRegister: "No account",
            titleLogin: "COMMANDER ACCESS",
            titleRegister: "NEW RECRUIT",
            placeholderEmail: "Email Address",
            placeholderUser: "Username",
            placeholderPass: "Password",
            remember: "Remember me",
            forgot: "Forgot password?",
            submitLogin: "Enter Front",
            submitRegister: "Join the War"
        },
        community: {
            title: "COMMUNITY",
            discordTitle: "DISCORD",
            discordDesc: "Join the council. Weekly free codes, exclusive events, and news from the front.",
            instaTitle: "INSTAGRAM",
            instaDesc: "The art of war. New card reveals, visual updates, and concept art.",
            ytTitle: "YOUTUBE",
            ytDesc: "Visual archives. Development devlogs, strategy tutorials, and cinematic trailers."
        },
        creator: {
            sub: 'ÁNGEL JIMÉNEZ "UROMIR" - SPAIN',
            title: "THE FORGER",
            bio: '"I am a true lover of card games. I have spent half my life traversing the planes of Magic and studying every strategy in the genre. But I always felt something was missing... a deeper darkness, a greater challenge. That is why I created Ravens of War. I have poured all my experience into forging a unique, merciless game, designed by and for players seeking the ultimate battle. You can find me in-game and on Discord as Uromir."',
            cta: "Contact Command"
        },
        footer: "All rights reserved. Fantasy Dungeon Studio."
    }
};

let currentLang = 'es';
let isLoginMode = false;

// Init Icons
lucide.createIcons();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('bg-black/90', 'shadow-lg');
    } else {
        nav.classList.remove('bg-black/90', 'shadow-lg');
    }
});

// Toggle Language
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    updateTexts();
}

function updateTexts() {
    const t = TEXTS[currentLang];

    // Nav
    document.getElementById('nav-info').innerText = t.nav.info;
    document.getElementById('nav-community').innerText = t.nav.comm;
    document.getElementById('nav-creator').innerText = t.nav.creator;
    document.getElementById('current-lang').innerText = t.nav.lang;

    // Hero
    document.getElementById('hero-desc').innerText = t.hero.desc;
    document.getElementById('sub-steam').innerText = t.hero.steamSub;
    document.getElementById('sub-itch').innerText = t.hero.itchSub;

    document.getElementById('stat-online-num').innerText = t.hero.onlineNum;
    document.getElementById('stat-online-lbl').innerText = t.hero.onlineLbl;
    document.getElementById('stat-factions').innerText = t.hero.factions;
    document.getElementById('stat-cards').innerText = t.hero.cards;
    document.getElementById('stat-fair').innerText = t.hero.fair;

    // Features
    document.getElementById('features-title').innerText = t.features.title;
    document.getElementById('feat-eco-title').innerText = t.features.ecoTitle;
    document.getElementById('feat-eco-desc').innerText = t.features.ecoDesc;
    document.getElementById('feat-mode-title').innerText = t.features.modeTitle;
    document.getElementById('feat-mode-desc').innerText = t.features.modeDesc;
    document.getElementById('feat-cust-title').innerText = t.features.custTitle;
    document.getElementById('feat-cust-desc').innerText = t.features.custDesc;

    // Auth - Call render to update titles and button
    renderAuthUI();

    // Auth Static
    document.getElementById('txt-switch-login').innerText = t.auth.switchLogin;
    document.getElementById('txt-switch-register').innerText = t.auth.switchRegister;
    document.getElementById('input-email').placeholder = t.auth.placeholderEmail;
    document.getElementById('input-username').placeholder = t.auth.placeholderUser;
    document.getElementById('input-password').placeholder = t.auth.placeholderPass;
    document.getElementById('txt-remember').innerText = t.auth.remember;
    document.getElementById('txt-forgot').innerText = t.auth.forgot;

    // Community
    document.getElementById('community-title').innerText = t.community.title;
    document.getElementById('card-discord-title').innerText = t.community.discordTitle;
    document.getElementById('card-discord-desc').innerText = t.community.discordDesc;
    document.getElementById('card-instagram-title').innerText = t.community.instaTitle;
    document.getElementById('card-instagram-desc').innerText = t.community.instaDesc;
    document.getElementById('card-youtube-title').innerText = t.community.ytTitle;
    document.getElementById('card-youtube-desc').innerText = t.community.ytDesc;

    // Creator
    document.getElementById('creator-subtitle').innerText = t.creator.sub;
    document.getElementById('creator-title').innerText = t.creator.title;
    document.getElementById('creator-bio').innerText = t.creator.bio;
    document.getElementById('creator-cta').innerText = t.creator.cta;

    // Footer
    document.getElementById('footer-rights').innerText = t.footer;
}

// Auth Switcher
function switchAuth(mode) {
    isLoginMode = mode === 'login';
    renderAuthUI();
}

function renderAuthUI() {
    const t = TEXTS[currentLang].auth;
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('btn-submit');
    const indicator = document.getElementById('tab-indicator');
    const emailField = document.getElementById('field-email');
    const loginExtras = document.getElementById('login-extras');

    // Tabs Styling
    if (isLoginMode) {
        document.getElementById('tab-login').classList.add('text-white');
        document.getElementById('tab-login').classList.remove('text-gray-400');
        document.getElementById('tab-register').classList.remove('text-white');
        document.getElementById('tab-register').classList.add('text-gray-400');

        // Mover indicador (simple JS animation logic)
        document.getElementById('tab-login').appendChild(indicator);

        title.innerText = t.titleLogin;
        btn.innerText = t.submitLogin;
        emailField.style.display = 'none';
        loginExtras.classList.remove('hidden');
    } else {
        document.getElementById('tab-register').classList.add('text-white');
        document.getElementById('tab-register').classList.remove('text-gray-400');
        document.getElementById('tab-login').classList.remove('text-white');
        document.getElementById('tab-login').classList.add('text-gray-400');

        document.getElementById('tab-register').appendChild(indicator);

        title.innerText = t.titleRegister;
        btn.innerText = t.submitRegister;
        emailField.style.display = 'block';
        loginExtras.classList.add('hidden');
    }
}

// Scroll Helper
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// --- BACKEND CONNECTION (PHP) ---
async function enviarRegistro() {
    const btn = document.getElementById('btn-submit');
    const status = document.getElementById('form-status');
    const originalText = btn.innerText;

    // Get values
    const username = document.getElementById('input-username').value;
    const password = document.getElementById('input-password').value;
    const email = isLoginMode ? '' : document.getElementById('input-email').value;

    // Simple validation
    if (!username || !password || (!isLoginMode && !email)) {
        status.innerText = "Por favor, completa todos los campos.";
        status.className = 'text-center text-xs mt-0.5 h-4 font-bold tracking-widest text-blood shrink-0';
        return;
    }

    // Loading state
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');
    status.innerText = "CONECTANDO CON EL COMANDO...";
    status.className = 'text-center text-xs mt-0.5 h-4 font-bold tracking-widest text-gold shrink-0 animate-pulse';

    try {
        // Determine endpoint action
        const action = isLoginMode ? 'login' : 'register';

        // Send to PHP
        const response = await fetch('register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: action,
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {
            status.className = 'text-center text-xs mt-0.5 h-4 font-bold tracking-widest text-green-500 shrink-0';
            status.innerText = isLoginMode ? "¡BIENVENIDO, COMANDANTE!" : "¡RECLUTAMIENTO COMPLETADO!";

            // Optional: Redirect or clear form
            if (!isLoginMode) {
                setTimeout(() => {
                    switchAuth('login');
                    status.innerText = '';
                    document.getElementById('auth-form').reset();
                }, 2000);
            }
        } else {
            throw new Error(data.message || "Error desconocido");
        }

    } catch (error) {
        console.error(error);
        status.className = 'text-center text-xs mt-0.5 h-4 font-bold tracking-widest text-blood shrink-0';
        status.innerText = error.message.toUpperCase();
    } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}
