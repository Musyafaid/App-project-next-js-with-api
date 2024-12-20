"use client";
import React, { useEffect, useState } from "react";
import {
  Home,
  User,
  Settings,
  BarChart2,
  MessageCircle,
  LogOut,
  ArrowLeftIcon,
  ArrowRightIcon,
  FileText,
} from "lucide-react";
import TableData from "../components/content/TableData";
import { useRouter } from "next/navigation";
import { logout } from "../api/auth/logout";
import Loading from "../loading";

interface Subject {
  id: number;
  name: string;
}

export default function Page() {

  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [hideSidebar, setHideSidebar] = useState<boolean>(false);
  const [subjectsData, setSubjectsData] = useState<Subject[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const data = await logout();
      router.push('/auth');
      return data

    } catch (error) {
      console.log('error');
    }
  };

  const handleSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    setHideSidebar((prev) => !prev);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", key: "home" },
    { icon: FileText, label: "Data Subjects", key: "subjects" },
    { icon: User, label: "Profil Saya", key: "profile" },
    { icon: BarChart2, label: "Analitik", key: "analytics" },
    { icon: MessageCircle, label: "Pesan", key: "messages" },
    { icon: Settings, label: "Pengaturan", key: "settings" },
  ];

  useEffect(() => {
    if (activeMenu === "subjects") {
      setLoading(true);
      setTimeout(() => {
        setSubjectsData([
          { id: 1, name: "Math" },
          { id: 2, name: "Science" },
          { id: 3, name: "History" },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [activeMenu]);

  return (
    <div className="flex h-screen">
      <div className={`flex h-auto w-auto ${hideSidebar ? "absolute" : 'relative'}`}>
        <div
          className={`relative w-72 ${
            hideSidebar ? "hidden" : ""
          } bg-blue-800 transition-all backdrop-blur-lg shadow-2xl text-white`}
        >
          <div className="p-8 flex items-center border-b border-white/20">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mr-5">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Alexander Kusuma
              </h2>
              <p className="text-sm text-black opacity-75">Administrator</p>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeMenu === item.key
                    ? "bg-white/20 text-black"
                    : "hover:bg-white/10 text-blue-100"
                } group`}
              >
                <item.icon
                  className={`${
                    activeMenu === item.key
                      ? "text-black"
                      : "text-black group-hover:text-black"
                  }`}
                  size={24}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 absolute bottom-0 left-0 right-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-black transition-all duration-300"
            >
              <LogOut size={24} className="text-black" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </div>
        <button
          onClick={handleSidebar}
          className={`${
            hideSidebar ? "bg-blue-900" : "absolute right-0"
          } z-20 h-10 px-4 py-2 text-white`}
          aria-label={hideSidebar ? "Show Sidebar" : "Hide Sidebar"}
        >
          {hideSidebar ? (
            <ArrowRightIcon className="hover:border-l-4 w-full h-full transition-all" />
          ) : (
            <ArrowLeftIcon className="hover:border-r-4 w-full h-full transition-all" />
          )}
        </button>
      </div>

      <div className="flex-1  overflow-auto">
        <div className="bg-white/10  px-10 backdrop-blur-lg rounded-2xl  shadow-2xl min-h-screen">
          <h1 className="text-3xl font-bold text-black p-6">
            {menuItems.find((item) => item.key === activeMenu)?.label}
          </h1>

          <div className="bg-white/10 p-6 rounded-xl">
            <p className="text-black/90">
              Selamat datang di panel{" "}
              {menuItems.find((item) => item.key === activeMenu)?.label}. Konten
              spesifik akan ditampilkan di sini berdasarkan menu yang dipilih.
            </p>
          </div>

          {activeMenu === "subjects" && (
            <>
              {loading ? (
               <Loading fit />
              ) : subjectsData ? (
                <TableData /> // Pass subjects data to TableData component
              ) : (
                <p>No data available.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
