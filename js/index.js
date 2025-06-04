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

setInterval(spawnCode, 150)

function openNav(name)
{ 
    var x = document.getElementById('navigation')
    var y = document.getElementById('threeline-icon')
    var z = document.getElementById('conteudoMove')
    
    if (x.className === 'navigation') {
        x.className += ' menujs'
        y.innerHTML = '&Cross;'
        z.className += ' mainAnimeOn'
    } else {
        x.className = 'navigation'
        y.innerHTML =  'Menu &#9776;'
        z.className = name
    }
}