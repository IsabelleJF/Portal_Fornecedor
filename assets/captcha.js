let captchaResult;
let isMarjonUser = false; // Variável para verificar se o usuário é da Marjon

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    captchaResult = num1 + num2;
    document.getElementById('captcha-question').innerText = `${num1} + ${num2} = ?`;
}

function showSection(section) {
    const sections = ['home', 'login', 'dashboard', 'report', 'vpc', 'stores', 'comercial', 'trade'];
    sections.forEach(s => {
        const sectionElement = document.getElementById(s);
        if (sectionElement) {
            sectionElement.classList.add('hidden');
        }
    });
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    if (section === 'login') generateCaptcha();

    // Verifica se o usuário é da Marjon para exibir conteúdo exclusivo nas seções
    if (section === 'stores') toggleContentVisibility('marjon-image');
    if (section === 'report') toggleContentVisibility('marjon-report');
    if (section === 'vpc') toggleContentVisibility('marjon-vpc');
}

function toggleContentVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isMarjonUser) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}
function sendEmail() {
    const subject = "Relatórios do Portal de Fornecedores";
    const body = `Olá,\n\nSegue o link para download dos relatórios:\n\n` +
        `1. Camas, Colchões e Travesseiros (MK): [Link para download](MARJOM%20(MK_CAMAS,%20COLCHOES%20E%20TRAVESSEIROS.xlsx)\n` +
        `2. Móveis: [Link para download](MARJOM_MOVEIS.xlsx)\n` +
        `3. Camas, Colchões e Travesseiros: [Link para download](MARJOM_CAMAS,%20COLCHOES%20E%20TRAVESSEIROS.xlsx)\n\n` +
        `Atenciosamente,\nPortal de Fornecedores`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function login() {
    const cnpjInput = document.getElementById('cnpj').value;
    const captchaAnswer = parseInt(document.getElementById('captcha-answer').value);

    if (captchaAnswer !== captchaResult) {
        alert("Captcha incorreto. Tente novamente.");
        generateCaptcha();
        return;
    }

    isMarjonUser = (cnpjInput === "03387691000116"); // Marca se o usuário é da Marjon
    
    if (isMarjonUser) {
        alert("Bem-vindo, Marjom!");
    } else {
        alert("Bem-vindo!");
    }

    showSection('dashboard');
}