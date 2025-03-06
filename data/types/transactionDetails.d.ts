export interface TransactionDetail {
    // Basic Transaction Information
    id: string;
    orderId?: string;
    date: string;
    transactionType: "Sale" | "Refund" | "Void" | "Tip Adjustment";
    status: "Success" | "Declined" | "Refunded" | "Voided";
    authorizationCode?: string;
  
    // Financial Details
    subtotal: number;
    tax: number;
    tip: number;
    discounts?: number;
    serviceCharge?: number;
    total: number;
    paymentTendered?: number;
    changeGiven?: number;
    transactionFees?: number;
  
    // Payment Details
    paymentMethod: string;
    cardType?: string;
    maskedCardNumber?: string;
    terminalId?: string;
    paymentProcessor?: string;
    batchId?: string;
    responseCode?: string;
  
    // Employee & Operational Details
    cashier: string;
    registerId?: string;
    shiftInfo?: string;
    deviceInfo?: string;
    location?: string;
  
    // Order & Customer Details
    orderSummary: string;
    orderType: "Eat In" | "Takeaway" | "Delivery" | "Online";
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    deliveryAddress?: string;
    loyaltyPointsEarned?: number;
    loyaltyPointsRedeemed?: number;
    giftCardUsed?: string;
  
    // Additional & Audit Information
    transactionNotes?: string;
    voidRefundReason?: string;
    auditTrail?: string;
    networkInfo?: string;
    integrationMetadata?: string;
  }