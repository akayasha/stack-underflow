import { useState } from 'react';
import type { Comment } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Textarea } from '../ui/Input';
import { timeAgo } from '../../utils';
import { colors, typography } from '../../styles/tokens';
import { card } from '../../styles/common';

interface CommentCardProps {
    comment: Comment;
    currentUser: string;
    onEdit: (id: string, text: string) => void;
}

export default function CommentCard({ comment, currentUser, onEdit }: CommentCardProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft]     = useState(comment.text);
    const isOwner               = comment.author === currentUser;

    const handleSave = () => {
        const trimmed = draft.trim();
        if (trimmed) onEdit(comment.id, trimmed);
        setEditing(false);
    };

    const handleCancel = () => {
        setDraft(comment.text);
        setEditing(false);
    };

    return (
        <div className="card-hover" style={{ ...card, padding: '14px 18px' }}>
            {editing ? (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Textarea style={{ flex: 1 }} minHeight={72} value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <Button onClick={handleSave} style={{ padding: '6px 12px', fontSize: typography.sizes.sm }}>save</Button>
                        <Button variant="secondary" onClick={handleCancel} style={{ padding: '6px 12px', fontSize: typography.sizes.sm }}>cancel</Button>
                    </div>
                </div>
            ) : (
                <>
                    <p style={{ color: colors.textSecondary, fontSize: typography.sizes.base, margin: '0 0 10px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                        {comment.text}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Avatar name={comment.author} size={18} />
                            <span style={{ color: colors.textMuted, fontSize: typography.sizes.xs, fontFamily: typography.fontMono }}>
                @{comment.author} · {timeAgo(comment.createdAt)}
              </span>
                        </div>
                        {isOwner && (
                            <Button variant="ghost" onClick={() => setEditing(true)}>✎ edit</Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}