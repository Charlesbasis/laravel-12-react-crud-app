import { SidebarProvider } from '@/components/ui/sidebar';
import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    const { position } = useLayout();
    
    return (
        <SidebarProvider
            defaultOpen={isOpen}>
            <div className={cn('flex w-full', position === 'right' ? 'flex-row-reverse' : 'flex-row')}>{children}</div>
        </SidebarProvider>
    );
}
