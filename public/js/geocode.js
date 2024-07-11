async function mapOSM(url){
    const data=await fetch(url);
    const mapData=await data.json();
    return mapData[0];
}
module.exports=mapOSM;