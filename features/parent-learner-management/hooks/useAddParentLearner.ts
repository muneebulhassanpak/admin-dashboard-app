/**
 * useAddParentLearner Hook
 * Manages state and logic for adding parents and learners
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  UseAddParentLearnerReturn,
  CreateParentDto,
  CreateLearnerDto,
  UpdateParentDto,
  UpdateLearnerDto,
  ParentOption,
  LevelOption,
  SubjectOption,
  SchoolOption,
  Parent,
  Learner,
} from '../types';
import { parentLearnerService } from '../services';

export function useAddParentLearner(): UseAddParentLearnerReturn {
  // Dropdown data
  const [parents, setParents] = useState<ParentOption[]>([]);
  const [levels, setLevels] = useState<LevelOption[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [schools, setSchools] = useState<SchoolOption[]>([]);

  // Loading states
  const [loadingParents, setLoadingParents] = useState(false);
  const [loadingLevels, setLoadingLevels] = useState(false);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [addingParent, setAddingParent] = useState(false);
  const [addingLearner, setAddingLearner] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Fetch parents on mount
  useEffect(() => {
    const fetchParents = async () => {
      setLoadingParents(true);
      setError(null);
      try {
        const data = await parentLearnerService.getParents();
        setParents(data);
      } catch (err) {
        setError('Failed to load parents');
      } finally {
        setLoadingParents(false);
      }
    };

    fetchParents();
  }, []);

  // Fetch levels on mount
  useEffect(() => {
    const fetchLevels = async () => {
      setLoadingLevels(true);
      setError(null);
      try {
        const data = await parentLearnerService.getLevels();
        setLevels(data);
      } catch (err) {
        setError('Failed to load levels');
      } finally {
        setLoadingLevels(false);
      }
    };

    fetchLevels();
  }, []);

  // Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      setError(null);
      try {
        const data = await parentLearnerService.getSubjects();
        setSubjects(data);
      } catch (err) {
        setError('Failed to load subjects');
      }
    };

    fetchSubjects();
  }, []);

  // Fetch schools on mount
  useEffect(() => {
    const fetchSchools = async () => {
      setLoadingSchools(true);
      setError(null);
      try {
        const data = await parentLearnerService.getSchools();
        setSchools(data);
      } catch (err) {
        setError('Failed to load schools');
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  // Get subjects by level
  const getSubjectsByLevel = useCallback(
    (levelId: string): SubjectOption[] => {
      return subjects.filter((subject) => subject.levelId === levelId);
    },
    [subjects]
  );

  // Add parent
  const addParent = async (data: CreateParentDto): Promise<Parent> => {
    setAddingParent(true);
    setError(null);
    try {
      const newParent = await parentLearnerService.createParent(data);

      // Add new parent to the dropdown list
      setParents((prev) => [
        ...prev,
        {
          value: newParent.id,
          label: `${newParent.firstName} ${newParent.lastName} (${newParent.email})`,
        },
      ]);

      return newParent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add parent';
      setError(errorMessage);
      throw err;
    } finally {
      setAddingParent(false);
    }
  };

  // Add learner
  const addLearner = async (data: CreateLearnerDto): Promise<Learner> => {
    setAddingLearner(true);
    setError(null);
    try {
      const newLearner = await parentLearnerService.createLearner(data);
      return newLearner;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add learner';
      setError(errorMessage);
      throw err;
    } finally {
      setAddingLearner(false);
    }
  };

  // Update parent
  const updateParent = async (data: UpdateParentDto): Promise<void> => {
    setAddingParent(true);
    setError(null);
    try {
      await parentLearnerService.updateParent(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update parent';
      setError(errorMessage);
      throw err;
    } finally {
      setAddingParent(false);
    }
  };

  // Update learner
  const updateLearner = async (data: UpdateLearnerDto): Promise<void> => {
    setAddingLearner(true);
    setError(null);
    try {
      await parentLearnerService.updateLearner(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update learner';
      setError(errorMessage);
      throw err;
    } finally {
      setAddingLearner(false);
    }
  };

  return {
    // Parent operations
    addParent,
    updateParent,
    addingParent,

    // Learner operations
    addLearner,
    updateLearner,
    addingLearner,

    // Dropdown data
    parents,
    levels,
    schools,
    getSubjectsByLevel,

    // Loading states
    loadingParents,
    loadingLevels,
    loadingSchools,

    // Error state
    error,
  };
}
