import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { activateSubscription, updateSubscriptions } from '@/features/payments/server/subscriptions';

export interface PaymentState {
  isProcessing: boolean;
  error: string | null;
  currentPlan: string | null;
  subscriptionId: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
}

const initialState: PaymentState = {
  isProcessing: false,
  error: null,
  currentPlan: null,
  subscriptionId: null,
  paymentStatus: 'idle',
};

export const initiateSubscription = createAsyncThunk(
  'payment/initiateSubscription',
  async ({ userId, planId }: { userId: string; planId: string }, { rejectWithValue }) => {
    try {
      console.log("Activating Subscription....")
      const response = await activateSubscription(userId, planId);
      console.log("ActivateSubscription Response", response)
      if (response?.error) {
        return rejectWithValue(response.error);
      }
      return { subscriptionId: response?.id, planId };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to initiate subscription');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async ({ 
    userId, 
    paymentId, 
    subscriptionId, 
    signature, 
    razorpaySubscriptionId 
  }: {
    userId: string;
    paymentId: string;
    subscriptionId: string;
    signature: string;
    razorpaySubscriptionId: string;
  }) => {
    const result = await updateSubscriptions(
      userId,
      paymentId,
      subscriptionId,
      signature,
      razorpaySubscriptionId
    );
    if (result?.error) throw new Error(result.error);
    return result;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.isProcessing = false;
      state.error = null;
      state.paymentStatus = 'idle';
    },
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Initiate Subscription
      .addCase(initiateSubscription.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.paymentStatus = 'processing';
      })
      .addCase(initiateSubscription.fulfilled, (state, action) => {
        state.subscriptionId = action.payload.subscriptionId;
        state.currentPlan = action.payload.planId;
        state.isProcessing = false;
        state.error = null;
      })
      .addCase(initiateSubscription.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload as string || 'Failed to initiate subscription';
        state.paymentStatus = 'failed';
      })
      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.isProcessing = false;
        state.paymentStatus = 'success';
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.error.message || 'Payment verification failed';
        state.paymentStatus = 'failed';
      });
  },
});

export const { resetPaymentState, setCurrentPlan } = paymentSlice.actions;
export default paymentSlice.reducer; 