import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom"; // Add Outlet import
import { createPageUrl } from "@/utils";
import { 
  Camera, 
  LayoutDashboard, 
  Bug, 
  History, 
  BookOpen, 
  Shield,
  Leaf,
  AlertTriangle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Detect Disease",
    url: createPageUrl("Detection"),
    icon: Camera,
  },
  {
    title: "Crop Disease Library",
    url: createPageUrl("PestLibrary"),
    icon: Bug,
  },
  {
    title: "Detection History",
    url: createPageUrl("History"),
    icon: History,
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: BookOpen,
  },
];

export default function Layout() { // Remove children and currentPageName props
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-green: #1B4332;
          --secondary-green: #2D5A3D;
          --accent-green: #7CB342;
          --light-green: #E8F5E8;
          --earth-brown: #8B4513;
          --warm-orange: #FF8C42;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, var(--light-green) 0%, #ffffff 100%);
        }
        
        .pest-pattern {
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(123, 179, 66, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(27, 67, 50, 0.1) 0%, transparent 50%);
        }
      `}</style>
      
      <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-green-50 pest-pattern">
        <Sidebar className="border-r border-green-200/50 bg-white md:bg-white/90 md:backdrop-blur-sm">

          <SidebarHeader className="border-b border-green-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                  <Leaf className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-lg text-green-900">CropGuard AI</h2>
                <p className="text-xs text-green-600 font-medium">Smart Crop Disease Detection</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-green-700 uppercase tracking-wider px-3 py-3">
                Farm Management
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-green-50 hover:text-green-700 transition-all duration-300 rounded-xl mb-2 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 shadow-sm border-l-4 border-green-600' 
                            : 'text-green-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-green-700 uppercase tracking-wider px-3 py-3">
                Quick Actions
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 space-y-3">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-red-800">Emergency</span>
                    </div>
                    <p className="text-xs text-red-700 mb-3">Severe diseases detected?</p>
                    <Link 
                      to={createPageUrl("Detection")} 
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Camera className="w-3 h-3" />
                      Scan Now
                    </Link>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-green-200/50 p-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold text-sm">F</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-green-900 text-sm">Farmer</p>
                <p className="text-xs text-green-600">Protecting your crops</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-200/50 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                <h1 className="text-xl font-bold text-green-900">CropGuard AI</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            <Outlet /> {/* Replace {children} with <Outlet /> */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}