import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleCheck,
  ClipboardCheck,
  Code2,
  Compass,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FolderCheck,
  FolderOpen,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Languages,
  Laptop,
  Layers3,
  LayoutTemplate,
  Lightbulb,
  Mail,
  Megaphone,
  MessagesSquare,
  Monitor,
  MousePointer2,
  PanelTop,
  PenTool,
  Play,
  Presentation,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Users,
  Video,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleCheck,
  ClipboardCheck,
  Code2,
  Compass,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FolderCheck,
  FolderOpen,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Languages,
  Laptop,
  Layers3,
  LayoutTemplate,
  Lightbulb,
  Mail,
  Megaphone,
  MessagesSquare,
  Monitor,
  MousePointer2,
  PanelTop,
  PenTool,
  Play,
  Presentation,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Users,
  Video,
  WandSparkles,
  Sheet: FileSpreadsheet,
  MessageCircle: MessagesSquare,
  Code: Code2,
};

export function Icon({
  name,
  size = 20,
  className = '',
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name] ?? BookOpen;
  return (
    <Component
      size={size}
      strokeWidth={1.7}
      className={className}
      aria-hidden="true"
    />
  );
}

export function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`brand-mark ${small ? 'brand-mark-small' : ''}`}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="13" fill="currentColor" />
      <path
        d="M12 33V20c0-8 12-13 12-13s12 5 12 13v13M18 32V21c0-5 6-8 6-8s6 3 6 8v11M10 37h28"
        fill="none"
        stroke="#e0c18a"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m17 28 7 4 7-4M24 32v5"
        fill="none"
        stroke="#faf9f2"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LinkButton({
  to,
  children,
  variant = 'primary',
  className = '',
  arrow = true,
}: {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light' | 'text';
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link to={to} className={`button button-${variant} ${className}`}>
      {children}
      {arrow && <ArrowRight size={17} aria-hidden="true" />}
    </Link>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span />
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-header">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Our Vision</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          <ChevronRight size={13} aria-hidden="true" />
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Note({
  children,
  icon = 'Lightbulb',
  className = '',
}: {
  children: ReactNode;
  icon?: string;
  className?: string;
}) {
  return (
    <div className={`note ${className}`}>
      <Icon name={icon} size={20} />
      <div>{children}</div>
    </div>
  );
}
