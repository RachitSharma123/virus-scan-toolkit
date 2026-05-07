import { useState } from 'react';

/**
 * Comment box allowing users to leave a cute message on a memory. Displays
 * existing comments and a field to add new ones. Comments are stored in
 * component state and persisted by the parent via callback.
 *
 * @param {Object} props
 * @param {Array} props.comments - Current list of comments
 * @param {Function} props.addComment - Callback to add a new comment
 */
export default function CommentBox({ comments, addComment }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text.trim());
    setText('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-dark mb-4">Comments</h3>
      {comments.length === 0 && (
        <p className="text-sm text-gray-500 mb-4">Be the first to leave a comment ♥️</p>
      )}
      <ul className="space-y-3 mb-6">
        {comments.map((comment, idx) => (
          <li key={idx} className="bg-secondary/50 rounded-lg p-3 text-gray-800">
            {comment}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a comment..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-rose transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
}