import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BookOpen as LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <Link to="/chat">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
        <Card className="h-full">
          <CardHeader>
            <Icon className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="w-full h-40 rounded-md bg-muted overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {title === 'Text-to-Notes' && (
                <img 
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80" 
                  alt="Text to notes conversion" 
                  className="w-full h-full object-cover"
                />
              )}
              {title === 'Audio-to-Notes' && (
                <img 
                  src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=80" 
                  alt="Audio to notes conversion" 
                  className="w-full h-full object-cover"
                />
              )}
              {title === 'Video-to-Notes' && (
                <img 
                  src="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&auto=format&fit=crop&q=80" 
                  alt="Video to notes conversion" 
                  className="w-full h-full object-cover"
                />
              )}
              {title === 'Create PPT' && (
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80" 
                  alt="Presentation creation" 
                  className="w-full h-full object-cover"
                />
              )}
              {title === 'Career Path' && (
                <img 
                  src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?w=500&auto=format&fit=crop&q=80" 
                  alt="Career path guidance" 
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}