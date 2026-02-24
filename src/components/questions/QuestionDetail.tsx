import { useState } from 'react';
import type { Question, Status } from '../../types';
import Avatar from '../ui/Avatar';
import StatusBadge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { Select } from '../ui/Input';
import QuestionForm from './QuestionForm';
import { timeAgo } from '../../utils';
import { colors, typography } from '../../styles/tokens';
import { windowChrome } from '../../styles/common';

const STATUS_OPTIONS: { value: Status; label: string }[] = [
    { value: 'open',     label: 'open' },
    { value: 'answered', label: 'answered' },
    { value: 'closed',   label: 'closed' },
];

interface QuestionDetailProps {
    question: Question;
    currentUser: string;
    onUpdateStatus: (id: string, status: Status) => void;
    onEditQuestion: (id: string, title: string, description: string) => void;
}

export default function QuestionDetail({ question, currentUser, onUpdateStatus, onEditQuestion }: QuestionDetailProps) {
    const [showEdit, setShowEdit] = useState(false);
    const isOwner = question.author === currentUser;

    return (
        <>
            {showEdit && (
                <Modal title="edit_question.md" onClose={() => setShowEdit(false)}>
                    <QuestionForm
                        initial={question}
                        onSubmit={(t, d) => { onEditQuestion(question.id, t, d); setShowEdit(false); }}
                        onClose={() => setShowEdit(false)}
                    />
                </Modal>
            )}

            <div style={{ background: colors.bg1, border: `1px solid ${colors.border1}`, borderRadius: 10, overflow: 'hidden', marginBottom: 28 }}>
                {/* Chrome bar */}
                <div style={{ ...windowChrome, flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {[colors.danger, colors.warning, colors.success].map((bg) => (
                            <span key={bg} style={{ width: 12, height: 12, borderRadius: '50%', background: bg, display: 'inline-block' }} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <StatusBadge status={question.status} />
                        {isOwner && (
                            <>
                                <Select
                                    value={question.status}
                                    onChange={(v) => onUpdateStatus(question.id, v as Status)}
                                    options={STATUS_OPTIONS}
                                />
                                <Button variant="secondary" onClick={() => setShowEdit(true)} style={{ padding: '4px 10px', fontSize: typography.sizes.sm }}>
                                    ✎ edit
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 28px' }}>
                    <h1 style={{ color: colors.textPrimary, fontSize: typography.sizes['2xl'], fontWeight: typography.weights.black, margin: '0 0 16px', fontFamily: typography.fontMono, lineHeight: 1.4 }}>
                        {question.title}
                    </h1>
                    <p style={{ color: colors.textMuted, fontSize: typography.sizes.md, lineHeight: 1.8, margin: '0 0 20px', whiteSpace: 'pre-wrap' }}>
                        {question.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: `1px solid ${colors.border0}` }}>
                        <Avatar name={question.author} size={24} />
                        <span style={{ color: colors.textMuted, fontSize: typography.sizes.sm, fontFamily: typography.fontMono }}>
              @{question.author}
            </span>
                        <span style={{ color: colors.textDim, fontSize: typography.sizes.sm, fontFamily: typography.fontMono }}>
              · {timeAgo(question.createdAt)} · {new Date(question.createdAt).toLocaleDateString()}
            </span>
                    </div>
                </div>
            </div>
        </>
    );
}