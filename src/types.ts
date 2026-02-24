export type Status = 'open' | 'answered' | 'closed';

export interface Question {
    id: string;
    title: string;
    description: string;
    status: Status;
    author: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    questionId: string;
    author: string;
    text: string;
    createdAt: string;
}