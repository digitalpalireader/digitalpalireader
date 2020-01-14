import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { ai } from './telemetryService';

interface Props {
  history: History;
  instrumentationKey: string;
  afterInitialize?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AllProps = Props & RouteComponentProps<any>;

interface State {
  initialized: boolean;
}

/**
 * This Component provides telemetry with Azure App Insights
 *
 * NOTE: the package '@microsoft/applicationinsights-react-js' has a HOC withAITracking that requires this to be a Class Component rather than a Functional Component
 */
class TelemetryProvider extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    const { history, instrumentationKey, afterInitialize } = this.props;
    const { initialized } = this.state;
    if (!initialized && Boolean(instrumentationKey) && Boolean(history)) {
      ai.initialize(instrumentationKey, history);
      this.setState({ initialized: true });
    }

    if (afterInitialize) {
      afterInitialize();
    }
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default withRouter(withAITracking(ai.reactPlugin, TelemetryProvider));
