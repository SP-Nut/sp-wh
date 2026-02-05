"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { 
  LayoutDashboard, 
  Images, 
  FileText, 
  LogOut,
  ChevronRight
} from "lucide-react";

const MENU_ITEMS = [
  {
    title: "ผลงาน",
    description: "จัดการรูปภาพผลงานที่แสดงในเว็บไซต์",
    href: "/admin/works",
    icon: Images,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "บทความ",
    description: "เขียนและจัดการบทความในเว็บไซต์",
    href: "/admin/articles",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
];

export default function AdminDashboard() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-primary-900">SP Warehouse Admin</h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">ออกจากระบบ</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">จัดการเว็บไซต์</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mt-4">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
