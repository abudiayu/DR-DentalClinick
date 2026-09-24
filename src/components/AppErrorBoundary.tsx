import React from 'react'

interface State { hasError: boolean; message: string }

export default class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace' }}>
          <h2 style={{ color: 'red' }}>Runtime Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
            {this.state.message}
          </pre>
          <button onClick={() => window.location.href = '/'}>Go Home</button>
        </div>
      )
    }
    return this.props.children
  }
}
