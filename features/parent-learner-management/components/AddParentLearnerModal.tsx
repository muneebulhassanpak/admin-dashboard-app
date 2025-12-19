/**
 * AddParentLearnerModal Component
 * Modal with tabs for adding parents and learners
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ParentForm, type ParentFormRef } from './ParentForm';
import { LearnerForm, type LearnerFormRef } from './LearnerForm';
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
  const parentFormRef = useRef<ParentFormRef>(null);
  const learnerFormRef = useRef<LearnerFormRef>(null);

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
      <DialogContent className="md:max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle>Add New Parent or Learner</DialogTitle>
            <DialogDescription>
              Choose whether to add a new parent account or a new learner under an
              existing parent.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'parent' | 'learner')} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="learner">Learner</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <TabsContent value="parent" className="mt-0">
              <ParentForm ref={parentFormRef} onSubmit={handleAddParent} />
            </TabsContent>

            <TabsContent value="learner" className="mt-0">
              <LearnerForm
                ref={learnerFormRef}
                onSubmit={handleAddLearner}
                parents={parents}
                levels={levels}
                schools={schools}
                getSubjectsByLevel={getSubjectsByLevel}
                loadingParents={loadingParents}
                loadingLevels={loadingLevels}
                loadingSchools={loadingSchools}
              />
            </TabsContent>
          </div>

          <div className="px-6 py-4 border-t bg-background">
            {activeTab === 'parent' && (
              <Button
                onClick={() => parentFormRef.current?.submit()}
                className="w-full"
                disabled={addingParent}
              >
                {addingParent ? 'Adding Parent...' : 'Add Parent'}
              </Button>
            )}
            {activeTab === 'learner' && (
              <Button
                onClick={() => learnerFormRef.current?.submit()}
                className="w-full"
                disabled={addingLearner}
              >
                {addingLearner ? 'Adding Learner...' : 'Add Learner'}
              </Button>
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
