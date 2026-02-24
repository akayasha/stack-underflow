import { useState } from 'react';
import type { Question, Comment, Status } from './types';
import { INITIAL_QUESTIONS, INITIAL_COMMENTS } from './constants';
import { usePersistedState } from './hooks/Usepersistedstate.ts';
import { uid } from './utils';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import QuestionListView from './views/QuestionListView';
import QuestionDetailView from './views/QuestionDetailView';
import './styles/index.css';

type View = { type: 'list' } | { type: 'detail'; id: string };

// Storage keys — centralised so they're easy to change or clear
const STORAGE_KEYS = {
    questions: 'su:questions',
    comments:  'su:comments',
} as const;

export default function App() {
    // user is session-only (cleared on logout — intentional)
    const [user, setUser] = useState<string | null>(null);

    // questions & comments survive logout and page refreshes
    const [questions, setQuestions] = usePersistedState<Question[]>(STORAGE_KEYS.questions, INITIAL_QUESTIONS);
    const [comments,  setComments]  = usePersistedState<Comment[]> (STORAGE_KEYS.comments,  INITIAL_COMMENTS);

    const [view, setView] = useState<View>({ type: 'list' });

    // ── Question actions ───────────────────────────────────────────

    const addQuestion = (title: string, description: string) => {
        const q: Question = {
            id: uid(), title, description,
            status: 'open', author: user!,
            createdAt: new Date().toISOString(),
        };
        setQuestions((prev) => [q, ...prev]);
    };

    const editQuestion = (id: string, title: string, description: string) => {
        setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, title, description } : q));
    };

    const updateStatus = (id: string, status: Status) => {
        setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
    };

    // ── Comment actions ────────────────────────────────────────────

    const addComment = (questionId: string, text: string) => {
        const c: Comment = {
            id: uid(), questionId,
            author: user!, text,
            createdAt: new Date().toISOString(),
        };
        setComments((prev) => [...prev, c]);
    };

    const editComment = (id: string, text: string) => {
        setComments((prev) => prev.map((c) => c.id === id ? { ...c, text } : c));
    };

    // ── Render ─────────────────────────────────────────────────────

    if (!user) return <Login onLogin={setUser} />;

    const currentQuestion = view.type === 'detail'
        ? questions.find((q) => q.id === view.id)
        : undefined;

    return (
        <div style={{ minHeight: '100vh', background: '#010409' }}>
            <Navbar
                user={user}
                onHome={() => setView({ type: 'list' })}
                onLogout={() => { setUser(null); setView({ type: 'list' }); }}
            />

            <main style={{ paddingTop: 32 }}>
                {view.type === 'list' || !currentQuestion ? (
                    <QuestionListView
                        user={user}
                        questions={questions}
                        comments={comments}
                        onSelectQuestion={(id) => setView({ type: 'detail', id })}
                        onAddQuestion={addQuestion}
                    />
                ) : (
                    <QuestionDetailView
                        question={currentQuestion}
                        currentUser={user}
                        comments={comments.filter((c) => c.questionId === currentQuestion.id)}
                        onBack={() => setView({ type: 'list' })}
                        onAddComment={addComment}
                        onEditComment={editComment}
                        onUpdateStatus={updateStatus}
                        onEditQuestion={editQuestion}
                    />
                )}
            </main>
        </div>
    );
}