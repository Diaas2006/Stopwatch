 // Variáveis //

 const hours = document.getElementById('hours')
 const minutes = document.getElementById('minutes')
 const seconds = document.getElementById('seconds')
 const milliseconds = document.getElementById('milliseconds')
 const playButton = document.getElementById('play')
 const pauseButton = document.getElementById('pause')
 const clearTime = document.querySelector('.historico__container span')
 const historic = document.querySelector('.historico__content')
 
 let interval = null
 let isPlaying = false

 // timer //
 let hourTime = 0
 let millisecondsTime = 0
 let secondsTime = 0
 let minutesTime = 0

 /////////////////////////////
 
 // funções //

 function stop() {
     clearInterval(interval)
     isPlaying = false
     
     const times = [
         hourTime.toString().padStart(2, '0'),
         minutesTime.toString().padStart(2, '0'),
         secondsTime.toString().padStart(2, '0'),
         millisecondsTime.toString().padStart(2, '0')
     ]

     const timeAnterior = times.join(":").concat('\n')
     const localSt = [localStorage.getItem('time')]
     const data = localSt ? localSt.concat(timeAnterior).join('') : timeAnterior

     localStorage.setItem('time', data)
     historic.innerText = data

     // zera tudo //
     hourTime = 0
     millisecondsTime = 0
     secondsTime = 0
     minutesTime = 0
     
     hours.innerText = '00'
     minutes.innerText = '00'
     seconds.innerText = '00'
     milliseconds.innerText = '00'
 }

 function play() {
     interval = setInterval(() => {
         if (millisecondsTime < 99) {
             millisecondsTime++
             milliseconds.innerText = millisecondsTime.toString().padStart(2, '0')
             return
         }
         if(secondsTime < 60){
             secondsTime++
             seconds.innerText = secondsTime.toString().padStart(2, '0')
             millisecondsTime = 0
             return
         }
         if(minutesTime < 60){
             minutesTime++
             minutes.innerText = minutesTime.toString().padStart(2, '0')
             secondsTime = 0
         }
         hourTime++
         hours.innerText = hourTime.toString().padStart(2, '0')
         minutesTime = 0
         
     }, 10)
     isPlaying = true
 }

 function pause() {
    clearInterval(interval)
    isPlaying = false
 }

 function clear(){
    historic.innerText = null
    localStorage.clear('time')
 }
 /////////////////////////////
 
 // Eventos //

 playButton.addEventListener("click", ()=>{
     if(!isPlaying){
         playButton.classList.add('ativo')
         play()
         playButton.innerText = 'Stop'
         
         pauseButton.addEventListener("click", ()=>{
             if(isPlaying){
                pause()
                playButton.classList.remove('ativo')
                playButton.innerText = 'Play'
            }
        })
    }
    else{
        playButton.classList.remove('ativo')
        stop()
        playButton.innerText = 'Play'
     }
 })
 
 clearTime.addEventListener('click', clear)
  
 /////////////////////////////

 // histórico do cronometro //

historic.innerText = localStorage.getItem('time')

 /////////////////////////////