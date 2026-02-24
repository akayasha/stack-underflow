import type { Question, Comment, Status } from '../types';
import QuestionDetail from '../components/questions/QuestionDetail';
import CommentCard from '../components/comments/CommentCard';
import CommentForm from '../components/comments/CommentForm';
import Button from '../components/ui/Button';
import { colors, typography } from '../styles/tokens';

interface QuestionDetailViewProps {
    question: Question;
    currentUser: string;
    comments: Comment[];
    onBack: () => void;
    onAddComment: (questionId: string, text: string) => void;
    onEditComment: (id: string, text: string) => void;
    onUpdateStatus: (id: string, status: Status) => void;
    onEditQuestion: (id: string, title: string, description: string) => void;
}

export default function QuestionDetailView({
                                               question,
                                               currentUser,
                                               comments,
                                               onBack,
                                               onAddComment,
                                               onEditComment,
                                               onUpdateStatus,
                                               onEditQuestion,
                                           }: QuestionDetailViewProps) {
    return (
        <div className="animate-fade-in" style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px 60px' }}>
            {/* Back */}
            <Button
                variant="ghost"
                onClick={onBack}
                style={{ marginBottom: 20, fontSize: typography.sizes.base, color: colors.textMuted }}
            >
                ← back to questions
            </Button>

            {/* Question */}
            <QuestionDetail
                question={question}
                currentUser={currentUser}
                onUpdateStatus={onUpdateStatus}
                onEditQuestion={onEditQuestion}
            />

            {/* Comments section */}
            <section style={{ maxWidth: 700 }}>
                <h3 style={{ color: colors.textPrimary, fontSize: typography.sizes.md, fontWeight: typography.weights.bold, fontFamily: typography.fontMono, margin: '0 0 14px' }}>
                    <span style={{ color: colors.textMuted }}>// </span>
                    {comments.length} comment{comments.length !== 1 ? 's' : ''}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {comments.length === 0 ? (
                        <div style={{
                            border: `1px dashed ${colors.border0}`,
                            borderRadius: 8,
                            padding: '28px 20px',
                            textAlign: 'center',
                            color: colors.textDim,
                            fontFamily: typography.fontMono,
                            fontSize: typography.sizes.base,
                        }}>
                            no comments yet · be the first
                        </div>
                    ) : (
                        comments.map((c) => (
                            <CommentCard
                                key={c.id}
                                comment={c}
                                currentUser={currentUser}
                                onEdit={onEditComment}
                            />
                        ))
                    )}
                </div>

                <CommentForm
                    questionId={question.id}
                    currentUser={currentUser}
                    onSubmit={onAddComment}
                />
            </section>
        </div>
    );
}