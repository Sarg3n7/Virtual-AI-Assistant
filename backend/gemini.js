// import axios from "axios"
// const geminiResponse=async (command,assistantName,userName)=>{
// try {
//     const apiUrl=process.env.GEMINI_API_KEY_URL
//     const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
// You are not Google. You will now behave like a voice-enabled assistant.

// Your task is to understand the user's natural language input and respond with a JSON object like this:
// {
//   "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show",
//   "userInput": "<original user input, without the assistant's name>",
//   "response": "<a short spoken response to read out loud to the user>"
// }

// Instructions:
// - "type": determine the intent of the user.
// - "userinput": keep the original text, but remove the assistant's name if present.
// - "response": make it short, voice-friendly (like "Sure, playing now", "Here’s what I found", etc.).

// Type meanings:
// - "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
// - "google-search": if user wants to search something on Google .
// - "youtube-search": if user wants to search something on YouTube.
// - "youtube-play": if user wants to directly play a video or song.
// - "calculator-open": if user wants to  open a calculator .
// - "instagram-open": if user wants to  open instagram .
// - "facebook-open": if user wants to open facebook.
// -"weather-show": if user wants to know weather
// - "get-time": if user asks for current time.
// - "get-date": if user asks for today's date.
// - "get-day": if user asks what day it is.
// - "get-month": if user asks for the current month.

// Important:
// - Use ${userName} agar koi puche tume kisne banaya 
// - Only respond with the JSON object, nothing else.


// now your userInput- ${command}
// `;





//     const result=await axios.post(apiUrl,{
//     "contents": [
//         {
//             "parts":[{"text": prompt}]
//         },
//     ],
//     });

//     const rawText = result.data.candidates[0].content.parts[0].text;

//     try{
//         const parsed = JSON.parse(rawText);
//         return parsed;
//     }catch(e){
//         console.error("Failed to parse Gemini response:", rawText);
//         return{
//             type: "general",
//             userInput: command,
//             response: "I'm sorry, I couldn't understand that. Could you please rephrase?"
//         };
//     }

// } catch (error) {
//     console.error("Gemini API error:", error.message);
//     return {
//         type: "general",
//         userInput: command,
//         response: "There was a problem connnecting to my brain. Try again later."
//     };    
// }
// };

// export default geminiResponse;







import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("❌ GEMINI_API_KEY is missing in .env file");
    }

    // ✅ Correct Gemini API endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:
{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<original user input, without the assistant's name>",
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": keep the original text, but remove the assistant's name if present.
- "response": make it short, voice-friendly (like "Sure, playing now", "Here’s what I found", etc.).

Type meanings:
- "general": if it's a factual or informational question. Aur agar koi aisa question puchta hai jiska answer tume pata hai, usko bhi general ki category me rakho, bas short answer dena.
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to open a calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user wants to know weather.
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tume kisne banaya.
- Only respond with the JSON object, nothing else.

Now process this userInput: ${command}`;

    const result = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const rawText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return rawText; // ✅ Always return string
  } catch (error) {
    console.error("Gemini API error:", error.message);

    // Return fallback as a JSON string (not object!)
    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "There was a problem connecting to my brain. Try again later.",
    });
  }
};

export default geminiResponse;
