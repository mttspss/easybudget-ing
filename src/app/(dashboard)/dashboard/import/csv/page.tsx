"use client";

import { useState, useEffect } from "react";
import Papa, { ParseResult } from "papaparse";
import { Button } from "@/components/ui/button"; 
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { mutateTransactions } from "@/hooks/useTransactions";

// Define a type for parsed rows when header: true
interface CsvRow {
  [key: string]: string;
}

// Interface for column mapping
interface ColumnMapping {
  date: string | null;
  amount: string | null;
  description: string | null;
  category: string | null; // Opzionale
}

// Nuove interfacce e tipi per la determinazione del tipo di transazione
export type TypeDeterminationStrategy = 'sign' | 'separate_columns' | 'type_column';

export interface TransactionTypeConfig {
  strategy: TypeDeterminationStrategy;
  // Per 'sign' (usa columnMapping.amount)
  // Per 'separate_columns'
  creditColumn: string | null;
  debitColumn: string | null;
  // Per 'type_column'
  typeIndicatorColumn: string | null;
  incomeValues: string; // Es. "credit,C,income" (stringa separata da virgole)
  expenseValues: string; // Es. "debit,D,expense"
}

// Interfaccia per una riga processata, pronta per l'anteprima e l'invio
export interface ProcessedRow {
  id: string; // Un ID univoco per la riga nell'UI, es. basato sull'indice
  originalData: CsvRow;
  mappedData: {
    dateStr?: string | null;
    amountStr?: string | null; // Usato se strategy='sign'
    creditStr?: string | null; // Usato se strategy='separate_columns'
    debitStr?: string | null;  // Usato se strategy='separate_columns'
    descriptionStr?: string | null;
    categoryStr?: string | null;
    typeIndicatorStr?: string | null; // Usato se strategy='type_column'
  };
  parsedDate?: Date | null;
  calculatedType: 'income' | 'expense' | null; // Può essere null se non determinabile
  finalAmount: number | null; // Importo finale, sempre positivo
  isExcluded: boolean;
  errors: string[]; // Array di messaggi di errore per questa riga
}

export default function ImportCsvPage() {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [selectedRowForNewCategory, setSelectedRowForNewCategory] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  // State for column mapping
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({
    date: null,
    amount: null,
    description: null,
    category: null,
  });
  
  // State for transaction type determination
  const [typeConfig, setTypeConfig] = useState<TransactionTypeConfig>({
    strategy: 'sign', // Default
    creditColumn: null,
    debitColumn: null,
    typeIndicatorColumn: null,
    incomeValues: 'credit,cr,c,income,entrata,accredito', 
    expenseValues: 'debit,dr,d,expense,uscita,addebito',
  });

  // State for prepared preview data
  const [previewData, setPreviewData] = useState<ProcessedRow[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setColumnMapping({ date: null, amount: null, description: null, category: null });
      setCsvData([]);
      setHeaders([]);

      Papa.parse<CsvRow>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<CsvRow>) => {
          if (results.meta.fields) {
            setHeaders(results.meta.fields);
            const autoMapping: ColumnMapping = { date: null, amount: null, description: null, category: null };
            results.meta.fields.forEach(header => {
              const lowerHeader = header.toLowerCase();
              if (!autoMapping.date && (lowerHeader.includes("date") || lowerHeader.includes("data"))) autoMapping.date = header;
              if (!autoMapping.amount && (lowerHeader.includes("amount") || lowerHeader.includes("importo") || lowerHeader.includes("value") || lowerHeader.includes("valore"))) autoMapping.amount = header;
              if (!autoMapping.description && (lowerHeader.includes("description") || lowerHeader.includes("descrizione") || lowerHeader.includes("causale"))) autoMapping.description = header;
              if (!autoMapping.category && (lowerHeader.includes("category") || lowerHeader.includes("categoria"))) autoMapping.category = header;
            });
            setColumnMapping(autoMapping);

            const fieldNames = results.meta.fields.map(f => f.toLowerCase());
            const hasCreditKeywords = fieldNames.some(f => typeConfig.incomeValues.split(',').some(val => f.includes(val.trim().toLowerCase()) && val.trim() !== ''));
            const hasDebitKeywords = fieldNames.some(f => typeConfig.expenseValues.split(',').some(val => f.includes(val.trim().toLowerCase()) && val.trim() !== ''));

            let detectedStrategy: TypeDeterminationStrategy = 'sign'; // Default a 'sign'
            let detectedCreditCol: string | null = null;
            let detectedDebitCol: string | null = null;

            if (hasCreditKeywords && hasDebitKeywords) {
                const creditCol = results.meta.fields.find(h => typeConfig.incomeValues.split(',').some(val => h.toLowerCase().includes(val.trim().toLowerCase()) && val.trim() !== ''));
                const debitCol = results.meta.fields.find(h => typeConfig.expenseValues.split(',').some(val => h.toLowerCase().includes(val.trim().toLowerCase()) && val.trim() !== ''));
                if (creditCol && debitCol && creditCol !== debitCol) {
                    // Questo potrebbe essere un caso per 'separate_columns' o 'type_column' se sono la stessa colonna
                    // Per ora, se troviamo parole chiave distinte in colonne distinte, lo favoriamo
                    detectedStrategy = 'separate_columns';
                    detectedCreditCol = creditCol;
                    detectedDebitCol = debitCol;
                } else if (creditCol && debitCol && creditCol === debitCol){
                    // Se le parole chiave sono nella stessa colonna, probabilmente è una 'type_column'
                    setTypeConfig(prev => ({ ...prev, strategy: 'type_column', typeIndicatorColumn: creditCol }));
                    detectedStrategy = 'type_column'; // Previene di sovrascrivere con 'sign' sotto
                }
            }
            
            if (detectedStrategy === 'sign' && autoMapping.amount) {
              const amountValues = results.data.map(row => parseFloat(row[autoMapping.amount!])).filter(v => !isNaN(v));
              if (amountValues.some(v => v > 0) && amountValues.some(v => v < 0)) {
                // La strategia 'sign' è già il default, non c'è bisogno di settarla esplicitamente se già lo è
              } else {
                // Se non ci sono segni misti, e non abbiamo rilevato 'separate_columns' o 'type_column',
                // la strategia 'sign' potrebbe non essere ideale. L'utente dovrà scegliere.
              }
            } else if (detectedStrategy === 'separate_columns'){
                 setTypeConfig(prev => ({ ...prev, strategy: 'separate_columns', creditColumn: detectedCreditCol, debitColumn: detectedDebitCol }));
            } // type_column viene gestito sopra

          }
          setCsvData(results.data);
        },
        error: (err: Error) => {
          console.error("Error parsing CSV:", err.message);
          alert(`Error parsing CSV: ${err.message}`);
          setCsvData([]);
          setHeaders([]);
        },
      });
    }
  };

  // Funzione per gestire il cambio di mappatura
  const handleMappingChange = (transactionField: keyof ColumnMapping, csvHeader: string) => {
    // Se l'utente seleziona "- Select ... -", il valore sarà "", che trattiamo come null
    setColumnMapping(prev => ({ ...prev, [transactionField]: csvHeader === "" ? null : csvHeader }));
  };

  // Handler per cambiare la strategia di determinazione del tipo
  const handleStrategyChange = (strategy: TypeDeterminationStrategy) => {
    setTypeConfig(prev => ({
      ...prev,
      strategy,
      // Resetta le mappature specifiche della vecchia strategia quando si cambia
      creditColumn: strategy !== 'separate_columns' ? null : prev.creditColumn,
      debitColumn: strategy !== 'separate_columns' ? null : prev.debitColumn,
      typeIndicatorColumn: strategy !== 'type_column' ? null : prev.typeIndicatorColumn,
    }));
  };

  // Handler per cambiare i valori specifici della configurazione del tipo
  const handleTypeConfigChange = (field: keyof Omit<TransactionTypeConfig, 'strategy'>, value: string) => {
    setTypeConfig(prev => ({ ...prev, [field]: value === "" ? null : value }));
  };

  // useEffect per ricalcolare i dati di anteprima quando cambiano le dipendenze
  useEffect(() => {
    if (csvData.length === 0) {
      setPreviewData([]);
      return;
    }

    const newPreviewData = csvData.map((row, index): ProcessedRow => {
      const id = `row-${index}`;
      const mappedData: ProcessedRow['mappedData'] = {};
      const errors: string[] = [];
      let parsedDate: Date | null = null;
      let calculatedType: ProcessedRow['calculatedType'] = null;
      let finalAmount: number | null = null;

      // 1. Estrai dati mappati
      if (columnMapping.date) mappedData.dateStr = row[columnMapping.date];
      if (columnMapping.description) mappedData.descriptionStr = row[columnMapping.description];
      if (columnMapping.category) mappedData.categoryStr = row[columnMapping.category];
      
      switch (typeConfig.strategy) {
        case 'sign':
          if (columnMapping.amount) mappedData.amountStr = row[columnMapping.amount];
          break;
        case 'separate_columns':
          if (typeConfig.creditColumn) mappedData.creditStr = row[typeConfig.creditColumn];
          if (typeConfig.debitColumn) mappedData.debitStr = row[typeConfig.debitColumn];
          break;
        case 'type_column':
          if (typeConfig.typeIndicatorColumn) mappedData.typeIndicatorStr = row[typeConfig.typeIndicatorColumn];
          // Per la strategia 'type_column', l'importo potrebbe comunque venire da una colonna 'amount' generica
          if (columnMapping.amount) mappedData.amountStr = row[columnMapping.amount]; 
          break;
      }

      // 2. Parsa Data
      if (mappedData.dateStr) {
        const d = new Date(mappedData.dateStr);
        if (!isNaN(d.getTime())) {
          parsedDate = d;
        } else {
          // Prova formati comuni se il parsing diretto fallisce (es. DD/MM/YYYY)
          const parts = mappedData.dateStr.split(/[/.-]/);
          if (parts.length === 3) {
            let dAttempt: Date | null = null;
            // DD/MM/YYYY
            dAttempt = new Date(+parts[2], +parts[1] - 1, +parts[0]);
            if (!isNaN(dAttempt.getTime())) parsedDate = dAttempt;
            else {
              // MM/DD/YYYY
              dAttempt = new Date(+parts[2], +parts[0] - 1, +parts[1]);
              if (!isNaN(dAttempt.getTime())) parsedDate = dAttempt;
            }
          }
          if(!parsedDate) errors.push("Invalid date format.");
        }
      } else if (columnMapping.date) { // Se la colonna data è mappata ma non c'è valore
        errors.push("Date is missing.");
      }

      // 3. Calcola Tipo e Importo Finale
      const incomeKeywords = typeConfig.incomeValues.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
      const expenseKeywords = typeConfig.expenseValues.toLowerCase().split(',').map(s => s.trim()).filter(s => s);

      if (typeConfig.strategy === 'sign' && mappedData.amountStr) {
        const amountVal = parseFloat(mappedData.amountStr.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
        if (!isNaN(amountVal)) {
          finalAmount = Math.abs(amountVal);
          if (amountVal > 0) calculatedType = 'income';
          else if (amountVal < 0) calculatedType = 'expense';
          // se amountVal è 0, calculatedType rimane null o gestito come expense/income a scelta
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
        
        // L'importo per type_column di solito viene da una colonna 'amount' separata
        if (mappedData.amountStr) {
            const amountVal = parseFloat(mappedData.amountStr.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
            if (!isNaN(amountVal)) {
                finalAmount = Math.abs(amountVal);
            } else {
                errors.push("Invalid amount format for 'type_column' strategy amount.");
            }
        } else if(columnMapping.amount) { // Colonna amount mappata ma senza valore
            errors.push("Amount is missing for 'type_column' strategy.");
        }
      }
      
      // Validazioni finali
      if (!columnMapping.date) errors.push("Date column not mapped.");
      if (!columnMapping.description) errors.push("Description column not mapped.");
      if (typeConfig.strategy === 'sign' && !columnMapping.amount) errors.push("Amount column not mapped for 'sign' strategy.");
      if (typeConfig.strategy === 'separate_columns' && (!typeConfig.creditColumn || !typeConfig.debitColumn)) errors.push("Credit/Debit columns not mapped for 'separate_columns' strategy.");
      if (typeConfig.strategy === 'type_column' && !typeConfig.typeIndicatorColumn) errors.push("Type indicator column not mapped for 'type_column' strategy.");
      if (typeConfig.strategy === 'type_column' && !columnMapping.amount) errors.push("Amount column (for value) not mapped for 'type_column' strategy.");

      if(calculatedType && finalAmount === null && typeConfig.strategy !== 'sign'){ // es. type_column ma amountStr non era valido
         errors.push("Amount could not be determined despite type being set.");
      }
      if(finalAmount !== null && finalAmount < 0) finalAmount = Math.abs(finalAmount); // Assicura sia positivo

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
  }, [csvData, columnMapping, typeConfig]);

  // Funzioni handler per l'interattività della tabella di anteprima
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
  
  // Handle changing the category for a specific row
  const handleChangeCategoryForRow = (rowIndex: number, categoryValue: string) => {
    if (categoryValue === 'new') {
      setSelectedRowForNewCategory(rowIndex);
      setNewCategoryName('');
      return;
    }
    
    setPreviewData(prev =>
      prev.map((row, idx) =>
        idx === rowIndex ? { 
          ...row, 
          mappedData: { 
            ...row.mappedData, 
            categoryStr: categoryValue 
          } 
        } : row
      )
    );
  };
  
  // Handle creating a new category for a specific row
  const handleCreateCategoryForRow = (rowIndex: number) => {
    if (!newCategoryName.trim()) return;
    
    setPreviewData(prev =>
      prev.map((row, idx) =>
        idx === rowIndex ? { 
          ...row, 
          mappedData: { 
            ...row.mappedData, 
            categoryStr: newCategoryName.trim() 
          } 
        } : row
      )
    );
    
    setSelectedRowForNewCategory(null);
    setNewCategoryName('');
  };

  const isImportReady = (): boolean => {
    // Logica di base: almeno una riga da importare e mappature essenziali presenti
    if (!columnMapping.date || !columnMapping.description) return false;
    if (typeConfig.strategy === 'sign' && !columnMapping.amount) return false;
    if (typeConfig.strategy === 'separate_columns' && (!typeConfig.creditColumn || !typeConfig.debitColumn)) return false;
    if (typeConfig.strategy === 'type_column' && (!typeConfig.typeIndicatorColumn || !columnMapping.amount)) return false;
    
    return previewData.some(row => !row.isExcluded && row.errors.length === 0 && row.calculatedType && row.finalAmount !== null);
  };

  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<{message: string, count: number} | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

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
      type: row.calculatedType === 'income' ? 'INCOME' : 'EXPENSE', // Explicitly use the correct enum values
      category: row.mappedData.categoryStr || undefined,
      // User ID will be added by the backend using NextAuth session
    }));

    if (transactionsToImport.length === 0) {
      setImportError("No valid transactions to import.");
      return;
    }

    setIsImporting(true);
    setImportSuccess(null);
    setImportError(null);
    
    try {
      console.log("Submitting transactions:", transactionsToImport);
      
      const response = await fetch('/api/transactions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(transactionsToImport),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to import transactions");
      }
      
      const result = await response.json();
      
      // Success handling
      setImportSuccess(result);
      
      // Reset UI form
      setCsvData([]);
      setHeaders([]);
      setPreviewData([]);
      setFileName("");
      
      // Refresh all transaction data in the app
      mutateTransactions();
      
    } catch (error) {
      console.error("Import error:", error);
      setImportError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Import CSV</h1>
        <p className="text-muted-foreground">
          Upload and process your CSV files to add transactions.
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="csv-upload"
          className="block mb-2 text-sm font-medium"
        >
          Select CSV file to import
        </label>
        <div className="flex gap-3 items-center">
          <label
            htmlFor="csv-upload"
            className="cursor-pointer"
          >
            <div className="flex items-center justify-center bg-white text-primary hover:bg-slate-100 h-10 px-4 py-2 rounded-md text-sm font-medium border border-input">
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </div>
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {fileName && (
            <span className="text-sm text-muted-foreground truncate max-w-md">{fileName}</span>
          )}
        </div>
      </div>

      {/* Column Mapping Section */} 
      {headers.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Map CSV Columns</h2>
          <p className="text-sm text-gray-600 mb-6">
            Match the columns from your CSV file to the required transaction fields. 
            Fields marked with <span className="text-red-500">*</span> are mandatory.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {[ 
              { field: 'date', label: 'Date', required: true },
              { field: 'amount', label: 'Amount (if single column for +/-)', required: typeConfig.strategy === 'sign' },
              { field: 'description', label: 'Description', required: true },
              { field: 'category', label: 'Category', required: false },
            ].map(mapItem => (
              <div key={mapItem.field}>
                <label htmlFor={`map-${mapItem.field}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {mapItem.label} {mapItem.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  id={`map-${mapItem.field}`}
                  value={columnMapping[mapItem.field as keyof ColumnMapping] || ""}
                  onChange={(e) => handleMappingChange(mapItem.field as keyof ColumnMapping, e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  disabled={headers.length === 0 || (mapItem.field === 'amount' && typeConfig.strategy !== 'sign')}
                >
                  <option value="">- Select CSV Column -</option>
                  {headers.map(header => <option key={header} value={header}>{header}</option>)} 
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sezione Determinazione Tipo Transazione */} 
      {headers.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Determine Transaction Type (Income/Expense)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Select how to determine whether a transaction is income or expense. The default method using amount sign (+/-) 
            provides the most reliable synchronization with your dashboard.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How to determine transaction type?</label>
              <div className="flex flex-col sm:flex-row sm:space-x-4 pt-1">
                {(['sign', 'separate_columns', 'type_column'] as TypeDeterminationStrategy[]).map(strat => (
                  <label key={strat} className="inline-flex items-center mt-2 sm:mt-0 cursor-pointer">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      name="typeStrategy"
                      value={strat}
                      checked={typeConfig.strategy === strat}
                      onChange={() => handleStrategyChange(strat)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {strat === 'sign' && (
                        <>
                          Use amount sign (+/-) from a single amount column
                          <span className="ml-1 text-xs text-green-600 font-medium">(Recommended for best synchronization)</span>
                        </>
                      )}
                      {strat === 'separate_columns' && 'Use separate Credit (Income) and Debit (Expense) columns'}
                      {strat === 'type_column' && 'Use a dedicated column indicating transaction type'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {typeConfig.strategy === 'separate_columns' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <label htmlFor="map-credit-col" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit/Income Column <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="map-credit-col"
                    value={typeConfig.creditColumn || ""}
                    onChange={(e) => handleTypeConfigChange('creditColumn', e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">- Select CSV Column for Credits -</option>
                    {headers.map(header => <option key={`credit-${header}`} value={header}>{header}</option>)} 
                  </select>
                </div>
                <div>
                  <label htmlFor="map-debit-col" className="block text-sm font-medium text-gray-700 mb-1">
                    Debit/Expense Column <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="map-debit-col"
                    value={typeConfig.debitColumn || ""}
                    onChange={(e) => handleTypeConfigChange('debitColumn', e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">- Select CSV Column for Debits -</option>
                    {headers.map(header => <option key={`debit-${header}`} value={header}>{header}</option>)} 
                  </select>
                </div>
              </div>
            )}

            {typeConfig.strategy === 'type_column' && (
              <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <label htmlFor="map-type-indicator-col" className="block text-sm font-medium text-gray-700 mb-1">
                    Column Indicating Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="map-type-indicator-col"
                    value={typeConfig.typeIndicatorColumn || ""}
                    onChange={(e) => handleTypeConfigChange('typeIndicatorColumn', e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">- Select CSV Column -</option>
                    {headers.map(header => <option key={`typecol-${header}`} value={header}>{header}</option>)} 
                  </select>
                </div>
                <div>
                  <label htmlFor="income-values" className="block text-sm font-medium text-gray-700 mb-1">
                    Values indicating Income (comma-separated) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="income-values"
                    value={typeConfig.incomeValues}
                    onChange={(e) => handleTypeConfigChange('incomeValues', e.target.value)}
                    placeholder="e.g., credit, CR, income"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="expense-values" className="block text-sm font-medium text-gray-700 mb-1">
                    Values indicating Expense (comma-separated) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="expense-values"
                    value={typeConfig.expenseValues}
                    onChange={(e) => handleTypeConfigChange('expenseValues', e.target.value)}
                    placeholder="e.g., debit, DR, expense"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sezione di anteprima e mappatura (da implementare) */}
      {previewData.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Review and Confirm Transactions</h2>
          <p className="text-sm text-gray-600 mb-6">
            Review the transactions below. You can exclude rows or change the transaction type before importing.
            Rows with errors (highlighted in red) or missing essential information will not be imported.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exclude</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errors</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.map((pRow, index) => (
                  <tr key={pRow.id} className={`${pRow.errors.length > 0 ? 'bg-red-100' : ''} ${pRow.isExcluded ? 'bg-gray-200 opacity-60' : ''}`}>
                    <td className="px-2 py-4"><input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" checked={pRow.isExcluded} onChange={() => handleToggleExcludeRow(index)} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pRow.parsedDate ? pRow.parsedDate.toLocaleDateString() : <span className="text-red-500">{pRow.mappedData.dateStr || 'N/A'}</span>}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{pRow.mappedData.descriptionStr || <span className="text-red-500">N/A</span>}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="relative">
                        <select 
                          value={pRow.mappedData.categoryStr || ''} 
                          onChange={(e) => handleChangeCategoryForRow(index, e.target.value)}
                          className="form-select block w-full py-1 px-2 border rounded-md shadow-sm sm:text-sm border-gray-300"
                          disabled={pRow.isExcluded}
                        >
                          <option value="">- Select Category -</option>
                          {pRow.calculatedType === 'income' && (
                            <>
                              <optgroup label="Income Categories">
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investments">Investments</option>
                                <option value="Gifts">Gifts</option>
                                <option value="Refunds">Refunds</option>
                              </optgroup>
                            </>
                          )}
                          {pRow.calculatedType === 'expense' && (
                            <>
                              <optgroup label="Expense Categories">
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Housing">Housing</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health">Health</option>
                                <option value="Shopping">Shopping</option>
                              </optgroup>
                            </>
                          )}
                          <option value="new">+ Create New Category</option>
                        </select>
                        {selectedRowForNewCategory === index && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm z-10 p-2">
                            <input 
                              type="text"
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              placeholder="Category name"
                              className="w-full mb-2 text-sm p-1 border border-gray-300 rounded"
                            />
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => setSelectedRowForNewCategory(null)}
                                className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => handleCreateCategoryForRow(index)}
                                className="px-2 py-1 text-xs text-white bg-blue-600 rounded"
                                disabled={!newCategoryName.trim()}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select 
                        value={pRow.calculatedType || ''} 
                        onChange={(e) => handleChangeRowType(index, e.target.value as 'income' | 'expense' | '')}
                        className={`form-select block w-full py-1 px-2 border rounded-md shadow-sm sm:text-sm ${pRow.calculatedType ? 'border-gray-300' : 'border-red-500'}`}
                        disabled={pRow.isExcluded}
                      >
                        <option value="">- Select -</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pRow.finalAmount !== null ? pRow.finalAmount.toFixed(2) : <span className="text-red-500">N/A</span>}</td>
                    <td className="px-6 py-4 text-xs text-red-600 font-medium">{pRow.errors.join("; ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            {importSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">Import Successful</h4>
                  <p className="text-green-700 text-sm">{importSuccess.message}</p>
                </div>
              </div>
            )}
            
            {importError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800">Import Failed</h4>
                  <p className="text-red-700 text-sm">{importError}</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmitTransactions} 
                disabled={!isImportReady() || isImporting}
              >
                {isImporting 
                  ? "Importing..." 
                  : `Import (${previewData.filter(row => !row.isExcluded && row.errors.length === 0 && row.calculatedType && row.finalAmount !== null).length}) Transactions`
                }
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 