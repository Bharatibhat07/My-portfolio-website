import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Message = {
  sender: "user" | "assistant";
  text: string;
};

const responses = [
  {
    tests: ["about", "who are you", "yourself", "bio"],
    answer:
      "Bharati S Bhat is a 6th semester Computer Science student at SDM Institute of Technology. She focuses on full stack development, DSA, and building real-world applications.",
  },
  {
    tests: ["education", "college", "semester", "study"],
    answer:
      "Bharati is pursuing B.E. in Computer Science and Engineering at SDM Institute of Technology, Dakshina Kannada, currently in her 6th semester.",
  },
  {
    tests: ["skills", "technology", "languages", "framework"],
    answer:
      "She works with C, Java, Python, HTML, CSS, JavaScript, React, Git, GitHub, Firebase, MongoDB, and focuses on Data Structures & Algorithms, OOP, Operating Systems, DBMS, and Computer Networks.",
  },
  {
    tests: ["experience", "work", "project", "projects"],
    answer:
      "Bharati is a fresher with hands-on project experience building full-stack web applications and backend systems. She enjoys solving real-world problems and learning new technologies.",
  },
  {
    tests: ["contact", "email", "phone", "github", "linkedin", "instagram"],
    answer:
      "You can contact Bharati at bharatibhat39@gmail.com or +91 8277333157. Her GitHub is github.com/Bharatibhat07 and her LinkedIn is linkedin.com/in/bharati-bhat-418483329.",
  },
  {
    tests: ["resume", "cv", "view cv", "download cv"],
    answer:
      "Her resume is available at /resume.pdf and includes her academic details, skills, and experience overview.",
  },
  {
    tests: ["cgpa", "score", "grade"],
    answer: "Her current CGPA is 9.0 / 10.",
  },
  {
    tests: ["focus", "goal", "interest"],
    answer: "Her main focus areas are Full Stack Development, DSA, and Problem Solving.",
  },
  {
    tests: ["domain", "url", "vercel", "site address", "live site", "deploy"],
    answer:
      "Bharati's portfolio can be deployed at https://bharatisbhat-portfolio.vercel.app/. The local development server will still use localhost or a numbered port until it is published.",
  },
];

const getResponse = (message: string) => {
  const normalized = message.toLowerCase();
  for (const response of responses) {
    if (response.tests.some((test) => normalized.includes(test))) {
      return response.answer;
    }
  }

  return (
    "I can answer questions about Bharati's portfolio, education, skills, projects, experience, and contact info. " +
    "Try asking something like 'Tell me about your skills' or 'How can I contact you?'."
  );
};

const AssistantWidget = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hi! Ask me anything about Bharati based on her portfolio and resume.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { sender: "user", text: trimmed };
    const assistantMessage: Message = {
      sender: "assistant",
      text: getResponse(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-neon-purple text-white shadow-neon-purple/40 transition hover:bg-neon-purple/90"
          aria-label="Open assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl p-0 shadow-2xl">
        <div className="flex h-full flex-col bg-slate-950 text-white">
          <div className="border-b border-white/10 px-5 py-4">
            <DialogTitle className="text-lg font-semibold">Portfolio Assistant</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Ask questions about Bharati's education, skills, experience, and resume.
            </DialogDescription>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    message.sender === "user"
                      ? "rounded-2xl rounded-br-none bg-neon-purple px-4 py-3 text-sm text-white max-w-[85%]"
                      : "rounded-2xl rounded-bl-none bg-slate-800 px-4 py-3 text-sm text-slate-100 max-w-[85%]"
                  }
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="border-t border-white/10 px-4 py-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask something..."
                className="flex-1 rounded-full border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center rounded-full bg-neon-purple px-4 text-sm font-semibold text-white transition hover:bg-neon-purple/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssistantWidget;
