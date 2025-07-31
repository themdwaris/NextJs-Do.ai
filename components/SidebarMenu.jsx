import { useAiContext } from "@/context/DoAiContext";
import { Protect, useClerk, UserButton, useUser } from "@clerk/nextjs";
import {
  Eraser,
  FileCog,
  Hash,
  Home,
  Images,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import Image from "next/image";

import { usePathname } from "next/navigation";

const SidebarMenu = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { router } = useAiContext();
  const pathname = usePathname();

  const navItems = [
    { path: "/ai", label: "Dashboard", Icon: Home },
    { path: "/ai/blogTitle", label: "Blog Titles", Icon: Hash },
    { path: "/ai/writeArticle", label: "Write Article", Icon: SquarePen },
    { path: "/ai/generateImg", label: "Generate Image", Icon: Images },
    { path: "/ai/removeBg", label: "Remove Background", Icon: Eraser },
    { path: "/ai/removeObj", label: "Remove Object", Icon: Scissors },
    { path: "/ai/reviewResume", label: "Resume Analyzer", Icon: FileCog },
    { path: "/ai/community", label: "Community", Icon: Users },
  ];
  return (
    <div
      className={`w-60 sticky h-[100vh-56px] flex flex-col justify-between bg-white border-r border-gray-200 max-sm:absolute top-14 bottom-0 z-50 ${
        sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-6 w-full">
        <Image
          src={user?.imageUrl}
          alt="user-avatar"
          width={55}
          height={55}
          className="object-contain rounded-full mx-auto"
        />
        <h1 className="mt-2 text-center font-medium">{user?.fullName}</h1>
        <div className="mt-4 flex gap-1.5 flex-col pl-4 pr-3 select-none">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon=item.Icon
            return (
              <div
                key={item.label}
                onClick={() => {
                  router.push(item.path)
                  setSidebarOpen(false)
                }}
                className={`flex items-center gap-2 text-sm p-2 rounded-md font-medium cursor-pointer select-none ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500"
                    : "bg-transparent"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-black"}`}>
                  <Icon size={18} />
                </span>
                <span className={`${isActive ? "text-white" : "text-black"}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-10 py-6 flex items-center justify-between gap-2.5">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500" >
          {/* <User size={18} color="white" /> */}
          <UserButton/>
          
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{user?.fullName}</h2>
          <p className="text-xs text-gray-400">
            <Protect plan="premium" fallback="Free">Premium</Protect> Plan
          </p>
        </div>
        <span className="text-gray-600 cursor-pointer">
          <LogOut size={18} onClick={() => signOut()} />
        </span>
      </div>
    </div>
  );
};

export default SidebarMenu;
