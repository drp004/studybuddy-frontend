import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Headphones, Video, Presentation as PresentationScreen, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

const features = [
  {
    icon: FileText,
    title: 'Text-to-Notes',
    description: 'Convert any text into well-structured, easy-to-read notes instantly.',
    details: [
      'Smart summarization',
      'Key points extraction',
      'Custom formatting options',
      'Multiple export formats',
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80'
  },
  {
    icon: Headphones,
    title: 'Audio-to-Notes',
    description: 'Transform audio recordings into detailed written notes automatically.',
    details: [
      'Real-time transcription',
      'Speaker identification',
      'Timestamp markers',
      'Noise reduction',
    ],
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80'
  },
  {
    icon: Video,
    title: 'Video-to-Notes',
    description: 'Extract key points and create notes from video content effortlessly.',
    details: [
      'Automatic chapter detection',
      'Screenshot capture',
      'Caption integration',
      'Visual summaries',
    ],
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80'
  },
  {
    icon: PresentationScreen,
    title: 'Create PPT',
    description: 'Generate professional presentations from your notes with one click.',
    details: [
      'Multiple themes',
      'Smart slide organization',
      'Image suggestions',
      'Animation presets',
    ],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80'
  },
  {
    icon: BookOpen,
    title: 'Career Path',
    description: 'Get personalized career guidance based on your strengths and interests.',
    details: [
      'Skill analysis',
      'Industry matching',
      'Learning recommendations',
      'Career roadmap',
    ],
    image: 'https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?w=800&auto=format&fit=crop&q=80'
  },
];

export default function Features() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Features
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover how NoteMate can transform your learning and productivity with our powerful features.
          </motion.p>
        </div>

        <div className="grid gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Icon className="h-8 w-8" />
                        <div>
                          <CardTitle>{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {feature.details.map((detail) => (
                            <motion.li 
                              key={detail} 
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              viewport={{ once: true }}
                            >
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                    <motion.div 
                      className="relative h-64 md:h-auto overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}