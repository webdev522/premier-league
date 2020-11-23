import React from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    // Get id from query
    const id = query.id;
    if (!process.browser) {
      // Still on the server so make a request
      const res = await axios.get(
        "https://data-ui.football-data.org/fd/competitions/2021/table"
      );
      return {
        data: res.data,
        // Filter and return data based on query
        standing: res.data.data.filter((s) => s.position == id),
      };
    } else {
      // Not on the server just navigating so use
      // the cache
      const bplData = JSON.parse(sessionStorage.getItem("bpl"));
      // Filter and return data based on query
      return { standing: bplData.data.filter((s) => s.position == id) };
    }
  }

  componentDidMount() {
    // Cache data in localStorage if
    // not already cached
    if (!sessionStorage.getItem("bpl"))
      sessionStorage.setItem("bpl", JSON.stringify(this.props.data));
  }

  // . . . render method truncated
  render() {
    const detailStyle = {
      ul: {
        marginTop: "100px",
      },
    };

    return (
      <div>
        <Head>
          <title>League Table</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/purecss@0.6.1/build/pure-min.css"
          />
        </Head>

        <div className="pure-g">
          <div className="pure-u-8-24"></div>
          <div className="pure-u-4-24">
            <h2>{this.props.standing[0].team.name}</h2>
            <img
              src={this.props.standing[0].team.crestUrl}
              className="pure-img"
            />
            <h3>Points: {this.props.standing[0].points}</h3>
          </div>
          <div className="pure-u-12-24">
            <ul style={detailStyle.ul}>
              <li>
                <strong>Goals</strong>: {this.props.standing[0].goalsFor}
              </li>
              <li>
                <strong>Wins</strong>: {this.props.standing[0].won}
              </li>
              <li>
                <strong>Losses</strong>: {this.props.standing[0].lost}
              </li>
              <li>
                <strong>Draws</strong>: {this.props.standing[0].draw}
              </li>
              <li>
                <strong>Goals Against</strong>:{" "}
                {this.props.standing[0].goalsAgainst}
              </li>
              <li>
                <strong>Goal Difference</strong>:{" "}
                {this.props.standing[0].goalDifference}
              </li>
              <li>
                <strong>Played</strong>: {this.props.standing[0].playedGames}
              </li>
            </ul>
            <Link href="/">Home</Link>
          </div>
        </div>
      </div>
    );
  }
}
