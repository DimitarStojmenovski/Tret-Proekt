$(function () {
  $('[data-toggle="popover"]').popover()
})

var url = new URL(window.location.href)
const gameName = url.searchParams.get("gameName")
const game = gamesArray().filter(obj => obj.name == gameName)[0]


window.onload = function () {
  loadStatic();
  loadSteps();
};

function loadStatic() {
  elem("mainImage").src = `../` + game.image
  elem("mainImage").alt = game.name
  elem("mainType").innerHTML = getType();
  elem("title").innerHTML = game.name;
  elem("shortDescription").innerHTML = game.brief;
  elem("timeFrame").innerHTML = `${game.minTime} - ${game.maxTime}`
  elem("groupSize").innerHTML = `${game.minPlayers} - ${game.maxPlayers > 40 ? "40+" : game.maxPlayers}`
  elem("facilitation").innerHTML = game.facilitation ? game.facilitation : `Почетно`
  elem("materials").innerHTML = game.materials ? game.materials : `/`
}

function loadSteps() {
  let stepsHtml = ``
  let count = 0
  for (step of game.steps) {
    count++;
        stepsHtml+= `<div class="row stepOneBodyRow"></hr>
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 stepOneBodyCol">
                    <h4 class="stepOneTitle">Чекор ${count}</h4>
                    <p class="stepOneParagraph">${step.text}
                    </p>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 stepOneBodyCol2">` +
                 (step.icon != null ? `<img src="../${step.icon}" class="img-fluid"  style="width:50px">` : ``)
                 +
                `</div>
            </div>
            <hr>
            `
  }
  elem("stepCont").innerHTML = stepsHtml;
}

function getType() {
  let cyrilicType
  switch (game.type) {
    case "energy": cyrilicType = "ЕНЕРГИЈА"; break;
    case "action": cyrilicType = "АКЦИИ"; break;
    case "innovation": cyrilicType = "ИНОВАЦИИ"; break;
    case "leadership": cyrilicType = "ЛИДЕРСТВО"; break;
    case "team": cyrilicType = "ТИМ"; break;
  }

  return cyrilicType
}


function elem(id) {
  return document.getElementById(id);
}




