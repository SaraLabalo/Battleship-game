var b = 0;
var Brod1 = 4,
  Brod2 = 3,
  Brod3 = 2,
  Brod4 = 1;
var br = 0;
var niz = new Array();
var matrix = [];
for (var i = 0; i < 10; i++) {
  matrix[i] = [];
  for (var j = 0; j < 10; j++) {
    matrix[i][j] = 0;
  }
}
var matrica2 = [];
var matrica1 = [];
var preostalo1, preostalo2;
var validnost = true;
var igrac = 1;
var tek1, tek2;

$(document).ready(function () {
  //===GAME PAGE=====
  if ($("body").is(".game")) {
    igrac = 1;
    tek1 = localStorage.getItem("Player1");
    $(".player1").text(tek1);
    tek2 = localStorage.getItem("Player2");
    $(".player2").text(tek2);
    $(".player-turn").text("Player turn: " + tek1);

    preostalo1 = 20;
    preostalo2 = 20;

    matrica1 = JSON.parse(localStorage.getItem("table1"));
    matrica2 = JSON.parse(localStorage.getItem("table2"));
    postaviIgrac1();
  }
  //PLAYER1 TURN
  $(".cell2").on("click", function () {
    if (igrac == 1) {
      var a = $(this).attr("id");
      var vrsta = $(this).attr("id").charAt(0);
      var kolona = $(this).attr("id").charAt(1);
      if (matrica2[vrsta][kolona] == 0) {
        $("#" + vrsta + kolona + ".cell2").css("background-color", "red");
        matrica2[vrsta][kolona] = "/";
        igrac = 2;
        $(".player-turn").text("Player turn: " + tek2);
        obrisi();
        postaviIgrac2();
      } else {
        $("#" + vrsta + kolona + ".cell2").css("background-color", "green");
        matrica2[vrsta][kolona] = "x";
        preostalo2--;
        if (preostalo2 == 0) {
          alert(
            "CONGRATULATION YOU WON!!The remaining submerged fields:" +
              preostalo1
          );
          localStorage.clear();
          window.location.replace("battleship-welcome.html");
        }
      }
    } else {
      alert("NOT YOUR TURN");
    }
  });
  //PLAYER2 TURN
  $(".cell1").on("click", function () {
    if (igrac == 2) {
      var a = $(this).attr("id");
      var vrsta = $(this).attr("id").charAt(0);
      var kolona = $(this).attr("id").charAt(1);
      if (matrica1[vrsta][kolona] == 0) {
        $("#" + vrsta + kolona + ".cell1").css("background-color", "red");
        matrica1[vrsta][kolona] = "/";
        $(".player-turn").text("Player turn: " + tek1);
        igrac = 1;
        obrisi();
        postaviIgrac1();
      } else {
        $("#" + vrsta + kolona + ".cell1").css("background-color", "green");
        matrica1[vrsta][kolona] = "x";
        preostalo1--;
        if (preostalo1 == 0) {
          alert(
            "CONGRATULATION YOU WON!!The remaining submerged fields:" +
              preostalo2
          );
          localStorage.clear();
          window.location.replace("battleship-welcome.html");
        }
      }
    } else {
      alert("NOT YOUR TURN");
    }
  });
  //===LOG IN PAGE=====
  $("form").submit(function () {
    var player1 = $("#Player1").val();
    var player2 = $("#Player2").val();
    var duz1 = player1.length;
    var duz2 = player2.length;
    console.log(player1);
    console.log(player2);
    if (duz1 < 3 || duz1 > 15 || duz2 < 3 || duz2 > 15) {
      alert("Name lenght is eather long or short. Max=15 min=3!!");
      return;
    }
    if (/^[a-zA-Z0-9_]+$/.test(player1)) {
      localStorage.setItem("Player1", player1);
    } else {
      alert(
        "Player names may only contain lowercase and uppercase letters, numbers and _ !!"
      );
      return;
    }
    if (/^[a-zA-Z0-9_]+$/.test(player2)) {
      localStorage.setItem("Player2", player2);
    } else {
      alert(
        "Player names may only contain lowercase and uppercase letters, numbers and _ !!"
      );
      return;
    }
    console.log("prosao");
    $("#formSubmitt").attr("action", "battleship-setup.html");
    console.log("kraj");
  });

  //===SET-UP PAGE=====
  if ($("body").is(".setup")) {
    var tek = localStorage.getItem("Player1");
    console.log(tek);
    $("#player").text("CURRENT PLAYER: " + tek);
    $(".boat1").text("Boat with 1 field: " + Brod1);
    $(".boat2").text("Boat with 2 fields: " + Brod2);
    $(".boat3").text("Boat with 3 fields: " + Brod3);
    $(".boat4").text("Boat with 4 fields: " + Brod4);
  }
  $(".cell").on("mousedown", function () {
    br = 0;
    validnost = true;
    b = 1;
    br++;
    var vrsta = $(this).attr("id").charAt(0);
    var kolona = $(this).attr("id").charAt(1);

    if (matrix[vrsta][kolona] == 1) {
      validnost = false;
      return;
    } else {
      niz.push($(this).attr("id"));
      $(this).css("background-color", "yellow");
    }
  });

  $(".cell").on("mouseover", function () {
    if (b == 1) {
      var a = $(this).attr("id");
      br++;
      var vrsta = $(this).attr("id").charAt(0);
      var kolona = $(this).attr("id").charAt(1);

      if (matrix[vrsta][kolona] == 1) {
        validnost = false;
        return;
      } else {
        niz.push($(this).attr("id"));
        $(this).css("background-color", "yellow");
      }
    }
  });

  $(".cell").on("mouseup", function () {
    b = 0;
    provera();
    console.log(niz);
    settupEnd();
    $(".boat1").text("Boat with 1 field: " + Brod1);
    $(".boat2").text("Boat with 2 fields: " + Brod2);
    $(".boat3").text("Boat with 3 fields: " + Brod3);
    $(".boat4").text("Boat with 4 fields: " + Brod4);
    br = 0;
    return;
  });
});

const provera = () => {
  if (br > 4) validnost = false;

  for (var i = 0; i < niz.length; i++) {
    var vrsta = parseInt(niz[i].charAt(0));
    var kolona = parseInt(niz[i].charAt(1));
    if (kolona != 9 && matrix[vrsta][kolona + 1] == 1) {
      validnost = false;
    }
    if (kolona != 0 && matrix[vrsta][kolona - 1] == 1) {
      validnost = false;
    }
    if (vrsta != 0 && matrix[vrsta - 1][kolona] == 1) {
      validnost = false;
    }
    if (vrsta != 9 && matrix[vrsta + 1][kolona] == 1) {
      validnost = false;
    }
  }
  if (br != 1 && validnost != false) {
    if (niz[0].charAt(0) == niz[1].charAt(0)) {
      for (i = 1; i < niz.length - 1; i++) {
        if (niz[i].charAt(0) != niz[i + 1].charAt(0)) validnost = false;
      }
    }

    if (niz[0].charAt(1) == niz[1].charAt(1)) {
      for (i = 1; i < niz.length - 1; i++) {
        if (niz[i].charAt(1) != niz[i + 1].charAt(1)) validnost = false;
      }
    }
  }
  if (br == 1) {
    if (Brod1 == 0) {
      validnost = false;
    } else {
      if (validnost != false) Brod1--;
    }
  }
  if (br == 2) {
    if (Brod2 == 0) {
      validnost = false;
    } else {
      if (validnost != false) Brod2--;
    }
  }
  if (br == 3) {
    if (Brod3 == 0) {
      validnost = false;
    } else {
      if (validnost != false) Brod3--;
    }
  }
  if (br == 4) {
    if (Brod4 == 0) {
      validnost = false;
    } else {
      if (validnost != false) Brod4--;
    }
  }
  console.log(validnost);
  if (validnost == false) {
    alert("An error has occurred");
    for (i = 0; i < niz.length; i++) {
      $("#" + niz[i]).css("background-color", "#77F");
    }
  } else {
    for (i = 0; i < niz.length; i++) {
      var vrsta = niz[i].charAt(0);
      var kolona = niz[i].charAt(1);
      matrix[vrsta][kolona] = 1;
    }
  }
  niz = [];
};
const settupEnd = () => {
  console.log(Brod4, Brod1, Brod3, Brod2);
  if (Brod1 == 0 && Brod2 == 0 && Brod3 == 0 && Brod4 == 0) {
    if (igrac == 1) {
      console.log("usao1");
      //sacuvam u localstorage matricu ('table1', matrix)
      localStorage.setItem("table1", JSON.stringify(matrix));
      //vratim matricu na sve nuletab
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          matrix[i][j] = 0;
        }
      }
      //obrisem sva obojena polja
      for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
          var id = i + j;
          $("#" + i + j).css("background-color", "#77F");
        }
      }
      //resetujem brojeve
      (Brod1 = 4), (Brod2 = 3), (Brod3 = 2), (Brod4 = 1);
      br = 0;
      b = 0;
      console.log("DOSAO");
      igrac = 2;
      var tek = localStorage.getItem("Player2");
      $("#player").text("Player: " + tek);
    } else {
      console.log("usao");
      //sacuvas u local ('table2", matrix);
      localStorage.setItem("table2", JSON.stringify(matrix));
      //oeds na drugi ekran
      igrac = 1;
      window.location.replace("battleship-game.html");
    }
  }
};

const proveraPreklapanja = (id) => {
  var vrsta = $(this).attr("id").charAt(0);
  var kolona = $(this).attr("id").charAt(1);
  if (matrix[vrsta][kolona] == 1) validnost = false;
};

const obrisi = () => {
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      $("#" + i + j + ".cell1").css("background-color", "#77F");
      $("#" + i + j + ".cell2").css("background-color", "#77F");
    }
  }
};
const postaviIgrac1 = () => {
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      if (matrica1[i][j] == 1) {
        $("#" + i + j + ".cell1").css("background-color", "yellow");
      }
      if (matrica1[i][j] == "/") {
        $("#" + i + j + ".cell1").text("/");
      }

      if (matrica1[i][j] == "x") {
        $("#" + i + j + ".cell1").text("x");
      }

      //tabela protivnika
      if (matrica2[i][j] == "/") {
        $("#" + i + j + ".cell2").css("background-color", "red");
      }

      if (matrica2[i][j] == "x") {
        $("#" + i + j + ".cell2").css("background-color", "green");
      }
    }
  }
};
const postaviIgrac2 = () => {
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      if (matrica2[i][j] == 1) {
        $("#" + i + j + ".cell2").css("background-color", "yellow");
      }
      if (matrica2[i][j] == "/") {
        $("#" + i + j + ".cell2").text("/");
      }

      if (matrica2[i][j] == "x") {
        $("#" + i + j + ".cell2").text("x");
      }

      //tabela protivnika
      if (matrica1[i][j] == "/") {
        $("#" + i + j + ".cell1").css("background-color", "red");
      }

      if (matrica1[i][j] == "x") {
        $("#" + i + j + ".cell1").css("background-color", "green");
      }
    }
  }
};
