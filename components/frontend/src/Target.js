import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';


class Target extends Component {
  constructor(props) {
    super(props);
    this.state = { edited_target: this.props.target, edit: false, hover: false }
  }
  onMouseEnter(event) {
    this.setState({ hover: true })
  }
  onMouseLeave(event) {
    this.setState({ hover: false })
  }
  onEdit() {
    this.setState({ edit: true });
  }
  onChange(event) {
    this.setState({ edited_target: event.target.value });
  }
  onKeyDown(event) {
    if (event.key === "Escape") {
      this.setState({ edit: false, edited_target: this.props.target })
    }
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ edit: false });
    const self = this;
    fetch(`http://localhost:8080/report/metric/${this.props.metric_uuid}/target`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ target: this.state.edited_target })
    }).then(
      () => self.props.reload()
    )
  }
  render() {
    if (this.state.edit) {
      return (
        <Form onSubmit={(e) => this.onSubmit(e)}>
          {this.props.direction}
          <Form.Input autoFocus focus fluid type="number" defaultValue={this.state.edited_target}
            onChange={(e) => this.onChange(e)} onKeyDown={(e) => this.onKeyDown(e)} />
          {this.props.unit}
        </Form>
      )
    }
    const style = this.state.hover ? { borderBottom: "1px dotted #000000" } : { height: "1em" };
    return (
      <div onClick={(e) => this.onEdit(e)} onKeyPress={(e) => this.onEdit(e)} onMouseEnter={(e) => this.onMouseEnter(e)}
        onMouseLeave={(e) => this.onMouseLeave(e)} style={style} tabIndex="0">
        {this.props.direction} {this.state.edited_target} {this.props.unit}
      </div>
    )
  }
}

export { Target };
