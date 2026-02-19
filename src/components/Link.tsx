import NextLink from "next/link";
import type {LinkProps} from "next/link";

interface Props extends LinkProps {
	children: React.ReactNode;
	className?: string;
}

const Link = ({children, prefetch, ...props}: Readonly<Props>) => {
	return (
		<NextLink {...props} prefetch={prefetch ?? true}>
			{children}
		</NextLink>
	);
};

export default Link;
