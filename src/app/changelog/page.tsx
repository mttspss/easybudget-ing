export const metadata = {
  title: "Changelog | BudgetPro",
  description: "View our latest features and improvements to BudgetPro.",
};

// Release history
const releases = [
  {
    version: "1.2.0",
    date: "May 15, 2024",
    title: "Budget Management & Reporting",
    changes: [
      { type: "feature", text: "Added comprehensive budget management system" },
      { type: "feature", text: "Improved financial reports with advanced charts" },
      { type: "feature", text: "Added ability to set and track financial goals" },
      { type: "improvement", text: "Enhanced dashboard performance and loading speed" },
      { type: "improvement", text: "Redesigned transaction categories interface" },
      { type: "fix", text: "Fixed calculation errors in expense summary reports" },
    ],
  },
  {
    version: "1.1.0",
    date: "March 10, 2024",
    title: "Transaction Import & Analysis",
    changes: [
      { type: "feature", text: "Added CSV import functionality for transactions" },
      { type: "feature", text: "Added PDF statement parsing for bank statements" },
      { type: "feature", text: "Implemented basic expense analytics" },
      { type: "improvement", text: "Enhanced mobile responsiveness" },
      { type: "improvement", text: "Updated the transaction entry form with better category selection" },
      { type: "fix", text: "Fixed authentication issues with Google login" },
    ],
  },
  {
    version: "1.0.0",
    date: "January 5, 2024",
    title: "Initial Release",
    changes: [
      { type: "feature", text: "Basic expense and income tracking" },
      { type: "feature", text: "User account management with Google authentication" },
      { type: "feature", text: "Simple dashboard with financial overview" },
      { type: "feature", text: "Category management for transactions" },
      { type: "feature", text: "Basic reporting functionality" },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Changelog</h1>
          <p className="text-muted-foreground mt-2">
            Our development history and recent updates to BudgetPro.
          </p>
        </div>

        <div className="space-y-12">
          {releases.map((release) => (
            <div key={release.version} className="space-y-4">
              <div className="flex items-baseline justify-between border-b pb-2">
                <h2 className="text-2xl font-semibold flex items-center">
                  <span className="mr-3">{release.title}</span>
                  <span className="text-sm font-medium px-2 py-1 bg-brand/10 text-brand rounded-full">
                    v{release.version}
                  </span>
                </h2>
                <time className="text-muted-foreground">{release.date}</time>
              </div>
              
              <ul className="space-y-3">
                {release.changes.map((change, index) => (
                  <li key={index} className="flex">
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full mr-2 text-xs ${
                      change.type === 'feature' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : change.type === 'improvement'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {change.type === 'feature' 
                        ? '✨'
                        : change.type === 'improvement'
                          ? '⬆️'
                          : '🐛'}
                    </span>
                    <span className="flex-1">{change.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            For any questions or feature requests, please contact our support team at{" "}
            <a href="mailto:support@budgetpro.com" className="text-brand hover:underline">
              support@budgetpro.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 