"use client";

import { useState, useEffect } from "react";
// PDF.js or other PDF parsing library will be needed here
// import * as pdfjsLib from 'pdfjs-dist/webpack'; 
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

// Re-using interfaces from CSV import, may need adjustments for PDF
interface ExtractedRow { // Renamed from CsvRow for clarity
  [key: string]: string | number | undefined | null; // PDF data might be more varied
}

interface ColumnMapping {
  date: string | null;
  amount: string | null;
  description: string | null;
  category: string | null;
}

export type TypeDeterminationStrategy = 'sign' | 'separate_columns' | 'type_column';

export interface TransactionTypeConfig {
  strategy: TypeDeterminationStrategy;
  creditColumn: string | null;
  debitColumn: string | null;
  typeIndicatorColumn: string | null;
  incomeValues: string;
  expenseValues: string;
}

export interface ProcessedRow {
  id: string;
  originalData: ExtractedRow;
  mappedData: {
    dateStr?: string | null;
    amountStr?: string | null;
    creditStr?: string | null;
    debitStr?: string | null;
    descriptionStr?: string | null;
    categoryStr?: string | null;
    typeIndicatorStr?: string | null;
  };
  parsedDate?: Date | null;
  calculatedType: 'income' | 'expense' | null;
  finalAmount: number | null;
  isExcluded: boolean;
  errors: string[];
}

export default function ImportPdfPage() {
  const [extractedData, setExtractedData] = useState<ExtractedRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]); // Headers might be less straightforward from PDF
  const [fileName, setFileName] = useState<string>("");
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({
    date: null,
    amount: null,
    description: null,
    category: null,
  });
  const [typeConfig, setTypeConfig] = useState<TransactionTypeConfig>({
    strategy: 'sign',
    creditColumn: null,
    debitColumn: null,
    typeIndicatorColumn: null,
    incomeValues: 'credit,cr,c,income,entrata,accredito',
    expenseValues: 'debit,dr,d,expense,uscita,addebito',
  });
  const [previewData, setPreviewData] = useState<ProcessedRow[]>([]);
  const [isParsingPdf, setIsParsingPdf] = useState<boolean>(false);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setColumnMapping({ date: null, amount: null, description: null, category: null });
      setExtractedData([]);
      setHeaders([]);
      setPreviewData([]);
      setIsParsingPdf(true);

      // Placeholder for PDF Parsing Logic
      // This is where you would use a library like PDF.js to extract text or tables.
      // The result should be an array of objects (ExtractedRow[]) and a list of headers.
      console.log("PDF file selected:", file.name);
      alert("PDF parsing needs to be implemented. This is a placeholder.");

      // Simulate finding some headers and data for UI testing
      // In a real scenario, this would come from your PDF extraction logic
      // For example:
      // const { extractedHeaders, dataFromPdf } = await parseMyPdf(file);
      // setHeaders(extractedHeaders);
      // setExtractedData(dataFromPdf);
      
      // --- Placeholder Data for UI ---
      setTimeout(() => { // Simulate async parsing
        const placeholderHeaders = ["Transaction Date", "Details", "Amount Out", "Amount In", "Balance"];
        const placeholderExtractedData: ExtractedRow[] = [
          { "Transaction Date": "01/07/2024", "Details": "Coffee Shop", "Amount Out": "5.00", "Amount In": null, "Balance": "1000.00" },
          { "Transaction Date": "02/07/2024", "Details": "Salary", "Amount Out": null, "Amount In": "2500.00", "Balance": "3500.00" },
        ];
        setHeaders(placeholderHeaders);
        setExtractedData(placeholderExtractedData);
        
        // Basic auto-mapping for placeholder
        const autoMapping: ColumnMapping = { date: null, amount: null, description: null, category: null };
        placeholderHeaders.forEach(header => {
          const lowerHeader = header.toLowerCase();
          if (!autoMapping.date && lowerHeader.includes("date")) autoMapping.date = header;
          if (!autoMapping.amount && lowerHeader.includes("amount out")) autoMapping.amount = header; // Default to amount out for 'sign'
          if (!autoMapping.description && lowerHeader.includes("details")) autoMapping.description = header;
        });
        setColumnMapping(autoMapping);
        
        // Auto-detect strategy for placeholder
        setTypeConfig(prev => ({ ...prev, strategy: 'separate_columns', creditColumn: "Amount In", debitColumn: "Amount Out"}));


        setIsParsingPdf(false);
      }, 1000);
      // --- End Placeholder Data ---
    }
  };

  const handleMappingChange = (transactionField: keyof ColumnMapping, csvHeader: string) => {
    setColumnMapping(prev => ({ ...prev, [transactionField]: csvHeader === "" ? null : csvHeader }));
  };

  const handleStrategyChange = (strategy: TypeDeterminationStrategy) => {
    setTypeConfig(prev => ({
      ...prev,
      strategy,
      creditColumn: strategy !== 'separate_columns' ? null : prev.creditColumn,
      debitColumn: strategy !== 'separate_columns' ? null : prev.debitColumn,
      typeIndicatorColumn: strategy !== 'type_column' ? null : prev.typeIndicatorColumn,
    }));
  };

  const handleTypeConfigChange = (field: keyof Omit<TransactionTypeConfig, 'strategy'>, value: string) => {
    setTypeConfig(prev => ({ ...prev, [field]: value === "" ? null : value }));
  };

  useEffect(() => {
    if (extractedData.length === 0) {
      setPreviewData([]);
      return;
    }

    const newPreviewData = extractedData.map((row, index): ProcessedRow => {
      const id = `row-${index}`;
      const mappedData: ProcessedRow['mappedData'] = {};
      const errors: string[] = [];
      let parsedDate: Date | null = null;
      let calculatedType: ProcessedRow['calculatedType'] = null;
      let finalAmount: number | null = null;

      if (columnMapping.date) mappedData.dateStr = String(row[columnMapping.date] ?? '');
      if (columnMapping.description) mappedData.descriptionStr = String(row[columnMapping.description] ?? '');
      if (columnMapping.category) mappedData.categoryStr = String(row[columnMapping.category] ?? '');
      
      switch (typeConfig.strategy) {
        case 'sign':
          if (columnMapping.amount) mappedData.amountStr = String(row[columnMapping.amount] ?? '');
          break;
        case 'separate_columns':
          if (typeConfig.creditColumn) mappedData.creditStr = String(row[typeConfig.creditColumn] ?? '');
          if (typeConfig.debitColumn) mappedData.debitStr = String(row[typeConfig.debitColumn] ?? '');
          break;
        case 'type_column':
          if (typeConfig.typeIndicatorColumn) mappedData.typeIndicatorStr = String(row[typeConfig.typeIndicatorColumn] ?? '');
          if (columnMapping.amount) mappedData.amountStr = String(row[columnMapping.amount] ?? ''); 
          break;
      }

      if (mappedData.dateStr) {
        const d = new Date(mappedData.dateStr);
        if (!isNaN(d.getTime())) {
          parsedDate = d;
        } else {
          const parts = mappedData.dateStr.split(/[/.-]/);
          if (parts.length === 3) {
            let dAttempt: Date | null = null;
            dAttempt = new Date(+parts[2], +parts[1] - 1, +parts[0]); // DD/MM/YYYY
            if (!isNaN(dAttempt.getTime())) parsedDate = dAttempt;
            else {
              dAttempt = new Date(+parts[2], +parts[0] - 1, +parts[1]); // MM/DD/YYYY
              if (!isNaN(dAttempt.getTime())) parsedDate = dAttempt;
            }
          }
          if(!parsedDate) errors.push("Invalid date format.");
        }
      } else if (columnMapping.date) {
        errors.push("Date is missing.");
      }

      const incomeKeywords = typeConfig.incomeValues.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
      const expenseKeywords = typeConfig.expenseValues.toLowerCase().split(',').map(s => s.trim()).filter(s => s);

      if (typeConfig.strategy === 'sign' && mappedData.amountStr) {
        const amountVal = parseFloat(mappedData.amountStr.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
        if (!isNaN(amountVal)) {
          finalAmount = Math.abs(amountVal);
          if (amountVal > 0) calculatedType = 'income';
          else if (amountVal < 0) calculatedType = 'expense';
        } else {
          errors.push("Invalid amount format for 'sign' strategy.");
        }
      } else if (typeConfig.strategy === 'separate_columns') {
        const creditValStr = mappedData.creditStr;
        const debitValStr = mappedData.debitStr;
        const creditAmount = creditValStr ? parseFloat(creditValStr.replace(/[^0-9.,-]+/g, '').replace(',', '.')) : NaN;
        const debitAmount = debitValStr ? parseFloat(debitValStr.replace(/[^0-9.,-]+/g, '').replace(',', '.')) : NaN;

        if (!isNaN(creditAmount) && creditAmount !== 0) {
          calculatedType = 'income';
          finalAmount = Math.abs(creditAmount);
          if (!isNaN(debitAmount) && debitAmount !== 0) errors.push("Both credit and debit columns have values.");
        } else if (!isNaN(debitAmount) && debitAmount !== 0) {
          calculatedType = 'expense';
          finalAmount = Math.abs(debitAmount);
        } else {
          if(typeConfig.creditColumn && typeConfig.debitColumn) errors.push("No valid amount in credit/debit columns.");
        }
      } else if (typeConfig.strategy === 'type_column' && mappedData.typeIndicatorStr) {
        const typeStr = mappedData.typeIndicatorStr.toLowerCase().trim();
        if (incomeKeywords.includes(typeStr)) calculatedType = 'income';
        else if (expenseKeywords.includes(typeStr)) calculatedType = 'expense';
        else errors.push("Type indicator does not match income/expense keywords.");
        
        if (mappedData.amountStr) {
            const amountVal = parseFloat(mappedData.amountStr.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
            if (!isNaN(amountVal)) {
                finalAmount = Math.abs(amountVal);
            } else {
                errors.push("Invalid amount format for 'type_column' strategy amount.");
            }
        } else if(columnMapping.amount) {
            errors.push("Amount is missing for 'type_column' strategy.");
        }
      }
      
      if (!columnMapping.date) errors.push("Date column not mapped.");
      if (!columnMapping.description) errors.push("Description column not mapped.");
      if (typeConfig.strategy === 'sign' && !columnMapping.amount) errors.push("Amount column not mapped for 'sign' strategy.");
      if (typeConfig.strategy === 'separate_columns' && (!typeConfig.creditColumn || !typeConfig.debitColumn)) errors.push("Credit/Debit columns not mapped for 'separate_columns' strategy.");
      if (typeConfig.strategy === 'type_column' && !typeConfig.typeIndicatorColumn) errors.push("Type indicator column not mapped for 'type_column' strategy.");
      if (typeConfig.strategy === 'type_column' && !columnMapping.amount) errors.push("Amount column (for value) not mapped for 'type_column' strategy.");

      if(calculatedType && finalAmount === null && typeConfig.strategy !== 'sign'){
         errors.push("Amount could not be determined despite type being set.");
      }
      if(finalAmount !== null && finalAmount < 0) finalAmount = Math.abs(finalAmount);

      if(!calculatedType && finalAmount !== null && finalAmount !== 0) errors.push("Amount found, but type (income/expense) could not be determined.");

      return {
        id,
        originalData: row,
        mappedData,
        parsedDate,
        calculatedType,
        finalAmount,
        isExcluded: false,
        errors
      };
    });
    setPreviewData(newPreviewData);
  }, [extractedData, columnMapping, typeConfig]);

  const handleToggleExcludeRow = (rowIndex: number) => {
    setPreviewData(prev => 
      prev.map((row, idx) => 
        idx === rowIndex ? { ...row, isExcluded: !row.isExcluded } : row
      )
    );
  };

  const handleChangeRowType = (rowIndex: number, newType: 'income' | 'expense' | '') => {
    setPreviewData(prev =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, calculatedType: newType === '' ? null : newType } : row
      )
    );
  };

  const isImportReady = (): boolean => {
    if (!columnMapping.date || !columnMapping.description) return false;
    if (typeConfig.strategy === 'sign' && !columnMapping.amount) return false;
    if (typeConfig.strategy === 'separate_columns' && (!typeConfig.creditColumn || !typeConfig.debitColumn)) return false;
    if (typeConfig.strategy === 'type_column' && (!typeConfig.typeIndicatorColumn || !columnMapping.amount)) return false;
    
    return previewData.some(row => !row.isExcluded && row.errors.length === 0 && row.calculatedType && row.finalAmount !== null);
  };

  const handleSubmitTransactions = async () => {
    const transactionsToImport = previewData.filter(row => 
      !row.isExcluded && 
      row.errors.length === 0 && 
      row.parsedDate && 
      row.calculatedType && 
      row.finalAmount !== null
    ).map(row => ({
      date: row.parsedDate!,
      description: row.mappedData.descriptionStr || "N/A",
      amount: row.finalAmount!,
      type: row.calculatedType!,
      category: row.mappedData.categoryStr || undefined,
    }));

    if (transactionsToImport.length === 0) {
      alert("No valid transactions to import.");
      return;
    }

    console.log("Submitting PDF transactions:", transactionsToImport);
    alert(`Would import ${transactionsToImport.length} transactions from PDF. Backend integration needed.`);
    // TODO: Actual API Call
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Import PDF</h1>
        <p className="text-muted-foreground">
          Upload and process your PDF files to add transactions.
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="pdf-upload"
          className="block mb-2 text-sm font-medium"
        >
          Select PDF file to import
        </label>
        <div className="flex gap-3 items-center">
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer"
          >
            <div className="flex items-center justify-center bg-white text-primary hover:bg-slate-100 h-10 px-4 py-2 rounded-md text-sm font-medium border border-input">
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </div>
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={isParsingPdf}
            />
          </label>
          {fileName && (
            <span className="text-sm text-muted-foreground truncate max-w-md">{fileName}</span>
          )}
        </div>
        {isParsingPdf && <p className="mt-2 text-sm text-blue-500">Processing PDF, please wait...</p>}
      </div>

      {headers.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Map PDF Columns/Fields</h2>
          <p className="text-sm text-gray-600 mb-6">
            Match the extracted fields from your PDF to the required transaction fields. 
            Fields marked with <span className="text-red-500">*</span> are mandatory.
            <br/><strong>Note:</strong> PDF data extraction can be complex. Ensure the headers below accurately represent your PDF&apos;s data table structure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {[ 
              { field: 'date', label: 'Date', required: true },
              { field: 'amount', label: 'Amount (if single column for +/-)', required: typeConfig.strategy === 'sign' },
              { field: 'description', label: 'Description', required: true },
              { field: 'category', label: 'Category', required: false },
            ].map(mapItem => (
              <div key={mapItem.field}>
                <label htmlFor={`map-pdf-${mapItem.field}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {mapItem.label} {mapItem.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  id={`map-pdf-${mapItem.field}`}
                  value={columnMapping[mapItem.field as keyof ColumnMapping] || ""}
                  onChange={(e) => handleMappingChange(mapItem.field as keyof ColumnMapping, e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  disabled={headers.length === 0 || (mapItem.field === 'amount' && typeConfig.strategy !== 'sign')}
                >
                  <option value="">- Select PDF Field -</option>
                  {headers.map(header => <option key={header} value={header}>{header}</option>)} 
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {headers.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Determine Transaction Type (Income/Expense)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Select how to determine whether a transaction is income or expense. The default method using amount sign (+/-) 
            provides the most reliable synchronization with your dashboard.
          </p>
          {/* Radio buttons and conditional selects for type determination - same as CSV for now */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How to determine transaction type?</label>
              <div className="flex flex-col sm:flex-row sm:space-x-4 pt-1">
                {(['sign', 'separate_columns', 'type_column'] as TypeDeterminationStrategy[]).map(strat => (
                  <label key={strat} className="inline-flex items-center mt-2 sm:mt-0 cursor-pointer">
                    <input type="radio" className="form-radio h-4 w-4 text-indigo-600" name="typeStrategyPdf" value={strat} checked={typeConfig.strategy === strat} onChange={() => handleStrategyChange(strat)} />
                    <span className="ml-2 text-sm text-gray-700">
                      {strat === 'sign' && (
                        <>
                          Use amount sign (+/-)
                          <span className="ml-1 text-xs text-green-600 font-medium">(Recommended for best synchronization)</span>
                        </>
                      )}
                      {strat === 'separate_columns' && 'Use separate Credit/Debit fields'}
                      {strat === 'type_column' && 'Use a dedicated field for type'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {typeConfig.strategy === 'separate_columns' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4 pt-4 border-t">
                <div>
                  <label htmlFor="map-pdf-credit-col" className="block text-sm font-medium">Credit/Income Field <span className="text-red-500">*</span></label>
                  <select id="map-pdf-credit-col" value={typeConfig.creditColumn || ""} onChange={(e) => handleTypeConfigChange('creditColumn', e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"><option value="">- Select PDF Field -</option>{headers.map(header => <option key={`credit-${header}`} value={header}>{header}</option>)}</select>
                </div>
                <div>
                  <label htmlFor="map-pdf-debit-col" className="block text-sm font-medium">Debit/Expense Field <span className="text-red-500">*</span></label>
                  <select id="map-pdf-debit-col" value={typeConfig.debitColumn || ""} onChange={(e) => handleTypeConfigChange('debitColumn', e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"><option value="">- Select PDF Field -</option>{headers.map(header => <option key={`debit-${header}`} value={header}>{header}</option>)}</select>
                </div>
              </div>
            )}
            {typeConfig.strategy === 'type_column' && (
              <div className="space-y-4 mt-4 pt-4 border-t">
                <div>
                  <label htmlFor="map-pdf-type-indicator-col" className="block text-sm font-medium">Field Indicating Type <span className="text-red-500">*</span></label>
                  <select id="map-pdf-type-indicator-col" value={typeConfig.typeIndicatorColumn || ""} onChange={(e) => handleTypeConfigChange('typeIndicatorColumn', e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"><option value="">- Select PDF Field -</option>{headers.map(header => <option key={`typecol-${header}`} value={header}>{header}</option>)}</select>
                </div>
                <div>
                  <label htmlFor="pdf-income-values" className="block text-sm font-medium">Values for Income (comma-separated) <span className="text-red-500">*</span></label>
                  <input type="text" id="pdf-income-values" value={typeConfig.incomeValues} onChange={(e) => handleTypeConfigChange('incomeValues', e.target.value)} placeholder="e.g., credit, CR" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label htmlFor="pdf-expense-values" className="block text-sm font-medium">Values for Expense (comma-separated) <span className="text-red-500">*</span></label>
                  <input type="text" id="pdf-expense-values" value={typeConfig.expenseValues} onChange={(e) => handleTypeConfigChange('expenseValues', e.target.value)} placeholder="e.g., debit, DR" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {previewData.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Review and Confirm Transactions (from PDF)</h2>
          <p className="text-sm text-gray-600 mb-6">
            Review the transactions extracted from the PDF. You can exclude rows or change the type before importing.
            Rows with errors or missing essential information will not be imported.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium">Exclude</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Errors</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.map((pRow, index) => (
                  <tr key={pRow.id} className={`${pRow.errors.length > 0 ? 'bg-red-100' : ''} ${pRow.isExcluded ? 'bg-gray-200 opacity-60' : ''}`}>
                    <td className="px-2 py-4"><input type="checkbox" className="form-checkbox h-4 w-4" checked={pRow.isExcluded} onChange={() => handleToggleExcludeRow(index)} /></td>
                    <td className="px-6 py-4">{pRow.parsedDate ? pRow.parsedDate.toLocaleDateString() : <span className="text-red-500">{pRow.mappedData.dateStr || 'N/A'}</span>}</td>
                    <td className="px-6 py-4">{pRow.mappedData.descriptionStr || <span className="text-red-500">N/A</span>}</td>
                    <td className="px-6 py-4">{pRow.mappedData.categoryStr || '-'}</td>
                    <td className="px-6 py-4">
                      <select value={pRow.calculatedType || ''} onChange={(e) => handleChangeRowType(index, e.target.value as 'income' | 'expense' | '')} className={`form-select block w-full py-1 px-2 border rounded-md ${pRow.calculatedType ? 'border-gray-300' : 'border-red-500'}`} disabled={pRow.isExcluded}>
                        <option value="">- Select -</option><option value="income">Income</option><option value="expense">Expense</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">{pRow.finalAmount !== null ? pRow.finalAmount.toFixed(2) : <span className="text-red-500">N/A</span>}</td>
                    <td className="px-6 py-4 text-xs text-red-600">{pRow.errors.join("; ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmitTransactions} disabled={!isImportReady() || isParsingPdf}>
              Import ({previewData.filter(row => !row.isExcluded && row.errors.length === 0 && row.calculatedType && row.finalAmount !== null).length}) Transactions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 