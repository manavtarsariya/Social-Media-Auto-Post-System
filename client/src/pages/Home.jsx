import React from 'react';
import { Sparkles, Calendar, LayoutGrid, Zap, ArrowRight, Bot } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import photo1 from "../assets/Lucid_Origin_A_modern_vibrant_illustration_showing_a_person_si_1.jpg";
import photo2 from "../assets/Gemini_Generated_Image_gbz89pgbz89pgbz8.png";
import photo3 from "../assets/Lucid_Origin_A_cheerful_person_relaxing_on_a_sofa_with_a_phone_2.jpg";
import { useNavigate } from 'react-router';
import Footer from '@/components/layout/Footer';


const heroImageUrl1 = photo1; 
const heroImageUrl2 = photo2;
const heroImageUrl3 = photo3;


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
                <img src={heroImageUrl1} alt="Dashboard preview"
                    className="mx-auto w-90 h-90 rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103" />
                <img src={heroImageUrl2} alt="Dashboard preview"
                    className="mx-auto w-90 h-90 rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103" />
                <img src={heroImageUrl3} alt="Dashboard preview"
                    className="mx-auto w-90 h-90 rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103" />
              </div>


            {/* --- Features Section --- */}
            <section id="features" className="container mx-auto px-6 py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Go Viral</h2>
                    <p className="mt-2 text-gray-400">Powerful features to streamline your workflow.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-lg border border-gray-700 mx-auto shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transform transition duration-300 ease-in-out hover:scale-103">
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

            {/* --- Footer --- */}
            <Footer/>
        </div>
    );
};

export default HomePage;
