'use client';

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { PasswordInput } from '@/components/ui/password-input';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import type {
  CreateLearnerDto,
  UpdateLearnerDto,
  ParentOption,
  LevelOption,
  SubjectOption,
  SchoolOption,
} from '../types';
import type { User } from '@/features/user-management/types';

// Validation schema for creating
const learnerCreateSchema = z.object({
  parentId: z.string().min(1, 'Parent is required'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  level: z.string().min(1, 'Level is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  school: z.string().min(1, 'School is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Validation schema for editing (only subjects and password)
const learnerUpdateSchema = z.object({
  parentId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  level: z.string().optional(),
  dateOfBirth: z.string().optional(),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  school: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface LearnerFormProps {
  onSubmit: (data: CreateLearnerDto | UpdateLearnerDto) => void;
  parents: ParentOption[];
  levels: LevelOption[];
  schools: SchoolOption[];
  getSubjectsByLevel: (levelId: string) => SubjectOption[];
  loadingParents: boolean;
  loadingLevels: boolean;
  loadingSchools: boolean;
  isEditMode?: boolean;
  editUser?: User | null;
}

export interface LearnerFormRef {
  submit: () => void;
}

type LearnerFormValues = Omit<CreateLearnerDto, 'profilePicture'>;
type LearnerUpdateFormValues = Omit<UpdateLearnerDto, 'id'> & {
  parentId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  level?: string;
  dateOfBirth?: string;
  school?: string;
};

export const LearnerForm = forwardRef<LearnerFormRef, LearnerFormProps>(({
  onSubmit,
  parents,
  levels,
  schools,
  getSubjectsByLevel,
  loadingParents,
  loadingLevels,
  loadingSchools,
  isEditMode = false,
  editUser,
}, ref) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const form = useForm<LearnerFormValues | LearnerUpdateFormValues>({
    resolver: zodResolver(isEditMode ? learnerUpdateSchema : learnerCreateSchema) as any,
    defaultValues: {
      parentId: '',
      firstName: '',
      lastName: '',
      username: '',
      level: '',
      dateOfBirth: '',
      subjects: [],
      school: '',
      password: '',
    },
  });

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isEditMode && editUser) {
      const [firstName = '', lastName = ''] = editUser.username.split(' ');
      form.reset({
        parentId: editUser.parentId || '',
        firstName,
        lastName,
        username: editUser.username,
        level: editUser.level || '',
        dateOfBirth: '', // We don't have DOB in User type
        subjects: [], // We don't store subjects in User type, leave empty for user to select
        school: '', // We don't have school in User type
        password: '',
      });
      setSelectedLevel(editUser.level || '');
    }
  }, [isEditMode, editUser, form]);

  // Simulate fetching subjects when level changes
  useEffect(() => {
    if (selectedLevel) {
      setLoadingSubjects(true);
      const timer = setTimeout(() => {
        setLoadingSubjects(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedLevel]);

  const handleFormSubmit = (data: LearnerFormValues | LearnerUpdateFormValues) => {
    onSubmit(data as CreateLearnerDto | UpdateLearnerDto);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(handleFormSubmit)();
    },
  }));

  const availableSubjects = selectedLevel ? getSubjectsByLevel(selectedLevel) : [];

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditMode}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder={loadingParents ? 'Loading parents...' : 'Select a parent'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parents.map((parent) => (
                    <SelectItem key={parent.value} value={parent.value}>
                      {parent.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane" {...field} disabled={isEditMode} />
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedLevel(value);
                    form.setValue('subjects', []);
                  }}
                  defaultValue={field.value}
                  disabled={isEditMode}
                >
                  <FormControl className='w-full'>
                    <SelectTrigger>
                      <SelectValue placeholder={loadingLevels ? 'Loading levels...' : 'Select a level'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                    }}
                    placeholder="Select date of birth"
                    disabled={isEditMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subjects"
          render={() => (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
              <div className="flex flex-wrap gap-4 max-h-40 overflow-y-auto border rounded-md p-3">
                {!selectedLevel && (
                  <p className="text-sm text-muted-foreground w-full">
                    Please select a level first
                  </p>
                )}
                {loadingSubjects && (
                  <>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-32" />
                  </>
                )}
                {!loadingSubjects && selectedLevel && availableSubjects.length === 0 && (
                  <p className="text-sm text-muted-foreground w-full">
                    No subjects available for this level
                  </p>
                )}
                {!loadingSubjects && selectedLevel &&
                  availableSubjects.map((subject) => (
                    <FormField
                      key={subject.value}
                      control={form.control}
                      name="subjects"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={subject.value}
                            className="flex flex-row items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(subject.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, subject.value])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== subject.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {subject.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditMode}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder={loadingSchools ? 'Loading schools...' : 'Select a school'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.value} value={school.value}>
                      {school.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="janedoe123" {...field} disabled={isEditMode} />
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
});
