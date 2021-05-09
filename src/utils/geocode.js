const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJ5YW5zaGFybWE5NzM2IiwiYSI6ImNrbDY5NWc3ZTB2cWQyb3A2Nm45NmlibzkifQ.WpsuSj18RAPsZYL4bNgeVA&limit=1'

request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to access the internet services',undefined)
    }else if(body.features.length==0){
      callback('No such location is found',undefined)
    }
    else{
        callback(undefined,{
     longitude : body.features[0].center[0],
     latitude : body.features[0].center[1],
     location : body.features[0].place_name
        })
    }
})

}

module.exports= geocode 