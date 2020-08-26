import LargePostCard from "./LargePostCard";

const PostsFeed = ({ posts }) => {
  return (
    <div className="posts-feed">
      {posts.map((post) => (
        <LargePostCard key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default PostsFeed;
