import { useState } from 'react';
import Button from '../ui/Button';
import { Textarea } from '../ui/Input';
import { colors, typography } from '../../styles/tokens';

interface CommentFormProps {
    questionId: string;
    currentUser: string;
    onSubmit: (questionId: string, text: string) => void;
}

export default function CommentForm({ questionId, currentUser, onSubmit }: CommentFormProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (trimmed) {
            onSubmit(questionId, trimmed);
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e as unknown as React.FormEvent);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
                <Textarea
                    style={{ flex: 1 }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`// add your comment as @${currentUser}`}
                />
                <Button type="submit" style={{ alignSelf: 'flex-end' }}>post ↵</Button>
            </form>
            <p style={{ color: colors.textDim, fontSize: typography.sizes.xs, fontFamily: typography.fontMono, marginTop: 6 }}>
                ⌘+Enter to submit
            </p>
        </div>
    );
}