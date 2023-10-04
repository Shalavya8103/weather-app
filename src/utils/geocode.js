const request= require('request');
const geoCode=(address, callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=e195e40732c935aa2d4ff47bcd321113&query='+encodeURIComponent(address)+'&limit=1';
    request({url: url, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect to location services', undefined);
        }else if(response.body.data.length===0){
            callback('unable to find location. try another search', undefined);
        }else{
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
            });
        }
    });
}

module.exports= geoCode;