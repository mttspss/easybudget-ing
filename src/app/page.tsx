"use client";

import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, CircleDollarSign, TrendingUp, PieChart, Gift, Shield, BarChart, User } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="max-w-xl text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight tracking-tighter text-slate-800">
                  Take control of your <span className="text-brand">finances</span>
                </h1>
                <p className="max-w-[600px] text-slate-500 md:text-xl">
                  easybudget.ing helps you track expenses, create budgets, and plan your financial future with ease.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                <Link href="/auth/signup">
                  <Button variant="brand" size="lg">
                    Start for free
                  </Button>
                </Link>
                <ScrollLink 
                  to="features"
                  spy={true} 
                  smooth={true} 
                  duration={500}
                  className="cursor-pointer"
                >
                  <Button variant="outline" size="lg" className="border-brand text-brand hover:bg-brand/10">
                    Learn more
                  </Button>
                </ScrollLink>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Trusted by 1,200+ users</span>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <motion.div 
                className="relative w-full max-w-[500px] h-[350px] rounded-2xl bg-white shadow-2xl overflow-hidden -translate-y-4"
                initial={{ rotate: 2, y: 10 }}
                animate={{ rotate: 0, y: -16 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="absolute top-0 left-0 right-0 h-16 bg-brand p-4">
                  <div className="text-white font-medium">Monthly Budget Overview</div>
                </div>
                <div className="flex flex-col space-y-3 p-4 pt-20">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-sm text-slate-500">Groceries</div>
                      <div className="text-base text-slate-800 font-medium">€320 / €400</div>
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand w-[80%]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-sm text-slate-500">Transportation</div>
                      <div className="text-base text-slate-800 font-medium">€150 / €200</div>
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand w-[75%]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-sm text-slate-500">Entertainment</div>
                      <div className="text-base text-slate-800 font-medium">€95 / €100</div>
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[95%]"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Get started in <span className="text-brand">3 simple steps</span>
              </h2>
              <p className="max-w-[700px] mx-auto text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our straightforward process makes budgeting easier than ever
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:gap-12 py-16 md:grid-cols-3">
            <motion.div 
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
                <Check size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Sign up for free</h3>
              <p className="text-slate-500">
                Create your account in seconds with just your email or Google account
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
                <CircleDollarSign size={32} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Set up your budget</h3>
              <p className="text-slate-500">
                Create categories and allocate your monthly budget with our simple interface
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
                <TrendingUp size={32} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Track and save</h3>
              <p className="text-slate-500">
                Log your expenses and watch as your financial awareness grows over time
              </p>
            </motion.div>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/auth/signup">
              <Button variant="brand">
                Get started now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50" id="features">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Features designed for <span className="text-brand">you</span>
              </h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to take control of your financial future
              </p>
            </div>
          </div>
          
          {/* Bento Box Benefits Grid */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-4 md:grid-rows-2">
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
              className="transition-all duration-200 md:col-span-2 row-span-1"
            >
              <Card className="rounded-xl shadow-sm h-full hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-brand/10 rounded-full">
                      <PieChart size={24} className="text-brand" />
                    </div>
                    <CardTitle className="text-xl">Financial Clarity</CardTitle>
                  </div>
                  
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">
                    See all your finances in one place with intuitive visualizations that help you understand where your money goes and how to optimize your spending.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
              className="transition-all duration-200 md:col-span-2 row-span-1"
            >
              <Card className="rounded-xl shadow-sm h-full hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-brand/10 rounded-full">
                      <Shield size={24} className="text-brand" />
                    </div>
                    <CardTitle className="text-xl">Financial Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">
                    Feel confident about your finances with budgets that keep you on track and help you build savings for emergencies and future goals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
              className="transition-all duration-200 md:col-span-3 row-span-1"
            >
              <Card className="rounded-xl shadow-sm h-full hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-brand/10 rounded-full">
                      <BarChart size={24} className="text-brand" />
                    </div>
                    <CardTitle className="text-xl">Smart Financial Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">
                    Receive personalized recommendations to save more and spend smarter based on your unique financial patterns and goals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
              className="transition-all duration-200 row-span-1"
            >
              <Card className="rounded-xl shadow-sm h-full hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-brand/10 rounded-full">
                      <Gift size={24} className="text-brand" />
                    </div>
                    <CardTitle className="text-xl">Rewarding</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">
                    Celebrate financial wins with our achievement system that motivates you to reach your goals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20" id="pricing">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Simple, <span className="text-brand">transparent</span> pricing
              </h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for you
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="rounded-xl shadow-sm relative bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription className="text-slate-500">
                  Perfect for getting started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-baseline">
                  <span className="text-5xl font-extrabold">€0</span>
                  <span className="ml-1 text-lg text-slate-500 font-normal">/month</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>5 budgets</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Basic expense tracking</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Monthly reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <Link href="/auth/signup" className="w-full">
                  <Button variant="outline" className="w-full text-brand border-brand hover:bg-brand hover:text-white">
                    Get started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="rounded-xl shadow-sm border-brand bg-white relative scale-105 z-10">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription className="text-slate-500">
                  All features included
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-baseline">
                  <span className="text-5xl font-extrabold">€5</span>
                  <span className="ml-1 text-lg text-slate-500 font-normal">/month</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Unlimited budgets</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Advanced expense tracking</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Detailed reports and analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Export to Excel/CSV</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-brand"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <Link href="/auth/signup" className="w-full">
                  <Button variant="brand" className="w-full">
                    Get started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="rounded-xl shadow-sm relative bg-slate-800 text-white border-slate-700">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Limited Offer
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Lifetime</CardTitle>
                <CardDescription className="text-slate-300">
                  One-time payment, forever access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-baseline">
                  <span className="text-5xl font-extrabold">€99</span>
                  <span className="ml-1 text-lg text-slate-300 font-normal line-through">€199</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>All Premium features</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Future premium features</span>
          </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>VIP priority support</span>
          </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>No recurring payments</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Only 50 spots left!</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Get lifetime access
                  </Button>
                </Link>
              </CardFooter>
            </Card>
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
                    &quot;In just 6 months, I&apos;ve managed to save enough for a down payment on my car. The visualizations make budgeting actually fun!&quot;
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
                    &quot;Even the free version has helped me tremendously. I&apos;m considering upgrading to premium for the advanced features!&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50" id="faq">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">
                Frequently asked <span className="text-brand">questions</span>
              </h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to know about easybudget.ing
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 py-12">
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">Is my financial data secure?</h3>
              <p className="mt-2 text-slate-500">
                Yes, we use bank-level encryption to protect your data. We never share your information with third parties without your explicit consent.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">How do I cancel my subscription?</h3>
              <p className="mt-2 text-slate-500">
                You can cancel your subscription anytime with just a few clicks in your account settings. Once canceled, you&apos;ll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">Do you offer refunds?</h3>
              <p className="mt-2 text-slate-500">
                Yes, we offer a 30-day money-back guarantee for all new Premium subscriptions. If you&apos;re not completely satisfied, simply contact our support team within 30 days of your purchase.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">How does the Lifetime deal work?</h3>
              <p className="mt-2 text-slate-500">
                Our Lifetime deal gives you permanent access to all Premium features with a one-time payment. This includes all future premium features as they&apos;re released, with no additional charges ever.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">How do I get started with budgeting?</h3>
              <p className="mt-2 text-slate-500">
                Our app guides you through the process step by step. Start by creating categories for your expenses, set budget limits, and then track your spending. Our built-in tutorials will help you along the way.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">Can I import data from my bank?</h3>
              <p className="mt-2 text-slate-500">
                Yes, Premium users can securely connect their bank accounts or import CSV files from most major banks. This makes it easy to track your expenses without manual entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-brand text-white">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to take control of your finances?
              </h2>
              <p className="text-xl md:text-2xl text-white/80">
                Join thousands of users who have transformed their financial future with easybudget.ing
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-brand hover:bg-gray-100 px-8 py-6 text-lg">
                  Start your free trial
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg">
                  Sign in
                </Button>
              </Link>
            </div>
            <p className="text-white/80">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-brand">easybudget.ing</div>
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
                    <Link href="#" className="text-slate-500 hover:text-brand">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-500 hover:text-brand">
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
