"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Home,
  Building2,
  Users,
  DollarSign,
  FileText,
  Image,
  BarChart3,
  Calendar,
  Settings,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Trees
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Ana Sayfa",
    icon: Trees,
    href: "/",
    badge: null,
  },
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
    badge: null,
  },
  {
    title: "Admin Panel",
    icon: Shield,
    href: "/admin",
    badge: null,
  },
  {
    title: "Danışman Panel",
    icon: Award,
    href: "/danisman",
    badge: null,
  },
  {
    title: "Müşteri Panel",
    icon: Home,
    href: "/musteri",
    badge: null,
  },
  {
    title: "Portföy Yönetimi",
    icon: Building2,
    href: "/properties",
    badge: "156",
  },
  {
    title: "Müşteri Yönetimi",
    icon: Users,
    href: "/customers",
    badge: "234",
  },
  {
    title: "Finansal İşlemler",
    icon: DollarSign,
    href: "/financial",
    badge: null,
  },
  {
    title: "Belge Yönetimi",
    icon: FileText,
    href: "/documents",
    badge: "12",
  },
  {
    title: "Multimedia",
    icon: Image,
    href: "/media",
    badge: null,
  },
  {
    title: "Raporlar",
    icon: BarChart3,
    href: "/reports",
    badge: null,
  },
  {
    title: "Takvim",
    icon: Calendar,
    href: "/calendar",
    badge: "5",
  },
];

const secondaryMenuItems = [
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Bildirimler",
    icon: Bell,
    href: "/notifications",
    badge: "3",
  },
  {
    title: "Profil",
    icon: User,
    href: "/profile",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn(
      "pb-12 w-64 bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed && "w-16",
      className
    )}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <Trees className="h-8 w-8 text-green-600" />
                <div>
                  <h2 className="text-lg font-semibold">ArsaRazi</h2>
                  <p className="text-xs text-gray-500">Balıkesir Arsa & Arazi</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <Trees className="h-8 w-8 text-green-600 mx-auto" />
            )}
          </div>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-green-50 text-green-700"
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {!isCollapsed && (
                  <>
                    {item.title}
                    {item.badge && (
                      <Badge className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <div className="space-y-1">
            {secondaryMenuItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-green-50 text-green-700"
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {!isCollapsed && (
                  <>
                    {item.title}
                    {item.badge && (
                      <Badge className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2 absolute bottom-4 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => router.push('/login')}
          >
            <User className="h-4 w-4 mr-2" />
            {!isCollapsed && "Çıkış Yap"}
          </Button>
        </div>
      </div>
      
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}