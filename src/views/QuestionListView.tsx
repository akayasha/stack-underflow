import { useState } from 'react';
import type { Question, Comment, Status } from '../types';
import QuestionCard from '../components/questions/QuestionCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import QuestionForm from '../components/questions/QuestionForm';
import { Input } from '../components/ui/Input';
import { colors, typography } from '../styles/tokens';

const FILTER_OPTIONS: { value: Status | 'all'; label: string }[] = [
    { value: 'all',      label: 'all' },
    { value: 'open',     label: 'open' },
    { value: 'answered', label: 'answered' },
    { value: 'closed',   label: 'closed' },
];

interface QuestionListViewProps {
    user: string;
    questions: Question[];
    comments: Comment[];
    onSelectQuestion: (id: string) => void;
    onAddQuestion: (title: string, description: string) => void;
}

export default function QuestionListView({
                                             user,
                                             questions,
                                             comments,
                                             onSelectQuestion,
                                             onAddQuestion,
                                         }: QuestionListViewProps) {
    const [search, setSearch]           = useState('');
    const [filter, setFilter]           = useState<Status | 'all'>('all');
    const [showModal, setShowModal]     = useState(false);

    const filtered = questions.filter((q) => {
        const matchSearch = q.title.toLowerCase().includes(search.toLowerCase())
            || q.description.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filter === 'all' || q.status === filter;
        return matchSearch && matchStatus;
    });

    const commentCountFor = (qId: string) => comments.filter((c) => c.questionId === qId).length;

    return (
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px 60px' }}>
            {showModal && (
                <Modal title="new_question.md" onClose={() => setShowModal(false)}>
                    <QuestionForm
                        onSubmit={(t, d) => { onAddQuestion(t, d); setShowModal(false); }}
                        onClose={() => setShowModal(false)}
                    />
                </Modal>
            )}

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
                <div>
                    <h2 style={{ color: colors.textPrimary, fontSize: 20, fontWeight: typography.weights.black, margin: 0, fontFamily: typography.fontMono }}>
                        <span style={{ color: colors.textMuted }}>~/</span>questions
                    </h2>
                    <p style={{ color: colors.textDim, fontSize: typography.sizes.sm, margin: '4px 0 0', fontFamily: typography.fontMono }}>
                        {questions.length} question{questions.length !== 1 ? 's' : ''} · logged in as{' '}
                        <span style={{ color: colors.green }}>@{user}</span>
                    </p>
                </div>
                <Button onClick={() => setShowModal(true)}>+ new question</Button>
            </div>

            {/* Search + filter */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                <Input
                    style={{ flex: 1, minWidth: 180 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="// search questions..."
                />
                {FILTER_OPTIONS.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        style={{
                            background:   filter === value ? colors.bg3    : 'transparent',
                            border:       `1px solid ${filter === value ? colors.blue : colors.border1}`,
                            color:        filter === value ? colors.blue   : colors.textMuted,
                            borderRadius: 6,
                            padding:      '6px 14px',
                            fontSize:     typography.sizes.sm,
                            cursor:       'pointer',
                            fontFamily:   typography.fontMono,
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '60px 20px', color: colors.textDim,
                        fontFamily: typography.fontMono, fontSize: typography.sizes.md,
                        border: `1px dashed ${colors.border0}`, borderRadius: 10,
                    }}>
                        <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                        no questions found
                    </div>
                ) : (
                    filtered.map((q) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            commentCount={commentCountFor(q.id)}
                            onClick={() => onSelectQuestion(q.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}