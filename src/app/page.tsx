"use client";

import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CircleDollarSign, PieChart, Gift, Shield, BarChart, User, ArrowRight, Menu, X, ChevronDown, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/script";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // FAQ accordion state
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "easybudget.ing",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1200"
            },
            "description": "Take control of your finances with easybudget.ing, the all-in-one solution for tracking expenses, creating budgets, and achieving your financial goals."
          })
        }}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Image 
                src="/images/logos/Mylogo.png" 
                alt="easybudget.ing" 
                width={32}
                height={32}
                className="mr-2"
                priority
              />
              <span className="text-xl font-bold text-slate-800">easybudget<span className="text-brand">.ing</span></span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ScrollLink 
              to="features"
              spy={true} 
              smooth={true} 
              duration={500}
              className="text-sm font-medium text-slate-600 hover:text-brand transition-colors cursor-pointer"
            >
              Features
            </ScrollLink>
            <ScrollLink 
              to="pricing"
              spy={true} 
              smooth={true} 
              duration={500}
              className="text-sm font-medium text-slate-600 hover:text-brand transition-colors cursor-pointer"
            >
              Pricing
            </ScrollLink>
            <ScrollLink 
              to="testimonials"
              spy={true} 
              smooth={true} 
              duration={500}
              className="text-sm font-medium text-slate-600 hover:text-brand transition-colors cursor-pointer"
            >
              Testimonials
            </ScrollLink>
            <ScrollLink 
              to="faq"
              spy={true} 
              smooth={true} 
              duration={500}
              className="text-sm font-medium text-slate-600 hover:text-brand transition-colors cursor-pointer"
            >
              FAQ
            </ScrollLink>
            {session ? (
              <Link href="/dashboard" className="flex items-center space-x-2">
                {session.user?.image ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-brand">
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || "User profile"} 
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <User size={16} className="text-brand" />
                  </div>
                )}
                <span className="text-sm font-medium text-slate-600 hover:text-brand transition-colors">{session.user?.name?.split(' ')[0] || 'Dashboard'}</span>
              </Link>
            ) : (
              <>
                <Link href="/auth/signin" className="text-sm font-medium text-slate-600 hover:text-brand transition-colors">
                  Sign in
                </Link>
                <Link href="/auth/signup">
                  <Button variant="brand" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100"
          >
            <div className="container max-w-[1200px] mx-auto px-4 py-4 flex flex-col space-y-4">
              <ScrollLink 
                to="features"
                spy={true} 
                smooth={true} 
                duration={500}
                className="text-sm font-medium text-slate-600 hover:text-brand transition-colors py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </ScrollLink>
              <ScrollLink 
                to="pricing"
                spy={true} 
                smooth={true} 
                duration={500}
                className="text-sm font-medium text-slate-600 hover:text-brand transition-colors py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </ScrollLink>
              <ScrollLink 
                to="testimonials"
                spy={true} 
                smooth={true} 
                duration={500}
                className="text-sm font-medium text-slate-600 hover:text-brand transition-colors py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </ScrollLink>
              <ScrollLink 
                to="faq"
                spy={true} 
                smooth={true} 
                duration={500}
                className="text-sm font-medium text-slate-600 hover:text-brand transition-colors py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </ScrollLink>
              {session ? (
                <Link 
                  href="/dashboard" 
                  className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-brand transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {session.user?.image ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-brand">
                      <Image 
                        src={session.user.image} 
                        alt={session.user.name || "User profile"} 
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                      <User size={16} className="text-brand" />
                    </div>
                  )}
                  <span>Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link 
                    href="/auth/signin" 
                    className="text-sm font-medium text-slate-600 hover:text-brand transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link 
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="brand" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                  <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                  Better way to manage money
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Smart budget, <br />
                  <span className="text-brand">smarter future</span>
                </h1>
                <p className="max-w-[540px] text-lg md:text-xl text-slate-600">
                  Take control of your finances with easybudget.ing, the all-in-one solution for tracking expenses, creating budgets, and achieving your financial goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                    <Button variant="brand" size="lg" className="shadow-lg shadow-brand/20 h-12">
                    Start for free
                      <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <ScrollLink 
                  to="features"
                  spy={true} 
                  smooth={true} 
                  duration={500}
                  className="cursor-pointer"
                >
                    <Button variant="outline" size="lg" className="h-12 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                      See how it works
                  </Button>
                </ScrollLink>
              </div>
                <div className="flex items-center text-sm text-slate-500 pt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                  <span>Trusted by 1,200+ users worldwide</span>
            </div>
              </motion.div>
            </div>
            
            {/* Dashboard Preview */}
              <motion.div 
              className="relative mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 300, damping: 10 }}
              style={{ zIndex: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-brand/5 rounded-[2.5rem] blur-3xl -z-10 transform scale-95 rotate-3"></div>
              <motion.div 
                className="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[480px] w-full lg:max-w-[500px]"
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                {/* Browser Header - Enhanced */}
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-6 relative overflow-hidden">
                  <div className="flex space-x-2 relative z-10">
                    <motion.div 
                      className="w-2.5 h-2.5 rounded-full bg-red-400 cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    ></motion.div>
                    <motion.div 
                      className="w-2.5 h-2.5 rounded-full bg-amber-400 cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    ></motion.div>
                    <motion.div 
                      className="w-2.5 h-2.5 rounded-full bg-green-400 cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    ></motion.div>
                  </div>
                  <div className="text-xs font-medium text-slate-600 mx-auto relative z-10">easybudget.ing - Dashboard</div>
                  <div className="w-2 h-2 bg-brand/20 rounded-full absolute right-4" />
                </div>
                
                <div className="relative">
                  {/* Enhanced Dashboard Tabs */}
                  <div className="border-b border-slate-200 relative">
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-brand"
                      initial={{ width: "25%", x: "0%" }}
                      animate={{ width: "25%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      id="tab-indicator"
                    />
                    <div className="flex px-4">
                      {["Dashboard", "Budget", "Reports", "Goals"].map((tab, index) => (
                        <motion.button 
                          key={tab}
                          id={`button-${tab}`}
                          className={`tab-button px-3 py-2 text-xs font-medium ${tab === "Dashboard" 
                            ? "text-brand" 
                            : "text-slate-500"} relative flex-1 transition-colors duration-200`}
                          whileHover={{ 
                            backgroundColor: tab === "Dashboard" 
                              ? "rgba(34, 197, 94, 0.08)" 
                              : "rgba(100, 116, 139, 0.05)",
                            y: -1,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98, y: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          onClick={() => {
                            // Enhanced tab switching with animations
                            const tabContentElements = document.querySelectorAll('.tab-content');
                            const indicator = document.getElementById('tab-indicator');
                            
                            // Animate tab indicator
                            if (indicator) {
                              const percentage = 25 * index;
                              indicator.style.transform = `translateX(${percentage * 4}%)`;
                            }
                            
                            // Hide all tabs with fade out
                            tabContentElements.forEach(el => {
                              const element = el as HTMLElement;
                              element.style.opacity = '0';
                              element.style.transform = 'translateY(10px)';
                              setTimeout(() => {
                                element.style.display = 'none';
                              }, 150);
                            });
                            
                            // Show selected tab with fade in
                            setTimeout(() => {
                              const selectedTab = document.getElementById(`tab-${tab}`);
                              if (selectedTab) {
                                selectedTab.style.display = 'block';
                                setTimeout(() => {
                                  selectedTab.style.opacity = '1';
                                  selectedTab.style.transform = 'translateY(0)';
                                }, 10);
                              }
                            }, 160);
                            
                            // Update tab button styles
                            const tabButtons = document.querySelectorAll('.tab-button');
                            tabButtons.forEach(button => {
                              button.classList.remove('text-brand');
                              button.classList.add('text-slate-500');
                            });
                            
                            const clickedButton = document.getElementById(`button-${tab}`);
                            if (clickedButton) {
                              clickedButton.classList.remove('text-slate-500');
                              clickedButton.classList.add('text-brand');
                            }
                          }}
                        >
                          {tab}
                          {tab === "Dashboard" && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
                              animate={{ scale: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced Container with smooth transitions */}
                  <div className="h-[370px] overflow-y-auto relative">
                    {/* Enhanced Dashboard Tab Content */}
                    <div id="tab-Dashboard" className="tab-content py-4 px-4 transition-all duration-200 ease-out" style={{ display: "block", opacity: 1, transform: "translateY(0)" }}>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-800">Your Monthly Overview</h3>
                          <p className="text-xs text-slate-500">June 2024</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <motion.div 
                            className="px-2 py-0.5 bg-brand/10 rounded-md text-brand text-xs font-medium cursor-pointer"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.15)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.span
                              key="percentage"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              +12.4%
                            </motion.span>
                          </motion.div>
                          <div className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-500 text-xs">vs last month</div>
                        </div>
                      </div>
                      
                      {/* Enhanced Budget Progress with better animations */}
                      <div className="space-y-3 mb-4">
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-3 cursor-pointer border border-slate-100 hover:border-blue-200"
                          whileHover={{ 
                            backgroundColor: "rgba(248, 250, 252, 0.8)", 
                            y: -2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex justify-between mb-1.5">
                            <div className="flex items-center">
                              <motion.div 
                                className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-2.5 cursor-pointer"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 5H8a2 2 0 0 0-2 2v2"></path>
                                  <path d="M4 13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7"></path>
                                  <path d="M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                  <path d="m8 17 4 4 4-4"></path>
                                  <path d="M12 21V13"></path>
                                </svg>
                              </motion.div>
                              <div>
                                <div className="text-xs text-slate-500">Groceries</div>
                                <motion.div 
                                  className="text-sm font-medium text-slate-800"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  €320 / €400
                                </motion.div>
                              </div>
                            </div>
                            <motion.div 
                              className="text-xs font-medium text-slate-600 bg-white/50 px-2 py-1 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4, type: "spring" }}
                            >
                              80%
                            </motion.div>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative" 
                              initial={{ width: 0 }}
                              animate={{ width: "80%" }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-violet-50/30 rounded-xl p-3 cursor-pointer border border-slate-100 hover:border-violet-200"
                          whileHover={{ 
                            backgroundColor: "rgba(248, 250, 252, 0.8)", 
                            y: -2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex justify-between mb-1.5">
                            <div className="flex items-center">
                              <motion.div 
                                className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center mr-2.5 cursor-pointer"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M8 3h10a2 2 0 0 1 0 4H8a2 2 0 0 1 0-4Z"></path>
                                  <path d="M10 7v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"></path>
                                  <path d="M20 7v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7"></path>
                                  <path d="M6 7h12"></path>
                                </svg>
                              </motion.div>
                              <div>
                                <div className="text-xs text-slate-500">Entertainment</div>
                                <motion.div 
                                  className="text-sm font-medium text-slate-800"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  €95 / €100
                                </motion.div>
                              </div>
                            </div>
                            <motion.div 
                              className="text-xs font-medium text-slate-600 bg-white/50 px-2 py-1 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              95%
                            </motion.div>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full relative" 
                              initial={{ width: 0 }}
                              animate={{ width: "95%" }}
                              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-xl p-3 cursor-pointer border border-slate-100 hover:border-amber-200"
                          whileHover={{ 
                            backgroundColor: "rgba(248, 250, 252, 0.8)", 
                            y: -2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex justify-between mb-1.5">
                            <div className="flex items-center">
                              <motion.div 
                                className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center mr-2.5 cursor-pointer"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                  <line x1="4" x2="4" y1="22" y2="15"></line>
                                </svg>
                              </motion.div>
                              <div>
                                <div className="text-xs text-slate-500">Transportation</div>
                                <motion.div 
                                  className="text-sm font-medium text-slate-800"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  €150 / €200
                                </motion.div>
                              </div>
                            </div>
                            <motion.div 
                              className="text-xs font-medium text-slate-600 bg-white/50 px-2 py-1 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.6, type: "spring" }}
                            >
                              75%
                            </motion.div>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full relative" 
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Enhanced Quick Stats with better visual effects */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div 
                          className="bg-gradient-to-br from-brand via-green-500 to-emerald-600 rounded-xl p-3 text-white cursor-pointer relative overflow-hidden"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div className="relative z-10">
                            <div className="text-xs font-medium opacity-80">Total Savings</div>
                            <motion.div 
                              className="text-lg font-bold mt-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            >
                              €2,450
                            </motion.div>
                            <div className="flex items-center mt-1 text-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                                width="12" 
                                height="12" 
                  viewBox="0 0 24 24"
                                fill="none" 
                                stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                                className="mr-1"
                >
                                <path d="m5 15 7-7 7 7"></path>
                </svg>
                              <span>18.2% from last month</span>
            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl p-3 text-white cursor-pointer relative overflow-hidden"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <div className="relative z-10">
                            <div className="text-xs font-medium opacity-80">Next Goal</div>
                            <motion.div 
                              className="text-lg font-bold mt-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                            >
                              €5,000
                            </motion.div>
                            <div className="flex items-center mt-1 text-[10px]">
                              <motion.div 
                                className="w-8 h-1 bg-white/20 rounded-full overflow-hidden mr-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                              >
                                <motion.div
                                  className="h-full bg-white/60 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: "49%" }}
                                  transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
                                />
                              </motion.div>
                              <span>49% completed</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Enhanced Budget Tab Content */}
                    <div id="tab-Budget" className="tab-content py-4 px-4 transition-all duration-200 ease-out" style={{ display: "none", opacity: 0, transform: "translateY(10px)" }}>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-800">Budget Planning</h3>
                          <p className="text-xs text-slate-500">June 2024</p>
                        </div>
                        <motion.button 
                          className="px-2 py-1 bg-gradient-to-r from-brand to-green-500 text-white rounded-md text-xs font-medium shadow-sm"
                          whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(34, 197, 94, 0.2)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Set Budgets
                        </motion.button>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-green-50/30 p-3 rounded-xl border border-slate-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-slate-700">Monthly Income</span>
                            <motion.span 
                              className="text-xs font-bold text-green-600"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: "spring" }}
                            >
                              €4,500
                            </motion.span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs font-medium text-slate-700">Allocated</span>
                            <motion.span 
                              className="text-xs font-bold text-slate-700"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4, type: "spring" }}
                            >
                              €3,200
                            </motion.span>
                          </div>
                          <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "71%" }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                        
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-600 flex items-center">
                            <span className="mr-2">Category Allocation</span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                          </h4>
                          
                          {["Housing", "Food & Groceries", "Transportation", "Entertainment", "Savings"].map((category, i) => (
                            <motion.div 
                              key={category} 
                              className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * (i + 1) }}
                              whileHover={{ x: 5, backgroundColor: "rgba(248, 250, 252, 0.8)" }}
                            >
                              <div className="flex items-center">
                                <motion.div 
                                  className={`w-3 h-3 rounded-full mr-3 ${
                                    i === 0 ? "bg-slate-700" :
                                    i === 1 ? "bg-blue-500" :
                                    i === 2 ? "bg-amber-500" :
                                    i === 3 ? "bg-violet-500" :
                                    "bg-brand"
                                  }`}
                                  whileHover={{ scale: 1.3 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                ></motion.div>
                                <span className="text-xs font-medium">{category}</span>
                              </div>
                              <motion.span 
                                className="text-xs font-medium bg-white/50 px-2 py-1 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 * (i + 1), type: "spring" }}
                              >
                                {i === 0 ? "€1,200" :
                                 i === 1 ? "€600" :
                                 i === 2 ? "€300" :
                                 i === 3 ? "€200" :
                                 "€900"}
                              </motion.span>
                            </motion.div>
                          ))}
                          
                          <motion.div 
                            className="bg-white rounded-xl p-3 border border-slate-200 cursor-pointer text-center text-xs text-slate-500 font-medium hover:border-brand/20 transition-colors"
                            whileHover={{ backgroundColor: "#f8fafc", scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
            <div className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M12 5v14m-7-7h14"/>
                              </svg>
                              Adjust Allocations
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Reports Tab Content */}
                    <div id="tab-Reports" className="tab-content py-4 px-4 transition-all duration-200 ease-out" style={{ display: "none", opacity: 0, transform: "translateY(10px)" }}>
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold text-slate-800">Spending Analysis</h3>
                        <p className="text-xs text-slate-500">Last 30 days</p>
                      </div>
                      
              <motion.div 
                        className="bg-white rounded-xl border border-slate-200 p-3 mb-3 hover:shadow-sm transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-slate-500">Total Spent</span>
                          <motion.span 
                            className="font-bold text-slate-700"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                          >
                            €2,345
                          </motion.span>
                </div>
                        
                        {/* Enhanced Interactive Chart */}
                        <div className="h-20 flex items-end space-x-1 my-3 p-2 bg-slate-50/50 rounded-lg">
                          {[40, 60, 35, 80, 55, 45, 70].map((height, i) => (
                            <motion.div 
                              key={i}
                              className="flex-1 bg-gradient-to-t from-brand/60 to-brand/20 rounded-t-sm cursor-pointer hover:from-brand/80 hover:to-brand/40 transition-all relative group"
                              style={{ height: `${height}%` }}
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                              whileHover={{ scale: 1.1, zIndex: 10 }}
                            >
                              <motion.div
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                              >
                                €{Math.floor(height * 10)}
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between text-xs text-slate-400">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                            <motion.span 
                              key={day}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              {day}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      
                      <div className="flex space-x-2 mb-3">
                        <motion.button 
                          className="px-2 py-1 bg-brand text-white rounded-md text-xs shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Weekly
                        </motion.button>
                        <motion.button 
                          className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs hover:bg-slate-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Monthly
                        </motion.button>
                        <motion.button 
                          className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs hover:bg-slate-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Yearly
                        </motion.button>
                      </div>
                      
                      <motion.div 
                        className="text-xs text-center text-slate-500 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.a 
                          href="#" 
                          className="text-brand font-medium hover:text-brand/80 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          View Full Reports →
                        </motion.a>
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Goals Tab Content */}
                    <div id="tab-Goals" className="tab-content py-4 px-4 transition-all duration-200 ease-out" style={{ display: "none", opacity: 0, transform: "translateY(10px)" }}>
                      <div className="flex justify-between items-center mb-3">
                    <div>
                          <h3 className="text-sm font-semibold text-slate-800">Financial Goals</h3>
                          <p className="text-xs text-slate-500">Your progress</p>
                    </div>
                        <motion.button 
                          className="px-2 py-1 bg-gradient-to-r from-brand to-green-500 text-white rounded-md text-xs font-medium shadow-sm"
                          whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(34, 197, 94, 0.2)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add Goal
                        </motion.button>
                    </div>
                      
                      <div className="space-y-3 mb-3">
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-3 border border-slate-100 hover:border-blue-200 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        >
                          <div className="flex justify-between mb-2">
                            <div>
                              <h4 className="text-xs font-medium text-slate-800 flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                Vacation Fund
                              </h4>
                              <div className="text-[10px] text-slate-500 ml-4">Target: August 2024</div>
                  </div>
                            <motion.div 
                              className="text-xs font-bold text-blue-600"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: "spring" }}
                            >
                              €1,800 / €3,000
                            </motion.div>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: "60%" }}
                              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                            </motion.div>
                          </div>
                          <div className="text-right mt-1">
                            <motion.span 
                              className="text-[10px] text-blue-600 font-medium"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              60% complete
                            </motion.span>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-violet-50/30 rounded-xl p-3 border border-slate-100 hover:border-violet-200 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        >
                          <div className="flex justify-between mb-2">
                    <div>
                              <h4 className="text-xs font-medium text-slate-800 flex items-center">
                                <div className="w-2 h-2 bg-violet-500 rounded-full mr-2"></div>
                                New Laptop
                              </h4>
                              <div className="text-[10px] text-slate-500 ml-4">Target: October 2024</div>
                    </div>
                            <motion.div 
                              className="text-xs font-bold text-violet-600"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4, type: "spring" }}
                            >
                              €800 / €1,500
                            </motion.div>
                    </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: "53%" }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                              />
                            </motion.div>
                  </div>
                          <div className="text-right mt-1">
                            <motion.span 
                              className="text-[10px] text-violet-600 font-medium"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              53% complete
                            </motion.span>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-slate-50 to-green-50/30 rounded-xl p-3 border border-slate-100 hover:border-green-200 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        >
                          <div className="flex justify-between mb-2">
                    <div>
                              <h4 className="text-xs font-medium text-slate-800 flex items-center">
                                <div className="w-2 h-2 bg-brand rounded-full mr-2"></div>
                                Emergency Fund
                              </h4>
                              <div className="text-[10px] text-slate-500 ml-4">Ongoing</div>
                    </div>
                            <motion.div 
                              className="text-xs font-bold text-brand"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              €4,500 / €10,000
                            </motion.div>
                    </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: "45%" }}
                              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                              />
                            </motion.div>
                  </div>
                          <div className="text-right mt-1">
                            <motion.span 
                              className="text-[10px] text-brand font-medium"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                            >
                              45% complete
                            </motion.span>
                </div>
              </motion.div>
                        
                        <motion.div 
                          className="flex items-center justify-center bg-white text-slate-500 text-xs border border-dashed border-slate-300 p-3 rounded-xl cursor-pointer hover:border-brand/50 hover:bg-brand/5 transition-all"
                          whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.05)", scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="mr-2"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v8M8 12h8"/>
                          </motion.svg>
                          <span>Create New Goal</span>
              </motion.div>
            </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -right-6 -top-6 w-24 h-24 bg-brand/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <motion.div 
                className="absolute -left-10 top-1/2 w-16 h-16 bg-amber-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section - Moved from hero and centered */}
      <section className="bg-white py-16">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
                <div className="text-4xl font-bold text-slate-900">€2.3M</div>
                <div className="text-sm text-slate-500 mt-1">Budgets managed</div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
                <div className="text-4xl font-bold text-slate-900">94%</div>
                <div className="text-sm text-slate-500 mt-1">Satisfaction rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand mx-auto">
                <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                Simple to get started
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Start your financial journey in <span className="text-brand">three simple steps</span>
              </h2>
              <p className="max-w-[700px] mx-auto text-slate-500 md:text-xl/relaxed lg:text-xl/relaxed">
                Our straightforward process makes budgeting easier than ever before
              </p>
            </div>
          </div>
          
          {/* Steps Cards */}
          <div className="relative mx-auto max-w-5xl py-16">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 relative z-10">
            <motion.div 
                className="flex flex-col items-center text-center bg-white rounded-xl border border-slate-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand mb-6">
                  <div className="rounded-full bg-brand h-10 w-10 flex items-center justify-center text-white font-bold">1</div>
              </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Sign up for free</h3>
              <p className="text-slate-500">
                  Create your account in seconds with just your email or Google account. No credit card required to get started.
              </p>
            </motion.div>
              
            <motion.div 
                className="flex flex-col items-center text-center bg-white rounded-xl border border-slate-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand mb-6">
                  <div className="rounded-full bg-brand h-10 w-10 flex items-center justify-center text-white font-bold">2</div>
              </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Set up your budget</h3>
              <p className="text-slate-500">
                  Create custom categories and allocate your monthly budget with our intuitive drag-and-drop interface.
              </p>
            </motion.div>
              
            <motion.div 
                className="flex flex-col items-center text-center bg-white rounded-xl border border-slate-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand mb-6">
                  <div className="rounded-full bg-brand h-10 w-10 flex items-center justify-center text-white font-bold">3</div>
              </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Track and save</h3>
              <p className="text-slate-500">
                  Log your expenses and watch as your financial awareness grows. Reach your saving goals faster than ever.
              </p>
            </motion.div>
          </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Link href="/auth/signup">
              <Button variant="brand" size="lg" className="shadow-md shadow-brand/20">
                Get started now
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand mx-auto">
                <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                Powerful capabilities
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Features designed for your <span className="text-brand">financial success</span>
              </h2>
              <p className="max-w-[700px] mx-auto text-slate-500 md:text-xl/relaxed lg:text-xl/relaxed">
                Everything you need to take control of your financial future and achieve your goals
              </p>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="space-y-5">
                  <div className="p-3 bg-blue-50 rounded-xl w-max">
                    <PieChart size={24} className="text-blue-500" />
                    </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Smart Budget Analytics</h3>
                    <p className="text-slate-500">
                      Visualize your spending patterns with intuitive charts that help you understand where your money goes.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="space-y-5">
                  <div className="p-3 bg-purple-50 rounded-xl w-max">
                    <Shield size={24} className="text-purple-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Financial Security</h3>
                  <p className="text-slate-500">
                      Build an emergency fund and plan for the future with automated saving goals and progress tracking.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="space-y-5">
                  <div className="p-3 bg-amber-50 rounded-xl w-max">
                    <BarChart size={24} className="text-amber-500" />
                    </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Smart Insights</h3>
                  <p className="text-slate-500">
                      Receive personalized recommendations to save more based on your unique spending patterns and goals.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="space-y-5">
                  <div className="p-3 bg-pink-50 rounded-xl w-max">
                    <Gift size={24} className="text-pink-500" />
                    </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Goal Achievement</h3>
                    <p className="text-slate-500">
                      Set financial goals and track your progress with milestone celebrations that keep you motivated.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="space-y-5">
                  <div className="p-3 bg-cyan-50 rounded-xl w-max">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m2 12 4.414-4.414A2 2 0 0 1 8.828 7h6.344a2 2 0 0 1 1.414.586L21 12"></path>
                      <path d="M12 12h.01"></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">CSV/Excel Import</h3>
                  <p className="text-slate-500">
                      Easily import transactions from your bank accounts with secure CSV and Excel file import capabilities.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="space-y-5">
                  <div className="p-3 bg-brand/10 rounded-xl w-max">
                    <CircleDollarSign size={24} className="text-brand" />
                    </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Complete Financial Control</h3>
                    <p className="text-slate-500">
                      Take full control of your finances with customizable categories, tags, and comprehensive reports.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Feature Highlight */}
          <div className="mt-24 bg-white rounded-3xl shadow-lg p-8 md:p-10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                  <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                  Featured highlight
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Set and achieve your financial goals</h3>
                  <p className="text-slate-500">
                  Whether you're saving for a vacation, a home, or retirement, our goal-tracking system helps you stay on course with visual progress indicators and smart recommendations.
                </p>
                <ul className="space-y-3">
                  {[
                    "Create unlimited saving goals",
                    "Track progress with visual indicators",
                    "Receive smart saving suggestions",
                    "Celebrate milestones with achievements",
                    "Adjust goals as your priorities change"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center text-slate-600"
                    >
                      <svg className="h-5 w-5 text-brand mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link href="/auth/signup">
                    <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
                      Start setting goals
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                    <div className="p-5 bg-gradient-to-r from-brand to-green-500 text-white">
                      <h4 className="text-lg font-semibold">Your Saving Goals</h4>
                    </div>
                    <div className="p-6 space-y-6">
                      {/* Goal 1 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"/>
                                <path d="M15 7h6v6"/>
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-slate-800">Vacation Fund</div>
                              <div className="text-sm text-slate-500">€1,800 / €3,000</div>
                            </div>
                          </div>
                          <div className="text-blue-500 font-medium">60%</div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-[60%]"></div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">Target date: August 2024</div>
                      </div>

                      {/* Goal 2 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-slate-800">Home Down Payment</div>
                              <div className="text-sm text-slate-500">€15,000 / €50,000</div>
                            </div>
                          </div>
                          <div className="text-amber-500 font-medium">30%</div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[30%]"></div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">Target date: December 2025</div>
                      </div>

                      {/* Goal 3 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-brand/10 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-slate-800">New Laptop</div>
                              <div className="text-sm text-slate-500">€1,400 / €1,400</div>
                            </div>
                          </div>
                          <div className="text-brand font-medium">100%</div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand rounded-full w-full"></div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">Completed! 🎉</div>
                      </div>
                      
                      <button className="w-full flex items-center justify-center gap-2 mt-4 p-2 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                        <span>Add new goal</span>
                      </button>
                    </div>
                  </div>
            </motion.div>
                <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-200 via-cyan-200 to-amber-200 rounded-3xl blur-2xl opacity-50 transform rotate-3 scale-105"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-24" id="pricing">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand mx-auto">
                <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                Simple & transparent pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Choose the plan that <span className="text-brand">works for you</span>
              </h2>
              <p className="max-w-[700px] mx-auto text-slate-500 md:text-xl/relaxed lg:text-xl/relaxed">
                Start free and upgrade when you need more powerful features. No hidden fees, cancel anytime.
              </p>
            </div>
          </div>
          
          <div className="mx-auto max-w-6xl relative">
            {/* Enhanced decorative background */}
            <div className="absolute -z-10 inset-0">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
                </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">
              {/* Free Plan - Enhanced */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
                className="relative bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative p-6 md:p-8">
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                          <path d="m2 17 10 5 10-5"></path>
                          <path d="m2 12 10 5 10-5"></path>
                    </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Free</h3>
                    </div>
                    <p className="text-sm text-slate-500">Perfect for getting started</p>
                  </div>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-extrabold text-slate-900">€0</span>
                    <span className="text-sm text-slate-500 ml-1">/forever</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="space-y-3">
                      {[
                        { feature: "5 budget categories", included: true },
                        { feature: "Basic expense tracking", included: true },
                        { feature: "Monthly reports", included: true },
                        { feature: "Mobile app access", included: true },
                        { feature: "CSV export", included: false },
                        { feature: "Advanced analytics", included: false },
                        { feature: "Goal tracking", included: false },
                        { feature: "Priority support", included: false }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center"
                        >
                          {item.included ? (
                            <svg className="h-4 w-4 text-brand mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                          ) : (
                            <svg className="h-4 w-4 text-slate-300 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                          )}
                          <span className={`text-sm ${item.included ? 'text-slate-600' : 'text-slate-400'}`}>
                            {item.feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                <Link href="/auth/signup" className="w-full">
                    <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 h-12 font-medium">
                      Get Started Free
                  </Button>
                </Link>
              </div>
              </motion.div>
              
              {/* Premium Plan - Enhanced with Popular Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
                className="relative bg-white rounded-2xl border-2 border-brand shadow-xl overflow-hidden z-10 md:scale-105 group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-green-400"></div>
                <div className="absolute -top-3 right-0 left-0 mx-auto w-max">
                  <motion.div 
                    className="bg-brand text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Most Popular
                  </motion.div>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-brand/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative p-6 md:p-8 pt-10">
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Premium</h3>
                    </div>
                    <p className="text-sm text-slate-500">For serious budgeters</p>
                  </div>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-extrabold text-slate-900">€5</span>
                    <span className="text-sm text-slate-500 ml-1">/month</span>
                    <div className="ml-3 px-2 py-1 bg-brand/10 text-brand text-xs font-medium rounded-full">
                      Save 17%
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="space-y-3">
                      {[
                        { feature: "Unlimited budget categories", included: true, highlight: true },
                        { feature: "Advanced expense tracking", included: true, highlight: true },
                        { feature: "Detailed reports & analytics", included: true, highlight: true },
                        { feature: "Goal tracking & insights", included: true, highlight: true },
                        { feature: "CSV/Excel import & export", included: true },
                        { feature: "Bank account integration", included: true },
                        { feature: "Priority email support", included: true },
                        { feature: "Mobile & desktop apps", included: true }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center"
                        >
                          <svg className="h-4 w-4 text-brand mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                          <span className={`text-sm ${item.highlight ? 'text-slate-700 font-medium' : 'text-slate-600'}`}>
                            {item.feature}
                          </span>
                          {item.highlight && (
                            <span className="ml-2 px-1.5 py-0.5 bg-brand/10 text-brand text-xs font-medium rounded">
                              New
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <Link href="/auth/signup" className="w-full">
                    <Button variant="brand" className="w-full shadow-lg shadow-brand/25 h-12 font-medium">
                      Start Premium Trial
                    </Button>
                  </Link>
                  <p className="text-xs text-slate-500 text-center mt-2">
                    14-day free trial • No credit card required
                  </p>
                </div>
              </motion.div>
              
              {/* Lifetime Plan - Enhanced */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
                className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl text-white border border-slate-700 shadow-xl overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                <div className="absolute -top-3 right-0 left-0 mx-auto w-max">
                  <motion.div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(245, 158, 11, 0.4)",
                        "0 0 0 10px rgba(245, 158, 11, 0)",
                      ]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    Limited Time Offer
                  </motion.div>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative p-6 md:p-8 pt-10">
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                          <path d="M4 22h16"></path>
                          <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.01 18.75 13 19.24 14 20"></path>
                          <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C12.99 18.75 12 19.24 10 20"></path>
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Lifetime</h3>
                    </div>
                    <p className="text-sm text-slate-300">One payment, unlimited access</p>
                  </div>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-extrabold text-white">€99</span>
                    <span className="text-sm text-slate-400 line-through ml-2">€199</span>
                    <div className="ml-3 px-2 py-1 bg-amber-500/20 text-amber-300 text-xs font-medium rounded-full">
                      50% OFF
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="space-y-3">
                      {[
                        { feature: "All Premium features forever", included: true, highlight: true },
                        { feature: "Future updates included", included: true, highlight: true },
                        { feature: "VIP priority support", included: true },
                        { feature: "Early access to new features", included: true },
                        { feature: "Exclusive lifetime community", included: true },
                        { feature: "No monthly fees ever", included: true },
                        { feature: "Transfer to family member", included: true },
                        { feature: "30-day money-back guarantee", included: true }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center"
                        >
                          <svg className="h-4 w-4 text-amber-400 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                          <span className={`text-sm ${item.highlight ? 'text-white font-medium' : 'text-slate-300'}`}>
                            {item.feature}
                          </span>
                          {item.highlight && (
                            <span className="ml-2 px-1.5 py-0.5 bg-amber-500/30 text-amber-200 text-xs font-medium rounded">
                              Premium
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                <Link href="/auth/signup" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 h-12 font-medium border-0">
                      Claim Lifetime Deal
                  </Button>
                </Link>
                  <p className="text-xs text-slate-400 text-center mt-2">
                    Only 47 spots left at this price
                  </p>
              </div>
              </motion.div>
                </div>
            
            {/* Enhanced Comparison Table */}
            <div className="mt-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Compare All Features</h3>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  See exactly what's included in each plan and choose the one that fits your needs
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-4 font-medium text-slate-700">Features</th>
                        <th className="text-center p-4 font-medium text-slate-700">Free</th>
                        <th className="text-center p-4 font-medium text-brand">Premium</th>
                        <th className="text-center p-4 font-medium text-amber-600">Lifetime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Budget Categories", free: "5", premium: "Unlimited", lifetime: "Unlimited" },
                        { feature: "Monthly Reports", free: true, premium: true, lifetime: true },
                        { feature: "Goal Tracking", free: false, premium: true, lifetime: true },
                        { feature: "CSV Export", free: false, premium: true, lifetime: true },
                        { feature: "Bank Integration", free: false, premium: true, lifetime: true },
                        { feature: "Advanced Analytics", free: false, premium: true, lifetime: true },
                        { feature: "Priority Support", free: false, premium: true, lifetime: "VIP" },
                        { feature: "Future Updates", free: "Basic", premium: "All", lifetime: "All + Early Access" }
                      ].map((row, i) => (
                        <motion.tr 
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="border-b border-slate-100 hover:bg-slate-50/50"
                        >
                          <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                          <td className="p-4 text-center">
                            {typeof row.free === 'boolean' ? (
                              row.free ? (
                                <svg className="h-5 w-5 text-brand mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                              ) : (
                                <svg className="h-5 w-5 text-slate-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                              )
                            ) : (
                              <span className="text-slate-600 text-sm">{row.free}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof row.premium === 'boolean' ? (
                              row.premium ? (
                                <svg className="h-5 w-5 text-brand mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-slate-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )
                            ) : (
                              <span className="text-brand text-sm font-medium">{row.premium}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof row.lifetime === 'boolean' ? (
                              row.lifetime ? (
                                <svg className="h-5 w-5 text-brand mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-slate-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )
                            ) : (
                              <span className="text-amber-600 text-sm font-medium">{row.lifetime}</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
            
            {/* Money Back Guarantee */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-green-800 mb-1">30-Day Money-Back Guarantee</h4>
                    <p className="text-green-600 text-sm">Try any paid plan risk-free. If you're not satisfied, get a full refund.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-12 text-center">
              <Link href="/auth/signup">
                <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white px-8 py-3">
                  View All Plans
                  <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Loved by <span className="text-brand">thousands</span>
              </h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear what our users have to say about easybudget.ing
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-xl shadow-sm h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-slate-100 p-2">
                      <User size={32} className="text-slate-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Sarah M.</CardTitle>
                      <CardDescription>Premium user since 2023</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-500 italic">
                    &quot;This app completely changed my relationship with money. I finally know where my money goes and can plan for the future.&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="rounded-xl shadow-sm h-full border-brand">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-slate-100 p-2">
                      <User size={32} className="text-slate-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Marco P.</CardTitle>
                      <CardDescription>Premium user since 2022</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-500 italic">
                    &quot;In just 6 months, I've managed to save enough for a down payment on my car. The visualizations make budgeting actually fun!&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="rounded-xl shadow-sm h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-slate-100 p-2">
                      <User size={32} className="text-slate-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Elena K.</CardTitle>
                      <CardDescription>Free user since 2023</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-500 italic">
                    &quot;Even the free version has helped me tremendously. I'm considering upgrading to premium for the advanced features!&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with Accordion */}
      <section className="py-24 bg-slate-50" id="faq">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand mx-auto">
                <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
                Got questions? We've got answers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Frequently asked <span className="text-brand">questions</span>
              </h2>
              <p className="max-w-[700px] mx-auto text-slate-500 md:text-xl/relaxed lg:text-xl/relaxed">
                Everything you need to know about easybudget.ing to get started
              </p>
            </div>
          </motion.div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* FAQ Accordion */}
              <div className="space-y-4">
                {[
                  {
                    question: "Is my financial data secure?",
                    answer: "Absolutely! We use bank-level 256-bit SSL encryption to protect your data. Your information is stored securely and we never share it with third parties without your explicit consent. We're also GDPR compliant and regularly undergo security audits."
                  },
                  {
                    question: "How do I get started with budgeting?",
                    answer: "Getting started is simple! After signing up, our guided setup walks you through creating your first budget categories, setting spending limits, and connecting your accounts. We provide helpful tutorials and tips along the way to ensure you're successful."
                  },
                  {
                    question: "Can I import data from my bank?",
                    answer: "Yes! Premium users can securely connect their bank accounts through our trusted banking integration or import CSV/Excel files from most major banks. This automatically imports your transactions, saving you time on manual entry."
                  },
                  {
                    question: "What happens if I exceed my budget?",
                    answer: "Don't worry! We'll send you friendly notifications when you're approaching your limits and provide insights on where you can adjust. Our goal is to help you stay on track, not to judge your spending decisions."
                  },
                  {
                    question: "Can I integrate with my bank?",
                    answer: "Yes! We support connections with over 12,000 financial institutions worldwide. Your data is encrypted and we use read-only access to ensure your account remains secure."
                  },
                  {
                    question: "What happens if I exceed my budget?",
                    answer: "Don&apos;t worry! We&apos;ll send you friendly notifications when you&apos;re approaching your limits and provide insights on where you can adjust. Our goal is to help you stay on track, not to judge your spending decisions."
                  },
                  {
                    question: "How does the Lifetime deal work?",
                    answer: "Our Lifetime deal gives you permanent access to all Premium features with a one-time payment. This includes all future premium features as they&apos;re released, with no additional charges ever. It&apos;s perfect for long-term budgeters who want to save money."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown size={20} className="text-slate-400" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaqIndex === index ? "auto" : 0,
                        opacity: openFaqIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
          </div>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
              
              {/* Second Column */}
              <div className="space-y-4">
                {[
                  {
                    question: "How do I cancel my subscription?",
                    answer: "You can cancel your subscription anytime with just a few clicks in your account settings. Once canceled, you'll continue to have access until the end of your billing period. No hidden fees or complicated cancellation process."
                  },
                  {
                    question: "Do you offer refunds?",
                    answer: "Yes! We offer a 30-day money-back guarantee for all new Premium subscriptions. If you're not completely satisfied, simply contact our support team within 30 days of your purchase for a full refund."
                  },
                  {
                    question: "How does the Lifetime deal work?",
                    answer: "Our Lifetime deal gives you permanent access to all Premium features with a one-time payment. This includes all future premium features as they're released, with no additional charges ever. It's perfect for long-term budgeters who want to save money."
                  },
                  {
                    question: "Is there a mobile app?",
                    answer: "Yes! Our platform works perfectly on mobile browsers with a responsive design. We're also developing native iOS and Android apps that will be available to Premium users first. You'll be notified when they're ready for download."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index + 4}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === (index + 4) ? null : (index + 4))}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFaqIndex === (index + 4) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown size={20} className="text-slate-400" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaqIndex === (index + 4) ? "auto" : 0,
                        opacity: openFaqIndex === (index + 4) ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
            </div>
            
            {/* FAQ Footer */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
            </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">Still have questions?</h3>
                    <p className="text-slate-600">We're here to help! Contact our friendly support team.</p>
            </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="mailto:support@easybudget.ing">
                    <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="brand">
                      Try It Free
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand via-green-500 to-emerald-600 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
            </div>
        
        <div className="container max-w-[1200px] px-4 md:px-6 relative z-10">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Star size={16} className="mr-2 fill-current" />
              Join 1,200+ satisfied users
            </motion.div>
            
            {/* Main Content */}
            <div className="space-y-6 max-w-4xl">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Ready to transform your <br />
                <span className="relative">
                  financial future?
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-3 bg-white/30 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Join thousands of users who have taken control of their finances and achieved their goals with easybudget.ing
              </motion.p>
            </div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/auth/signup">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" className="bg-white text-brand hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-xl shadow-black/20 border-2 border-white">
                    <Zap size={20} className="mr-2" />
                    Start Free Trial
                </Button>
                </motion.div>
              </Link>
              <Link href="/auth/signin">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white hover:text-brand backdrop-blur-sm px-10 py-6 text-lg font-semibold">
                    Sign In
                    <ArrowRight size={20} className="ml-2" />
                </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Guarantee */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                No credit card required
            </div>
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                30-day money-back guarantee
          </div>
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center">
                <Image 
                  src="/images/logos/Mylogo.png" 
                  alt="easybudget.ing" 
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span className="text-xl font-bold text-slate-800">easybudget<span className="text-brand">.ing</span></span>
              </div>
              <p className="text-sm text-slate-500">
                Making budgeting easy and accessible for everyone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-800">Company</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-slate-500 hover:text-brand">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-500 hover:text-brand">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-500 hover:text-brand">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-800">Legal</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/terms-of-service" className="text-slate-500 hover:text-brand">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-slate-500 hover:text-brand">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-500 hover:text-brand">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} easybudget.ing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}



