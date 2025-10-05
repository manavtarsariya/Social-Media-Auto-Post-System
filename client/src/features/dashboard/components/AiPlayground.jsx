// // src/features/dashboard/components/AiPlayground.jsx

// import React, { useState } from 'react';
// import { Sparkles, Wand } from 'lucide-react';
// // Assume you have these services ready
// // import { generateCaption } from '@/services/aiService';
// // import { generateHashtags } from '@/services/aiService';

// // Placeholder for actual API call
// const generateCaption = async (content) => {
//   await new Promise(res => setTimeout(res, 1000)); // Simulate network delay
//   return `This is a brilliant AI-generated caption based on: "${content.substring(0, 30)}..."`;
// };

// const AiPlayground = () => {
//   const [content, setContent] = useState('');
//   const [result, setResult] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGenerateClick = async () => { 
//     if (!content) return;
//     setIsLoading(true);
//     setResult('');
//     try {
//       const caption = await generateCaption(content);
//       setResult(caption);
//     } catch (error) {
//       setResult('Sorry, something went wrong.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
//       <h3 className="font-semibold text-white">Try the AI Generator</h3>
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Enter a post title or content here to see the AI in action..."
//         className="w-full h-24 bg-gray-900/70 border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         onClick={handleGenerateClick}
//         disabled={isLoading || !content}
//         className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <>
//             <Wand className="w-5 h-5 animate-spin" />
//             Generating...
//           </>
//         ) : (
//           <>
//             <Sparkles className="w-5 h-5" />
//             Generate Caption
//           </>
//         )}
//       </button>

//       {result && (
//         <div className="border-t border-gray-700 pt-4 mt-4">
//           <p className="text-sm font-semibold text-purple-300 mb-2">AI Result:</p>
//           <p className="text-white bg-gray-900/50 p-3 rounded-lg">{result}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AiPlayground;