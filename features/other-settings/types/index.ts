/**
 * Other Settings Types
 */

// Other Settings Entity
export interface OtherSettings {
  id: string;
  childDisclaimer: string;
  parentDisclaimer: string;
  maintenanceMode: boolean;
  logo: string | null;
  updatedAt: string;
}

// DTO for updating settings
export interface UpdateOtherSettingsDto {
  childDisclaimer: string;
  parentDisclaimer: string;
  maintenanceMode: boolean;
  logo?: string | null;
}

// Hook Return Type
export interface UseOtherSettingsReturn {
  settings: OtherSettings | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  updateSettings: (settings: UpdateOtherSettingsDto) => Promise<void>;
  toggleMaintenance: () => Promise<void>;
}
