interface _LayoutProps {
	children: React.ReactNode;
	params?: {[key: string]: string};
}

interface _PageProps {
	params?: {[key: string]: string};
	searchParams?: {[key: string]: string | string[] | undefined};
}

export type LayoutProps = Readonly<_LayoutProps>;
export type PageProps = Readonly<_PageProps>;
