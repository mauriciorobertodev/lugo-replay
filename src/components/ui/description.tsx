import { PropsWithChildren } from 'react';

export function Description(props: PropsWithChildren) {
    return <p className="text-sm text-muted-foreground" {...props} />;
}
