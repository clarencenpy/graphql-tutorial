import React from 'react';

class GraphQLErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(`Error caught in component: ${error}`);
  }

  onError(error) {
    return error.graphQLErrors.map((error, i) => (
      <div key={i}>
        <p>Message: {error.message}</p>
        <p>Code: {error.extensions.code} </p>
      </div>
    ));
  }

  render() {
    if (this.state.hasError) {
      return <p>Error has been caught</p>
    }
    return this.props.children(this.onError)
  }
}

export default GraphQLErrorHandler;
