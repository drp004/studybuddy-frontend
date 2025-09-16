// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Notes types
export interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  keyPoints: string[];
  type: 'text' | 'audio' | 'video';
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  type: 'text' | 'audio' | 'video';
  tags?: string[];
  isPublic?: boolean;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  tags?: string[];
  isPublic?: boolean;
}

// PPT types
export interface PPTTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  category: 'business' | 'education' | 'creative' | 'minimal';
}

export interface PPTRequest {
  noteId: string;
  templateId: string;
  title: string;
  subtitle?: string;
  includeImages?: boolean;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface PPTResponse {
  id: string;
  downloadUrl: string;
  previewUrl: string;
  slides: number;
  createdAt: string;
}

// Career Path types
export interface CareerAssessment {
  id: string;
  userId: string;
  skills: Skill[];
  interests: Interest[];
  personality: PersonalityType;
  recommendations: CareerRecommendation[];
  createdAt: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'technical' | 'soft' | 'domain';
}

export interface Interest {
  name: string;
  level: 'low' | 'medium' | 'high';
  category: string;
}

export interface PersonalityType {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  requiredSkills: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  growth: 'low' | 'medium' | 'high';
  companies: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TextToNotesForm {
  text: string;
  title?: string;
  tags?: string[];
}

export interface FileUploadForm {
  file: File;
  title?: string;
  tags?: string[];
}

// UI types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  type: 'create' | 'edit' | 'delete' | 'preview' | null;
  data?: any;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// File types
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Search and Filter types
export interface SearchFilters {
  query?: string;
  type?: 'text' | 'audio' | 'video';
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
} 