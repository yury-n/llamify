import PostCard from "./PostCard";

const PostsGrid = ({ posts, onPostRemove }) => {
  return (
    <div className="posts-stream">
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} onPostRemove={onPostRemove} />
      ))}
    </div>
  );
};

export default PostsGrid;
