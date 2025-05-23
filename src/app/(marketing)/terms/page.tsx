import Link from "next/link";

export const metadata = {
  title: "Terms of Service | BudgetPro",
  description: "Read the terms of service for BudgetPro.",
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to BudgetPro. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. 
              By accessing or using BudgetPro, you agree to be bound by these Terms. If you do not agree to these Terms, 
              you may not access or use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>&quot;Service&quot; refers to the BudgetPro application, website, and any related services.</li>
              <li>&quot;User&quot; refers to any individual who accesses or uses the Service.</li>
              <li>&quot;Account&quot; refers to the user&apos;s registration with BudgetPro.</li>
              <li>&quot;Content&quot; refers to data, text, information, graphics, images, and other materials that may be viewed on the Service.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Account Registration</h2>
            <p>
              To use certain features of the Service, you may be required to register for an account. You agree to provide 
              accurate, current, and complete information during the registration process and to update such information to 
              keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities 
              that occur under your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. User Conduct</h2>
            <p>
              You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. 
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in any activity that interferes with or disrupts the Service</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Use the Service in a manner that could disable, overburden, or impair the Service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Subscription and Payments</h2>
            <p>
              BudgetPro offers both free and premium subscription plans. By subscribing to a premium plan, you agree to pay the 
              applicable fees. We reserve the right to change our prices at any time. All payments are non-refundable except as 
              required by law or as explicitly stated in our refund policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of 
              BudgetPro and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and 
              trade dress may not be used in connection with any product or service without the prior written consent of BudgetPro.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Data Privacy</h2>
            <p>
              Your privacy is important to us. Our <Link href="/privacy" className="text-brand hover:underline">Privacy Policy</Link> explains 
              how we collect, use, and protect your personal information. By using the Service, you consent to our collection and use of 
              personal information as explained in our Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for 
              any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, BudgetPro shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, 
              goodwill, or other intangible losses resulting from your use of the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 
              30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:support@budgetpro.com" className="text-brand hover:underline">support@budgetpro.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 