import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, Wifi, WifiOff } from 'lucide-react';
import hestiaAvatar from '@/assets/hestia-avatar.jpg';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Comprehensive FAQ data for offline functionality
const faqData = [
  {
    question: "What programs are offered in the Tourism & Hospitality Department?",
    answer: "BSTM & BSHM\n\nBSTM – Bachelor of Science in Tourism Management\nFocuses on airlines, travel agencies, tour guiding, events, and destinations.\n\nBSHM – Bachelor of Science in Hospitality Management\nFocuses on hotels, restaurants, cooking, events, and customer service."
  },
  {
    question: "Does the department have real-world industry partnerships?",
    answer: "Yes! We have partnerships with Bayfront Hotel, Waterfront Hotel, and Jeju Air for practical training and internship opportunities."
  },
  {
    question: "What specific courses are included in the BSTM curriculum?",
    answer: "The BSTM curriculum includes courses in tourism management, airline operations, travel agency management, tour guiding, event planning, destination management, and tourism marketing. (Note: Detailed curriculum can be provided upon request)"
  },
  {
    question: "Are there notable student events or competitions?",
    answer: "Yes! The department organizes a multi-day event featuring competitions like bartending, market basket, tray relay, housekeeping, airline voice over, tour guiding/vlogging, and hair & makeup."
  },
  {
    question: "What practical training is included?",
    answer: "Labs and simulations in both programs, plus internships via industry partners to give you real-world experience."
  },
  {
    question: "What extra costs should I expect as a Tourism or Hospitality Management student?",
    answer: "Additional expenses for Lab Uniform, culinary ingredients, Event participation fees (MICE), and OJT requirements."
  },
  {
    question: "What's the academic content like?",
    answer: "Heavy on memorization (maps, cultures), system use like Amadeus, Property Management System (PMS), and event planning (MICE)."
  },
  {
    question: "What jobs can I get after graduation?",
    answer: "BSTM graduates can become:\n• Travel or tour agents\n• Flight attendants\n• Tourism officers\n• Event organizers\n\nBSHM graduates can become:\n• Hotel or resort managers\n• Chefs or kitchen supervisors\n• Front desk managers\n• F&B supervisors"
  },
  {
    question: "Do we need to take a thesis or research subject?",
    answer: "Yes, usually in your 3rd or 4th year you'll complete a thesis or research project."
  },
  {
    question: "Who is your developer?",
    answer: "This chatbot was developed by Group AUZA:\n\n• Francisco Dag-uman\n• Martin John Bacho\n• Ryan Galano\n• Ramsil Calapre"
  }
];

// Quick response templates for common questions
const quickResponses = [
  "Tell me about the programs",
  "What are the industry partnerships?",
  "What events and competitions are there?",
  "What practical training is included?",
  "What are the extra costs?",
  "What's the academic content like?",
  "What jobs can I get?",
  "Do I need to do a thesis?",
  "Who developed this?"
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm Hestia, your Tourism & Hospitality Department assistant. I work offline too! How can I help you today?",
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const findAnswer = (question: string): string => {
    const normalizedQuestion = question.toLowerCase();
    console.log('Finding answer for:', normalizedQuestion); // Debug log
    
    // Check for exact matches first
    for (const faq of faqData) {
      const normalizedFAQ = faq.question.toLowerCase();
      if (normalizedQuestion.includes(normalizedFAQ.split(' ').slice(0, 3).join(' '))) {
        console.log('Found exact match:', faq.question); // Debug log
        return faq.answer;
      }
    }

    // Check for keyword matches
    if (normalizedQuestion.includes('program') || normalizedQuestion.includes('bstm') || normalizedQuestion.includes('bshm')) {
      console.log('Found keyword match: programs'); // Debug log
      return faqData[0].answer;
    }
    if (normalizedQuestion.includes('partnership') || normalizedQuestion.includes('industry') || normalizedQuestion.includes('bayfront') || normalizedQuestion.includes('waterfront') || normalizedQuestion.includes('jeju')) {
      return faqData[1].answer;
    }
    if (normalizedQuestion.includes('course') || normalizedQuestion.includes('curriculum') || normalizedQuestion.includes('subject')) {
      return faqData[2].answer;
    }
    if (normalizedQuestion.includes('event') || normalizedQuestion.includes('competition') || normalizedQuestion.includes('bartending') || normalizedQuestion.includes('makeup')) {
      return faqData[3].answer;
    }
    if (normalizedQuestion.includes('training') || normalizedQuestion.includes('practical') || normalizedQuestion.includes('internship')) {
      return faqData[4].answer;
    }
    if (normalizedQuestion.includes('cost') || normalizedQuestion.includes('expense') || normalizedQuestion.includes('uniform') || normalizedQuestion.includes('ojt')) {
      return faqData[5].answer;
    }
    if (normalizedQuestion.includes('academic') || normalizedQuestion.includes('content') || normalizedQuestion.includes('amadeus') || normalizedQuestion.includes('pms') || normalizedQuestion.includes('mice')) {
      return faqData[6].answer;
    }
    if (normalizedQuestion.includes('job') || normalizedQuestion.includes('career') || normalizedQuestion.includes('graduate') || normalizedQuestion.includes('work')) {
      return faqData[7].answer;
    }
    if (normalizedQuestion.includes('thesis') || normalizedQuestion.includes('research')) {
      return faqData[8].answer;
    }
    if (normalizedQuestion.includes('developer') || normalizedQuestion.includes('who made') || normalizedQuestion.includes('created by')) {
      return faqData[9].answer;
    }
    
    return "I'd be happy to help! You can ask me about:\n\n• Programs (BSTM & BSHM)\n• Industry partnerships\n• Student events and competitions\n• Practical training\n• Costs and expenses\n• Academic content\n• Career opportunities\n• Thesis requirements\n• Developer information\n\nOr try one of the quick questions below!";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    console.log('Sending message:', inputText); // Debug log

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(inputText);
      console.log('Bot response:', answer); // Debug log
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const sendQuickResponse = (response: string) => {
    setInputText(response);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[500px] sm:h-[600px] bg-card/80 backdrop-blur-sm glow-border">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <img 
                src={hestiaAvatar} 
                alt="Hestia AI Assistant" 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover glow-primary float-animation"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full pulse-glow border-2 border-background"></div>
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-futuristic font-bold text-glow">Hestia</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Tourism & Hospitality Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi size={16} className="text-green-500" />
            ) : (
              <WifiOff size={16} className="text-orange-500" />
            )}
            <span className="text-xs text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 h-[250px] sm:h-[350px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.isBot
                  ? 'chat-bubble-bot glow-subtle'
                  : 'chat-bubble-user text-primary-foreground'
              }`}
            >
              {message.isBot && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={16} className="text-primary" />
                  <span className="text-sm font-futuristic text-primary">Hestia</span>
                </div>
              )}
              <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-bot glow-subtle p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Bot size={16} className="text-primary" />
                <span className="text-sm font-futuristic text-primary">Hestia</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Thinking</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Responses */}
      <div className="px-4 sm:px-6 py-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {quickResponses.map((response, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendQuickResponse(response)}
              className="text-[10px] sm:text-xs glow-border hover:glow-subtle transition-all duration-300"
            >
              {response}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 sm:p-6 border-t border-border/50">
        <div className="flex gap-2 sm:gap-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me about Tourism & Hospitality programs..."
            className="flex-1 glow-border bg-input/50 backdrop-blur-sm"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputText.trim()}
            className="glow-primary hover:glow-intense transition-all duration-300 bg-primary hover:bg-primary-glow"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
}