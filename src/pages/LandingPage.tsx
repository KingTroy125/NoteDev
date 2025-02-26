import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Notebook, Github, Moon } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-60 lg:left-80" />
      
      <div className="relative z-10">
        <nav className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <Notebook className="w-6 h-6" />
            <span className="text-xl font-mono">NoteDev</span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
            <a href="#docs" className="hover:text-gray-300 transition-colors">Docs</a>
            <a href="#community" className="hover:text-gray-300 transition-colors">Community</a>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Moon className="w-5 h-5" />
            </button>
            <a href="https://github.com/KingTroy125/NoteDev" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={() => navigate('/notes')}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Get Started
            </button>
          </div>
        </nav>

        <main className="container mx-auto px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 bg-gray-800 rounded-full text-sm mb-6"
            >
              Open Source Developer Tools
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl font-mono mb-6"
            >
              Your Ultimate Developer
              <br />
              Notebook
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto"
            >
              Simplify your workflow with essential developer notes. From code snippets to documentation,
              everything you need in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-4"
            >
              <button
                onClick={() => navigate('/notes')}
                className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                Get Started
              </button>
              <a href='https://github.com/KingTroy125/NoteDev' ><button className="border border-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors">
                View on GitHub
              </button></a>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;