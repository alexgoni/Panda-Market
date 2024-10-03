import { Component, ComponentType, ErrorInfo, PropsWithChildren } from "react";

export interface ErrorFallbackProps {
  error: Error;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ComponentType<ErrorFallbackProps>;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    const { fallback: FallbackComponent, children } = this.props;
    const { error } = this.state;

    if (!error) return children;

    return <FallbackComponent error={error} />;
  }
}
