import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PanelLeftOpen, PanelLeftClose, Image, Video, Camera, Send, Plus, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Chat() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [chatHistory] = useState([
    { id: 1, text: 'Convert my lecture notes to structured format', date: '2024-03-20' },
    { id: 2, text: 'Summarize this research paper', date: '2024-03-19' },
    { id: 3, text: 'Create presentation from my notes', date: '2024-03-18' },
  ]);

  const uploadOptions = [
    { icon: Image, label: 'Upload Image' },
    { icon: Video, label: 'Upload Video' },
    { icon: Camera, label: 'Camera Access' },
  ];

  return (
    <PageTransition>
      {/* Minimal Header */}
      <div className="border-b border-border py-2 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl">NoteMate</span>
        </Link>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar with integrated toggle button */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-80 border-r border-border bg-card relative"
            >
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold">Chat History</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <PanelLeftClose className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="p-2">
                  {chatHistory.map((chat) => (
                    <motion.div
                      key={chat.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg hover:bg-muted cursor-pointer mb-2"
                    >
                      <p className="text-sm font-medium">{chat.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.date}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Toggle Sidebar Button (only shown when sidebar is closed) */}
          {!isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-50"
              onClick={() => setSidebarOpen(true)}
            >
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-center px-4 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50"
              style={{ 
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite',
              }}
            >
              Make your Life Easy
            </motion.h1>

            {/* Input Area */}
            <div className="w-full max-w-4xl mt-auto px-4">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="pr-24 pl-16 py-8 rounded-xl text-lg"
                />
                
                {/* Upload Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-2 bottom-2 p-2 hover:bg-muted rounded-full"
                  onClick={() => setUploadDialogOpen(true)}
                >
                  <Plus className="h-6 w-6" />
                </motion.button>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 bottom-2 p-2 hover:bg-muted rounded-full"
                >
                  <Send className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Options Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="grid grid-cols-3 gap-4 p-4">
            {uploadOptions.map(({ icon: Icon, label }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted"
              >
                <Icon className="h-8 w-8" />
                <span className="text-sm font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </PageTransition>
  );
}