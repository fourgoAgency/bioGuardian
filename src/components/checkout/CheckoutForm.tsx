'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your complete address'),
  city: z.string().min(2, 'Please enter your city'),
  postalCode: z.string().min(5, 'Please enter a valid postal code'),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      const orderData = {
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        shipping_address: `${data.address}, ${data.city}, ${data.postalCode}`,
        items: JSON.parse(JSON.stringify(state.items)),
        total_items: state.items.reduce((sum, item) => sum + item.quantity, 0),
        notes: data.notes || null,
        payment_method: 'cash_on_delivery',
        status: 'pending',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed. We'll contact you soon for confirmation.",
      });

      clearCart();
      navigate.push('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register('phone')}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register('address')}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register('city')}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>

          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              {...register('postalCode')}
              className={errors.postalCode ? 'border-red-500' : ''}
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
          </div>

          <div>
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Any special delivery instructions..."
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <p className="text-sm text-gray-600">Cash on Delivery (COD)</p>
            <p className="text-xs text-gray-500 mt-1">Pay when your order is delivered</p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
