var grade = document.getElementById("grade");
//desativa o botão direito
document.addEventListener('contextmenu', event => event.preventDefault());
let modoTeste = false//Ative essa variavel para poder ver aonde estão as bombas

//Timer
"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function comecarTimer() {
  pausarTimer();
  cron = setInterval(() => { timer(); }, 10);
}

function pausarTimer() {
  clearInterval(cron);
}

function resetarTimer() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}

function gerarTUDO(){
tamanho = document.getElementById("TC").value

  if(tamanho < 5 || tamanho > 20){
    alert("O tamanho aceito é 5, 20 ou entre esses dois numeros")
  }else{
    gerarGrade()
    function gerarGrade() {
      //começa o timer
      comecarTimer()
      resetarTimer()
        //gera um campo
        grade.innerHTML = "";
        for (var i=0; i<tamanho; i++) {
            var linha = grade.insertRow(i)
    
            for (var j=0; j<tamanho; j++){
                var celula = linha.insertCell(j)
                celula.onclick = function() {
                    cliqueCelula(this) 
                }
    
                celula.oncontextmenu = function() {
                    cliqueDiCelula(this)
                }
    
                var mina = document.createAttribute("DataMina")
                mina.value = false
                celula.setAttributeNode(mina)
            }
        }
        addMina()
    }
    
    function addMina() {
        //Adiciona minas randomicamente
        if (tamanho >= 11){
          for (var i=0; i<tamanho * 5; i++) {
            var li = Math.floor(Math.random() * tamanho)
            var col = Math.floor(Math.random() * tamanho)
            var celula = grade.rows[li].cells[col]
            celula.setAttribute("DataMina","true")
    
            if (modoTeste == true) {
               celula.innerHTML = "🚩"; 
            } 
          }
        } else{
          for (var i=0; i<tamanho * 2; i++) {
            var li = Math.floor(Math.random() * tamanho)
            var col = Math.floor(Math.random() * tamanho)
            var celula = grade.rows[li].cells[col]
            celula.setAttribute("DataMina","true")
    
            if (modoTeste == true) {
               celula.innerHTML = "🚩"; 
            } 
          }
        }
    
        
    }
    
    function revelarMinas() {
        //Revelar as minas em vermelho
        for (var i=0; i<tamanho; i++) {
            for(var j=0; j<tamanho; j++) {
                var celula = grade.rows[i].cells[j];
    
                if (celula.getAttribute("DataMina") == "true") {
                   celula.className = "mina" 
                } 
            }
        }
    }
    
    function venceu() {
        var campoCompleto = true;
          for (var i=0; i<tamanho; i++) {
            for(var j=0; j<tamanho; j++) {
              if ((grade.rows[i].cells[j].getAttribute("DataMina")=="false") && (grade.rows[i].cells[j].innerHTML=="")) campoCompleto=false;
            }
        }
        if (campoCompleto) {
          alert("Você venceu :)");
          revelarMinas();
          pausarTimer()
        }
      }
      
    function cliqueCelula(celula) {
    //Checa pra ver se o player clicou na mina
    if (celula.getAttribute("dataMina")=="true") {
          revelarMinas();
          alert("Você perdeu >:(");
          pausarTimer()
        } else {
          celula.className="clicada";
          //Conta e mostra as minas adjacentes
          var contagemMina = 0;
          var celLinha = celula.parentNode.rowIndex;
          var celCol = celula.cellIndex;
          for (var i=Math.max(celLinha-1,0); i<=Math.min(celLinha+1,tamanho-1); i++) {
            for(var j=Math.max(celCol-1,0); j<=Math.min(celCol+1,tamanho-1); j++) {
              if (grade.rows[i].cells[j].getAttribute("dataMina")=="true") contagemMina++;
            }
          }
          celula.innerHTML = contagemMina;
          if (contagemMina == 0) { 
            //Revela todas as celulas adjacentes que não tem mina
            for (var i=Math.max(celLinha-1,0); i<=Math.min(celLinha+1,tamanho-1); i++) {
              for(var j=Math.max(celCol-1,0); j<=Math.min(celCol+1,tamanho-1); j++) {
                //Recursive Call
                if (grade.rows[i].cells[j].innerHTML=="") cliqueCelula(grade.rows[i].cells[j]);
              }
            }
          }
          venceu();
        }
    }
    
    //marcação de mina
    function cliqueDiCelula(celula) {
        var a = celula.innerHTML
    
        if(a == "🚩"){
            celula.innerHTML = ""
    
        }else{
            celula.innerHTML = "🚩"
    
        }
    }
    }
    
    
  }

