import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card bg-base-100 border border-base-300 p-8 text-center max-w-md mx-auto">
      {/* Animated User Group */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full bg-primary/10 animate-ping"></div>
        </div>
        <div className="relative flex justify-center">
          <UsersIcon className="h-12 w-12 text-primary animate-bounce [animation-delay:0.2s]" />
          <UsersIcon className="h-12 w-12 text-secondary animate-bounce [animation-delay:0.4s] -ml-4" />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
        No friends yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Connect with language partners below to start practicing together!
      </p>

      {/* Pulsing CTA Button */}
      <button className="btn btn-primary relative overflow-hidden">
        <span className="relative z-10">Find Language Partners</span>
        <span className="absolute inset-0 bg-primary/20 animate-pulse rounded-lg"></span>
      </button>

      {/* Subtle floating dots animation */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default NoFriendsFound;