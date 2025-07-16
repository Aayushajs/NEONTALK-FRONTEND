import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, MessageSquareIcon, UsersIcon, MenuIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <aside className="w-64 bg-base-100 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-base-300">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              NEONTALK
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPath === "/" ? "bg-primary/10 text-primary" : "hover:bg-base-300/50"
            }`}
          >
            <HomeIcon className="size-5" />
            <span>Home</span>
          </Link>

          <Link
            to="/friends"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPath === "/friends" ? "bg-primary/10 text-primary" : "hover:bg-base-300/50"
            }`}
          >
            <UsersIcon className="size-5" />
            <span>Friends</span>
          </Link>

          <Link
            to="/notifications"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPath === "/notifications" ? "bg-primary/10 text-primary" : "hover:bg-base-300/50"
            }`}
          >
            <BellIcon className="size-5" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img src={authUser?.profilePic || 'https://i.pravatar.cc/150?img=3'} alt="User Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName || "Guest"}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Mobile Bottom Navigation
  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-50 lg:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex flex-col h-[70vh] max-h-[70vh]">
          <div className="p-4 border-b border-base-300 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-primary">
                  <img src={authUser?.profilePic || 'https://i.pravatar.cc/150?img=3'} alt="User Avatar" />
                </div>
              </div>
              <div>
                <p className="font-semibold">{authUser?.fullName || "Guest"}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="size-2 rounded-full bg-success inline-block" />
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="btn btn-circle btn-ghost btn-sm">
              <XIcon className="size-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                currentPath === "/" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <HomeIcon className="size-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/friends"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                currentPath === "/friends" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <UsersIcon className="size-5" />
              <span>Friends</span>
            </Link>

            <Link
              to="/notifications"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                currentPath === "/notifications" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BellIcon className="size-5" />
              <span>Notifications</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 flex justify-around items-center py-2 z-40 lg:hidden">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 rounded-lg ${currentPath === "/" ? "text-primary" : ""}`}
        >
          <HomeIcon className="size-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`flex flex-col items-center p-2 rounded-lg ${currentPath === "/friends" ? "text-primary" : ""}`}
        >
          <UsersIcon className="size-5" />
          <span className="text-xs mt-1">Friends</span>
        </Link>

        <Link
          to="/chat"
          className={`flex flex-col items-center p-2 rounded-lg ${currentPath === "/chat" ? "text-primary" : ""}`}
        >
          <MessageSquareIcon className="size-5" />
          <span className="text-xs mt-1">Chat</span>
        </Link>

        <button 
          className="flex flex-col items-center p-2 rounded-lg"
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon className="size-5" />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;