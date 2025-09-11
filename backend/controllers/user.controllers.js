// Version 1


// import uploadOnCloudinary from "../config/cloudinary.js"
// import geminiResponse from "../gemini.js"
// import User from "../models/user.model.js"
// import moment from "moment"
//  export const getCurrentUser=async (req,res)=>{
//     try {
//         const userId=req.userId
//         const user=await User.findById(userId).select("-password")
//         if(!user){
// return res.status(400).json({message:"user not found"})
//         }

//    return res.status(200).json(user)     
//     } catch (error) {
//        return res.status(400).json({message:"get current user error"}) 
//     }
// }

// export const updateAssistant=async (req,res)=>{
//    try {
//       const {assistantName,imageUrl}=req.body
//       let assistantImage;
// if(req.file){
//    assistantImage=await uploadOnCloudinary(req.file.path)
// }else{
//    assistantImage=imageUrl
// }

// const user=await User.findByIdAndUpdate(req.userId,{
//    assistantName,assistantImage
// },{new:true}).select("-password")
// return res.status(200).json(user)

      
//    } catch (error) {
//        return res.status(400).json({message:"updateAssistantError user error"}) 
//    }
// }


// export const askToAssistant = async (req, res) => {
//   try {
//     const { command } = req.body;
//     if (!command) {
//       return res.status(400).json({ error: "No command provided" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.history.push(command);
//     await user.save();

//     const userName = user.name;
//     const assistantName = user.assistantName;

//     const result = await geminiResponse(command, assistantName, userName);
//     console.log("Raw Gemini result:", result);

//     // Safely extract JSON
//     const jsonMatch = result?.match(/{[\s\S]*}/);
//     if (!jsonMatch) {
//       return res.status(400).json({ response: "Sorry, I couldn't understand the response." });
//     }

//     let gemResult;
//     try {
//       gemResult = JSON.parse(jsonMatch[0]);
//     } catch (err) {
//       console.error("JSON parse error:", err);
//       return res.status(500).json({ error: "Failed to parse Gemini response" });
//     }

//     console.log("Parsed Gemini result:", gemResult);

//     const { type, userInput, response } = gemResult;

//     switch (type) {
//       case "get-date":
//         return res.json({
//           type,
//           userInput,
//           response: `Current date is ${moment().format("YYYY-MM-DD")}`
//         });
//       case "get-time":
//         return res.json({
//           type,
//           userInput,
//           response: `Current time is ${moment().format("hh:mm A")}`
//         });
//       case "get-day":
//         return res.json({
//           type,
//           userInput,
//           response: `Today is ${moment().format("dddd")}`
//         });
//       case "get-month":
//         return res.json({
//           type,
//           userInput,
//           response: `Current month is ${moment().format("MMMM")}`
//         });

//       case "google-search":
//       case "youtube-search":
//       case "youtube-play":
//       case "general":
//       case "calculator-open":
//       case "instagram-open":
//       case "facebook-open":
//       case "weather-show":
//         return res.json({ type, userInput, response });

//       default:
//         return res.status(400).json({ response: "I didn't understand that command." });
//     }
//   } catch (error) {
//     console.error("askToAssistant failed:", error);
//     return res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// };



// Version 2


// import uploadOnCloudinary from "../config/cloudinary.js";
// import geminiResponse from "../gemini.js";
// import User from "../models/user.model.js";
// import moment from "moment";

// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "get current user error" });
//   }
// };

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;
//     let assistantImage;

//     if (req.file) {
//       assistantImage = await uploadOnCloudinary(req.file.path);
//     } else {
//       assistantImage = imageUrl;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantName, assistantImage },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "updateAssistantError user error" });
//   }
// };

// export const askToAssistant = async (req, res) => {
//   try {
//     const { command } = req.body;
//     if (!command) {
//       return res.status(400).json({ error: "No command provided" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.history.push(command);
//     await user.save();

//     const userName = user.name;
//     const assistantName = user.assistantName;

//     const result = await geminiResponse(command, assistantName, userName);
//     console.log("Raw Gemini result:", result);

//     const resultStr = typeof result === "string" ? result : JSON.stringify(result);

//     // Extract JSON object safely
//     const jsonMatch = resultStr.match(/{[\s\S]*}/);
//     if (!jsonMatch) {
//       return res.status(400).json({ response: "Sorry, I couldn't understand the response." });
//     }

//     let gemResult;
//     try {
//       gemResult = JSON.parse(jsonMatch[0]);
//     } catch (err) {
//       console.error("JSON parse error:", err);
//       return res.status(500).json({ error: "Failed to parse Gemini response" });
//     }

//     console.log("Parsed Gemini result:", gemResult);

//     const { type, userInput, response } = gemResult;

//     switch (type) {
//       case "get-date":
//         return res.json({
//           type,
//           userInput,
//           response: `Current date is ${moment().format("YYYY-MM-DD")}`,
//         });
//       case "get-time":
//         return res.json({
//           type,
//           userInput,
//           response: `Current time is ${moment().format("hh:mm A")}`,
//         });
//       case "get-day":
//         return res.json({
//           type,
//           userInput,
//           response: `Today is ${moment().format("dddd")}`,
//         });
//       case "get-month":
//         return res.json({
//           type,
//           userInput,
//           response: `Current month is ${moment().format("MMMM")}`,
//         });

//       case "google-search":
//       case "youtube-search":
//       case "youtube-play":
//       case "general":
//       case "calculator-open":
//       case "instagram-open":
//       case "facebook-open":
//       case "weather-show":
//         return res.json({ type, userInput, response });

//       default:
//         return res.status(400).json({ response: "I didn't understand that command." });
//     }
//   } catch (error) {
//     console.error("askToAssistant failed:", error);
//     return res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// };







// Version 3

// import uploadOnCloudinary from "../config/cloudinary.js";
// import geminiResponse from "../gemini.js";
// import User from "../models/user.model.js";
// import moment from "moment";

// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "get current user error" });
//   }
// };

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;
//     let assistantImage;

//     if (req.file) {
//       assistantImage = await uploadOnCloudinary(req.file.path);
//     } else {
//       assistantImage = imageUrl;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantName, assistantImage },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "updateAssistantError user error" });
//   }
// };

// export const askToAssistant = async (req, res) => {
//   try {
//     const { command } = req.body;
//     if (!command) {
//       return res.status(400).json({ error: "No command provided" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.history.push(command);
//     await user.save();

//     const userName = user.name;
//     const assistantName = user.assistantName;

//     let result = await geminiResponse(command, assistantName, userName);
//     console.log("Raw Gemini result:", result);

//     // Convert result to string and clean code block wrappers
//     let resultStr = typeof result === "string" ? result : JSON.stringify(result);
//     resultStr = resultStr.replace(/```json|```/g, "").trim();

//     let gemResult;
//     try {
//       gemResult = JSON.parse(resultStr);
//     } catch (err) {
//       console.error("JSON parse error:", err, resultStr);
//       return res.status(500).json({ error: "Failed to parse Gemini response" });
//     }

//     console.log("Parsed Gemini result:", gemResult);

//     const { type, userInput, response } = gemResult;

//     switch (type) {
//       case "get-date":
//         return res.json({
//           type,
//           userInput,
//           response: `Current date is ${moment().format("YYYY-MM-DD")}`,
//         });
//       case "get-time":
//         return res.json({
//           type,
//           userInput,
//           response: `Current time is ${moment().format("hh:mm A")}`,
//         });
//       case "get-day":
//         return res.json({
//           type,
//           userInput,
//           response: `Today is ${moment().format("dddd")}`,
//         });
//       case "get-month":
//         return res.json({
//           type,
//           userInput,
//           response: `Current month is ${moment().format("MMMM")}`,
//         });

//       // All other intents — send as-is to frontend
//       case "google-search":
//       case "youtube-search":
//       case "youtube-play":
//       case "general":
//       case "calculator-open":
//       case "instagram-open":
//       case "facebook-open":
//       case "weather-show":
//         return res.json({ type, userInput, response });

//       default:
//         return res.status(400).json({ response: "I didn't understand that command." });
//     }
//   } catch (error) {
//     console.error("askToAssistant failed:", error);
//     return res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// };










// Version 5

import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "get current user error" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "updateAssistantError user error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    if (!command) {
      return res.status(400).json({ error: "No command provided" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.history.push(command);
    await user.save();

    const userName = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command, assistantName, userName);
    console.log("Raw Gemini result:", result);

    const resultStr = typeof result === "string" ? result : JSON.stringify(result);
    const jsonMatch = resultStr.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).json({ response: "Sorry, I couldn't understand the response." });
    }

    let gemResult;
    try {
      gemResult = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(500).json({ error: "Failed to parse Gemini response" });
    }

    console.log("Parsed Gemini result:", gemResult);

    let { type, userInput, response } = gemResult;

    // 🔹 Normalize command types for consistency
    switch (type) {
      case "get-date":
        return res.json({
          type: "get-date",
          userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get-time":
        return res.json({
          type: "get-time",
          userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });
      case "get-day":
        return res.json({
          type: "get-day",
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        });
      case "get-month":
        return res.json({
          type: "get-month",
          userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      case "google-search":
      case "search-google":
      case "search":
        return res.json({
          type: "google-search",
          userInput,
          response: `Searching Google for ${userInput}`,
        });

      case "youtube-search":
      case "youtube-play":
      case "search-youtube":
        return res.json({
          type: "youtube-search",
          userInput,
          response: `Opening YouTube results for ${userInput}`,
        });

      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
      case "general":
        return res.json({ type, userInput, response });

      default:
        return res.status(400).json({ response: "I didn't understand that command." });
    }
  } catch (error) {
    console.error("askToAssistant failed:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
