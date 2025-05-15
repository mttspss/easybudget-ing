import useSWR, { mutate } from 'swr';
import { format } from 'date-fns';

interface TransactionParams {
  from?: Date;
  to?: Date;
}

const fetcher = (url: string) => 
  fetch(url, { credentials: 'include' }).then(res => {
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
  });

export function useTransactions({ from, to }: TransactionParams = {}) {
  // Default to last 30 days if not provided
  const defaultFrom = new Date();
  defaultFrom.setDate(defaultFrom.getDate() - 30);
  
  const fromDate = from || defaultFrom;
  const toDate = to || new Date();
  
  // Add one day to toDate to include transactions on the end date
  const adjustedToDate = new Date(toDate);
  adjustedToDate.setDate(adjustedToDate.getDate() + 1);
  
  const fromString = format(fromDate, 'yyyy-MM-dd');
  const toString = format(adjustedToDate, 'yyyy-MM-dd');
  
  const key = `/api/transactions?from=${fromString}&to=${toString}`;
  
  console.log(`Fetching transactions from ${fromString} to ${toString}`);
  
  const { data, error, isLoading, mutate: mutateFn } = useSWR(key, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    dedupingInterval: 5000 // Dedupe requests within 5 seconds
  });
  
  return {
    data: data || [], // Ensure we always return an array, even if null
    isLoading,
    error,
    mutate: mutateFn
  };
}

export function mutateTransactions() {
  console.log("Mutating transactions cache");
  
  // Invalidate all transaction endpoints by using a regex pattern
  return mutate(
    (key) => typeof key === 'string' && key.startsWith('/api/transactions'),
    undefined,
    { revalidate: true }
  );
} 