import axios from 'axios'
const serverURL='/'
const token=localStorage.getItem('TOKEN')
const config = {
    headers: { Authorization: `${token}` }
};
const postData=async(url,body)=>
{ 
    try
    {
       var response=await axios.post(`${serverURL}/${url}`,body)  
       var data=response.data
       return data
    }
    catch(e)
    {
        return null
    }

}

const getData=async(url)=>
    { 
     const token=localStorage.getItem('TOKEN')
     var config
     if(token)
     {  
     config = {
     headers: { Authorization: `${token}` }
    };}
    else
    {
   config={}
    }

        try
        {
           var response=await axios.get(`${serverURL}/${url}`,config)  
           var data=response.data
           return data
        }
        catch(e)
        {  console.log("ERRRRR:",e.status)
            if(e.status==401)
            {   
                return({status:false,message:'Unathorized Access'})
            }   
            else
            {
               
            return({status:false,message:'Error On Server,Pls Contact Backend Team'})
            }
        }
    
    }
    
const passwordGenerator=()=>{
 var p=parseInt(Math.random()*899999)+100000
 return p

}
const generateOtp=()=>{
    var ot=parseInt(Math.random()*899999)+100000
    
    return(ot)
   }
export{serverURL,generateOtp,postData,getData,passwordGenerator}