'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const CartSummary = () => {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No items in cart</p>
        </CardContent>
      </Card>
    );
  }

  const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate original price (before discount) - the cart stores discounted prices
  // So we need to calculate back to original price: discounted = original - (original * 0.1)
  // Therefore: original = discounted / 0.9
  const originalSubtotal = Math.round(subtotal / 0.9);
  const totalDiscount = originalSubtotal - subtotal;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {state.items.map((item) => {
            // Calculate original price for this item
            const originalPrice = Math.round(item.price / 0.9);
            return (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.composition}</p>
                  <p className="text-xs text-gray-500">{item.form}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 line-through">
                        Rs. {originalPrice.toLocaleString()} × {item.quantity}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        Rs. {item.price.toLocaleString()} × {item.quantity} = Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Items:</span>
            <span className="text-sm">{totalQuantity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 line-through">Original Subtotal:</span>
            <span className="text-sm text-gray-500 line-through">Rs. {originalSubtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-green-600">Discount (10%):</span>
            <span className="text-sm font-medium text-green-600">-Rs. {totalDiscount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Subtotal:</span>
            <span className="text-sm">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Shipping:</span>
            <span className="text-sm text-green-600">Free (Cash on Delivery)</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Grand Total:</span>
          <span className="text-lg font-bold text-blue-600">Rs. {subtotal.toLocaleString()}</span>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 font-medium">🎉 You saved Rs. {totalDiscount.toLocaleString()} with 10% discount!</p>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">Payment Method: Cash on Delivery</p>
          <p className="text-xs text-blue-600 mt-1">You&#39;ll pay when your order is delivered</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
