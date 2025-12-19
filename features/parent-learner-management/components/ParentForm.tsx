/**
 * ParentForm Component
 * Form for adding a new parent
 */

'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import type { CreateParentDto, UpdateParentDto } from '../types';
import type { User } from '@/features/user-management/types';
import { useEffect } from 'react';

// Validation schema for adding
const parentCreateSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Validation schema for editing (only password)
const parentUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface ParentFormProps {
  onSubmit: (data: CreateParentDto | UpdateParentDto) => void;
  isEditMode?: boolean;
  editUser?: User | null;
}

export interface ParentFormRef {
  submit: () => void;
}

export const ParentForm = forwardRef<ParentFormRef, ParentFormProps>(
  ({ onSubmit, isEditMode = false, editUser }, ref) => {
    const form = useForm<CreateParentDto | UpdateParentDto>({
      resolver: zodResolver(isEditMode ? parentUpdateSchema : parentCreateSchema) as any,
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
      },
    });

    // Pre-fill form in edit mode
    useEffect(() => {
      if (isEditMode && editUser) {
        const [firstName = '', lastName = ''] = editUser.username.split(' ');
        form.reset({
          firstName,
          lastName,
          email: editUser.email,
          phone: '', // We don't have phone in User type, so leave empty
          password: '',
        });
      }
    }, [isEditMode, editUser, form]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)();
      },
    }));

    return (
      <Form {...form}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} disabled={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} disabled={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} disabled={isEditMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} disabled={isEditMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isEditMode ? 'New Password' : 'Password'}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    );
  }
);
