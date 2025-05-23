import Link from "next/link";

export const metadata = {
  title: "Security | BudgetPro",
  description: "Learn about BudgetPro's security practices and how we protect your data.",
};

export default function SecurityPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Security at BudgetPro</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Commitment to Security</h2>
            <p>
              At BudgetPro, we understand that you trust us with your financial information. We take this 
              responsibility seriously and are committed to implementing robust security measures to protect 
              your data. This page outlines the steps we take to ensure the security and privacy of your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Protection</h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Encryption</h3>
              <p>
                All data transmitted between your device and our servers is encrypted using industry-standard 
                TLS (Transport Layer Security) protocols. Your data is also encrypted at rest in our databases 
                using AES-256 encryption.
              </p>
              <h3 className="text-lg font-medium">Secure Storage</h3>
              <p>
                We store your data in secure, monitored environments that utilize industry-standard practices 
                for security. Our infrastructure is hosted in professional data centers that comply with 
                international security standards.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Authentication and Access</h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">User Authentication</h3>
              <p>
                We implement secure authentication methods, including OAuth for social login providers. 
                We encourage users to create strong, unique passwords and offer multi-factor authentication 
                for added security.
              </p>
              <h3 className="text-lg font-medium">Access Controls</h3>
              <p>
                Access to user data within our organization is restricted, monitored, and audited. Only 
                authorized personnel with a specific need have access to systems containing user data, and 
                this access is regularly reviewed.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Operational Security</h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Regular Security Testing</h3>
              <p>
                We conduct regular security assessments, including vulnerability scanning and penetration testing, 
                to identify and address potential security issues.
              </p>
              <h3 className="text-lg font-medium">Monitoring and Logging</h3>
              <p>
                Our systems are monitored 24/7 for suspicious activity. We maintain comprehensive logging of 
                system activities to detect and respond to potential security incidents.
              </p>
              <h3 className="text-lg font-medium">Software Updates</h3>
              <p>
                We regularly update our software and systems to address security vulnerabilities and ensure 
                that we maintain a strong security posture.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Incident Response</h2>
            <p>
              We have a comprehensive incident response plan in place to quickly address any security issues 
              that may arise. In the event of a data breach, we are committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Promptly investigating and containing the incident</li>
              <li>Assessing the impact and affected data</li>
              <li>Notifying affected users as required by law</li>
              <li>Taking steps to prevent similar incidents in the future</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Role in Security</h2>
            <p>
              While we implement robust security measures, you also play an important role in protecting your account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use a strong, unique password for your BudgetPro account</li>
              <li>Enable multi-factor authentication when available</li>
              <li>Keep your devices and browsers updated</li>
              <li>Be cautious of phishing attempts claiming to be from BudgetPro</li>
              <li>Log out of your account when using shared devices</li>
              <li>Contact us immediately if you suspect unauthorized access to your account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Security Compliance</h2>
            <p>
              We strive to comply with relevant security standards and regulations, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>GDPR (General Data Protection Regulation)</li>
              <li>CCPA (California Consumer Privacy Act)</li>
              <li>Industry best practices for secure application development</li>
              <li>Regular security training for our employees</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Reporting Security Issues</h2>
            <p>
              If you discover a security vulnerability or have security concerns about BudgetPro, please 
              contact us immediately at <a href="mailto:security@budgetpro.com" className="text-brand hover:underline">security@budgetpro.com</a>.
            </p>
            <p>
              We appreciate the work of security researchers and the community in helping us maintain a secure 
              platform for all users.
            </p>
          </section>
        </div>

        <div className="mt-6 pt-6 border-t flex space-x-6">
          <Link href="/terms" className="text-brand hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
} 