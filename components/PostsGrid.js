import PostCard from "./PostCard";

const PostsGrid = ({ posts }) => {
  return (
    <div className="posts-stream">
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default PostsGrid;
