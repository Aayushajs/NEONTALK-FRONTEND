import { useState, useEffect } from 'react';
import { FaSearch, FaPlay, FaRegClock, FaThumbsUp, FaUser } from 'react-icons/fa';

const YouTubeBrowser = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('trending');
  const [loading, setLoading] = useState(false);

  // Using a free proxy API that doesn't require authentication
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://youtube.thorsteinsson.is/api/search?q=${searchQuery}`
      );
      const data = await response.json();
      setVideos(data.slice(0, 12)); // Limit to 12 videos
    } catch (error) {
      console.error('Error fetching videos:', error);
      // Fallback mock data if API fails
      setVideos([
        {
          id: '1',
          title: 'How to Build a React App',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
          channel: 'CodeWithMe',
          publishedAt: '2023-05-15',
          views: '1.2M'
        },
        {
          id: '2',
          title: 'Learn JavaScript in 1 Hour',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
          channel: 'WebDev Simplified',
          publishedAt: '2023-06-20',
          views: '856K'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchVideos();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">YouTube Video Browser</h1>
          <p className="text-gray-600">Discover trending videos - No API Key Needed</p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos..."
              className="flex-1 px-4 py-3 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 transition-colors"
            >
              <FaSearch className="inline mr-2" />
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* Videos Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    10:30
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {video.title || 'No title available'}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <FaUser className="text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-600">
                      {video.channel || 'Unknown channel'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaRegClock className="mr-1" />
                      {video.publishedAt ? formatDate(video.publishedAt) : 'Unknown date'}
                    </span>
                    <span className="flex items-center">
                      <FaThumbsUp className="mr-1" />
                      {video.views || '100K'}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-red-600 hover:bg-red-700 text-white text-center py-2 font-medium transition-colors"
                >
                  <FaPlay className="inline mr-2" />
                  Watch Now
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No videos found
            </h3>
            <p className="text-gray-500">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeBrowser;