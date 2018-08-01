
function openNav()
{ 
    var x = document.getElementById('navigation');
    var y = document.getElementById('threeline-icon');
    var z = document.getElementById('capa');
    
    if (x.className === 'navigation') {
            x.className += ' menujs';
            y.innerHTML = "&Cross;";
            z.className += ' capaAnime'
    } else {
        x.className = 'navigation';
        y.innerHTML =  'Menu &#9776;';
        z.className = 'capa'
    }
}