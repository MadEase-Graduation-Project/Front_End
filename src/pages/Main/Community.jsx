import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  User,
  Tag,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react";

// Mock data for advice articles
const mockAdvices = [
  {
    id: 1,
    title: "Managing Diabetes Through Diet and Exercise",
    excerpt:
      "Learn how to control your blood sugar levels through proper nutrition and regular physical activity.",
    content:
      "Diabetes is a chronic condition that affects how your body processes blood sugar. Managing it effectively requires a combination of proper diet, regular exercise, and medication if prescribed. In this article, we'll explore evidence-based strategies to help you maintain healthy blood sugar levels...",
    author: {
      id: 101,
      name: "Dr. Sarah Johnson",
      specialty: "Endocrinology",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    category: "Chronic Disease Management",
    tags: ["Diabetes", "Nutrition", "Exercise", "Health Management"],
    publishedDate: "2023-05-15T10:30:00Z",
    readTime: 8,
    likes: 245,
    comments: 42,
    shares: 78,
  },
  {
    id: 2,
    title: "Understanding Anxiety Disorders: Symptoms and Treatment Options",
    excerpt:
      "A comprehensive guide to recognizing anxiety symptoms and exploring various treatment approaches.",
    content:
      "Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. They can manifest in various forms, including generalized anxiety disorder, panic disorder, social anxiety, and specific phobias. This article aims to help you understand the symptoms and explore evidence-based treatment options...",
    author: {
      id: 102,
      name: "Dr. Michael Brown",
      specialty: "Psychiatry",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    category: "Mental Health",
    tags: ["Anxiety", "Mental Health", "Therapy", "Self-care"],
    publishedDate: "2023-06-02T14:15:00Z",
    readTime: 10,
    likes: 312,
    comments: 67,
    shares: 124,
  },
  {
    id: 3,
    title: "Heart Health: Prevention Strategies for Cardiovascular Disease",
    excerpt:
      "Discover practical steps to maintain a healthy heart and reduce your risk of cardiovascular disease.",
    content:
      "Cardiovascular disease remains the leading cause of death globally. However, many risk factors are modifiable through lifestyle changes. This article outlines evidence-based strategies to maintain heart health and prevent cardiovascular disease...",
    author: {
      id: 103,
      name: "Dr. Emily Davis",
      specialty: "Cardiology",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    category: "Preventive Medicine",
    tags: ["Heart Health", "Cardiovascular", "Prevention", "Lifestyle"],
    publishedDate: "2023-06-20T09:45:00Z",
    readTime: 7,
    likes: 189,
    comments: 35,
    shares: 92,
  },
  {
    id: 4,
    title: "Sleep Hygiene: Improving Your Sleep Quality for Better Health",
    excerpt:
      "Learn effective techniques to improve your sleep habits and enhance overall well-being.",
    content:
      "Quality sleep is essential for physical health, cognitive function, and emotional well-being. Yet, many people struggle with sleep disorders or poor sleep habits. This article provides practical advice for improving your sleep hygiene and addressing common sleep problems...",
    author: {
      id: 104,
      name: "Dr. Robert Wilson",
      specialty: "Neurology",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    category: "Sleep Medicine",
    tags: ["Sleep", "Insomnia", "Health", "Wellness"],
    publishedDate: "2023-07-05T16:20:00Z",
    readTime: 6,
    likes: 276,
    comments: 51,
    shares: 83,
  },
  {
    id: 5,
    title: "Nutrition Myths Debunked: Evidence-Based Dietary Advice",
    excerpt:
      "Separating fact from fiction in the world of nutrition with science-backed information.",
    content:
      "In the age of information overload, nutrition advice can be contradictory and confusing. This article aims to debunk common nutrition myths and provide evidence-based guidance for making healthy dietary choices...",
    author: {
      id: 105,
      name: "Dr. Jennifer Martinez",
      specialty: "Nutrition",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    category: "Nutrition",
    tags: ["Diet", "Nutrition", "Food Science", "Healthy Eating"],
    publishedDate: "2023-07-18T11:10:00Z",
    readTime: 9,
    likes: 342,
    comments: 78,
    shares: 156,
  },
  {
    id: 6,
    title: "Childhood Vaccinations: What Parents Need to Know",
    excerpt:
      "A guide to understanding the importance of vaccines and addressing common concerns.",
    content:
      "Vaccinations are one of the most significant public health achievements, preventing millions of illnesses and deaths. This article provides parents with essential information about childhood vaccines, their safety, and effectiveness...",
    author: {
      id: 106,
      name: "Dr. David Thompson",
      specialty: "Pediatrics",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    },
    category: "Pediatric Health",
    tags: ["Vaccines", "Children's Health", "Immunization", "Preventive Care"],
    publishedDate: "2023-08-03T13:25:00Z",
    readTime: 11,
    likes: 198,
    comments: 92,
    shares: 215,
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Chronic Disease Management",
  "Mental Health",
  "Preventive Medicine",
  "Sleep Medicine",
  "Nutrition",
  "Pediatric Health",
];

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredAdvices, setFilteredAdvices] = useState([]);
  const [featuredAdvice, setFeaturedAdvice] = useState(null);

  useEffect(() => {
    // Set the first article as featured
    setFeaturedAdvice(mockAdvices[0]);

    // Filter advices based on search query and category
    filterAdvices();
  }, [searchQuery, selectedCategory]);

  const filterAdvices = () => {
    let filtered = [...mockAdvices];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (advice) =>
          advice.title.toLowerCase().includes(query) ||
          advice.excerpt.toLowerCase().includes(query) ||
          advice.author.name.toLowerCase().includes(query) ||
          advice.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (advice) => advice.category === selectedCategory
      );
    }

    setFilteredAdvices(filtered);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Medical Advice Community
            </h1>
            <p className="mt-4 text-xl">
              Expert health insights and advice from our medical professionals
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                placeholder="Search for health topics, articles, or doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex space-x-2 min-w-full pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredAdvice && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Article
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    // todo: replace with actual image URL from API
                    src={`https://picsum.photos/200/300/?blur`}
                    alt={featuredAdvice.title}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                    {featuredAdvice.category}
                  </div>
                  <Link
                    to={`/community/article/${featuredAdvice.id}`}
                    className="block mt-1 text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {featuredAdvice.title}
                  </Link>
                  <p className="mt-2 text-gray-600">{featuredAdvice.excerpt}</p>

                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={featuredAdvice.author.avatar}
                        alt={featuredAdvice.author.name}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {featuredAdvice.author.name}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <span>{formatDate(featuredAdvice.publishedDate)}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{featuredAdvice.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <Link
                      to={`/community/article/${featuredAdvice.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Read Full Article
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Articles
          </h2>

          {filteredAdvices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria. Try adjusting your
                search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAdvices.map((advice) => (
                <div
                  key={advice.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    className="h-48 w-full object-cover"
                    // todo: replace with actual image URL from API
                    src={`https://picsum.photos/id/237/200/300`}
                    alt={advice.title}
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-600">
                        {advice.category}
                      </p>
                      <Link
                        to={`/community/article/${advice.id}`}
                        className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {advice.title}
                      </Link>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">
                        {advice.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={advice.author.avatar}
                          alt={advice.author.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {advice.author.name}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={advice.publishedDate}>
                            {formatDate(advice.publishedDate)}
                          </time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{advice.readTime} min read</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{advice.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{advice.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>{advice.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
