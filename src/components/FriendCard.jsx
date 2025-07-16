import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-100 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
      <div className="card-body p-5">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="size-14 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img 
                src={friend.profilePic} 
                alt={friend.fullName} 
                className="object-cover"
                onError={(e) => {
                  e.target.src = 'https://i.pravatar.cc/150?img=3'; // Fallback avatar
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate text-gray-900 dark:text-white">
              {friend.fullName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              @{friend.username}
            </p>
          </div>
        </div>

        {/* LANGUAGE BADGES */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="badge badge-lg bg-primary/10 text-primary border-primary/20">
            <div className="flex items-center gap-1.5">
              {getLanguageFlag(friend.nativeLanguage)}
              <span>Native: {friend.nativeLanguage}</span>
            </div>
          </div>
          <div className="badge badge-lg bg-secondary/10 text-secondary border-secondary/20">
            <div className="flex items-center gap-1.5">
              {getLanguageFlag(friend.learningLanguage)}
              <span>Reason : {friend.learningLanguage}</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary btn-block hover:scale-[1.02] transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-4 w-6 object-cover rounded-sm inline-block mr-1.5"
        loading="lazy"
      />
    );
  }
  return null;
}