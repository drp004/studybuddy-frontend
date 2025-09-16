import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { BookOpen } from 'lucide-react';

const team = [
  {
    name: 'Ritul Singh',
    role: 'Group Leader & Manager',
    bio: 'Former Google AI researcher with a passion for educational technology.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop',
    initials: 'RS',
  },
  {
    name: 'Dhruv Patel',
    role: 'AI Engineer & Model Trainer',
    bio: 'Machine learning expert with 10+ years experience in NLP.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop',
    initials: 'DP',
  },
  {
    name: 'Prakruti Parmar',
    role: ' UI/UX Designer, Documentation & Testing Lead',
    bio: 'EdTech innovator focused on creating intuitive learning experiences.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop',
    initials: 'PP',
  },
  {
    name: ' Parth Gohil ',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in AI-powered applications.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    initials: 'PG',
  },
];

export default function About() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the team behind NoteMate, dedicated to revolutionizing how
            people learn and process information.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}