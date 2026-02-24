import type { Question } from '../../types';
import Avatar from '../ui/Avatar';
import StatusBadge from '../ui/Badge';
import { timeAgo } from '../../utils';
import { colors, typography } from '../../styles/tokens';
import { card } from '../../styles/common';

interface QuestionCardProps {
    question: Question;
    commentCount: number;
    onClick: () => void;
}

export default function QuestionCard({ question, commentCount, onClick }: QuestionCardProps) {
    return (
        <div
            className="card-hover"
            onClick={onClick}
            style={{ ...card, padding: '18px 22px', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'flex-start' }}
        >
            {/* Comment count */}
            <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 48, paddingTop: 2 }}>
                <div style={{ color: colors.textMuted, fontSize: typography.sizes.xs }}>💬</div>
                <div style={{ color: colors.textPrimary, fontWeight: typography.weights.black, fontSize: typography.sizes.xl, fontFamily: typography.fontMono }}>
                    {commentCount}
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 6 }}>
                    <StatusBadge status={question.status} />
                </div>
                <h3 style={{ color: colors.blue, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, margin: '0 0 6px', fontFamily: typography.fontMono, lineHeight: 1.4 }}>
                    {question.title}
                </h3>
                <p className="line-clamp-2" style={{ color: colors.textMuted, fontSize: typography.sizes.base, margin: '0 0 10px', lineHeight: 1.6 }}>
                    {question.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={question.author} size={18} />
                    <span style={{ color: colors.textMuted, fontSize: typography.sizes.xs, fontFamily: typography.fontMono }}>
            @{question.author} · {timeAgo(question.createdAt)}
          </span>
                </div>
            </div>
        </div>
    );
}