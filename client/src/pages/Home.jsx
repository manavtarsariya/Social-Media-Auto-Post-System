import React from 'react';
import { Sparkles, Calendar, LayoutGrid, Zap, ArrowRight, Bot } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import photo1 from "../assets/freepik__the-style-is-candid-image-photography-with-natural__70620.png";
// import photo2 from "../assets/freepik__the-style-is-candid-image-photography-with-natural__70620.png";
import photo3 from "../assets/Gemini_Generated_Image_gbz89pgbz89pgbz8.png";
import photo4 from "../assets/Gemini_Generated_Image_w9c1mrw9c1mrw9c1.png";
import photo5 from "../assets/Lucid_Origin_A_cheerful_person_relaxing_on_a_sofa_with_a_phone_0.jpg";
import photo6 from "../assets/Lucid_Origin_A_cheerful_person_relaxing_on_a_sofa_with_a_phone_2.jpg";
import photo7 from "../assets/Lucid_Origin_A_modern_vibrant_illustration_showing_a_person_si_1.jpg";
import photo8 from "../assets/Lucid_Origin_A_modern_vibrant_illustration_showing_a_person_si_2.jpg";
import { useNavigate } from 'react-router';

// You can replace this with a high-quality image URL or an imported image.
// The image generated earlier would be perfect here.
// const heroImageUrl1 = photo1; // A placeholder image
// const heroImageUrl2 = photo1; // A placeholder image
const heroImageUrl3 = photo3; // A placeholder image
// const heroImageUrl4 = photo4; // A placeholder image
const heroImageUrl5 = photo5; // A placeholder image
// const heroImageUrl6 = photo6; // A placeholder image
// const heroImageUrl7 = photo7; // A placeholder image
const heroImageUrl8 = photo8; // A placeholder image


const HomePage = () => {
    const navigate = useNavigate()
    // Data for features section for cleaner JSX
    const features = [
        {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: 'AI-Powered Content',
            description: 'Stuck on what to write? Generate engaging captions and relevant hashtags instantly based on your post title and content.',
        },
        {
            icon: <Calendar className="w-8 h-8 text-blue-400" />,
            title: 'Effortless Scheduling',
            description: 'Plan your content calendar weeks in advance. Set the date and time, and let our system post for you automatically.',
        },
        {
            icon: <LayoutGrid className="w-8 h-8 text-green-400" />,
            title: 'Centralized Management',
            description: 'Manage all your posts for different platforms from a single, intuitive dashboard. See what\'s scheduled, what\'s posted, and what needs attention.',
        },
    ];

    return (
        <div className="bg-gray-900 text-white font-sans">
            {/* --- Navigation Bar --- */}
            {/* <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">AutoPoster AI</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
            Log In
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Sign Up Free
          </button>
        </div>
      </nav> */}
            <Navbar />

            {/* --- Hero Section --- */}
            <header className="container mx-auto px-6 py-24 text-center ">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-20">
                    Your Smart Social Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Assistant</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                    Save time, create better content, and post consistently. Our AI-powered tool helps you schedule posts and generate captions in seconds.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
                        onClick={() => { navigate("/createpost") }}
                    >
                        Get Started For Free <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* --- Visual Showcase --- */}
            <div className="container mx-auto px-6 flex gap-5 p-2">
                <img src={heroImageUrl8} alt="Dashboard preview"
                    className="mx-auto w-90 h-90 rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103" />
                <img src={heroImageUrl3} alt="Dashboard preview"
                    className="mx-auto w-90 h-90 rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103" />
                <img src={heroImageUrl5} alt="Dashboard preview"
                    className="mx-auto w-90 h-90 rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103" />
                {/* <img src={heroImageUrl4} alt="Dashboard preview" className="rounded-xl shadow-2xl shadow-blue-500/20 mx-auto h-100 w-150" />
         <img src={heroImageUrl5} alt="Dashboard preview" className="rounded-xl shadow-2xl shadow-blue-500/20 mx-auto h-100 w-150" />
         <img src={heroImageUrl6} alt="Dashboard preview" className="rounded-xl shadow-2xl shadow-blue-500/20 mx-auto h-100 w-150" />
         <img src={heroImageUrl7} alt="Dashboard preview" className="rounded-xl shadow-2xl shadow-blue-500/20 mx-auto h-100 w-150" />
         <img src={heroImageUrl8} alt="Dashboard preview" className="rounded-xl shadow-2xl shadow-blue-500/20 mx-auto h-100 w-150" /> */}
            </div>


            {/* --- Features Section --- */}
            <section id="features" className="container mx-auto px-6 py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Go Viral</h2>
                    <p className="mt-2 text-gray-400">Powerful features to streamline your workflow.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                            <div className="bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- "How It Works" Section --- */}
            <section className="container mx-auto px-6 py-15 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Get Started in 3 Simple Steps</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    {/* Step 1 */}
                    <div className="text-center max-w-xs">
                        <div className="text-blue-500 font-bold text-6xl mb-2">1</div>
                        <h3 className="text-xl font-semibold mb-2">Create Your Post</h3>
                        <p className="text-gray-400">Draft your content and add your images, just like you normally would.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="text-center max-w-xs">
                        <div className="text-purple-500 font-bold text-6xl mb-2">2</div>
                        <h3 className="text-xl font-semibold mb-2">Generate with AI</h3>
                        <p className="text-gray-400">Click a button to get smart, context-aware captions and hashtags instantly.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="text-center max-w-xs">
                        <div className="text-green-500 font-bold text-6xl mb-2">3</div>
                        <h3 className="text-xl font-semibold mb-2">Schedule & Relax</h3>
                        <p className="text-gray-400">Pick a time and let our system handle the posting. It's that simple!</p>
                    </div>
                </div>
            </section>

            {/* --- Final Call to Action Section --- */}
            {/* <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Supercharge Your Social Media?</h2>
          <p className="mt-4 text-lg text-blue-100">Join now and start automating your content strategy today.</p>
          <div className="mt-8">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform">
              Sign Up - It's Free!
            </button>
          </div>
        </div>
      </section> */}

            {/* --- Footer --- */}
            <footer className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-8 flex justify-between items-center">
                    <p className="text-gray-500">&copy; 2025 AutoPoster AI. All rights reserved.</p>
                    <div className="flex gap-4 text-gray-500">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
