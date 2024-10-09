const Express= require('express')
const Cors= require('cors')
const Nodemailer= require('nodemailer')
const BodyParser= require('body-parser')
require('dotenv').config()
const Axios =require('axios')

//importing gemini 
const { GoogleGenerativeAI } = require("@google/generative-ai");

//creating an express application
const app= Express()

app.use(Cors({
    origin:"*",
}))
app.use(BodyParser.json())




const gemini=async(news)=>{
 
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `${news} please summarize this news into 4 sentences and provide three precautionary steps based on these news. Format the response as follows: \n\nSummary:\n1. ...\n2. ...\n3. ...\n\nPrecautionary Steps:\n1. ...\n2. ...\n3. ...
    `;
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const output= result.response.text()
    return output
    }

///fetching the query here
const fetchQuery= async(query)=>{
    const url = `https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&no_redirect=1&skip_disambig=1`;
    console.log('Query:', query);
    try {
        const response = await Axios.get(url);
         // Log the entire response

        const news = response.data.RelatedTopics[0]?.Text;
        console.log(news)
        if (!news) {
            return null;
        }
        const output =await gemini(news)
        if(!output){
            return null
        }
        return output;
    } catch (error) {
        console.error('Error fetching query:', error);
        return null; // Return null if there is an error
    }
    
         

}


////gemini 



///sending emails using nodemailer

 const transport=Nodemailer.createTransport({

     service:"gmail",
     auth:{
         user:process.env.MY_EMAIL,
        pass:process.env.MY_PASSWORD
    }
})

 const sendConfirmationMail = (email,news) => {
     const mailOptions = {
         from: process.env.MY_EMAIL,
         to:email,
         subject:"News Summary",
         text:news
        
        
      
       
    };

    transport.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Check your inbox:', info.response);
        }
    });
};

app.post('/news',async function(req,res){
    const {email,query}=req.body
    console.log(query)
    if(!query){
     return   res.status(400).json({message:"Query not found"})
    }
  const output= await fetchQuery(query)
  console.log(output)
//   if(!news){
//   return  res.status(400).json({message:'News not found'})
//   }

//   const {output}= await gemini(news)
//   if(!output){
//    return res.status(400).json({message:"notfound"})
//   }
if (!output) {
    return res.status(400).json({ message: 'News not found' });
}
  
sendConfirmationMail(email,output) 
return  res.status(200).json({news:output})

    
})

//server address
app.listen(process.env.PORT,()=>{
    console.log('server connected')
})