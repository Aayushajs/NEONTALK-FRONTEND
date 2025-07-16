import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      {/* Animated Bell */}
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-primary/10 rounded-full animate-ping opacity-75"></div>
        <div className="relative size-20 rounded-full bg-primary/5 flex items-center justify-center">
          <BellIcon className="size-10 text-primary animate-bounce" />
        </div>
      </div>

      {/* Ripple Effect Circles */}
      <div className="relative -mt-12 mb-12 h-8 w-full flex justify-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-primary/30 rounded-full"
            style={{
              width: `${20 + i * 20}px`,
              height: `${20 + i * 20}px`,
              animation: `ripple 2s ease-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
        No notifications yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        When you receive friend requests or messages, they'll appear here.
      </p>

      {/* Add these styles to your CSS file or global styles */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default NoNotificationsFound;