/**
 * AddParentLearnerModal Component
 * Modal with tabs for adding parents and learners
 */

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParentForm } from './ParentForm';
import { LearnerForm } from './LearnerForm';
import { useAddParentLearner } from '../hooks';
import type { CreateParentDto, CreateLearnerDto } from '../types';

interface AddParentLearnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddParentLearnerModal({
  open,
  onOpenChange,
  onSuccess,
}: AddParentLearnerModalProps) {
  const [activeTab, setActiveTab] = useState<'parent' | 'learner'>('parent');

  const {
    addParent,
    addingParent,
    addLearner,
    addingLearner,
    parents,
    levels,
    schools,
    getSubjectsByLevel,
    loadingParents,
    loadingLevels,
    loadingSchools,
    error,
  } = useAddParentLearner();

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  const handleAddParent = async (data: CreateParentDto) => {
    try {
      await addParent(data);
      toast.success('Parent added successfully', {
        position: 'top-center',
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  const handleAddLearner = async (data: CreateLearnerDto) => {
    try {
      await addLearner(data);
      toast.success('Learner added successfully', {
        position: 'top-center',
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-4xl  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Parent or Learner</DialogTitle>
          <DialogDescription>
            Choose whether to add a new parent account or a new learner under an
            existing parent.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'parent' | 'learner')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parent">Parent</TabsTrigger>
            <TabsTrigger value="learner">Learner</TabsTrigger>
          </TabsList>

          <TabsContent value="parent" className="mt-6">
            <ParentForm onSubmit={handleAddParent} loading={addingParent} />
          </TabsContent>

          <TabsContent value="learner" className="mt-6">
            <LearnerForm
              onSubmit={handleAddLearner}
              loading={addingLearner}
              parents={parents}
              levels={levels}
              schools={schools}
              getSubjectsByLevel={getSubjectsByLevel}
              loadingParents={loadingParents}
              loadingLevels={loadingLevels}
              loadingSchools={loadingSchools}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
