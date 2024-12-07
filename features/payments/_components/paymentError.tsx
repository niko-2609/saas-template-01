/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';

// Define error types
export type RazorpayErrorCode = 
  | 'BAD_REQUEST_ERROR'
  | 'GATEWAY_ERROR'
  | 'SERVER_ERROR'
  | 'PAYMENT_CANCELED'
  | 'SUBSCRIPTION_ERROR'
  | 'VERIFICATION_ERROR'
  | 'NETWORK_ERROR';

interface ErrorMapping {
  title: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
}

// Error mappings with user-friendly messages
const ERROR_MAPPINGS: Record<RazorpayErrorCode, ErrorMapping> = {
  BAD_REQUEST_ERROR: {
    title: 'Invalid Request',
    description: 'The payment request was invalid. Please check your details and try again.',
    severity: 'error',
  },
  GATEWAY_ERROR: {
    title: 'Payment Gateway Error',
    description: 'There was an issue processing your payment. Please try again later.',
    severity: 'error',
  },
  SERVER_ERROR: {
    title: 'Server Error',
    description: 'An unexpected error occurred. Our team has been notified.',
    severity: 'error',
  },
  PAYMENT_CANCELED: {
    title: 'Payment Canceled',
    description: 'You have canceled the payment process.',
    severity: 'info',
  },
  SUBSCRIPTION_ERROR: {
    title: 'Subscription Error',
    description: 'Unable to process subscription. Please try again or contact support.',
    severity: 'error',
  },
  VERIFICATION_ERROR: {
    title: 'Verification Failed',
    description: 'Payment verification failed. If money was deducted, it will be refunded.',
    severity: 'warning',
  },
  NETWORK_ERROR: {
    title: 'Network Error',
    description: 'Please check your internet connection and try again.',
    severity: 'warning',
  },
};

interface RazorpayErrorProps {
  errorCode: RazorpayErrorCode;
  className?: string;
  onClose?: () => void;
  customMessage?: string;
}

export const RazorpayError: React.FC<RazorpayErrorProps> = ({
  errorCode,
  className = '',
  onClose,
  customMessage,
}) => {
  const error = ERROR_MAPPINGS[errorCode];

  if (!error) return null;

  return (
    <Alert 
      variant="destructive" 
      className={`flex items-center justify-between ${className}`}
    >
      <div className="flex items-start gap-4">
        <XCircle className="h-5 w-5" />
        <div>
          <AlertTitle className="mb-2">{error.title}</AlertTitle>
          <AlertDescription>
            {customMessage || error.description}
          </AlertDescription>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
          aria-label="Close error message"
        >
          ✕
        </button>
      )}
    </Alert>
  );
};

// Helper function to parse Razorpay error responses
export const parseRazorpayError = (error: any): RazorpayErrorCode => {
  if (!error) return 'SERVER_ERROR';

  // Handle different error scenarios
  if (error.code === 'BAD_REQUEST_ERROR') return 'BAD_REQUEST_ERROR';
  if (error.description?.includes('gateway')) return 'GATEWAY_ERROR';
  if (error.description?.includes('network')) return 'NETWORK_ERROR';
  if (error.description?.includes('subscription')) return 'SUBSCRIPTION_ERROR';
  if (error.description?.includes('verification')) return 'VERIFICATION_ERROR';
  
  return 'SERVER_ERROR';
};

export default RazorpayError;