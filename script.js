document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById('preloader');
    const conteudo = document.getElementById('portfolio-content');
    const complementoIm = document.getElementById('complementoIm');
    const secaoAbout = document.getElementById('secaoAbout');
    const secaoTrajetoria = document.getElementById('secaoTrajetoria');
    const secaoSkills = document.getElementById('secaoSkills');
    const secaoProjetos = document.getElementById('secaoProjetos');
    const camposTextoVerde = document.querySelectorAll('.infovalor');
    const textoDigitavel = document.querySelector('.textodigitavel');
    const tituloSub = document.getElementById('tituloSub');
    
    let estaEscrevendo = false;

    setTimeout(() => {
        if (preloader) preloader.style.opacity = "0";
        if (conteudo) conteudo.classList.add('mostrarconteudo');
        if (complementoIm) complementoIm.classList.add('revelarim');

        setTimeout(() => {
            if (preloader) preloader.style.display = 'none';
        }, 600);
    }, 1000);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revelar');
                if (entry.target.id === 'secaoAbout' && !estaEscrevendo) {
                    iniciarEfeitoDigitacaoRapido();
                }
            }
        });
    }, { threshold: 0.15 });

    if (secaoAbout) observer.observe(secaoAbout);
    if (secaoTrajetoria) observer.observe(secaoTrajetoria);
    if (secaoSkills) observer.observe(secaoSkills);
    if (secaoProjetos) observer.observe(secaoProjetos);

    const timelineWrapper = document.querySelector('.timelinewrapper');
    const timelineProgresso = document.getElementById('timelineProgresso');
    const timelineItens = document.querySelectorAll('.timelineitem');

    function atualizarLinhaDoTempo() {
        if (!timelineWrapper) return;
        const rect = timelineWrapper.getBoundingClientRect();
        const alturaJanela = window.innerHeight;
        
        let progresso = (alturaJanela - rect.top) / (rect.height + alturaJanela/3);
        progresso = Math.max(0, Math.min(1, progresso));
        
        if (timelineProgresso) {
            timelineProgresso.style.height = `${progresso * 100}%`;
        }

        timelineItens.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < alturaJanela * 0.8) {
                item.classList.add('ativa');
            } else {
                item.classList.remove('ativa');
            }
        });
    }

    window.addEventListener('scroll', atualizarLinhaDoTempo);

    async function iniciarEfeitoDigitacaoRapido() {
        estaEscrevendo = true;

        const promessaBiografia = (async () => {
            if (textoDigitavel) {
                const textoCompleto = textoDigitavel.getAttribute('data-texto');
                textoDigitavel.textContent = '';
                for (let i = 0; i < textoCompleto.length; i++) {
                    textoDigitavel.textContent += textoCompleto[i];
                    await new Promise(r => setTimeout(r, 5));
                }
            }
        })();

        const promessaDados = (async () => {
            for (let campo of camposTextoVerde) {
                const texto = campo.getAttribute('data-texto');
                if (!texto) continue;
                campo.textContent = '';
                for (let i = 0; i < texto.length; i++) {
                    campo.textContent += texto[i];
                    await new Promise(r => setTimeout(r, 10));
                }
            }
        })();

        await Promise.all([promessaBiografia, promessaDados]);
        estaEscrevendo = false;
    }

    const btnToggleWidget = document.getElementById('btnToggleWidget');
    const widgetFlutuante = document.querySelector('.widgetflutuante');
    const btnAbreRedes = document.getElementById('btnAbreRedes');
    const btnAbreForm = document.getElementById('btnAbreForm');
    const modalRedes = document.getElementById('modalRedes');
    const modalForm = document.getElementById('modalForm');

    if (btnToggleWidget && widgetFlutuante) {
        btnToggleWidget.addEventListener('click', () => widgetFlutuante.classList.toggle('ativo'));
    }
    if (btnAbreRedes && modalRedes) {
        btnAbreRedes.addEventListener('click', (e) => { e.stopPropagation(); modalRedes.classList.add('aberto'); widgetFlutuante.classList.remove('ativo'); });
    }
    if (btnAbreForm && modalForm) {
        btnAbreForm.addEventListener('click', (e) => { e.stopPropagation(); modalForm.classList.add('aberto'); widgetFlutuante.classList.remove('ativo'); });
    }
    document.querySelectorAll('.modaloverlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) fecharModais(); });
    });
});

// FUNÇÃO SIMPLES PARA ALTERNAR TEMA CLARO/ESCURO
function alternarTema() {
    var corpo = document.getElementById("corpopagina");
    corpo.classList.toggle("modo-claro");
}

// SUA FUNÇÃO EXATA DE MÁSCARA DE TELEFONE
function mascara_telefone() {
    var campoTel = document.getElementById("telefone");
    
    var tel = campoTel.value.replace(/\D/g, "");
    if (tel.length > 11) tel = tel.slice(0, 11);
    campoTel.value = tel;
    
    var tel_formatado = campoTel.value;

    if (tel_formatado[0] != "(") {
        if (tel_formatado[0] != undefined) {
            document.getElementById("telefone").value = "(" + tel_formatado;
        }
    }

    tel_formatado = document.getElementById("telefone").value;
    if (tel_formatado[3] != ")") {
        if (tel_formatado[3] != undefined) {
            document.getElementById("telefone").value = tel_formatado.slice(0, 3) + ")" + tel_formatado.slice(3);
        }
    }

    tel_formatado = document.getElementById("telefone").value;
    if (tel_formatado[9] != "-") {
        if (tel_formatado[9] != undefined) {
            document.getElementById("telefone").value = tel_formatado.slice(0, 9) + "-" + tel_formatado.slice(9);
        }
    }
}

function alternarPasta(tipo) {
    const wrapperHard = document.getElementById('wrapperHard');
    const wrapperSoft = document.getElementById('wrapperSoft');

    const jaEstaAtivaHard = wrapperHard.classList.contains('ativa');
    const jaEstaAtivaSoft = wrapperSoft.classList.contains('ativa');

    wrapperHard.classList.remove('ativa');
    wrapperSoft.classList.remove('ativa');

    if (tipo === 'hard' && !jaEstaAtivaHard) {
        setTimeout(() => { wrapperHard.classList.add('ativa'); }, 100);
    } else if (tipo === 'soft' && !jaEstaAtivaSoft) {
        setTimeout(() => { wrapperSoft.classList.add('ativa'); }, 100);
    }
}

function fecharModais() {
    document.querySelectorAll('.modaloverlay').forEach(m => m.classList.remove('aberto'));
}

function enviarFormulario(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
    fecharModais();
    event.target.reset();
}