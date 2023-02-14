async function Postdata(url, postdata,token) {
    let data = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin':'http://localhost:3000/',
            jwt:token
        },
        body: JSON.stringify(postdata)
       
    })
    if(data != null){
        data = await data.json();
    }else{
        data = {success:'false',message:'please try again later'}
    }
    

    return data

}
module.exports = Postdata;