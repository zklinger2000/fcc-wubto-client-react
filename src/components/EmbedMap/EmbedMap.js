import React, {
  Component,
  PropTypes,
} from 'react';

class EmbedMap extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      timerID: undefined
    };

    this.toggleClass = this.toggleClass.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerID);
  }

  toggleClass() {
    clearTimeout(this.state.timerID);
    this.setState({ active: true });
    this.setState({ timerID: setTimeout(
      () => this.setState({ active: false }),
      6000)
    });
  }

  render() {
    const { place } = this.props;

    return (
      <section className="google-map" >
        <div className={this.state.active ? "overlay active" : "overlay"} onClick={this.toggleClass}/>
        <iframe
          width="320"
          height="260"
          frameBorder="0" style={{border:0}}
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_EMBED_MAP_KEY}&q=${place.location && place.location.display_address && place.location.display_address.join(',')}`}
          allowFullScreen
        />
        <div className="underlay">
          <i className="fa fa-cog fa-spin"/>
        </div>
      </section>
    );
  }
}

EmbedMap.propTypes = {
  place: PropTypes.object.isRequired
};
EmbedMap.defaultProps = {
  place: {}
};

export default EmbedMap;
