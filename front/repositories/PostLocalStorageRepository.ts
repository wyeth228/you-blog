const PostLocalStorageRepository = {
  getPost(): string | null {
    return localStorage.getItem("post");
  },

  setPost(post: string): void {
    localStorage.setItem("post", post);
  },
};

export default PostLocalStorageRepository;
