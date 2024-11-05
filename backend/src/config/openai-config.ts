// // here is function of  the configure of the openAI

// // import { Configuration } from "openai"

// // export const configureOpenAI = () => {
// //     const config = new Configuration({
// //         apiKey: process.env.OPEN_AI_SECRET,
// //         organization: process.env.OPENAI_ORGANIZATION_ID,
// //     });
// //     return config;
// // };


// import { Configuration } from "openai";

// export const configureOpenAI = () => {
//   const config = new Configuration({
//     apiKey: process.env.OPEN_AI_SECRET,
//     organization: process.env.OPENAI_ORAGANIZATION_ID,
//   });
//   return config;
// }; 
 
 

// here is function of  the configure of the openAI

// import { Configuration } from "openai"

// export const configureOpenAI = () => {
//     const config = new Configuration({
//         apiKey: process.env.OPEN_AI_SECRET,
//         organization: process.env.OPENAI_ORGANIZATION_ID,
//     });
//     return config;
// };

import { Configuration, OpenAIApi } from "openai";

export const configureOpenAI = (): OpenAIApi => {
  const apiKey = process.env.OPEN_AI_SECRET;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");
 
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  return new OpenAIApi(configuration); 
};