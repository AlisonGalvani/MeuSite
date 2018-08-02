
function openNav(name)
{ 
    var x = document.getElementById('navigation');
    var y = document.getElementById('threeline-icon');
    var z = document.getElementById('conteudoMove');
    
    if (x.className === 'navigation') {
            x.className += ' menujs';
            y.innerHTML = "&Cross;";
            z.className += ' mainAnimeOn'
    } else {
        x.className = 'navigation';
        y.innerHTML =  'Menu &#9776;';
        z.className = name
    }
}