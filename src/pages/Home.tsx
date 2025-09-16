import { Link } from 'react-router-dom';
import { 
  FileText, 
  Mic, 
  Video, 
  Presentation, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: FileText,
      title: 'Document to Notes',
      description: 'Transform any document into well-structured, easy-to-read notes instantly',
      href: '/document-to-notes',
      color: 'bg-blue-500',
    },
    {
      icon: Mic,
      title: 'Audio to Notes',
      description: 'Convert audio recordings into detailed written notes automatically',
      href: '/audio-to-notes',
      color: 'bg-green-500',
    },
    {
      icon: Video,
      title: 'Video to Notes',
      description: 'Extract key points and create notes from video content effortlessly',
      href: '/video-to-notes',
      color: 'bg-purple-500',
    },
    {
      icon: Presentation,
      title: 'Create PPT',
      description: 'Generate professional presentations from your notes with one click',
      href: '/create-ppt',
      color: 'bg-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Career Path',
      description: 'Get personalized career guidance based on your strengths and interests',
      href: '/career-path',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg">
              <Sparkles className="h-5 w-5" />
              <span>AI-Powered Learning Companion</span>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Your Learning with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              NoteMate
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            Convert text, audio, and video into structured notes. Create presentations and get career guidance. 
            Your all-in-one AI learning assistant for modern education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/document-to-notes"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how NoteMate can revolutionize your learning experience with cutting-edge AI-powered tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.href}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 rounded-2xl ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                  Try it now
                  <ArrowRight className="ml-3 h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their study experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">10x</h3>
              <p className="text-lg text-gray-600 font-medium">Faster Note Creation</p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <Zap className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">95%</h3>
              <p className="text-lg text-gray-600 font-medium">Accuracy Rate</p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">50+</h3>
              <p className="text-lg text-gray-600 font-medium">AI Models</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}