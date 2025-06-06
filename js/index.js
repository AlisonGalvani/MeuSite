const codeLines = [
    'const express = require("express");',
    'const app = express();',
    'app.get("/", (req, res) => {',
    '  res.send("Bem-vindo ao meu portfólio!");',
    '});',
    'app.listen(3000, () => { console.log("Servidor rodando na porta 3000") });',
    'function soma(a, b) { return a + b; }',
    'const nome = "Alison";',
    'const sobrenome = "Galvani";',
    'let senioridade = "Senior";',
    'function nome_e_sobrenome(nome, sobrenome) { return nome + " " + sobrenome; }',
    'let projetos = ["Site Pessoal", "API NodeJS", "Dashboard"];',
    'let habilidades = ["NodeJS", "PHP", "SQL", "React", "VanillaJS", "JavaScript", "HTML", "CSS", "Git"];',
    'console.log("Iniciando sistema...");'
]

function spawnCode() {
    const codeBg = document.getElementById('code-bg')
    const div = document.createElement('div')
    div.className = 'code-snippet'
    div.textContent = codeLines[Math.floor(Math.random() * codeLines.length)]
    div.style.top = Math.random() * window.innerHeight + 'px'
    div.style.left = Math.random() * window.innerWidth + 'px'
    div.style.animationDuration = 2 + Math.random() * 3 + 's'
    codeBg.appendChild(div)
    setTimeout(() => div.remove(), 10000)
}
function animation2Start() {
    setInterval(spawnCode, 150)
}


function animationStart() {
    const canvas = document.getElementById('matrix')
    const ctx = canvas.getContext('2d')

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    setInterval(drawMatrix, 33, ctx, canvas, drops, fontSize)
}

function drawMatrix(ctx, canvas, drops, fontSize) {
    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#05f2db'
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
        }

        drops[i]++
    }
}

function openNav() {
    var x = document.getElementsByTagName('nav')[0]
    var y = document.getElementById('threeline-icon')

    if (x.className === 'navigation') {
        x.className += ' menujs mainAnimeOn'
        y.innerHTML = '&Cross;'
    } else {
        x.className = 'menujs mainAnimeOff'
        y.innerHTML = 'Menu &#9776;'

        setTimeout(() => {
            x.className = 'navigation'
        }, 1500)
    }
}