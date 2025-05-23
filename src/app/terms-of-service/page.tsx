import type { Metadata } from "next";
import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service | easybudget.ing",
  description: "Read our terms of service to understand the rules and guidelines for using easybudget.ing's financial management platform.",
};

export default function TermsOfService() {
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
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Terms of Service</h1>
              <p className="text-lg text-slate-600">Rules and guidelines for using our platform</p>
              <p className="text-sm text-slate-500">Last updated: July 14, 2024</p>
            </div>
            
            <div className="prose prose-slate prose-lg max-w-none">
              <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-brand">
                <p className="text-slate-700 font-medium mb-2">Agreement to Terms</p>
                <p className="text-slate-600 m-0">
                  Welcome to easybudget.ing. These Terms of Service govern your use of our financial management platform. By accessing or using our services, you agree to be bound by these terms and our Privacy Policy.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-600 mb-4">
                  By accessing, browsing, or using the easybudget.ing platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm m-0">
                    <strong>Important:</strong> These terms constitute a legally binding agreement between you and easybudget.ing. Please review them carefully.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Service Description</h2>
                <p className="text-slate-600 mb-4">
                  easybudget.ing provides a comprehensive financial management platform that enables users to:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Core Features</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>Track income and expenses</li>
                      <li>Create and manage budgets</li>
                      <li>Set and monitor financial goals</li>
                      <li>Generate financial reports</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Advanced Tools</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>Data analytics and insights</li>
                      <li>CSV/Excel import and export</li>
                      <li>Custom categories and tags</li>
                      <li>Multi-device synchronization</li>
                    </ul>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice to users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts & Responsibilities</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Account Creation</h3>
                <p className="text-slate-600 mb-4">
                  To access certain features, you must create an account by providing accurate and complete information. You are responsible for:
                </p>
                <ul className="text-slate-600 space-y-2 mb-6">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Promptly updating any changes to your account information</li>
                  <li>Immediately notifying us of any unauthorized access or security breaches</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">Eligibility Requirements</h3>
                <p className="text-slate-600 mb-4">
                  You must be at least 16 years old to use our services. By using easybudget.ing, you represent and warrant that you meet this age requirement and have the legal capacity to enter into this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Acceptable Use Policy</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">Prohibited Activities</h4>
                  <p className="text-red-700 text-sm">You may not use our services for any unlawful purpose or in ways that could harm our platform or other users.</p>
                </div>

                <p className="text-slate-600 mb-4">
                  Specifically, you agree not to:
                </p>
                <ul className="text-slate-600 space-y-2 mb-6">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Upload or transmit viruses, malware, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Use automated tools to access our services without permission</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Engage in any form of harassment, abuse, or spam</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property Rights</h2>
                <p className="text-slate-600 mb-4">
                  The easybudget.ing platform, including its design, features, content, and underlying technology, is protected by intellectual property laws and owned by easybudget.ing.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Our Rights</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>Platform design and functionality</li>
                      <li>Software and algorithms</li>
                      <li>Trademarks and branding</li>
                      <li>Documentation and content</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Your Rights</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>Your personal financial data</li>
                      <li>Content you create or upload</li>
                      <li>Limited license to use our platform</li>
                      <li>Data export and portability</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Subscription Plans & Billing</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Plan Types</h3>
                <p className="text-slate-600 mb-4">
                  We offer different subscription plans with varying features and pricing. Current plans include:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                  <ul className="text-slate-600 space-y-2">
                    <li><strong>Free Plan:</strong> Basic budgeting features with limitations</li>
                    <li><strong>Premium Plan:</strong> Full access to all features for €5/month</li>
                    <li><strong>Lifetime Plan:</strong> One-time payment for permanent access</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">Payment Terms</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>Subscription fees are billed in advance and are non-refundable</li>
                  <li>You authorize us to charge your selected payment method</li>
                  <li>Automatic renewal unless cancelled before the next billing cycle</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                  <li>Free trial periods may be offered at our discretion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Ownership & Privacy</h2>
                <p className="text-slate-600 mb-4">
                  You retain ownership of all financial data and content you input into our platform. By using our services, you grant us a limited license to process this data solely for the purpose of providing our services.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm m-0">
                    For detailed information about how we handle your data, please review our <Link href="/privacy-policy" className="underline font-medium">Privacy Policy</Link>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Service Availability & Support</h2>
                <p className="text-slate-600 mb-4">
                  While we strive to maintain high service availability, we cannot guarantee uninterrupted access to our platform. We may experience:
                </p>
                <ul className="text-slate-600 space-y-2 mb-4">
                  <li>Planned maintenance and updates</li>
                  <li>Temporary outages due to technical issues</li>
                  <li>Service limitations during peak usage</li>
                </ul>
                <p className="text-slate-600">
                  We provide customer support via email and aim to respond to inquiries within 24-48 hours during business days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">By You</h3>
                <p className="text-slate-600 mb-4">
                  You may terminate your account at any time by cancelling your subscription or deleting your account through the platform settings.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">By Us</h3>
                <p className="text-slate-600 mb-4">
                  We may suspend or terminate your access if you violate these terms, engage in prohibited activities, or for any other reason with reasonable notice when possible.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">Effect of Termination</h3>
                <p className="text-slate-600">
                  Upon termination, your access to the platform will cease, but you may export your data within 30 days. Certain provisions of these terms will survive termination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Disclaimers & Limitation of Liability</h2>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <p className="text-orange-800 text-sm m-0">
                    <strong>Important Legal Notice:</strong> Our services are provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for financial decisions made based on our platform.
                  </p>
                </div>

                <p className="text-slate-600 mb-4">
                  To the maximum extent permitted by law, easybudget.ing disclaims all warranties and shall not be liable for:
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Financial decisions made using our platform</li>
                  <li>Third-party content or services</li>
                  <li>Unauthorized access to your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law & Dispute Resolution</h2>
                <p className="text-slate-600 mb-4">
                  These Terms are governed by the laws of Italy. Any disputes will be resolved through binding arbitration in Rome, Italy, unless prohibited by local law.
                </p>
                <p className="text-slate-600">
                  Before initiating formal proceedings, we encourage users to contact us directly to resolve any issues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to These Terms</h2>
                <p className="text-slate-600">
                  We may update these Terms of Service periodically. Material changes will be communicated via email or platform notification at least 30 days before taking effect. Your continued use of our services constitutes acceptance of the updated terms.
                </p>
              </section>

              <section className="bg-slate-50 rounded-xl p-6 border">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
                <p className="text-slate-600 mb-4">
                  If you have questions about these Terms of Service or need assistance, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-slate-700"><strong>Email:</strong> legal@easybudget.ing</p>
                  <p className="text-slate-700"><strong>Address:</strong> Via Roma 123, 00100 Rome, Italy</p>
                  <p className="text-slate-700"><strong>Support:</strong> support@easybudget.ing</p>
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
              <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-brand">
                Privacy Policy
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