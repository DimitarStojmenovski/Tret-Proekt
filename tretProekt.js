$(function () {
    $('[data-toggle="popover"]').popover()
})


const allGames = gamesArray();
let filteredGames = allGames
const energyGames = allGames.filter(obj => obj.type == "energy")
const innovationGames = allGames.filter(obj => obj.type == "innovation")
const leadershipGames = allGames.filter(obj => obj.type == "leadership")
const actionGames = allGames.filter(obj => obj.type == "action")
const teamGames = allGames.filter(obj => obj.type == "team")

function initializeCount() {
    document.getElementById("energyCounter").innerHTML = `(${energyGames.length})`
    document.getElementById("innovationCounter").innerHTML = `(${innovationGames.length})`
    document.getElementById("leadershipCounter").innerHTML = `(${leadershipGames.length})`
    document.getElementById("actionCounter").innerHTML = `(${actionGames.length})`
    document.getElementById("teamCounter").innerHTML = `(${teamGames.length})`
    document.getElementById("allCounter").innerHTML = `(${allGames.length})`

}

var timeFilterSet = new Set();
var groupFilterSet = new Set();
var mainFilterSet = new Set();



initializeCount();
presentFilter();

// go top kopche

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// go top kopche



function filterMain(elem) {
    var txt = elem.textContent || elem.innerText;
    if (txt.startsWith("Сите")) {
        filteredGames = allGames;
        timeFilterSet = new Set();
        groupFilterSet = new Set();
        mainFilterSet = new Set();
        var selectorButtons = document.getElementsByClassName("mainSelector")
        for (let btn of selectorButtons) {
            if (btn == elem) {
                btn.classList.add('highlightedButton')
            } else {
                btn.classList.remove('highlightedButton');
            }
        }

        var timeButtons = document.getElementsByClassName("timeSelector")
        var groupButtons = document.getElementsByClassName("groupSelector")

        for (let btn of timeButtons) {
            btn.classList.remove('highlightedButton');
        }
        for (let btn of groupButtons) {
            btn.classList.remove('highlightedButton');
        }
    } else {
        elem.classList.toggle('highlightedButton')
        document.getElementById('allButton').classList.remove('highlightedButton')
        if (txt.startsWith("Енергија")) {

            elem.classList.contains('highlightedButton') ?  mainFilterSet.add("energy") : mainFilterSet.delete("energy")
        } else if (txt.startsWith("Иновации")) {
            elem.classList.contains('highlightedButton') ?  mainFilterSet.add("innovation") : mainFilterSet.delete("innovation")
        } else if (txt.startsWith("Лидерство")) {
            elem.classList.contains('highlightedButton') ?  mainFilterSet.add("leadership") : mainFilterSet.delete("leadership")
        } else if (txt.startsWith("Акција")) {
            elem.classList.contains('highlightedButton') ?  mainFilterSet.add("action") : mainFilterSet.delete("action")
        } else if (txt.startsWith("Тим")) {
            elem.classList.contains('highlightedButton') ?  mainFilterSet.add("team") : mainFilterSet.delete("team")
        } 
    }

    presentFilter()

    
}


function filterTime(elem, min, max) {
    var range = {
        min: min,
        max: max
    }
    elem.classList.toggle('highlightedButton')
    if (elem.classList.contains('highlightedButton')) {
       timeFilterSet.add(range);
    } else {
        timeFilterSet.forEach(function(range){ 
            if (range.max == max && range.min == min) {
                timeFilterSet.delete(range);
            }
          });
    }

    presentFilter()
}

function filterGroup(elem, min, max) {
    var range = {
        min: min,
        max: max
    }
    elem.classList.toggle('highlightedButton')
    if (elem.classList.contains('highlightedButton')) {
        groupFilterSet.add(range)
    } else {
        groupFilterSet.forEach(function(range){ 
            if (range.max == max && range.min == min) {
                groupFilterSet.delete(range);
            }
          })
    }

    presentFilter();
}

function filterUsingActiveFilters() {
   if (mainFilterSet.size == 0 && timeFilterSet.size == 0 && groupFilterSet.size == 0) {
       return allGames;
   }
    let condition = ``;
    if (timeFilterSet.size) {
        let i = 0;
        condition += `(`
    for (let r of timeFilterSet) {
        if (i != 0) {
            condition += `|| `
        } 
        condition += `(obj.minTime >= ${r.min} && obj.maxTime <= ${r.max})`
        i++;
    }
    condition += `)`

    if (groupFilterSet.size || mainFilterSet.size) {
        condition += ` && `
    }
}
if (groupFilterSet.size) {
    let i = 0;
    condition += `(`
    for (let r of groupFilterSet) {
        if (i != 0) {
            condition += `|| `
        } 
        condition += `(obj.minPlayers >= ${r.min} && obj.maxPlayers <= ${r.max})`
        i++;
    }
    condition += `)`
    if (mainFilterSet.size) {
        condition += ` && `
    }
}
if (mainFilterSet.size) {
    let i = 0;
    condition += `(`
    for (let r of mainFilterSet) {
        if (i != 0) {
            condition += `|| `
        } 
        condition += `(obj.type == "${r}")`
        i++;
    }
    condition += `)`
}

    // alert(condition)
    condition += ` == true`
    
    return allGames.filter(obj => eval(condition))
}



function presentFilter() {
    filteredGames = filterUsingActiveFilters();

    let gamesDOM = ``
    let count = 0;
    for (game of filteredGames) {
       
        let cyrilicType = ""
        switch (game.type) {
            case "energy": cyrilicType = "ЕНЕРГИЈА"; break;
            case "action": cyrilicType = "АКЦИИ"; break;
            case "innovation": cyrilicType = "ИНОВАЦИИ"; break;
            case "leadership": cyrilicType = "ЛИДЕРСТВО"; break;
            case "team": cyrilicType = "ТИМ"; break;
        }
        if (count % 4 == 0) {
             gamesDOM += `<div class="row paddedRow">`
        }
        gamesDOM += `
             <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                 <div class="prvoPrvo" onclick="openGame('${game.name}')">
                  <img src="${game.image}" alt="${game.name}" class="img-fluid" width="300px">
                  <h4 class="prvoHead">${game.name}</h4>
                  <p class="prvoBold">${cyrilicType}</p>
                </div>
            </div>
        `
        if (count % 4 == 3) {
           gamesDOM += `</div>`
        }
        count++;
    }
    document.getElementById("cardsContainer").innerHTML = gamesDOM; 
}


function openGame(name) {
    let param = name.replace(" ","")
    window.location.href = `energija/helloKitty.html?gameName=${name}`;
}