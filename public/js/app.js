console.log('Client side javascript file is loaded!')
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne= document.querySelector('#message-1');
const messageTwo= document.querySelector('#message-2');
const messageThree= document.querySelector('#message-3');
const messageFour= document.querySelector('#message-4');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location= search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent= data.error;
                console.log(data.error);    
            }
            else{
                messageOne.textContent= data.locname +', '+ data.locregion +', '+ data.loccountry;
                messageTwo.textContent='The Weather is '+ data.weatherdesc +'. '
                messageThree.textContent= "The Temperature is "+ data.temperature +' degrees and it feels like '+ data.feelslike +' degrees.' 
                messageFour.textContent='Humidity is '+ data.humidity +'% and the Wind speed is '+ data.windspeed +' km/hr.';
            }
        })
    })
})