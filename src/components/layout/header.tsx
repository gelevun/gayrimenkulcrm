"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  User, 
  Settings,
  Menu,
  Plus,
  LogOut
} from "lucide-react";


interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // Mock user data for now
  const user = {
    name: "Test Kullanıcı",
    role: "Admin"
  };
  const logout = () => {
    // Mock logout
    console.log("Logout clicked");
  };

  return (
    <header className={cn(
      "bg-white border-b border-gray-200 px-6 py-4",
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Sol Taraf - Arama ve Butonlar */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Emlak, müşteri veya belge ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button size="sm" className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" />
            Hızlı Ekle
          </Button>
        </div>

        {/* Sağ Taraf - Kullanıcı Bilgileri ve Bildirimler */}
        <div className="flex items-center space-x-4">
          {/* Bildirimler */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* Ayarlar */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Kullanıcı Profili */}
          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.name || "Kullanıcı"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Rol"}</p>
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.split(' ').map(n => n[0]).join('') || "K"}
              </div>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} title="Çıkış Yap">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}