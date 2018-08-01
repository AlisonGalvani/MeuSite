
function openNav()
{ 
    var x = document.getElementById('navigation');
    var y = document.getElementById('threeline-icon');
    
    if (x.className === 'navigation') {
            x.className += ' menujs';
            y.innerHTML = "&Cross;";
    } else {
        x.className = 'navigation';
        y.innerHTML =  'Menu &#9776;';
    }
}