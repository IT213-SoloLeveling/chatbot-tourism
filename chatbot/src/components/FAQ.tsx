import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What programs are offered in the Tourism & Hospitality Department?",
    answer: "BSTM & BSHM\n\nBSTM – Bachelor of Science in Tourism Management\nFocuses on airlines, travel agencies, tour guiding, events, and destinations.\n\nBSHM – Bachelor of Science in Hospitality Management\nFocuses on hotels, restaurants, cooking, events, and customer service."
  },
  {
    id: 2,
    question: "Does the department have real-world industry partnerships?",
    answer: "Yes! We have partnerships with Bayfront Hotel, Waterfront Hotel, and Jeju Air for practical training and internship opportunities."
  },
  {
    id: 3,
    question: "What specific courses are included in the BSTM curriculum?",
    answer: "The BSTM curriculum includes comprehensive courses covering tourism management, airline operations, travel agency management, tour guiding techniques, event planning, destination management, and cultural studies. Please contact the department for the complete curriculum details."
  },
  {
    id: 4,
    question: "Are there notable student events or competitions?",
    answer: "Yes! The department organizes a multi-day event featuring competitions like bartending, market basket, tray relay, housekeeping, airline voice over, tour guiding/vlogging, and hair & makeup."
  },
  {
    id: 5,
    question: "What practical training is included?",
    answer: "Labs and simulations in both programs, plus internships via industry partners to give you real-world experience in professional environments."
  },
  {
    id: 6,
    question: "What extra costs should I expect as a Tourism or Hospitality Management student?",
    answer: "Additional expenses for Lab Uniform, culinary ingredients, Event participation fees (MICE), and OJT requirements."
  },
  {
    id: 7,
    question: "What's the academic content like?",
    answer: "Heavy on memorization (maps, cultures), system use like Amadeus, Property Management System (PMS), and event planning (MICE)."
  },
  {
    id: 8,
    question: "What jobs can I get after graduation?",
    answer: "BSTM graduates can become:\n• Travel or tour agents\n• Flight attendants\n• Tourism officers\n• Event organizers\n\nBSHM graduates can become:\n• Hotel or resort managers\n• Chefs or kitchen supervisors\n• Front desk managers\n• F&B supervisors"
  },
  {
    id: 9,
    question: "Do we need to take a thesis or research subject?",
    answer: "Yes, usually in your 3rd or 4th year you'll complete a thesis or research project as part of your degree requirements."
  },
  {
    id: 10,
    question: "Who is your creator?",
    answer: "This chatbot was developed by Group AUZA:\n\n• Francisco Dag-uman\n• Martin John Bacho\n• Ryan Galano\n• Ramsil Calapre"
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle className="text-primary glow-primary" size={32} />
          <h2 className="text-3xl font-futuristic font-bold text-glow">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about our Tourism & Hospitality programs
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => (
          <Card 
            key={item.id} 
            className="glow-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:glow-subtle"
          >
            <CardHeader 
              className="cursor-pointer py-4"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-left text-lg font-semibold pr-4">
                  {item.question}
                </CardTitle>
                <div className="flex-shrink-0">
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="text-primary glow-primary" size={24} />
                  ) : (
                    <ChevronDown className="text-primary glow-primary" size={24} />
                  )}
                </div>
              </div>
            </CardHeader>
            
            {openItems.includes(item.id) && (
              <CardContent className="pt-0 pb-6 animate-accordion-down">
                <div className="border-t border-border/30 pt-4">
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}