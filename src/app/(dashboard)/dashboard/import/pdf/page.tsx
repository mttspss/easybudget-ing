"use client";

import { useState } from "react";
import { Upload, FileWarning, Download } from "lucide-react";
import Link from "next/link";

export default function ImportPdfPage() {
  const [fileName, setFileName] = useState<string>("");
  const [showInfo, setShowInfo] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setShowInfo(true);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Import PDF</h1>
        <p className="text-muted-foreground">
          Upload PDF bank statements to add transactions.
        </p>
      </div>

      <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <FileWarning className="h-6 w-6 text-amber-500 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Note: PDF Import Guidance</h3>
            <p className="mt-1 text-sm text-amber-700">
              PDF files often have complex formatting that makes direct transaction extraction challenging. 
              For the most reliable results, we recommend:
            </p>
            <ol className="mt-2 ml-5 list-decimal text-sm text-amber-700">
              <li>Export your bank statement as CSV if your bank offers this option</li>
              <li>Use online tools to convert your PDF to CSV format</li>
              <li>Then import the CSV file using our <Link href="/dashboard/import/csv" className="text-blue-600 underline">CSV import tool</Link></li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="pdf-upload"
          className="block mb-2 text-sm font-medium"
        >
          Upload your PDF file
        </label>
        <div className="flex gap-3 items-center">
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer"
          >
            <div className="flex items-center justify-center bg-white text-primary hover:bg-slate-100 h-10 px-4 py-2 rounded-md text-sm font-medium border border-input">
              <Upload className="mr-2 h-4 w-4" />
              Choose PDF
            </div>
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {fileName && (
            <span className="text-sm text-muted-foreground truncate max-w-md">{fileName}</span>
          )}
        </div>
      </div>

      {showInfo && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Next Steps</h2>
          <p className="text-sm text-gray-600 mb-6">
            Your PDF has been received. Please follow these steps to import your transactions:
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-800">Convert PDF to CSV</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use one of these free online tools to convert your PDF to CSV:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-blue-600">
                  <li><a href="https://www.adobe.com/acrobat/online/pdf-to-csv.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Adobe PDF to CSV</a></li>
                  <li><a href="https://smallpdf.com/pdf-to-csv" target="_blank" rel="noopener noreferrer" className="hover:underline">Smallpdf PDF to CSV</a></li>
                  <li><a href="https://www.zamzar.com/convert/pdf-to-csv/" target="_blank" rel="noopener noreferrer" className="hover:underline">Zamzar PDF to CSV</a></li>
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-800">Import the CSV file</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Once you have converted your PDF to CSV format, use our CSV import tool.
                </p>
                <div className="mt-3">
                  <Link 
                    href="/dashboard/import/csv"
                    className="inline-flex items-center text-sm font-medium text-white bg-primary px-4 py-2 rounded-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Go to CSV Import
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Popular Bank Statement Formats</h2>
        <p className="text-sm text-gray-600 mb-4">
          Most banks offer statement downloads in multiple formats. Here&apos;s how to find them:
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Chase Bank</h3>
            <p className="text-sm mt-1">Go to Accounts → Account Activity → Download (select CSV format)</p>
                            </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Bank of America</h3>
            <p className="text-sm mt-1">Go to Accounts → Account Details → Download (select CSV format)</p>
                          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Wells Fargo</h3>
            <p className="text-sm mt-1">Go to Accounts → Account Activity → Download → Select &quot;Comma-delimited&quot;</p>
                      </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Citibank</h3>
            <p className="text-sm mt-1">Go to Account Details → Export (select CSV format)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Capital One</h3>
            <p className="text-sm mt-1">Go to Account → View Details → Export Transactions → Select CSV</p>
                </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">TD Bank</h3>
            <p className="text-sm mt-1">Go to Accounts → Account History → Download → Select CSV</p>
          </div>
        </div>
      </div>
    </div>
  );
} 