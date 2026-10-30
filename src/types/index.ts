export interface ServiceItem {
  title: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
}

export interface MetricItem {
  count: string;
  label: string;
}

export interface IndustryItem {
  title: string;
  tag: string;
  desc: string;
  capabilities: string[];
  icon: React.ReactNode;
}

export interface JobRole {
  id?: string;
  title: string;
  type: string;
  location: string;
  exp: string;
  tags: string[];
  desc: string;
}

export interface ProgramTrack {
  id: string;
  title: string;
  duration: string;
  level: string;
  stack: string;
  desc: string;
  topics: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CtaBannerProps {
  title?: string;
  desc?: string;
  tag?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  typeGroup: 'website' | 'system';
  description: string;
  url: string;
  previewImage: string;
  slideshowImages: string[];
  meta?: string;
  tags?: string[];
  buttonText: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'closed';
  notes?: string;
}
