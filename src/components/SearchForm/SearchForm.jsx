import React, {Component} from 'react';

class SearchForm extends Component {
  state = {
    invalidForm: true,
    formData: {
      origin: '',
      destination: '',
      departureDate: ''
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    // We will write the handleAddPuppy function in our App.js after this step.
    this.props.handleFlightSearch(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() {
		const { origin, destination, departureDate } = this.state.formData
    return (
      <>
        <h1>Search Flights</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="originInput" className="form-label">
              Origin Place
            </label>
            <input
              type="text"
              className="form-control"
              id="originInput"
              name="origin"
              value={origin}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="destinationInput" className="form-label">
              Destination
            </label>
            <input
              type="text"
              className="form-control"
              id="destinationInput"
              name="destination"
              value={destination}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="departureDateInput" className="form-label">Departure Date</label>
            <input
              type="date"
              className="form-control"
              id="departureDateInput"
              name="departureDate"
              value={departureDate}
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={this.state.invalidForm}
          >
            Search Flights
          </button>
        </form>
      </>
    );
  }
}

export default SearchForm;