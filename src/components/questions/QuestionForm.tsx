import { useState } from 'react';
import type { Question } from '../../types';
import Button from '../ui/Button';
import { Field, Input, Textarea } from '../ui/Input';

interface QuestionFormProps {
    /** Pass an existing question to pre-fill for editing; omit for creation. */
    initial?: Pick<Question, 'title' | 'description'>;
    onSubmit: (title: string, description: string) => void;
    onClose: () => void;
}

export default function QuestionForm({ initial, onSubmit, onClose }: QuestionFormProps) {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [desc, setDesc]   = useState(initial?.description ?? '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const t = title.trim();
        const d = desc.trim();
        if (t && d) onSubmit(t, d);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="title">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's your question?"
                    required
                    autoFocus
                />
            </Field>

            <Field label="description">
                <Textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe the problem in detail..."
                    minHeight={120}
                    required
                />
            </Field>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                <Button type="submit">{initial ? 'Save Changes' : 'Post Question'}</Button>
            </div>
        </form>
    );
}