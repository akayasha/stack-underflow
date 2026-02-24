import type { Question, Comment } from './types';

export const INITIAL_QUESTIONS: Question[] = [
    {
        id: '1',
        title: 'How to centre a div vertically and horizontally?',
        description:
            "I've been wrestling with CSS for 3 hours. Nothing works. Tried margin: auto, position absolute, everything. Please send help.",
        status: 'answered',
        author: 'css_victim',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
        id: '2',
        title: 'Why does JavaScript think 0.1 + 0.2 !== 0.3?',
        description:
            'Ran this in the console and got 0.30000000000000004. Is this a bug? Has no one noticed this before? Are we all just fine with this?',
        status: 'open',
        author: 'floating_despair',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
        id: '3',
        title: 'Git keeps asking for my password on every push',
        description:
            'Even after setting up SSH keys. Tried everything on Stack Overflow. The accepted answer is from 2013. Nothing helps.',
        status: 'closed',
        author: 'SeniorDev',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
];

export const INITIAL_COMMENTS: Comment[] = [
    {
        id: 'c1',
        questionId: '1',
        author: 'layout_wizard',
        text: 'display: flex; align-items: center; justify-content: center; on the parent. You\'re welcome. That\'ll be $500.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: 'c2',
        questionId: '1',
        author: 'css_victim',
        text: 'Oh my god. That\'s it. That\'s all it was. I hate this.',
        createdAt: new Date(Date.now() - 82000000).toISOString(),
    },
];