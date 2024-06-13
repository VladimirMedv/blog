import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    if (post && post.content) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [post]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };

      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  const renderContentWithCopyButtons = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const elements = Array.from(doc.body.childNodes);

    return elements.map((element, index) => {
      if (element.nodeName.toLowerCase() === "pre") {
        const codeContent = element.innerHTML;
        return (
          <div key={index} className="relative bg-black p-1 rounded  mt-3 mb-3">
            <pre className="overflow-auto">
              <code
                dangerouslySetInnerHTML={{ __html: codeContent }}
                className="text-white"
              />
            </pre>
            <CopyToClipboard text={element.textContent}>
              <button className="absolute top-2 right-2 bg-gray-500 text-white px-1 py-1 text-sm hover:bg-gray-700 transition">
                Copy code
              </button>
            </CopyToClipboard>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: element.outerHTML }}
          />
        );
      }
    });
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-serif mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content">
        {post && renderContentWithCopyButtons(post.content)}
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post && post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {recentPosts &&
            recentPosts.map((post) => <PostCard post={post} key={post._id} />)}
        </div>
      </div>
    </main>
  );
}
