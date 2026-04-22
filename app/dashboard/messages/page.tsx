'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  Send,
  Paperclip,
  MoreHorizontal,
  Phone,
  Video,
  Star,
} from 'lucide-react';

const conversations = [
  { id: 1, name: 'Sarah Chen', avatar: 'SC', lastMessage: 'The report looks great!', time: '2m ago', unread: 2, online: true },
  { id: 2, name: 'Mike Ross', avatar: 'MR', lastMessage: 'Can you review the analytics?', time: '15m ago', unread: 0, online: true },
  { id: 3, name: 'Jessica Pearson', avatar: 'JP', lastMessage: 'Meeting at 3pm today', time: '1h ago', unread: 1, online: false },
  { id: 4, name: 'Harvey Specter', avatar: 'HS', lastMessage: 'Thanks for the update', time: '2h ago', unread: 0, online: false },
  { id: 5, name: 'Louis Litt', avatar: 'LL', lastMessage: 'Let me know when you\'re free', time: '3h ago', unread: 0, online: true },
];

const messages = [
  { id: 1, sender: 'Sarah Chen', avatar: 'SC', text: 'Hey! How\'s the Q4 report coming along?', time: '10:30 AM', isMe: false },
  { id: 2, sender: 'Me', avatar: 'H', text: 'Almost done! Just adding the final charts.', time: '10:32 AM', isMe: true },
  { id: 3, sender: 'Sarah Chen', avatar: 'SC', text: 'Great! Let me know when it\'s ready for review.', time: '10:33 AM', isMe: false },
  { id: 4, sender: 'Me', avatar: 'H', text: 'Will do. Should be ready by 2pm.', time: '10:35 AM', isMe: true },
  { id: 5, sender: 'Sarah Chen', avatar: 'SC', text: 'Perfect! The report looks amazing!', time: '2:15 PM', isMe: false },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Chat with your team members
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversations list */}
        <Card className="lg:col-span-1 border-0 shadow-sm">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {conversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    selectedChat.id === chat.id ? 'bg-violet-50 dark:bg-violet-900/20' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-white truncate">{chat.name}</p>
                      <span className="text-xs text-slate-400">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="text-xs ml-2">{chat.unread}</Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="lg:col-span-2 border-0 shadow-sm flex flex-col">
          {/* Chat header */}
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400">
                  {selectedChat.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedChat.name}</CardTitle>
                <p className="text-xs text-slate-500">{selectedChat.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[70%] ${message.isMe ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 text-xs">
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      message.isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isMe ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Input area */}
          <div className="border-t border-slate-100 dark:border-slate-800 p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}