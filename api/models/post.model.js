import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxJI0FyhW4l4w8oh2Jaive3K9WOScfq7qKjQAhfAQXH_fcZoLyN6UN4mcysrCOTMLSmR6DEPRCbKlfCMSccNH7v8XrfN2h3uuvHTL5heOEe6B8ksjHGV66SorxJs2s3HHasKCv54eu2SClWssAbnGXFaZBFGgJZ-XS2iCsGJK3ju4FarOrS4St9HYj0K4/s910/laptop-wood-display-aerial.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
