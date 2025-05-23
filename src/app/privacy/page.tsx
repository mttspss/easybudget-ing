import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | BudgetPro",
  description: "Learn how BudgetPro collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              At BudgetPro, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you use our website and services.
            </p>
            <p>
              By using BudgetPro, you consent to the data practices described in this Privacy Policy. If you 
              do not agree with the data practices described, you should not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p>We may collect several types of information from and about users of our service, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Including your name, email address, and profile picture when you create an account.
              </li>
              <li>
                <strong>Financial Information:</strong> Such as transaction amounts, categories, dates, and other details you enter into the application. We do not collect or store your bank account numbers, credit card numbers, or passwords to financial institutions.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our service, including your browsing patterns, features used, and interaction with the platform.
              </li>
              <li>
                <strong>Device Information:</strong> Information about your device, such as IP address, browser type, operating system, and device identifiers.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Personalize your experience by delivering content and product offerings relevant to your interests</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Monitor and analyze usage patterns and trends to improve our service</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Sharing of Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties 
              except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations or protect our rights</li>
              <li>In connection with a business transaction, such as a merger, acquisition, or sale of assets</li>
              <li>When you have provided your consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of your personal information when transmitted</li>
              <li>Regular security assessments</li>
              <li>Restricted access to personal information</li>
              <li>Secure data storage practices</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive 
              to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access the personal information we have about you</li>
              <li>The right to correct inaccurate personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided at the end of this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for use by children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and you believe your child has provided 
              us with personal information, please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Changes to this Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top. You are advised to review 
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to, stored, and processed in a country different from your country of 
              residence. When we transfer your information, we take steps to ensure that your information receives an 
              adequate level of protection as required by applicable law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@budgetpro.com" className="text-brand hover:underline">privacy@budgetpro.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Link href="/terms" className="text-brand hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
} 