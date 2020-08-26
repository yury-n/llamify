import PostCard from "./PostCard";
import CreatePostButton from "./CreatePostButton";

const PostsGrid = ({ posts, onShowPostSubmitModal, onPostRemove }) => {
  return (
    <div className="posts-stream">
      <CreatePostButton onShowPostSubmitModal={onShowPostSubmitModal} />
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} onPostRemove={onPostRemove} />
      ))}
    </div>
  );
};

export default PostsGrid;
