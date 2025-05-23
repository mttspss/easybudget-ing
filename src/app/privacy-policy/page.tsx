import type { Metadata } from "next";
import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy | easybudget.ing",
  description: "Learn how easybudget.ing collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our data practices.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="rounded-full bg-brand p-1.5 mr-2">
                <CircleDollarSign size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">easybudget<span className="text-brand">.ing</span></span>
            </div>
          </Link>
          
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container max-w-[900px] mx-auto px-4 md:px-6">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Privacy Policy</h1>
              <p className="text-lg text-slate-600">How we protect and use your personal information</p>
              <p className="text-sm text-slate-500">Last updated: July 14, 2024</p>
            </div>
            
            <div className="prose prose-slate prose-lg max-w-none">
              <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-brand">
                <p className="text-slate-700 font-medium mb-2">Your Privacy Matters</p>
                <p className="text-slate-600 m-0">
                  At easybudget.ing, we understand the importance of your personal data. This Privacy Policy explains in clear terms how we collect, use, protect, and share your information when you use our financial management platform.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Information You Provide to Us</h3>
                <p className="text-slate-600 mb-4">
                  We collect information that you voluntarily provide to us when you:
                </p>
                <ul className="text-slate-600 space-y-2 mb-6">
                  <li>Create and manage your account</li>
                  <li>Input financial data and budget information</li>
                  <li>Contact our customer support team</li>
                  <li>Subscribe to our newsletter or promotional content</li>
                  <li>Participate in surveys, contests, or feedback sessions</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">Types of Personal Information</h3>
                <p className="text-slate-600 mb-4">
                  The personal information we may collect includes:
                </p>
                <ul className="text-slate-600 space-y-2 mb-6">
                  <li><strong>Identity Information:</strong> Full name, email address, profile picture</li>
                  <li><strong>Account Information:</strong> Username, password, account preferences</li>
                  <li><strong>Financial Data:</strong> Transaction records, budget categories, financial goals</li>
                  <li><strong>Communication Data:</strong> Messages, support tickets, feedback</li>
                  <li><strong>Usage Information:</strong> Features used, session duration, interaction patterns</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">Automatically Collected Information</h3>
                <p className="text-slate-600 mb-4">
                  When you access our platform, we automatically collect certain technical information:
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>Device information (type, operating system, browser)</li>
                  <li>IP address and location data</li>
                  <li>Log files and usage analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-slate-600 mb-4">
                  We use your personal information for legitimate business purposes, including:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Service Provision</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>Provide and maintain our platform</li>
                      <li>Process your transactions and requests</li>
                      <li>Deliver customer support</li>
                      <li>Send important service notifications</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Improvement & Analytics</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>Analyze usage patterns and trends</li>
                      <li>Develop new features and services</li>
                      <li>Improve user experience</li>
                      <li>Conduct research and development</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security & Protection</h2>
                <p className="text-slate-600 mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <ul className="text-green-800 space-y-2">
                    <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256</li>
                    <li><strong>Access Controls:</strong> Strict authentication and authorization protocols</li>
                    <li><strong>Regular Audits:</strong> Periodic security assessments and penetration testing</li>
                    <li><strong>Compliance:</strong> Adherence to GDPR, SOC 2, and other security standards</li>
                  </ul>
                </div>
                <p className="text-slate-600 text-sm">
                  While we strive to protect your information using commercially reasonable measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your data with the highest standards available.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing & Disclosure</h2>
                <p className="text-slate-600 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:
                </p>
                <ul className="text-slate-600 space-y-3">
                  <li><strong>Service Providers:</strong> Trusted third-party vendors who help us operate our platform (hosting, analytics, customer support)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Safety & Security:</strong> To protect the rights, property, and safety of our users and the public</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Privacy Rights</h2>
                <p className="text-slate-600 mb-4">
                  You have important rights regarding your personal information. Depending on your location, these may include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-slate-800">Access & Portability</p>
                        <p className="text-sm text-slate-600">Request a copy of your personal data in a machine-readable format</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-slate-800">Correction</p>
                        <p className="text-sm text-slate-600">Update or correct inaccurate information</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-slate-800">Deletion</p>
                        <p className="text-sm text-slate-600">Request deletion of your personal data</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-slate-800">Processing Restriction</p>
                        <p className="text-sm text-slate-600">Limit how we process your information</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-slate-800">Objection</p>
                        <p className="text-sm text-slate-600">Object to certain types of processing</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-slate-800">Withdraw Consent</p>
                        <p className="text-sm text-slate-600">Revoke previously given consent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies & Tracking</h2>
                <p className="text-slate-600 mb-4">
                  We use cookies and similar technologies to enhance your experience and understand how you use our platform. You can manage your cookie preferences through your browser settings or our cookie consent tool.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Children&apos;s Privacy</h2>
                <p className="text-slate-600">
                  Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Updates to This Policy</h2>
                <p className="text-slate-600">
                  We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website and updating the &ldquo;Last updated&rdquo; date.
                </p>
              </section>

              <section className="bg-slate-50 rounded-xl p-6 border">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
                <p className="text-slate-600 mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-slate-700"><strong>Email:</strong> privacy@easybudget.ing</p>
                  <p className="text-slate-700"><strong>Address:</strong> Via Roma 123, 00100 Rome, Italy</p>
                  <p className="text-slate-700"><strong>Data Protection Officer:</strong> dpo@easybudget.ing</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="container max-w-[1200px] px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-slate-500 hover:text-brand">
                Home
              </Link>
              <Link href="/terms-of-service" className="text-sm text-slate-500 hover:text-brand">
                Terms of Service
              </Link>
            </div>
            <div className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} easybudget.ing. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 