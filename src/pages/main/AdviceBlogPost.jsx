import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

// Mock data
const mockAdvices = [
  {
    _id: "685709cbbc451d9b3e2ecea7",
    title: "Reduce Sodium Intake",
    description:
      "Lowering salt in your diet helps manage blood pressure and reduce heart disease risk.",
    doctorName: "Meredith Grey",
    diseasesCategoryName: "Lung",
    ImgUrl:
      "https://res.cloudinary.com/dweffiohi/image/upload/v1750534603/ukn1qnqhx2vzlicr3xu5.jpg",
    createdAt: "2025-06-21T19:36:43.683Z",
  },
  // Add more if needed
];

const AdviceBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = mockAdvices.find((p) => p._id === id);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const readTime = (text) => {
    const wpm = 200;
    const words = text?.trim().split(/\s+/).length || 0;
    return Math.ceil(words / wpm);
  };

  if (!post) return <div className="text-center py-20 text-gray-500">Post not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm mb-4"
        >
          ← Back to Community
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Meta Info */}
        <div className="flex items-center text-gray-500 text-sm space-x-4 mb-6">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{readTime(post.description)} min read</span>
          </div>
          <span>•</span>
          <span>{post.diseasesCategoryName}</span>
        </div>

        {/* Image */}
        <img
          src={post.ImgUrl}
          alt={post.title}
          className="w-full h-full object-cover rounded-xl shadow mb-8"
        />

        {/* Body */}
        <p className="text-lg text-gray-800 leading-relaxed mb-12">
          {post.description}
        </p>

        {/* Author Card */}
        <div className="flex items-center space-x-4 -xl p-4">
          <img
            src="../../assets/doctor-F.png"
            alt={post.doctorName}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-700">Written by</p>
            <p className="text-base font-medium text-gray-900">{post.doctorName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceBlogPost;
